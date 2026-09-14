const guestName = document.getElementById("guestName");

const params = new URLSearchParams(window.location.search);

const guest = params.get("to");

if (guest) {
  guestName.textContent = decodeURIComponent(guest);
}

const openInvitation = document.getElementById("openInvitation");

const opening = document.getElementById("opening");

const mainContent = document.getElementById("mainContent");

const music = document.getElementById("weddingMusic");

const musicButton = document.getElementById("musicButton");

document.body.classList.add("lock");

openInvitation.addEventListener("click", () => {
  opening.style.opacity = "0";
  opening.style.transition = "opacity .8s ease";

  setTimeout(() => {
    opening.style.display = "none";

    mainContent.classList.remove("hidden");

    document.body.classList.remove("lock");

    music
      .play()
      .then(() => {
        musicButton.classList.add("playing");
      })
      .catch(() => {
        console.log("Music membutuhkan interaksi pengguna.");
      });
  }, 800);
});

musicButton.addEventListener("click", () => {
  if (music.paused) {
    music.play();

    musicButton.classList.add("playing");
  } else {
    music.pause();

    musicButton.classList.remove("playing");
  }
});

const weddingDate = new Date("December 12, 2026 09:00:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();

  const distance = weddingDate - now;

  if (distance <= 0) {
    document.getElementById("days").textContent = "00";
    document.getElementById("hours").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";

    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));

  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );

  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").textContent = String(days).padStart(2, "0");

  document.getElementById("hours").textContent = String(hours).padStart(2, "0");

  document.getElementById("minutes").textContent = String(minutes).padStart(
    2,
    "0",
  );

  document.getElementById("seconds").textContent = String(seconds).padStart(
    2,
    "0",
  );
}

updateCountdown();

setInterval(updateCountdown, 1000);

/* =========================
   SCROLL REVEAL
========================= */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");

        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
  },
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

const galleryItems = document.querySelectorAll(".gallery-item");

const lightbox = document.getElementById("lightbox");

const lightboxImage = document.getElementById("lightboxImage");

const lightboxClose = document.getElementById("lightboxClose");

galleryItems.forEach((item) => {
  item.addEventListener("click", () => {
    const image = item.dataset.image;

    lightboxImage.src = image;

    lightbox.classList.add("active");

    document.body.classList.add("lock");
  });
});

function closeLightbox() {
  lightbox.classList.remove("active");

  document.body.classList.remove("lock");

  lightboxImage.src = "";
}

lightboxClose.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeLightbox();
  }
});

const copyAccount = document.getElementById("copyAccount");

const accountNumber = document.getElementById("accountNumber");

copyAccount.addEventListener("click", async () => {
  const number = accountNumber.textContent.trim();

  try {
    await navigator.clipboard.writeText(number);

    copyAccount.textContent = "Tersalin ✓";

    setTimeout(() => {
      copyAccount.textContent = "Salin";
    }, 2000);
  } catch (error) {
    alert("Nomor rekening: " + number);
  }
});

const whatsappNumber = "6281234567890";

const currentGuest = guest || "Tamu Undangan";

const yesMessage = `Halo Alexander & Olivia,

Saya ${currentGuest} ingin mengonfirmasi bahwa saya akan hadir di acara pernikahan kalian pada 12 Desember 2026.

Terima kasih ❤️`;

const noMessage = `Halo Alexander & Olivia,

Saya ${currentGuest} mohon maaf belum dapat hadir di acara pernikahan kalian.

Semoga acaranya berjalan lancar dan menjadi keluarga yang bahagia ❤️`;

const rsvpYes = document.getElementById("rsvpYes");

const rsvpNo = document.getElementById("rsvpNo");

rsvpYes.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(yesMessage)}`;

rsvpNo.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(noMessage)}`;

/* =========================
   FLOATING PETALS & HEARTS
========================= */

function createPetals(container) {
  if (!container) return;

  for (let i = 0; i < 18; i++) {
    const petal = document.createElement("span");

    petal.classList.add("petal");

    const size = 8 + Math.random() * 10;

    petal.style.width = size + "px";
    petal.style.height = size * 0.7 + "px";

    petal.style.left = Math.random() * 100 + "%";

    petal.style.animationDuration = 8 + Math.random() * 8 + "s";
    petal.style.animationDelay = Math.random() * 10 + "s";

    petal.style.opacity = (0.4 + Math.random() * 0.5).toFixed(2);

    container.appendChild(petal);
  }
}

createPetals(document.querySelector(".petals"));
createPetals(document.querySelector(".petals-light"));

function createHearts(container) {
  if (!container) return;

  for (let i = 0; i < 12; i++) {
    const heart = document.createElement("span");

    heart.classList.add("floating-heart");

    heart.textContent = "♡";

    heart.style.left = Math.random() * 100 + "%";

    heart.style.fontSize = 12 + Math.random() * 16 + "px";

    heart.style.animationDuration = 10 + Math.random() * 10 + "s";
    heart.style.animationDelay = Math.random() * 8 + "s";

    container.appendChild(heart);
  }
}

createHearts(document.querySelector(".floating-hearts"));

/* =========================
   VARIED REVEAL ANIMATIONS
========================= */

document.querySelectorAll(".person").forEach((person, index) => {
  person.classList.remove("reveal");
  person.classList.add(index === 0 ? "reveal-left" : "reveal-right");
});

document.querySelectorAll(".event-card").forEach((card, index) => {
  card.classList.remove("reveal");
  card.classList.add(index === 0 ? "reveal-left" : "reveal-right");
});

const revealVariants = document.querySelectorAll(
  ".reveal-left, .reveal-right, .reveal-zoom, .reveal",
);

revealVariants.forEach((element) => {
  revealObserver.observe(element);
});
