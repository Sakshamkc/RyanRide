document.addEventListener("DOMContentLoaded", function () {
  const testimonials = [
    {
      name: "Anna Jónsdóttir",
      company: "Iceland Foods",
      text: "Great service and always on time. I highly recommend them!",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg"
    },
    {
      name: "Björn Þorsteinsson",
      company: "Nordic Tech",
      text: "Very professional and clean vehicles. Loved the experience!",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg"
    },
    {
      name: "Elín Sigurðardóttir",
      company: "Blue Lagoon Tours",
      text: "Driver was friendly and helpful. Will use again!",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg"
    },
    {
      name: "Ólafur Einarsson",
      company: "Reykjavik Corp.",
      text: "Excellent service from start to finish. Smooth ride!",
      avatar: "https://randomuser.me/api/portraits/men/4.jpg"
    },
    {
      name: "Kristín Stefánsdóttir",
      company: "Arctic Travel",
      text: "They made my airport trip stress-free and easy!",
      avatar: "https://randomuser.me/api/portraits/women/5.jpg"
    },
    {
      name: "Ryan Rai",
      company: "Surya Nepal",
      text: "They made my airport trip stress-free and easy!",
      avatar: "https://randomuser.me/api/portraits/men/6.jpg"
    },
    {
      name: "Ryan Rai",
      company: "Surya Nepal",
      text: "They made my airport trip stress-free and easy!",
      avatar: "https://randomuser.me/api/portraits/men/7.jpg"
    },
    {
      name: "Ryan Rai",
      company: "Surya Nepal",
      text: "They made my airport trip stress-free and easy!",
      avatar: "https://randomuser.me/api/portraits/men/8.jpg"
    }
  ];

  let currentIndex = 0;

  const avatarContainer = document.getElementById("avatarContainer");
  const testimonialText = document.getElementById("testimonialText");
  const testimonialAuthor = document.getElementById("testimonialAuthor");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  function renderAvatars() {
    avatarContainer.innerHTML = "";
    testimonials.forEach((t, i) => {
      const img = document.createElement("img");
      img.src = t.avatar;
      img.alt = t.name;
      img.className = `rounded-circle border border-3 p-1 ${i === currentIndex ? 'border-warning' : 'border-secondary'}`;
      img.style.width = i === currentIndex ? "70px" : "60px";
      img.style.height = i === currentIndex ? "70px" : "60px";
      img.style.cursor = "pointer";
      img.addEventListener("click", () => {
        currentIndex = i;
        updateTestimonial();
      });
      avatarContainer.appendChild(img);
    });
  }

  function updateTestimonial() {
    const current = testimonials[currentIndex];
    testimonialText.textContent = `"${current.text}"`;
    testimonialAuthor.innerHTML = `${current.name}, <cite title="Company">${current.company}</cite>`;
    renderAvatars();
  }

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    updateTestimonial();
  });

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % testimonials.length;
    updateTestimonial();
  });

  setInterval(() => {
    currentIndex = (currentIndex + 1) % testimonials.length;
    updateTestimonial();
  }, 8000);

  updateTestimonial();
});
