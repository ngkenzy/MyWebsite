(function () {
  function updateCountdown(badge) {
    var targetDate = new Date(badge.getAttribute('data-retirement-date'));
    var dayEl = badge.querySelector('[data-countdown-days]');
    var hourEl = badge.querySelector('[data-countdown-hours]');
    var minuteEl = badge.querySelector('[data-countdown-minutes]');
    var secondEl = badge.querySelector('[data-countdown-seconds]');

    if (!dayEl || !hourEl || !minuteEl || !secondEl || Number.isNaN(targetDate.getTime())) {
      return;
    }

    var now = new Date();
    var diff = Math.max(0, targetDate.getTime() - now.getTime());
    var totalSeconds = Math.floor(diff / 1000);
    var days = Math.floor(totalSeconds / 86400);
    var hours = Math.floor((totalSeconds % 86400) / 3600);
    var minutes = Math.floor((totalSeconds % 3600) / 60);
    var seconds = totalSeconds % 60;

    if (diff === 0) {
      badge.classList.add('is-complete');
      dayEl.textContent = 'Retired';
      hourEl.parentElement.style.display = 'none';
      minuteEl.parentElement.style.display = 'none';
      secondEl.parentElement.style.display = 'none';
      return;
    }

    dayEl.textContent = days.toLocaleString();
    hourEl.textContent = String(hours).padStart(2, '0');
    minuteEl.textContent = String(minutes).padStart(2, '0');
    secondEl.textContent = String(seconds).padStart(2, '0');
  }

  document.addEventListener('DOMContentLoaded', function () {
    var badges = document.querySelectorAll('.retirement-countdown');

    badges.forEach(function (badge) {
      updateCountdown(badge);
      setInterval(function () {
        updateCountdown(badge);
      }, 1000);
    });
  });
}());
