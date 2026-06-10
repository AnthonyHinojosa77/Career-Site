# Anthony Hinojosa, Career Site
Live site: https://anthonyhinojosa.com

Static personal career website built with HTML5, CSS3, and vanilla JavaScript (ES6+).
Design system: "Industrial Precision", a paper/ink palette with a single signal-orange
accent, editorial serif display, and mono technical readouts.

## Tech Stack

- **HTML5**, semantic markup, WCAG 2.1 AA accessible
- **CSS3**, custom properties, responsive grid, light/dark themes
- **JavaScript**, vanilla ES6+, no frameworks or dependencies
- **Fonts**, Instrument Serif, Inter, and JetBrains Mono via Google Fonts

## Run / Use

No build step required. Open `index.html` in a browser or serve with any static file server:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Pages

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Hero, ticker, stats, capability index, featured work |
| About | `about.html` | Narrative, headshot, leadership philosophy |
| Experience | `experience.html` | Capability cards, timeline, work history |
| Map | `mindmap.html` | Interactive experience map with expand/collapse + camera pan |
| STAR Story | `star.html` | STAR story template, one per domain via `?domain=` |
| Projects | `projects.html` | STAR-format case studies with category filter |
| Certifications | `certifications.html` | Active certs + in-progress education |
| Skills | `skills.html` | Six skill domains, each linking to its STAR story |
| Writing | `blog.html` | Writing listing with category filter |
| Blog Post | `blog-post.html` | Full article template |
| Resume | `resume.html` | Web resume + PDF download |
| Contact | `contact.html` | Contact form + info |

## Structure

```
career-site/
├── index.html
├── about.html
├── experience.html
├── mindmap.html
├── star.html
├── projects.html
├── certifications.html
├── skills.html
├── blog.html
├── blog-post.html
├── resume.html
├── contact.html
├── css/
│   ├── system.css      # Design tokens, reset, shared components
│   └── pages.css       # Tweaks panel + page-specific styles
├── js/
│   ├── site.js         # Reveal, counters, theme/tweaks, filters, clock
│   ├── mindmap-data.js # Experience-map data
│   └── mindmap.js      # Experience-map engine
├── images/
│   └── headshot.jpg
├── resume.pdf
├── README.md
└── CLAUDE.md
```

## Production Status

- [x] Contact form delivers via FormSubmit.co to anthonymhinojosa@gmail.com
      (the very first submission triggers a one-time confirmation email from
      FormSubmit; click it once and all future messages deliver automatically)
- [x] Real email wired site-wide (footers, contact page)
- [x] Resume PDF is the current 2026 resume
- [x] Favicon, meta descriptions, robots.txt, styled 404 page
- [x] No dead links; social link points to GitHub

## Remaining (owner input needed)

- [ ] Add a LinkedIn URL when ready (currently linking to GitHub)
- [ ] Confirm certification dates (NREMT, OSHA 30, HAZWOPER)
