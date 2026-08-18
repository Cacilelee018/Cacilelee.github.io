const header = document.querySelector("[data-header]");
const nav = document.querySelector("#site-nav");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = [...document.querySelectorAll(".site-nav a")];
const imageModal = document.querySelector("[data-image-modal]");
const imageModalClose = document.querySelector("[data-image-modal-close]");
const toTop = document.querySelector("[data-to-top]");
let lastFocusedImageElement = null;

document.body.classList.add("is-enhanced");

const year = document.querySelector("[data-year]");
if (year) year.textContent = new Date().getFullYear();

document.querySelectorAll("[data-youtube-player]").forEach((player) => {
  const videoId = player.dataset.videoId;
  const title = player.dataset.title || "YouTube video player";
  const canEmbed = ["http:", "https:"].includes(window.location.protocol);

  if (!videoId || !canEmbed) return;

  const iframe = document.createElement("iframe");
  iframe.title = title;
  iframe.loading = "lazy";
  iframe.src = `https://www.youtube.com/embed/${encodeURIComponent(videoId)}?rel=0&playsinline=1`;
  iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
  iframe.referrerPolicy = "strict-origin-when-cross-origin";
  iframe.allowFullscreen = true;
  player.replaceChildren(iframe);
});

navToggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

const openImageModal = (button) => {
  if (!imageModal) return;
  lastFocusedImageElement = button;
  const image = imageModal.querySelector("[data-image-modal-image]");
  const caption = imageModal.querySelector("[data-image-modal-caption]");
  image.src = button.dataset.liveImage;
  image.alt = button.querySelector("img")?.alt || "";
  caption.textContent = button.dataset.liveCaption || "";

  if (typeof imageModal.showModal === "function" && !imageModal.open) {
    imageModal.showModal();
    document.body.classList.add("is-locked");
  }
};

const closeImageModal = () => {
  if (!imageModal?.open) return;
  imageModal.close();
  document.body.classList.remove("is-locked");
  lastFocusedImageElement?.focus();
};

document.querySelectorAll("[data-live-image]").forEach((button) => {
  button.addEventListener("click", () => openImageModal(button));
});

imageModalClose?.addEventListener("click", closeImageModal);
imageModal?.addEventListener("click", (event) => {
  if (event.target === imageModal) closeImageModal();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeImageModal();
    nav.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
  }
});

const visibleSections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
);

visibleSections.forEach((section) => sectionObserver.observe(section));

const revealItems = [...document.querySelectorAll("[data-reveal]")];
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const updateTopButton = () => {
  toTop?.classList.toggle("is-visible", window.scrollY > 700);
  header?.classList.toggle("is-scrolled", window.scrollY > 10);
};

window.addEventListener("scroll", updateTopButton, { passive: true });
updateTopButton();

toTop?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
