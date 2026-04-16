# Planitt Website Structure

## 1. Platform Overview

- Framework: Next.js App Router
- Styling: Tailwind CSS
- Animation/UI: Framer Motion, Lucide React, Recharts
- Global layout: `src/app/layout.tsx`
- Shared wrapper: `src/components/ConditionalLayout.tsx`

## 2. Global App Flow

### Root experience

- `/`
  - Product-style landing page for the Planitt multi-asset recommendation platform
  - Uses `src/components/LandingPage.tsx`
- `/main`
  - Main Planitt company website
  - Uses `src/app/main/page.tsx`

### Shared layout outside `/`

For all routes except `/`, the app renders:

- Global header
- Page content
- Global footer
- Wealth advisory floating assistant
- Technical FAQ floating assistant

Files:

- `src/components/Header.tsx`
- `src/components/Footer.tsx`
- `src/components/WealthAdvisoryFab.tsx`
- `src/components/TechnicalFaqFab.tsx`

## 3. Primary Sitemap

### Entry and core pages

- `/`
  - Landing page
- `/main`
  - Main homepage
- `/careers`
  - Careers and hiring page
- `/case-studies`
  - Searchable case study library with Technical/Financial tabs
- `/blogs`
  - Blog listing page
- `/app-showcase`
  - App showcase experience
- `/mutual-fund-bot`
  - Mutual fund recommendation bot preview
- `/wealth-advisory`
  - Wealth advisory chat page

### Financial services

- `/services/financial-services/goal-setting`
  - Goal setting calculator
- `/services/financial-services/sip`
  - SIP calculator page
- `/services/financial-services/swp`
  - SWP calculator page
- `/services/financial-services/nps`
  - Combined NPS calculator
- `/services/financial-services/budgeting`
  - Budgeting calculator
- `/services/financial-services/Daily-Expense-Tracker`
  - Daily SIP / expense tracker style calculator
- `/services/financial-services/insurance`
  - Insurance plans + NPS educational content + NPS calculator

### Technical services

- `/services/technical-training`
  - Training tracks and roadmap
- `/services/technical-services/app-dev`
  - App development service page
- `/services/technical-services/web-dev`
  - Website development service page
- `/services/technical-services/cloud-services`
  - Cloud services page
- `/services/technical-services/digital-marketing`
  - Digital marketing page
- `/services/technical-services/devops-automation`
  - DevOps and automation page
- `/services/technical-services/cyber-security`
  - Cyber security page

## 4. Homepage Structure

## `/` Landing Page

File: `src/components/LandingPage.tsx`

Sections:

1. Header
2. Hero for Planitt Multi Asset Recommendations Platform
3. Insight section with Problem/Solution tab switch
4. How It Works 4-step workflow
5. App Screens Showcase
6. Why Planitt callout cards
7. Market Landscape comparison
8. Final CTA: Continue to services

Purpose:

- Acts as a product-facing first impression
- Pushes users into the main business site via `/main`

## `/main` Main Website

File: `src/app/main/page.tsx`

Sections in order:

1. Hero
2. Services
3. Portfolio
4. About
5. Testimonials
6. Contact

Files:

- `src/components/Hero.tsx`
- `src/components/Services.tsx`
- `src/components/Portfolio.tsx`
- `src/components/About.tsx`
- `src/components/Testimonials.tsx`
- `src/components/Contact.tsx`

## 5. Homepage Section Details

### Hero

- Dual-mode homepage
- Toggle between:
  - Technical
  - Financial
- Changes messaging, stats, colors, and CTA destinations

### Services

- Can show:
  - All solutions
  - Financial only
  - Technical only
- Main service discovery hub for the site

Financial cards:

- Goal Setting
- Insurance & NPS
- SIP & SWP
- Budgeting
- Daily SIP Tracker

Technical cards:

- Application Development
- Website Development
- Cloud Services
- Digital Marketing
- DevOps & Automation
- Cyber Security

### Portfolio

Two project groups:

- Web Development Projects
  - Coffee Culture
  - Capita Prime LLC
  - Sawarnaratna
  - Krypsm
  - ZeyNix
- App Development Projects
  - Investor Dashboard App
  - Bhav App
  - Coming Soon recommendation app

### About

Mode-aware company profile:

- Technical mode highlights CTO-led execution
- Financial mode highlights CEO-led advisory
- Shared values and impact stats

### Testimonials

Mode-aware testimonial slider:

- Financial client testimonials
- Technical delivery testimonials

### Contact

- Single CTA-focused contact section
- WhatsApp lead capture
- Message text changes depending on current mode

## 6. Secondary Pages

### Careers

File: `src/app/careers/page.tsx`

Main blocks:

1. Join Our Team hero
2. Why Work With Us
3. Benefits & Perks
4. Meet Our Team
5. Open Positions
6. Application Form
7. Hiring Process timeline

### Case Studies

File: `src/app/case-studies/page.tsx`

Features:

- Technical / Financial tab switch
- Search input
- PDF case study links

Current case items:

- Investor Dashboard Platform
- ZeyNix E-commerce Platform
- Krypsm Trading Dashboard

### Blogs

File: `src/app/blogs/page.tsx`

