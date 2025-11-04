document.addEventListener('DOMContentLoaded', () => {
  const images = ['img/logo.png', 'img/logo.png', 'img/logo.png', 'img/logo.png'];

  let currentIndex = 0;
  let interval = null;

  const bgImage = document.getElementById('hero-bg');
  const dotsContainer = document.getElementById('hero-dots');

  // Preload images
  images.forEach(src => {
    const img = new Image();
    img.src = src;
  });

  // Create dots
  images.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = `w-2 h-2 rounded-full transition-all duration-300 ${
      i === 0 ? 'bg-white scale-125' : 'bg-white/50'
    }`;
    dot.addEventListener('click', () => {
      goToSlide(i);
      resetInterval();
    });
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll('button');

  function updateBackground() {
    bgImage.style.opacity = '0';
    setTimeout(() => {
      bgImage.src = images[currentIndex];
      bgImage.style.opacity = '1';
    }, 300);

    dots.forEach((dot, i) => {
      dot.className = `w-2 h-2 rounded-full transition-all duration-300 ${
        i === currentIndex ? 'bg-white scale-125' : 'bg-white/50'
      }`;
    });
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % images.length;
    updateBackground();
  }

  function goToSlide(index) {
    currentIndex = index;
    updateBackground();
  }

  function startInterval() {
    interval = setInterval(nextSlide, 5000);
  }

  function resetInterval() {
    clearInterval(interval);
    startInterval();
  }

  // Initialize
  updateBackground();
  startInterval();
});

// Animate quick links after load
window.addEventListener('load', () => {
  const quickLinks = document.getElementById('quick-links');
  if (quickLinks) {
    setTimeout(() => {
      quickLinks.classList.remove('opacity-0', '-translate-x-10');
      quickLinks.classList.add('opacity-100', 'translate-x-0');
    }, 500);
  }
});

// ==================== COUNT-UP ANIMATION ====================

// Function to animate counting
function animateCount(el) {
  const target = parseFloat(el.getAttribute("data-target"));
  const suffix = el.getAttribute("data-suffix") || "";
  const duration = 1500; // total animation time (ms)
  const frameRate = 30;  // frames per second
  const totalFrames = Math.round(duration / (1000 / frameRate));
  let frame = 0;

  const counter = setInterval(() => {
    frame++;
    const progress = frame / totalFrames;
    const value = target * progress;
    if (frame >= totalFrames) {
      clearInterval(counter);
      el.textContent = target.toLocaleString() + suffix;
    } else {
      el.textContent = Math.floor(value).toLocaleString() + suffix;
    }
  }, 1000 / frameRate);
}

// Intersection Observer to trigger when section is visible
document.addEventListener("DOMContentLoaded", () => {
  const statsSection = document.querySelector("#university-stats");
  if (!statsSection) return;

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll(".count").forEach(animateCount);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(statsSection);
});
