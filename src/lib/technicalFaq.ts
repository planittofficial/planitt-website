type TechnicalFaqEntry = {
  id: string;
  question: string;
  answer: string;
  keywords: string[];
  pathPrefixes?: string[];
  followUps?: string[];
};

export type TechnicalFaqMatch = {
  reply: string;
  suggestions: string[];
  matches: Array<Pick<TechnicalFaqEntry, "id" | "question">>;
};

const TECHNICAL_FAQ: TechnicalFaqEntry[] = [
  {
    id: "technical-services-overview",
    question: "What technical services does Planitt offer?",
    answer:
      "Planitt currently offers:\n\n- Website development\n- App development\n- Cloud services\n- Digital marketing\n- DevOps and automation\n- Cyber security\n\nIf you want, ask about one specific service and I will give a more direct answer.",
    keywords: ["services", "offer", "technical", "what do you do", "development", "marketing", "cloud", "devops", "cyber"],
    followUps: [
      "What is included in website development?",
      "What is included in app development?",
      "What does the cloud services plan cover?",
      "What is included in DevOps and automation?",
    ],
  },
  {
    id: "web-development",
    question: "What is included in website development?",
    answer:
      "Website development includes:\n\n- Modern website build with Next.js, React, TypeScript, Tailwind CSS, Node.js, and API integration\n- Discovery and planning\n- UI/UX design and prototyping\n- Development and deployment\n- Focus on performance, responsiveness, and SEO\n\nIf needed, you can also ask about project scope, maintenance, or revision policy.",
    keywords: ["website", "web", "site", "next.js", "react", "seo", "frontend", "backend"],
    pathPrefixes: ["/services/technical-services/web-dev"],
    followUps: [
      "What is included in project scope?",
      "What maintenance plans are available for web or DevOps work?",
      "What is the revision policy?",
    ],
  },
  {
    id: "app-development",
    question: "What is included in app development?",
    answer:
      "App development includes:\n\n- Native and cross-platform mobile apps\n- Backend and API integration\n- Performance and scalability focus\n- Security-minded implementation\n- Tech stack such as React, React Native, Flutter, Expo, TypeScript, Firebase, Kotlin, and Swift\n\nYou can also ask about app maintenance pricing, scope, or delivery flow.",
    keywords: ["app", "mobile", "react native", "flutter", "android", "ios", "expo", "firebase"],
    pathPrefixes: ["/services/technical-services/app-dev"],
    followUps: [
      "What maintenance plans are available for app development?",
      "What is included in project scope?",
      "How does Planitt handle project timelines?",
    ],
  },
  {
    id: "cloud-services",
    question: "What does the cloud services plan cover?",
    answer:
      "Cloud services cover:\n\n- Cloud migration\n- Infrastructure design\n- Security and IAM\n- High availability and disaster recovery\n- Load balancing and monitoring\n- Cost optimization\n\nThe service references AWS, Azure, and GCP support.",
    keywords: ["cloud", "aws", "azure", "gcp", "migration", "infrastructure", "hosting", "server"],
    pathPrefixes: ["/services/technical-services/cloud-services"],
    followUps: ["How does Planitt handle project timelines?", "How can I get a quote or discuss requirements?"],
  },
  {
    id: "devops-automation",
    question: "What is included in DevOps and automation?",
    answer:
      "DevOps and automation includes:\n\n- CI/CD pipelines\n- Deployment automation\n- Infrastructure management\n- Monitoring and quality gates\n- Docker and Kubernetes workflows\n- Better environment management and reliability\n\nThis service is meant to reduce manual work and make releases more stable.",
    keywords: ["devops", "automation", "ci/cd", "deployment", "docker", "kubernetes", "terraform", "ansible", "monitoring"],
    pathPrefixes: ["/services/technical-services/devops-automation"],
    followUps: [
      "What maintenance plans are available for web or DevOps work?",
      "What is included in project scope?",
      "How does Planitt handle project timelines?",
    ],
  },
  {
    id: "cyber-security",
    question: "What does the cyber security service include?",
    answer:
      "Cyber security includes:\n\n- Threat protection\n- Vulnerability assessment\n- Data security and encryption\n- Monitoring and detection\n- Compliance and audits\n- Risk management and incident response planning",
    keywords: ["cyber", "security", "threat", "vulnerability", "audit", "compliance", "encryption", "incident"],
    pathPrefixes: ["/services/technical-services/cyber-security"],
    followUps: ["How does Planitt handle project timelines?", "How can I get a quote or discuss requirements?"],
  },
  {
    id: "digital-marketing",
    question: "What is included in digital marketing?",
    answer:
      "Digital marketing includes:\n\n- SEO\n- Social media marketing\n- Paid advertising\n- Content marketing\n- Audience targeting\n- Performance analytics\n\nThe approach shown on the page is strategy and planning, execution and optimization, then reporting and growth.",
    keywords: ["digital marketing", "seo", "social media", "ads", "content", "audience", "campaign", "marketing"],
    pathPrefixes: ["/services/technical-services/digital-marketing"],
    followUps: ["How can I get a quote or discuss requirements?", "How does Planitt handle project timelines?"],
  },
  {
    id: "maintenance-plans-overview",
    question: "What maintenance plans are available?",
    answer:
      "Planitt shows maintenance and support plans on selected technical pages.\n\n- Monthly maintenance starts at Rs 6,999\n- Annual plans are also available\n- Final pricing and inclusions depend on the service page and project scope\n\nIf you want, ask specifically for web, app, or DevOps maintenance pricing.",
    keywords: ["maintenance plans", "maintenance", "support plans", "monthly", "annual", "pricing", "6999"],
    followUps: [
      "What maintenance plans are available for web or DevOps work?",
      "What maintenance plans are available for app development?",
      "What does maintenance cover?",
    ],
  },
  {
    id: "maintenance-plans-web-devops",
    question: "What maintenance plans are available for web or DevOps work?",
    answer:
      "For website development and DevOps:\n\n- Monthly maintenance: Rs 6,999\n- Annual maintenance: Rs 29,999\n\nPlan highlights:\n- Bug fixes and minor updates\n- Performance optimization\n- Security updates\n- Basic feature additions\n- Priority support and quarterly reviews on the annual plan",
    keywords: ["maintenance", "support", "monthly", "annual", "6999", "29999", "plan", "bug fixes", "priority support"],
    pathPrefixes: ["/services/technical-services/web-dev", "/services/technical-services/devops-automation"],
    followUps: ["What does maintenance cover?", "What is the revision policy?", "What is included in project scope?"],
  },
  {
    id: "maintenance-plans-app-dev",
    question: "What maintenance plans are available for app development?",
    answer:
      "For app development:\n\n- Monthly maintenance: Rs 6,999\n- Annual maintenance: Rs 59,999\n\nPlan highlights:\n- Bug fixes and minor updates\n- Performance optimization\n- Security updates\n- Basic feature additions\n- Priority support and advanced feature work on the annual plan",
    keywords: ["maintenance", "support", "monthly", "annual", "6999", "59999", "app maintenance", "priority support"],
    pathPrefixes: ["/services/technical-services/app-dev"],
    followUps: ["What does maintenance cover?", "What is the revision policy?", "What is included in project scope?"],
  },
  {
    id: "project-scope",
    question: "What is included in project scope?",
    answer:
      "Project scope currently states:\n\n- Complete development is included\n- Backend and database integration are included\n- Hosting and publishing are included\n- Domain purchases or app store subscriptions are separate\n\nThis applies to the technical service terms shown on the site.",
    keywords: ["scope", "included", "backend", "database", "hosting", "publishing", "domain", "app store", "what is included"],
    followUps: ["What is the revision policy?", "Are agreements signed separately?", "How can I get a quote or discuss requirements?"],
  },
  {
    id: "revision-policy",
    question: "What is the revision policy?",
    answer:
      "Revision policy:\n\n- Changes requested within the first month after project completion are included at no extra cost\n- After one month, extra changes may be charged based on complexity and time required",
    keywords: ["revision", "changes", "after launch", "after completion", "edits", "fixes", "first month"],
    followUps: ["What does maintenance cover?", "Are agreements signed separately?", "How can I get a quote or discuss requirements?"],
  },
  {
    id: "maintenance-scope",
    question: "What does maintenance cover?",
    answer:
      "Maintenance covers:\n\n- Bug fixes\n- Feature additions\n- Incremental improvements\n\nIt does not include major redevelopment or large architectural changes. Those would be quoted separately.",
    keywords: ["maintenance scope", "maintenance cover", "bug fixes", "feature additions", "redevelopment", "architecture"],
    followUps: ["What maintenance plans are available?", "What is the revision policy?", "How can I get a quote or discuss requirements?"],
  },
  {
    id: "agreements",
    question: "Are agreements signed separately?",
    answer:
      "Yes.\n\nSeparate agreements are signed for:\n- Project development\n- Monthly maintenance\n- Annual maintenance\n\nThe terms are finalized before work begins.",
    keywords: ["agreement", "contract", "signed", "terms", "before work begins"],
    followUps: ["What is included in project scope?", "What is the revision policy?"],
  },
  {
    id: "timeline",
    question: "How does Planitt handle project timelines?",
    answer:
      "Planitt shows a staged delivery process instead of one fixed public timeline.\n\nTypical flow:\n- Discovery or planning\n- Design or solution planning\n- Development\n- Testing\n- Deployment\n- Support\n\nFinal timelines depend on project scope and requirements.",
    keywords: ["timeline", "duration", "delivery", "how long", "deadline", "launch", "process"],
    followUps: ["What is included in project scope?", "How can I get a quote or discuss requirements?"],
  },
  {
    id: "contact",
    question: "How can I get a quote or discuss requirements?",
    answer:
      "To get a quote, use the main contact section and mention:\n\n- Which technical service you need\n- Your main scope or expected features\n- Whether you need maintenance or ongoing support\n- Any timeline or delivery expectations\n\nThat will make the first discussion much more precise.",
    keywords: ["quote", "contact", "consultation", "talk", "requirements", "pricing"],
    followUps: [
      "What technical services does Planitt offer?",
      "What is included in project scope?",
      "How does Planitt handle project timelines?",
    ],
  },
];

