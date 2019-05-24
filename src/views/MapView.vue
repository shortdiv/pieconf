<template>
  <div>
    <BaseMap>
      <template v-slot:default="{ loaded, mapContext }">
        <ContextWrapper v-if="loaded">
          <SourceLayer
            :map-context="mapContext"
            source-id="pieconf"
            source-type="geojson"
            :data-src="pieconfVenue"
          />
          <FeatureLayer
            :map-context="mapContext"
            map-id="pieconf-venue"
            source-id="pieconf"
            layer-type="symbol"
            img-name="vue"
            img-size="0.15"
            :img="img"
          >
            <FeaturePopup>
              <span>Hello Pie Conf!</span>
            </FeaturePopup>
          </FeatureLayer>
          <template v-if="yelpData != null">
            <SourceLayer
              :map-context="mapContext"
              source-id="yelp"
              source-type="geojson"
              :data-src="yelpData"
            />
            <FeatureLayer
              :map-context="mapContext"
              :img="pins"
              layer-type="symbol"
              img-name="pins"
              img-size="0.3"
              map-id="yelp-pops"
              source-id="yelp"
              @layer-clicked="
                e => {
                  moveMap(mapContext, e);
                }
              "
            >
              <FeaturePopup>
                <span>Hello Vue Conf!</span>
              </FeaturePopup>
            </FeatureLayer>
          </template>
        </ContextWrapper>
      </template>
    </BaseMap>
  </div>
</template>

<script>
import BaseMap from "@/components/BaseMap.vue";
import ContextWrapper from "@/components/ContextWrapper.js";
import FeaturePopup from "@/components/FeaturePopup.vue";
import SourceLayer from "@/components/SourceLayer.vue";
import FeatureLayer from "@/components/FeatureLayer.vue";
import Icon from "@/assets/logo.png";

import axios from "axios";

export default {
  name: "MapView",
  components: {
    BaseMap,
    SourceLayer,
    FeatureLayer,
    FeaturePopup,
    ContextWrapper
  },
  data() {
    return {
      img: Icon,
      yelpData: null,
      pins:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAYAAAA4TnrqAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABAZJREFUeNrsnO1tGkEQhveQ/4cUEAlXEFxAZKgAUkGgAocK4CoAKuCoIJcKOJQCoANflAYoIbPWxEIRYG5n3v1AHmnFD5u9vYd3Z2b3Zi8znu3Pw5c2fQypfabW5dY+8+8HantuW2rVp92vgwlkmWdATwxHYhbcklrpG1zmAdKU2uiCelztwNAWvqBlQFAzVlIbfA8v0AjYLDlYBMlOsx/UOp5dip2eY4K2R12gpQzqO33sAoAy7At3NIZR9MqiQa7YN8VgBSlsHCWsyEDBgGU3CgoCrCUENY8YlLURR+WwyqJBDDnqpWB9UlgVBBaB6nDUaycCy+Zi99Lk1XUazhMCZXisc+/KIlX16GNj0jTRdLxzVBXC/r+JHuAa0xPXwSgLoKqC2vrcr81BZKAccZ3V1dRnPSkNuGSHO740cPpbyXnSPX9Hw77BlcUR8FlhsBMCsBCsPTXcwEeXyNhEWUOFQY5dQbHS7Hc1MvIhehoOhAPM6WYL6V1yHwthNwM0LEl0qjU356ivie1T0EUPBoujoMhPAdKAXJKksg+GKKsjVFWpTYqno0RdUcIqDc4qn1PxWlgfBIPaAmEh+3aGJXnWh3xMVccI693eYWFg1ZGOvx0jrN++E8Ar7fHWpuEA2LdkvQpbSEvyma7CCuDcqkKS/+1RsKQ+awpQlbTPGgKLlha1dOGqWYPA+1oitfI9wXyWtDplzhU2UlBdBVU5uZUmsH4qhPmNBBh/d6OQMmzRsCqFGWRvcsfTqCmomdF7sOt0L02f7uyMvCb02MFe3D09qkWdGsWaL7qm05P4ps8N14qw7M2vuAqnOjE1HkEJrfOW0Z3DhRAPWXvgTF/F97Yayrc22M08H1Z6gaUUFUNaIamkaQxLYe87pK1DLKTXCYKqpQVtrrAWBrtdjLBc2oETLJ73y4RAHTQCk2Q/KyV1LTXO9zjDSkhdByOvjRArKxV1LbVOjYlgJaAuNVU1XkhfWPA+mzCHm96yiaQeTHsavg4q0rxqodmhCiyukqkig6V+KqylPLhYnH2pcfwEBot3JGJw9geEqrSVZbgUch8YVo46YN5KwVc0sErbqUNh8YHu/Jamn2qedSb30ny4cY19RdSuoqfh6+A9RscCDQoKi6Ojj2R17ysphpYc8RZ0gfZTvl6v4qM+awJMJ6BvCPEOi391hP/KffgpL9HwRHTsGb2DnZA3gkQDi4GN6GMldegE6iFExuu1tFvh+Jv1T/1Qy4MsxEUdX8nyAurmX2N3Bph928i11cYqL7FIahqeWHDvrwTVDw0qqLJYXbZYze7ft98AFXrbJ7iy/uVg/Qs52DgWUMFhMbBza7ux76QzelhHKcXxHthC46T+TZuNkJxWRGl/BRgAtAd0cl+QnEwAAAAASUVORK5CYII=",
      pieconfVenue: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [-87.604159, 41.89183]
            },
            properties: {
              name: "Pie Conf",
              aka: "Navy Pier"
            }
          }
        ]
      }
    };
  },
  mounted() {
    axios
      .get("/.netlify/functions/get-yelp", {
        params: {
          location: "chicago,il",
          term: "pizza"
        }
      })
      .then(async res => {
        res = JSON.parse(res.data.results.body);
        const results = this.geojsonify(res.businesses);
        this.yelpData = results;
      });
  },
  methods: {
    moveMap(map, e) {
      map.flyTo({ center: e.features[0].geometry.coordinates, speed: 2.0 });
      this.chipieClicked = e.features[0].properties.name;
    },
    geojsonify(response) {
      let features = [];
      response.map(item => {
        features.push({
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [item.coordinates.longitude, item.coordinates.latitude]
          },
          properties: {
            ...item
          }
        });
      });
      return {
        type: "FeatureCollection",
        features
      };
    }
  }
};
</script>

<style lang="scss" scoped>
body {
  margin: 0;
  padding: 0;
}
#map {
  position: absolute;
  top: 50px;
  bottom: 0;
  width: 100%;
}
</style>
