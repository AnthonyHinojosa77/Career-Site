# Anthony Hinojosa — Career Site

Static personal career website built with HTML5, CSS3, and vanilla JavaScript (ES6+).

## Tech Stack

- **HTML5** — Semantic markup, WCAG 2.1 AA accessible
- **CSS3** — Custom properties, responsive grid, mobile-first
- **JavaScript** — Vanilla ES6+, no frameworks or dependencies
- **Font** — Inter via Google Fonts

## Run / Use

No build step required. Open `index.html` in a browser or serve with any static file server:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Pages

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Hero, stats, capability previews, blog preview |
| About | `about.html` | Narrative, headshot, leadership philosophy |
| Experience | `experience.html` | Capability cards, leadership section, work history |
| Projects | `projects.html` | 5 STAR-format case studies with category filter |
| Certifications | `certifications.html` | Active certs + in-progress education |
| Blog | `blog.html` | Blog listing with category filter |
| Blog Post | `blog-post.html` | Full article template |
| Resume | `resume.html` | Web resume + PDF download |
| Contact | `contact.html` | Formspree contact form + info |

## Structure

```
career-site/
├── index.html
├── about.html
├── experience.html
├── projects.html
├── certifications.html
├── blog.html
├── blog-post.html
├── resume.html
├── contact.html
├── css/
│   ├── global.css
│   ├── components.css
│   └── pages.css
├── js/
│   └── main.js
├── images/
│   └── headshot.jpg
├── resume.pdf
├── README.md
└── CLAUDE.md
```

## Placeholder Checklist

- [ ] Replace Formspree endpoint in `contact.html`: `YOUR_FORM_ID`
- [ ] Replace `resume.pdf` with actual resume PDF
- [ ] Add favicon at `images/favicon.ico`
- [ ] Confirm certification dates (NREMT, OSHA 30, HAZWOPER)
- [ ] Fill metric placeholders in `projects.html` case studies
- [ ] Replace OG URLs with production domain on all pages
- [ ] Add LinkedIn URL if desired
