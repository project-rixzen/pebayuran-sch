var sekolah = new L.LayerGroup();
var jalan = new L.LayerGroup();
var kecamatan = new L.LayerGroup();
var bekasi = new L.LayerGroup();
var sungai = new L.LayerGroup();

var map = L.map('map', {
    center: [-6.2100, 107.2500],
    zoom: 13,
    zoomControl: false,
    layers: [sekolah, kecamatan]
});

var GoogleMaps = new L.TileLayer('https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    opacity: 1.0,
    attribution: 'Google Maps'
}).addTo(map);

var GoogleSatelliteHybrid = L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
    maxZoom: 22,
    attribution: 'Google Satellite'
});

var OpenStreetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19
});

var GoogleRoads = new L.TileLayer('https://mt1.google.com/vt/lyrs=h&x={x}&y={y}&z={z}', {
    opacity: 1.0,
    attribution: 'Google Roads'
});

var baseLayers = {
    'Google Satellite Hybrid': GoogleSatelliteHybrid,
    'OpenStreetMap': OpenStreetMap,
    'Google Maps': GoogleMaps,
    'Google Roads': GoogleRoads
};

var groupedOverlays = {
    "Peta Dasar": {
        'Sekolah': sekolah,
        'Kecamatan Pebayuran': kecamatan,
        'Kab. Bekasi': bekasi,
        'Jalan Kab. Bekasi': jalan,
        'Sungai Kab. Bekasi': sungai,
    }
};

// L.control.layers(baseLayers, overlayLayers, {collapsed: true}).addTo(map);
L.control.groupedLayers(baseLayers, groupedOverlays, {collapsed: true}).addTo(map);

/* 
GEOJSON LAYER 
*/
var baseUrl = window.location.origin;
console.log(baseUrl);

$.getJSON(baseUrl + '/src/assets/gis/geojson/sekolah_pebayuran.geojson', function (data) {
    var ratIcon = L.icon({
        iconUrl: '/src/assets/gis/marker.png',
        iconSize: [24, 24]
    });
    L.geoJson(data, {
        pointToLayer: function (feature, latlng) {
            var marker = L.marker(latlng, { icon: ratIcon });
            // Menggabungkan name dan address dalam bindPopup
            marker.bindPopup('<b>' + feature.properties.name + '</b><br>' + feature.properties.alamat);
            return marker;
        }
    }).addTo(sekolah);
});

$.getJSON(baseUrl +'/src/assets/gis/geojson/jalan_kab_bekasi.geojson', function (data) {
    L.geoJson(data, {
        style: function (feature) {
            var color,
                kode = feature.properties.kode;
            if (kode < 2) color = "#707070";
            else if (kode > 0) color = "#707070";
            else color = "#707070"; // no data
            return { color: color, weight: 1, fillOpacity: 0.8 };
        },
        onEachFeature: function (feature, layer) {
            layer.bindPopup("Informasi yang ingin ditampilkan");
        }
    }).addTo(jalan); 
});

$.getJSON(baseUrl +'/src/assets/gis/geojson/sungai_kab_bekasi.geojson', function (data) {
    L.geoJson(data, {
        style: function (feature) {
            var color,
                kode = feature.properties.kode;
            if (kode < 2) color = "#0000FF";
            else if (kode > 0) color = "#0000FF";
            else color = "#0000FF"; // no data
            return { color: color, weight: 1, fillOpacity: 0.8 };
        },
        onEachFeature: function (feature, layer) {
            layer.bindPopup("Informasi yang ingin ditampilkan");
        }
    }).addTo(sungai); 
});


$.getJSON(baseUrl + '/src/assets/gis/geojson/kecamatan_pebayuran.geojson', function (kode) {
    L.geoJson(kode, {
        style: function (feature) {
            return { 
                color: "#FFBF00", 
                weight: 3, 
                fillOpacity: 0.3
            };
        }
    }).addTo(kecamatan);
});

$.getJSON(baseUrl + '/src/assets/gis/geojson/desa_kab_bekasi.geojson', function (kode) {
    L.geoJson(kode, {
        style: function (feature) {
            return { 
                color: "#33FF57",    
                weight: 3, 
                fillOpacity: 0.5    
            };
        }
    }).addTo(bekasi);
});



