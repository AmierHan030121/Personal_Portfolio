const currentPage = document.body.dataset.page || "";

function setActiveNav() {
  const navItems = document.querySelectorAll("[data-nav]");
  navItems.forEach((item) => {
    const isActive = item.dataset.nav === currentPage;
    item.classList.toggle("is-active", isActive);
    if (isActive) {
      item.setAttribute("aria-current", "page");
    } else {
      item.removeAttribute("aria-current");
    }
  });
}

function setupYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
}

function setupReveal() {
  const revealNodes = document.querySelectorAll(".reveal");
  if (!revealNodes.length) return;

  function revealNode(node) {
    node.classList.add("is-visible");
    observer.unobserve(node);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          revealNode(entry.target);
        }
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  revealNodes.forEach((node) => observer.observe(node));

  window.setTimeout(() => {
    revealNodes.forEach((node) => {
      if (!node.classList.contains("is-visible")) {
        revealNode(node);
      }
    });
    observer.disconnect();
  }, 1200);
}

function setupPageTurnTransitions() {
  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
  if (reduceMotion) return;

  function finishEnter() {
    document.body.classList.remove("page-enter");
  }

  document.body.classList.add("page-enter");
  window.setTimeout(finishEnter, 760);

  window.addEventListener("pageshow", () => {
    document.body.classList.remove("page-leaving");
    document.body.classList.add("page-enter");
    window.setTimeout(finishEnter, 760);
  });

  function canTransition(anchor) {
    if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return false;
    if (anchor.closest(".media-modal")) return false;

    const url = new URL(anchor.href, window.location.href);
    if (url.origin !== window.location.origin) return false;
    if (url.pathname === window.location.pathname && url.hash === window.location.hash) return false;

    return url.pathname.endsWith(".html") || url.pathname.endsWith("/");
  }

  document.addEventListener("click", (event) => {
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const anchor = event.target.closest("a[href]");
    if (!canTransition(anchor)) return;

    event.preventDefault();
    document.body.classList.remove("page-enter");
    document.body.classList.add("page-leaving");

    window.setTimeout(() => {
      window.location.href = anchor.href;
    }, 430);
  });
}

function setupEyeFollowingCards() {
  const cards = document.querySelectorAll("[data-eye-card]");
  if (!cards.length) return;

  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
  const isCoarsePointer = window.matchMedia?.("(pointer: coarse)")?.matches ?? false;
  const isNarrowScreen = window.matchMedia?.("(max-width: 900px)")?.matches ?? false;
  const isMobileUA = /Android|iPhone|iPad|iPod|Mobile|HarmonyOS|MiuiBrowser|HuaweiBrowser/i.test(navigator.userAgent || "");
  const shouldUseDeviceMotion = (isCoarsePointer && isNarrowScreen) || isMobileUA;
  const supportsDeviceOrientation = "DeviceOrientationEvent" in window;
  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  cards.forEach((card) => {
    if (reduceMotion) {
      card.style.setProperty("--look-x", "0");
      card.style.setProperty("--look-y", "0");
      return;
    }

    let frame = 0;
    let latestEvent = null;
    let baseBeta = null;
    let baseGamma = null;
    let currentX = 0;
    let currentY = 0;
    let orientationActive = false;

    function setLook(lookX, lookY, smoothing = 1) {
      const nextX = clamp(lookX, -1, 1);
      const nextY = clamp(lookY, -1, 1);

      currentX += (nextX - currentX) * smoothing;
      currentY += (nextY - currentY) * smoothing;

      card.style.setProperty("--look-x", currentX.toFixed(3));
      card.style.setProperty("--look-y", currentY.toFixed(3));
      card.style.setProperty("--tilt-x", (currentX * 0.8).toFixed(3));
      card.style.setProperty("--tilt-y", (currentY * 0.8).toFixed(3));
    }

    function applyLook(event) {
      const rect = card.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      setLook(x, y);
    }

    function resetLook() {
      currentX = 0;
      currentY = 0;
      setLook(0, 0);
    }

    function applyOrientation(event) {
      if (!Number.isFinite(event.beta) || !Number.isFinite(event.gamma)) return;

      if (baseBeta === null || baseGamma === null) {
        baseBeta = event.beta;
        baseGamma = event.gamma;
      }

      const lookX = clamp((event.gamma - baseGamma) / 26, -1, 1);
      const lookY = clamp((event.beta - baseBeta) / 24, -1, 1);
      setLook(lookX, lookY, 0.2);
    }

    function startOrientationTracking() {
      if (!supportsDeviceOrientation || orientationActive) return;

      baseBeta = null;
      baseGamma = null;
      orientationActive = true;
      card.classList.add("motion-active");
      window.addEventListener("deviceorientation", applyOrientation, { passive: true });
    }

    function requestOrientationTracking() {
      if (orientationActive) {
        baseBeta = null;
        baseGamma = null;
        resetLook();
        return;
      }

      const permissionRequester = window.DeviceOrientationEvent?.requestPermission;

      if (typeof permissionRequester === "function") {
        permissionRequester
          .call(window.DeviceOrientationEvent)
          .then((state) => {
            if (state === "granted") startOrientationTracking();
          })
          .catch(() => {
            card.classList.remove("motion-active");
          });
        return;
      }

      startOrientationTracking();
    }

    if (shouldUseDeviceMotion && supportsDeviceOrientation) {
      const toggle = card.querySelector("[data-motion-toggle]");
      if (toggle) {
        toggle.hidden = false;
        toggle.addEventListener("click", requestOrientationTracking);
      }

      if (typeof window.DeviceOrientationEvent?.requestPermission !== "function") {
        startOrientationTracking();
      }

      document.addEventListener("visibilitychange", () => {
        if (!document.hidden && orientationActive) {
          baseBeta = null;
          baseGamma = null;
        }
      });
      return;
    }

    card.addEventListener("pointermove", (event) => {
      latestEvent = event;
      if (frame) return;

      frame = window.requestAnimationFrame(() => {
        if (latestEvent) applyLook(latestEvent);
        frame = 0;
      });
    });

    card.addEventListener("pointerleave", resetLook);
    card.addEventListener("blur", resetLook, true);
  });
}

