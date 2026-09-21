'use strict';

"use strict";
function getAddressTitle(address) {
  var _a;
  const match = address.match(/^.*(?:省|市|区|县|街道|镇|乡|路)(.+)$/);
  return (_a = match == null ? void 0 : match[1]) != null ? _a : address;
}

exports.getAddressTitle = getAddressTitle;
