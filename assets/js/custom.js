document.addEventListener("DOMContentLoaded", function () {

  // Header Height
  const header = document.querySelector(".header");
  function setHeaderHeight() {
    document.body.style.setProperty(
      "--headerHeight",
      `${header ? header.offsetHeight : 0}px`
    );
  }
  setHeaderHeight();
  window.addEventListener("resize", setHeaderHeight);

  // Header Sticky
  if (!header) return;
  function toggleSticky() {
    header.classList.toggle("sticky", window.scrollY > 50);
  }
  toggleSticky();
  window.addEventListener("scroll", toggleSticky);

  // Tabs
  const autoTabs = new WeakMap();
  document.querySelectorAll(".tab_block").forEach(tabBlock => {
    const head = tabBlock.querySelector(":scope>.tab_head,.tab_head"),
      body = tabBlock.querySelector(":scope>.tab_body,.tab_body");
    if (!head || !body) return;
    const btns = [...head.querySelectorAll(".tab_btn")],
      tabs = [...body.querySelectorAll(":scope>.tab_content")];
    if (!btns.length || !tabs.length) return;
    let cur = 0, timer;
    function show(i, reset = true) {
      cur = i;
      btns.forEach(b => b.classList.toggle("active", b.dataset.target == tabs[i].id));
      tabs.forEach((t, x) => t.classList.toggle("active", x == i));
      if (tabBlock.classList.contains("tab_autoplay")) start();
      if (reset) parentReset();
    }
    function start() {
      clearTimeout(timer);
      timer = setTimeout(() => {
        show(cur = (cur + 1) % btns.length, false);
      }, 5000);
    }
    function parentReset() {
      const pc = tabBlock.closest(".tab_content"),
        pb = pc?.closest(".tab_block");
      if (!pb) return;
      const btn = pb.querySelector(`.tab_btn[data-target="${pc.id}"]`);
      if (btn) {
        btn.classList.remove("active");
        setTimeout(() => btn.classList.add("active"), 20);
      }
      autoTabs.get(pb)?.restart();
    }
    btns.forEach((b, i) => b.onclick = e => {
      e.stopPropagation();
      let x = tabs.findIndex(t => t.id == b.dataset.target);
      x > -1 && show(x);
    });
    autoTabs.set(tabBlock, {
      restart() {
        clearTimeout(timer);
        timer = setTimeout(() => show(cur = 0, false), 5000);
      }
    });
    show(0, false);
  });

  // Homepage Tab counter
  document.querySelectorAll(".experience_tab").forEach(section => {
    const tabs = [...document.querySelectorAll(".experience_tab")],
      items = [...document.querySelectorAll(".benefit_list li")],
      switches = document.querySelectorAll(".experience_switch input");
    let current = 0, timer;
    function active(i) {
      current = i;
      tabs.forEach(t => {
        t.classList.remove("active");
        const b = t.querySelector(".experience_tab_body");
        b && (b.style.maxHeight = 0);
      });
      const tab = tabs[i], body = tab.querySelector(".experience_tab_body");
      tab.classList.add("active");
      body && (body.style.maxHeight = body.scrollHeight + "px");
      items.forEach(li => li.classList.toggle("active", li.dataset.tab == tab.dataset.tab));
    }
    function auto() {
      clearInterval(timer);
      timer = setInterval(() => active((current = current + 1) % tabs.length), 5000);
    }
    tabs.forEach((t, i) => t.onclick = () => {
      active(i);
      auto();
    });
    switches.forEach(s => {
      s.checked = true; // default checked
      const li = document.querySelector(`.benefit_list li[data-tab="${s.dataset.tab}"]`);
      const update = () => {
        li && li.classList.toggle("hide", !s.checked);
      };
      update();
      s.onchange = update;
    });
    window.onresize = () => {
      const b = document.querySelector(".experience_tab.active .experience_tab_body");
      b && (b.style.maxHeight = b.scrollHeight + "px");
    };
    active(0);
    auto();
  });

  // Number Counter
  const numbers = document.querySelectorAll(".count");
  numbers.forEach((number) => {
    let count = 0;
    const target = +number.dataset.target;
    const timer = setInterval(() => {
      number.textContent = ++count + "%";
      if (count >= target) clearInterval(timer);
    }, 40);
  });

  // FAQs
  document.querySelectorAll(".faq_question").forEach(btn => {
    btn.onclick = () => {
      const item = btn.parentElement;
      const answer = item.querySelector(".faq_answer");
      document.querySelectorAll(".faq_item").forEach(faq => {
        if (faq !== item) {
          faq.classList.remove("active");
          faq.querySelector(".faq_answer").style.maxHeight = null;
        }
      });
      item.classList.toggle("active");
      answer.style.maxHeight = item.classList.contains("active")
        ? answer.scrollHeight + "px"
        : null;
    };
  });

  // Swiper Slider
  var swiper_scale_active = new Swiper(".results_slider", {
    slidesPerView: 1,
    loop: true,
    speed: 900,
    centeredSlides: true,
    loop: true,
    spaceBetween: 0,
    grabCursor: true,
    effect: "creative",
    pagination: {
      el: '.swiper-pagination',
    },
    breakpoints: {
      680: {
        slidesPerView: "auto",
      },
    },
    creativeEffect: {
      limitProgress: 2,
      prev: {
        shadow: true,
        scale: 0.90,
        translate: ["-100%", 0, 0],
      },
      next: {
        shadow: true,
        scale: 0.90,
        translate: ["100%", 0, 0],
      },
    },
  });

  document.querySelectorAll(".column_one, .column_three").forEach((slider) => {
    new Swiper(slider, {
      slidesPerView: "auto",
      spaceBetween: 22,
      loop: true,
      direction: "horizontal",
      speed: 6000,
      autoplay: {
        delay: 0,
        disableOnInteraction: false,
        reverseDirection: true,
      },
      breakpoints: {
        992: {
          direction: "vertical",
          disableOnInteraction: true,
        },
      },
    });
  });

  const columnTwo = new Swiper(".column_two", {
    slidesPerView: "auto",
    spaceBetween: 22,
    loop: true,
    direction: "horizontal",
    speed: 7500,
    autoplay: {
      delay: 0,
      disableOnInteraction: true,
    },
    breakpoints: {
      992: {
        direction: "vertical",

      },
    },
  });

  // Benefits_ Slider
  var benefitsSwiper = new Swiper(".benefits_slider", {
    slidesPerView: 1.05,
    spaceBetween: 16,
    speed: 800,
    loop: false,
    grabCursor: true,
    pagination: {
      el: ".benefits_slider .swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      0: {
        enabled: true,
        slidesPerView: 1.05,
        spaceBetween: 16,
      },
      480: {
        slidesPerView: 1.15,
        spaceBetween: 18,
      },
      576: {
        enabled: true,
        slidesPerView: 1,
        spaceBetween: 20,
      },
      768: {
        enabled: false,
        slidesPerView: 3,
        spaceBetween: 20,
      }
    }
  });

  // PLATFORM SECTION
  const tabs = document.querySelectorAll(".brand_tab_btn"),
    desc = document.querySelector(".brand_tab_description"),
    descriptions = [
      "Easily upgrade with Onward with a single click.",
      "Keep customers informed with beautifully branded email notifications.",
      "Track every order in one place.",
      "File a claim quickly without leaving your storefront.",
      "Return items that don't work out directly in the portal."
    ];
  const swiper = new Swiper(".brand_tab_slider", {
    slidesPerView: "auto",
    centeredSlides: true,
    spaceBetween: 30,
    speed: 600,
    loop: false,
    allowTouchMove: false
  });
  tabs.forEach((tab, i) => {
    tab.onclick = () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      desc.textContent = descriptions[i];
      swiper.slideTo(i, 600);
    };
  });
  tabs[0].click();

  
  
});


