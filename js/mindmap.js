(function() {
  const stage = document.getElementById('mm-stage');
  const world = document.getElementById('mm-world');
  const linesSvg = document.getElementById('mm-lines');
  const detail = document.getElementById('mm-detail');
  const crumb = document.getElementById('mm-breadcrumb');
  const stamp = document.getElementById('mm-state-stamp');

  let centerExpanded = false;
  let expandedDomain = null;
  let selectedLeaf = null;

  let W = 0, H = 0;
  let panX = 0, panY = 0;
  let viewExpansion = 0;
  let compactViewHeight = 0;
  // Absolute world coordinates for center bubble
  const WORLD_CX = 3000, WORLD_CY = 3000;

  function layout() {
    const r = stage.getBoundingClientRect();
    W = r.width;
    H = r.height;
    linesSvg.setAttribute('viewBox', '0 0 6000 6000');

    // Center node stays at fixed world position
    const center = document.querySelector('.mm-center');
    if (center) { center.style.left = WORLD_CX + 'px'; center.style.top = WORLD_CY + 'px'; }

    // Domain spread: 300px out to each side, 3 rows
    const domainOffsetX = 320;
    const rowSpacing = 180;

    MM_DOMAINS.forEach(d => {
      const el = document.getElementById('mm-domain-' + d.key);
      if (!el) return;
      let x, y;
      if (centerExpanded) {
        x = WORLD_CX + (d.side === 'left' ? -domainOffsetX : domainOffsetX);
        y = WORLD_CY + (d.row - 1) * rowSpacing;
      } else {
        x = WORLD_CX; y = WORLD_CY;
      }
      el.style.left = x + 'px';
      el.style.top = y + 'px';
      d._x = x; d._y = y;
    });

    // Leaves fan out further from their domain
    const leafOffsetX = 200;
    const leafSpacing = 56;
    MM_DOMAINS.forEach(d => {
      const active = (expandedDomain === d.key);
      const lx = d._x + (d.side === 'left' ? -leafOffsetX : leafOffsetX);
      const total = d.leaves.length;
      d.leaves.forEach((leaf, i) => {
        const el = document.getElementById('mm-leaf-' + d.key + '-' + i);
        if (!el) return;
        let x, y;
        if (active) {
          x = lx;
          y = d._y + (i - (total - 1) / 2) * leafSpacing;
        } else {
          x = d._x; y = d._y;
        }
        el.style.left = x + 'px';
        el.style.top = y + 'px';
        leaf._x = x; leaf._y = y;
      });
    });

    drawLines();
    panToFocus();
  }

  function panToFocus() {
    // Determine the focus point in world coords
    let fx = WORLD_CX, fy = WORLD_CY;
    if (selectedLeaf) {
      const d = MM_DOMAINS.find(x => x.key === selectedLeaf.domainKey);
      const leaf = d.leaves[selectedLeaf.leafIdx];
      // Focus mid-point between domain and leaf for context
      fx = (d._x + leaf._x) / 2;
      fy = (d._y + leaf._y) / 2;
    } else if (expandedDomain) {
      const d = MM_DOMAINS.find(x => x.key === expandedDomain);
      // Focus mid-point between center and the fanned-out leaves
      const leafOffsetX = 200;
      const lx = d._x + (d.side === 'left' ? -leafOffsetX : leafOffsetX);
      fx = (WORLD_CX + lx) / 2;
      fy = d._y;
    } else if (centerExpanded) {
      fx = WORLD_CX; fy = WORLD_CY;
    } else {
      fx = WORLD_CX; fy = WORLD_CY;
    }

    // Translate world so (fx, fy) sits at (W/2, H/2) of stage
    const tx = W / 2 - fx;
    const ty = H / 2 - fy;
    panX = tx;
    panY = ty;
    world.classList.remove('is-direct');
    world.style.left = tx + 'px';
    world.style.top = ty + 'px';
  }

  function drawLines() {
    let paths = '';
    if (centerExpanded) {
      MM_DOMAINS.forEach(d => {
        const sig = d.inprog || d.emph;
        const dashAttr = d.inprog ? ' stroke-dasharray="5 4"' : '';
        paths += `<path class="visible ${sig ? 'sig' : ''}" d="M ${WORLD_CX} ${WORLD_CY} L ${d._x} ${d._y}"${dashAttr} />`;
      });
    }
    MM_DOMAINS.forEach(d => {
      if (expandedDomain !== d.key) return;
      d.leaves.forEach((leaf) => {
        const sig = leaf.sig || d.inprog;
        const dashAttr = d.inprog ? ' stroke-dasharray="4 4"' : '';
        paths += `<path class="visible ${sig ? 'sig' : ''}" d="M ${d._x} ${d._y} L ${leaf._x} ${leaf._y}"${dashAttr} />`;
      });
    });
    linesSvg.innerHTML = paths;
  }

  function build() {
    const center = document.createElement('div');
    center.className = 'mm-node mm-center visible';
    center.innerHTML = `
      <span class="mono">OPERATOR / NODE 00</span>
      <div class="name">Anthony<br>Hinojosa</div>
      <span class="tag">● ACTIVE · 10+ YRS</span>
      <span class="hint-text"></span>
    `;
    center.addEventListener('click', toggleCenter);
    world.appendChild(center);

    MM_DOMAINS.forEach(d => {
      const node = document.createElement('button');
      node.className = 'mm-node mm-domain' + (d.emph ? ' emph' : '') + (d.inprog ? ' inprog' : '');
      node.id = 'mm-domain-' + d.key;
      node.type = 'button';
      node.innerHTML = `
        <span class="mm-chev">+</span>
        <span class="mm-id">${d.id}</span>
        <span class="mm-title">${d.title}</span>
        <span class="mm-sub">${d.sub}</span>
      `;
      node.addEventListener('click', (e) => { e.stopPropagation(); toggleDomain(d.key); });
      world.appendChild(node);

      d.leaves.forEach((leaf, i) => {
        const lf = document.createElement('a');
        lf.className = 'mm-node mm-leaf' + (leaf.sig ? ' sig' : '') + (d.inprog ? ' sig' : '');
        lf.id = 'mm-leaf-' + d.key + '-' + i;
        lf.href = 'star.html?domain=' + d.key + '&leaf=' + i;
        lf.innerHTML = `<span class="lf-label">${leaf.title}</span><span class="lf-arrow">→</span>`;
        lf.title = 'Open STAR story for ' + d.title;
        lf.addEventListener('click', (e) => {
          // Always preview inline + scroll to detail; the "Read the STAR story"
          // CTA inside the detail panel handles full-page navigation.
          e.preventDefault();
          e.stopPropagation();
          selectLeaf(d.key, i);
        });
        world.appendChild(lf);
      });
    });
  }

  function toggleCenter() {
    if (centerExpanded) {
      expandedDomain = null;
      selectedLeaf = null;
      centerExpanded = false;
      closeDetail();
    } else {
      centerExpanded = true;
    }
    render();
  }

  function toggleDomain(key) {
    if (!centerExpanded) centerExpanded = true;
    if (expandedDomain === key) {
      expandedDomain = null;
      selectedLeaf = null;
      closeDetail();
    } else {
      expandedDomain = key;
      selectedLeaf = null;
      openDomainDetail(key);
    }
    render();
  }

  function selectLeaf(domainKey, leafIdx) {
    selectedLeaf = { domainKey, leafIdx };
    openLeafDetail(domainKey, leafIdx);
    render();
  }

  function render() {
    const center = document.querySelector('.mm-center');
    center.classList.toggle('expanded', centerExpanded);

    MM_DOMAINS.forEach(d => {
      const node = document.getElementById('mm-domain-' + d.key);
      if (centerExpanded) node.classList.add('visible');
      else node.classList.remove('visible');
      node.classList.toggle('expanded', expandedDomain === d.key);

      d.leaves.forEach((leaf, i) => {
        const lf = document.getElementById('mm-leaf-' + d.key + '-' + i);
        if (expandedDomain === d.key) lf.classList.add('visible');
        else lf.classList.remove('visible');
        const isSel = selectedLeaf && selectedLeaf.domainKey === d.key && selectedLeaf.leafIdx === i;
        lf.classList.toggle('selected', isSel);
      });
    });

    updateCrumb();
    updateStamp();
    layout();
  }

  function updateCrumb() {
    let html = '';
    const navHint = ' <span style="opacity:0.45; margin:0 8px;">·</span> Scroll to expand view · Drag empty grid to move';
    if (!centerExpanded) html = '▸ <b>Click the center bubble</b> to begin' + navHint;
    else if (!expandedDomain) html = 'OPERATOR <span style="opacity:0.4; margin:0 8px;">/</span> <b>Click a domain</b> to branch' + navHint;
    else {
      const d = MM_DOMAINS.find(x => x.key === expandedDomain);
      if (selectedLeaf) {
        const leaf = d.leaves[selectedLeaf.leafIdx];
        html = `OPERATOR <span style="opacity:0.4; margin:0 8px;">/</span> ${d.title} <span style="opacity:0.4; margin:0 8px;">/</span> <b style="color: var(--signal);">${leaf.title}</b>`;
      } else {
        html = `OPERATOR <span style="opacity:0.4; margin:0 8px;">/</span> <b>${d.title}</b> <span style="opacity:0.4; margin:0 8px;">/</span> <span>Click a skill bubble</span>` + navHint;
      }
    }
    crumb.innerHTML = html;
  }

  function updateStamp() {
    let state = 'COLLAPSED';
    if (centerExpanded && !expandedDomain) state = 'DOMAINS';
    else if (centerExpanded && expandedDomain && !selectedLeaf) state = 'DOMAIN · ' + expandedDomain.toUpperCase();
    else if (selectedLeaf) state = 'LEAF · ' + selectedLeaf.domainKey.toUpperCase();
    stamp.textContent = 'STATE · ' + state + (viewExpansion > 0.02 ? ' · VIEW EXPANDED' : '');
  }

  const dId = document.getElementById('mm-detail-id');
  const dTitle = document.getElementById('mm-detail-title');
  const dSub = document.getElementById('mm-detail-sub');
  const dOverview = document.getElementById('mm-detail-overview');
  const dScope = document.getElementById('mm-detail-scope');
  const dList = document.getElementById('mm-detail-list');
  const dListHead = document.getElementById('mm-detail-list-head');
  const dStamp = document.getElementById('mm-detail-stamp');
  const dStar = document.getElementById('mm-detail-star');
  const dCrumbEl = document.getElementById('mm-detail-crumb');

  function openDomainDetail(key) {
    const d = MM_DOMAINS.find(x => x.key === key);
    if (!d) return;
    dCrumbEl.innerHTML = `OPERATOR <span class="sep">/</span> <span class="sig">${d.title}</span>`;
    dId.textContent = d.id;
    dTitle.innerHTML = d.title;
    dSub.textContent = d.sub;
    dOverview.textContent = d.overview;
    dScope.textContent = d.scope;
    dListHead.textContent = 'Capabilities in rotation';
    dList.innerHTML = d.listItems.map(([k,v]) => `<li><span>${k}</span><span class="badge">${v}</span></li>`).join('');
    dStamp.textContent = d.stamp;
    dStar.setAttribute('href', 'star.html?domain=' + key);
    dStar.innerHTML = `Read the STAR story · ${d.title} <span class="arrow">→</span>`;
    const wasOpen = detail.classList.contains('open');
    detail.classList.add('open');
    if (!wasOpen) scrollDetailIntoView();
  }

  function openLeafDetail(domainKey, leafIdx) {
    const d = MM_DOMAINS.find(x => x.key === domainKey);
    if (!d) return;
    const leaf = d.leaves[leafIdx];
    dCrumbEl.innerHTML = `OPERATOR <span class="sep">/</span> ${d.title} <span class="sep">/</span> <span class="sig">${leaf.title}</span>`;
    dId.textContent = leaf.id;
    dTitle.innerHTML = leaf.title;
    dSub.textContent = 'SKILL NODE · ' + d.id.split(' / ')[1];
    dOverview.textContent = leaf.desc;
    dScope.textContent = `Part of the ${d.title} domain. See the full domain overview and the STAR story for how this capability shows up on the job.`;
    dListHead.textContent = 'Sibling skills in this branch';
    dList.innerHTML = d.leaves.map((l, i) => `<li><span>${l.title}</span><span class="badge">${i === leafIdx ? '● SELECTED' : ''}</span></li>`).join('');
    dStamp.textContent = 'FILE · AH,2026 / LEAF · ' + leaf.id;
    dStar.setAttribute('href', 'star.html?domain=' + domainKey);
    dStar.innerHTML = `Read the STAR story · ${d.title} <span class="arrow">→</span>`;
    detail.classList.add('open');
    // Always scroll on leaf select, this is the final action in the flow
    // and the STAR detail is the reward; don't make the user hunt for it.
    scrollDetailIntoView();
  }

  function closeDetail() { detail.classList.remove('open'); }

  function scrollDetailIntoView() {
    // Wait for the max-height expansion transition to begin so we scroll to
    // the right target position, not the collapsed one.
    requestAnimationFrame(() => {
      const r = detail.getBoundingClientRect();
      const vh = window.innerHeight;
      // Scroll so the detail panel's top sits ~96px below the viewport top,
      // leaving room for the sticky nav.
      const targetY = window.scrollY + r.top - 96;
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    });
  }

  document.getElementById('mm-detail-close').addEventListener('click', () => {
    expandedDomain = null;
    selectedLeaf = null;
    closeDetail();
    render();
  });

  document.getElementById('mm-expand-all').addEventListener('click', () => {
    centerExpanded = true;
    expandedDomain = 'response';
    selectedLeaf = null;
    openDomainDetail('response');
    render();
  });
  document.getElementById('mm-collapse-all').addEventListener('click', () => {
    centerExpanded = false;
    expandedDomain = null;
    selectedLeaf = null;
    closeDetail();
    render();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (selectedLeaf) { selectedLeaf = null; openDomainDetail(expandedDomain); render(); }
      else if (expandedDomain) { expandedDomain = null; closeDetail(); render(); }
      else if (centerExpanded) { centerExpanded = false; render(); }
    }
  });

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function setViewExpansion(next) {
    viewExpansion = clamp(next, 0, 1);
    if (!compactViewHeight) compactViewHeight = stage.getBoundingClientRect().height;
    const expandedHeight = Math.min(1120, compactViewHeight + 360);
    stage.style.height = (compactViewHeight + (expandedHeight - compactViewHeight) * viewExpansion) + 'px';
    stage.classList.toggle('view-expanded', viewExpansion > 0.02);
    updateStamp();
    requestAnimationFrame(layout);
  }

  stage.addEventListener('wheel', e => {
    if (!e.deltaY) return;
    const next = clamp(viewExpansion + e.deltaY / 900, 0, 1);
    if (next === viewExpansion) return;
    e.preventDefault();
    setViewExpansion(next);
  }, { passive: false });

  let dragState = null;
  stage.addEventListener('pointerdown', e => {
    if (e.button !== 0 || e.target.closest('.mm-node')) return;
    dragState = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      panX,
      panY
    };
    stage.classList.add('is-dragging');
    world.classList.add('is-direct');
    stage.setPointerCapture(e.pointerId);
    stage.focus({ preventScroll: true });
    e.preventDefault();
  });

  stage.addEventListener('pointermove', e => {
    if (!dragState || e.pointerId !== dragState.pointerId) return;
    panX = dragState.panX + e.clientX - dragState.startX;
    panY = dragState.panY + e.clientY - dragState.startY;
    world.style.left = panX + 'px';
    world.style.top = panY + 'px';
  });

  function finishDrag(e) {
    if (!dragState || e.pointerId !== dragState.pointerId) return;
    dragState = null;
    stage.classList.remove('is-dragging');
    world.classList.remove('is-direct');
    if (stage.hasPointerCapture(e.pointerId)) stage.releasePointerCapture(e.pointerId);
  }

  stage.addEventListener('pointerup', finishDrag);
  stage.addEventListener('pointercancel', finishDrag);

  build();
  render();
  compactViewHeight = stage.getBoundingClientRect().height;

  const params = new URLSearchParams(location.search);
  const preopen = params.get('open');
  if (preopen && MM_DOMAINS.find(d => d.key === preopen)) {
    centerExpanded = true;
    expandedDomain = preopen;
    openDomainDetail(preopen);
    render();
  }

  window.addEventListener('resize', () => {
    if (viewExpansion === 0) compactViewHeight = stage.getBoundingClientRect().height;
    layout();
  });
})();
