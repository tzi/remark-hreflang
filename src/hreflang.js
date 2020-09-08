import select from "unist-util-select";

const pattern = new RegExp(" \\(([a-z]{2}(_[a-z]{2}|))\\)$", "i");

function plugin() {
  return function transformer(ast) {
    select(ast, "link,linkReference").forEach(node => {
      if (!node.children) {
        return;
      }
      const lastChild = node.children[node.children.length - 1];
      const match = pattern.exec(lastChild.value);

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
