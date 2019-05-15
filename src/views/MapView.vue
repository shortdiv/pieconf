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
        //yay data//
        res = JSON.parse(res.data.results.body);
        console.log(res);
      });
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
  top: 0;
  bottom: 0;
  width: 100%;
}
</style>
