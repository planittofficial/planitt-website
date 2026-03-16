export const isTechnicalServicesPath = (pathname?: string | null) =>
  Boolean(pathname?.startsWith("/services/technical-services"));

export const isFinancialServicesPath = (pathname?: string | null) =>
  Boolean(pathname?.startsWith("/services/financial-services"));

export const shouldShowTechnicalFaqBot = (
  pathname?: string | null,
  homeMode?: "financial" | "technical"
) =>
  isTechnicalServicesPath(pathname) ||
  ((pathname === "/" || pathname === "/main") && homeMode === "technical");
