module.exports = (eleventyConfig) => {
  eleventyConfig.addPassthroughCopy(".htaccess");
  eleventyConfig.addTransform("wiki-links", function (content, outputPath) {
    if (outputPath && outputPath.endsWith(".html")) {
      // We remove outer brackets from links
      let output = content.replace(/(\[+(\<a(.*?)\<\/a\>)\]+)/g, "$2");
      return output;
    }
    return content;
  });

  let markdownIt = require("markdown-it");
  let markdownItReplaceLink = require("markdown-it-replace-link");
  let markdownItOptions = {
    html: true,
    replaceLink: function (link, env) {
      const isRelativePattern = /^(?!http|\/).*/;
      const lastSegmentPattern = /[^\/]+(?=\/$|$)/i;
      const isRelative = isRelativePattern.test(link);

      if (isRelative) {
        const hasLastSegment = lastSegmentPattern.exec(env.page.url);
        // If it's nested, replace the last segment
        if (hasLastSegment && env.page.url) {
          return env.page.url.replace(lastSegmentPattern, link);
        }
        // If it's at root, just add the beginning slash
        return env.page.url + link;
      }

      return link;
    },
  };
  let markdownLib = markdownIt(markdownItOptions).use(markdownItReplaceLink);
  eleventyConfig.setLibrary("md", markdownLib);

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts",
    },
    templateFormats: [
      //
      "js",
      "md",
      "html",
      "liquid",
    ],
    passthroughFileCopy: true,
  };
};
