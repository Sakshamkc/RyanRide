// JavaScript for Dark Mode Toggle
document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    // Check for saved theme preference in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        darkModeToggle.checked = true;
    } else {
        body.classList.remove('dark-mode');
        darkModeToggle.checked = false;
    }

    // Toggle dark mode on switch change
    darkModeToggle.addEventListener('change', () => {
        if (darkModeToggle.checked) {
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    });



    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

    window.addEventListener("scroll", () => {
        let current = "";

        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 100;
            if (scrollY >= sectionTop) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }
        });
    });


    const distanceInput = document.getElementById("distance");
    const totalFareInput = document.getElementById("totalFare");
    const pickupTimeInput = document.getElementById("pickupTime"); // Make sure this input exists!

    const baseFare = 3.60;
    const dayRate = 3.60;
    const nightRate = 5.00;

    function calculateFare() {
        const distance = parseFloat(distanceInput.value);
        const pickupTime = pickupTimeInput.value;

        if (isNaN(distance) || distance < 0 || !pickupTime) {
            totalFareInput.value = "";
            return;
        }

        const [hourStr] = pickupTime.split(":");
        const hour = parseInt(hourStr);

        const isNight = (hour >= 23 || hour < 7);
        const perMileRate = isNight ? nightRate : dayRate;

        const totalFare = baseFare + (distance * perMileRate);
        totalFareInput.value = totalFare.toFixed(2);
    }

    // Add event listeners for both inputs
    distanceInput.addEventListener("input", calculateFare);
    pickupTimeInput.addEventListener("input", calculateFare);


});