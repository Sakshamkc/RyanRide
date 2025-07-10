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
  });