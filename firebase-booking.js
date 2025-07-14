import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCHeYud47nrDlGud5k0Wd8LeBxqWjGqkn4",
  authDomain: "ryanride-308a0.firebaseapp.com",
  databaseURL: "https://ryanride-308a0-default-rtdb.firebaseio.com/",
  projectId: "ryanride-308a0",
  storageBucket: "ryanride-308a0.appspot.com",
  messagingSenderId: "239832475883",
  appId: "1:239832475883:web:b33c2520bdbf0c3447f6ae"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Booking form logic
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".booking-form-section form");
  if (!form) return;

  const bookingForm = document.getElementById('bookingForm');
  const serviceType = document.getElementById('serviceType');
  const airportFields = document.getElementById('airportFields');
  const allCols = bookingForm.querySelectorAll('.row.g-4 > [class*="col-"]');

  // Save original required fields
  bookingForm.querySelectorAll('input, select, textarea').forEach(el => {
    if (el.hasAttribute('required')) {
      el.dataset.originalRequired = 'true';
    }
  });

  // Toggle field visibility and requirements
  function updateFieldVisibility() {
    const sel = serviceType.value;
    const isAirport = sel === 'Airport Transfers';
    const isCity = sel === 'City Transfers';
    const isCorp = sel === 'Corporate Transfers';

    allCols.forEach(col => {
      const input = col.querySelector('input, select, textarea');
      const asterisk = col.querySelector('label .text-danger');
      const isCityVisible = col.hasAttribute('data-city-visible');
      const isInAirport = airportFields.contains(col);

      let shouldShow = false;
      let shouldRequire = false;

      if (!sel) {
        shouldShow = true;
        shouldRequire = input?.dataset.originalRequired === 'true';
      } else if (isAirport) {
        shouldShow = isInAirport || col === serviceType.closest('[class*="col-"]');
        shouldRequire = shouldShow;
      } else if (isCity) {
        shouldShow = isCityVisible || col === serviceType.closest('[class*="col-"]');
        shouldRequire = input?.dataset.originalRequired === 'true' && shouldShow;
      } else if (isCorp) {
        shouldShow = true;
        shouldRequire = input?.dataset.originalRequired === 'true';
      }

      col.classList.toggle('d-none', !shouldShow);

      if (input) {
        if (shouldRequire) {
          input.setAttribute('required', 'required');
          asterisk?.classList.remove('d-none');
        } else {
          input.removeAttribute('required');
          asterisk?.classList.add('d-none');
        }
      }
    });

    airportFields.classList.toggle('d-none', !isAirport);
  }

  // Listen for service type change
  serviceType.addEventListener('change', updateFieldVisibility);

  // Submit form
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const pickupVal = document.getElementById("pickupLocation")?.value.trim() || "";
    const destinationVal = document.getElementById("destination")?.value.trim() || "";
    const pickupPostcode = document.getElementById("pickupPostcode")?.value.trim() || "";
    const destinationPostcode = document.getElementById("destinationPostcode")?.value.trim() || "";
    const postcodeRegex = /^[A-Z]{1,2}\d{1,2}[A-Z]?\s?\d[A-Z]{2}$/i;
    const serviceTypeValue = serviceType.value;

    if (serviceTypeValue !== "City Transfers" && serviceTypeValue !== "Airport Transfers") {
      const pickupValid = postcodeRegex.test(pickupPostcode);
      const destinationValid = postcodeRegex.test(destinationPostcode);

      if (!pickupValid || !destinationValid) {
        Swal.fire({
          icon: 'error',
          title: 'Invalid Postcode',
          text: 'Please enter valid postcodes for both Pickup and Destination.',
          confirmButtonColor: '#d33'
        });
        return;
      }
    }

    // Build data object depending on service type
    let data = { serviceType: serviceTypeValue };

    if (serviceTypeValue === "Airport Transfers") {
      data = {
        ...data,
        airportName: document.getElementById("airportName").value,
        terminal: document.getElementById("terminal").value,
        flightNumber: document.getElementById("flightNumber").value,
        arrivingFrom: document.getElementById("arrivingFrom").value,
        pickMeAfter: document.getElementById("pickMeAfter").value,
        dropoffAddress: document.getElementById("dropoffAddress").value,
        doorNo: document.getElementById("doorNo").value,
        passengerName: document.getElementById("airportPassengerName").value,
        email: document.getElementById("airportEmail").value,
        phoneNumber: document.getElementById("airportContact").value,
        vehicleType: document.getElementById("airportVehicle").value,
        passengerCount: document.getElementById("airportPassengers").value,
        smallLuggage: document.getElementById("airportSmallLuggage").value,
        largeLuggage: document.getElementById("airportLargeLuggage").value,
        pickupDate: document.getElementById("pickupDate").value,
        pickupTime: document.getElementById("pickupTime").value,
        specialInstructions: document.getElementById("specialInstructions").value
      };
    } else {
      data = {
        ...data,
        fullName: document.getElementById("fullName").value,
        phoneNumber: document.getElementById("phoneNumber").value,
        email: document.getElementById("email").value,
        pickupLocation: pickupVal,
        pickupPostcode: pickupPostcode,
        destination: destinationVal,
        destinationPostcode: destinationPostcode,
        pickupDate: document.getElementById("pickupDate").value,
        pickupTime: document.getElementById("pickupTime").value,
        passengerCount: document.getElementById("passengerCount").value,
        luggageCount: document.getElementById("luggageCount").value,
        vehicleType: document.getElementById("vehicleType").value,
        specialInstructions: document.getElementById("specialInstructions").value,
        needReturnJourney: document.getElementById("needReturnJourney").checked ? "Yes" : "No"
      };
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.innerText = "Submitting...";

    try {
      const bookingsRef = ref(database, 'bookings');
      await push(bookingsRef, data);

      await emailjs.send("service_tqf4jxm", "template_vvjgtxm", data, "ov9kTwusFdsoxTnHL");

      Swal.fire({
        icon: 'success',
        title: 'Booking Submitted!',
        text: 'Thank you for booking with RyanRide. We will confirm your ride shortly.',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
      });

      form.reset();
      serviceType.value = "";
      serviceType.dispatchEvent(new Event('change'));
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Error submitting booking: ${error.message}`,
      });
    }

    submitBtn.disabled = false;
    submitBtn.innerText = "Submit";
  });
  updateFieldVisibility();
  
  emailjs.init("ov9kTwusFdsoxTnHL");
    const formm = document.getElementById("subscribe-form");

    if (!formm) {
      console.error("Form with ID 'subscribe-form' not found.");
      return;
    }
    
    formm.addEventListener("submit", function (event) {
      event.preventDefault();

      emailjs.sendForm("service_tqf4jxm", "template_2b8bnm7", this)
        .then(function () {
          Swal.fire({
            icon: 'success',
            title: 'Subscribed!',
            text: 'Thank you for subscribing to our newsletter.',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          });
          formm.reset();
        }, function (error) {
          Swal.fire({
            icon: 'error',
            title: 'Subscription Failed',
            text: `Error: ${error.message}`,
          });
          formm.reset();
        });
    });
});
