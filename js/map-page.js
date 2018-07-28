document.addEventListener('DOMContentLoaded', function () {
  var elem = document.querySelector('.sidenav');
  var sidenav = M.Sidenav.init(elem, {});

  var cancelFeedbackButton = document.getElementById('feedback')
    .querySelector('.cancel');

  cancelFeedbackButton.addEventListener('click', function (e) {
    e.preventDefault();

    var sidenav = M.Sidenav.getInstance(elem);
    sidenav.close();
  });

  var chips = document.querySelectorAll('.chips');
  M.Chips.init(chips, {
    placeholder: 'WI-FI',
  });
});