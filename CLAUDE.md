# Anthony Hinojosa Career Site — Implementation Plan

## Overview
Static career website: HTML5, CSS3, vanilla JS (ES6+). No frameworks, no build tools.
Only external dependency: Google Fonts (Inter).

## Design Decisions
- **Contact:** Email + Formspree contact form only (no phone/address publicly displayed)
- **Hero tagline:** "Quality | Safety & Emergency Response | Drone Operations"
- **In-progress certs:** WGU BS Computer Science only
- **5 capability domains:** Analytical Testing & Lab Ops, Product Quality & Compliance, Safety & Emergency Response, Field Ops & Equipment, Leadership & Cross-Functional Coordination

## File Structure
```
career-site/
├── index.html              # Hero + CTAs + credibility stats + previews
├── about.html              # Narrative + leadership philosophy + headshot
├── experience.html         # 5 capability cards + Leadership & Impact section
├── projects.html           # 5 STAR case studies + category filter
├── certifications.html     # Badge cards + In Progress section
├── blog.html               # Blog listing + category filters
├── blog-post.html          # Single post template (AI + QA in Refineries)
├── resume.html             # Web resume + download link
├── contact.html            # Formspree form + direct email + location
├── css/
│   ├── global.css          # Reset, variables, typography, utilities
│   ├── components.css      # Nav, footer, buttons, cards, tags, forms
│   └── pages.css           # Page-specific styles
├── js/
│   └── main.js             # Mobile menu, active nav, filters, form validation, scroll reveal
├── images/
│   └── headshot.jpg        # Professional headshot (converted from PNG)
├── resume.pdf              # Placeholder PDF
├── README.md               # Project documentation
└── CLAUDE.md               # This file
```

## Implementation Batches

### Batch A: Scaffolding + CSS + Shared Components
1. Create directory structure (css/, js/, images/)
2. Convert headshot PNG → JPG and place in images/
3. Create resume.pdf placeholder
4. Write css/global.css (reset, CSS custom properties, typography, layout utilities, responsive breakpoints)
5. Write css/components.css (nav, footer, buttons, cards, tags, badge, form elements)
6. Write css/pages.css (page-specific overrides)

### Batch B: HTML Page Skeletons
1. Create all 9 HTML pages with shared nav + footer structure
2. Include proper meta tags, Open Graph basics, semantic HTML5
3. Add placeholder sections for content

### Batch C: Content Integration
1. Populate index.html (hero, stats, capability previews, testimonial placeholder)
2. Populate about.html (3-paragraph narrative, leadership philosophy, headshot)
3. Populate experience.html (5 capability cards with resume bullets, Leadership & Impact section)
4. Populate projects.html (5 STAR case studies derived from resume)
5. Populate certifications.html (4 active certs + WGU in-progress)
6. Populate blog.html (listing with 1 real post + 2 placeholder cards)
7. Write blog-post.html ("How AI Could Transform Quality Assurance in Refineries", ~1000 words)
8. Populate resume.html (web resume from resume data)
9. Populate contact.html (Formspree form + email link + Corpus Christi location)

### Batch D: JavaScript
1. Mobile hamburger menu toggle
2. Active nav state based on current page
3. Project category filter (show/hide)
4. Blog category filter
5. Contact form client-side validation
6. Scroll-reveal fade-in animation (IntersectionObserver)
7. Sticky nav scroll behavior

### Batch E: QA Pass
1. Check all internal links
2. Verify responsive layout at 320/768/1024/1440
3. Accessibility audit: alt text, aria labels, focus states, contrast
4. Performance check: no heavy assets, efficient CSS
5. Final file tree output

## Content Notes
- All content derived from resume; no lorem ipsum
- Sensitive details generalized with [redact/replace] markers where needed
- Leadership verbs: coordinated, directed, facilitated, trained, implemented, resolved
- Titles kept accurate (no inflation): IC with POC/step-up responsibilities
