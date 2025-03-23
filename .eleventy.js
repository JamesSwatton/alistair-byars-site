const getUrlPartial = require("./src/_config/filters/get-url-part.js");
const getValueFromKey = require("./src/_config/filters/value-from-key.js");

module.exports = (config) => {
  // Set directories to pass through to the dist folder
  config.addPassthroughCopy({ "./src/images": "images" });
  config.addPassthroughCopy({ "./src/js/": "js" });
  config.addPassthroughCopy({ "./src/css/": "css" });

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
      includes: "../_includes",
      data: "../_data",
    },
  };
};
