document.addEventListener("DOMContentLoaded", () => {
  const formNotification = document.getElementById("form-notification");
  const notificationMessage = document.getElementById("notification-message");
  const heroButton = document.querySelector(".btn-hero");
  const timelineButton = document.querySelector("#timeline .btn-primary");

  const countdownTimer = document.getElementById("countdown-timer");
  const timerMessage = document.getElementById("timer-message");
  const daysSpan = document.getElementById("days");
  const hoursSpan = document.getElementById("hours");
  const minutesSpan = document.getElementById("minutes");
  const secondsSpan = document.getElementById("seconds");

  const allFormLinks = [heroButton, timelineButton];
  const activeFormLinks = allFormLinks.filter((link) => link !== null);

  const openHour = 6; // 6 AM
  const closeHour = 18; // 6 PM

  function updateFormStatusAndCountdown() {
    const now = new Date();
    // Adjust 'now' to Asia/Jakarta timezone for consistent calculations
    const jakartaOffset = 7 * 60; // WIB is UTC+7, in minutes
    const utc = now.getTime() + now.getTimezoneOffset() * 60000; // Convert to UTC
    const nowInJakarta = new Date(utc + jakartaOffset * 60000); // Add Jakarta offset

    const currentHour = nowInJakarta.getHours();
    const currentMinute = nowInJakarta.getMinutes();
    const currentSecond = nowInJakarta.getSeconds();

    let isOpen = false;
    let message = "";
    let timerText = "";
    let targetTime;

    const openTimeFormatted = `${openHour.toString().padStart(2, "0")}:00 WIB`;
    const closeTimeFormatted = `${closeHour
      .toString()
      .padStart(2, "0")}:00 WIB`;

    const currentTimeFormatted = nowInJakarta.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "Asia/Jakarta",
    });

    if (currentHour >= openHour && currentHour < closeHour) {
      // Form is currently open
      isOpen = true;
      message = `Saat ini pukul ${currentTimeFormatted}. Formulir pendaftaran online sedang dibuka setiap pukul ${openTimeFormatted} hingga ${closeTimeFormatted}.`;
      timerText = "Formulir akan ditutup dalam:";

      targetTime = new Date(
        nowInJakarta.getFullYear(),
        nowInJakarta.getMonth(),
        nowInJakarta.getDate(),
        closeHour,
        0,
        0,
        0
      ); // Countdown to 6 PM today in Jakarta time
    } else if (currentHour < openHour) {
      // Form will open later today
      message = `Saat ini pukul ${currentTimeFormatted}. Formulir pendaftaran online akan dibuka pada pukul ${openTimeFormatted}.`;
      timerText = "Formulir akan dibuka dalam:";

      targetTime = new Date(
        nowInJakarta.getFullYear(),
        nowInJakarta.getMonth(),
        nowInJakarta.getDate(),
        openHour,
        0,
        0,
        0
      ); // Countdown to 6 AM today in Jakarta time
    } else {
      // Form is closed, will open tomorrow
      message = `Saat ini pukul ${currentTimeFormatted}. Formulir pendaftaran online telah ditutup pada pukul ${closeTimeFormatted} dan akan dibuka kembali besok pukul ${openTimeFormatted}.`;
      timerText = `Formulir akan dibuka lagi besok pukul ${openTimeFormatted} dalam:`;

      const tomorrow = new Date(nowInJakarta);
      tomorrow.setDate(nowInJakarta.getDate() + 1);
      targetTime = new Date(
        tomorrow.getFullYear(),
        tomorrow.getMonth(),
        tomorrow.getDate(),
        openHour,
        0,
        0,
        0
      ); // Countdown to 6 AM tomorrow in Jakarta time
    }

    const distance = targetTime.getTime() - nowInJakarta.getTime();

    // Always show notification and countdown
    formNotification.classList.remove("d-none");
    notificationMessage.textContent = message;
    countdownTimer.classList.remove("d-none");
    timerMessage.textContent = timerText;

    if (isOpen) {
      activeFormLinks.forEach((link) => {
        link.classList.remove("disabled");
        link.style.pointerEvents = "auto";
        link.setAttribute("href", "https://oprec.ptraazxtt.my.id/register");
      });
    } else {
      activeFormLinks.forEach((link) => {
        link.classList.add("disabled");
        link.style.pointerEvents = "none";
        link.removeAttribute("href");
      });
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysSpan.textContent = String(days).padStart(2, "0");
    hoursSpan.textContent = String(hours).padStart(2, "0");
    minutesSpan.textContent = String(minutes).padStart(2, "0");
    secondsSpan.textContent = String(seconds).padStart(2, "0");
  }

  // Initial update
  updateFormStatusAndCountdown();

  // Update every second
  setInterval(updateFormStatusAndCountdown, 1000);
});
