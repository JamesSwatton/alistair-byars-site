import getUrlPartial from "./src/_config/filters/get-url-part.js";
import { EleventyHtmlBasePlugin } from "@11ty/eleventy";

export default function (config) {
  // Plugins
  config.addPlugin(EleventyHtmlBasePlugin);
  
  // Set directories to pass through to the dist folder
  config.addPassthroughCopy({ "./src/images": "images" });
  config.addPassthroughCopy({ "./src/js/": "js" });
  config.addPassthroughCopy({ "./src/css/": "css" });
  config.addPassthroughCopy({ "./src/assets/": "assets"});

  // Collections
  config.addCollection("offerings", (collection) => {
    return collection.getFilteredByGlob("./src/content/offerings/*.md");
  });

  config.addCollection("studio-work", (collection) => {
    return collection.getFilteredByGlob("./src/content/studio-work/*.md");
  });

  // Filters
  config.addFilter("getUrlPartial", getUrlPartial);
  config.addFilter("getValueFromKey", (data, key) => {
    return data.map((item) => item[key]);
  });
  config.addFilter("jsonify", function(data) {
    return JSON.stringify(data);
  });

  return {
    markdownTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dir: {
      input: "src/content",
      output: "dist",
      pathPrefix: "/alistair-byars-site/",
      includes: "../_includes",
      data: "../_data",
    },
  };
};
