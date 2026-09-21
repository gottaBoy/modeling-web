"use strict";
const getRelativePathWithoutRoot = (webkitRelativePath) => {
  if (!webkitRelativePath) {
    return "";
  }
  const pathParts = webkitRelativePath.split("/");
  if (pathParts.length > 1) {
    pathParts.shift();
    return pathParts.join("/");
  }
  return webkitRelativePath;
};

export { getRelativePathWithoutRoot };
