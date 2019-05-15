<script>
import mapboxgl from "mapbox-gl";
import Vue from "vue";
export default {
  name: "FeaturePopup",
  inject: ["mapContext", "mapId"],
  props: {
    text: {
      type: String,
      required: false,
      default: null
    }
  },
  data() {
    return {
      popup: null
    };
  },
  mounted() {
    this.mapContext.on("click", this.mapId, event => {
      const popupContent = this.createHTML(event);
      this.popup = new mapboxgl.Popup()
        .setLngLat(event.features[0].geometry.coordinates)
        .setHTML(popupContent)
        .addTo(this.mapContext);
    });
  },
  beforeDestroy() {
    this.popup.remove();
    this.popup = null;
  },
  methods: {
    createHTML(event) {
      const popupContentVNode = this.$slots.default;
      popupContentVNode[0].children[0].text = event.features[0].properties.name;
      const popupHTML = new Vue({
        data() {
          return {
            msg: event.features[0].properties.name
          };
        },
        render(h) {
          return h("div", popupContentVNode);
        }
      }).$mount().$el.innerHTML;

      return popupHTML;
    }
  },
  render() {
    return null;
  }
};
</script>
