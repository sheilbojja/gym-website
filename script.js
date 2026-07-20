/* HERO SLIDER */
const heroSlides = document.querySelectorAll(".slide");
const heroDots = document.querySelectorAll(".dot");
const heroLeft = document.querySelector(".left");
const heroRight = document.querySelector(".right");
let currentHeroSlide = 0;
let heroInterval;

function showHeroSlide(index) {
    if (heroSlides.length === 0) return;
    heroSlides.forEach(slide => slide.classList.remove("active"));
    heroDots.forEach(dot => dot.classList.remove("active"));

    heroSlides[index].classList.add("active");
    heroDots[index].classList.add("active");
    currentHeroSlide = index;
}

function nextHeroSlide() {
    let nextIndex = currentHeroSlide + 1;
    if (nextIndex >= heroSlides.length) nextIndex = 0;
    showHeroSlide(nextIndex);
}

function prevHeroSlide() {
    let prevIndex = currentHeroSlide - 1;
    if (prevIndex < 0) prevIndex = heroSlides.length - 1;
    showHeroSlide(prevIndex);
}

function resetHeroInterval() {
    clearInterval(heroInterval);
    heroInterval = setInterval(nextHeroSlide, 5000);
}

if (heroLeft && heroRight) {
    heroRight.addEventListener("click", () => {
        nextHeroSlide();
        resetHeroInterval();
    });
    
    heroLeft.addEventListener("click", () => {
        prevHeroSlide();
        resetHeroInterval();
    });
}

heroDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        showHeroSlide(index);
        resetHeroInterval();
    });
});

// Start auto rotation
resetHeroInterval();

/* GALLERY SLIDER */
const gallerySlides = document.querySelectorAll(".gallery-slide");
const galleryDots = document.querySelectorAll(".gallery-dot");
const galleryLeft = document.querySelector(".left-btn");
const galleryRight = document.querySelector(".right-btn");
let currentGallerySlide = 0;

function showGallerySlide(index) {
    if (gallerySlides.length === 0) return;
    
    gallerySlides.forEach(slide => slide.classList.remove("active"));
    galleryDots.forEach(dot => dot.classList.remove("active"));

    gallerySlides[index].classList.add("active");
    galleryDots[index].classList.add("active");
    currentGallerySlide = index;
}

function nextGallerySlide() {
    let nextIndex = currentGallerySlide + 1;
    if (nextIndex >= gallerySlides.length) nextIndex = 0;
    showGallerySlide(nextIndex);
}

function prevGallerySlide() {
    let prevIndex = currentGallerySlide - 1;
    if (prevIndex < 0) prevIndex = gallerySlides.length - 1;
    showGallerySlide(prevIndex);
}

if (galleryLeft && galleryRight) {
    galleryRight.addEventListener("click", () => {
        nextGallerySlide();
    });
    
    galleryLeft.addEventListener("click", () => {
        prevGallerySlide();
    });
}

galleryDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        showGallerySlide(index);
    });
});
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
});

const hiddenElements = document.querySelectorAll(".hidden");

hiddenElements.forEach((el) => observer.observe(el));

/* GYM TIMINGS - LIVE STATUS CHECKER */
function updateGymStatus() {
    const statusElement = document.getElementById("gym-status");
    if (!statusElement) return;

    const now = new Date();
    const day = now.getDay(); // 0 = Sunday, 1-6 = Monday-Saturday
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentTime = hours * 60 + minutes; // Time in minutes from midnight

    let isOpen = false;

    // Weekdays (Mon-Sat): 5:00 AM (300 mins) to 11:00 AM (660 mins) & 4:00 PM (960 mins) to 10:00 PM (1320 mins)
    const weekdayMorningStart = 5 * 60;   // 300
    const weekdayMorningEnd = 11 * 60;    // 660
    const weekdayEveningStart = 16 * 60;  // 960
    const weekdayEveningEnd = 22 * 60;    // 1320

    // Sundays: 6:00 AM (360 mins) to 11:00 AM (660 mins)
    const sundayMorningStart = 6 * 60;    // 360
    const sundayMorningEnd = 11 * 60;     // 660

    if (day === 0) { // Sunday
        if (currentTime >= sundayMorningStart && currentTime < sundayMorningEnd) {
            isOpen = true;
        }
    } else { // Mon-Sat
        if ((currentTime >= weekdayMorningStart && currentTime < weekdayMorningEnd) ||
            (currentTime >= weekdayEveningStart && currentTime < weekdayEveningEnd)) {
            isOpen = true;
        }
    }

    // Set classes and text
    statusElement.className = "status-badge " + (isOpen ? "open" : "closed");
    statusElement.textContent = isOpen ? "Open Now" : "Closed Now";
}

// Initial status run and dynamic interval updates
updateGymStatus();
setInterval(updateGymStatus, 30000); // Check status every 30 seconds

/* HEALTH & NUTRITION - DYNAMIC FILTERING */
const tabBtns = document.querySelectorAll(".tab-btn");
const nutritionCards = document.querySelectorAll(".nutrition-card");

tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        // Toggle active tabs
        tabBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const filter = btn.getAttribute("data-filter");

        nutritionCards.forEach(card => {
            const category = card.getAttribute("data-category");

            if (filter === "all" || category === filter) {
                // Show card with fade-in effect
                card.classList.remove("hide");
                card.classList.remove("fade-out");
                card.classList.add("fade-in");
            } else {
                // Fade out card and then hide from layout
                card.classList.add("fade-out");
                card.classList.remove("fade-in");
                setTimeout(() => {
                    if (card.classList.contains("fade-out")) {
                        card.classList.add("hide");
                    }
                }, 400); // Match CSS transition timing
            }
        });
    });
});