- Dedicated blog listing page
- Homepage blog section is currently hidden

### App Showcase

File: `src/app/app-showcase/page.tsx`

- Renders `AppShowcasePageClient`
- Dedicated product/app presentation page

## 7. Financial Service Structure

### Calculators and advisory tools

- Goal Setting
  - Goal-based investment planning
- SIP
  - Monthly investment growth calculator
- SWP
  - Withdrawal planning calculator
- NPS
  - Combined NPS planning calculator
- Budgeting
  - Personal budgeting tool
- Daily Expense Tracker
  - Multi-entry daily SIP growth planner with charts

### Insurance page

Combines:

- Health insurance plan recommendations
- Term insurance plan recommendations
- NPS education
- NPS calculator

## 8. Technical Service Structure

### Technical Training

Contains:

- Training tracks
- Learning roadmap
- Technology stack
- Career-oriented positioning

### App Development

Contains:

- Hero
- Core services
- Key features
- Technologies used
- Project showcase
- Pricing / maintenance-oriented content

### Website Development

Contains:

- Hero
- Key features
- Technologies used
- Development approach
- Project showcase

### Cloud Services

Contains:

- Hero
- Core service cards
- Key features
- Cloud technologies
- Cloud case study placeholder
- CTA

### Digital Marketing

Contains:

- Hero
- Marketing service cards
- Key features
- Marketing approach
- Placeholder projects / CTA structure

### DevOps & Automation

Contains:

- Hero
- Service cards
- Key features
- Project placeholder
- Maintenance and support plans

### Cyber Security

Contains:

- Hero
- Security service cards
- Key features
- Security approach
- Project placeholder

## 9. Search and Discovery

File: `src/components/SearchBar.tsx`

Search index source:

- `src/lib/searchIndex.ts`

Search covers:

- Services
- Calculators
- Major pages

## 10. AI and Chat Features

### Frontend assistants

- `src/components/WealthAdvisoryFab.tsx`
- `src/components/TechnicalFaqFab.tsx`
- `src/components/MutualFundBotClient.tsx`
- `src/components/WealthAdvisoryChatClient.tsx`
- `src/components/TechnicalFaqChatClient.tsx`

### API routes

- `src/app/api/mutual-fund-bot/route.ts`
- `src/app/api/technical-faq/route.ts`
- `src/app/api/wealth-advisory/chat/route.ts`

## 11. Reusable Component Groups

### Layout and shell

- `Header.tsx`
- `Footer.tsx`
- `ConditionalLayout.tsx`
- `ServicePageLayout.tsx`
- `AppShell.tsx`

### Homepage and section components

- `Hero.tsx`
- `Services.tsx`
- `Portfolio.tsx`
- `ProjectSection.tsx`
- `About.tsx`
- `Testimonials.tsx`
- `Contact.tsx`

### Product showcase components

- `AppShowcasePageClient.tsx`
- `SingleSectionAppShowcase.tsx`
- `HorizontalScreensSection.tsx`
- `InHouseAppScrollShowcase.tsx`
- `FlipScreenSection.tsx`
- `AppScreenSection.tsx`
- `CombinedSnapshot1.tsx`
- `CombinedSnapshot2.tsx`

### Calculator components

- `ServiceCalculator.tsx`
- `SIPCalculator.tsx`
- `NPSCalculator.tsx`
- `CombinedNPSCalculator.tsx`
- `BudgetingCalculator.tsx`
- `DailySIPCalculator.tsx`
- `FinancialCalculator.tsx`

## 12. Content and Assets

### Public assets

- Company logos
- Team member photos
- Client/project visuals
- App screenshots
- PDFs and certificates

Main folder:

- `public/`

### Data and domain logic

- `src/lib/mutualFundBot.ts`
- `src/lib/planittWealthAdvisory.ts`
- `src/lib/technicalFaq.ts`
- `src/lib/serviceBots.ts`
- `src/data/mutualFundsDataset.json`

## 13. Test Coverage Present in Repo

Playwright tests exist for:

- Landing and about
- Careers
- Mutual fund bot
- Chatbot visibility
- About impact

Folder:

- `tests/`

## 14. Simplified Site Tree

```text
/
|-- /main
|   |-- Hero
|   |-- Services
|   |-- Portfolio
|   |-- About
|   |-- Testimonials
|   `-- Contact
|-- /careers
|-- /case-studies
|-- /blogs
|-- /app-showcase
|-- /mutual-fund-bot
|-- /wealth-advisory
`-- /services
    |-- /financial-services
    |   |-- /goal-setting
    |   |-- /sip
    |   |-- /swp
    |   |-- /nps
    |   |-- /budgeting
    |   |-- /Daily-Expense-Tracker
    |   `-- /insurance
    `-- /technical-services
        |-- /app-dev
        |-- /web-dev
        |-- /cloud-services
        |-- /digital-marketing
        |-- /devops-automation
        `-- /cyber-security
```

## 15. Best Way to Think About This Website

This website is not a single marketing page. It is a hybrid platform with four layers:

1. Product landing experience at `/`
2. Company/service homepage at `/main`
3. Deep service funnels for financial and technical offerings
4. Utility layer with calculators, search, chat assistants, and case-study proof