const DEFAULT_SUGGESTIONS = [
  "What technical services does Planitt offer?",
  "What is included in project scope?",
  "What maintenance plans are available?",
  "How does Planitt handle project timelines?",
];

const QUOTE_INTENT_KEYWORDS = [
  "quote",
  "quotation",
  "estimate",
  "pricing",
  "cost",
  "budget",
  "project requirement",
  "project requirements",
  "proposal",
  "mvp",
];

const SERVICE_COSTS: Record<
  "website" | "app" | "cloud" | "devops" | "cyber" | "digital-marketing",
  { label: string; min: number; max: number }
> = {
  website: { label: "Website Development", min: 25000, max: 90000 },
  app: { label: "App Development", min: 50000, max: 180000 },
  cloud: { label: "Cloud Services", min: 30000, max: 120000 },
  devops: { label: "DevOps & Automation", min: 25000, max: 100000 },
  cyber: { label: "Cyber Security", min: 25000, max: 90000 },
  "digital-marketing": { label: "Digital Marketing", min: 15000, max: 60000 },
};

type QuoteContext = {
  services: Array<keyof typeof SERVICE_COSTS>;
  features: string[];
  integrations: string[];
  timelineWeeks?: number;
  pages?: number;
  screens?: number;
  budget?: number;
  needsMaintenance: boolean;
  platforms: string[];
};