// HEADER_MENU
document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.getElementById("menuBtn");
    const siteHeader = document.querySelector(".header");
    if (!menuButton || !siteHeader) return;
    menuButton.addEventListener("click", function () {
      siteHeader.classList.toggle("menu_open");
      document.body.classList.toggle("menu_open");
    });
});


document.addEventListener("DOMContentLoaded", function () {
//====================================== Logo change js code

  const groups = [...document.querySelectorAll(".top_brands_logo")],
    DURATION = 650;

  groups.forEach(g => {
    const l = [...g.querySelectorAll(".top_brands_logo_block")];
    if (!l.length) return;

    g._logos = l;
    g._currentIndex = 0;
    g.style.cssText += "position:relative;overflow:hidden";

    l.forEach((x, i) => {
      x.style.cssText += `
        position:absolute;inset:0;width:100%;height:100%;
        display:flex;align-items:center;justify-content:center;
        transition:none;opacity:${i ? 0 : 1};
        transform:translateY(${i ? 100 : 0}%)
      `;
    });
  });

  function changeLogo(g) {
    const l = g._logos, c = g._currentIndex;
    if (l.length < 2) return;

    let n;
    do n = Math.floor(Math.random() * l.length);
    while (n === c);

    const cur = l[c], next = l[n],
      tr = `transform ${DURATION}ms cubic-bezier(.65,0,.35,1),opacity ${DURATION}ms ease`;

    next.style.cssText += `transition:none;opacity:1;transform:translateY(100%)`;
    next.offsetHeight;

    cur.style.transition = next.style.transition = tr;
    cur.style.transform = "translateY(-100%)";
    cur.style.opacity = 0;
    next.style.transform = "translateY(0)";

    setTimeout(() => {
      cur.style.cssText += "transition:none;transform:translateY(100%);opacity:0";
      next.style.cssText += "transition:none;transform:translateY(0);opacity:1";
      g._currentIndex = n;
    }, DURATION);
  }

  function randomChange() {
    [...groups]
      .sort(() => Math.random() - .5)
      .slice(0, Math.floor(Math.random() * Math.min(5, groups.length)) + 1)
      .forEach(changeLogo);

    setTimeout(randomChange, Math.random() * 1800 + 1500);
  }

  setTimeout(randomChange, 1500);

//==================================== Hero slider js code

(() => {
  /* Read all slides from HTML — no content stored in JS */
  const slideEls = [...document.querySelectorAll("#heroSlides .hero-slide")];
  if (!slideEls.length) return;

  const SLIDES = slideEls.map((el) => {
    const labelEl = el.querySelector(".hero-slide__label");
    const iconEl = el.querySelector(".hero-slide__icon");
    const imgEl = el.querySelector(".hero-slide__image");
    const buttonEl = el.querySelector(".hero-slide__button");

    /* label text without the icon */
    let label = "";
    if (labelEl) {
      label = [...labelEl.childNodes]
        .filter((n) => n.nodeType === Node.TEXT_NODE)
        .map((n) => n.textContent.trim())
        .join(" ")
        .trim();
    }

    return {
      button: (buttonEl?.textContent || "").trim(),
      label,
      href: el.getAttribute("data-href") || "#",
      image: imgEl?.getAttribute("src") || "",
      alt: imgEl?.getAttribute("alt") || "",
      iconHTML: iconEl ? iconEl.innerHTML.trim() : "",
    };
  });

  const COUNT = SLIDES.length;
  const FACES = COUNT * 2;
  const FACE_STEP = 360 / FACES;
  const STEP = FACE_STEP;

  const carousel = document.getElementById("carousel");
  const ring = document.getElementById("carouselRing");
  const cta = document.getElementById("heroCta");
  const ctaTrack = document.getElementById("ctaTrack");
  const label = document.getElementById("heroLabel");
  const labelTrack = document.getElementById("labelTrack");
  const labelIcon = document.getElementById("labelIcon");

  let current = 0;
  let rotation = 0;
  let autoTimer = null;
  let drag = null;

  function getRadius() {
    const raw = getComputedStyle(document.documentElement)
      .getPropertyValue("--radius-z")
      .trim();
    return parseFloat(raw) || 279;
  }

  function slideText(container, text, className, direction) {
    const outgoing = container.querySelector(`.${className}`);
    const incoming = document.createElement("span");
    incoming.className = className;
    incoming.textContent = text;

    const from = direction >= 0 ? "100%" : "-100%";
    const to = direction >= 0 ? "-100%" : "100%";

    incoming.style.transform = `translateY(${from})`;
    incoming.style.opacity = "0";
    container.appendChild(incoming);

    incoming.offsetHeight;

    incoming.style.transition =
      "transform 0.55s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.45s ease";
    incoming.style.transform = "translateY(0)";
    incoming.style.opacity = "1";

    if (outgoing) {
      outgoing.style.transition =
        "transform 0.55s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.35s ease";
      outgoing.style.transform = `translateY(${to})`;
      outgoing.style.opacity = "0";
      outgoing.addEventListener("transitionend", () => outgoing.remove(), {
        once: true,
      });
      setTimeout(() => outgoing.remove(), 600);
    }
  }

  function setTextInstant(container, text, className) {
    container.innerHTML = "";
    const el = document.createElement("span");
    el.className = className;
    el.textContent = text;
    container.appendChild(el);
  }

  function buildRing() {
    const radius = getRadius();
    const frag = document.createDocumentFragment();

    for (let i = 0; i < FACES; i++) {
      const slide = SLIDES[i % COUNT];
      const figure = document.createElement("figure");
      figure.className = "carousel__card";
      figure.style.transform = `translate(-50%, -50%) rotateY(${
        i * FACE_STEP
      }deg) translateZ(${radius}px)`;

      figure.innerHTML = `
        <div class="carousel__face">
          <img src="${slide.image}" alt="${slide.alt}" draggable="false" />
        </div>
        <div class="carousel__back" aria-hidden="true"></div>
      `;
      frag.appendChild(figure);
    }

    ring.innerHTML = "";
    ring.appendChild(frag);
  }

  function applyRingTransform(animated) {
    ring.style.transition = animated
      ? "transform 0.75s cubic-bezier(0.33, 1, 0.32, 1)"
      : "none";
    ring.style.transform = `rotateY(${rotation}deg)`;
  }

  function syncCopy(direction = 1, animate = true) {
    const slide = SLIDES[current];
    cta.setAttribute("href", slide.href);
    label.setAttribute("href", slide.href);
    labelIcon.innerHTML = slide.iconHTML;

    if (!animate) {
      setTextInstant(ctaTrack, slide.button, "hero__cta-item");
      setTextInstant(labelTrack, slide.label, "hero__label-item");
      return;
    }

    slideText(ctaTrack, slide.button, "hero__cta-item", direction);
    slideText(labelTrack, slide.label, "hero__label-item", direction);
  }

  function goTo(index, { animate = true } = {}) {
    const len = COUNT;
    const next = ((index % len) + len) % len;
    if (next === current && animate) return;

    let delta = next - current;
    if (delta > len / 2) delta -= len;
    if (delta < -len / 2) delta += len;

    rotation -= delta * STEP;
    current = next;
    applyRingTransform(animate);
    syncCopy(delta >= 0 ? 1 : -1, animate);
  }

  function nextSlide() {
    goTo(current + 1);
  }

  function prevSlide() {
    goTo(current - 1);
  }

  function startAuto() {
    stopAuto();
    autoTimer = setInterval(nextSlide, 3200);
  }

  function stopAuto() {
    if (autoTimer) {
      clearInterval(autoTimer);
      autoTimer = null;
    }
  }

  function onPointerDown(e) {
    if (e.button != null && e.button !== 0) return;
    stopAuto();
    carousel.classList.add("is-dragging");
    drag = {
      startX: e.clientX,
      startRot: rotation,
    };
    if (e.pointerId != null && carousel.setPointerCapture) {
      try {
        carousel.setPointerCapture(e.pointerId);
      } catch (_) {}
    }
  }

  function onPointerMove(e) {
    if (!drag) return;
    const dx = e.clientX - drag.startX;
    rotation = drag.startRot + (dx / 160) * STEP;
    applyRingTransform(false);
  }

  function onPointerUp() {
    if (!drag) return;
    carousel.classList.remove("is-dragging");

    const prev = current;
    const snapped = Math.round(-rotation / STEP);
    rotation = -snapped * STEP;
    current = ((snapped % COUNT) + COUNT) % COUNT;
    applyRingTransform(true);

    let direction = current - prev;
    if (direction > COUNT / 2) direction -= COUNT;
    if (direction < -COUNT / 2) direction += COUNT;
    if (direction !== 0) syncCopy(direction >= 0 ? 1 : -1, true);

    drag = null;
    startAuto();
  }

  function onKey(e) {
    if (e.key === "ArrowRight") {
      stopAuto();
      nextSlide();
      startAuto();
    } else if (e.key === "ArrowLeft") {
      stopAuto();
      prevSlide();
      startAuto();
    }
  }

  function onResize() {
    buildRing();
    applyRingTransform(false);
  }

  buildRing();
  applyRingTransform(false);
  syncCopy(1, false);
  startAuto();

  carousel.addEventListener("pointerdown", onPointerDown);
  window.addEventListener("pointermove", onPointerMove);
  window.addEventListener("pointerup", onPointerUp);
  window.addEventListener("pointercancel", onPointerUp);
  window.addEventListener("keydown", onKey);
  window.addEventListener("resize", onResize);

  carousel.addEventListener("mouseenter", stopAuto);
  carousel.addEventListener("mouseleave", () => {
    if (!drag) startAuto();
  });
})();

});

document.querySelectorAll(".faq_tabs").forEach(tab => {
  tab.onclick = () => {
    const target = document.getElementById(tab.dataset.target);
    if (!target) return;

    document.querySelector(".faq_tabs.active")?.classList.remove("active");
    tab.classList.add("active");

    const header = parseFloat(
      getComputedStyle(document.documentElement)
        .getPropertyValue("--headerHeight")
    ) || 0;

    window.scrollTo({
      top: target.getBoundingClientRect().top + scrollY - header - 56,
      behavior: "smooth"
    });
  };
});