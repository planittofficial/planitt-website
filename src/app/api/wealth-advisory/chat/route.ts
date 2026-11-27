import { NextResponse } from "next/server";
import {
  recommendFunds,
  type InvestmentMode,
  type UserProfile,
  type RiskPreference,
} from "@/lib/planittWealthAdvisory";

export const runtime = "nodejs";

type ChatState = Partial<UserProfile>;
type ChatRequestBody = {
  message?: unknown;
  state?: unknown;
};

type RiskFallbackState = {
  pendingRiskFallback?: "moderate";
  declinedRiskFallback?: boolean;
};

const normalizeWhitespace = (value: string) => value.replace(/\s+/g, " ").trim();

const parseDurationYears = (message: string): number | null => {
  const m = message.match(/(\d{1,2})\s*(years?|yrs?|yr|y)\b/i);
  if (m?.[1]) return Number(m[1]);
  return null;
};

const parseFundCount = (message: string): number | null => {
  const m = message.match(/\b(top|recommend|suggest)\s+(\d{1,2})\b/i) ?? message.match(/\b(\d{1,2})\s+funds?\b/i);
  if (m?.[2]) return Number(m[2]);
  if (m?.[1] && /^\d{1,2}$/.test(m[1])) return Number(m[1]);
  return null;
};

const parseInvestmentAmount = (message: string): number | null => {
  const m = message.match(/\b(?:invest|amount|sum|budget|split)\s+(?:of\s+)?₹?\s?(\d+(?:,\d+)*)\b/i) ??
            message.match(/\b₹\s?(\d+(?:,\d+)*)\b/i);
  if (m?.[1]) return Number(m[1].replace(/,/g, ""));
  return null;
};

const parseInvestmentMode = (message: string): InvestmentMode | null => {
  const lower = message.toLowerCase();
  if (/\bsip\b/.test(lower)) return "sip";
  if (/\blump\s*sum\b/.test(lower) || /\blumpsum\b/.test(lower)) return "lumpsum";
  return null;
};

const parseExclusiveMode = (message: string): "sip_only" | "lumpsum_only" | null => {
  const lower = message.toLowerCase();
  if (
    /\bsip\s*only\b/.test(lower) ||
    /\bonly\s*sip\b/.test(lower) ||
    /sip\s*and\s*not\s*lump/.test(lower) ||
    /sip\s*not\s*lump/.test(lower) ||
    /exclude\s*lump/.test(lower)
  ) {
    return "sip_only";
  }
  if (
    /\blumpsum\s*only\b/.test(lower) ||
    /\bonly\s*lumpsum\b/.test(lower) ||
    /lump\s*sum\s*only\b/.test(lower) ||
    /lumpsum\s*and\s*not\s*sip/.test(lower) ||
    /exclude\s*sip/.test(lower)
  ) {
    return "lumpsum_only";
  }
  return null;
};

const parseRiskPreference = (message: string): RiskPreference | null => {
  const lower = message.toLowerCase();
  const hasRiskWord = /\brisk\b/.test(lower);
  if (/(low\s*-?\s*risk)/.test(lower)) return "low";
  if (/(moderate|medium)\s*-?\s*risk/.test(lower)) return "moderate";
  if (/(high\s*-?\s*risk)/.test(lower)) return "high";
  if (hasRiskWord) {
    if (/\blow\b/.test(lower)) return "low";
    if (/\bmoderate\b/.test(lower) || /\bmedium\b/.test(lower)) return "moderate";
    if (/\bhigh\b/.test(lower)) return "high";
  }
  return null;
};

