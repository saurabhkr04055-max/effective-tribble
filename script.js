const isMobile = window.matchMedia("(max-width: 1024px)").matches;

/* CURSOR */
const cursor = document.getElementById("cursor-dot");
if (!isMobile && cursor) {
  document.addEventListener("mousemove", e => {
    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  });

  document.querySelectorAll("a, button, .project-card")
    .forEach(el => {
      el.addEventListener("mouseenter", () => cursor.classList.add("hovered"));
      el.addEventListener("mouseleave", () => cursor.classList.remove("hovered"));
    });
} else if (cursor) {
  cursor.style.display = "none";
}

/* TYPEWRITER */
const typeText = document.getElementById("typewriter");
if (typeText) {
  const text = typeText.dataset.text;
  let i = 0;
  (function type() {
    if (i < text.length) {
      typeText.textContent += text[i++];
      setTimeout(type, 90);
    }
  })();
}

/* REVEAL */
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add("visible");
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

/* MODAL */
const overlay = document.getElementById("project-modal-overlay");
const title = document.getElementById("modal-title");
const content = document.getElementById("modal-content");

document.querySelectorAll(".project-card").forEach(card => {
  card.addEventListener("click", () => {
    title.textContent = card.dataset.title;
    content.innerHTML = card.dataset.description;
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  });
});

document.getElementById("modal-close").onclick = closeModal;
overlay.onclick = e => e.target === overlay && closeModal();

function closeModal() {
  overlay.classList.remove("active");
  document.body.style.overflow = "";
}

document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeModal();
});
