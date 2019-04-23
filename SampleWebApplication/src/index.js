"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Map_1 = __importDefault(require("esri/Map"));
var MapView_1 = __importDefault(require("esri/views/MapView"));
var Extent_1 = __importDefault(require("esri/geometry/Extent"));
var GeoJSONLayer_1 = __importDefault(require("esri/layers/GeoJSONLayer"));
var SimpleRenderer_1 = __importDefault(require("esri/renderers/SimpleRenderer"));
var PictureMarkerSymbol_1 = __importDefault(require("esri/symbols/PictureMarkerSymbol"));
var Expand_1 = __importDefault(require("esri/widgets/Expand"));
var LayerList_1 = __importDefault(require("esri/widgets/LayerList"));
var webfontloader_1 = require("webfontloader");
webfontloader_1.load({
    google: {
        families: ["Noto Sans"]
    }
});
var cameraMarker = new PictureMarkerSymbol_1.default({
    url: "images/camera.svg"
});
var renderer = new SimpleRenderer_1.default({
    symbol: cameraMarker
});
var camerasLayer = new GeoJSONLayer_1.default({
    url: "api/traffic/cameras.geojson",
    geometryType: "point",
    fields: [
        {
            name: "CameraOwner",
            type: "string"
        },
        { name: "CameraOwner", type: "string" },
        /// <summary>A description of the camera.</summary>
        { name: "Description", type: "string" },
        ///// <summary>display latitude (y)</summary>
        //{ name: "DisplayLatitude", type: "double" },
        ///// <summary>display longitude (x)</summary>
        //{ name: "DisplayLongitude", type: "double" },
        ///// <summary>The height of the camera image.</summary>
        { name: "ImageHeight", type: "integer" },
        /// <summary>The width of the camera image.</summary>
        { name: "ImageWidth", type: "integer" },
        /// <summary>Image URL</summary>
        { name: "ImageUrl", type: "string" },
        //      /// <summary>Indicates if the camera is currently active.</summary>
        //{ name: "IsActive", type: "string" },
        /// <summary>The URL of the camera owner.</summary>
        { name: "OwnerUrl", type: "string" },
        /// <summary>The WSDOT region where the camera is located.</summary>
        { name: "Region", type: "string" },
        ///// <summary>A value that can be used to sort <see cref="Camera"/> objects.</summary>
        //{ name: "SortOrder", type: "int" },
        ///// <summary>The title of the camera.</summary>
        { name: "Title", type: "string" },
    ],
    title: "Cameras",
    renderer: renderer,
    popupTemplate: {
        content: "{*}"
    },
    popupEnabled: true
});
var map = new Map_1.default({
    basemap: "streets-vector",
    layers: [
        camerasLayer
    ]
});
/**
 * Extent of WA.
 * @see https://epsg.io/1416-area
 */
var extent = new Extent_1.default({
    xmin: -124.79,
    ymin: 45.54,
    xmax: -116.91,
    ymax: 49.05
});
var view = new MapView_1.default({
    map: map,
    container: "viewDiv",
    extent: extent
});
var layerListExpand = new Expand_1.default({
    content: new LayerList_1.default({
        view: view,
        statusIndicatorsVisible: true
    })
});
view.ui.add(layerListExpand, "top-right");
