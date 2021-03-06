# L.TileLayer.TiledAndESRIDynamicTandem

A layer which switches between a tile layer and a ESRI DynamicMapLayer at a given zoom level.

[See the demo here](https://greeninfo-network.github.io/L.TileLayer.TiledAndESRIDynamicTandem/)

The intended use case is that
* An ArcGIS service was tiled down to a specific level, but tiling deeper would consume too much disk space.
* The dynamic service goes to deeper levels, but is not fast enough for use at larger scales.


## Quick-start example

```
<!-- Leaflet 0.7 and ESRI-Leaflet adapter for 0.7 -->
<link rel="stylesheet" href="https://unpkg.com/leaflet@0.7.7/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet@0.7.7/dist/leaflet.js"></script>
<script type="text/javascript" src="https://unpkg.com/esri-leaflet@1.0.4"></script>
<script src="L.TileLayer.TiledAndESRIDynamicTandem.js"></script>
```

```
var switcher = L.tiledAndESRIDynamicTandem(
    // two URLs: tile service and dynamic service
    "https://gis1.usgs.gov/arcgis/rest/services/PADUS1_4/Fine_Agency_Level/MapServer/tile/{z}/{y}/{x}",
    "https://gis1.usgs.gov/arcgis/rest/services/PADUS1_4/Fine_Agency_Level_ZoomLevel13_20/MapServer",
    // options are passed to both layers, some are applicable to the tandem itself
    {
        opacity: 0.5,
        attribution: '<a target="_blank" href="https://gapanalysis.usgs.gov/padus/">Protected Areas Database of the United States (PAD-US)</a>',
        detailZoomLevel: 14  // level 14+ use dynamic, <=13 use tiled
    }
);
MAP.addLayer(switcher);
```

## Details and Options

* First parameter is an URL template for the tile service.
* Second parameter is the URL of the ArcGIS DynamicMapService. (This may or may not be similar to that of the tile service.)
* Third is a dictionary of options.
	* Options are passed as-given to both of the layers.
	* Options affecting the tandem behavior are as follows.
	    * *detailZoomLevel* -- At this zoom level and higher/closer the dynamic service will be used. At levels further out, the tile service will be used.

## Bugs, Features, Leaflet 1.0

This was designed to meet a specific need, so may not suit your specific use case without some further modifications.

This class will not work with Leaflet 1.x This was designed for ESRI-Leaflet adapter 1.x for Leaflet 0.7, whereas ESRI-Leaflet for 1.0 is a 2.x version with a different API. There are no immediate plans to create a Leaflet 1.x version, but if you're interested feel free to contact us.
