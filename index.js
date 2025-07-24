document.addEventListener("DOMContentLoaded", () => {
    // NAV ACTIVE LINK ON SCROLL
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

    // COLLAPSE NAVBAR ON LINK CLICK
    document.querySelectorAll('.navbar-collapse .nav-link').forEach(link => {
        link.addEventListener('click', () => {
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: false });
                bsCollapse.hide();
            }
        });
    });

    // 🚀 UK POSTCODE AUTO-FILL LOGIC
    const pickupPostcodeInput = document.getElementById("pickupPostcode");
    const destinationPostcodeInput = document.getElementById("destinationPostcode");
    const pickupLocationInput = document.getElementById("pickupLocation");
    const destinationInput = document.getElementById("destination");

    async function fetchAddressFromPostcode(postcode, targetInput) {
        const formattedPostcode = postcode.trim().toUpperCase();
        if (!formattedPostcode) return;

        try {
            const res = await fetch(`https://api.postcodes.io/postcodes/${formattedPostcode}`);
            const data = await res.json();

            if (data.status === 200) {
                const { admin_district, region, country } = data.result;
                const formattedAddress = `${admin_district}, ${region}, ${country}`;
                targetInput.value = formattedAddress;
            } else {
                console.warn("Postcode not found:", postcode);
                targetInput.value = ""; // Optional: clear the field if invalid
            }
        } catch (err) {
            console.error("Error fetching postcode info:", err);
            targetInput.value = "";
        }
    }

    pickupPostcodeInput.addEventListener("blur", () => {
        fetchAddressFromPostcode(pickupPostcodeInput.value, pickupLocationInput);
    });

    destinationPostcodeInput.addEventListener("blur", () => {
        fetchAddressFromPostcode(destinationPostcodeInput.value, destinationInput);
    });

    flatpickr("#pickupDate", {
    dateFormat: "Y-m-d",
    minDate: "today"
  });
  flatpickr("#pickupTime", {
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i", // 24-hour format. Use "h:i K" for 12-hour + AM/PM
    time_24hr: true,
  });
});
