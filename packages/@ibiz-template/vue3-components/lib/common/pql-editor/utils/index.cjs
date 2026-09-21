'use strict';

var core = require('@ibiz-template/core');
var runtime = require('@ibiz-template/runtime');

"use strict";
const FilterModes = [
  { valueOP: runtime.ValueOP.EQ, label: "\u7B49\u4E8E", sqlOP: "=" },
  { valueOP: runtime.ValueOP.NOT_EQ, label: "\u4E0D\u7B49\u4E8E", sqlOP: "<>" },
  { valueOP: runtime.ValueOP.GT, label: "\u5927\u4E8E", sqlOP: ">" },
  { valueOP: runtime.ValueOP.GT_AND_EQ, label: "\u5927\u4E8E\u7B49\u4E8E", sqlOP: ">=" },
  { valueOP: runtime.ValueOP.LT, label: "\u5C0F\u4E8E", sqlOP: "<" },
  { valueOP: runtime.ValueOP.LT_AND_EQ, label: "\u5C0F\u4E8E\u7B49\u4E8E", sqlOP: "<=" },
  { valueOP: runtime.ValueOP.IS_NULL, label: "\u4E3A\u7A7A", sqlOP: "IS NULL" },
  { valueOP: runtime.ValueOP.IS_NOT_NULL, label: "\u975E\u7A7A", sqlOP: "IS NOT NULL" },
  { valueOP: runtime.ValueOP.IN, label: "\u5C5E\u4E8E", sqlOP: "IN" },
  { valueOP: runtime.ValueOP.NOT_IN, label: "\u4E0D\u5C5E\u4E8E", sqlOP: "NOT IN" },
  { valueOP: runtime.ValueOP.LIKE, label: "\u6587\u672C\u5305\u542B", sqlOP: "LIKE" }
  // { valueOP: ValueOP.EXISTS, label: '存在', sqlOP: 'EXISTS' },
  // { valueOP: ValueOP.NOT_EXISTS, label: '不存在', sqlOP: 'NOT EXISTS' },
];
const InputOPs = [runtime.ValueOP.IN, runtime.ValueOP.NOT_IN, runtime.ValueOP.LIKE];
const ExcludeOPs = [
  runtime.ValueOP.IS_NULL,
  runtime.ValueOP.IS_NOT_NULL,
  runtime.ValueOP.EXISTS,
  runtime.ValueOP.NOT_EXISTS
];
const InOPs = [runtime.ValueOP.IN, runtime.ValueOP.NOT_IN];
const filterModeMap = /* @__PURE__ */ new Map();
FilterModes.forEach((mode) => {
  filterModeMap.set(mode.valueOP, mode);
});
const symbolMap = /* @__PURE__ */ new Map();
FilterModes.forEach((mode) => {
  symbolMap.set(mode.sqlOP, mode.valueOP);
});
const generateItems = (children) => {
  if (!children.length) {
    return [];
  }
  const items = [];
  for (let i = 0; i < children.length; i++) {
    if (i !== 0) {
      const connection = children[i];
      if (connection && connection.type === "pql-field-connection") {
        if (i === children.length - 1) {
          throw new core.RuntimeError("pql\u8282\u70B9\u89E3\u6790\u9519\u8BEF");
        }
        items.push({
          type: "connection",
          value: {
            label: connection.label,
            value: connection.value
          }
        });
      } else {
        throw new core.RuntimeError("pql\u8282\u70B9\u89E3\u6790\u9519\u8BEF");
      }
    }
    const key = children[i !== 0 ? ++i : i];
    const operator = children[++i];
    if (key && operator && key.type === "pql-field" && operator.type === "pql-field-operator") {
      if (operator.value && ExcludeOPs.includes(operator.value)) {
        items.push({
          type: "condition",
          key: {
            label: key.label,
            value: key.value
          },
          operator: {
            label: operator.label,
            value: operator.value
          }
        });
        continue;
      } else {
        const value = children[++i];
        if (value && (value.type === "pql-field-value" || value.text)) {
          items.push({
            type: "condition",
            key: {
              label: key.label,
              value: key.value
            },
            operator: {
              label: operator.label,
              value: operator.value
            },
            value: {
              type: value.type,
              label: value.type === "pql-field-value" ? value.label : value.text,
              value: value.type === "pql-field-value" ? value.value : value.text
            }
          });
          continue;
        }
      }
    }
    throw new core.RuntimeError("pql\u8282\u70B9\u89E3\u6790\u9519\u8BEF");
  }
  return items;
};
const generateNodeItems = (currentNode, getPreviousNode) => {
  var _a, _b;
  if (!currentNode || !getPreviousNode) {
    return [];
  }
  const nodes = [];
  while (currentNode) {
    nodes.push(currentNode);
    currentNode = getPreviousNode(currentNode);
  }
  const result = [];
  nodes.reverse();
  let current = { type: "condition" };
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if (node.type === "pql-field") {
      if (current.key || current.operator || current.value) {
        result.push(current);
        current = { type: "condition", key: node };
      } else {
        current.key = node;
      }
    }
    if (node.type === "pql-field-operator") {
      if (current.operator || current.value) {
        result.push(current);
        current = { type: "condition", operator: node };
      } else {
        current.operator = node;
      }
      if (node.value && InOPs.includes(node.value) && i < nodes.length - 1 && nodes[i + 1].type !== "pql-field-connection") {
        if (nodes[i + 1].type === "pql-field" || nodes[i + 1].type === "pql-field-operator") {
          continue;
        }
        current.value = [];
        i++;
        while (i < nodes.length && nodes[i].type !== "pql-field-connection" && nodes[i].type !== "pql-field" && nodes[i].type !== "pql-field-operator") {
          current.value.push(nodes[i]);
          i++;
        }
        if (i < nodes.length && (nodes[i].type === "pql-field-connection" || nodes[i].type === "pql-field" || nodes[i].type === "pql-field-operator")) {
          i--;
        }
      }
    }
    if (node.type === "pql-field-value") {
      if (current.value || ((_a = current.operator) == null ? void 0 : _a.value) && ExcludeOPs.includes(current.operator.value)) {
        current = { type: "condition", value: [node] };
      } else {
        current.value = [node];
      }
    }
    if (node.type === "pql-field-connection") {
      if (current.key || current.operator || current.value) {
        result.push(current);
      }
      result.push({ type: "connection", value: [node] });
      current = { type: "condition" };
    }
    if (!node.type && node.text) {
      if (current.value || ((_b = current.operator) == null ? void 0 : _b.value) && ExcludeOPs.includes(current.operator.value)) {
        result.push(current);
        current = { type: "condition", value: [node] };
      } else {
        current.value = [node];
      }
    }
  }
  if (current.key || current.operator || current.value) {
    result.push(current);
  }
  return result;
};
const generateCustomCond = (items, fields) => {
  const map = /* @__PURE__ */ new Map();
  fields.forEach((item) => {
    map.set(item.appDEFieldId, item);
  });
  let cond = "";
  items.forEach((item) => {
    var _a, _b;
    if (item.type === "condition") {
      const { key, operator, value } = item;
      const symbol = (_a = filterModeMap.get(operator == null ? void 0 : operator.value)) == null ? void 0 : _a.sqlOP;
      const valueText = value == null ? void 0 : value.filter((_v) => _v.type || _v.text).map((_v) => {
        var _a2, _b2, _c, _d;
        if (_v.type) {
          return "$".concat(JSON.stringify({
            value: (_v == null ? void 0 : _v.value) || "",
            caption: (_v == null ? void 0 : _v.label) || "",
            field: "".concat(((_a2 = map.get((key == null ? void 0 : key.value) || "")) == null ? void 0 : _a2.appDataEntityFullTag) || "", ".").concat((key == null ? void 0 : key.value) || "")
          }));
        }
        if ((operator == null ? void 0 : operator.value) === runtime.ValueOP.LIKE) {
          return "'%".concat(((_b2 = _v.text) == null ? void 0 : _b2.trim()) || "", "%'");
        }
        if ((operator == null ? void 0 : operator.value) && InOPs.includes(operator.value)) {
          return ((_c = _v.text) == null ? void 0 : _c.trim().replace(/^\[/, "(").replace(/\]$/, ")")) || "";
        }
        return ((_d = _v.text) == null ? void 0 : _d.trim()) || "";
      }).join("").replace(/\s+/g, " ");
      const valueStr = value ? "  ".concat(valueText) : "";
      cond += "$".concat(JSON.stringify({
        name: (key == null ? void 0 : key.value) || "",
        caption: (key == null ? void 0 : key.label) || ""
      }), "  ").concat(symbol).concat(valueStr);
    }
    if (item.type === "connection") {
      cond += "  ".concat((_b = item.value) == null ? void 0 : _b.filter((_v) => _v.value).map((_v) => _v.value).join(), "  ");
    }
  });
  return cond;
};
const parseCustomCond = (cond) => {
  var _a, _b;
  try {
    const items = cond.split("  ");
    const pqlItems = [];
    for (let i = 0; i < items.length; i++) {
      if (i !== 0) {
        const connection = items[i];
        if (connection === "and" || connection === "or") {
          if (i === items.length - 1) {
            throw new core.RuntimeError("pql\u81EA\u5B9A\u4E49\u6761\u4EF6\u89E3\u6790\u9519\u8BEF");
          }
          pqlItems.push({
            type: "connection",
            value: {
              label: connection,
              value: connection
            }
          });
        } else {
          throw new core.RuntimeError("pql\u81EA\u5B9A\u4E49\u6761\u4EF6\u89E3\u6790\u9519\u8BEF");
        }
      }
      const key = items[i !== 0 ? ++i : i];
      const operator = items[++i];
      if (key && /^\$/.test(key) && operator) {
        const keyObj = JSON.parse(key.slice(1));
        if (ExcludeOPs.includes(symbolMap.get(operator))) {
          pqlItems.push({
            type: "condition",
            key: {
              label: keyObj.caption,
              value: keyObj.name
            },
            operator: {
              label: ((_a = filterModeMap.get(symbolMap.get(operator))) == null ? void 0 : _a.label) || "",
              value: symbolMap.get(operator)
            }
          });
          continue;
        } else {
          const value = items[++i];
          if (value) {
            const valueObj = /^\$/.test(value) ? JSON.parse(value.slice(1)) : { caption: value, value };
            pqlItems.push({
              type: "condition",
              key: {
                label: keyObj.caption,
                value: keyObj.name
              },
              operator: {
                label: ((_b = filterModeMap.get(symbolMap.get(operator))) == null ? void 0 : _b.label) || "",
                value: symbolMap.get(operator)
              },
              value: {
                type: /^\$/.test(value) ? "pql-field-value" : void 0,
                label: valueObj.caption,
                value: valueObj.value
              }
            });
            continue;
          }
        }
      }
      throw new core.RuntimeError("pql\u81EA\u5B9A\u4E49\u6761\u4EF6\u89E3\u6790\u9519\u8BEF");
    }
    return pqlItems;
  } catch (err) {
    ibiz.log.error(err == null ? void 0 : err.message);
  }
};
const pqlItemsToPqlNodes = async (items) => {
  const nodes = [];
  items.forEach((item) => {
    var _a, _b;
    if (item.type === "condition") {
      const { key, operator, value } = item;
      nodes.push({
        type: "pql-field",
        label: key == null ? void 0 : key.label,
        value: key == null ? void 0 : key.value
      });
      nodes.push({
        type: "pql-field-operator",
        label: operator == null ? void 0 : operator.label,
        value: operator == null ? void 0 : operator.value
      });
      if (!(value == null ? void 0 : value.type)) {
        if ((operator == null ? void 0 : operator.value) && InOPs.includes(operator.value)) {
          if ((value == null ? void 0 : value.value) && /^\(.*?\)$/.test(value.value)) {
            const valueText = value.value.slice(1, -1).trim();
            let splitArr = valueText.split(/\},\s*/g);
            splitArr = splitArr.map(
              (text, i) => i === splitArr.length - 1 ? text : "".concat(text, "}")
            );
            if (splitArr.length && splitArr.every((text) => /^\$/.test(text))) {
              nodes.push({
                text: "["
              });
              splitArr.forEach((text, i) => {
                let valueObj;
                try {
                  valueObj = JSON.parse(text.slice(1));
                } catch (err) {
                  valueObj = { caption: text, value: text };
                }
                nodes.push({
                  type: "pql-field-value",
                  label: valueObj == null ? void 0 : valueObj.caption,
                  value: valueObj == null ? void 0 : valueObj.value
                });
                if (i !== splitArr.length - 1) {
                  nodes.push({
                    text: ","
                  });
                }
              });
              nodes.push({
                text: "]"
              });
              return;
            }
          }
        }
        if ((operator == null ? void 0 : operator.value) === runtime.ValueOP.LIKE) {
          if ((value == null ? void 0 : value.value) && value.value.startsWith("'%") && value.value.endsWith("%'")) {
            nodes.push({
              text: value.value.slice(2, -2)
            });
            return;
          }
        }
        nodes.push({
          text: value == null ? void 0 : value.value
        });
      } else {
        nodes.push({
          type: "pql-field-value",
          label: value == null ? void 0 : value.label,
          value: value == null ? void 0 : value.value
        });
      }
    }
    if (item.type === "connection") {
      nodes.push({
        type: "pql-field-connection",
        label: (_a = item.value) == null ? void 0 : _a.label,
        value: (_b = item.value) == null ? void 0 : _b.value
      });
    }
  });
  return nodes;
};
const pqlNodeToHtml = (node) => {
  const type = node.type || "";
  if (!type) {
    return node.text || "";
  }
  const html = '<span\n        data-pql="true"\n        data-w-e-type="'.concat(type, '"\n        data-w-e-is-void\n        data-w-e-is-inline\n        data-label="').concat(node.label || "", '"\n        data-value="').concat(node.value || "", '"\n    ></span>');
  return html;
};
const pqlNodesToHtml = (nodes) => {
  let html = "<p>";
  nodes.forEach((node) => {
    html += pqlNodeToHtml(node);
  });
  html += "</p>";
  return html;
};
function isMove(el) {
  if (!el) {
    return false;
  }
  if (el.getAttribute("data-slate-node") === "element" && el.getAttribute("data-slate-inline") && el.getAttribute("data-slate-void")) {
    return true;
  }
  return isMove(el.parentElement);
}

exports.ExcludeOPs = ExcludeOPs;
exports.FilterModes = FilterModes;
exports.InOPs = InOPs;
exports.InputOPs = InputOPs;
exports.generateCustomCond = generateCustomCond;
exports.generateItems = generateItems;
exports.generateNodeItems = generateNodeItems;
exports.isMove = isMove;
exports.parseCustomCond = parseCustomCond;
exports.pqlItemsToPqlNodes = pqlItemsToPqlNodes;
exports.pqlNodeToHtml = pqlNodeToHtml;
exports.pqlNodesToHtml = pqlNodesToHtml;
