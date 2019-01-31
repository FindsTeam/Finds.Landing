// General data handlers
function getMarkersSuccess(map, iconPath, getLayout) {
    return function (markers) {
      const icon = L.icon({
        iconUrl: iconPath,
        iconSize: [25, 37],
      });

      const wrappedMarkers = [];

      for (let i = 0; i < markers.length; i++) {
        if (markers[i].location) {
          const marker = L
          .marker(
            markers[i].location,
            { icon: icon }
          )
          .bindPopup(getLayout(markers[i]));

          wrappedMarkers.push(marker);
        }
      }

      const layer = L.layerGroup(wrappedMarkers)
      layer.addTo(map);

      return layer;
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
     return fetch(`${api}/toilets`, {})
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
    return fetch(`${api}/wifis`, {})
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