const normalize = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\s./+-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const formatInr = (amount: number) =>
  `Rs ${new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(amount)}`;

const roundToThousand = (value: number) => Math.round(value / 1000) * 1000;

const parseCount = (message: string, unit: "pages" | "screens") => {
  const pattern = unit === "pages" ? /(\d+)\s*(?:pages?|web pages?)/i : /(\d+)\s*(?:screens?|app screens?)/i;
  const match = message.match(pattern);
  if (!match) return undefined;
  const count = Number(match[1]);
  return Number.isFinite(count) ? count : undefined;
};

const parseTimelineWeeks = (message: string) => {
  const weekMatch = message.match(/(\d+)\s*(week|weeks)\b/i);
  if (weekMatch) return Number(weekMatch[1]);
  const monthMatch = message.match(/(\d+)\s*(month|months)\b/i);
  if (monthMatch) return Number(monthMatch[1]) * 4;
  return undefined;
};

const parseBudget = (message: string) => {
  const explicitBudget = message.match(/budget[^0-9]{0,24}(?:rs\.?|inr|\u20b9)?\s*([0-9][0-9,]*)/i);
  if (explicitBudget?.[1]) return Number(explicitBudget[1].replace(/,/g, ""));

  if (/\bbudget\b/i.test(message)) {
    const genericAmount = message.match(/(?:rs\.?|inr|\u20b9)\s*([0-9][0-9,]*)/i);
    if (genericAmount?.[1]) return Number(genericAmount[1].replace(/,/g, ""));
  }

  return undefined;
};

