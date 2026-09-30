/* ============================================
   BIRTHDAY PAGE - JAVASCRIPT
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
  // ===== PHOTO LIST =====
  const photos = [
    "photo_2026-04-08_20-26-30.jpg",
    "photo_2026-04-08_20-26-39.jpg",
    "photo_2026-04-08_20-26-51.jpg",
    "photo_2026-04-08_20-26-59.jpg",
    "photo_2026-04-08_20-27-05.jpg",
    "photo_2026-04-08_20-27-17.jpg",
    "photo_2026-04-08_20-27-20.jpg",
    "photo_2026-04-08_20-27-28.jpg",
    "photo_2026-04-08_20-27-36.jpg",
    "photo_2026-04-08_20-27-42.jpg",
    "photo_2026-04-08_20-27-56.jpg",
    "photo_2026-04-08_20-28-12.jpg",
    "photo_2026-04-08_20-28-20.jpg",
    "photo_2026-04-08_20-28-24.jpg",
    "photo_2026-04-08_20-28-28.jpg",
    "photo_2026-04-08_20-28-50.jpg",
    "photo_2026-04-08_20-36-09.jpg",
    "photo_2026-04-08_20-36-11.jpg",
    "photo_2026-04-08_20-36-14.jpg",
    "photo_2026-04-08_20-36-15 (2).jpg",
    "photo_2026-04-08_20-36-15.jpg",
    "photo_2026-04-08_20-36-16.jpg",
    "photo_2026-04-08_20-36-17 (2).jpg",
    "photo_2026-04-08_20-36-17.jpg",
    "photo_2026-04-08_20-36-18 (2).jpg",
    "photo_2026-04-08_20-36-18.jpg",
    "photo_2026-04-08_20-36-24.jpg",
    "photo_2026-04-08_20-36-28 (2).jpg",
    "photo_2026-04-08_20-36-28.jpg",
    "photo_2026-04-08_20-36-29.jpg",
  ];

  const loveEmojis = [
    "💕",
    "💖",
    "❤️",
    "💗",
    "💓",
    "💘",
    "💝",
    "🥰",
    "😍",
    "🌹",
  ];
  const roseEmojis = ["🌹", "🌸", "🌺", "🌷", "💐", "🌻", "✿", "❀"];

  // ===== BUILD PHOTO GALLERY =====
  const galleryGrid = document.getElementById("gallery-grid");

  photos.forEach((photo, index) => {
    const item = document.createElement("div");
    item.className = "gallery-item";
    item.style.animationDelay = `${Math.min(index * 0.05, 0.8)}s`;

    const img = document.createElement("img");
    img.src = photo;
    img.alt = `Momento especial ${index + 1}`;
    img.loading = "lazy";

    const overlay = document.createElement("div");
    overlay.className = "gallery-item-overlay";

    const heart = document.createElement("span");
    heart.textContent = loveEmojis[index % loveEmojis.length];
    overlay.appendChild(heart);

    item.appendChild(img);
    item.appendChild(overlay);

    item.addEventListener("click", () => openModal(index));

    galleryGrid.appendChild(item);
  });

  // ===== PHOTO MODAL =====
  const modal = document.getElementById("photo-modal");
  const modalImg = document.getElementById("modal-img");
  const modalClose = document.getElementById("modal-close");
  const modalPrev = document.getElementById("modal-prev");
  const modalNext = document.getElementById("modal-next");
  let currentPhotoIndex = 0;

  function openModal(index) {
    currentPhotoIndex = index;
    modalImg.src = photos[index];
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }

  function navigatePhoto(direction) {
    currentPhotoIndex =
      (currentPhotoIndex + direction + photos.length) % photos.length;
    modalImg.style.animation = "none";
    modalImg.offsetHeight; // trigger reflow
    modalImg.style.animation = "modalZoomIn 0.3s ease-out";
    modalImg.src = photos[currentPhotoIndex];
  }

  modalClose.addEventListener("click", closeModal);
  modalPrev.addEventListener("click", () => navigatePhoto(-1));
  modalNext.addEventListener("click", () => navigatePhoto(1));

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("active")) return;
    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowLeft") navigatePhoto(-1);
    if (e.key === "ArrowRight") navigatePhoto(1);
  });

  // ===== FLOATING HEARTS =====
  const heartsContainer = document.getElementById("floating-hearts");

  function createFloatingHeart() {
    const heart = document.createElement("div");
    heart.className = "heart-float";
    heart.textContent =
      loveEmojis[Math.floor(Math.random() * loveEmojis.length)];
    heart.style.left = Math.random() * 100 + "%";
    heart.style.fontSize = Math.random() * 1.5 + 0.8 + "rem";
    heart.style.animationDuration = Math.random() * 5 + 6 + "s";
    heartsContainer.appendChild(heart);

    heart.addEventListener("animationend", () => heart.remove());
  }

  setInterval(createFloatingHeart, 2000);

  // ===== FALLING ROSES =====
  const rosesContainer = document.getElementById("falling-roses");

  function createFallingRose() {
    const rose = document.createElement("div");
    rose.className = "rose-fall";
    rose.textContent =
      roseEmojis[Math.floor(Math.random() * roseEmojis.length)];
    rose.style.left = Math.random() * 100 + "%";
    rose.style.fontSize = Math.random() * 1 + 0.8 + "rem";
    rose.style.animationDuration = Math.random() * 6 + 7 + "s";
    rosesContainer.appendChild(rose);

    rose.addEventListener("animationend", () => rose.remove());
  }

  setInterval(createFallingRose, 3000);

  // Create a few initial hearts and roses
  for (let i = 0; i < 5; i++) {
    setTimeout(createFloatingHeart, i * 400);
    setTimeout(createFallingRose, i * 600);
  }

  // ===== SCROLL REVEAL =====
  const revealElements = document.querySelectorAll(".scroll-reveal");

  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach((el) => observer.observe(el));

  // ===== THEME TOGGLE =====
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = themeToggle.querySelector(".theme-icon");
  let isDark = localStorage.getItem("birthday-theme") === "dark";

  function setTheme(dark) {
    if (dark) {
      document.documentElement.setAttribute("data-theme", "dark");
      themeIcon.textContent = "☀️";
    } else {
      document.documentElement.removeAttribute("data-theme");
      themeIcon.textContent = "🌙";
    }
    localStorage.setItem("birthday-theme", dark ? "dark" : "light");
  }

  setTheme(isDark);

  themeToggle.addEventListener("click", () => {
    isDark = !isDark;
    setTheme(isDark);
  });

  // ===== CLICK TO CREATE HEARTS =====
  document.addEventListener("click", (e) => {
    // Don't create hearts on buttons or modal
    if (
      e.target.closest("button") ||
      e.target.closest(".photo-modal") ||
      e.target.closest(".gallery-item")
    )
      return;

    for (let i = 0; i < 5; i++) {
      const heart = document.createElement("div");
      heart.style.position = "fixed";
      heart.style.left = e.clientX + (Math.random() - 0.5) * 60 + "px";
      heart.style.top = e.clientY + (Math.random() - 0.5) * 60 + "px";
      heart.style.fontSize = Math.random() * 1.5 + 0.8 + "rem";
      heart.style.pointerEvents = "none";
      heart.style.zIndex = "9999";
      heart.style.transition = "all 1s ease-out";
      heart.style.opacity = "1";
      heart.textContent =
        loveEmojis[Math.floor(Math.random() * loveEmojis.length)];
      document.body.appendChild(heart);

      requestAnimationFrame(() => {
        heart.style.transform = `translateY(-${60 + Math.random() * 80}px) rotate(${Math.random() * 360}deg)`;
        heart.style.opacity = "0";
      });

      setTimeout(() => heart.remove(), 1200);
    }
  });

  // ===== TOUCH SWIPE FOR MODAL =====
  let touchStartX = 0;
  let touchEndX = 0;

  modal.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
    },
    { passive: true },
  );

  modal.addEventListener(
    "touchend",
    (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) navigatePhoto(1);
        else navigatePhoto(-1);
      }
    },
    { passive: true },
  );

  // ===== PARALLAX ON HERO =====
  const hero = document.getElementById("hero");
  window.addEventListener(
    "scroll",
    () => {
      const scrolled = window.pageYOffset;
      if (scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
      }
    },
    { passive: true },
  );

  // ===== MUSIC PLAYER (YouTube IFrame API) =====
  const musicToggle = document.getElementById("music-toggle");
  const musicIcon = musicToggle.querySelector("span");
  let isPlaying = false;
  let ytPlayer = null;
  let playerReady = false;

  // The YouTube IFrame API will call this global function when ready
  window.onYouTubeIframeAPIReady = function () {
    ytPlayer = new YT.Player("yt-player", {
      height: "1",
      width: "1",
      videoId: "s1QCL9AGbO0",
      playerVars: {
        autoplay: 0,
        loop: 1,
        playlist: "s1QCL9AGbO0", // required for loop to work
        controls: 0,
        disablekb: 1,
        fs: 0,
        modestbranding: 1,
        rel: 0,
      },
      events: {
        onReady: function (event) {
          playerReady = true;
          event.target.setVolume(80);
          console.log("🎵 Nuestra canción está lista para reproducirse");
        },
        onStateChange: function (event) {
          // If the video ends, restart it (backup for loop)
          if (event.data === YT.PlayerState.ENDED) {
            event.target.playVideo();
          }
        },
        onError: function (event) {
          console.log("⚠️ Error cargando la canción, intenta recargar la página");
        },
      },
    });
  };

  musicToggle.addEventListener("click", () => {
    if (!playerReady) {
      // If API hasn't loaded yet, show a message
      musicIcon.textContent = "⏳";
      setTimeout(() => {
        if (!playerReady) {
          musicIcon.textContent = "🎵";
        }
      }, 3000);
      return;
    }

    if (isPlaying) {
      ytPlayer.pauseVideo();
      musicIcon.textContent = "🎵";
      musicToggle.classList.remove("music-playing");
      isPlaying = false;
    } else {
      ytPlayer.playVideo();
      musicIcon.textContent = "🎶";
      musicToggle.classList.add("music-playing");
      isPlaying = true;
    }
  });

  console.log("💕 ¡Felíz cumpleaños mi amor! 💕");
  console.log("🎂 Esta página fue creada con mucho amor 🎂");
});