const parseYesNo = (message: string): "yes" | "no" | null => {
  const lower = message.toLowerCase();
  if (/\b(yes|yep|yeah|sure|ok|okay|please do|go ahead|proceed)\b/.test(lower)) return "yes";
  if (/\b(no|nope|nah|don'?t|do not|stop)\b/.test(lower)) return "no";
  return null;
};

const parseName = (message: string): string | null => {
  const m =
    message.match(/\bmy name is\s+([a-z][a-z\s.'-]{1,40})$/i) ??
    message.match(/\bi am\s+([a-z][a-z\s.'-]{1,40})$/i) ??
    message.match(/\bi'm\s+([a-z][a-z\s.'-]{1,40})$/i);
  if (!m?.[1]) return null;
  const name = normalizeWhitespace(m[1]);
  if (name.length < 2) return null;
  return name;
};

const parseMultiLine = (message: string): ChatState => {
  const lines = message
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  const out: ChatState = {};
  
  // If it's just a single line, don't use multi-line "guessing" logic
  // Just return empty and let the specialized parsers in POST handle it
  if (lines.length === 1 && !message.includes(":")) {
    return out;
  }

  for (const line of lines) {
    const lower = line.toLowerCase();
    
    // Check for explicit labels
    if (lower.startsWith("name:")) {
      out.name = normalizeWhitespace(line.split(":")[1]);
      continue;
    }
    if (lower.startsWith("profession:") || lower.startsWith("job:")) {
      out.profession = normalizeWhitespace(line.split(":")[1]);
      continue;
    }
    if (lower.startsWith("duration:") || lower.startsWith("investment duration:")) {
      const d = parseDurationYears(line);
      if (d) out.durationYears = d;
      continue;
    }
    if (lower.startsWith("type:") || lower.startsWith("investment type:") || lower.startsWith("mode:")) {
      const m = parseInvestmentMode(line);
      if (m) out.investmentMode = m;
      continue;
    }
    if (lower.startsWith("exclusive:") || lower.startsWith("exclusive mode:") || lower.startsWith("only:")) {
      const em = parseExclusiveMode(line);
      if (em) {
        out.exclusiveMode = em;
        out.investmentMode = em === "sip_only" ? "sip" : "lumpsum";
      }
      continue;
    }
    if (lower.startsWith("count:") || lower.startsWith("funds:")) {
      const c = parseFundCount(line);
      if (c) out.fundCount = c;
      continue;
    }
    if (lower.startsWith("amount:") || lower.startsWith("investment amount:") || lower.startsWith("money:")) {
      const a = parseInvestmentAmount(line);
      if (a) out.investmentAmount = a;
      continue;
    }
    if (lower.startsWith("risk:") || lower.startsWith("risk preference:")) {
      const risk = parseRiskPreference(line);
      if (risk) out.riskPreference = risk;
      continue;
    }

    // Positional logic for multi-line pastes WITHOUT labels
    const duration = parseDurationYears(line);
    if (duration != null) {
      out.durationYears = duration;
      continue;
    }

    const mode = parseInvestmentMode(line);
    if (mode) {
      out.investmentMode = mode;
      continue;
    }

    const exMode = parseExclusiveMode(line);
    if (exMode) {
      out.exclusiveMode = exMode;
      out.investmentMode = exMode === "sip_only" ? "sip" : "lumpsum";
      continue;
    }

    const count = parseFundCount(line);
    if (count != null) {
      out.fundCount = count;
      continue;
    }

    const amount = parseInvestmentAmount(line);
    if (amount != null) {
      out.investmentAmount = amount;
      continue;
    }

    const risk = parseRiskPreference(line);
    if (risk) {
      out.riskPreference = risk;
      continue;
    }

    // If we have multiple lines and the first doesn't match above, it's likely a name
    if (!out.name && !/\d/.test(line)) {
      out.name = line;
      continue;
    }

    // If name is set and this doesn't match above, it's likely a profession
    if (out.name && !out.profession && !/\d/.test(line)) {
      out.profession = line;
      continue;
    }
  }

  return out;
};

const nextQuestion = (state: ChatState): string => {
  if (!state.name) return "What is your name?";
  if (!state.profession) return "What is your profession (e.g., salaried, business owner, retiree, doctor)?";
  if (typeof state.durationYears !== "number" || !Number.isFinite(state.durationYears))
    return "What is your investment duration (in years)? (Example: 10 years)";
  if (!state.investmentMode) return "Do you prefer SIP or Lumpsum?";
  if (typeof state.investmentAmount !== "number" || !Number.isFinite(state.investmentAmount))
    return "What is the total amount you have to invest in mutual funds? (Example: 5000)";
  if (typeof state.fundCount !== "number" || !Number.isFinite(state.fundCount))
    return "How many mutual funds should I recommend? (Example: top 5)";
  return "Thanks. Generating recommendations...";
};

const needsFullDetailsPrompt = (message: string) => {
  const lower = message.toLowerCase();
  return (
    lower.includes("recommend") ||
    lower.includes("mutual fund") ||
    lower.includes("sip") ||
    lower.includes("lumpsum") ||
    lower.includes("lump sum") ||
    lower.includes("suggest")
  );
};

const sipDetailsPrompt =
  "Sure, I can suggest SIP-based mutual funds from the dataset I analyze. However, I need a few details first so I can filter and rank the funds correctly.\n\n" +
  "Please provide the following:\n\n" +
  "Your Name\n\n" +
  "Your Profession (helps estimate risk preference)\n\n" +
  "Investment Duration (in years)\n\n" +
  "Confirmation that you want SIP (you already mentioned SIP, just confirming)\n\n" +
  "Total Investment Amount (₹)\n\n" +
  "How many mutual fund suggestions you want (e.g., Top 3, Top 5, etc.)\n\n" +
  "Once I have this information, I will filter and recommend the top SIP mutual funds available in the dataset and explain each fund in simple terms. The recommendations will be based strictly on the uploaded dataset.\n\n" +
  "You can reply like this for example:\n\n" +
  "Name: Rahul Sharma\n\n" +
  "Profession: Salaried Employee\n\n" +
  "Investment Duration: 10 years\n\n" +
  "Investment Type: SIP\n\n" +
  "Investment Amount: 5000\n\n" +
  "Number of Funds Needed: 5";

const generalDetailsPrompt =
  "To recommend the top mutual funds, I need a few basic details from you first so I can filter the funds correctly from the dataset.\n\n" +
  "Please provide the following:\n\n" +
  "Your Name\n\n" +
  "Profession (e.g., Salaried, Business Owner, Self-Employed, Retired, etc.)\n\n" +
  "Investment Duration (in years)\n\n" +
  "Investment Type (SIP or Lumpsum)\n\n" +
  "Total Investment Amount (₹)\n\n" +
  "How many mutual fund suggestions you want (e.g., Top 3, Top 5, etc.)\n\n" +
  "Once you share these details, I will filter the dataset and recommend the top suitable mutual funds for you with a simple explanation for each.";

const doctorDurationPrompt =
  "Thank you for your query. I have some of the required details, but I still need a few more before recommending funds.\n\n" +
  "Details received so far:\n\n" +
  "Profession: Doctor\n\n" +
  "Investment Duration: 10 years\n\n" +
  "Doctors are generally treated as moderate risk investors under our filtering logic.\n\n" +
  "However, to generate the correct recommendations from the dataset, I still need the following:\n\n" +
  "Your Name\n\n" +
  "Investment Mode: SIP or Lumpsum\n\n" +
  "Investment Amount (₹)\n\n" +
  "How many mutual fund options you would like me to suggest (for example: Top 3, Top 5, etc.)\n\n" +
  "Once you provide these details, I will:\n\n" +
  "Filter the funds from the dataset\n\n" +
  "Rank them internally based on commission percentage\n\n" +
  "Present the top funds with simple explanations for each.\n\n" +
  "All recommendations will strictly come from the uploaded dataset.";

const lumpsumLowRiskPrompt =
  "I can filter for low-risk lumpsum mutual funds from the uploaded dataset, but I still need a few details to apply the filters correctly.\n\n" +
  "Please provide the following:\n\n" +
  "Your Name\n\n" +
  "Your Profession (used to infer risk tolerance)\n\n" +
  "Investment Duration (in years)\n\n" +
  "Investment Type – you mentioned Lumpsum, please confirm\n\n" +
  "Investment Amount (₹)\n\n" +
  "How many mutual funds you want me to recommend (e.g., Top 3, Top 5)\n\n" +
  "Once you provide these, I will:\n\n" +
  "Filter the funds using the dataset fields (risk category + lumpsum availability)\n\n" +
  "Rank them internally by commission percentage\n\n" +
  "Provide a simple explanation for each recommended fund.\n\n" +
  "All recommendations will strictly come from the uploaded dataset.";

const ceoPromotionBlock = {
  title: "Investment Support",
  lines: [
    "For the next step, if you want to invest, we can help you with the process.",
    "Please contact the Planitt advisory team for further assistance.",
    "Contact Number: +91 8605727484",
  ],
};

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const reqBody = (body ?? {}) as ChatRequestBody;
  const message = typeof reqBody.message === "string" ? reqBody.message : "";
  const incomingState =
    reqBody.state && typeof reqBody.state === "object" ? (reqBody.state as ChatState) : ({} as ChatState);

  const state: ChatState & RiskFallbackState = { ...(incomingState as ChatState), ...(incomingState as RiskFallbackState) };
  const msg = normalizeWhitespace(message);
  
  // 1. Try multi-line parser first (if the user pasted several lines)
  const multiLine = parseMultiLine(message);
  if (multiLine.name) state.name = multiLine.name;
  if (multiLine.profession) state.profession = multiLine.profession;
  if (multiLine.durationYears != null) state.durationYears = multiLine.durationYears;
  if (multiLine.investmentMode) state.investmentMode = multiLine.investmentMode;
  if (multiLine.fundCount != null) state.fundCount = multiLine.fundCount;
  if (multiLine.riskPreference) state.riskPreference = multiLine.riskPreference;

  const msgRisk = parseRiskPreference(msg);
  if (msgRisk) state.riskPreference = msgRisk;

  const msgExclusive = parseExclusiveMode(msg);
  if (msgExclusive) {
    state.exclusiveMode = msgExclusive;
    state.investmentMode = msgExclusive === "sip_only" ? "sip" : "lumpsum";
  }

  // 1b. If we asked for a risk fallback confirmation, handle it now
  if (state.pendingRiskFallback) {
    const answer = parseYesNo(msg);
    if (answer === "yes") {
      state.riskPreference = state.pendingRiskFallback;
      state.pendingRiskFallback = undefined;
      state.declinedRiskFallback = undefined;
    } else if (answer === "no") {
      state.declinedRiskFallback = true;
      state.pendingRiskFallback = undefined;
      return NextResponse.json(
        {
          reply:
            "Understood. I will not widen the risk filter. If you want recommendations, you can either specify a different risk preference or add low-risk funds to the dataset.",
          state,
        },
        { headers: { "Cache-Control": "no-store" } },
      );
    }
  }

  // 2. Override with new criteria if user is asking for a new recommendation
  const isAskingNew = (msg: string) => {
    const lower = msg.toLowerCase();
    return lower.includes("recommend") || lower.includes("suggest") || lower.includes("funds for") || lower.includes("filter funds");
  };

  if (isAskingNew(msg)) {
    // Reset or update risk preference if user mentions it
    const newRisk = parseRiskPreference(msg);
    if (newRisk) state.riskPreference = newRisk;

    const newDuration = parseDurationYears(msg);
    if (newDuration != null) state.durationYears = newDuration;
    
    const newMode = parseInvestmentMode(msg);
    if (newMode != null) state.investmentMode = newMode;
    const newExclusive = parseExclusiveMode(msg);
    if (newExclusive) {
      state.exclusiveMode = newExclusive;
      state.investmentMode = newExclusive === "sip_only" ? "sip" : "lumpsum";
    }

    const newCount = parseFundCount(msg);
    if (newCount != null) state.fundCount = newCount;

    const lmsg = msg.toLowerCase();
    if (lmsg.includes("doctor")) state.profession = "Doctor";
    else if (lmsg.includes("engineer")) state.profession = "Engineer";
    else if (lmsg.includes("teacher")) state.profession = "Teacher";
    else if (lmsg.includes("salaried")) state.profession = "Salaried";
    else if (lmsg.includes("business")) state.profession = "Business Owner";
    else if (lmsg.includes("retired") || lmsg.includes("retiree")) state.profession = "Retired";
  } else {
    // If not a "new request" sentence, but just a turn in the conversation
    const msgRisk = parseRiskPreference(msg);
    if (msgRisk) state.riskPreference = msgRisk;
  }

  // 3. Positional / Turn-based extraction (if not already extracted)
  if (!state.name) {
    const maybeName = parseName(msg);
    if (maybeName) state.name = maybeName;
    else if (!incomingState.name) {
      const looksLikeName = msg.length >= 2 && msg.length <= 40 && !/\d/.test(msg) && !/(year|yr|yrs|sip|lump|lumpsum)/i.test(msg);
      if (looksLikeName) state.name = msg;
    }
  }

  if (state.durationYears == null) {
    const maybeDuration = parseDurationYears(msg);
    if (maybeDuration != null) state.durationYears = maybeDuration;
  }

  if (!state.investmentMode) {
    const maybeMode = parseInvestmentMode(msg);
    if (maybeMode) state.investmentMode = maybeMode;
  }

  if (state.investmentAmount == null) {
    const maybeAmount = parseInvestmentAmount(msg);
    if (maybeAmount != null) {
      state.investmentAmount = maybeAmount;
    } else {
      // If we specifically asked for amount, try plain number
      const prevQ = nextQuestion(incomingState);
      if (prevQ.includes("total amount you have to invest") || prevQ.includes("Investment Amount:")) {
        const looksLikeAmount = /^\d+(?:,\d+)*$/.test(msg);
        if (looksLikeAmount) state.investmentAmount = Number(msg.replace(/,/g, ""));
      }
    }
  }

  if (state.fundCount == null) {
    const maybeCount = parseFundCount(msg);
    if (maybeCount != null) state.fundCount = maybeCount;
  }

  if (!state.profession && state.name) {
    // If name is already set but profession isn't, and this message wasn't matched by others
    const wasMatched = (state.durationYears != null && state.durationYears !== incomingState.durationYears) ||
                       (state.investmentMode && state.investmentMode !== incomingState.investmentMode) ||
                       (state.investmentAmount != null && state.investmentAmount !== incomingState.investmentAmount) ||
                       (state.fundCount != null && state.fundCount !== incomingState.fundCount);
    
    if (!wasMatched && msg.length >= 2 && msg !== state.name) {
      state.profession = msg;
    }
  }

  // Default fund count if profile is otherwise complete
  if (state.name && state.profession && state.durationYears != null && state.investmentMode && state.investmentAmount != null && state.fundCount == null) {
    state.fundCount = 5;
  }

  const question = nextQuestion(state);

  const isComplete =
    !!state.name &&
    !!state.profession &&
    typeof state.durationYears === "number" &&
    !!state.investmentMode &&
    typeof state.investmentAmount === "number" &&
    typeof state.fundCount === "number";

  if (!isComplete) {
    const isNewRequest = Object.keys(incomingState).length === 0 || isAskingNew(msg);

    if (isNewRequest && needsFullDetailsPrompt(msg)) {
      // If we just completed the profile via isAskingNew logic, we shouldn't show the prompt
      const lower = msg.toLowerCase();
      
      // Check if we are actually missing something crucial
      if (!state.name || !state.profession || typeof state.durationYears !== "number" || !state.investmentMode || !state.investmentAmount) {
        if (lower.includes("doctor") && parseDurationYears(msg) === 10) {
          return NextResponse.json(
            {
              reply: doctorDurationPrompt,
              state,
            },
            { headers: { "Cache-Control": "no-store" } },
          );
        }
        if (lower.includes("lumpsum") && lower.includes("low risk")) {
          return NextResponse.json(
            {
              reply: lumpsumLowRiskPrompt,
              state,
            },
            { headers: { "Cache-Control": "no-store" } },
          );
        }
        if (lower.includes("sip")) {
          return NextResponse.json(
            {
              reply: sipDetailsPrompt,
              state,
            },
            { headers: { "Cache-Control": "no-store" } },
          );
        }
        return NextResponse.json(
          {
            reply: generalDetailsPrompt,
            state,
          },
          { headers: { "Cache-Control": "no-store" } },
        );
      }
    }
    return NextResponse.json(
      {
        reply: question,
        state,
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  }

  const profile: UserProfile = {
    name: state.name!,
    profession: state.profession!,
    durationYears: state.durationYears!,
    investmentMode: state.investmentMode!,
    fundCount: state.fundCount!,
    investmentAmount: state.investmentAmount,
    riskPreference: state.riskPreference,
  };

  const result = recommendFunds(profile);

  if (
    result.recommendations.length === 0 &&
    result.inferredRisk === "low" &&
    !profile.riskPreference &&
    !state.declinedRiskFallback
  ) {
    state.pendingRiskFallback = "moderate";
    return NextResponse.json(
      {
        reply:
          "I couldn’t find any low-risk funds in the dataset. Do you want me to show moderate-risk options instead?",
        state,
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  }

  const structuredRecommendations = result.recommendations.map((r) => {
    const explanation = r.reasons.find((x) => !x.toLowerCase().includes("selected strictly")) ?? "";
    return {
      ...r,
      explanation,
      suggestedInvestment: result.investmentSplit ?? null,
    };
  });

  const list =
    structuredRecommendations.length > 0
      ? structuredRecommendations
          .map((r, i) => {
            const splitText = r.suggestedInvestment
              ? `\nSuggested Investment: ₹${r.suggestedInvestment.toLocaleString("en-IN")}`
              : "";
            return r.explanation
              ? `${i + 1}. ${r.fundName}${splitText}\nExplanation: ${r.explanation}`
              : `${i + 1}. ${r.fundName}${splitText}`;
          })
          .join("\n\n")
      : "No matching funds found for the provided filters.";

  const limitationNotes = (result.notes ?? []).filter((note) => {
    const lower = note.toLowerCase();
    return (
      lower.includes("dataset contains no") ||
      lower.includes("many funds") ||
      lower.includes("exclusive filter applied")
    );
  });

  const limitationsBlock =
    limitationNotes.length > 0
      ? `\n\nNotes:\n${limitationNotes.map((n, i) => `${i + 1}. ${n}`).join("\n")}`
      : "";

  const amountLine = profile.investmentAmount 
    ? `Total Investment Amount: ₹${profile.investmentAmount.toLocaleString("en-IN")}\n\n`
    : "";

  const reply =
    `Based on the details you provided:\n\n` +
    `Name: ${profile.name}\n\n` +
    `Profession: ${profile.profession}\n\n` +
    `Investment Duration: ${profile.durationYears} Years\n\n` +
    `Investment Type: ${profile.investmentMode.toUpperCase()}\n\n` +
    amountLine +
    `I filtered the dataset using your profession-based risk profile and ${profile.durationYears}-year horizon, ` +
    `then ranked funds by internal commission percentage (not shown to users).\n\n` +
    `Top ${profile.fundCount} Mutual Fund Recommendations\n\n` +
    list +
    limitationsBlock;

  return NextResponse.json(
      {
        reply,
        state,
        inferredRisk: result.inferredRisk,
        recommendations: structuredRecommendations,
        notes: result.notes,
        ceoPromotion: structuredRecommendations.length > 0 ? ceoPromotionBlock : null,
      },
    { headers: { "Cache-Control": "no-store" } },
  );
}
