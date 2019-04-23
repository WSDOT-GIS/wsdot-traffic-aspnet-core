import EsriMap from "esri/Map";
import MapView from "esri/views/MapView";
import Extent from "esri/geometry/Extent";
import GeoJSONLayer from "esri/layers/GeoJSONLayer";
import SimpleRenderer from "esri/renderers/SimpleRenderer";
import PictureMarkerSymbol from "esri/symbols/PictureMarkerSymbol";
import Expand from "esri/widgets/Expand";
import LayerList from "esri/widgets/LayerList";

const cameraMarker = new PictureMarkerSymbol({
    url: "images/camera.svg"
});

const renderer = new SimpleRenderer({
    symbol: cameraMarker
});


const camerasLayer = new GeoJSONLayer({
    url: "api/traffic/cameras.geojson",
    geometryType: "point",
    title: "{Title}",
    fields: [
        { name: "CameraOwner", type: "string" },
		{ name: "Description", type: "string" },
		{ name: "ImageHeight", type: "integer" },
		{ name: "ImageWidth", type: "integer" },
        { name: "ImageUrl", type: "string" },
		{ name: "OwnerUrl", type: "string" },
		{ name: "Region", type: "string" },
		{ name: "Title", type: "string" },
    ],
    renderer,
    popupEnabled: true
});

const map = new EsriMap({
    basemap: "streets-vector",
    layers: [
        camerasLayer
    ]
});

/**
 * Extent of WA.
 * @see https://epsg.io/1416-area
 */
const extent = new Extent({
  xmin: -124.79,
  ymin: 45.54,
  xmax: -116.91,
  ymax: 49.05
});

const view = new MapView({
    map,
    container: "viewDiv",
    extent
});

view.popup.defaultPopupTemplateEnabled = true;

const layerListExpand = new Expand({
    content: new LayerList({
        view,
        statusIndicatorsVisible: true
    })
});

view.ui.add(layerListExpand, "top-right");