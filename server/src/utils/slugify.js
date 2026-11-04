export const slugify = (text) =>
  text
    .toString()
    .normalize('NFD') // split "ñ" into "n" + accent mark
    .replace(/[\u0300-\u036f]/g, '') // remove the accent marks
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-') // anything else becomes "-"
    .replace(/^-+|-+$/g, ''); // no leading or trailing "-"