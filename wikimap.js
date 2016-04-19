$(document).ready(init);

var G = {};

function init() {
    var data;
    G.theMap = L.map('themap').setView([23.5, 120.5], 7);
    G.baseLayer = L.tileLayer.provider('OpenStreetMap.Mapnik').addTo(G.theMap);
    G.gjLayer = L.geoJson().addTo(G.theMap);

    // $.getJSON('ex1.geojson', addGeojsonLayer);
    $.getJSON('http://v.im.cyut.edu.tw/~ckhung/m/14/osmand/favourites.geojson', addGeojsonLayer);
    // http://enable-cors.org/
    // https://stackoverflow.com/questions/11281895/jquery-ajax-and-getjson-requests-hitting-access-control-allow-origin-issues
}

function addGeojsonLayer(data) {
    console.log(data);
    G.gjLayer.addData(data);
}

