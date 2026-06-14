// Shared: reveal on scroll, counters, nav active, theme, tweaks
(function () {
  // Reveal
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  // Scroll-reveal for stat / project cards (adds .is-visible as they enter view)
  const srEls = document.querySelectorAll(".scroll-reveal");
  if (srEls.length) {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) {
      // Respect reduced motion: show cards immediately, no transition.
      srEls.forEach((el) => el.classList.add("is-visible"));
    } else {
      const sio = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("is-visible");
              sio.unobserve(e.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
      );
      srEls.forEach((el) => sio.observe(el));
    }
  }

  // Animated counters
  const counters = document.querySelectorAll("[data-counter]");
  const cio = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      cio.unobserve(e.target);
      const el = e.target;
      const target = parseFloat(el.dataset.counter);
      const suffix = el.dataset.suffix || "";
      const duration = 1200;
      const start = performance.now();
      const from = 0;
      function tick(t) {
        const p = Math.min(1, (t - start) / duration);
        const ease = 1 - Math.pow(1 - p, 3);
        const v = from + (target - from) * ease;
        el.textContent = (Number.isInteger(target) ? Math.round(v) : v.toFixed(1)) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.4 });
  counters.forEach((c) => cio.observe(c));

  // Theme persistence
  const saved = localStorage.getItem("ah-theme");
  if (saved) document.body.dataset.theme = saved;

  // Tweaks panel
  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "theme": "light",
    "accent": "#C2441C",
    "heroVariant": "editorial"
  }/*EDITMODE-END*/;

  const tweaks = { ...TWEAK_DEFAULTS };
  // read saved
  try {
    const s = localStorage.getItem("ah-tweaks");
    if (s) Object.assign(tweaks, JSON.parse(s));
  } catch {}

  function applyTweaks() {
    document.body.dataset.theme = tweaks.theme;
    document.documentElement.style.setProperty("--signal", tweaks.accent);
    // hero variant: toggle body class
    document.body.classList.remove("hv-editorial", "hv-instrument", "hv-minimal");
    document.body.classList.add("hv-" + (tweaks.heroVariant || "editorial"));
    localStorage.setItem("ah-tweaks", JSON.stringify(tweaks));
    localStorage.setItem("ah-theme", tweaks.theme);
  }
  applyTweaks();

  // Edit-mode protocol
  let panel = null;
  function buildPanel() {
    if (panel) return panel;
    panel = document.createElement("div");
    panel.className = "tweaks-panel";
    panel.innerHTML = `
      <div class="tp-head">
        <span class="tp-title">Tweaks</span>
        <span class="tp-mono">AH.CAREER.CFG</span>
      </div>
      <div class="tp-row">
        <label class="tp-label">Theme</label>
        <div class="tp-seg" data-key="theme">
          <button data-val="light">Paper</button>
          <button data-val="dark">Ink</button>
        </div>
      </div>
      <div class="tp-row">
        <label class="tp-label">Hero</label>
        <div class="tp-seg" data-key="heroVariant">
          <button data-val="editorial">Editorial</button>
          <button data-val="instrument">Instrument</button>
          <button data-val="minimal">Minimal</button>
        </div>
      </div>
      <div class="tp-row">
        <label class="tp-label">Accent</label>
        <div class="tp-swatches" data-key="accent">
          <button data-val="#C2441C" style="background:#C2441C" title="Signal Orange"></button>
          <button data-val="#D4A017" style="background:#D4A017" title="Hi-Vis Amber"></button>
          <button data-val="#0D9488" style="background:#0D9488" title="Teal"></button>
          <button data-val="#2D5BFF" style="background:#2D5BFF" title="Instrument Blue"></button>
          <button data-val="#6AA84F" style="background:#6AA84F" title="Monitor Green"></button>
        </div>
      </div>
      <div class="tp-foot mono">v1.0 · H-2026</div>
    `;
    document.body.appendChild(panel);

    panel.querySelectorAll(".tp-seg").forEach((seg) => {
      const key = seg.dataset.key;
      seg.querySelectorAll("button").forEach((b) => {
        b.addEventListener("click", () => {
          tweaks[key] = b.dataset.val;
          applyTweaks();
          syncPanel();
          window.parent.postMessage({ type: "__edit_mode_set_keys", edits: { [key]: b.dataset.val } }, "*");
        });
      });
    });
    panel.querySelectorAll(".tp-swatches").forEach((seg) => {
      const key = seg.dataset.key;
      seg.querySelectorAll("button").forEach((b) => {
        b.addEventListener("click", () => {
          tweaks[key] = b.dataset.val;
          applyTweaks();
          syncPanel();
          window.parent.postMessage({ type: "__edit_mode_set_keys", edits: { [key]: b.dataset.val } }, "*");
        });
      });
    });
    syncPanel();
    return panel;
  }
  function syncPanel() {
    if (!panel) return;
    panel.querySelectorAll(".tp-seg").forEach((seg) => {
      const key = seg.dataset.key;
      seg.querySelectorAll("button").forEach((b) => {
        b.classList.toggle("on", b.dataset.val === tweaks[key]);
      });
    });
    panel.querySelectorAll(".tp-swatches").forEach((seg) => {
      const key = seg.dataset.key;
      seg.querySelectorAll("button").forEach((b) => {
        b.classList.toggle("on", b.dataset.val === tweaks[key]);
      });
    });
  }

  window.addEventListener("message", (ev) => {
    if (!ev.data || !ev.data.type) return;
    if (ev.data.type === "__activate_edit_mode") {
      buildPanel();
      panel.classList.add("open");
    } else if (ev.data.type === "__deactivate_edit_mode") {
      if (panel) panel.classList.remove("open");
    }
  });
  window.parent.postMessage({ type: "__edit_mode_available" }, "*");

  // Filters (project page)
  const groups = document.querySelectorAll("[data-filter-group]");
  groups.forEach((grp) => {
    const name = grp.dataset.filterGroup;
    const items = document.querySelectorAll(`[data-filter-item="${name}"]`);
    grp.querySelectorAll("[data-filter]").forEach((b) => {
      b.addEventListener("click", () => {
        const cat = b.dataset.filter;
        grp.querySelectorAll("[data-filter]").forEach((x) => x.classList.toggle("on", x === b));
        items.forEach((it) => {
          const match = cat === "all" || it.dataset.category === cat;
          it.style.opacity = match ? "1" : "0";
          it.style.transform = match ? "translateY(0) scale(1)" : "translateY(8px) scale(0.99)";
          it.style.pointerEvents = match ? "auto" : "none";
          setTimeout(() => { it.style.display = match ? "" : "none"; }, match ? 0 : 260);
        });
      });
    });
  });

  // Live clock in nav/footer
  const clocks = document.querySelectorAll("[data-clock]");
  if (clocks.length) {
    const tick = () => {
      const d = new Date();
      const hh = String(d.getUTCHours()).padStart(2, "0");
      const mm = String(d.getUTCMinutes()).padStart(2, "0");
      const ss = String(d.getUTCSeconds()).padStart(2, "0");
      clocks.forEach((c) => (c.textContent = `${hh}:${mm}:${ss} UTC`));
    };
    tick();
    setInterval(tick, 1000);
  }

  // Scroll progress bar (optional, only if element exists)
  const bar = document.querySelector("[data-scroll-bar]");
  if (bar) {
    const onScroll = () => {
      const h = document.documentElement;
      const p = h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight);
      bar.style.transform = `scaleX(${p})`;
    };
    document.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }
})();
