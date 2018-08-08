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

  getWifi(getWifiSuccess(map), getWifiError);
}

function getWifi(resolve, reject) {
  fetch(`${api}/wifis`, {})
    .then(res => {
      if (res.status !== 200) {
        throw new Error("Ошибка запроса");
      }

      return res.json();
    })
    .then(wifi => {
      resolve(wifi);
    })
    .catch(err => {
      console.error(err)
      reject(err);
    });
}

function getWifiSuccess(map) {
  return function (wifis) {
    const wifiIcon = L.icon({
      iconUrl: 'image/wifi.png',
      iconSize: [23, 37],
    });

    for (let i = 0; i < wifis.length; i++) {
      if (wifis[i].location) {
        const marker = L.marker(
          wifis[i].location,
          { icon: wifiIcon }).addTo(map);

        marker.bindPopup(
          `
          <div class="freebee-popup-content">
            <span class="freebee-point">Название: </span>
            <span class="freebee-title">${wifis[i].title}</span>
            <br><br>
            <span class="freebee-point">Адрес: </span>
            <span class="freebee-address"> ${wifis[i].address}</span>
            <br><br>
            <span class="freebee-point">Описание: </span>
            <span class="freebee-description"> ${wifis[i].description}</span>
          </div>
          `
        );
      }
    }
  }
}

function getWifiError(err) {
  M.toast({
    html: 'Ошибка при получении данных',
    displayLength: 1800,
    classes: 'red lighten-1',
  });
}
