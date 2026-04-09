import { NextResponse } from "next/server";
import { answerTechnicalFaq } from "@/lib/technicalFaq";

export const runtime = "nodejs";

type QuoteYesNo = "yes" | "no";

type QuoteFlowState = {
  active?: boolean;
  lastAsked?:
    | "serviceType"
    | "features"
    | "integrations"
    | "pagesScreens"
    | "timeline"
    | "budget"
    | "maintenance";
  serviceType?: string;
  features?: string;
  integrations?: string;
  pagesScreens?: string;
  timeline?: string;
  budget?: string;
  maintenance?: QuoteYesNo;
};

type TechnicalFaqState = {
  quoteFlow?: QuoteFlowState;
};

type TechnicalFaqRequest = {
  message?: unknown;
  pathname?: unknown;
  state?: unknown;
};

const ctoPromotion = {
  title: "Technical Support",
  lines: [
    "For the next step, if you want help with the technical process, we can assist you.",
    "Please contact our CTO, Parth Shende, for further assistance.",
    "Contact Number: +91 9145402183",
  ],
};

const QUOTE_INTENT = /\b(quote|quotation|estimate|pricing|cost|budget|proposal|project requirements?)\b/i;
const RESTART_QUOTE = /\b(restart|start over|new quote|new quotation)\b/i;

const parseYesNo = (message: string): QuoteYesNo | null => {
  const lower = message.toLowerCase();
  if (/\b(yes|y|yeah|yep|sure|ok|okay)\b/.test(lower)) return "yes";
  if (/\b(no|n|nope|nah)\b/.test(lower)) return "no";
  return null;
};

const nextMissingQuoteField = (flow: QuoteFlowState) => {
  if (!flow.serviceType) return "serviceType" as const;
  if (!flow.features) return "features" as const;
  if (!flow.integrations) return "integrations" as const;
  if (!flow.pagesScreens) return "pagesScreens" as const;
  if (!flow.timeline) return "timeline" as const;
  if (!flow.budget) return "budget" as const;
  if (!flow.maintenance) return "maintenance" as const;
  return null;
};

const askQuoteQuestion = (field: NonNullable<QuoteFlowState["lastAsked"]>) => {
  if (field === "serviceType") {
    return "Great, let's build your quotation step by step.\n\n1. Which service do you need? (website, app, cloud/devops, cyber security, or digital marketing)";
  }
  if (field === "features") {
    return "2. What are the top features you need? (share up to 5, comma-separated)";
  }
  if (field === "integrations") {
    return "3. Which integrations are required? (payment, CRM, APIs, etc. If none, reply: none)";
  }
  if (field === "pagesScreens") {
    return "4. Rough size: how many pages (website) or screens (app)?";
  }
  if (field === "timeline") {
    return "5. What timeline are you targeting? (example: 6 weeks or 2 months)";
  }
  if (field === "budget") {
    return "6. What is your budget range? (example: Rs 1,50,000 to Rs 2,50,000)";
  }
  return "7. Do you also need maintenance/support after launch? (yes/no)";
};

const applyQuoteAnswer = (flow: QuoteFlowState, message: string) => {
  const trimmed = message.trim();
  const field = flow.lastAsked ?? nextMissingQuoteField(flow);
  if (!field || !trimmed) return flow;

  if (field === "maintenance") {
    const yn = parseYesNo(trimmed);
    if (yn) {
      flow.maintenance = yn;
    }
    return flow;
  }

  if (field === "serviceType") flow.serviceType = trimmed;
  if (field === "features") flow.features = trimmed;
  if (field === "integrations") flow.integrations = trimmed;
  if (field === "pagesScreens") flow.pagesScreens = trimmed;
  if (field === "timeline") flow.timeline = trimmed;
  if (field === "budget") flow.budget = trimmed;

  return flow;
};

const toQuotePrompt = (flow: QuoteFlowState) =>
  [
    "Create a quotation based on my project requirements.",
    `Service: ${flow.serviceType}`,
    `Features: ${flow.features}`,
    `Integrations: ${flow.integrations}`,
    `Pages/Screens: ${flow.pagesScreens}`,
    `Timeline: ${flow.timeline}`,
    `Budget: ${flow.budget}`,
    `Maintenance: ${flow.maintenance}`,
  ].join("\n");

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as TechnicalFaqRequest;
    const message = typeof body.message === "string" ? body.message.trim() : "";
    const pathname = typeof body.pathname === "string" ? body.pathname : undefined;
    const incomingState =
      body.state && typeof body.state === "object" ? (body.state as TechnicalFaqState) : ({} as TechnicalFaqState);
    const state: TechnicalFaqState = { ...incomingState };

    if (!message) {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }

    const isQuoteRequest = QUOTE_INTENT.test(message);
    if (RESTART_QUOTE.test(message)) {
      state.quoteFlow = { active: true };
      const first = "serviceType";
      state.quoteFlow.lastAsked = first;
      return NextResponse.json({
        reply: askQuoteQuestion(first),
        suggestions: ["Website development", "App development", "Cloud + DevOps", "Cyber security"],
        state,
        ctoPromotion: null,
      });
    }

    if (isQuoteRequest || state.quoteFlow?.active) {
      const flow: QuoteFlowState = { ...(state.quoteFlow ?? { active: true }) };
      flow.active = true;

      if (state.quoteFlow?.lastAsked) {
        applyQuoteAnswer(flow, message);
      } else if (isQuoteRequest) {
        // For first quote-trigger message, try to capture details already present.
        if (/\bwebsite|web\b/i.test(message)) flow.serviceType = flow.serviceType ?? "website";
        if (/\bapp|ios|android|react native|flutter\b/i.test(message)) {
          flow.serviceType = flow.serviceType ?? "app";
        }
      }

      const nextField = nextMissingQuoteField(flow);
      if (nextField) {
        if (nextField === "maintenance" && flow.lastAsked === "maintenance" && !flow.maintenance) {
          state.quoteFlow = flow;
          return NextResponse.json({
            reply: "Please reply with yes or no for maintenance/support after launch.",
            suggestions: ["Yes", "No"],
            state,
            ctoPromotion: null,
          });
        }

        flow.lastAsked = nextField;
        state.quoteFlow = flow;

        return NextResponse.json({
          reply: askQuoteQuestion(nextField),
          suggestions:
            nextField === "serviceType"
              ? ["Website development", "App development", "Cloud + DevOps", "Digital marketing"]
              : nextField === "maintenance"
              ? ["Yes", "No"]
              : undefined,
          state,
          ctoPromotion: null,
        });
      }

      const quote = answerTechnicalFaq(toQuotePrompt(flow), pathname);
      state.quoteFlow = { ...flow, active: false };

      return NextResponse.json({
        ...quote,
        suggestions: [
          "Restart quotation flow",
          "Split this quote into Phase 1 and Phase 2 deliverables",
          "Reduce this estimate for a tighter MVP budget",
          "How can I get a quote or discuss requirements?",
        ],
        state,
        ctoPromotion,
      });
    }

    const answer = answerTechnicalFaq(message, pathname);

    return NextResponse.json({
      ...answer,
      state,
      ctoPromotion,
    });
  } catch {
    return NextResponse.json({ error: "Unable to answer technical FAQ right now." }, { status: 500 });
  }
}
