using BAMCIS.GeoJSON;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SampleWebApplication.Models
{
    public class FeatureWithId<T> : Feature where T : new()
    {
        public T Id { get; protected set; }

        public FeatureWithId(Geometry geometry, T id = default, IDictionary<string, dynamic> properties = null, IEnumerable<double> boundingBox = null) : base(geometry, properties, boundingBox)
        {
            Id = id;
        }
    }
}
