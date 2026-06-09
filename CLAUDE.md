# Anthony Hinojosa Career Site, Project Guide

## Overview
Static career website: HTML5, CSS3, vanilla JS (ES6+). No frameworks, no build tools.
External dependency: Google Fonts (Instrument Serif, Inter, JetBrains Mono).

## Design System: "Industrial Precision"
Operator-meets-technologist aesthetic. Paper/ink palette with a single signal-orange
accent, editorial serif display paired with mono technical readouts.

- **Palette:** `--paper #F4F1EA`, `--ink #0E0E10`, `--signal #C2441C` (one accent).
  Light/dark themes via `body[data-theme]`. All tokens live in `css/system.css`.
- **Type:** Instrument Serif (display), Inter (body), JetBrains Mono (readouts).
- **Motif:** File-numbered sections, serial-code IDs (CAP-01, EDU-01), crosshair
  corners, live UTC clock, "dossier" vocabulary across every page.
- **House rule:** No em-dashes anywhere in the site (copy, comments, or markup).

## File Structure
```
career-site/
├── index.html              # Hero + ticker + stats + capability index + featured work + CTA
├── about.html              # Narrative + leadership philosophy + headshot
├── experience.html         # Capability cards + timeline
├── mindmap.html            # Interactive experience map (camera-pan, expand/collapse)
├── star.html               # STAR story template, one per domain via ?domain= param
├── projects.html           # STAR case studies + category filter
├── certifications.html     # Badge cards + In Progress section
├── skills.html             # Six skill domains, each linking to its STAR story
├── blog.html               # Writing listing + category filters
├── blog-post.html          # Single post (AI + QA in Refineries)
├── resume.html             # Web resume + PDF download
├── contact.html            # Contact form + direct email + location
├── css/
│   ├── system.css          # Design tokens, reset, nav, footer, buttons, cards, helpers
│   └── pages.css           # Tweaks panel + page-specific components
├── js/
│   ├── site.js             # Reveal, counters, theme/tweaks panel, filters, live clock
│   ├── mindmap-data.js     # Domain + leaf data for the experience map
│   └── mindmap.js          # Mind map engine (build, layout, camera pan, detail panel)
├── images/
│   └── headshot.jpg        # Professional headshot
├── resume.pdf              # Downloadable resume
├── README.md
└── CLAUDE.md               # This file
```

## Shared conventions
- **Nav (every page):** Index · About · Experience · Map · Projects · Certs · Contact.
  `aria-current="page"` marks the active link. Blog/Resume/Skills are reached via the footer.
- **Footer:** four columns (identity / Site / Credentials / Contact) + mono bottom bar with
  live UTC clock (`[data-clock]`).
- **Reveal:** add class `reveal` (and the IntersectionObserver in `site.js` adds `in`).
- **Counters:** `[data-counter]` with optional `[data-suffix]`.
- **Filters:** wrap in `[data-filter-group="name"]`, buttons use `[data-filter]` and toggle
  `.on`; items use `[data-filter-item="name"]` + `[data-category]`.
- **Tweaks panel:** toolbar-activated; swaps theme (Paper/Ink), hero variant, and accent color.
  Persists to `localStorage` (`ah-theme`, `ah-tweaks`).

## Mind map (mindmap.html + js/mindmap*.js)
Progressive-disclosure map with a camera that pans the focused node to center.
- Center → 6 domains → skill leaves. Click center to expand domains; click a domain to
  branch its leaves and open the detail panel; click a leaf to open its detail + scroll to it.
- Leaf and domain detail panels link to `star.html?domain=<key>` for the full STAR story.
- Deep link: `mindmap.html?open=<key>` auto-opens a domain. Escape steps back up.
- Domains are defined once in `js/mindmap-data.js` (`window.MM_DOMAINS`).

## Content Notes
- All content derived from resume; no lorem ipsum.
- Titles kept accurate (IC with POC/step-up responsibilities).
- The six skill domains map 1:1 to the six STAR stories in `star.html`:
  analytical, quality, response, field, liaison, cs.
