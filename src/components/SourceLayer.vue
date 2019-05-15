<script>
export default {
  name: "SourceLayer",
  props: {
    mapContext: {
      type: Object,
      required: true
    },
    sourceId: {
      type: String,
      required: true
    },
    dataSrc: {
      type: [String, Object],
      required: true
    },
    sourceType: {
      type: String,
      required: true
    }
  },
  mounted() {
    if (this.sourceType === "geojson") {
      this.mapContext.addSource(this.sourceId, {
        type: "geojson",
        data: this.dataSrc
      });
    } else {
      this.mapContext.addSource(this.sourceId, {
        type: "vector",
        url: this.dataSrc
      });
    }
  },
  render() {
    return null;
  }
};
</script>
