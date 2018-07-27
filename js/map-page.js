document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.sidenav');
  var sidenav = M.Sidenav.init(elems, {});

  elems = document.querySelectorAll('.chips');
  M.Chips.init(elems, {
    placeholder: 'WI-FI',
  });
});