function buildPreviewNode(type, src) {
  const safeSrc = encodeURI(src);

  if (type === "pdf") {
    const frame = document.createElement("iframe");
    frame.src = safeSrc;
    frame.title = "PDF 预览";
    frame.loading = "lazy";
    return frame;
  }

  if (type === "gallery") {
    const gallery = document.createElement("div");
    gallery.className = "modal-gallery";
    const sources = src
      .split("|")
      .map((item) => item.trim())
      .filter(Boolean);

    sources.forEach((item, index) => {
      const img = document.createElement("img");
      img.src = encodeURI(item);
      img.alt = `项目预览图 ${index + 1}`;
      img.loading = "eager";
      gallery.append(img);
    });

    return gallery;
  }

  const img = document.createElement("img");
  img.src = safeSrc;
  img.alt = "项目预览图";
  img.loading = "lazy";
  return img;
}

function shouldOpenPdfExternally() {
  const ua = navigator.userAgent || "";
  const isMobileUA = /Android|iPhone|iPad|iPod|Mobile|HarmonyOS|MiuiBrowser|HuaweiBrowser/i.test(ua);
  const hasCoarsePointer = window.matchMedia?.("(pointer: coarse)")?.matches ?? false;
  const isNarrowScreen = window.matchMedia?.("(max-width: 900px)")?.matches ?? false;
  return isMobileUA || (hasCoarsePointer && isNarrowScreen);
}

function setupMediaModal() {
  const modal = document.getElementById("mediaModal");
  const modalContent = document.getElementById("modalContent");
  if (!modal || !modalContent) return;

  const openers = document.querySelectorAll("[data-preview-src]");
  const closeBtn = modal.querySelector("[data-close-modal]");

  openers.forEach((button) => {
    button.addEventListener("click", () => {
      const src = button.getAttribute("data-preview-src");
      const type = button.getAttribute("data-preview-type") || "image";
      if (!src) return;

      if (type === "pdf" && shouldOpenPdfExternally()) {
        const safeSrc = encodeURI(src);
        window.location.href = safeSrc;
        return;
      }

      modalContent.innerHTML = "";
      modalContent.append(buildPreviewNode(type, src));
      if (typeof modal.showModal === "function") {
        modal.showModal();
      }
    });
  });

  function closeModal() {
    modal.close();
    modalContent.innerHTML = "";
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", closeModal);
  }

  modal.addEventListener("click", (event) => {
    const rect = modal.getBoundingClientRect();
    const hit =
      rect.top <= event.clientY &&
      event.clientY <= rect.top + rect.height &&
      rect.left <= event.clientX &&
      event.clientX <= rect.left + rect.width;
    if (!hit) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.open) {
      closeModal();
    }
  });
}

function setupIcons() {
  if (window.lucide && typeof window.lucide.createIcons === "function") {
    window.lucide.createIcons();
  }
}

setActiveNav();
setupYear();
setupPageTurnTransitions();
setupEyeFollowingCards();
setupReveal();
setupMediaModal();
setupIcons();
