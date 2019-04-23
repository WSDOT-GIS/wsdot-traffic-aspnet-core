using BAMCIS.GeoJSON;
using SampleWebApplication.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Wsdot.Traffic;

namespace SampleWebApplication
{
    public static class Extensions
    {
        public static Dictionary<string, dynamic> ToDictionary(this RoadwayLocation roadwayLocation, string prefix = "")
        {
            return new Dictionary<string, dynamic> {
                { $"{prefix}Description", roadwayLocation.Description },
                { $"{prefix}RoadName", roadwayLocation.RoadName },
                { $"{prefix}Direction", roadwayLocation.Direction },
                { $"{prefix}MilePost", roadwayLocation.MilePost },
                { $"{prefix}Latitude", roadwayLocation.Latitude },
                { $"{prefix}Longitude", roadwayLocation.Longitude }
            };
        }

        public static Feature ToFeature(this Camera c)
        {
            var position = new Position(c.DisplayLongitude, c.DisplayLatitude);
            var point = new Point(position);
            var properties = new Dictionary<string, dynamic>
            {
                // { "CameraID", c.CameraID },
                { "CameraOwner", c.CameraOwner },
                { "ImageUrl", c.ImageUrl },
                { "IsActive", c.IsActive },
                { "OwnerUrl", c.OwnerUrl },
                { "Region", c.Region },
                { "Title", c.Title },
                { "Description", c.Description },
                { "ImageHeight", c.ImageHeight },
                { "ImageWidth", c.ImageWidth }
            };
            var locationProps = c.CameraLocation.ToDictionary("Location");
            var combined = properties.Concat(locationProps).ToDictionary(k => k.Key, v => v.Value);

            var feature = new FeatureWithId<int>(point, c.CameraID, combined);
            return feature;
        }
    }
}
