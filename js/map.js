function initMap() {
  var containerId = 'map'
  var location = [53.9017, 27.5429];
  var zoom = 12;
  var osmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  var osmAttributes = 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';

  var map = L.map(containerId, {
      minZoom: 10,
      zoomControl: false,
    })
    .setView(location, zoom);

  L.tileLayer(osmUrl, {
    attribution: osmAttributes,
  }).addTo(map);

  return map;
}
