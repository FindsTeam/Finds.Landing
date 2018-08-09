const api = 'https://freebee-api.herokuapp.com/api';

document.addEventListener('DOMContentLoaded', function () {
  const elem = document.querySelector('.sidenav');
  const sidenav = M.Sidenav.init(elem, {});

  const cancelFeedbackButton = document.getElementById('feedback')
    .querySelector('.cancel');
  const sendFeedbackButton = document.getElementById('feedback')
    .querySelector('.submit');

  cancelFeedbackButton.addEventListener('click', function (e) {
    e.preventDefault();

    const sidenav = M.Sidenav.getInstance(elem);
    sidenav.close();
  });

  sendFeedbackButton.addEventListener('click', function (e) {
    e.preventDefault();

    const sidenavElement = document.querySelector('.sidenav');
    const sidenav = M.Sidenav.getInstance(sidenavElement);

    const feedback = createFeedbackObject();

    fetch(`${api}/feedback`, {
      method: 'POST',
      body: JSON.stringify(feedback),
      headers: {
        "Content-type": "application/json",
      }
    })
    .then(res => {
      if (res.status !== 201) {
        throw new Error(res.statusText);
      }

      return res.json();
    })
    .then(data => {
      sidenav.close();
      M.toast({
        html: "Отправлено!",
        displayLength: 2500,
        classes: 'green',
      });
    })
    .catch(err => {
      console.error('creation failed');
      console.error(err);
      sidenav.close();
      M.toast({
        html: "Что-то пошло не так",
        displayLength: 2000,
        classes: 'red lighten-1',
      });
    })
  });
});

function createFeedbackObject() {
  const address = document.getElementById('feedback_address')
    .value;
  const author = document.getElementById('feedback_author')
    .value;
  const description = document.getElementById('feedback_description')
    .value;
  const type = document.getElementById('feedback_type')
    .value;

  return { address, author, description, type };
}
