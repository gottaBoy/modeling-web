"use strict";
const splitPathToSegments = (path) => {
  const segments = [];
  let currentSegment = "";
  let parenCount = 0;
  for (let i = 0; i < path.length; i++) {
    const char = path[i];
    if (char === "/") {
      if (parenCount === 0) {
        if (currentSegment) {
          segments.push(currentSegment);
          currentSegment = "";
        }
        continue;
      } else {
        currentSegment += char;
      }
    } else {
      if (char === "(") {
        parenCount += 1;
      } else if (char === ")") {
        parenCount -= 1;
      }
      currentSegment += char;
    }
  }
  if (currentSegment) {
    segments.push(currentSegment);
  }
  return segments;
};
const validateRouteSegments = (segments) => {
  if (segments.length < 3 || segments.length % 2 === 0) {
    return false;
  }
  const paramReg = ":[^()]+\\(\\[\\^/\\]\\+=\\[\\^/\\]\\+\\|".concat(ibiz.env.routePlaceholder, "\\)");
  const viewReg = "[^=/]+";
  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    if (i % 2 === 0) {
      const paramRegex = new RegExp("^".concat(paramReg, "$"));
      if (!paramRegex.test(segment) && segment !== ibiz.env.routePlaceholder) {
        return false;
      }
    } else {
      const viewRegex = new RegExp("^".concat(viewReg, "$"));
      if (!viewRegex.test(segment)) {
        return false;
      }
    }
  }
  return true;
};

export { splitPathToSegments, validateRouteSegments };
