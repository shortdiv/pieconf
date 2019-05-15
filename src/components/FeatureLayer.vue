<script>
export default {
  name: "FeatureLayer",
  props: {
    mapContext: { type: [Object, null], required: true },
    mapId: { type: String, required: true },
    sourceId: { type: String, required: true },
    layout: { type: Object, required: false, default: () => ({}) },
    paint: { type: Object, required: false, default: () => ({}) },
    img: { type: String, required: false, default: null },
    layerType: { type: String, required: true },
    imgName: { type: String, required: false, default: null },
    imgSize: { type: String, required: false, default: null }
  },
  provide() {
    return {
      mapContext: this.mapContext,
      mapId: this.mapId
    };
  },
  data() {
    return {
      map: null
    };
  },
  mounted() {
    this.$nextTick(() => {
      if (this.img) {
        const image = this.img;
        this.mapContext.loadImage(image, (err, img) => {
          this.mapContext.addImage(this.imgName, img);
          this.mapContext.addLayer({
            id: this.mapId,
            source: this.sourceId,
            type: this.layerType,
            layout: {
              "icon-size": Number(this.imgSize),
              "icon-image": this.imgName
            }
          });
        });
      } else {
        this.mapContext.addLayer({
          id: this.mapId,
          source: this.sourceId,
          type: this.layerType,
          layout: this.layout,
          paint: this.paint
        });
      }
      this.mapContext.on("mouseenter", this.mapId, () => {
        this.mapContext.getCanvas().style.cursor = "pointer";
      });
      this.mapContext.on("mouseleave", this.mapId, () => {
        this.mapContext.getCanvas().style.cursor = "";
      });
      this.mapContext.on("click", this.mapId, event => {
        this.$emit("layer-clicked", event);
      });
    });
  },
  methods: {
    addIcon(name, img) {
      this.mapContext.addImage(name, img);
    }
  },
  render() {
    return <template>{this.$slots.default}</template>;
  }
};
</script>
