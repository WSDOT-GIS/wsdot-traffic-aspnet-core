# WSDOT Traffic Map using ASP.NET Core

- ArcGIS API for JavaScript
- ASP.NET Core
  - WebAPI
- Node / NPM
- Webpack
- TypeScript
- WSDOT Traveler Info API

## REST Endpoints

All endpoints are children of `/api/traffic`

| endpoint          | description                       |
| ----------------- | --------------------------------- |
| `cameras`         | Traffic cameras                   |
| `cameras.geojson` | Traffic cameras in GeoJSON format |

## Build

1. Clone the project onto your own computer using `git clone --recurse-submodules`.
2. Build the client-side code
   ```bash
   $ cd .\SampleWebApplication\
   $ npm install
   ```
3. Open the solution file in Visual Studio 2019 or higher and build the server-side code.
