/* IFS Copperleaf docs site — shared nav + token table renderers.
   Token values are read live via getComputedStyle, so tables always
   reflect the current DS/styles.css. */

(function () {
  /* Compute the path from the current page back to the website/ root.
     site.js is always loaded as "site.js" from root pages, or "../site.js"
     from one level deep (e.g. patterns/). Counting the "../" prefixes in the
     script's own src tells us how deep we are. */
  const _scriptSrc = (document.currentScript || {}).getAttribute ? document.currentScript.getAttribute("src") || "" : "";
  const _depth = (_scriptSrc.match(/\.\.\//g) || []).length;
  const _base = "../".repeat(_depth);   // "" for root pages, "../" for patterns/, etc.

  const NAV = [
    { head: "Getting started", items: [
      { href: "index.html", icon: "home", label: "Overview" },
    ]},
    { head: "Foundations", items: [
      { href: "colors.html", icon: "palette", label: "Color" },
      { href: "typography.html", icon: "typography", label: "Typography" },
      { href: "spacing.html", icon: "ruler-2", label: "Spacing & layout" },
      { href: "shape-elevation.html", icon: "stack-2", label: "Shape & elevation" },
      { href: "iconography.html", icon: "icons", label: "Iconography" },
    ]},
    { head: "Components", items: [
      { href: "buttons.html", icon: "square-rounded", label: "Buttons" },
      { href: "forms.html", icon: "forms", label: "Form fields" },
      { href: "search.html", icon: "search", label: "Search" },
      { href: "components.html", icon: "components", label: "Other elements" },
    ]},
    { head: "Patterns", items: [
      { href: "patterns/navigation.html", icon: "layout-navbar", label: "Navigation" },
      { href: "patterns/cooper-chat.html", icon: "message-chatbot", label: "Cooper Chat" },
    ]},
  ];

  function buildSidebar() {
    const el = document.getElementById("sidebar");
    if (!el) return;
    const here = location.pathname;
    let html = `
      <div class="brand"><img src="${_base}../DS/assets/logo-white.png" alt="IFS Copperleaf"></div>
      <div class="brand-sub">Design system</div>`;
    for (const g of NAV) {
      html += `<div class="nav-group"><div class="nav-head">${g.head}</div>`;
      for (const it of g.items) {
        const active = here.endsWith(it.href) ? " active" : "";
        html += `<a class="nav-link${active}" href="${_base}${it.href}"><i class="ti ti-${it.icon}"></i>${it.label}</a>`;
      }
      html += `</div>`;
    }
    el.innerHTML = html;
  }

  function resolve(token) {
    return getComputedStyle(document.documentElement).getPropertyValue(token).trim();
  }

  /* Render a table of color tokens: rows = [tokenName, note?] */
  window.tokenTable = function (mountId, rows, opts = {}) {
    const mount = document.getElementById(mountId);
    if (!mount) return;
    let html = `<table class="token-table"><thead><tr><th></th><th>Token</th><th>Value</th>${opts.notes ? "<th>Usage</th>" : ""}</tr></thead><tbody>`;
    for (const r of rows) {
      const [tok, note] = Array.isArray(r) ? r : [r, ""];
      const val = resolve(tok);
      html += `<tr>
        <td><span class="swatch" style="--sw:${val}"></span></td>
        <td class="tok">${tok}</td>
        <td class="val">${val || "—"}</td>
        ${opts.notes ? `<td>${note || ""}</td>` : ""}
      </tr>`;
    }
    html += "</tbody></table>";
    mount.innerHTML = html;
  };

  /* Render a primitive ramp strip from token names */
  window.ramp = function (mountId, label, tokens, lightFrom = 4) {
    const mount = document.getElementById(mountId);
    if (!mount) return;
    let html = `<div class="ramp-label">${label}</div><div class="ramp">`;
    tokens.forEach((t, i) => {
      const val = resolve(t);
      const step = t.split("-").pop();
      html += `<div class="step${i < lightFrom ? " light" : ""}" style="background:${val}" title="${t}: ${val}"><span>${step}</span></div>`;
    });
    html += "</div>";
    mount.insertAdjacentHTML("beforeend", html);
  };

  /* Render non-color tokens (sizes, shadows...) as a simple table */
  window.valueTable = function (mountId, rows) {
    const mount = document.getElementById(mountId);
    if (!mount) return;
    let html = `<table class="token-table"><thead><tr><th>Token</th><th>Value</th><th>Usage</th></tr></thead><tbody>`;
    for (const r of rows) {
      const [tok, note] = Array.isArray(r) ? r : [r, ""];
      html += `<tr><td class="tok">${tok}</td><td class="val">${resolve(tok) || "—"}</td><td>${note || ""}</td></tr>`;
    }
    html += "</tbody></table>";
    mount.innerHTML = html;
  };

  /* Spacing bars */
  window.spaceBars = function (mountId, tokens) {
    const mount = document.getElementById(mountId);
    if (!mount) return;
    let html = "";
    for (const t of tokens) {
      const val = resolve(t);
      const px = parseFloat(val) || 0;
      html += `<div class="space-row"><span class="name">${t}</span><span class="px">${val}</span><span class="bar" style="width:${Math.max(px * 4, 2)}px"></span></div>`;
    }
    mount.innerHTML = html;
  };

  function buildTOC() {
    const shell = document.querySelector(".shell");
    if (!shell) return;
    const headings = Array.from(document.querySelectorAll(".page h2"));
    if (headings.length < 2) return;

    // Assign IDs to headings that don't already have one
    headings.forEach(h => {
      if (!h.id) {
        h.id = h.textContent.trim()
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "");
      }
    });

    // Inject right rail as last child of .shell
    const rail = document.createElement("aside");
    rail.className = "toc-rail";
    let html = `<div class="toc-head">On this page</div>`;
    headings.forEach(h => {
      html += `<a class="toc-link" href="#${h.id}">${h.textContent.trim()}</a>`;
    });
    rail.innerHTML = html;
    shell.appendChild(rail);

    // Scroll-spy: highlight the last heading scrolled into view
    const links = rail.querySelectorAll(".toc-link");
    function updateActive() {
      const scrollY = window.scrollY + 96;
      let activeId = headings[0].id;
      for (const h of headings) {
        if (h.offsetTop <= scrollY) activeId = h.id;
      }
      links.forEach(l => {
        l.classList.toggle("active", l.getAttribute("href") === `#${activeId}`);
      });
    }
    window.addEventListener("scroll", updateActive, { passive: true });
    updateActive();
  }

  document.addEventListener("DOMContentLoaded", () => { buildSidebar(); buildTOC(); });
})();
