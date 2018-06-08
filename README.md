# remark-hreflang

This [remark](https://github.com/remarkjs/remark) plugin parses custom Markdown syntax to provides `hreflang` attributes on links.

## Syntax

`hreflang` attributes is used to define the lang of the targeted content.

To use it, you have to declare the lang in parentheses at the end of your link label:

```markdown
I use this plugin on [my own website (fr)](https://tzi.fr), because I mix several languages on it!
```

This would compile to the following HTML:

```html
<p>I use this plugin on <a href="https://tzi.fr" hreflang="fr">my own website</a>, because I mix several languages on it!</p>
```

## Installation

via npm:

```bash
npm install remark-hreflang --save
```

## Usage

JavaScript usage:

```javascript
var remark = require("remark");
var hreflang = require("remark-hreflang");

remark()
  .use(hreflang)
  .process(html, function(error) {
    console.error(error);
  });
```

## License

MIT. Copyright (c) [Thomas Zilliox](https://tzi.fr).

## Developers

```bash
# Install dependencies
npm ci
# Tests with jest
npm test
# Format with prettier
npm run formart
# Buld compatible version with babel
npm run build
```
