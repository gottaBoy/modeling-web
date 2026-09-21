'use strict';

"use strict";
class EmojiElem extends HTMLElement {
  // 监听的 attr
  static get observedAttributes() {
    return ["data-value"];
  }
  attributeChangedCallback(tag, oldValue, newValue) {
    if (tag === "data-value") {
      if (newValue && oldValue === newValue)
        return;
      const shadow = this.attachShadow({ mode: "open" });
      const document = shadow.ownerDocument;
      const box = document.createElement("span");
      box.innerHTML = newValue;
      box.part.add("box");
      box.classList.add("emoji-elem_box");
      shadow.appendChild(box);
    }
  }
}

exports.EmojiElem = EmojiElem;
