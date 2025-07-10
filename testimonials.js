    document.addEventListener("DOMContentLoaded",function(){
          const testimonialItems = document.querySelectorAll('.testimonial-item');
    const navDots = document.querySelectorAll('.nav-dot');
    const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
    let currentIndex = 0;
    let autoSwipeInterval;
    const swipeDuration = 7000; // Time in milliseconds (7 seconds)

    function showTestimonial(index) {
        // Hide all testimonials and deactivate all dots
        testimonialItems.forEach((item) => {
            item.classList.remove('active');
        });
        navDots.forEach((dot) => {
            dot.classList.remove('active');
        });

        // Show the selected testimonial and activate its dot
        if (testimonialItems[index]) {
            testimonialItems[index].classList.add('active');
            if (navDots[index]) {
                navDots[index].classList.add('active');
            }
        }
        currentIndex = index;
    }

    function nextTestimonial() {
        currentIndex = (currentIndex + 1) % testimonialItems.length;
        showTestimonial(currentIndex);
    }

    function startAutoSwipe() {
        stopAutoSwipe(); // Clear any existing interval
        autoSwipeInterval = setInterval(nextTestimonial, swipeDuration);
    }

    function stopAutoSwipe() {
        clearInterval(autoSwipeInterval);
    }

    prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + testimonialItems.length) % testimonialItems.length;
    showTestimonial(currentIndex);
  });

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % testimonialItems.length;
    showTestimonial(currentIndex);
  });
    // Initialize: Show the first testimonial and start swiping
    showTestimonial(currentIndex);
    startAutoSwipe();


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