const hasQuoteIntent = (message: string) => {
  const normalized = normalize(message);
  if (QUOTE_INTENT_KEYWORDS.some((word) => normalized.includes(word))) return true;
  return /\bneed\b.*\b(website|app|software|platform|portal)\b/i.test(message);
};

const buildQuoteContext = (message: string): QuoteContext => {
  const lower = message.toLowerCase();

  const services: QuoteContext["services"] = [];
  const pushService = (service: QuoteContext["services"][number], tests: RegExp[]) => {
    if (tests.some((pattern) => pattern.test(lower)) && !services.includes(service)) services.push(service);
  };

  pushService("website", [/\bwebsite\b/, /\bweb app\b/, /\bweb development\b/, /\blanding page\b/]);
  pushService("app", [/\bmobile app\b/, /\bapp development\b/, /\bios\b/, /\bandroid\b/, /\bflutter\b/, /\breact native\b/]);
  pushService("cloud", [/\bcloud\b/, /\baws\b/, /\bazure\b/, /\bgcp\b/, /\bmigration\b/]);
  pushService("devops", [/\bdevops\b/, /\bci\/cd\b/, /\bdeployment\b/, /\bkubernetes\b/, /\bdocker\b/]);
  pushService("cyber", [/\bcyber\b/, /\bsecurity\b/, /\bvapt\b/, /\bpenetration\b/, /\baudit\b/]);
  pushService("digital-marketing", [/\bdigital marketing\b/, /\bseo\b/, /\bads\b/, /\bcampaign\b/]);

  const featureMap: Array<{ label: string; pattern: RegExp }> = [
    { label: "Authentication", pattern: /\blogin\b|\bsign[- ]?in\b|\bsign[- ]?up\b|\bauth\b/ },
    { label: "Admin Dashboard", pattern: /\badmin\b|\bdashboard\b/ },
    { label: "E-commerce", pattern: /\becommerce\b|\be-commerce\b|\bcart\b|\bcheckout\b/ },
    { label: "Booking System", pattern: /\bbooking\b|\bschedule\b|\bappointment\b/ },
    { label: "Analytics", pattern: /\banalytics\b|\breporting\b|\bmetrics\b/ },
    { label: "Notifications", pattern: /\bnotification\b|\bpush\b|\bemail alerts?\b/ },
    { label: "Role-based Access", pattern: /\brole\b|\bpermissions?\b|\brbac\b/ },
    { label: "Chat/Support", pattern: /\bchat\b|\bsupport bot\b|\bhelpdesk\b/ },
  ];
  const features = featureMap.filter((item) => item.pattern.test(lower)).map((item) => item.label);

  const integrationMap: Array<{ label: string; pattern: RegExp }> = [
    { label: "Payment Gateway", pattern: /\bpayment\b|\brazorpay\b|\bstripe\b|\bupi\b/ },
    { label: "CRM", pattern: /\bcrm\b|\bsalesforce\b|\bzoho\b|\bhubspot\b/ },
    { label: "ERP", pattern: /\berp\b|\bsap\b/ },
    { label: "Third-party APIs", pattern: /\bapi integration\b|\bthird party\b|\bexternal api\b/ },
    { label: "Maps/Location", pattern: /\bmaps?\b|\bgeolocation\b/ },
    { label: "Cloud Storage", pattern: /\bs3\b|\bcloudinary\b|\bstorage\b/ },
  ];
  const integrations = integrationMap.filter((item) => item.pattern.test(lower)).map((item) => item.label);

  const platforms = [
    /\bios\b/.test(lower) ? "iOS" : null,
    /\bandroid\b/.test(lower) ? "Android" : null,
    /\bweb\b|\bwebsite\b/.test(lower) ? "Web" : null,
  ].filter((value): value is string => Boolean(value));

  return {
    services,
    features,
    integrations,
    timelineWeeks: parseTimelineWeeks(message),
    pages: parseCount(message, "pages"),
    screens: parseCount(message, "screens"),
    budget: parseBudget(message),
    needsMaintenance: /\bmaintenance\b|\bsupport\b|\bamc\b/.test(lower),
    platforms,
  };
};

