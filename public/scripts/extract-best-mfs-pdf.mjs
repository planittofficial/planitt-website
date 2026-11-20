import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

const workspaceRoot = process.cwd();
const pdfPath = path.join(workspaceRoot, "src", "data", "best-mfs.pdf");

const decodeUtf16Be = (buffer) => {
  // buffer includes BOM FE FF
  let out = "";
  for (let i = 2; i + 1 < buffer.length; i += 2) {
    out += String.fromCharCode((buffer[i] << 8) | buffer[i + 1]);
  }
  return out;
};

const decodePdfString = (buffer) => {
  if (buffer.length >= 2 && buffer[0] === 0xfe && buffer[1] === 0xff) {
    return decodeUtf16Be(buffer);
  }
  return buffer.toString("latin1");
};

const isWhite = (ch) => ch === 0x20 || ch === 0x0a || ch === 0x0d || ch === 0x09 || ch === 0x0c;
const isDelimiter = (ch) => ch === 0x28 || ch === 0x29 || ch === 0x3c || ch === 0x3e || ch === 0x5b || ch === 0x5d || ch === 0x2f;

const parseLiteralString = (bytes, startIndex) => {
  // returns { value: Buffer, nextIndex }
  // PDF string begins at '('
  const out = [];
  let i = startIndex + 1;
  let depth = 1;
  while (i < bytes.length && depth > 0) {
    const b = bytes[i];
    if (b === 0x5c) {
      // backslash escape
      const n = bytes[i + 1];
      if (n == null) break;
      // line continuation
      if (n === 0x0d && bytes[i + 2] === 0x0a) {
        i += 3;
        continue;
      }
      if (n === 0x0d || n === 0x0a) {
        i += 2;
        continue;
      }
      // octal escapes
      if (n >= 0x30 && n <= 0x37) {
        let oct = String.fromCharCode(n);
        if (bytes[i + 2] >= 0x30 && bytes[i + 2] <= 0x37) oct += String.fromCharCode(bytes[i + 2]);
        if (bytes[i + 3] >= 0x30 && bytes[i + 3] <= 0x37) oct += String.fromCharCode(bytes[i + 3]);
        out.push(parseInt(oct, 8) & 0xff);
        i += 1 + oct.length;
        continue;
      }
      // common escapes
      if (n === 0x6e) out.push(0x0a); // \n
      else if (n === 0x72) out.push(0x0d); // \r
      else if (n === 0x74) out.push(0x09); // \t
      else if (n === 0x62) out.push(0x08); // \b
      else if (n === 0x66) out.push(0x0c); // \f
      else out.push(n); // \( \) \\ or any char
      i += 2;
      continue;
    }
    if (b === 0x28) {
      depth += 1;
      out.push(b);
      i += 1;
      continue;
    }
    if (b === 0x29) {
      depth -= 1;
      if (depth === 0) {
        i += 1;
        break;
      }
      out.push(b);
      i += 1;
      continue;
    }
    out.push(b);
    i += 1;
  }
  return { value: Buffer.from(out), nextIndex: i };
};

const parseNumberToken = (bytes, startIndex) => {
  let i = startIndex;
  while (i < bytes.length) {
    const b = bytes[i];
    if (
      (b >= 0x30 && b <= 0x39) ||
      b === 0x2d ||
      b === 0x2b ||
      b === 0x2e
    ) {
      i += 1;
    } else {
      break;
    }
  }
  const raw = bytes.subarray(startIndex, i).toString("ascii");
  return { value: Number(raw), nextIndex: i };
};

const parseNameToken = (bytes, startIndex) => {
  let i = startIndex + 1; // skip '/'
  while (i < bytes.length && !isWhite(bytes[i]) && !isDelimiter(bytes[i])) i += 1;
  const raw = bytes.subarray(startIndex, i).toString("ascii");
  return { value: raw, nextIndex: i };
};

const parseWordToken = (bytes, startIndex) => {
  let i = startIndex;
  while (i < bytes.length && !isWhite(bytes[i]) && !isDelimiter(bytes[i])) i += 1;
  const raw = bytes.subarray(startIndex, i).toString("ascii");
  return { value: raw, nextIndex: i };
};

const parseArrayToken = (bytes, startIndex) => {
  // returns array of tokens (numbers / buffers / names / words)
  const items = [];
  let i = startIndex + 1; // skip '['
  while (i < bytes.length) {
    while (i < bytes.length && isWhite(bytes[i])) i += 1;
    const b = bytes[i];
    if (b === 0x5d) {
      i += 1;
      break;
    }
    if (b === 0x28) {
      const { value, nextIndex } = parseLiteralString(bytes, i);
      items.push(value);
      i = nextIndex;
      continue;
    }
    if ((b >= 0x30 && b <= 0x39) || b === 0x2d || b === 0x2b || b === 0x2e) {
      const { value, nextIndex } = parseNumberToken(bytes, i);
      items.push(value);
      i = nextIndex;
      continue;
    }
    if (b === 0x2f) {
      const { value, nextIndex } = parseNameToken(bytes, i);
      items.push(value);
      i = nextIndex;
      continue;
    }
    const { value, nextIndex } = parseWordToken(bytes, i);
    items.push(value);
    i = nextIndex;
  }
  return { value: items, nextIndex: i };
};

