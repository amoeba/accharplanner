import { readFileSync } from "node:fs";
import { join } from "node:path";
import satori, { SatoriOptions } from "satori"

export default defineEventHandler(async (event) => {
  // Next steps here are:
  // 1. Figure out fonts
  // 2. Figure out how to hook into the api handler
  //    See https://github.com/zernonia/keypress/blob/main/server/routes/og/%5Bslug%5D.ts#L24
  const svg = await satori(
    {
      type: 'div',
      props: {
        children: 'Kolthar al Magus',
        style: { color: 'black', fontSize: 20},
      },
    },
    {
      width: 300,
      height: 300,
      debug: true,
      fonts: [
        {
          name: 'TahomaRegular',
          data: readFileSync(join(process.cwd(), "public/fonts", "Tahoma.ttf")),
          weight: 400,
          style: 'normal',
        },
        {
          name: 'TahomaBold',
          data: readFileSync(join(process.cwd(), "public/fonts", "Tahoma.ttf")),
          weight: 800,
          style: 'normal',
        },

      ],
    } as SatoriOptions
  )

  console.log(svg)

  event.node.res.setHeader("Content-Type", "image/svg+xml")
  event.node.res.write(svg);
  event.node.res.end();

});
