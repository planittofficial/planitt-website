export interface SearchItem {
  title: string;
  description: string;
  url: string;
  category: "Service" | "Calculator" | "Page";
}

export const searchIndex: SearchItem[] = [
  // General Service Categories
  {
    title: "Financial Services",
    description: "Explore our range of financial planning and investment services",
    url: "/main#services",
    category: "Service",
  },
  {
    title: "Technical Services",
    description: "Modern technical solutions for businesses and individuals",
    url: "/main#services",
    category: "Service",
  },

  // Financial Services & Calculators
  {
    title: "SIP Calculator",
    description: "Calculate monthly investments using SIP and see wealth growth over time",
    url: "/services/financial-services/sip",
    category: "Calculator",
  },
  {
    title: "SWP Calculator",
    description: "Plan systematic withdrawals from your investments for regular income",
    url: "/services/financial-services/swp",
    category: "Calculator",
  },
  {
    title: "Goal Setting Calculator",
    description: "Calculate monthly SIP required to achieve your future financial goals",
    url: "/services/financial-services/goal-setting",
    category: "Calculator",
  },
  {
    title: "NPS Calculator",
    description: "Plan your retirement with SIP + SWP and Daily SIP calculators",
    url: "/services/financial-services/nps",
    category: "Calculator",
  },
  {
    title: "Budgeting",
    description: "Track expenses, plan your budget and visualize your spending patterns",
    url: "/services/financial-services/budgeting",
    category: "Calculator",
  },
  {
    title: "Insurance",
    description: "Comprehensive life and health insurance solutions for family protection",
    url: "/services/financial-services/insurance",
    category: "Service",
  },

  // Technical Services
  {
    title: "Website Development",
    description: "Modern, responsive and scalable website development services",
    url: "/services/technical-services/web-dev",
    category: "Service",
  },
  {
    title: "App Development",
    description: "Native & cross-platform mobile application development solutions",
    url: "/services/technical-services/app-dev",
    category: "Service",
  },
  {
    title: "Cloud Services",
    description: "Scalable, secure and reliable cloud computing solutions",
    url: "/services/technical-services/cloud-services",
    category: "Service",
  },
  {
    title: "Cyber Security",
    description: "Robust protection from digital threats and security vulnerabilities",
    url: "/services/technical-services/cyber-security",
    category: "Service",
  },
  {
    title: "DevOps & Automation",
    description: "Streamline development workflows with automated delivery pipelines",
    url: "/services/technical-services/devops-automation",
    category: "Service",
  },
  {
    title: "Digital Marketing",
    description: "Enhance your brand presence with strategic digital marketing",
    url: "/services/technical-services/digital-marketing",
    category: "Service",
  },
  {
    title: "Technical Training",
    description: "Personalized technical advice and hands-on industry training",
    url: "/services/technical-training",
    category: "Service",
  },

  // Pages & Sections
  {
    title: "Home",
    description: "Planitt - Plan Your Dreams with our financial & technical expertise",
    url: "/main",
    category: "Page",
  },
  {
    title: "About Us",
    description: "Learn more about Planitt, our mission, and our expert team",
    url: "/main#about",
    category: "Page",
  },
  {
    title: "Careers",
    description: "Join our team and build your professional future with us",
    url: "/careers",
    category: "Page",
  },
  {
    title: "Blogs & Insights",
    description: "Read latest articles on finance, technology and innovation",
    url: "/blogs",
    category: "Page",
  },
  {
    title: "Testimonials",
    description: "See what our satisfied clients say about their journey with us",
    url: "/main#testimonials",
    category: "Page",
  },
  {
    title: "Contact Us",
    description: "Get in touch for personalized financial and technical consultations",
    url: "/main#contact",
    category: "Page",
  },
  {
    title: "Financial Growth Calculator",
    description: "Calculate your potential returns and plan your wealth growth",
    url: "/main#calculator",
    category: "Calculator",
  },
];
