function initMap() {
  var containerId = 'map'
  var location = [53.877883, 27.481955];
  var zoom = 12;
  var osmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  var osmAttributes = 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';

  var map = L.map(containerId).setView(location, zoom);
  L.tileLayer(osmUrl, {
    attribution: osmAttributes,
    maxZoom: 18,
  }).addTo(map);
}

