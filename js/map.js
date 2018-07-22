function initMap() {
  var containerId = 'map'
  var location = [53.9017, 27.5429];
  var zoom = 12;
  var osmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  var osmAttributes = 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';

  var map = L.map(containerId).setView(location, zoom);
  L.tileLayer(osmUrl, {
    attribution: osmAttributes,
  }).addTo(map);

  var wifiIcon = L.icon({
    iconUrl: 'image/wifi.png',
    iconSize: [23, 37],
  })

  var wifi = JSON.parse(wifiData);
  for (var i = 0; i < wifi.length; i++) {
    if (wifi[i].location) {
      var marker = L.marker(
        wifi[i].location.reverse(),
        { icon: wifiIcon }).addTo(map);

      marker.bindPopup(
        `<h3 class="freebie-title">Wifi</h3>
        ${wifi[i].address}`
      );
    }
  }
}
