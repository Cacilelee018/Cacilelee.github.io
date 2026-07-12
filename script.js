const projects = {
  "project-01": {
    title: "Fragments of a Small Room",
    meta: "Animation / 2026",
    image: "assets/images/work-01.svg",
    alt: "Still from Fragments of a Small Room",
    description:
      "작은 방의 빛, 반복되는 사물, 창문 밖 소리를 프레임 단위로 재구성한 2D 애니메이션입니다. 실제 작업 설명으로 교체하세요.",
    facts: {
      Runtime: "04:12",
      Medium: "2D digital animation, sound",
      Role: "Direction, animation, editing",
      Screenings: "Sample Animation Festival 2026"
    }
  },
  "project-02": {
    title: "Warm Noise Archive",
    meta: "Single-channel video / 2025",
    image: "assets/images/work-02.svg",
    alt: "Still from Warm Noise Archive",
    description:
      "녹음된 주변 소리와 오래된 이미지 캡처를 조합한 영상 작업입니다. 리서치 과정, 상영 장소, 협업자를 적어주세요.",
    facts: {
      Runtime: "07:40",
      Medium: "Video, field recording",
      Role: "Camera, sound, editing",
      Exhibited: "Moving Image Festival 2025"
    }
  },
  "project-03": {
    title: "Loop for Two Windows",
    meta: "Installation / 2024",
    image: "assets/images/work-03.svg",
    alt: "Installation documentation for Loop for Two Windows",
    description:
      "두 개의 화면과 반복 재생되는 애니메이션 루프를 이용한 설치 작업입니다. 공간 구성과 관람 방식을 구체적으로 적어주세요.",
    facts: {
      Format: "Two-channel projection",
      Medium: "Animation loop, installation",
      Role: "Concept, animation, installation",
      Venue: "Open Studio 2024"
    }
  }
};

const header = document.querySelector("[data-header]");
const nav = document.querySelector("#site-nav");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = [...document.querySelectorAll(".site-nav a")];
const filterButtons = [...document.querySelectorAll(".filter-button")];
const workCards = [...document.querySelectorAll(".work-card")];
const galleryButtons = [...document.querySelectorAll("[data-gallery-view]")];
const stillGrid = document.querySelector("[data-still-grid]");
const modal = document.querySelector("[data-modal]");
const modalClose = document.querySelector("[data-modal-close]");
const modalPrev = document.querySelector("[data-modal-prev]");
const modalNext = document.querySelector("[data-modal-next]");
const imageModal = document.querySelector("[data-image-modal]");
const imageModalClose = document.querySelector("[data-image-modal-close]");
const toTop = document.querySelector("[data-to-top]");
const filterCount = document.querySelector("[data-filter-count]");
const heroFrame = document.querySelector("[data-hero-frame]");
const frameRange = document.querySelector("[data-frame-range]");
const framePrev = document.querySelector("[data-frame-prev]");
const frameNext = document.querySelector("[data-frame-next]");
const frameLabel = document.querySelector("[data-frame-label]");
const frameCaption = document.querySelector("[data-frame-caption]");
const projectIds = Object.keys(projects);
let lastFocusedElement = null;
let lastFocusedImageElement = null;
let activeProjectId = projectIds[0];

document.body.classList.add("is-enhanced");

document.querySelector("[data-year]").textContent = new Date().getFullYear();

const heroFrames = [
  {
    src: "assets/images/hero-still.svg",
    alt: "Abstract animation still placeholder",
    caption: "Frame 01 - Replace with a representative still or installation view."
  },
  {
    src: "assets/images/still-01.svg",
    alt: "Animation still sample 1",
    caption: "Frame 02 - Use this area like a tiny frame-by-frame preview."
  },
  {
    src: "assets/images/still-02.svg",
    alt: "Animation still sample 2",
    caption: "Frame 03 - Swap these SVG files for your own animation captures."
  },
  {
    src: "assets/images/still-04.svg",
    alt: "Animation still sample 4",
    caption: "Frame 04 - Keep four to six frames for a compact mobile preview."
  }
];

const setHeroFrame = (index) => {
  if (!heroFrame || !frameRange) return;
  const nextIndex = (index + heroFrames.length) % heroFrames.length;
  const frame = heroFrames[nextIndex];
  heroFrame.src = frame.src;
  heroFrame.alt = frame.alt;
  frameRange.value = String(nextIndex);
  if (frameCaption) frameCaption.textContent = frame.caption;
  if (frameLabel) frameLabel.textContent = `${String(nextIndex + 1).padStart(2, "0")} / ${String(heroFrames.length).padStart(2, "0")}`;
};

frameRange?.addEventListener("input", () => setHeroFrame(Number(frameRange.value)));
framePrev?.addEventListener("click", () => setHeroFrame(Number(frameRange?.value || 0) - 1));
frameNext?.addEventListener("click", () => setHeroFrame(Number(frameRange?.value || 0) + 1));

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

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.toggle("is-active", item === button));
    let visibleCount = 0;

    workCards.forEach((card) => {
      const shouldShow = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("is-hidden", !shouldShow);
      if (shouldShow) visibleCount += 1;
    });

    if (filterCount) filterCount.textContent = `${visibleCount} ${visibleCount === 1 ? "work" : "works"}`;
  });
});

galleryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const view = button.dataset.galleryView;
    galleryButtons.forEach((item) => item.classList.toggle("is-active", item === button));
    stillGrid?.classList.toggle("is-sequence", view === "sequence");
  });
});

const openProject = (projectId, trigger) => {
  const project = projects[projectId];
  if (!project || !modal) return;

  activeProjectId = projectId;
  lastFocusedElement = trigger;
  modal.querySelector("[data-modal-image]").src = project.image;
  modal.querySelector("[data-modal-image]").alt = project.alt;
  modal.querySelector("[data-modal-meta]").textContent = project.meta;
  modal.querySelector("[data-modal-title]").textContent = project.title;
  modal.querySelector("[data-modal-description]").textContent = project.description;

  const facts = modal.querySelector("[data-modal-facts]");
  facts.innerHTML = "";
  Object.entries(project.facts).forEach(([label, value]) => {
    const row = document.createElement("div");
    const dt = document.createElement("dt");
    const dd = document.createElement("dd");
    dt.textContent = label;
    dd.textContent = value;
    row.append(dt, dd);
    facts.append(row);
  });

  if (typeof modal.showModal === "function" && !modal.open) {
    modal.showModal();
    document.body.classList.add("is-locked");
  } else if (typeof modal.showModal !== "function") {
    window.location.hash = "works";
  }
};

document.querySelectorAll("[data-project]").forEach((button) => {
  button.addEventListener("click", () => openProject(button.dataset.project, button));
});

const openAdjacentProject = (direction) => {
  const currentIndex = projectIds.indexOf(activeProjectId);
  const nextIndex = (currentIndex + direction + projectIds.length) % projectIds.length;
  openProject(projectIds[nextIndex], lastFocusedElement);
};

modalPrev?.addEventListener("click", () => openAdjacentProject(-1));
modalNext?.addEventListener("click", () => openAdjacentProject(1));

const closeModal = () => {
  if (!modal?.open) return;
  modal.close();
  document.body.classList.remove("is-locked");
  lastFocusedElement?.focus();
};

modalClose?.addEventListener("click", closeModal);
modal?.addEventListener("click", (event) => {
  if (event.target === modal) closeModal();
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
    closeModal();
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
