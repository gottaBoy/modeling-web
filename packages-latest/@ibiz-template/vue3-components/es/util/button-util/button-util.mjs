"use strict";
function convertBtnType(buttonStyle) {
  let buttonType = "default";
  if (buttonStyle && ["PRIMARY", "SUCCESS", "WARNING", "DANGER", "INFO"].includes(buttonStyle))
    buttonType = buttonStyle.toLowerCase();
  if (buttonStyle && ["INVERSE"].includes(buttonStyle))
    buttonType = "text";
  return buttonType;
}

export { convertBtnType };
