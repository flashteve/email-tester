var fs = require("fs");
var content = fs.readFileSync("./config.json");

var config = {
    getkey : function(key) {
        return JSON.parse(content).config[key];
    }
};

module.exports = config;