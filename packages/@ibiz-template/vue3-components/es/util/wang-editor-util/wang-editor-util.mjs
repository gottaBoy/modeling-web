"use strict";
function parseHtml(str) {
  const regex = /<span\sdata-w-e-type="emoji"\sclass=['"]emoji['"]>(.+?)<\/span>/g;
  let match;
  let result = str;
  while ((match = regex.exec(str)) !== null) {
    const emoji = match[1];
    const tempVal = decodeURIComponent(atob(emoji));
    result = result.replace(
      match[0],
      "<span data-w-e-type=\"emoji\" class='emoji'>".concat(tempVal, "</span>")
    );
  }
  return result;
}

export { parseHtml };
