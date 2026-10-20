/* IT Wala Dai — small page scripts (countdown + contact form) */
(function () {
  'use strict';

  // ---- Community countdown
  document.querySelectorAll('[data-countdown]').forEach(function (el) {
    var target = new Date(el.getAttribute('data-countdown')).getTime();
    var nums = {};
    el.querySelectorAll('[data-cd]').forEach(function (n) { nums[n.getAttribute('data-cd')] = n; });
    var done = el.parentNode.querySelector('.itwd-cd__done');
    var pad = function (v) { return String(v).padStart(2, '0'); };
    var timer;

    function tick() {
      var diff = Math.max(0, target - Date.now());
      var s = Math.floor(diff / 1000);
      nums.days.textContent = pad(Math.floor(s / 86400));
      nums.hours.textContent = pad(Math.floor((s % 86400) / 3600));
      nums.minutes.textContent = pad(Math.floor((s % 3600) / 60));
      nums.seconds.textContent = pad(s % 60);
      if (diff === 0) {
        clearInterval(timer);
        if (done) done.hidden = false;
      }
    }
    tick();
    timer = setInterval(tick, 1000);
  });

  // ---- Contact form: no backend on a static site, so open the user's mail app with the message filled in
  document.querySelectorAll('form.itwd-contact-form').forEach(function (form) {
    var status = form.querySelector('.itwd-form-status');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.elements['your-name'].value.trim();
      var email = form.elements['your-email'].value.trim();
      var msg = form.elements['your-message'].value.trim();
      if (!name || !email || !msg || !form.elements['your-email'].checkValidity()) {
        status.textContent = 'Name, sahi email aur message — teeno bharo please.';
        status.classList.add('is-error');
        return;
      }
      status.classList.remove('is-error');
      var subject = 'IT Wala Dai — message from ' + name;
      var body = msg + '\n\n— ' + name + ' (' + email + ')';
      window.location.href = 'mailto:' + form.getAttribute('data-mailto') +
        '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      status.textContent = 'Shukriya! Tumhara mail app khul raha hai — wahan se send kar do. Reply 24 ghante mein.';
      form.reset();
    });
  });
})();
