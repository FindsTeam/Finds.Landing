const api = 'https://freebee-api.herokuapp.com/api';

document.addEventListener('DOMContentLoaded', function () {
  const map = initMap();
  const activeFilterClasses = ["amber", " accent-3"];

  const data = {
    layers: {},
  };

  const wifiLayerPromise = getWifi(
    getMarkersSuccess(map, 'image/wifi.png', getWifiPopupLayoutAsString),
    getMarkersError
  );
  wifiLayerPromise.then(layer => {
    data.layers.wifis = layer;
  });

  const toiletsLayerPromise = getToilets(
    getMarkersSuccess(map, 'image/toilet.png', getToiletPopupLayoutAsString),
    getMarkersError
  );
  toiletsLayerPromise.then(layer => {
    data.layers.toilets = layer;
  });

  const elem = document.querySelector('.sidenav');
  const sidenav = M.Sidenav.init(elem, {});
  const instancesFloatingButtons = M.FloatingActionButton.init(
    document.querySelectorAll('.fixed-action-btn'),
      {
        hoverEnabled: false,
        direction: 'bottom'
    }
  );

  const filterByWifiButton = document.getElementById('filter-by-wifis');
  const filterByToiletsButton = document.getElementById('filter-by-toilets');
  const filterClearButton = document.getElementById('filter-clear');
  const cancelFeedbackButton = document.getElementById('feedback')
    .querySelector('.cancel');
  const sendFeedbackButton = document.getElementById('feedback')
    .querySelector('.submit');

  filterByWifiButton.addEventListener('click', function(e) {
    e.preventDefault();

    changeActiveFilter(e.target);

    showAllLayers(map, data.layers);
    const layersToHide = getLayersToHide(['wifis'], data.layers)

    hideLayers(map, layersToHide);
  });
  filterByToiletsButton.addEventListener('click', function(e) {
    e.preventDefault();

    changeActiveFilter(e.target);

    showAllLayers(map, data.layers);
    const layersToHide = getLayersToHide(['toilets'], data.layers)

    hideLayers(map, layersToHide);
  });
  filterClearButton.addEventListener('click', function(e) {
    e.preventDefault();

    e.target.setAttribute('src', './image/default-filter.png');
    e.target.classList.add('active-filter');
    const activeFilter = document.querySelector(".freebee-filter ul li .active-filter");
    activeFilter.classList.remove('active-filter');

    showAllLayers(map, data.layers);
  });
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

    sendFeedback(
      feedback,
      sendFeedbackSuccess(sidenav),
      sendFeedbackError(sidenav),
    );
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

function getLayersToHide(showLayersNames = [], allLayers = {}) {
  return Object
    .keys(allLayers)
    .filter(layer => !showLayersNames.includes(layer))
    .map(layer => allLayers[layer]);
}

function hideLayers(map, layers) {
  layers.forEach(layer => map.removeLayer(layer));
}

function showAllLayers(map, layers = {}) {
  Object.keys(layers)
    .forEach(layerKey => map.addLayer(layers[layerKey]));
}

function sendFeedback(feedback, resolve, reject) {
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
    resolve();
  })
  .catch(err => {
    console.error('creation failed');
    console.error(err);

    reject();
  })
}

function sendFeedbackSuccess(sidenav) {
  return function () {
    sidenav.close();
    M.toast({
      html: "Отправлено!",
      displayLength: 2500,
      classes: 'green',
    });
  }
}

function sendFeedbackError(sidenav) {
  return function () {
    sidenav.close();
    M.toast({
      html: "Что-то пошло не так",
      displayLength: 2000,
      classes: 'red lighten-1',
    });
  }
}

function changeActiveFilter(clickedElement) {
  const activeFilter = document.querySelector(".freebee-filter ul li .active-filter");
    if (activeFilter.classList.contains('default-filter')) {
      activeFilter.setAttribute('src', './image/default-filter-inactive.png');
    } else {
      activeFilter.classList.remove('active-filter');
    }
    clickedElement.classList.add('active-filter');
}
