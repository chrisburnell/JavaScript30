const { DateTime } = require("luxon");
const markdownIt = require('markdown-it')({
    html: true,
    breaks: true,
    linkify: true
});

module.exports = function(config) {
    const now = new Date();
    config.setDataDeepMerge(true);

    // Pass through files
    config.addPassthroughCopy("css");
    config.addPassthroughCopy("images");
    config.addPassthroughCopy("sounds");
    config.addPassthroughCopy("videos");

    // Challenges Collection
    config.addCollection("challenges", function(collection) {
        return collection.getFilteredByTag("challenge").reverse();
    });

    config.addFilter("dateFormat", (value, format = "dd LLLL yyyy") => {
        return DateTime.fromJSDate(new Date(value)).toFormat(format);
    });

    config.addFilter("w3DateFormat", (value, showTimezone = true) => {
        if (showTimezone) {
            return DateTime.fromJSDate(new Date(value)).toFormat("yyyy-MM-dd'T'HH:mm:ssZZZ");
        }
        return DateTime.fromJSDate(new Date(value)).toFormat("yyyy-MM-dd'T'HH:mm:ss");
    });

    config.addFilter("rssDateFormat", (value) => {
        return DateTime.fromJSDate(new Date(value)).toHTTP();
    });

    config.addFilter("markdownFormat", (value) => {
        return markdownIt.render(value);
    });

    return {
        dataTemplateEngine: "njk",
        htmlTemplateEngine: "njk",
        markdownTemplateEngine: "njk",
        passthroughFileCopy: true
    };
};
