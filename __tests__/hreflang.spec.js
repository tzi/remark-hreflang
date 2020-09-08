import dedent from "dedent";
import unified from "unified";
import reParse from "remark-parse";
import stringify from "rehype-stringify";
import remark2rehype from "remark-rehype";

import hreflang from "../src/hreflang";

const render = text =>
  unified()
    .use(reParse)
    .use(hreflang)
    .use(remark2rehype)
    .use(stringify)
    .processSync(text);

describe("hreflang", function() {
  it("renders a link with a two digits lang", () => {
    const { contents } = render(dedent`
      I use this plugin on [my own website (fr)](https://tzi.fr), because I mix several languages on it!
    `);

    expect(contents).toMatch(`<p>I use this plugin on <a href="https://tzi.fr" hreflang="fr">my own website</a>, because I mix several languages on it!</p>`);
  });

  it("renders a link with a four digits lang", () => {
    const { contents } = render(dedent`
      I love [Canada (fr_ca)](https://www.canada.ca/fr.html)!
    `);

    expect(contents).toMatch('<p>I love <a href="https://www.canada.ca/fr.html" hreflang="fr_ca">Canada</a>!</p>');
  });

  it("renders a link with an invalid lang format", () => {
    const { contents } = render(dedent`
      The [Kaamelott TV shows (Celtes)](https://www.6play.fr/kaamelott-p_888) is really fun. 
    `);

    expect(contents).toMatch(`<p>The <a href="https://www.6play.fr/kaamelott-p_888">Kaamelott TV shows (Celtes)</a> is really fun.</p>`);
  });

  it("renders a link with a reference for URL", () => {
    const {contents} = render(dedent`
      Did you get this [reference (fr)][reference]?

      [reference]: https://example.com
    `);

    expect(contents).toMatch(`<p>Did you get this <a href="https://example.com" hreflang="fr">reference</a>?</p>`);
  });
});