const hasEnoughForEstimate = (ctx: QuoteContext) =>
  ctx.services.length > 0 ||
  ctx.features.length >= 2 ||
  ctx.integrations.length >= 1 ||
  typeof ctx.pages === "number" ||
  typeof ctx.screens === "number";

const buildOptimizationSuggestions = (ctx: QuoteContext, estimateMin: number) => {
  const optimizations: string[] = [];

  optimizations.push("Start with an MVP: launch the top 3-5 core user journeys first, then phase advanced features.");

  if (ctx.integrations.length >= 2) {
    optimizations.push("Phase integrations: connect only mission-critical integrations in Phase 1 to reduce delivery risk.");
  }
  if (ctx.services.includes("app") && ctx.platforms.includes("iOS") && ctx.platforms.includes("Android")) {
    optimizations.push("Use a cross-platform stack for first release to lower initial build and maintenance effort.");
  }
  if (ctx.timelineWeeks && ctx.timelineWeeks <= 4) {
    optimizations.push("Your timeline is aggressive; split release into Phase 1 launch and Phase 2 enhancements.");
  }
  if (typeof ctx.budget === "number" && ctx.budget < estimateMin) {
    optimizations.push(
      `Current budget (${formatInr(ctx.budget)}) is below the indicative base (${formatInr(estimateMin)}); trim scope or defer non-core features.`
    );
  }
  if (!ctx.needsMaintenance) {
    optimizations.push("Plan a monthly maintenance window from month 1 to keep bugs, security, and performance under control.");
  }

  return optimizations.slice(0, 5);
};

