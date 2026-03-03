// Initialize Email.js
emailjs.init("OkR6Uv_1oi2Q7GWUW");

document.addEventListener("DOMContentLoaded", () => {
  // ── Booking Form Logic ──
  const form = document.querySelector(".booking-form-section form");
  if (!form) return;

  const bookingForm = document.getElementById('bookingForm');
  const serviceType = document.getElementById('serviceType');
  const airportFields = document.getElementById('airportFields');
  const airportDropoffFields = document.getElementById('airportDropoffFields');
  const allCols = bookingForm.querySelectorAll('.row.g-4 > [class*="col-"]');

  // Save original required attributes, then strip them (managed dynamically)
  bookingForm.querySelectorAll('input, select, textarea').forEach(el => {
    el.setAttribute('data-original-required', el.hasAttribute('required'));
    el.removeAttribute('required');
  });

  // ── Toggle field visibility & required state based on service type ──
  function updateFieldVisibility() {
    const sel = serviceType.value;
    const isAirportPickup  = sel === 'Airport Transfer/Pickup';
    const isAirportDropoff = sel === 'Airport Transfer/Drop off';
    const isCityType       = sel === 'Local Transfers' || sel === 'Work Transfers' || sel === 'Long Distance';

    const airportPickupRequired  = ['airportName', 'flightNumber', 'dropoffAddress', 'airportPassengerName', 'airportContact'];
    const airportDropoffRequired = ['dropoffAirport', 'dropoffTerminal', 'dropoffPickupTime', 'dropoffPickupAddress', 'dropoffPassengerName', 'dropoffContact'];

    allCols.forEach(col => {
      const input    = col.querySelector('input, select, textarea');
      const asterisk = col.querySelector('label .text-danger');
      const isCityVisible = col.hasAttribute('data-city-visible');
      const isInAirport   = airportFields.contains(col);
      const isInDropoff   = airportDropoffFields.contains(col);
      const isServiceCol  = col === serviceType.closest('[class*="col-"]');

      let shouldShow    = false;
      let shouldRequire = false;

      if (!sel) {
        shouldShow    = isCityVisible || isServiceCol;
        shouldRequire = input?.dataset.originalRequired === 'true' && shouldShow;
      } else if (isAirportPickup) {
        shouldShow    = isInAirport || isServiceCol;
        shouldRequire = airportPickupRequired.includes(input?.id) && shouldShow;
      } else if (isAirportDropoff) {
        shouldShow    = isInDropoff || isServiceCol;
        shouldRequire = airportDropoffRequired.includes(input?.id) && shouldShow;
      } else if (isCityType) {
        shouldShow    = isCityVisible || isServiceCol;
        shouldRequire = input?.dataset.originalRequired === 'true' && shouldShow;
      }

      col.classList.toggle('d-none', !shouldShow);

      if (input) {
        input.toggleAttribute('required', shouldRequire);
      }
      if (asterisk) {
        asterisk.classList.toggle('d-none', !shouldRequire);
      }
    });

    airportFields.classList.toggle('d-none', !isAirportPickup);
    airportDropoffFields.classList.toggle('d-none', !isAirportDropoff);
  }

  serviceType.addEventListener('change', updateFieldVisibility);

  // ── Form Submission ──
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled  = true;
    submitBtn.innerText = "Submitting...";

    const serviceTypeValue = serviceType.value;
    let data = { serviceType: serviceTypeValue };

    if (serviceTypeValue === "Airport Transfer/Pickup") {
      data = {
        ...data,
        airportName:         document.getElementById('airportName').value,
        terminal:            document.getElementById('airportTerminal').value,
        flightNumber:        document.getElementById('flightNumber').value,
        arrivingFrom:        document.getElementById('arrivingFrom').value,
        pickMeAfter:         document.getElementById('pickMeAfter').value,
        dropoffAddress:      document.getElementById('dropoffAddress').value,
        doorNo:              document.getElementById('doorNo').value,
        passengerName:       document.getElementById('airportPassengerName').value,
        email:               document.getElementById('airportEmail').value,
        phoneNumber:         document.getElementById('airportContact').value,
        vehicleType:         document.getElementById('airportVehicle').value,
        passengerCount:      document.getElementById('airportPassengers').value,
        smallLuggage:        document.getElementById('airportSmallLuggage').value,
        largeLuggage:        document.getElementById('airportLargeLuggage').value,
        pickupDate:          document.getElementById('pickupDate')?.value,
        pickupTime:          document.getElementById('pickupTime')?.value,
        specialInstructions: document.getElementById('specialInstructions').value
      };
    } else if (serviceTypeValue === "Airport Transfer/Drop off") {
      data = {
        ...data,
        airportName:    document.getElementById('dropoffAirport').value,
        terminal:       document.getElementById('dropoffTerminal').value,
        pickupTime:     document.getElementById('dropoffPickupTime').value,
        pickupAddress:  document.getElementById('dropoffPickupAddress').value,
        doorNo:         document.getElementById('dropoffDoorNo').value,
        passengerName:  document.getElementById('dropoffPassengerName').value,
        email:          document.getElementById('dropoffEmail').value,
        phoneNumber:    document.getElementById('dropoffContact').value,
        vehicleType:    document.getElementById('dropoffVehicle').value,
        passengerCount: document.getElementById('dropoffPassengers').value,
        smallLuggage:   document.getElementById('dropoffSmallLuggage').value,
        largeLuggage:   document.getElementById('dropoffLargeLuggage').value
      };
    } else {
      data = {
        ...data,
        fullName:            document.getElementById('fullName').value,
        phoneNumber:         document.getElementById('phoneNumber').value,
        email:               document.getElementById('email').value,
        pickupLocation:      document.getElementById('pickupLocation')?.value.trim() || '',
        destination:         document.getElementById('destination')?.value.trim() || '',
        pickupDate:          document.getElementById('pickupDate').value,
        pickupTime:          document.getElementById('pickupTime').value,
        passengerCount:      document.getElementById('passengerCount').value,
        luggageCount:        document.getElementById('luggageCount').value,
        vehicleType:         document.getElementById('vehicleType').value,
        specialInstructions: document.getElementById('specialInstructions').value,
        needReturnJourney:   document.getElementById('needReturnJourney').checked ? 'Yes' : 'No'
      };
    }

    try {
      await emailjs.send('service_i2n9bqa', 'template_kfub3tp', data);
      window.location.href = 'thank-you.html';
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Oops...', text: `Error submitting booking: ${error.message}` });
    }

    submitBtn.disabled  = false;
    submitBtn.innerText = 'Submit';
  });

  // Run once on page load
  updateFieldVisibility();

  // ── Newsletter Subscription ──
  const subscribeForm = document.getElementById('subscribe-form');
  if (subscribeForm) {
    subscribeForm.addEventListener('submit', function (event) {
      event.preventDefault();
      emailjs.sendForm('service_i2n9bqa', 'template_lqrwjza', subscribeForm)
        .then(() => {
          Swal.fire({ icon: 'success', title: 'Subscribed!', text: 'Thank you for subscribing to our newsletter.' });
          subscribeForm.reset();
        }, (error) => {
          Swal.fire({ icon: 'error', title: 'Subscription Failed', text: `Error: ${error.message}` });
          subscribeForm.reset();
        });
    });
  }
});