"use strict";
async function getJsonUrl(baseUrl, code) {
  const res = await ibiz.net.axios({
    url: "".concat(baseUrl, "/").concat(code, ".json")
  });
  return res.data;
}

export { getJsonUrl };
