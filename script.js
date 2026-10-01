(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const esc = t => String(t).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const phone = key => SITE.phones[key] || SITE.phones.main;
  const waLink = (key, msg) => `https://wa.me/${phone(key).wa}?text=${encodeURIComponent(msg)}`;

  /* Any element with data-wa="main|ladder" and data-msg opens WhatsApp */
  function wireWhatsApp(root = document) {
    root.querySelectorAll("[data-wa]").forEach(el => {
      el.href = waLink(el.dataset.wa, el.dataset.msg || "Hello, I would like to enquire.");
      el.target = "_blank";
      el.rel = "noopener";
    });
  }

  /* Products */
  const products = SITE.products.filter(p => p.visible !== false);
  $("#productGrid").innerHTML = products.map(p => `
    <article class="card">
      <div class="thumb">${p.image ? `<img src="${esc(p.image)}" alt="${esc(p.name)}" loading="lazy">` : `<b>SS</b>`}</div>
      <div class="cbody">
        <span class="cat">${esc(p.category)}</span>
        <h3>${esc(p.name)}</h3>
        <p>${esc(p.desc)}</p>
        <ul class="feat">${(p.features || []).map(f => `<li>${esc(f)}</li>`).join("")}</ul>
        <a class="btn btn-dark btn-sm" data-wa="${p.contact === "ladder" ? "ladder" : "main"}"
           data-msg="Hello, I would like to enquire about ${esc(p.name)}.">Enquire now</a>
      </div>
    </article>`).join("");

  /* Product dropdown in the form */
  $("#productSelect").innerHTML =
    `<option value="">Select a product</option>` +
    products.map((p, i) => `<option value="${i}">${esc(p.name)}</option>`).join("") +
    `<option value="other">Other / custom order</option>`;

  /* Gallery (hidden unless enabled and has images) */
  const g = SITE.gallery;
  if (g.enabled && g.images.length) {
    $("#gallery").hidden = false;
    $("#navGallery").hidden = false;
    $("#galleryGrid").innerHTML = g.images.map(i =>
      `<figure><img src="${esc(i.src)}" alt="${esc(i.caption || "Gallery image")}" loading="lazy">${i.caption ? `<figcaption>${esc(i.caption)}</figcaption>` : ""}</figure>`).join("");
  }

  /* Contact details */
  const setTel = (id, key) => { const a = $(id); a.textContent = phone(key).show; a.href = "tel:+" + phone(key).wa; };
  setTel("#telMain", "main"); setTel("#telLadder", "ladder"); setTel("#ftTel", "main");
  $("#yr").textContent = new Date().getFullYear();

  /* Contact form -> WhatsApp (ladder products go to the ladder number) */
  $("#cf").addEventListener("submit", e => {
    e.preventDefault();
    const f = e.target, hint = $("#formHint");
    const name = f.name.value.trim(), tel = f.phone.value.trim();
    [f.name, f.phone].forEach(i => i.classList.toggle("err", !i.value.trim()));
    if (!name || !tel) { hint.textContent = "Please enter your name and phone number."; return; }
    const p = products[f.product.value];
    const key = p && p.contact === "ladder" ? "ladder" : "main";
    const msg = [
      "Hello, I have an enquiry.",
      `Name: ${name}`, `Phone: ${tel}`,
      `Product: ${p ? p.name : "Other / custom order"}`,
      f.message.value.trim() && `Message: ${f.message.value.trim()}`
    ].filter(Boolean).join("\n");
    window.open(waLink(key, msg), "_blank", "noopener");
    hint.textContent = "Opening WhatsApp. Press send to deliver your enquiry.";
  });

  /* Mobile menu + header border */
  const burger = $("#burger"), links = $("#links");
  const toggle = open => { links.classList.toggle("open", open); burger.setAttribute("aria-expanded", open); };
  burger.addEventListener("click", () => toggle(!links.classList.contains("open")));
  links.addEventListener("click", e => { if (e.target.tagName === "A") toggle(false); });
  addEventListener("scroll", () => $("#hdr").classList.toggle("scrolled", scrollY > 8), { passive: true });

  wireWhatsApp();
})();

/* Premium effects: scroll reveal, card glow, hero fade-out on scroll */
(function () {
  const rvEls = document.querySelectorAll(".card,.about>div,.contact>*,.ticks li,.bulk");
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  }), { threshold: .12 });
  rvEls.forEach((el, i) => { el.classList.add("rv"); el.style.transitionDelay = (i % 3) * 90 + "ms"; io.observe(el); });

  document.querySelectorAll(".card").forEach(c => c.addEventListener("pointermove", e => {
    const r = c.getBoundingClientRect();
    c.style.setProperty("--mx", e.clientX - r.left + "px");
    c.style.setProperty("--my", e.clientY - r.top + "px");
  }));

  const lock = document.querySelector(".brand-lockup");
  addEventListener("scroll", () => {
    const y = Math.min(scrollY, 500);
    lock.style.transform = `scale(${1 - y / 2500}) translateY(${y * .12}px)`;
    lock.style.opacity = 1 - y / 900;
  }, { passive: true });
})();
