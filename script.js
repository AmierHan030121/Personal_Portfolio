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

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  revealNodes.forEach((node) => observer.observe(node));
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
setupReveal();
setupMediaModal();
setupIcons();
