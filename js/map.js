function initMap() {
  var containerId = 'map'
  var location = [53.9017, 27.5429];
  var zoom = 12;
  var osmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  var osmAttributes = 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';

  var map = L
    .map(containerId, {
      minZoom: 10,
    })
    .setView(location, zoom);
  L.tileLayer(osmUrl, {
    attribution: osmAttributes,
  }).addTo(map);

  getWifi(
    getMarkersSuccess(map, 'image/wifi.png', getWifiPopupLayoutAsString),
    getMarkersError
  );

  getToilets(
    getMarkersSuccess(map, 'image/toilet.png', getToiletPopupLayoutAsString),
    getMarkersError
  );
}

// General data handlers
function getMarkersSuccess(map, iconPath, getLayout) {
  return function (wifis) {
    const icon = L.icon({
      iconUrl: iconPath,
      iconSize: [23, 37],
    });

    for (let i = 0; i < wifis.length; i++) {
      if (wifis[i].location) {
        const marker = L.marker(
          wifis[i].location,
          { icon: icon }).addTo(map);

        marker.bindPopup(getLayout(wifis[i]));
      }
    }
  }
}
function getMarkersError(err) {
  M.toast({
    html: 'Ошибка загрузки данных',
    displayLength: 1800,
    classes: 'red lighten-1',
  });
}

// toilets markers request
function getToilets(resolve, reject) {
  fetch(`${api}/toilets`, {})
    .then(res => {
      if (res.status !== 200) {
        throw new Error("Ошибка запроса");
      }

      return res.json();
    })
    .then(toilets => resolve(toilets))
    .catch(err => {
      console.error(err);
      reject(err);
    });
}
function getToiletPopupLayoutAsString(toilet) {
  return `
  <div class="freebee-popup-content">
    <span class="freebee-title">${toilet.title}</span>
    <br><br>
    <span class="freebee-point">Адрес: </span>
    <span class="freebee-address"> ${toilet.address}</span>
    <br><br>
    <span class="freebee-point">Описание: </span>
    <span class="freebee-description"> ${toilet.description || 'Отсутствует'}</span>
  </div>
  `
}

// wifis markers request
function getWifi(resolve, reject) {
  fetch(`${api}/wifis`, {})
    .then(res => {
      if (res.status !== 200) {
        throw new Error("Ошибка запроса");
      }

      return res.json();
    })
    .then(wifi => resolve(wifi))
    .catch(err => {
      console.error(err)
      reject(err);
    });
}
function getWifiPopupLayoutAsString(wifi) {
  return `
  <div class="freebee-popup-content">
    <span class="freebee-point">Название: </span>
    <span class="freebee-title">${wifi.title}</span>
    <br><br>
    <span class="freebee-point">Адрес: </span>
    <span class="freebee-address"> ${wifi.address}</span>
    <br><br>
    <span class="freebee-point">Описание: </span>
    <span class="freebee-description"> ${wifi.description}</span>
  </div>
  `
}
