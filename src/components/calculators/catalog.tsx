import type { ReactNode } from 'react';
import {
  ArrowUpRight,
  Calendar,
  PiggyBank,
  ShieldCheck,
  Wallet,
} from 'lucide-react';
import BudgetingCalculator from '@/components/BudgetingCalculator';
import CombinedNPSCalculator from '@/components/CombinedNPSCalculator';
import DailySIPCalculator from '@/components/DailySIPCalculator';
import ServiceCalculator from '@/components/ServiceCalculator';

export type CalculatorItem = {
  slug: string;
  title: string;
  description: string;
  icon: ReactNode;
};

export const calculatorCatalog: CalculatorItem[] = [
  {
    slug: 'goal-setting',
    title: 'Goal Setting',
    description: 'Plan the monthly investment needed for a target corpus.',
    icon: <ArrowUpRight className="h-5 w-5" />,
  },
  {
    slug: 'sip',
    title: 'SIP',
    description: 'Estimate long-term growth from regular monthly investing.',
    icon: <PiggyBank className="h-5 w-5" />,
  },
  {
    slug: 'nps-swp',
    title: 'NPS & SWP',
    description: 'Compare income and retirement withdrawal scenarios.',
    icon: <ShieldCheck className="h-5 w-5" />,
  },
  {
    slug: 'budgeting',
    title: 'Budgeting',
    description: 'Track income, expense, savings, and goal projections.',
    icon: <Wallet className="h-5 w-5" />,
  },
  {
    slug: 'daily-sip',
    title: 'Daily SIP',
    description: 'Model recurring daily investments and portfolio growth.',
    icon: <Calendar className="h-5 w-5" />,
  },
];

export function getCalculatorBySlug(slug: string) {
  return calculatorCatalog.find((item) => item.slug === slug);
}

export function renderCalculator(slug: string) {
  switch (slug) {
    case 'goal-setting':
      return (
        <ServiceCalculator
          serviceType="goal-setting"
          title="Goal Setting Calculator"
          description="Calculate how much you need to invest monthly to achieve your financial goals."
        />
      );
    case 'sip':
      return (
        <ServiceCalculator
          serviceType="sip"
          title="SIP Calculator"
          description="Plan systematic investing with a realistic long-term compounding view."
        />
      );
    case 'nps-swp':
      return <CombinedNPSCalculator />;
    case 'budgeting':
      return <BudgetingCalculator />;
    case 'daily-sip':
      return <DailySIPCalculator />;
    default:
      return null;
  }
}

export const calculatorPageAccent = 'from-[#f5b544] via-[#f59e0b] to-[#ffd27a]';
export const calculatorShellClass =
  'min-h-screen bg-[#f5f7fb] text-gray-900 transition-colors duration-300 dark:bg-[#050505] dark:text-white [color-scheme:light] dark:[color-scheme:dark]';

export const calculatorCardClass =
  'rounded-[28px] border border-black/5 bg-white/85 backdrop-blur-2xl transition duration-300 dark:border-white/10 dark:bg-white/[0.04]';

export const calculatorIconWrapClass =
  'flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f5b544]/12 text-[#b77912] dark:text-[#f7c86e]';

export const calculatorHeaderCopy = {
  eyebrow: 'PLANITT Calculators',
  title: 'Financial Planning Calculators',
  subtitle: 'Use the live tools. Move between calculators without leaving the workflow.',
  badge: 'SEBI-aligned planning experience',
  empty: 'Calculator not found.',
  emptyDetail: 'Choose another tool from the sidebar.',
  sidebarTitle: 'All calculators',
  hubNote: 'Built for fast comparison, not buried navigation.',
  cta: 'Open calculator',
  breadcrumbHome: 'Home',
  breadcrumbCalculators: 'Calculators',
  academyHref: '/services/technical-training',
};
