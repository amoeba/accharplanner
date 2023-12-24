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
        children: 'hello, world',
        style: { color: 'black' },
      },
    },
    {
      width: 300,
      height: 300,
      fonts: {

      }
    } as SatoriOptions
  )

  return {
    'og': 'TODO',
  }
});
