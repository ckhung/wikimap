$(document).ready(init);

var G = {};

function init() {
    var data;
    G.theMap = L.map('themap').setView([23.5, 120.5], 7);
    G.baseLayer = L.tileLayer.provider('OpenStreetMap.Mapnik').addTo(G.theMap);
    G.gjLayer = L.geoJson().addTo(G.theMap);

    $.getJSON('ex1.geojson', addGeojsonLayer);
    // $.get('ex1.geojson').done(addGeojsonLayer);
}

function addGeojsonLayer(data) {
    console.log(data);
    G.gjLayer.addData(data);
}

