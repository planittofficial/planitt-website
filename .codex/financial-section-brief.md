# Financial section brief

## Objective
Add a new financial-only section directly below the existing About section on `/main`. It should feel like a natural continuation of the financial mode, using the visual language already present in `src/components/About.tsx`, `src/components/about/about-shared.tsx`, and `src/app/globals.css`.

## User intent and reference
The user wants a section similar in spirit to the supplied `C:\Users\vansh\Downloads\landing_template.html`, below the current About section. Use the template as inspiration for a premium practitioner-led learning/advisory section: clear curriculum-style content, a mentor/instructor panel, and an action-oriented closing panel. Do not copy its olive editorial palette; adapt it to Planitt's dark navy, gold, muted violet, glass-card aesthetic.

## Content direction
Name the section something like “The Planitt Financial Playbook” with eyebrow “Financial Learning Desk”. Position it as an educational/advisory framework, not a guaranteed-return product. Include:
- A strong headline about turning market noise into a repeatable wealth plan.
- A short paragraph emphasizing structured learning, goal planning, risk awareness, and long-term investing.
- Three or four curriculum cards: Market Foundations, Goal-Based Planning, Portfolio Discipline, and Risk & Review.
- A compact mentor card featuring `/CEO_Photo.png`, Piyush Tembhekar, ARN - 338883, and a concise role line.
- A bottom call-to-action / format strip inviting users to explore financial tools or start with a guided plan. Link it to `/calculators`.

## Aesthetic direction
Premium financial editorial: dark `#0B0F19` surfaces, white text, slate secondary text, gold `#f5b544` / `#f7c86e` accents, subtle violet glow, thin white borders, rounded 2xl/3xl cards, restrained motion via existing Framer Motion utilities. Make it feel distinct from the existing About grid while still belonging to the same system. Avoid external images, external fonts, gradients that reduce text contrast, or loud marketing claims.

## Technical constraints
- Use the existing Next.js/React/TypeScript/Tailwind setup.
- Create a focused component under `src/components/`, then add it immediately after `<About mode={homeMode} />` in `src/app/main/page.tsx`.
- Render it only when `homeMode === 'financial'` so technical mode is unchanged.
- Use `next/image` for the local CEO image and lucide-react icons already installed.
- Keep it responsive: one column on mobile, two-column editorial layout on large screens.
- Respect reduced motion where practical through existing Framer Motion patterns.
- Do not modify unrelated sections.

## Verification
Run lint and/or TypeScript/build checks appropriate to the repo after implementation. Report changed files.
