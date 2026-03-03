document.addEventListener("DOMContentLoaded", () => {
    // ── Nav: highlight active link on scroll ──
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach((section) => {
            if (scrollY >= section.offsetTop - 100) {
                current = section.getAttribute("id");
            }
        });
        navLinks.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
        });
    });

    // ── Nav: collapse on link click (mobile) ──
    document.querySelectorAll(".navbar-collapse .nav-link").forEach((link) => {
        link.addEventListener("click", () => {
            const navbarCollapse = document.querySelector(".navbar-collapse");
            if (navbarCollapse.classList.contains("show")) {
                new bootstrap.Collapse(navbarCollapse, { toggle: false }).hide();
            }
        });
    });

    // ── Flatpickr: Pickup form date & time ──
    flatpickr("#pickupDate", {
        dateFormat: "Y-m-d",
        minDate: "today",
    });
    flatpickr("#pickupTime", {
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
        time_24hr: true,
    });

    // ── Flatpickr: Drop-off form pickup time (12h AM/PM) ──
    flatpickr("#dropoffPickupTime", {
        enableTime: true,
        noCalendar: true,
        dateFormat: "h:i K",
        time_24hr: false,
    });
});
