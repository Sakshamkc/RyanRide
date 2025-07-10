// firebase-booking.js
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

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const data = {
      fullName: document.getElementById("fullName").value,
      phoneNumber: document.getElementById("phoneNumber").value,
      email: document.getElementById("email").value,
      pickupLocation: document.getElementById("pickupLocation").value,
      destination: document.getElementById("destination").value,
      pickupDate: document.getElementById("pickupDate").value,
      pickupTime: document.getElementById("pickupTime").value,
      passengerCount: document.getElementById("passengerCount").value,
      vehicleType: document.getElementById("vehicleType").value,
      distance: document.getElementById("distance").value,
      estimatedFare: document.getElementById("totalFare").value,
      specialInstructions: document.getElementById("specialInstructions").value
    };

    const bookingsRef = ref(database, 'bookings');
    try {
      await push(bookingsRef, data);
      Swal.fire({
        icon: 'success',
        title: 'Booking Submitted!',
        text: 'Thank you for booking with RyanRide. We will confirm your ride shortly.',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
      });
      form.reset();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Error submitting booking: ${error.message}`,
      });
    }
  });
});
