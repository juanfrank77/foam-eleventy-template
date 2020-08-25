module.exports = (eleventyConfig) => {

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts"
    },
    templateFormats: [
      "js",
      "md",
      "html",
      "liquid"
    ],
    passthroughFileCopy: true
  };
};
