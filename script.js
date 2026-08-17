const projects = {
  "project-01": {
    title: "도담도담 여수",
    meta: "Animation IP / 2026-present",
    image: "assets/images/work-01.svg",
    alt: "도담도담 여수 애니메이션 IP 프로젝트 대표 이미지 자리",
    description:
      "여수 거문도 신지끼 설화를 기반으로 캐릭터, 음악, 애니메이션 콘텐츠를 기획·제작하는 지역문화콘텐츠 프로젝트입니다. 해양문화와 자연환경 등 여수의 문화자원을 시청각 콘텐츠 요소로 재구성합니다.",
    facts: {
      Period: "May.2026 - Present",
      Medium: "Animation IP, character, music",
      Role: "Planning, character design, music, animation",
      Support: "전남문화재단 원스톱창작지원 프로젝트 선정",
      Exhibition: "2026 여수세계섬박람회 연계 전시 콘텐츠"
    }
  },
  "project-02": {
    title: "미지의 나에게, 스페이스 오디세이",
    meta: "Audiovisual / 2026-present",
    image: "assets/images/work-02.svg",
    alt: "미지의 나에게 스페이스 오디세이 오디오비주얼 작업 이미지 자리",
    description:
      "클래식 음악의 구조와 정서 흐름을 우주 다큐멘터리 형식의 영상으로 구성한 공연 오디오비주얼 작업입니다. 생성형 영상을 활용해 음악적 경험을 시각적 내러티브로 재구성합니다.",
    facts: {
      Period: "Jun.2026 - Present",
      Medium: "Audiovisual, performance video",
      Role: "Video direction, audiovisual planning and direction",
      Program: "2026 광주광역시 문화예술 민간단체 지원사업 선정 공연 참여",
      Venue: "국립아시아문화전당 극장 3, Nov.2026 예정"
    }
  },
  "project-03": {
    title: "누리의 빛, 소리의 물결",
    meta: "Audiovisual Performance / 2025",
    image: "assets/images/work-03.svg",
    alt: "누리의 빛 소리의 물결 공연 영상 작업 이미지 자리",
    description:
      "클래식 음악의 구조와 정서 흐름을 사극풍 영상으로 구성한 오디오비주얼 퍼포먼스입니다. 생성형 영상을 활용해 음악 정서를 인물 중심의 시각적 내러티브로 전환했습니다.",
    facts: {
      Period: "Jun.2025 - Oct.2025",
      Medium: "Audiovisual, performance operation",
      Role: "Video direction, audiovisual planning and direction",
      Operation: "공연 현장 영상·음향·조명 오퍼레이팅 수행",
      Performance: "Nov.2025 오디오비주얼 퍼포먼스"
    }
  },
  "project-04": {
    title: "정물화 (Still Life)",
    meta: "Single Album / 2024-2025",
    image: "assets/images/video-poster.svg",
    alt: "정물화 Still Life 음악 작업 이미지 자리",
    description:
      "싱글 앨범 제작 및 발매 과정에 참여한 음악 작업입니다. 가사 작성, 멜로디 구성, 보컬 레코딩과 피처링에 참여했습니다.",
    facts: {
      Period: "Oct.2024 - Dec.2025",
      Medium: "Single album, music production",
      Role: "Lyrics, melody composition, vocal featuring",
      Process: "음원 제작 및 발매 과정 참여"
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
const projectIds = Object.keys(projects);
let lastFocusedElement = null;
let lastFocusedImageElement = null;
let activeProjectId = projectIds[0];

document.body.classList.add("is-enhanced");

document.querySelector("[data-year]").textContent = new Date().getFullYear();

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
