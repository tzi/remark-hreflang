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

    expect(contents).toMatchSnapshot();
  });

  it("renders a link with a four digits lang", () => {
    const { contents } = render(dedent`
      I love [Canada (fr_ca)](https://www.canada.ca/fr.html)!
    `);

    expect(contents).toMatchSnapshot();
  });

  it("renders a link with an invalid lang format", () => {
    const { contents } = render(dedent`
      The [Kaamelott TV shows (Celtes)](https://www.6play.fr/kaamelott-p_888) is really fun. 
    `);

    expect(contents).toMatchSnapshot();
  });
});
