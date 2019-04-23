using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Wsdot.Traffic;
using Wsdot.Traffic.Client;
using BAMCIS.GeoJSON;

namespace SampleWebApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TrafficController : ControllerBase
    {
        private string _apiCode;
        private TrafficClient _trafficClient;

        // TODO: Use HttpClientFactory instead of singleton
        // See https://docs.microsoft.com/en-us/dotnet/standard/microservices-architecture/implement-resilient-applications/use-httpclientfactory-to-implement-resilient-http-requests
        public TrafficClient TrafficClient
        {
            get {
                if (_trafficClient == null)
                {
                    _trafficClient = new TrafficClient
                    {
                        AccessCode = ApiCode
                    };
                }
                return _trafficClient;
            }
        }


        public string ApiCode
        {
            get
            {
                if (string.IsNullOrWhiteSpace(_apiCode))
                {
                    _apiCode = Environment.GetEnvironmentVariable("WSDOT_TRAFFIC_API_CODE");
                }
                return _apiCode;
            }
        }

        [HttpGet("cameras")]
        public async Task<ActionResult<IEnumerable<Camera>>> GetCameras()
        {
            return await TrafficClient.GetCameras();
        }

        [HttpGet("cameras.geojson")]
        [Produces("application/geo+json")]
        public async Task<ActionResult<FeatureCollection>> GetCamerasGeoJson()
        {
            var cameras = await TrafficClient.GetCameras();
            var features = from c in cameras
                           orderby c.SortOrder
                           select c.ToFeature();
            return new FeatureCollection(features);
        }
    }
}
