/* global $, L, document, JSONEditor */

$(document).ready(init);

var G = {};

function init() {
    var data;
    G.theMap = L.map('themap').setView([23.5, 120.5], 7);
    G.baseLayer = L.tileLayer.provider('OpenStreetMap.Mapnik').addTo(G.theMap);
    G.gjLayer = L.geoJson().addTo(G.theMap);

    G.editor = new JSONEditor($('#config')[0], {
        'theme': 'jqueryui',
        'startval': {
            'title': 'Taichung OSM mapping party 2016',
            'sources': [
                {
                    'format': 'geojson',
                    'url': 'http://v.im.cyut.edu.tw/~ckhung/m/14/osmand/favourites.geojson'
                }
            ]
        },
        'schema': {
            'type': 'object',
            'title': 'configuration',
            'properties': {
                'title': {
                    'type': 'string'
                },
                'sources': {
                    'type': 'array',
                    'format': 'table',
                    'items': {
                        'type': 'object',
                        'properties': {
                            'format': {
                                'type': 'string',
                                'enum': ['geojson', 'csv', 'dokuwiki']
                            },
                            'url': {
                                'type': 'string',
                                'format': 'url'
                            }
                        }
                    }
                }
            }
        }
    });

    // $.getJSON('data/ex1.geojson', addGeojsonLayer);
    var src = G.editor.getValue().sources;
    src.forEach(function (s) {
        $.getJSON(s.url, addGeojsonLayer);
    });
    // http://enable-cors.org/
    // https://stackoverflow.com/questions/11281895/jquery-ajax-and-getjson-requests-hitting-access-control-allow-origin-issues
}

function addGeojsonLayer(data) {
    G.gjLayer.addData(data);
}

