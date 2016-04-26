/* global $, L, document, JSONEditor */

// http://enable-cors.org/
// https://stackoverflow.com/questions/11281895/jquery-ajax-and-getjson-requests-hitting-access-control-allow-origin-issues
// https://github.com/jdorn/json-editor
// https://github.com/leaflet-extras/leaflet-providers

$(document).ready(init0);

function init0() {
    $.getJSON('config.json', init);
}

var G = {};

function init(config) {
    G.editor = new JSONEditor($('#config')[0], config);
    G.theMap = L.map('themap').setView([23.5, 120.5], 7);
    G.baseLayer = L.tileLayer.provider('OpenStreetMap.Mapnik').addTo(G.theMap);

    G.editor.watch('root.sources',function() {
	console.log('sources changed');
    });

    // $.getJSON('data/ex1.geojson', addGeojsonLayer);
    var src = G.editor.getValue().sources;
    src.forEach(function (s) {
        $.getJSON(s.url, addGeojsonLayer);
    });
}

function addGeojsonLayer(data) {
    G.gjLayer = L.geoJson().addTo(G.theMap);
    G.gjLayer.addData(data);
}