const createQuoteReply = (message: string): TechnicalFaqMatch | null => {
  if (!hasQuoteIntent(message)) return null;

  const ctx = buildQuoteContext(message);
  if (!hasEnoughForEstimate(ctx)) {
    return {
      reply:
        "Absolutely. I can build a full project quotation and optimization plan.\n\nPlease share these inputs:\n- Service type (website, app, cloud/devops, security, marketing)\n- Main features (top 5)\n- Integrations needed (payment, CRM, APIs, etc.)\n- Approx pages/screens\n- Timeline (weeks/months)\n- Budget range\n- Need maintenance/support? (yes/no)\n\nAfter this, I will generate:\n- Indicative cost range\n- Delivery timeline estimate\n- Scope split (Phase 1 vs Phase 2)\n- Cost optimization suggestions based on your requirements",
      suggestions: [
        "Create a quote for a website with 10 pages and payment integration",
        "Create a quote for iOS + Android app with admin dashboard",
        "What is included in project scope?",
        "How does Planitt handle project timelines?",
      ],
      matches: [],
    };
  }

  const selectedServices = ctx.services.length > 0 ? ctx.services : ["website"];
  let estimateMin = 0;
  let estimateMax = 0;

  for (const service of selectedServices) {
    estimateMin += SERVICE_COSTS[service].min;
    estimateMax += SERVICE_COSTS[service].max;
  }

  if (ctx.pages && ctx.pages > 5) {
    estimateMin += (ctx.pages - 5) * 1200;
    estimateMax += (ctx.pages - 5) * 2500;
  }
  if (ctx.screens && ctx.screens > 8) {
    estimateMin += (ctx.screens - 8) * 2500;
    estimateMax += (ctx.screens - 8) * 6000;
  }

  estimateMin += ctx.features.length * 2000;
  estimateMax += ctx.features.length * 7000;
  estimateMin += ctx.integrations.length * 3000;
  estimateMax += ctx.integrations.length * 9000;

  if (ctx.timelineWeeks && ctx.timelineWeeks <= 4) {
    estimateMin *= 1.1;
    estimateMax *= 1.15;
  }

  estimateMin = roundToThousand(estimateMin);
  estimateMax = roundToThousand(estimateMax);

  const effortWeeks = Math.max(4, Math.round(selectedServices.length * 3 + ctx.features.length * 0.7 + ctx.integrations.length * 1.2));
  const timeline = ctx.timelineWeeks
    ? `${ctx.timelineWeeks}-${Math.max(ctx.timelineWeeks + 2, effortWeeks)} weeks (based on current scope)`
    : `${effortWeeks}-${effortWeeks + 3} weeks (indicative)`;

  const serviceLine = selectedServices.map((service) => SERVICE_COSTS[service].label).join(", ");
  const hasAppService = selectedServices.includes("app");
  const hasWebOrDevopsService = selectedServices.includes("website") || selectedServices.includes("devops");
  const maintenancePlanLine = hasAppService
    ? "- Maintenance reference (App): Rs 6,999 monthly or Rs 59,999 annual."
    : hasWebOrDevopsService
    ? "- Maintenance reference (Web/DevOps): Rs 6,999 monthly or Rs 29,999 annual."
    : "- Maintenance plans are available; final support package depends on service scope.";
  const optimizations = buildOptimizationSuggestions(ctx, estimateMin);

  const replyLines = [
    "Here is an indicative technical quotation based on your current requirements.",
    "",
    "Project Understanding",
    `- Service(s): ${serviceLine}`,
    ctx.pages ? `- Website pages: ${ctx.pages}` : null,
    ctx.screens ? `- App screens: ${ctx.screens}` : null,
    ctx.features.length ? `- Key features: ${ctx.features.join(", ")}` : null,
    ctx.integrations.length ? `- Integrations: ${ctx.integrations.join(", ")}` : null,
    ctx.budget ? `- Shared budget: ${formatInr(ctx.budget)}` : null,
    "",
    "Indicative Quotation",
    `- Estimated range: ${formatInr(estimateMin)} to ${formatInr(estimateMax)}`,
    `- Delivery window: ${timeline}`,
    maintenancePlanLine,
    ctx.needsMaintenance
      ? "- Maintenance: can be added with monthly or annual support plans after deployment."
      : "- Maintenance: recommended to add monthly support once project goes live.",
    "",
    "Optimization Suggestions",
    ...optimizations.map((item) => `- ${item}`),
    "",
    "Note: This is an indicative estimate from FAQ inputs. Final quote is confirmed after scope freeze and technical discovery.",
  ].filter(Boolean) as string[];

  return {
    reply: replyLines.join("\n"),
    suggestions: [
      "Split this quote into Phase 1 and Phase 2 deliverables",
      "Reduce this estimate for a tighter MVP budget",
      "What is included in project scope?",
      "How can I get a quote or discuss requirements?",
    ],
    matches: [{ id: "contact", question: "How can I get a quote or discuss requirements?" }],
  };
};

