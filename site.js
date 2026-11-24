/* Corsa Notturna — fills the page from config.js. You shouldn't need to edit this file. */
(function () {
  var cfg = window.CORSA || {};
  var social = cfg.social || {};
  var dashes = Array.isArray(cfg.dashes) ? cfg.dashes : [];

  function el(tag, attrs, text) {
    var n = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) { n.setAttribute(k, attrs[k]); });
    if (text != null) n.textContent = text;
    return n;
  }
  function btn(href, label, cls, aria) {
    var a = el("a", { href: href, class: "btn " + cls });
    if (aria) a.setAttribute("aria-label", aria);
    a.appendChild(el("span", { class: "btn-inner" }, label));
    return a;
  }
  function external(a) { a.setAttribute("target", "_blank"); a.setAttribute("rel", "noopener"); return a; }

  // year
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // Ko-fi buttons and support section
  if (cfg.kofi) {
    document.querySelectorAll("[data-kofi]").forEach(function (a) {
      a.href = cfg.kofi; external(a); a.hidden = false;
    });
    var sup = document.getElementById("support");
    if (sup) sup.hidden = false;
  }

  // follow links for the "coming soon" message
  var names = { youtube: "YouTube", tiktok: "TikTok", instagram: "Instagram", discord: "Discord" };
  var follow = document.getElementById("follow-links");
  var any = false;
  Object.keys(names).forEach(function (k) {
    if (social[k]) { follow.appendChild(external(el("a", { href: social[k] }, names[k]))); any = true; }
  });
  if (cfg.kofi) { follow.appendChild(external(btn(cfg.kofi, "Tip on Ko-fi", "btn-kofi btn-small"))); any = true; }
  if (any) document.querySelectorAll("[data-follow]").forEach(function (n) { n.hidden = false; });

  // contact email
  if (cfg.email) {
    var link = document.getElementById("contact-link");
    link.href = "mailto:" + cfg.email;
    link.textContent = cfg.email;
    document.getElementById("contact").hidden = false;
  }

  // dashboards
  if (!dashes.length) return;
  document.getElementById("dash-empty").hidden = true;
  document.getElementById("install").hidden = false;
  var list = document.getElementById("dash-list");

  dashes.forEach(function (d, i) {
    var art = el("article", { class: "dash", "aria-labelledby": "dash-" + i });

    var text = el("div", { class: "dash-text" });
    text.appendChild(el("h3", { id: "dash-" + i }, d.name || "Dashboard"));
    if (d.device) text.appendChild(el("p", { class: "device" }, d.device));
    if (d.description) text.appendChild(el("p", { class: "desc" }, d.description));
    if (d.features && d.features.length) {
      var ul = el("ul");
      d.features.forEach(function (f) { ul.appendChild(el("li", null, f)); });
      text.appendChild(ul);
    }
    if (d.download) {
      var dl = btn(d.download, "Download", "btn-light", "Download " + (d.name || "dashboard"));
      dl.setAttribute("download", "");
      text.appendChild(dl);
    }
    var meta = [];
    if (d.version) meta.push("Version " + d.version);
    if (d.updated) meta.push("updated " + d.updated);
    if (meta.length) text.appendChild(el("p", { class: "meta" }, meta.join(", ")));

    var pages = d.pages || [];
    var fig = el("div", { class: "dash-media" });
    if (pages.length) {
      var screen = el("figure", { class: "screen" });
      var img = el("img", { src: pages[0].image, alt: pages[0].alt || (d.name + ", " + pages[0].label + " page"), loading: "lazy" });
      screen.appendChild(img);
      fig.appendChild(screen);
      if (pages.length > 1) {
        var row = el("div", { class: "pages", role: "group", "aria-label": "Pages of " + d.name });
        pages.forEach(function (p, j) {
          var b = el("button", { type: "button", "aria-pressed": j === 0 ? "true" : "false" }, p.label);
          b.addEventListener("click", function () {
            img.src = p.image;
            img.alt = p.alt || (d.name + ", " + p.label + " page");
            row.querySelectorAll("button").forEach(function (o) { o.setAttribute("aria-pressed", "false"); });
            b.setAttribute("aria-pressed", "true");
          });
          row.appendChild(b);
        });
        fig.appendChild(row);
      }
    }

    art.appendChild(text);
    art.appendChild(fig);
    list.appendChild(art);
  });
})();

/* Start lights: five reds light up one by one, then go out and the stripes sweep in.
   Plays once when the lights first come into view. Click the lights to run the start again. */
(function () {
  var hero = document.querySelector(".hero");
  var gantry = document.querySelector(".gantry");
  if (!hero || !gantry) return;
  var pods = Array.prototype.slice.call(gantry.querySelectorAll(".pod"));
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var timers = [];

  function clear() { timers.forEach(clearTimeout); timers = []; }
  function later(fn, ms) { timers.push(setTimeout(fn, ms)); }

  function start() {
    clear();
    pods.forEach(function (p) { p.classList.remove("on"); });
    if (reduce) { hero.classList.remove("pre"); return; }
    hero.classList.remove("go");
    hero.classList.add("pre");
    var step = 650;
    pods.forEach(function (p, i) { later(function () { p.classList.add("on"); }, 500 + i * step); });
    var hold = 700 + Math.random() * 1300;           // like a real start, you never know exactly when
    later(function () {
      pods.forEach(function (p) { p.classList.remove("on"); });
      hero.classList.remove("pre");
      void hero.offsetWidth;                          // restart the sweep
      hero.classList.add("go");
    }, 500 + 4 * step + hold);
  }

  gantry.addEventListener("click", start);

  // Play once, the first time the lights are actually on screen (and the tab is visible)
  if (reduce) { start(); return; }
  hero.classList.add("pre");
  var played = false;
  function playOnce() {
    if (played || document.visibilityState === "hidden") return;
    played = true;
    start();
  }
  if ("IntersectionObserver" in window) {
    var seen = false;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { seen = e.isIntersecting; });
      if (seen) { playOnce(); if (played) io.disconnect(); }
    }, { threshold: 0.6 });
    io.observe(gantry);
    document.addEventListener("visibilitychange", function () { if (seen) { playOnce(); if (played) io.disconnect(); } });
  } else {
    playOnce();
  }
})();