const extractStreams = (pdfBytes) => {
  const pdfLatin1 = pdfBytes.toString("latin1");
  const results = [];
  const re = /<<([\s\S]*?)>>\s*stream\r?\n/g;
  let match;
  while ((match = re.exec(pdfLatin1)) !== null) {
    const dict = match[1];
    const streamStart = re.lastIndex;
    const endIndex = pdfLatin1.indexOf("endstream", streamStart);
    if (endIndex === -1) break;
    const streamLatin1 = pdfLatin1.slice(streamStart, endIndex);
    const streamBytes = Buffer.from(streamLatin1, "latin1");
    results.push({ dict, streamBytes });
    re.lastIndex = endIndex + "endstream".length;
  }
  return results;
};

const extractTextItemsFromContentStream = (contentBytes) => {
  // returns { x, y, text }[] extracted from BT..ET blocks
  const items = [];
  let i = 0;
  const operands = [];
  let tx = 0;
  let ty = 0;

  const flushOperator = (op) => {
    if (op === "Tm") {
      if (operands.length >= 6) {
        const e = operands[operands.length - 2];
        const f = operands[operands.length - 1];
        if (Number.isFinite(e) && Number.isFinite(f)) {
          tx = e;
          ty = f;
        }
      }
      operands.length = 0;
      return;
    }
    if (op === "Td" || op === "TD") {
      if (operands.length >= 2) {
        const x = operands[operands.length - 2];
        const y = operands[operands.length - 1];
        if (Number.isFinite(x) && Number.isFinite(y)) {
          tx += x;
          ty += y;
        }
      }
      operands.length = 0;
      return;
    }
    if (op === "Tj") {
      const last = operands[operands.length - 1];
      if (Buffer.isBuffer(last)) {
        const text = decodePdfString(last).trim();
        if (text) items.push({ x: tx, y: ty, text });
      }
      operands.length = 0;
      return;
    }
    if (op === "TJ") {
      const last = operands[operands.length - 1];
      if (Array.isArray(last)) {
        const parts = [];
        for (const el of last) {
          if (Buffer.isBuffer(el)) {
            const t = decodePdfString(el);
            if (t) parts.push(t);
          }
        }
        const text = parts.join("").trim();
        if (text) items.push({ x: tx, y: ty, text });
      }
      operands.length = 0;
      return;
    }
    // default: clear operands for operators we don't handle
    operands.length = 0;
  };

  while (i < contentBytes.length) {
    while (i < contentBytes.length && isWhite(contentBytes[i])) i += 1;
    if (i >= contentBytes.length) break;

    const b = contentBytes[i];
    if (b === 0x28) {
      const { value, nextIndex } = parseLiteralString(contentBytes, i);
      operands.push(value);
      i = nextIndex;
      continue;
    }
    if (b === 0x5b) {
      const { value, nextIndex } = parseArrayToken(contentBytes, i);
      operands.push(value);
      i = nextIndex;
      continue;
    }
    if ((b >= 0x30 && b <= 0x39) || b === 0x2d || b === 0x2b || b === 0x2e) {
      const { value, nextIndex } = parseNumberToken(contentBytes, i);
      operands.push(value);
      i = nextIndex;
      continue;
    }
    if (b === 0x2f) {
      const { value, nextIndex } = parseNameToken(contentBytes, i);
      operands.push(value);
      i = nextIndex;
      continue;
    }

    const { value: word, nextIndex } = parseWordToken(contentBytes, i);
    i = nextIndex;

    // operators are words like BT, ET, Tm, Tj, etc.
    if (word) flushOperator(word);
  }

  return items;
};

const groupIntoLines = (items) => {
  const byY = new Map();
  for (const it of items) {
    const yKey = Math.round(it.y * 10) / 10;
    if (!byY.has(yKey)) byY.set(yKey, []);
    byY.get(yKey).push(it);
  }
  const lines = [];
  for (const [y, arr] of byY.entries()) {
    arr.sort((a, b) => a.x - b.x);
    const text = arr.map((x) => x.text).join("\t").replace(/\s+\t/g, "\t").trim();
    lines.push({ y, text });
  }
  lines.sort((a, b) => b.y - a.y);
  return lines;
};

const main = () => {
  if (!fs.existsSync(pdfPath)) {
    console.error(`Missing PDF at: ${pdfPath}`);
    process.exit(1);
  }

  const pdfBytes = fs.readFileSync(pdfPath);
  const streams = extractStreams(pdfBytes);
  const contentItems = [];

  for (const s of streams) {
    if (!/\/FlateDecode/.test(s.dict)) continue;
    let inflated;
    try {
      inflated = zlib.inflateSync(s.streamBytes);
    } catch {
      // Some PDFs use raw deflate; try inflateRaw.
      try {
        inflated = zlib.inflateRawSync(s.streamBytes);
      } catch {
        continue;
      }
    }
    const items = extractTextItemsFromContentStream(inflated);
    contentItems.push(...items);
  }

  const lines = groupIntoLines(contentItems);
  const dump = process.argv.includes("--dump");
  if (dump) {
    for (const l of lines) console.log(String(l.y).padStart(8, " "), l.text);
    return;
  }

  // Placeholder: table-to-JSON mapping will be added once we confirm columns.
  const outPath = path.join(workspaceRoot, "src", "data", "mutual-funds.json");
  fs.writeFileSync(outPath, JSON.stringify({ extractedAt: new Date().toISOString(), lines }, null, 2));
  console.log(`Wrote: ${outPath}`);
};

main();

