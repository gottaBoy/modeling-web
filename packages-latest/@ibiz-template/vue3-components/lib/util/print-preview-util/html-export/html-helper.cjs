'use strict';

"use strict";
function generateHTML(content, style = {}) {
  let css = "";
  for (const key in style) {
    if (Object.prototype.hasOwnProperty.call(style, key)) {
      const val = style[key];
      css += ".".concat(key, "{").concat(val, "}");
    }
  }
  const html = '\n    <!DOCTYPE html>\n    <html>\n    <head>\n    <meta charset="utf-8">\n    <style>'.concat(css, "</style>\n    </head>\n    <body>\n    ").concat(content, "\n    </body>\n    </html>\n    ");
  return html;
}
function downloadHtmlFile(filename, content) {
  const blob = new Blob(["".concat(content)], {
    type: "text/html;charset=utf-8"
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

exports.downloadHtmlFile = downloadHtmlFile;
exports.generateHTML = generateHTML;
