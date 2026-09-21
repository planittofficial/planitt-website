import json
import re
import zipfile
from pathlib import Path
from xml.etree import ElementTree as ET

WORKSPACE = Path(__file__).resolve().parents[1]
XLSX_PATH = WORKSPACE / "public" / "mutual_funds_dataset_with_commission.xlsx"
OUT_PATH = WORKSPACE / "src" / "data" / "mutualFundsDataset.json"


def normalize_header(value: str) -> str:
    value = value.strip().lower()
    value = re.sub(r"[^a-z0-9]+", "_", value)
    return value.strip("_")


def load_shared_strings(zip_file: zipfile.ZipFile):
    try:
        xml = zip_file.read("xl/sharedStrings.xml")
    except KeyError:
        return []
    root = ET.fromstring(xml)
    strings = []
    for si in root.findall(".//{*}si"):
        text_parts = []
        for t in si.findall(".//{*}t"):
            if t.text:
                text_parts.append(t.text)
        strings.append("".join(text_parts))
    return strings


def cell_value(cell, shared_strings):
    v = cell.find("{*}v")
    if v is None or v.text is None:
        return ""
    raw = v.text
    cell_type = cell.attrib.get("t")
    if cell_type == "s":
        idx = int(raw)
        return shared_strings[idx] if idx < len(shared_strings) else ""
    return raw


def sheet_rows(zip_file: zipfile.ZipFile, shared_strings):
    xml = zip_file.read("xl/worksheets/sheet1.xml")
    root = ET.fromstring(xml)
    rows = []
    for row in root.findall(".//{*}sheetData/{*}row"):
        cells = []
        for c in row.findall("{*}c"):
            cells.append(cell_value(c, shared_strings))
        rows.append(cells)
    return rows


def parse_bool(value: str):
    v = value.strip().lower()
    if v in {"yes", "y", "true", "1"}:
        return True
    if v in {"no", "n", "false", "0"}:
        return False
    return None


def parse_float(value: str):
    try:
        return float(value)
    except Exception:
        return None


def parse_duration(value: str):
    if not value: return None
    m = re.search(r"(\d+)", value)
    if m:
        return float(m.group(1))
    return None


def main():
    if not XLSX_PATH.exists():
        raise SystemExit(f"Missing XLSX: {XLSX_PATH}")

    with zipfile.ZipFile(XLSX_PATH) as zf:
        shared = load_shared_strings(zf)
        rows = sheet_rows(zf, shared)

    if not rows:
        raise SystemExit("No rows found in sheet1.")

    header_row = rows[0]
    headers = [normalize_header(h) for h in header_row]
    header_map = {h: idx for idx, h in enumerate(headers) if h}

    def get(row, key):
        idx = header_map.get(key)
        if idx is None or idx >= len(row):
            return ""
        return row[idx]

    funds = []
    for row in rows[1:]:
        name = str(get(row, "fund_name") or get(row, "mutual_fund_name") or get(row, "scheme_name")).strip()
        amc = str(get(row, "amc") or get(row, "fund_house") or get(row, "fund_company")).strip()
        if not name:
            continue

        fund = {
            "amc": amc or "Unknown AMC",
            "fundName": name,
            "commissionPct": parse_float(str(get(row, "commission") or get(row, "commission_percentage") or get(row, "commission_pct"))),
            "sipAvailable": parse_bool(str(get(row, "sip_available") or get(row, "sip"))),
            "lumpsumAvailable": parse_bool(str(get(row, "lumpsum_available") or get(row, "lumpsum") or get(row, "lump_sum"))),
            "riskCategory": str(get(row, "risk_category") or get(row, "risk") or get(row, "risk_level")).strip().lower(),
            "minDurationYears": parse_duration(str(get(row, "minimum_recommended_duration") or get(row, "min_duration") or get(row, "duration_years"))),
        }
        funds.append(fund)

    payload = {
        "meta": {
            "sourceFile": str(XLSX_PATH),
            "extractedAt": __import__("datetime").datetime.now().isoformat(),
            "count": len(funds),
        },
        "funds": funds,
    }

    OUT_PATH.write_text(json.dumps(payload, indent=2), encoding="utf-8")
    print(f"Wrote {OUT_PATH} ({len(funds)} funds)")


if __name__ == "__main__":
    main()
