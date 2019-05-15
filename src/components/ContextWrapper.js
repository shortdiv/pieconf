export default {
  functional: true,
  render(h, { props, children }) {
    return h(
      "template",
      {
        attrs: props
      },
      children
    );
  }
};
