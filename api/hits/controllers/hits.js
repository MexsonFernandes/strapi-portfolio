"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async increase(ctx) {
    const hits = await strapi.services.hits.find();
    const counter = Number(hits.counter) + 1;

    await strapi.services.hits.createOrUpdate({
      counter,
    });

    ctx.set({
      "content-type": "image/svg+xml",
      "cache-control": "max-age=0, no-cache, no-store, must-revalidate",
    });

    ctx.send(`
    <svg xmlns="http://www.w3.org/2000/svg" width="160" height="20">
      <rect width="170" height="40" fill="#555"/>
      <rect x="75" width="160" height="70" fill="#4c1"/>
      <rect rx="7" width="10" height="20" fill="transparent"/>
        <g fill="#fff" text-anchor="middle"
          font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11">
            <text x="38" y="14">Hits</text>
            <text x="114" y="14">${counter}</text>
        </g>
    </svg>
`);
  },
};