const scoreEntry = (entry: TechnicalFaqEntry, query: string, pathname?: string) => {
  let score = 0;

  for (const keyword of entry.keywords) {
    const normalizedKeyword = normalize(keyword);
    if (query.includes(normalizedKeyword)) score += normalizedKeyword.includes(" ") ? 5 : 3;
  }

  const normalizedQuestion = normalize(entry.question);
  if (query.includes(normalizedQuestion)) score += 8;

  if (pathname && entry.pathPrefixes?.some((prefix) => pathname.startsWith(prefix))) score += 2;

  return score;
};

const pageScopedSuggestions = (pathname?: string) => {
  if (!pathname) return DEFAULT_SUGGESTIONS;
  if (pathname.startsWith("/services/technical-services/web-dev")) {
    return [
      "What is included in website development?",
      "What maintenance plans are available for web or DevOps work?",
      "What is included in project scope?",
      "What is the revision policy?",
      "How can I get a quote or discuss requirements?",
    ];
  }
  if (pathname.startsWith("/services/technical-services/app-dev")) {
    return [
      "What is included in app development?",
      "What maintenance plans are available for app development?",
      "What is included in project scope?",
      "How does Planitt handle project timelines?",
      "What is the revision policy?",
    ];
  }
  if (pathname.startsWith("/services/technical-services/cloud-services")) {
    return [
      "What does the cloud services plan cover?",
      "How does Planitt handle project timelines?",
      "What is included in project scope?",
      "How can I get a quote or discuss requirements?",
    ];
  }
  if (pathname.startsWith("/services/technical-services/devops-automation")) {
    return [
      "What is included in DevOps and automation?",
      "What maintenance plans are available for web or DevOps work?",
      "What is included in project scope?",
      "How does Planitt handle project timelines?",
    ];
  }
  if (pathname.startsWith("/services/technical-services/cyber-security")) {
    return [
      "What does the cyber security service include?",
      "How does Planitt handle project timelines?",
      "How can I get a quote or discuss requirements?",
      "What technical services does Planitt offer?",
    ];
  }
  if (pathname.startsWith("/services/technical-services/digital-marketing")) {
    return [
      "What is included in digital marketing?",
      "How does Planitt handle project timelines?",
      "How can I get a quote or discuss requirements?",
      "What technical services does Planitt offer?",
    ];
  }
  return DEFAULT_SUGGESTIONS;
};

export const technicalFaqPrompts = [
  "What technical services does Planitt offer?",
  "What maintenance plans are available?",
  "What is included in project scope?",
  "How does Planitt handle project timelines?",
  "How can I get a quote or discuss requirements?",
  "Create a quotation based on my project requirements",
];

export function answerTechnicalFaq(message: string, pathname?: string): TechnicalFaqMatch {
  const quoteReply = createQuoteReply(message);
  if (quoteReply) return quoteReply;

  const query = normalize(message);
  const exactMatch = TECHNICAL_FAQ.find((entry) => normalize(entry.question) === query);
  if (exactMatch) {
    return {
      reply: exactMatch.answer,
      suggestions: (exactMatch.followUps?.length ? exactMatch.followUps : pageScopedSuggestions(pathname)).slice(0, 4),
      matches: [{ id: exactMatch.id, question: exactMatch.question }],
    };
  }

  const scored = TECHNICAL_FAQ.map((entry) => ({ entry, score: scoreEntry(entry, query, pathname) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  if (scored.length === 0) {
    return {
      reply:
        "I can help with Planitt technical FAQs.\n\nYou can ask about:\n- Service details\n- Project scope\n- Maintenance plans\n- Revision policy\n- Timelines\n- Contact and quote flow\n- Project-requirement-based quotation with optimization suggestions",
      suggestions: pageScopedSuggestions(pathname),
      matches: [],
    };
  }

  const best = scored[0].entry;

  return {
    reply: best.answer,
    suggestions: (best.followUps?.length ? best.followUps : pageScopedSuggestions(pathname)).slice(0, 4),
    matches: [{ id: best.id, question: best.question }],
  };
}
