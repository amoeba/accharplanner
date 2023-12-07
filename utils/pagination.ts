export const getPage = function (page: string | undefined) {
  if (typeof page === undefined) {
    return 1;
  }

  const out = Number(page)

  if (Number.isNaN(out) || !Number.isInteger(out)) {
    return 1;
  }

  if (out < 1) {
    return 1;
  }

  return out;
}
