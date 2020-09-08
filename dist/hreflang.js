"use strict";

var _unistUtilSelect = require("unist-util-select");

var _unistUtilSelect2 = _interopRequireDefault(_unistUtilSelect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pattern = new RegExp(" \\(([a-z]{2}(_[a-z]{2}|))\\)$", "i");

function plugin() {
  return function transformer(ast) {
    (0, _unistUtilSelect2.default)(ast, "link,linkReference").forEach(function (node) {
      if (!node.children) {
        return;
      }
      var lastChild = node.children[node.children.length - 1];
      var match = pattern.exec(lastChild.value);

      if (match) {
        lastChild.value = lastChild.value.slice(0, -match[0].length);
        node.data = {
          hProperties: {
            hreflang: match[1]
          }
        };
      }
    });
  };
}

module.exports = plugin;