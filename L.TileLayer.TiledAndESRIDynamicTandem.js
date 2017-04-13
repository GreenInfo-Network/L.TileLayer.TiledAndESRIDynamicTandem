L.TileLayer.TiledAndESRIDynamicTandem = L.Class.extend({
    includes: L.Mixin.Events,
    options: {
        detailZoomLevel: 14,
        opacity: 1.0,
    },
    initialize: function (tileurl, dynamicurl, options) {
        options = L.setOptions(this, options);

        // create our tile layer and our dynamic layer
        // all options are passed as-given to the TileLayer
        // DynamicMapLayer only gets a few
        this.tile_layer = L.tileLayer(tileurl, options);
        this.dynamic_layer = L.esri.dynamicMapLayer(L.extend({ url: dynamicurl }, options));
    },
    onAdd: function (map) {
        // added to map: set whichever of our sublayers should be visible right now, then start listening for zoom changes
        this._map = map;
        this.dealWithZoomLevelChange();
        this._map.on('zoomend', this.dealWithZoomLevelChange, this);
    },
    onRemove: function (map) {
        // removed from map: stop watching the zoom-change, remove our layers from the map
        this._map.off('zoomend', this.dealWithZoomLevelChange, this);
        if (this._map.hasLayer(this.dynamic_layer)) this._map.removeLayer(this.dynamic_layer);
        if (this._map.hasLayer(this.tile_layer)) this._map.removeLayer(this.tile_layer);
        this._map = undefined;
    },
    dealWithZoomLevelChange: function () {
        if (this._map.getZoom() >= this.options.detailZoomLevel) {
            if (this._map.hasLayer(this.tile_layer)) this._map.removeLayer(this.tile_layer);
            if (! this._map.hasLayer(this.dynamic_layer)) this._map.addLayer(this.dynamic_layer);

            try {
                this.dynamic_layer.setOpacity(this.options.opacity);
            } catch (e) {}
        }
        else {
            if (! this._map.hasLayer(this.tile_layer)) this._map.addLayer(this.tile_layer);
            if (this._map.hasLayer(this.dynamic_layer)) this._map.removeLayer(this.dynamic_layer);

            this.tile_layer.setOpacity(this.options.opacity);
        }
    },
    setOpacity: function (newopacity) {
        this.options.opacity = newopacity;

        // don't just call setOpacity() cuz dynamic one can only setOpacity() if it's in the map right now
        // pretend we need an update, toggling the appropriate layer and setting opacity as needed
        if (this._map) this.dealWithZoomLevelChange();
    },
});
L.tiledAndESRIDynamicTandem = function (tileurl, dynamicurl, options) {
    return new L.TileLayer.TiledAndESRIDynamicTandem(tileurl, dynamicurl, options);
};
