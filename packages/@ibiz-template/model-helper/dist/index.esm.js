var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// ../../node_modules/.pnpm/pluralize@8.0.0/node_modules/pluralize/pluralize.js
var require_pluralize = __commonJS({
  "../../node_modules/.pnpm/pluralize@8.0.0/node_modules/pluralize/pluralize.js"(exports, module) {
    "use strict";
    (function(root, pluralize2) {
      if (typeof __require === "function" && typeof exports === "object" && typeof module === "object") {
        module.exports = pluralize2();
      } else if (typeof define === "function" && define.amd) {
        define(function() {
          return pluralize2();
        });
      } else {
        root.pluralize = pluralize2();
      }
    })(exports, function() {
      var pluralRules = [];
      var singularRules = [];
      var uncountables = {};
      var irregularPlurals = {};
      var irregularSingles = {};
      function sanitizeRule(rule) {
        if (typeof rule === "string") {
          return new RegExp("^" + rule + "$", "i");
        }
        return rule;
      }
      function restoreCase(word, token) {
        if (word === token)
          return token;
        if (word === word.toLowerCase())
          return token.toLowerCase();
        if (word === word.toUpperCase())
          return token.toUpperCase();
        if (word[0] === word[0].toUpperCase()) {
          return token.charAt(0).toUpperCase() + token.substr(1).toLowerCase();
        }
        return token.toLowerCase();
      }
      function interpolate(str, args) {
        return str.replace(/\$(\d{1,2})/g, function(match, index) {
          return args[index] || "";
        });
      }
      function replace(word, rule) {
        return word.replace(rule[0], function(match, index) {
          var result = interpolate(rule[1], arguments);
          if (match === "") {
            return restoreCase(word[index - 1], result);
          }
          return restoreCase(match, result);
        });
      }
      function sanitizeWord(token, word, rules) {
        if (!token.length || uncountables.hasOwnProperty(token)) {
          return word;
        }
        var len = rules.length;
        while (len--) {
          var rule = rules[len];
          if (rule[0].test(word))
            return replace(word, rule);
        }
        return word;
      }
      function replaceWord(replaceMap, keepMap, rules) {
        return function(word) {
          var token = word.toLowerCase();
          if (keepMap.hasOwnProperty(token)) {
            return restoreCase(word, token);
          }
          if (replaceMap.hasOwnProperty(token)) {
            return restoreCase(word, replaceMap[token]);
          }
          return sanitizeWord(token, word, rules);
        };
      }
      function checkWord(replaceMap, keepMap, rules, bool) {
        return function(word) {
          var token = word.toLowerCase();
          if (keepMap.hasOwnProperty(token))
            return true;
          if (replaceMap.hasOwnProperty(token))
            return false;
          return sanitizeWord(token, token, rules) === token;
        };
      }
      function pluralize2(word, count, inclusive) {
        var pluralized = count === 1 ? pluralize2.singular(word) : pluralize2.plural(word);
        return (inclusive ? count + " " : "") + pluralized;
      }
      pluralize2.plural = replaceWord(
        irregularSingles,
        irregularPlurals,
        pluralRules
      );
      pluralize2.isPlural = checkWord(
        irregularSingles,
        irregularPlurals,
        pluralRules
      );
      pluralize2.singular = replaceWord(
        irregularPlurals,
        irregularSingles,
        singularRules
      );
      pluralize2.isSingular = checkWord(
        irregularPlurals,
        irregularSingles,
        singularRules
      );
      pluralize2.addPluralRule = function(rule, replacement) {
        pluralRules.push([sanitizeRule(rule), replacement]);
      };
      pluralize2.addSingularRule = function(rule, replacement) {
        singularRules.push([sanitizeRule(rule), replacement]);
      };
      pluralize2.addUncountableRule = function(word) {
        if (typeof word === "string") {
          uncountables[word.toLowerCase()] = true;
          return;
        }
        pluralize2.addPluralRule(word, "$0");
        pluralize2.addSingularRule(word, "$0");
      };
      pluralize2.addIrregularRule = function(single, plural2) {
        plural2 = plural2.toLowerCase();
        single = single.toLowerCase();
        irregularSingles[single] = plural2;
        irregularPlurals[plural2] = single;
      };
      [
        // Pronouns.
        ["I", "we"],
        ["me", "us"],
        ["he", "they"],
        ["she", "they"],
        ["them", "them"],
        ["myself", "ourselves"],
        ["yourself", "yourselves"],
        ["itself", "themselves"],
        ["herself", "themselves"],
        ["himself", "themselves"],
        ["themself", "themselves"],
        ["is", "are"],
        ["was", "were"],
        ["has", "have"],
        ["this", "these"],
        ["that", "those"],
        // Words ending in with a consonant and `o`.
        ["echo", "echoes"],
        ["dingo", "dingoes"],
        ["volcano", "volcanoes"],
        ["tornado", "tornadoes"],
        ["torpedo", "torpedoes"],
        // Ends with `us`.
        ["genus", "genera"],
        ["viscus", "viscera"],
        // Ends with `ma`.
        ["stigma", "stigmata"],
        ["stoma", "stomata"],
        ["dogma", "dogmata"],
        ["lemma", "lemmata"],
        ["schema", "schemata"],
        ["anathema", "anathemata"],
        // Other irregular rules.
        ["ox", "oxen"],
        ["axe", "axes"],
        ["die", "dice"],
        ["yes", "yeses"],
        ["foot", "feet"],
        ["eave", "eaves"],
        ["goose", "geese"],
        ["tooth", "teeth"],
        ["quiz", "quizzes"],
        ["human", "humans"],
        ["proof", "proofs"],
        ["carve", "carves"],
        ["valve", "valves"],
        ["looey", "looies"],
        ["thief", "thieves"],
        ["groove", "grooves"],
        ["pickaxe", "pickaxes"],
        ["passerby", "passersby"]
      ].forEach(function(rule) {
        return pluralize2.addIrregularRule(rule[0], rule[1]);
      });
      [
        [/s?$/i, "s"],
        [/[^\u0000-\u007F]$/i, "$0"],
        [/([^aeiou]ese)$/i, "$1"],
        [/(ax|test)is$/i, "$1es"],
        [/(alias|[^aou]us|t[lm]as|gas|ris)$/i, "$1es"],
        [/(e[mn]u)s?$/i, "$1s"],
        [/([^l]ias|[aeiou]las|[ejzr]as|[iu]am)$/i, "$1"],
        [/(alumn|syllab|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i, "$1i"],
        [/(alumn|alg|vertebr)(?:a|ae)$/i, "$1ae"],
        [/(seraph|cherub)(?:im)?$/i, "$1im"],
        [/(her|at|gr)o$/i, "$1oes"],
        [/(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|automat|quor)(?:a|um)$/i, "$1a"],
        [/(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)(?:a|on)$/i, "$1a"],
        [/sis$/i, "ses"],
        [/(?:(kni|wi|li)fe|(ar|l|ea|eo|oa|hoo)f)$/i, "$1$2ves"],
        [/([^aeiouy]|qu)y$/i, "$1ies"],
        [/([^ch][ieo][ln])ey$/i, "$1ies"],
        [/(x|ch|ss|sh|zz)$/i, "$1es"],
        [/(matr|cod|mur|sil|vert|ind|append)(?:ix|ex)$/i, "$1ices"],
        [/\b((?:tit)?m|l)(?:ice|ouse)$/i, "$1ice"],
        [/(pe)(?:rson|ople)$/i, "$1ople"],
        [/(child)(?:ren)?$/i, "$1ren"],
        [/eaux$/i, "$0"],
        [/m[ae]n$/i, "men"],
        ["thou", "you"]
      ].forEach(function(rule) {
        return pluralize2.addPluralRule(rule[0], rule[1]);
      });
      [
        [/s$/i, ""],
        [/(ss)$/i, "$1"],
        [/(wi|kni|(?:after|half|high|low|mid|non|night|[^\w]|^)li)ves$/i, "$1fe"],
        [/(ar|(?:wo|[ae])l|[eo][ao])ves$/i, "$1f"],
        [/ies$/i, "y"],
        [/\b([pl]|zomb|(?:neck|cross)?t|coll|faer|food|gen|goon|group|lass|talk|goal|cut)ies$/i, "$1ie"],
        [/\b(mon|smil)ies$/i, "$1ey"],
        [/\b((?:tit)?m|l)ice$/i, "$1ouse"],
        [/(seraph|cherub)im$/i, "$1"],
        [/(x|ch|ss|sh|zz|tto|go|cho|alias|[^aou]us|t[lm]as|gas|(?:her|at|gr)o|[aeiou]ris)(?:es)?$/i, "$1"],
        [/(analy|diagno|parenthe|progno|synop|the|empha|cri|ne)(?:sis|ses)$/i, "$1sis"],
        [/(movie|twelve|abuse|e[mn]u)s$/i, "$1"],
        [/(test)(?:is|es)$/i, "$1is"],
        [/(alumn|syllab|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i, "$1us"],
        [/(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|quor)a$/i, "$1um"],
        [/(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)a$/i, "$1on"],
        [/(alumn|alg|vertebr)ae$/i, "$1a"],
        [/(cod|mur|sil|vert|ind)ices$/i, "$1ex"],
        [/(matr|append)ices$/i, "$1ix"],
        [/(pe)(rson|ople)$/i, "$1rson"],
        [/(child)ren$/i, "$1"],
        [/(eau)x?$/i, "$1"],
        [/men$/i, "man"]
      ].forEach(function(rule) {
        return pluralize2.addSingularRule(rule[0], rule[1]);
      });
      [
        // Singular words with no plurals.
        "adulthood",
        "advice",
        "agenda",
        "aid",
        "aircraft",
        "alcohol",
        "ammo",
        "analytics",
        "anime",
        "athletics",
        "audio",
        "bison",
        "blood",
        "bream",
        "buffalo",
        "butter",
        "carp",
        "cash",
        "chassis",
        "chess",
        "clothing",
        "cod",
        "commerce",
        "cooperation",
        "corps",
        "debris",
        "diabetes",
        "digestion",
        "elk",
        "energy",
        "equipment",
        "excretion",
        "expertise",
        "firmware",
        "flounder",
        "fun",
        "gallows",
        "garbage",
        "graffiti",
        "hardware",
        "headquarters",
        "health",
        "herpes",
        "highjinks",
        "homework",
        "housework",
        "information",
        "jeans",
        "justice",
        "kudos",
        "labour",
        "literature",
        "machinery",
        "mackerel",
        "mail",
        "media",
        "mews",
        "moose",
        "music",
        "mud",
        "manga",
        "news",
        "only",
        "personnel",
        "pike",
        "plankton",
        "pliers",
        "police",
        "pollution",
        "premises",
        "rain",
        "research",
        "rice",
        "salmon",
        "scissors",
        "series",
        "sewage",
        "shambles",
        "shrimp",
        "software",
        "species",
        "staff",
        "swine",
        "tennis",
        "traffic",
        "transportation",
        "trout",
        "tuna",
        "wealth",
        "welfare",
        "whiting",
        "wildebeest",
        "wildlife",
        "you",
        /pok[eé]mon$/i,
        // Regexes.
        /[^aeiou]ese$/i,
        // "chinese", "japanese"
        /deer$/i,
        // "deer", "reindeer"
        /fish$/i,
        // "fish", "blowfish", "angelfish"
        /measles$/i,
        /o[iu]s$/i,
        // "carnivorous"
        /pox$/i,
        // "chickpox", "smallpox"
        /sheep$/i
      ].forEach(pluralize2.addUncountableRule);
      return pluralize2;
    });
  }
});

// src/index.ts
import "@ibiz-template/runtime";

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/model-list-writer-base.mjs
var ModelListWriterBase = class {
  fillDSLList(iModelDSLGenEngineContext, src, dst) {
    return this.onFillDSLList(iModelDSLGenEngineContext, src, dst);
  }
  onFillDSLList(iModelDSLGenEngineContext, src, dst) {
    throw new Error("Method not implemented.");
  }
  fillDSL(iModelDSLGenEngineContext, src, dst) {
    return this.onFillDSL(iModelDSLGenEngineContext, src, dst);
  }
  onFillDSL(iModelDSLGenEngineContext, src, dst) {
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/appmenu/app-menu-model-list-writer.mjs
var AppMenuModelListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("app.appmenu.AppMenuModel", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/bi/app-bicube-list-writer.mjs
var AppBICubeListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("app.bi.AppBICube", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/bi/app-bicube-dimension-list-writer.mjs
var AppBICubeDimensionListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("app.bi.AppBICubeDimension", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/bi/app-bicube-hierarchy-list-writer.mjs
var AppBICubeHierarchyListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("app.bi.AppBICubeHierarchy", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/bi/app-bicube-level-list-writer.mjs
var AppBICubeLevelListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("app.bi.AppBICubeLevel", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/bi/app-bicube-measure-list-writer.mjs
var AppBICubeMeasureListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("app.bi.AppBICubeMeasure", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/bi/app-bireport-list-writer.mjs
var AppBIReportListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("app.bi.AppBIReport", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/bi/app-bireport-dimension-list-writer.mjs
var AppBIReportDimensionListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("app.bi.AppBIReportDimension", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/bi/app-bireport-measure-list-writer.mjs
var AppBIReportMeasureListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("app.bi.AppBIReportMeasure", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/bi/app-bischeme-list-writer.mjs
var AppBISchemeListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("app.bi.AppBIScheme", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/codelist/app-code-list-list-writer.mjs
var AppCodeListListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("app.codelist.AppCodeList", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/control/app-counter-list-writer.mjs
var AppCounterListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("app.control.AppCounter", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/control/app-counter-ref-list-writer.mjs
var AppCounterRefListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("app.control.AppCounterRef", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/control/app-portlet-list-writer.mjs
var AppPortletListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("app.control.AppPortlet", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/control/app-portlet-cat-list-writer.mjs
var AppPortletCatListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("app.control.AppPortletCat", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/dataentity/app-deacmode-list-writer.mjs
var AppDEACModeListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("dataentity.ac.DEACMode", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/dataentity/app-dedata-export-list-writer.mjs
var AppDEDataExportListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("dataentity.dataexport.DEDataExport", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/dataentity/app-dedata-import-list-writer.mjs
var AppDEDataImportListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("dataentity.dataimport.DEDataImport", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/dataentity/app-defield-list-writer.mjs
var AppDEFieldListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("app.dataentity.AppDEField2", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/dataentity/app-delogic-list-writer.mjs
var AppDELogicListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    switch (src["logicSubType"]) {
      case "DEFIELD":
        c.fillDSL("dataentity.logic.DEFLogic", src, dst);
        return;
    }
    c.fillDSL("dataentity.logic.DELogic", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/dataentity/app-demap-list-writer.mjs
var AppDEMapListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("dataentity.datamap.DEMap", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/dataentity/app-demethod-list-writer.mjs
var AppDEMethodListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("app.dataentity.AppDEMethod", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/dataentity/app-demethod-dto-list-writer.mjs
var AppDEMethodDTOListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("app.dataentity.AppDEMethodDTO", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/dataentity/app-demethod-dtofield-list-writer.mjs
var AppDEMethodDTOFieldListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("app.dataentity.AppDEMethodDTOField", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/dataentity/app-demethod-input-list-writer.mjs
var AppDEMethodInputListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("app.dataentity.AppDEMethodInput", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/dataentity/app-demethod-return-list-writer.mjs
var AppDEMethodReturnListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("app.dataentity.AppDEMethodReturn", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/dataentity/app-deprint-list-writer.mjs
var AppDEPrintListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("dataentity.print.DEPrint", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/dataentity/app-ders-list-writer.mjs
var AppDERSListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("app.dataentity.AppDERS2", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/dataentity/app-dereport-list-writer.mjs
var AppDEReportListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("dataentity.report.DEReport", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/dataentity/app-dereport-item-list-writer.mjs
var AppDEReportItemListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("dataentity.report.DEReportItem", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/dataentity/app-deuiaction-list-writer.mjs
var AppDEUIActionListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("dataentity.uiaction.DEUIAction", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/dataentity/app-deuiaction-group-list-writer.mjs
var AppDEUIActionGroupListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("dataentity.uiaction.DEUIActionGroup", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/dataentity/app-deuilogic-list-writer.mjs
var AppDEUILogicListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("dataentity.logic.DEViewLogic", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/dataentity/app-data-entity-list-writer.mjs
var AppDataEntityListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("app.dataentity.AppDataEntity", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/func/app-func-list-writer.mjs
var AppFuncListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("app.func.AppFunc", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/app-lan-list-writer.mjs
var AppLanListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("app.AppLan", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/app-method-dto-list-writer.mjs
var AppMethodDTOListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("app.AppMethodDTO", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/app-method-dtofield-list-writer.mjs
var AppMethodDTOFieldListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("app.AppMethodDTOField", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/app-resource-list-writer.mjs
var AppResourceListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("app.AppResource", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/app-util-page-list-writer.mjs
var AppUtilPageListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("app.AppUtilPage", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/application-logic-list-writer.mjs
var ApplicationLogicListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("app.ApplicationLogic", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/sub-app-ref-list-writer.mjs
var SubAppRefListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("app.SubAppRef", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/logic/app-uilogic-list-writer.mjs
var AppUILogicListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    switch (src["viewLogicType"]) {
      case "APP_NEWDATA":
        c.fillDSL("app.logic.BuiltinAppUINewDataLogic", src, dst);
        return;
      case "APP_OPENDATA":
        c.fillDSL("app.logic.BuiltinAppUIOpenDataLogic", src, dst);
        return;
    }
    c.fillDSL("app.logic.AppUILogic", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/logic/app-uilogic-ref-view-list-writer.mjs
var AppUILogicRefViewListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("app.logic.AppUILogicRefView", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/msg/app-msg-templ-list-writer.mjs
var AppMsgTemplListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("app.msg.AppMsgTempl", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/res/app-pfplugin-ref-list-writer.mjs
var AppPFPluginRefListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("app.res.AppPFPluginRef", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/res/app-sub-view-type-ref-list-writer.mjs
var AppSubViewTypeRefListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("app.res.AppSubViewTypeRef", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/theme/app-uitheme-list-writer.mjs
var AppUIThemeListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("app.theme.AppUITheme", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/util/app-util-list-writer.mjs
var AppUtilListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    switch (src["utilType"]) {
      case "DYNADASHBOARD":
        c.fillDSL("app.util.AppDynaDashboardUtil", src, dst);
        return;
      case "FILTERSTORAGE":
        c.fillDSL("app.util.AppFilterStorageUtil", src, dst);
        return;
    }
    c.fillDSL("app.util.AppUtil", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-deview-list-writer.mjs
var AppDEViewListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    switch (src["viewType"]) {
      case "DECALENDAREXPVIEW":
        c.fillDSL("app.view.AppDECalendarExplorerView", src, dst);
        return;
      case "DECALENDARVIEW":
      case "DECALENDARVIEW9":
        c.fillDSL("app.view.AppDECalendarView", src, dst);
        return;
      case "DECHARTEXPVIEW":
        c.fillDSL("app.view.AppDEChartExplorerView", src, dst);
        return;
      case "DECHARTVIEW":
      case "DECHARTVIEW9":
        c.fillDSL("app.view.AppDEChartView", src, dst);
        return;
      case "DECUSTOMVIEW":
        c.fillDSL("app.view.AppDECustomView", src, dst);
        return;
      case "DEDATAVIEW":
      case "DEDATAVIEW9":
        c.fillDSL("app.view.AppDEDataView", src, dst);
        return;
      case "DEDATAVIEWEXPVIEW":
        c.fillDSL("app.view.AppDEDataViewExplorerView", src, dst);
        return;
      case "DEEDITVIEW":
      case "DEEDITVIEW2":
      case "DEEDITVIEW3":
      case "DEEDITVIEW4":
      case "DEOPTVIEW":
        c.fillDSL("app.view.AppDEEditView", src, dst);
        return;
      case "DEEDITVIEW9":
        c.fillDSL("app.view.AppDEEditView9", src, dst);
        return;
      case "DEFORMPICKUPDATAVIEW":
        c.fillDSL("app.view.AppDEFormPickupDataView", src, dst);
        return;
      case "DEGANTTEXPVIEW":
        c.fillDSL("app.view.AppDEGanttExplorerView", src, dst);
        return;
      case "DEGANTTVIEW":
      case "DEGANTTVIEW9":
        c.fillDSL("app.view.AppDEGanttView", src, dst);
        return;
      case "DEGRIDEXPVIEW":
        c.fillDSL("app.view.AppDEGridExplorerView", src, dst);
        return;
      case "DEGRIDVIEW":
      case "DEGRIDVIEW2":
      case "DEGRIDVIEW4":
        c.fillDSL("app.view.AppDEGridView", src, dst);
        return;
      case "DEGRIDVIEW8":
        c.fillDSL("app.view.AppDEGridView8", src, dst);
        return;
      case "DEGRIDVIEW9":
        c.fillDSL("app.view.AppDEGridView9", src, dst);
        return;
      case "DEHTMLVIEW":
        c.fillDSL("app.view.AppDEHtmlView", src, dst);
        return;
      case "DEINDEXPICKUPDATAVIEW":
        c.fillDSL("app.view.AppDEIndexPickupDataView", src, dst);
        return;
      case "DEINDEXVIEW":
        c.fillDSL("app.view.AppDEIndexView", src, dst);
        return;
      case "DEKANBANVIEW":
      case "DEKANBANVIEW9":
        c.fillDSL("app.view.AppDEKanbanView", src, dst);
        return;
      case "DELISTEXPVIEW":
        c.fillDSL("app.view.AppDEListExplorerView", src, dst);
        return;
      case "DELISTVIEW":
      case "DELISTVIEW9":
        c.fillDSL("app.view.AppDEListView", src, dst);
        return;
      case "DEMAPEXPVIEW":
        c.fillDSL("app.view.AppDEMapExplorerView", src, dst);
        return;
      case "DEMAPVIEW":
      case "DEMAPVIEW9":
        c.fillDSL("app.view.AppDEMapView", src, dst);
        return;
      case "DEMDCUSTOMVIEW":
        c.fillDSL("app.view.AppDEMultiDataView", src, dst);
        return;
      case "DEMEDITVIEW9":
        c.fillDSL("app.view.AppDEMEditView", src, dst);
        return;
      case "DEMOBCALENDAREXPVIEW":
        c.fillDSL("app.view.AppDEMobCalendarExplorerView", src, dst);
        return;
      case "DEMOBCALENDARVIEW":
      case "DEMOBCALENDARVIEW9":
        c.fillDSL("app.view.AppDEMobCalendarView", src, dst);
        return;
      case "DEMOBCHARTEXPVIEW":
        c.fillDSL("app.view.AppDEMobChartExplorerView", src, dst);
        return;
      case "DEMOBCHARTVIEW":
      case "DEMOBCHARTVIEW9":
        c.fillDSL("app.view.AppDEMobChartView", src, dst);
        return;
      case "DEMOBCUSTOMVIEW":
        c.fillDSL("app.view.AppDEMobCustomView", src, dst);
        return;
      case "DEMOBDATAVIEW":
        c.fillDSL("app.view.AppDEMobDataView", src, dst);
        return;
      case "DEMOBDATAVIEWEXPVIEW":
        c.fillDSL("app.view.AppDEMobDataViewExplorerView", src, dst);
        return;
      case "DEMOBEDITVIEW":
      case "DEMOBEDITVIEW3":
      case "DEMOBEDITVIEW9":
      case "DEMOBOPTVIEW":
        c.fillDSL("app.view.AppDEMobEditView", src, dst);
        return;
      case "DEMOBFORMPICKUPMDVIEW":
      case "DEMOBINDEXPICKUPMDVIEW":
      case "DEMOBPICKUPMDVIEW":
        c.fillDSL("app.view.AppDEMobPickupMDView", src, dst);
        return;
      case "DEMOBGANTTEXPVIEW":
        c.fillDSL("app.view.AppDEMobGanttExplorerView", src, dst);
        return;
      case "DEMOBGANTTVIEW":
      case "DEMOBGANTTVIEW9":
        c.fillDSL("app.view.AppDEMobGanttView", src, dst);
        return;
      case "DEMOBHTMLVIEW":
        c.fillDSL("app.view.AppDEMobHtmlView", src, dst);
        return;
      case "DEMOBLISTEXPVIEW":
        c.fillDSL("app.view.AppDEMobListExplorerView", src, dst);
        return;
      case "DEMOBLISTVIEW":
        c.fillDSL("app.view.AppDEMobListView", src, dst);
        return;
      case "DEMOBMAPEXPVIEW":
        c.fillDSL("app.view.AppDEMobMapExplorerView", src, dst);
        return;
      case "DEMOBMAPVIEW":
      case "DEMOBMAPVIEW9":
        c.fillDSL("app.view.AppDEMobMapView", src, dst);
        return;
      case "DEMOBMDVIEW":
      case "DEMOBMDVIEW9":
        c.fillDSL("app.view.AppDEMobMDView", src, dst);
        return;
      case "DEMOBMEDITVIEW9":
        c.fillDSL("app.view.AppDEMobMEditView", src, dst);
        return;
      case "DEMOBMPICKUPVIEW":
        c.fillDSL("app.view.AppDEMobMPickupView", src, dst);
        return;
      case "DEMOBPANELVIEW":
      case "DEMOBPANELVIEW9":
        c.fillDSL("app.view.AppDEMobPanelView", src, dst);
        return;
      case "DEMOBPICKUPLISTVIEW":
        c.fillDSL("app.view.AppDEMobPickupListView", src, dst);
        return;
      case "DEMOBPICKUPTREEVIEW":
        c.fillDSL("app.view.AppDEMobPickupTreeView", src, dst);
        return;
      case "DEMOBPICKUPVIEW":
        c.fillDSL("app.view.AppDEMobPickupView", src, dst);
        return;
      case "DEMOBPORTALVIEW":
      case "DEMOBPORTALVIEW9":
        c.fillDSL("app.view.AppDEMobDashboardView", src, dst);
        return;
      case "DEMOBREDIRECTVIEW":
        c.fillDSL("app.view.AppDEMobRedirectView", src, dst);
        return;
      case "DEMOBREPORTVIEW":
        c.fillDSL("app.view.AppDEMobReportView", src, dst);
        return;
      case "DEMOBTABEXPVIEW":
      case "DEMOBTABEXPVIEW9":
        c.fillDSL("app.view.AppDEMobTabExplorerView", src, dst);
        return;
      case "DEMOBTABSEARCHVIEW":
      case "DEMOBTABSEARCHVIEW9":
        c.fillDSL("app.view.AppDEMobTabSearchView", src, dst);
        return;
      case "DEMOBTREEEXPVIEW":
      case "DEMOBTREEEXPVIEW9":
        c.fillDSL("app.view.AppDEMobTreeExplorerView", src, dst);
        return;
      case "DEMOBTREEVIEW":
        c.fillDSL("app.view.AppDEMobTreeView", src, dst);
        return;
      case "DEMOBWFACTIONVIEW":
        c.fillDSL("app.view.AppDEMobWFActionView", src, dst);
        return;
      case "DEMOBWFDATAREDIRECTVIEW":
        c.fillDSL("app.view.AppDEMobWFDataRedirectView", src, dst);
        return;
      case "DEMOBWFDYNAACTIONVIEW":
        c.fillDSL("app.view.AppDEMobWFDynaActionView", src, dst);
        return;
      case "DEMOBWFDYNAEDITVIEW":
      case "DEMOBWFDYNAEDITVIEW3":
        c.fillDSL("app.view.AppDEMobWFDynaEditView", src, dst);
        return;
      case "DEMOBWFDYNAEXPMDVIEW":
        c.fillDSL("app.view.AppDEMobWFDynaExpMDView", src, dst);
        return;
      case "DEMOBWFDYNASTARTVIEW":
        c.fillDSL("app.view.AppDEMobWFDynaStartView", src, dst);
        return;
      case "DEMOBWFEDITVIEW":
      case "DEMOBWFEDITVIEW3":
        c.fillDSL("app.view.AppDEMobWFEditView", src, dst);
        return;
      case "DEMOBWFMDVIEW":
        c.fillDSL("app.view.AppDEMobWFMDView", src, dst);
        return;
      case "DEMOBWFPROXYRESULTVIEW":
        c.fillDSL("app.view.AppDEMobWFProxyResultView", src, dst);
        return;
      case "DEMOBWFPROXYSTARTVIEW":
        c.fillDSL("app.view.AppDEMobWFProxyStartView", src, dst);
        return;
      case "DEMOBWFSTARTVIEW":
        c.fillDSL("app.view.AppDEMobWFStartView", src, dst);
        return;
      case "DEMOBWIZARDVIEW":
        c.fillDSL("app.view.AppDEMobWizardView", src, dst);
        return;
      case "DEMPICKUPVIEW":
      case "DEMPICKUPVIEW2":
        c.fillDSL("app.view.AppDEMPickupView", src, dst);
        return;
      case "DEPANELVIEW":
      case "DEPANELVIEW9":
        c.fillDSL("app.view.AppDEPanelView", src, dst);
        return;
      case "DEPICKUPDATAVIEW":
        c.fillDSL("app.view.AppDEPickupDataView", src, dst);
        return;
      case "DEPICKUPGRIDVIEW":
        c.fillDSL("app.view.AppDEPickupGridView", src, dst);
        return;
      case "DEPICKUPTREEVIEW":
        c.fillDSL("app.view.AppDEPickupTreeView", src, dst);
        return;
      case "DEPICKUPVIEW":
      case "DEPICKUPVIEW2":
      case "DEPICKUPVIEW3":
        c.fillDSL("app.view.AppDEPickupView", src, dst);
        return;
      case "DEPORTALVIEW":
      case "DEPORTALVIEW9":
        c.fillDSL("app.view.AppDEDashboardView", src, dst);
        return;
      case "DEREDIRECTVIEW":
        c.fillDSL("app.view.AppDERedirectView", src, dst);
        return;
      case "DEREPORTVIEW":
        c.fillDSL("app.view.AppDEReportView", src, dst);
        return;
      case "DESUBAPPREFVIEW":
        c.fillDSL("app.view.AppDESubAppRefView", src, dst);
        return;
      case "DETABEXPVIEW":
      case "DETABEXPVIEW9":
        c.fillDSL("app.view.AppDETabExplorerView", src, dst);
        return;
      case "DETABSEARCHVIEW":
      case "DETABSEARCHVIEW9":
        c.fillDSL("app.view.AppDETabSearchView", src, dst);
        return;
      case "DETREEEXPVIEW":
      case "DETREEEXPVIEW3":
        c.fillDSL("app.view.AppDETreeExplorerView", src, dst);
        return;
      case "DETREEEXPVIEW2":
        c.fillDSL("app.view.AppDETreeExplorerView2", src, dst);
        return;
      case "DETREEGRIDEXVIEW":
      case "DETREEGRIDEXVIEW9":
        c.fillDSL("app.view.AppDETreeGridExView", src, dst);
        return;
      case "DETREEGRIDVIEW":
      case "DETREEGRIDVIEW9":
        c.fillDSL("app.view.AppDETreeGridView", src, dst);
        return;
      case "DETREEVIEW":
      case "DETREEVIEW9":
        c.fillDSL("app.view.AppDETreeView", src, dst);
        return;
      case "DEWFACTIONVIEW":
        c.fillDSL("app.view.AppDEWFActionView", src, dst);
        return;
      case "DEWFDATAREDIRECTVIEW":
        c.fillDSL("app.view.AppDEWFDataRedirectView", src, dst);
        return;
      case "DEWFDYNAACTIONVIEW":
        c.fillDSL("app.view.AppDEWFDynaActionView", src, dst);
        return;
      case "DEWFDYNAEDITVIEW":
      case "DEWFDYNAEDITVIEW3":
        c.fillDSL("app.view.AppDEWFDynaEditView", src, dst);
        return;
      case "DEWFDYNAEXPGRIDVIEW":
        c.fillDSL("app.view.AppDEWFDynaExpGridView", src, dst);
        return;
      case "DEWFDYNASTARTVIEW":
        c.fillDSL("app.view.AppDEWFDynaStartView", src, dst);
        return;
      case "DEWFEDITPROXYDATAVIEW":
        c.fillDSL("app.view.AppDEWFEditProxyDataView", src, dst);
        return;
      case "DEWFEDITVIEW":
      case "DEWFEDITVIEW2":
      case "DEWFEDITVIEW3":
      case "DEWFEDITVIEW9":
        c.fillDSL("app.view.AppDEWFEditView", src, dst);
        return;
      case "DEWFEXPVIEW":
        c.fillDSL("app.view.AppDEWFExplorerView", src, dst);
        return;
      case "DEWFGRIDVIEW":
        c.fillDSL("app.view.AppDEWFGridView", src, dst);
        return;
      case "DEWFPROXYDATAREDIRECTVIEW":
        c.fillDSL("app.view.AppDEWFProxyDataRedirectView", src, dst);
        return;
      case "DEWFPROXYDATAVIEW":
        c.fillDSL("app.view.AppDEWFProxyDataView", src, dst);
        return;
      case "DEWFPROXYRESULTVIEW":
        c.fillDSL("app.view.AppDEWFProxyResultView", src, dst);
        return;
      case "DEWFPROXYSTARTVIEW":
        c.fillDSL("app.view.AppDEWFProxyStartView", src, dst);
        return;
      case "DEWFSTARTVIEW":
        c.fillDSL("app.view.AppDEWFStartView", src, dst);
        return;
      case "DEWIZARDVIEW":
        c.fillDSL("app.view.AppDEWizardView", src, dst);
        return;
    }
    c.fillDSL("app.view.AppDEView", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-util-view-list-writer.mjs
var AppUtilViewListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    switch (src["viewType"]) {
      case "APPERRORVIEW":
        c.fillDSL("app.view.AppErrorView", src, dst);
        return;
      case "APPFUNCPICKUPVIEW":
        c.fillDSL("app.view.AppFuncPickupView", src, dst);
        return;
    }
    c.fillDSL("app.view.AppUtilView", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-view-list-writer.mjs
var AppViewListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    switch (src["viewType"]) {
      case "APPDATAUPLOADVIEW":
      case "APPERRORVIEW":
      case "APPFILEUPLOADVIEW":
      case "APPFUNCPICKUPVIEW":
      case "APPLOGINVIEW":
      case "APPLOGOUTVIEW":
      case "APPPICUPLOADVIEW":
      case "APPREDIRECTVIEW":
      case "APPSTARTVIEW":
      case "APPUTILVIEW":
      case "APPWELCOMEVIEW":
      case "APPWFADDSTEPBEFOREVIEW":
      case "APPWFREDIRECTVIEW":
      case "APPWFSENDBACKVIEW":
      case "APPWFSTEPACTORVIEW":
      case "APPWFSTEPDATAVIEW":
      case "APPWFSTEPTRACEVIEW":
      case "APPWFSUPPLYINFOVIEW":
      case "APPWFTAKEADVICEVIEW":
        c.fillDSL("app.view.AppUtilView[]", src, dst);
        return;
      case "APPDEVIEW":
        c.fillDSL("app.view.AppDEView[]", src, dst);
        return;
      case "APPINDEXVIEW":
        c.fillDSL("app.view.AppIndexView", src, dst);
        return;
      case "APPPANELVIEW":
        c.fillDSL("app.view.AppPanelView", src, dst);
        return;
      case "APPPORTALVIEW":
        c.fillDSL("app.view.AppPortalView", src, dst);
        return;
    }
    c.fillDSL("app.view.AppDEView[]", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-view-engine-list-writer.mjs
var AppViewEngineListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("app.view.AppDEViewEngine", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-view-logic-list-writer.mjs
var AppViewLogicListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("app.view.AppViewLogic", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-view-msg-list-writer.mjs
var AppViewMsgListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    switch (src["dynamicMode"]) {
      case 1:
        c.fillDSL("app.view.AppDEDataSetViewMsg", src, dst);
        return;
    }
    c.fillDSL("app.view.AppViewMsg", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-view-msg-group-list-writer.mjs
var AppViewMsgGroupListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("app.view.AppViewMsgGroup", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-view-msg-group-detail-list-writer.mjs
var AppViewMsgGroupDetailListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("app.view.AppViewMsgGroupDetail", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-view-nav-context-list-writer.mjs
var AppViewNavContextListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("app.view.AppViewNavContext", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-view-nav-param-list-writer.mjs
var AppViewNavParamListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("app.view.AppViewNavParam", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-view-param-list-writer.mjs
var AppViewParamListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("app.view.AppViewParam", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-view-ref-list-writer.mjs
var AppViewRefListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("app.view.AppViewRef", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/wf/app-wf-list-writer.mjs
var AppWFListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("app.wf.AppWF", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/wf/app-wfde-list-writer.mjs
var AppWFDEListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("app.wf.AppWFDE", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/wf/app-wfver-list-writer.mjs
var AppWFVerListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("app.wf.AppWFVer", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/codelist/code-item-list-writer.mjs
var CodeItemListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("codelist.CodeItem", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/calendar/sys-calendar-item-list-writer.mjs
var SysCalendarItemListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("control.calendar.SysCalendarItem", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/chart/chart-angle-axis-list-writer.mjs
var ChartAngleAxisListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("control.chart.DEChartPolarAngleAxis", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/chart/chart-calendar-list-writer.mjs
var ChartCalendarListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("control.chart.DEChartCalendar", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/chart/chart-coordinate-system-list-writer.mjs
var ChartCoordinateSystemListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    switch (src["type"]) {
      case "CALENDAR":
        c.fillDSL("control.chart.DEChartCoordinateSystemCalendar", src, dst);
        return;
      case "MAP":
        c.fillDSL("control.chart.DEChartCoordinateSystemGeo", src, dst);
        return;
      case "NONE":
        c.fillDSL("control.chart.DEChartCoordinateSystemNone", src, dst);
        return;
      case "PARALLEL":
        c.fillDSL("control.chart.DEChartCoordinateSystemParallel", src, dst);
        return;
      case "POLAR":
        c.fillDSL("control.chart.DEChartCoordinateSystemPolar", src, dst);
        return;
      case "RADAR":
        c.fillDSL("control.chart.DEChartCoordinateSystemRadar", src, dst);
        return;
      case "SINGLE":
        c.fillDSL("control.chart.DEChartCoordinateSystemSingle", src, dst);
        return;
      case "XY":
        c.fillDSL("control.chart.DEChartCoordinateSystemCartesian2D", src, dst);
        return;
    }
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/chart/chart-data-set-list-writer.mjs
var ChartDataSetListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("control.chart.DEChartDataSet", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/chart/chart-data-set-field-list-writer.mjs
var ChartDataSetFieldListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("control.chart.DEChartDataSetField", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/chart/chart-data-set-group-list-writer.mjs
var ChartDataSetGroupListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("control.chart.DEChartDataSetGroup", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/chart/chart-geo-list-writer.mjs
var ChartGeoListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("control.chart.DEChartGeo", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/chart/chart-grid-list-writer.mjs
var ChartGridListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("control.chart.DEChartGrid", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/chart/chart-parallel-list-writer.mjs
var ChartParallelListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("control.chart.DEChartParallel", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/chart/chart-parallel-axis-list-writer.mjs
var ChartParallelAxisListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("control.chart.DEChartParallelAxis", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/chart/chart-polar-list-writer.mjs
var ChartPolarListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("control.chart.DEChartPolar", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/chart/chart-polar-angle-axis-list-writer.mjs
var ChartPolarAngleAxisListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("control.chart.DEChartPolarAngleAxis", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/chart/chart-polar-radius-axis-list-writer.mjs
var ChartPolarRadiusAxisListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("control.chart.DEChartPolarRadiusAxis", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/chart/chart-radar-list-writer.mjs
var ChartRadarListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("control.chart.DEChartRadar", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/chart/chart-radius-axis-list-writer.mjs
var ChartRadiusAxisListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("control.chart.DEChartPolarRadiusAxis", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/chart/chart-series-encode-list-writer.mjs
var ChartSeriesEncodeListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    switch (src["type"]) {
      case "NONE":
        c.fillDSL("control.chart.DEChartSeriesCSNoneEncode", src, dst);
        return;
      case "XY":
        c.fillDSL("control.chart.DEChartSeriesCSCartesian2DEncode", src, dst);
        return;
    }
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/chart/chart-single-list-writer.mjs
var ChartSingleListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("control.chart.DEChartSingle", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/chart/chart-single-axis-list-writer.mjs
var ChartSingleAxisListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("control.chart.DEChartSingleAxis", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/chart/chart-xaxis-list-writer.mjs
var ChartXAxisListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("control.chart.DEChartGridXAxis", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/chart/chart-yaxis-list-writer.mjs
var ChartYAxisListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("control.chart.DEChartGridYAxis", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/chart/dechart-data-grid-list-writer.mjs
var DEChartDataGridListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("control.chart.DEChartDataGrid", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/chart/dechart-legend-list-writer.mjs
var DEChartLegendListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("control.chart.DEChartLegend", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/chart/dechart-series-list-writer.mjs
var DEChartSeriesListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    switch (src["seriesType"]) {
      case "area":
      case "line":
        c.fillDSL("control.chart.DEChartSeriesLine", src, dst);
        return;
      case "bar":
      case "bar3d":
      case "column":
        c.fillDSL("control.chart.DEChartSeriesBar", src, dst);
        return;
      case "candlestick":
        c.fillDSL("control.chart.DEChartSeriesCandlestick", src, dst);
        return;
      case "custom":
        c.fillDSL("control.chart.DEChartSeriesCustom", src, dst);
        return;
      case "funnel":
        c.fillDSL("control.chart.DEChartSeriesFunnel", src, dst);
        return;
      case "gauge":
        c.fillDSL("control.chart.DEChartSeriesGauge", src, dst);
        return;
      case "map":
        c.fillDSL("control.chart.DEChartSeriesMap", src, dst);
        return;
      case "pie":
      case "pie3d":
        c.fillDSL("control.chart.DEChartSeriesPie", src, dst);
        return;
      case "radar":
        c.fillDSL("control.chart.DEChartSeriesRadar", src, dst);
        return;
      case "scatter":
        c.fillDSL("control.chart.DEChartSeriesScatter", src, dst);
        return;
    }
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/chart/dechart-title-list-writer.mjs
var DEChartTitleListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("control.chart.DEChartTitle", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/drctrl/dedrbar-group-list-writer.mjs
var DEDRBarGroupListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("control.drctrl.DEDRBarGroup", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/drctrl/dedrctrl-item-list-writer.mjs
var DEDRCtrlItemListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("control.drctrl.DEDRBarItem", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/drctrl/dedrtab-page-list-writer.mjs
var DEDRTabPageListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("control.drctrl.DEDRTabPage", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/dashboard/dbportlet-part-list-writer.mjs
var DBPortletPartListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    switch (src["portletType"]) {
      case "APPMENU":
        c.fillDSL("control.dashboard.DBAppMenuPortletPart", src, dst);
        return;
      case "CHART":
        c.fillDSL("control.dashboard.DBChartPortletPart", src, dst);
        return;
      case "CONTAINER":
        c.fillDSL("control.dashboard.DBContainerPortletPart", src, dst);
        return;
      case "CUSTOM":
        c.fillDSL("control.dashboard.DBCustomPortletPart", src, dst);
        return;
      case "FILTER":
        c.fillDSL("control.dashboard.DBFilterPortletPart", src, dst);
        return;
      case "HTML":
        c.fillDSL("control.dashboard.DBHtmlPortletPart", src, dst);
        return;
      case "LIST":
        c.fillDSL("control.dashboard.DBListPortletPart", src, dst);
        return;
      case "RAWITEM":
        c.fillDSL("control.dashboard.DBRawItemPortletPart", src, dst);
        return;
      case "REPORT":
        c.fillDSL("control.dashboard.DBReportPortletPart", src, dst);
        return;
      case "TOOLBAR":
        c.fillDSL("control.dashboard.DBToolbarPortletPart", src, dst);
        return;
      case "VIEW":
        c.fillDSL("control.dashboard.DBViewPortletPart", src, dst);
        return;
    }
    c.fillDSL("control.dashboard.DBPortletPart", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/dataview/dedata-view-data-item-list-writer.mjs
var DEDataViewDataItemListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("control.dataview.DEDataViewDataItem", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/dataview/dedata-view-item-list-writer.mjs
var DEDataViewItemListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("control.dataview.DEDataViewItem", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/expbar/tab-exp-page-list-writer.mjs
var TabExpPageListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("control.viewpanel.DETabViewPanel", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/form/deedit-form-list-writer.mjs
var DEEditFormListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("control.form.DEEditForm", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/form/defdcat-group-logic-list-writer.mjs
var DEFDCatGroupLogicListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("control.form.DEFDCatGroupLogic", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/form/defdlogic-list-writer.mjs
var DEFDLogicListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    switch (src["logicType"]) {
      case "GROUP":
        c.fillDSL("control.form.DEFDGroupLogic", src, dst);
        return;
      case "SINGLE":
        c.fillDSL("control.form.DEFDSingleLogic", src, dst);
        return;
    }
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/form/defiupdate-detail-list-writer.mjs
var DEFIUpdateDetailListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("control.form.DEFIUpdateDetail", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/form/deform-button-list2-writer.mjs
var DEFormButtonList2Writer = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("control.form.DEFormButton", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/form/deform-detail-list-writer.mjs
var DEFormDetailListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    switch (src["detailType"]) {
      case "BUTTON":
        c.fillDSL("control.form.DEFormButton", src, dst);
        return;
      case "BUTTONLIST":
        c.fillDSL("control.form.DEFormButtonList", src, dst);
        return;
      case "DRUIPART":
        c.fillDSL("control.form.DEFormDRUIPart", src, dst);
        return;
      case "FORMITEM":
        c.fillDSL("control.form.DEFormItem", src, dst);
        return;
      case "FORMITEMEX":
        c.fillDSL("control.form.DEEditFormItemEx", src, dst);
        return;
      case "FORMPAGE":
        c.fillDSL("control.form.DEFormPage", src, dst);
        return;
      case "GROUPPANEL":
        c.fillDSL("control.form.DEFormGroupPanel", src, dst);
        return;
      case "IFRAME":
        c.fillDSL("control.form.DEFormIFrame", src, dst);
        return;
      case "MDCTRL":
        c.fillDSL("control.form.DEFormMDCtrl", src, dst);
        return;
      case "RAWITEM":
        c.fillDSL("control.form.DEFormRawItem", src, dst);
        return;
      case "TABPAGE":
        c.fillDSL("control.form.DEFormTabPage", src, dst);
        return;
      case "TABPANEL":
        c.fillDSL("control.form.DEFormTabPanel", src, dst);
        return;
      case "USERCONTROL":
        c.fillDSL("control.form.DEFormUserControl", src, dst);
        return;
    }
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/form/deform-item-list-writer.mjs
var DEFormItemListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("control.form.DEFormItem", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/form/deform-item-update-list-writer.mjs
var DEFormItemUpdateListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("control.form.DEFormItemUpdate", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/form/deform-item-vr-list-writer.mjs
var DEFormItemVRListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("control.form.DEFormItemVR", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/form/deform-page-list-writer.mjs
var DEFormPageListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("control.form.DEFormPage", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/form/deform-tab-page-list-writer.mjs
var DEFormTabPageListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("control.form.DEFormTabPage", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/grid/degeiupdate-detail-list-writer.mjs
var DEGEIUpdateDetailListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("control.grid.DEGEIUpdateDetail", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/grid/degrid-column-list-writer.mjs
var DEGridColumnListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    switch (src["columnType"]) {
      case "DEFGRIDCOLUMN":
        c.fillDSL("control.grid.DEGridFieldColumn", src, dst);
        return;
      case "GROUPGRIDCOLUMN":
        c.fillDSL("control.grid.DEGridGroupColumn", src, dst);
        return;
      case "UAGRIDCOLUMN":
        c.fillDSL("control.grid.DEGridUAColumn", src, dst);
        return;
    }
    c.fillDSL("control.grid.DEGridFieldColumn", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/grid/degrid-data-item-list-writer.mjs
var DEGridDataItemListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("control.grid.DEGridDataItem", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/grid/degrid-edit-item-list-writer.mjs
var DEGridEditItemListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("control.grid.HiddenDEGridEditItem", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/grid/degrid-edit-item-update-list-writer.mjs
var DEGridEditItemUpdateListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("control.grid.DEGridEditItemUpdate", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/grid/degrid-edit-item-vr-list-writer.mjs
var DEGridEditItemVRListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("control.grid.DEGridEditItemVR", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/control-list-writer.mjs
var ControlListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    switch (src["controlType"]) {
      case "APPMENU":
        c.fillDSL("control.menu.AppMenu", src, dst);
        return;
      case "CALENDAR":
        c.fillDSL("control.calendar.SysCalendar", src, dst);
        return;
      case "CALENDAREXPBAR":
        c.fillDSL("control.expbar.CalendarExpBar", src, dst);
        return;
      case "CAPTIONBAR":
        c.fillDSL("control.captionbar.CaptionBar", src, dst);
        return;
      case "CHART":
        c.fillDSL("control.chart.DEChart", src, dst);
        return;
      case "CHARTEXPBAR":
        c.fillDSL("control.expbar.ChartExpBar", src, dst);
        return;
      case "CONTEXTMENU":
        c.fillDSL("control.toolbar.DEContextMenu", src, dst);
        return;
      case "CUSTOM":
        c.fillDSL("control.custom.CustomControl", src, dst);
        return;
      case "DASHBOARD":
        c.fillDSL("control.dashboard.SysDashboard", src, dst);
        return;
      case "DATAINFOBAR":
        c.fillDSL("control.datainfobar.DataInfoBar", src, dst);
        return;
      case "DATAVIEW":
        c.fillDSL("control.dataview.DEDataView", src, dst);
        return;
      case "DATAVIEWEXPBAR":
        c.fillDSL("control.expbar.DataViewExpBar", src, dst);
        return;
      case "DRBAR":
        c.fillDSL("control.drctrl.DEDRBar", src, dst);
        return;
      case "DRTAB":
        c.fillDSL("control.drctrl.DEDRTab", src, dst);
        return;
      case "EXPBAR":
        c.fillDSL("control.expbar.ExpBar", src, dst);
        return;
      case "FORM":
        c.fillDSL("control.form.DEEditForm", src, dst);
        return;
      case "GANTT":
        c.fillDSL("control.tree.DEGantt", src, dst);
        return;
      case "GANTTEXPBAR":
        c.fillDSL("control.expbar.GanttExpBar", src, dst);
        return;
      case "GRID":
        c.fillDSL("control.grid.DEGrid", src, dst);
        return;
      case "GRIDEXPBAR":
        c.fillDSL("control.expbar.GridExpBar", src, dst);
        return;
      case "KANBAN":
        c.fillDSL("control.dataview.DEKanban", src, dst);
        return;
      case "LIST":
        c.fillDSL("control.list.DEList", src, dst);
        return;
      case "LISTEXPBAR":
        c.fillDSL("control.expbar.ListExpBar", src, dst);
        return;
      case "MAP":
        c.fillDSL("control.map.SysMap", src, dst);
        return;
      case "MAPEXPBAR":
        c.fillDSL("control.expbar.MapExpBar", src, dst);
        return;
      case "MOBMDCTRL":
        c.fillDSL("control.list.DEMobMDCtrl", src, dst);
        return;
      case "MULTIEDITVIEWPANEL":
        c.fillDSL("control.grid.DEMultiEditViewPanel", src, dst);
        return;
      case "PANEL":
        c.fillDSL("control.panel.SysPanel", src, dst);
        return;
      case "PICKUPVIEWPANEL":
        c.fillDSL("control.viewpanel.DEPickupViewPanel", src, dst);
        return;
      case "PORTLET":
        c.fillDSL("control.dashboard.DBPortletPart[]", src, dst);
        return;
      case "REPORTPANEL":
        c.fillDSL("control.reportpanel.DEReportPanel", src, dst);
        return;
      case "SEARCHBAR":
        c.fillDSL("control.searchbar.SysSearchBar", src, dst);
        return;
      case "SEARCHFORM":
        c.fillDSL("control.form.DESearchForm", src, dst);
        return;
      case "STATEWIZARDPANEL":
        c.fillDSL("control.wizardpanel.DEStateWizardPanel", src, dst);
        return;
      case "TABEXPPANEL":
        c.fillDSL("control.expbar.TabExpPanel", src, dst);
        return;
      case "TABVIEWPANEL":
        c.fillDSL("control.viewpanel.DETabViewPanel", src, dst);
        return;
      case "TOOLBAR":
        c.fillDSL("control.toolbar.DEToolbar", src, dst);
        return;
      case "TREEEXPBAR":
        c.fillDSL("control.expbar.TreeExpBar", src, dst);
        return;
      case "TREEGRID":
        c.fillDSL("control.grid.DETreeGrid", src, dst);
        return;
      case "TREEGRIDEX":
        c.fillDSL("control.tree.DETreeGridEx", src, dst);
        return;
      case "TREEVIEW":
        c.fillDSL("control.tree.DETree", src, dst);
        return;
      case "VIEWLAYOUTPANEL":
        c.fillDSL("control.panel.SysViewLayoutPanel", src, dst);
        return;
      case "VIEWPANEL":
        c.fillDSL("control.viewpanel.DEViewPanel", src, dst);
        return;
      case "WFEXPBAR":
        c.fillDSL("control.expbar.WFExpBar", src, dst);
        return;
      case "WIZARDPANEL":
        c.fillDSL("control.wizardpanel.DEWizardPanel", src, dst);
        return;
    }
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/control-action-list-writer.mjs
var ControlActionListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("control.ajax.AjaxControlHandlerAction", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/control-attribute-list-writer.mjs
var ControlAttributeListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("control.ControlAttribute", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/control-logic-list-writer.mjs
var ControlLogicListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("control.ControlLogic", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/control-nav-context-list-writer.mjs
var ControlNavContextListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("control.ControlNavContext", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/control-nav-param-list-writer.mjs
var ControlNavParamListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("control.ControlNavParam", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/control-param-list-writer.mjs
var ControlParamListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("control.ControlParam", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/control-render-list-writer.mjs
var ControlRenderListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("control.ControlRender", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/editor-list-writer.mjs
var EditorListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    switch (src["editorType"]) {
      case "AC":
      case "AC_FS":
      case "AC_FS_NOBUTTON":
      case "AC_NOBUTTON":
        c.fillDSL("control.editor.AutoComplete", src, dst);
        return;
      case "ADDRESSPICKUP":
      case "ADDRESSPICKUP_AC":
        c.fillDSL("control.editor.MailAddress", src, dst);
        return;
      case "ARRAY":
      case "MOBARRAY":
        c.fillDSL("control.editor.Array", src, dst);
        return;
      case "CHECKBOX":
      case "MOBSWITCH":
      case "SWITCH":
        c.fillDSL("control.editor.CheckBox", src, dst);
        return;
      case "CHECKBOXLIST":
      case "MOBCHECKLIST":
        c.fillDSL("control.editor.CheckBoxList", src, dst);
        return;
      case "CODE":
      case "MOBCODE":
        c.fillDSL("control.editor.Code", src, dst);
        return;
      case "COLORPICKER":
      case "MOBCOLORPICKER":
        c.fillDSL("control.editor.ColorPicker", src, dst);
        return;
      case "DATEPICKER":
      case "DATEPICKEREX":
      case "DATEPICKEREX_HOUR":
      case "DATEPICKEREX_MINUTE":
      case "DATEPICKEREX_NODAY":
      case "DATEPICKEREX_NODAY_NOSECOND":
      case "DATEPICKEREX_NOTIME":
      case "DATEPICKEREX_SECOND":
      case "MOBDATE":
        c.fillDSL("control.editor.DatePicker", src, dst);
        return;
      case "DATERANGE":
      case "MOBDATERANGE":
        c.fillDSL("control.editor.DateRange", src, dst);
        return;
      case "DROPDOWNLIST":
      case "DROPDOWNLIST_100":
      case "MOBDROPDOWNLIST":
        c.fillDSL("control.editor.DropDownList", src, dst);
        return;
      case "FILEUPLOADER":
      case "FILEUPLOADERONE":
      case "MOBMULTIFILEUPLOAD":
      case "MOBSINGLEFILEUPLOAD":
        c.fillDSL("control.editor.FileUploader", src, dst);
        return;
      case "HIDDEN":
        c.fillDSL("control.editor.Hidden", src, dst);
        return;
      case "HTMLEDITOR":
      case "MOBHTMLTEXT":
        c.fillDSL("control.editor.Html", src, dst);
        return;
      case "IPADDRESSTEXTBOX":
        c.fillDSL("control.editor.IPAddress", src, dst);
        return;
      case "LISTBOX":
        c.fillDSL("control.editor.ListBox", src, dst);
        return;
      case "LISTBOXPICKUP":
        c.fillDSL("control.editor.ListBoxPicker", src, dst);
        return;
      case "MAPPICKER":
      case "MOBMAPPICKER":
        c.fillDSL("control.editor.MapPicker", src, dst);
        return;
      case "MARKDOWN":
      case "MOBMARKDOWN":
        c.fillDSL("control.editor.Markdown", src, dst);
        return;
      case "MDROPDOWNLIST":
        c.fillDSL("control.editor.MDropDownList", src, dst);
        return;
      case "MOBMPICKER":
        c.fillDSL("control.editor.MPicker", src, dst);
        return;
      case "MOBNUMBER":
      case "NUMBER":
        c.fillDSL("control.editor.NumberEditor", src, dst);
        return;
      case "MOBNUMBERRANGE":
      case "NUMBERRANGE":
        c.fillDSL("control.editor.NumberRange", src, dst);
        return;
      case "MOBPASSWORD":
      case "PASSWORD":
        c.fillDSL("control.editor.Password", src, dst);
        return;
      case "MOBPICKER":
      case "MOBPICKER_DROPDOWNVIEW":
      case "PICKER":
      case "PICKEREX_DROPDOWNVIEW":
      case "PICKEREX_DROPDOWNVIEW_LINK":
      case "PICKEREX_LINK":
      case "PICKEREX_LINKONLY":
      case "PICKEREX_NOAC":
      case "PICKEREX_NOAC_LINK":
      case "PICKEREX_NOBUTTON":
      case "PICKEREX_TRIGGER":
      case "PICKEREX_TRIGGER_LINK":
        c.fillDSL("control.editor.Picker", src, dst);
        return;
      case "MOBPICTURE":
      case "MOBPICTURELIST":
      case "PICTURE":
      case "PICTURE_ONE":
        c.fillDSL("control.editor.Picture", src, dst);
        return;
      case "MOBRADIOLIST":
      case "RADIOBUTTONLIST":
        c.fillDSL("control.editor.RadioButtonList", src, dst);
        return;
      case "MOBRATING":
      case "RATING":
        c.fillDSL("control.editor.Rating", src, dst);
        return;
      case "MOBSLIDER":
      case "SLIDER":
        c.fillDSL("control.editor.Slider", src, dst);
        return;
      case "MOBSTEPPER":
      case "STEPPER":
        c.fillDSL("control.editor.Stepper", src, dst);
        return;
      case "MOBTEXT":
      case "TEXTBOX":
        c.fillDSL("control.editor.TextBox", src, dst);
        return;
      case "MOBTEXTAREA":
      case "TEXTAREA":
      case "TEXTAREA_10":
        c.fillDSL("control.editor.TextArea", src, dst);
        return;
      case "OFFICEEDITOR":
        c.fillDSL("control.editor.Office", src, dst);
        return;
      case "OFFICEEDITOR2":
        c.fillDSL("control.editor.Office2", src, dst);
        return;
      case "PICKUPVIEW":
        c.fillDSL("control.editor.PickupView", src, dst);
        return;
      case "PREDEFINED":
        c.fillDSL("control.editor.Predefined", src, dst);
        return;
      case "RAW":
        c.fillDSL("control.editor.Raw", src, dst);
        return;
      case "SPAN":
      case "SPANEX":
      case "SPAN_LINK":
        c.fillDSL("control.editor.Span", src, dst);
        return;
    }
    c.fillDSL("control.Editor", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/editor-item-list-writer.mjs
var EditorItemListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("control.EditorItem", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/navigate-context-list-writer.mjs
var NavigateContextListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("control.NavigateContext", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/navigate-param-list-writer.mjs
var NavigateParamListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("control.NavigateParam", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/raw-item-base-list-writer.mjs
var RawItemBaseListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    switch (src["contentType"]) {
      case "HTML":
        c.fillDSL("control.rawitem.HtmlItem", src, dst);
        return;
      case "IMAGE":
        c.fillDSL("control.rawitem.ImageItem", src, dst);
        return;
      case "MARKDOWN":
        c.fillDSL("control.rawitem.MarkdownItem", src, dst);
        return;
      case "PLACEHOLDER":
        c.fillDSL("control.rawitem.PlaceholderItem", src, dst);
        return;
      case "RAW":
        c.fillDSL("control.rawitem.TextItem", src, dst);
        return;
      case "VIDEO":
        c.fillDSL("control.rawitem.VideoItem", src, dst);
        return;
    }
    c.fillDSL("control.RawItem", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/raw-item-param-list-writer.mjs
var RawItemParamListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("control.RawItemParam", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/layout/layout-list-writer.mjs
var LayoutListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    switch (src["layout"]) {
      case "ABSOLUTE":
        c.fillDSL("control.layout.AbsoluteLayout", src, dst);
        return;
      case "BORDER":
        c.fillDSL("control.layout.BorderLayout", src, dst);
        return;
      case "FLEX":
      case "SIMPLEFLEX":
        c.fillDSL("control.layout.FlexLayout", src, dst);
        return;
      case "TABLE":
        c.fillDSL("control.layout.TableLayout", src, dst);
        return;
      case "TABLE_12COL":
      case "TABLE_24COL":
        c.fillDSL("control.layout.Grid12Layout", src, dst);
        return;
    }
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/layout/layout-pos-list-writer.mjs
var LayoutPosListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    switch (src["layout"]) {
      case "ABSOLUTE":
        c.fillDSL("control.layout.AbsoluteLayoutPos", src, dst);
        return;
      case "BORDER":
        c.fillDSL("control.layout.BorderLayoutPos", src, dst);
        return;
      case "FLEX":
      case "SIMPLEFLEX":
        c.fillDSL("control.layout.FlexLayoutPos", src, dst);
        return;
      case "TABLE":
        c.fillDSL("control.layout.TableLayoutPos", src, dst);
        return;
      case "TABLE_12COL":
      case "TABLE_24COL":
        c.fillDSL("control.layout.GridLayoutPos", src, dst);
        return;
    }
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/list/delist-data-item-list-writer.mjs
var DEListDataItemListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("control.list.DEListDataItem", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/list/delist-item-list-writer.mjs
var DEListItemListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("control.list.DEListItem", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/map/sys-map-item-list-writer.mjs
var SysMapItemListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("control.map.SysMapItem", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/menu/app-menu-item-list-writer.mjs
var AppMenuItemListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    switch (src["itemType"]) {
      case "APPMENUREF":
        c.fillDSL("control.menu.AppMenuAMRef", src, dst);
        return;
      case "MENUITEM":
        c.fillDSL("control.menu.AppMenuItem", src, dst);
        return;
      case "RAWITEM":
        c.fillDSL("control.menu.AppMenuRawItem", src, dst);
        return;
      case "SEPERATOR":
        c.fillDSL("control.menu.AppMenuSeperator", src, dst);
        return;
    }
    c.fillDSL("control.menu.AppMenuItem", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/panel/layout-panel-list-writer.mjs
var LayoutPanelListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("control.panel.SysPanel", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/panel/panel-button-list-writer.mjs
var PanelButtonListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("control.panel.SysPanelButton", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/panel/panel-item-list-writer.mjs
var PanelItemListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    switch (src["itemType"]) {
      case "BUTTON":
        c.fillDSL("control.panel.SysPanelButton", src, dst);
        return;
      case "BUTTONLIST":
        c.fillDSL("control.panel.SysPanelButtonList", src, dst);
        return;
      case "CONTAINER":
        c.fillDSL("control.panel.SysPanelContainer", src, dst);
        return;
      case "CONTROL":
        c.fillDSL("control.panel.SysPanelControl", src, dst);
        return;
      case "CTRLPOS":
        c.fillDSL("control.panel.SysPanelCtrlPos", src, dst);
        return;
      case "FIELD":
        c.fillDSL("control.panel.SysPanelField", src, dst);
        return;
      case "RAWITEM":
        c.fillDSL("control.panel.SysPanelRawItem", src, dst);
        return;
      case "TABPANEL":
        c.fillDSL("control.panel.SysPanelTabPanel", src, dst);
        return;
      case "TAGPAGE":
        c.fillDSL("control.panel.SysPanelTabPage", src, dst);
        return;
      case "USERCONTROL":
        c.fillDSL("control.panel.SysPanelUserControl", src, dst);
        return;
    }
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/panel/panel-item-cat-group-logic-list-writer.mjs
var PanelItemCatGroupLogicListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("control.panel.PanelItemCatGroupLogic", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/panel/panel-item-logic-list-writer.mjs
var PanelItemLogicListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    switch (src["logicType"]) {
      case "GROUP":
        c.fillDSL("control.panel.PanelItemGroupLogic", src, dst);
        return;
      case "SINGLE":
        c.fillDSL("control.panel.PanelItemSingleLogic", src, dst);
        return;
    }
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/panel/panel-tab-page-list-writer.mjs
var PanelTabPageListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("control.panel.SysPanelTabPage", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/panel/view-layout-panel-list-writer.mjs
var ViewLayoutPanelListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("control.panel.SysViewLayoutPanel", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/searchbar/search-bar-filter-list-writer.mjs
var SearchBarFilterListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("control.searchbar.SysSearchBarFilter", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/searchbar/search-bar-group-list-writer.mjs
var SearchBarGroupListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("control.searchbar.SysSearchBarGroup", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/searchbar/search-bar-quick-search-list-writer.mjs
var SearchBarQuickSearchListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("control.searchbar.SysSearchBarQuickSearch", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/toolbar/decontext-menu-list-writer.mjs
var DEContextMenuListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("control.toolbar.DEContextMenu", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/toolbar/decontext-menu-item-list-writer.mjs
var DEContextMenuItemListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    switch (src["itemType"]) {
      case "DEUIACTION":
        c.fillDSL("control.toolbar.DETBUIActionItem", src, dst);
        return;
      case "ITEMS":
        c.fillDSL("control.toolbar.DETBGroupItem", src, dst);
        return;
      case "RAWITEM":
        c.fillDSL("control.toolbar.DETBRawItem", src, dst);
        return;
      case "SEPERATOR":
        c.fillDSL("control.toolbar.DETBSeperatorItem", src, dst);
        return;
    }
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/toolbar/detoolbar-item-list-writer.mjs
var DEToolbarItemListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    switch (src["itemType"]) {
      case "DEUIACTION":
        c.fillDSL("control.toolbar.DETBUIActionItem", src, dst);
        return;
      case "ITEMS":
        c.fillDSL("control.toolbar.DETBGroupItem", src, dst);
        return;
      case "RAWITEM":
        c.fillDSL("control.toolbar.DETBRawItem", src, dst);
        return;
      case "SEPERATOR":
        c.fillDSL("control.toolbar.DETBSeperatorItem", src, dst);
        return;
    }
    c.fillDSL("control.toolbar.DEToolbarItem", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/tree/detree-column-list-writer.mjs
var DETreeColumnListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("control.tree.DETreeColumn", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/tree/detree-node-list-writer.mjs
var DETreeNodeListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    switch (src["treeNodeType"]) {
      case "CODELIST":
        c.fillDSL("control.tree.DETreeCodeListNode", src, dst);
        return;
      case "DE":
        c.fillDSL("control.tree.DETreeDataSetNode", src, dst);
        return;
      case "STATIC":
        c.fillDSL("control.tree.DETreeStaticNode", src, dst);
        return;
    }
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/tree/detree-node-column-list-writer.mjs
var DETreeNodeColumnListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    switch (src["columnType"]) {
      case "DEFGRIDCOLUMN":
        c.fillDSL("control.tree.DETreeNodeFieldColumn", src, dst);
        return;
      case "UAGRIDCOLUMN":
        c.fillDSL("control.tree.DETreeNodeUAColumn", src, dst);
        return;
    }
    c.fillDSL("control.tree.DETreeNodeFieldColumn", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/tree/detree-node-data-item-list-writer.mjs
var DETreeNodeDataItemListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("control.tree.DETreeNodeDataItem", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/tree/detree-node-edit-item-list-writer.mjs
var DETreeNodeEditItemListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("control.tree.HiddenDETreeNodeEditItem", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/tree/detree-node-rs-list-writer.mjs
var DETreeNodeRSListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("control.tree.DETreeNodeRS", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/tree/detree-node-rsparam-list-writer.mjs
var DETreeNodeRSParamListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("control.tree.DETreeNodeRSParam", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/tree/detree-node-rv-list-writer.mjs
var DETreeNodeRVListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("control.tree.DETreeNodeRV", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/defield/defsearch-mode-list-writer.mjs
var DEFSearchModeListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("dataentity.defield.DEFSearchMode", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/defield/valuerule/defvrcondition-list-writer.mjs
var DEFVRConditionListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    switch (src["condType"]) {
      case "GROUP":
        c.fillDSL("dataentity.defield.valuerule.DEFVRGroupCondition", src, dst);
        return;
      case "QUERYCOUNT":
        c.fillDSL(
          "dataentity.defield.valuerule.DEFVRQueryCountCondition",
          src,
          dst
        );
        return;
      case "REGEX":
        c.fillDSL("dataentity.defield.valuerule.DEFVRRegExCondition", src, dst);
        return;
      case "SIMPLE":
        c.fillDSL(
          "dataentity.defield.valuerule.DEFVRSimpleCondition",
          src,
          dst
        );
        return;
      case "STRINGLENGTH":
        c.fillDSL(
          "dataentity.defield.valuerule.DEFVRStringLengthCondition",
          src,
          dst
        );
        return;
      case "SYSVALUERULE":
        c.fillDSL(
          "dataentity.defield.valuerule.DEFVRSysValueRuleCondition",
          src,
          dst
        );
        return;
      case "VALUERANGE":
        c.fillDSL(
          "dataentity.defield.valuerule.DEFVRValueRangeCondition",
          src,
          dst
        );
        return;
      case "VALUERANGE2":
        c.fillDSL(
          "dataentity.defield.valuerule.DEFVRValueRange2Condition",
          src,
          dst
        );
        return;
      case "VALUERANGE3":
        c.fillDSL(
          "dataentity.defield.valuerule.DEFVRValueRange3Condition",
          src,
          dst
        );
        return;
      case "VALUERECURSION":
        c.fillDSL(
          "dataentity.defield.valuerule.DEFVRValueRecursionCondition",
          src,
          dst
        );
        return;
    }
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/defield/valuerule/defvrgroup-condition-list-writer.mjs
var DEFVRGroupConditionListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("dataentity.defield.valuerule.DEFVRGroupCondition", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/defield/valuerule/defvalue-rule-list-writer.mjs
var DEFValueRuleListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("dataentity.defield.valuerule.DEFValueRule", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/ac/deacmode-data-item-list-writer.mjs
var DEACModeDataItemListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("dataentity.ac.DEACModeDataItem", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/action/deaction-logic-list-writer.mjs
var DEActionLogicListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("dataentity.action.DEActionLogic", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/der/der1-n-list-writer.mjs
var DER1NListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("dataentity.der.DER1N", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/der/derbase-list-writer.mjs
var DERBaseListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    switch (src["dERType"]) {
      case "DER11":
        c.fillDSL("dataentity.der.DER11", src, dst);
        return;
      case "DER1N":
        c.fillDSL("dataentity.der.DER1N", src, dst);
        return;
    }
    c.fillDSL("dataentity.der.DERBase", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/ds/dedqcondition-list-writer.mjs
var DEDQConditionListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    switch (src["condType"]) {
      case "CUSTOM":
        c.fillDSL("dataentity.ds.DEDQCustomCondition", src, dst);
        return;
      case "GROUP":
        c.fillDSL("dataentity.ds.DEDQGroupCondition", src, dst);
        return;
      case "SINGLE":
        c.fillDSL("dataentity.ds.DEDQFieldCondition", src, dst);
        return;
    }
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/ds/dedqgroup-condition-list-writer.mjs
var DEDQGroupConditionListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("dataentity.ds.DEDQGroupCondition", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/dataexport/dedata-export-item-list-writer.mjs
var DEDataExportItemListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("dataentity.dataexport.DEDataExportItem", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/dataimport/dedata-import-item-list-writer.mjs
var DEDataImportItemListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("dataentity.dataimport.DEDataImportItem", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/logic/delogic-link-list-writer.mjs
var DELogicLinkListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("dataentity.logic.DELogicLink", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/logic/delogic-link-cond-list-writer.mjs
var DELogicLinkCondListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    switch (src["logicType"]) {
      case "GROUP":
        c.fillDSL("dataentity.logic.DELogicLinkGroupCond", src, dst);
        return;
      case "SINGLE":
        c.fillDSL("dataentity.logic.DELogicLinkSingleCond", src, dst);
        return;
    }
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/logic/delogic-link-group-cond-list-writer.mjs
var DELogicLinkGroupCondListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("dataentity.logic.DELogicLinkGroupCond", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/logic/delogic-node-list-writer.mjs
var DELogicNodeListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    switch (src["logicNodeType"]) {
      case "APPENDPARAM":
        c.fillDSL("dataentity.logic.DEAppendParamLogic", src, dst);
        return;
      case "BEGIN":
        c.fillDSL("dataentity.logic.DEBeginLogic", src, dst);
        return;
      case "BINDPARAM":
        c.fillDSL("dataentity.logic.DEBindParamLogic", src, dst);
        return;
      case "COPYPARAM":
        c.fillDSL("dataentity.logic.DECopyParamLogic", src, dst);
        return;
      case "DEACTION":
        c.fillDSL("dataentity.logic.DEDEActionLogic", src, dst);
        return;
      case "DEBUGPARAM":
        c.fillDSL("dataentity.logic.DEDebugParamLogic", src, dst);
        return;
      case "DEDATAQUERY":
        c.fillDSL("dataentity.logic.DEDEDataQueryLogic", src, dst);
        return;
      case "DEDATASET":
        c.fillDSL("dataentity.logic.DEDEDataSetLogic", src, dst);
        return;
      case "DELOGIC":
        c.fillDSL("dataentity.logic.DEDELogicLogic", src, dst);
        return;
      case "END":
        c.fillDSL("dataentity.logic.DEEndLogic", src, dst);
        return;
      case "PREPAREPARAM":
        c.fillDSL("dataentity.logic.DEPrepareParamLogic", src, dst);
        return;
      case "RAWSFCODE":
        c.fillDSL("dataentity.logic.DERawCodeLogic", src, dst);
        return;
      case "RENEWPARAM":
        c.fillDSL("dataentity.logic.DERenewParamLogic", src, dst);
        return;
      case "RESETPARAM":
        c.fillDSL("dataentity.logic.DEResetParamLogic", src, dst);
        return;
      case "SORTPARAM":
        c.fillDSL("dataentity.logic.DESortParamLogic", src, dst);
        return;
      case "STARTWF":
        c.fillDSL("dataentity.logic.DEStartWFLogic", src, dst);
        return;
      case "THROWEXCEPTION":
        c.fillDSL("dataentity.logic.DEThrowExceptionLogic", src, dst);
        return;
    }
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/logic/delogic-node-param-list-writer.mjs
var DELogicNodeParamListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("dataentity.logic.DELogicNodeParam", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/logic/delogic-param-list-writer.mjs
var DELogicParamListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("dataentity.logic.DELogicParam", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/logic/deuilogic-link-list-writer.mjs
var DEUILogicLinkListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("dataentity.logic.DEUILogicLink", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/logic/deuilogic-link-cond-list-writer.mjs
var DEUILogicLinkCondListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    switch (src["logicType"]) {
      case "GROUP":
        c.fillDSL("dataentity.logic.DEUILogicLinkGroupCond", src, dst);
        return;
      case "SINGLE":
        c.fillDSL("dataentity.logic.DEUILogicLinkSingleCond", src, dst);
        return;
    }
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/logic/deuilogic-link-group-cond-list-writer.mjs
var DEUILogicLinkGroupCondListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("dataentity.logic.DEUILogicLinkGroupCond", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/logic/deuilogic-node-list-writer.mjs
var DEUILogicNodeListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    switch (src["logicNodeType"]) {
      case "APPENDPARAM":
        c.fillDSL("dataentity.logic.DEUIAppendParamLogic", src, dst);
        return;
      case "BEGIN":
        c.fillDSL("dataentity.logic.DEUIBeginLogic", src, dst);
        return;
      case "BINDPARAM":
        c.fillDSL("dataentity.logic.DEUIBindParamLogic", src, dst);
        return;
      case "COPYPARAM":
        c.fillDSL("dataentity.logic.DEUICopyParamLogic", src, dst);
        return;
      case "DEACTION":
        c.fillDSL("dataentity.logic.DEUIDEActionLogic", src, dst);
        return;
      case "DEBUGPARAM":
        c.fillDSL("dataentity.logic.DEUIDebugParamLogic", src, dst);
        return;
      case "DEDATASET":
        c.fillDSL("dataentity.logic.DEUIDEDataSetLogic", src, dst);
        return;
      case "DELOGIC":
        c.fillDSL("dataentity.logic.DEUIDELogicLogic", src, dst);
        return;
      case "DEUIACTION":
        c.fillDSL("dataentity.logic.DEUIActionLogic", src, dst);
        return;
      case "END":
        c.fillDSL("dataentity.logic.DEUIEndLogic", src, dst);
        return;
      case "MSGBOX":
        c.fillDSL("dataentity.logic.DEUIMsgBoxLogic", src, dst);
        return;
      case "PFPLUGIN":
        c.fillDSL("dataentity.logic.DEUIPFPluginLogic", src, dst);
        return;
      case "RAWJSCODE":
        c.fillDSL("dataentity.logic.DEUIRawCodeLogic", src, dst);
        return;
      case "RENEWPARAM":
        c.fillDSL("dataentity.logic.DEUIRenewParamLogic", src, dst);
        return;
      case "RESETPARAM":
        c.fillDSL("dataentity.logic.DEUIResetParamLogic", src, dst);
        return;
      case "SORTPARAM":
        c.fillDSL("dataentity.logic.DEUISortParamLogic", src, dst);
        return;
      case "THROWEXCEPTION":
        c.fillDSL("dataentity.logic.DEUIThrowExceptionLogic", src, dst);
        return;
      case "VIEWCTRLFIREEVENT":
        c.fillDSL("dataentity.logic.DEUICtrlFireEventLogic", src, dst);
        return;
      case "VIEWCTRLINVOKE":
        c.fillDSL("dataentity.logic.DEUICtrlInvokeLogic", src, dst);
        return;
    }
    c.fillDSL("dataentity.logic.DEUILogicNode", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/logic/deuilogic-node-param-list-writer.mjs
var DEUILogicNodeParamListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("dataentity.logic.DEUILogicNodeParam", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/logic/deuilogic-param-list-writer.mjs
var DEUILogicParamListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("dataentity.logic.DEUILogicParam", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/mainstate/demain-state-list-writer.mjs
var DEMainStateListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("dataentity.mainstate.DEMainState", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/mainstate/demain-state-oppriv-list-writer.mjs
var DEMainStateOPPrivListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("dataentity.mainstate.DEMainStateOPPriv", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/priv/deoppriv-list-writer.mjs
var DEOPPrivListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("dataentity.priv.DEOPPriv", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/uiaction/deuiaction-group-list-writer.mjs
var DEUIActionGroupListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("dataentity.uiaction.DEUIActionGroup", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/wizard/dewizard-list-writer.mjs
var DEWizardListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("dataentity.wizard.DEWizard", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/wizard/dewizard-form-list-writer.mjs
var DEWizardFormListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("dataentity.wizard.DEWizardForm", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/wizard/dewizard-step-list-writer.mjs
var DEWizardStepListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("dataentity.wizard.DEWizardStep", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/res/ctrl-msg-list-writer.mjs
var CtrlMsgListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("res.CtrlMsg", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/res/ctrl-msg-item-list-writer.mjs
var CtrlMsgItemListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("res.CtrlMsgItem", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/res/language-item-list-writer.mjs
var LanguageItemListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("res.LanguageItem", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/res/language-res-list-writer.mjs
var LanguageResListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("res.LanguageRes", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/res/sys-css-list-writer.mjs
var SysCssListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("res.SysCss", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/res/sys-dict-cat-list-writer.mjs
var SysDictCatListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("res.SysDictCat", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/res/sys-image-list-writer.mjs
var SysImageListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("res.SysImage", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/valuerule/sys-value-rule-list-writer.mjs
var SysValueRuleListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("valuerule.SysValueRule", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/view/uiaction-list-writer.mjs
var UIActionListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("dataentity.uiaction.DEUIAction", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/view/uiaction-group-list-writer.mjs
var UIActionGroupListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("dataentity.uiaction.DEUIActionGroup", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/view/uiaction-group-detail-list-writer.mjs
var UIActionGroupDetailListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("dataentity.uiaction.DEUIActionGroupDetail", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/view/uiengine-param-list-writer.mjs
var UIEngineParamListWriter = class extends ModelListWriterBase {
  onFillDSLList(c, src, dst) {
    const _ = this;
    src.forEach((item) => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
  }
  onFillDSL(c, src, dst) {
    c.fillDSL("app.view.AppViewEngineParam", src, dst);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/special-ignored-values.mjs
var SpecialIgnoredValues = class {
  constructor() {
    /**
     * 映射表
     *
     * @author chitanda
     * @date 2023-08-03 14:08:45
     * @protected
     * @type {Map<string, unknown>}
     */
    __publicField(this, "map", /* @__PURE__ */ new Map());
    this.map.set("basis", -1);
    this.map.set("grow", -1);
    this.map.set("shrink", -1);
    this.map.set("showCaptionBar", true);
    this.map.set("showBusyIndicator", true);
    this.map.set("timeout", -1);
    this.map.set("maskMode", -1);
    this.map.set("removeMode", -1);
  }
  has(key) {
    return this.map.has(key);
  }
  /**
   * 是否为特殊忽略值
   *
   * @author chitanda
   * @date 2023-08-03 14:08:14
   * @param {string} key
   * @param {unknown} val
   * @return {*}  {boolean}
   */
  is(key, val) {
    const value = this.map.get(key);
    return value == val;
  }
};
var ignore = new SpecialIgnoredValues();

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/util.mjs
var sysUIActionMapping = /* @__PURE__ */ new Map([
  ["app_login", "login"],
  ["app_logout", "logout"],
  ["app_relogin", "relogin"],
  ["data_cancelchanges", "cancelchanges"],
  ["data_createobject", "createobject"],
  ["data_removeobject", "removeobject"],
  ["data_savechanges", "savechanges"],
  ["data_synchronize", "synchronize"],
  ["editview_copyaction", "copy"],
  ["editview_exitaction", "exit"],
  ["editview_firstrecordaction", "firstrecord"],
  ["editview_helpaction", "help"],
  ["editview_lastrecordaction", "lastrecord"],
  ["editview_newaction", "new"],
  ["editview_nextrecordaction", "nextrecord"],
  ["editview_prevrecordaction", "prevrecord"],
  ["editview_printaction", "print"],
  ["editview_refreshaction", "refresh"],
  ["editview_removeandexitaction", "removeandexit"],
  ["editview_rollbackwfaction", "rollbackwf"],
  ["editview_saveaction", "save"],
  ["editview_saveandexitaction", "saveandexit"],
  ["editview_saveandnewaction", "saveandnew"],
  ["editview_saveandstartwfaction", "saveandstart"],
  ["editview_viewwfstepactoraction", "viewwfstep"],
  ["gridview_copyaction", "copy"],
  ["gridview_editaction", "edit"],
  ["gridview_exportaction", "exportexcel"],
  ["gridview_exportxmlaction", "exportmodel"],
  ["gridview_helpaction", "help"],
  ["gridview_importbar", "import"],
  ["gridview_newaction", "new"],
  ["gridview_newrowaction", "newrow"],
  ["gridview_printaction", "print"],
  ["gridview_refreshaction", "refresh"],
  ["gridview_removeaction", "remove"],
  ["gridview_roweditaction", "togglerowedit"],
  ["gridview_saverowaction", "saverow"],
  ["gridview_searchbar", "togglefilter"],
  ["gridview_viewaction", "view"],
  ["treeview_refreshallaction", "refreshall"],
  ["treeview_refreshparentaction", "refreshparent"],
  ["util_addall", "addall"],
  ["util_addselection", "addselection"],
  ["util_bottomnavzone", "togglebottomnavzone"],
  ["util_collapse", "collapse"],
  ["util_collapseall", "collapseall"],
  ["util_expand", "expand"],
  ["util_expandall", "expandall"],
  ["util_finish", "finish"],
  ["util_nextstep", "nextstep"],
  ["util_prevstep", "prevstep"],
  ["util_removeall", "removeall"],
  ["util_removeselection", "removeselection"],
  ["util_reset", "reset"],
  ["util_rightnavzone", "togglerightnavzone"],
  ["util_search", "search"],
  ["view_cancelaction", "cancel"],
  ["view_noaction", "no"],
  ["view_okaction", "ok"],
  ["view_useraction", "useraction"],
  ["view_useraction2", "useraction2"],
  ["view_useraction3", "useraction3"],
  ["view_useraction4", "useraction4"],
  ["view_useraction5", "useraction5"],
  ["view_useraction6", "useraction6"],
  ["view_yesaction", "yes"]
]);
function deepUpdateAppId(appId, model) {
  if (typeof model !== "object") {
    return;
  }
  if (Array.isArray(model)) {
    model.forEach((item) => {
      deepUpdateAppId(appId, item);
    });
  } else {
    model.appId = appId;
    const keys4 = Object.keys(model);
    keys4.forEach((key) => {
      const val = model[key];
      deepUpdateAppId(appId, val);
    });
  }
}
function calcModelId(m) {
  if (!m) {
    return null;
  }
  const id = m.path || m.dynaModelFilePath || m.id || m.codeName || m.name;
  if (!id) {
    return m.pluginCode;
  }
  if (m.uIActionMode && m.uIActionMode == "SYS" && m.predefinedType) {
    if (sysUIActionMapping.has(m.predefinedType.toLowerCase())) {
      const sysActionTag = sysUIActionMapping.get(
        m.predefinedType.toLowerCase()
      );
      if (sysActionTag && sysActionTag === id.toLowerCase()) {
        return m.predefinedType;
      }
    }
  }
  return id;
}
function calcUniqueTag(model, bSimple = false, ignoreCase = true) {
  let strId = calcModelId(model);
  if (!strId) {
    return null;
  }
  if (strId.endsWith(".json")) {
    strId = strId.replace(".json", "");
  }
  if (!strId) {
    return null;
  }
  const ids = strId.split("/");
  if (ids.length > 1) {
    if (bSimple) {
      if (ignoreCase) {
        return ids[ids.length - 1].toLowerCase();
      } else {
        return ids[ids.length - 1];
      }
    }
    let sb = "";
    for (let i = 1; i < ids.length; i++) {
      if (i % 2 == 0) {
        if (i !== ids.length - 1) {
          sb += ".";
        }
      } else {
        sb += ids[i];
      }
    }
    return ignoreCase ? sb.toLowerCase() : sb;
  } else {
    return ignoreCase ? strId.toLowerCase() : strId;
  }
}

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/model-writer-base.mjs
var ModelWriterBase = class {
  fillDSL(iModelDSLGenEngineContext, src, dst) {
    return this.onFillDSL(iModelDSLGenEngineContext, src, dst);
  }
  onFillDSL(iModelDSLGenEngineContext, src, dst) {
    this.w(dst, "userParam", src, "getUserParam");
    this.w(dst, "userTag", src);
    this.w(dst, "userTag2", src);
    this.w(dst, "userTag3", src);
    this.w(dst, "userTag4", src);
    const name = src.name;
    if (name) {
      dst.name = name;
    }
    const id = calcUniqueTag(src);
    if (id) {
      dst.id = id;
    }
    if (src.appId) {
      dst.appId = src.appId;
    }
    if (id === name) {
      delete dst.name;
    }
  }
  fill(dst, key, value) {
    if (value == null || Object.is(value, false) || Object.is(value, "") || Object.is(value, -1) || Object.is(value, 0)) {
      if (ignore.has(key) === false) {
        return;
      }
      if (ignore.is(key, value)) {
        return;
      }
    }
    dst[key] = value;
  }
  fillId(dst, key, value) {
    if (!value) {
      return;
    }
    const id = calcUniqueTag(value);
    this.fill(dst, key, id);
  }
  fillList(dst, key, value) {
    this.fill(dst, key, value);
  }
  fillIdList(dst, key, value) {
    if (!value && !(value === false)) {
      return;
    }
    const ids = [];
    value.forEach((item) => {
      const id = calcUniqueTag(item);
      if (id) {
        ids.push(id);
      }
    });
    this.fillList(dst, key, ids);
  }
  v(dst, key, value) {
    this.fill(dst, key, value);
  }
  w(dst, key, model, key2, def) {
    const modelKey = key2 ? key2 : key;
    const value = model[modelKey];
    if (value == null && def != null) {
      this.fill(dst, key, def);
      return;
    }
    this.fill(dst, key, model[modelKey]);
  }
  x(dst, key, model, key2) {
    if (!model) {
      return;
    }
    const ignoreCaseKeys = ["appBISchemeId", "appBICubeId"];
    const m = model[key2 ? key2 : key];
    let id = calcUniqueTag(m);
    if (ignoreCaseKeys.indexOf(key) !== -1) {
      id = calcUniqueTag(m, false, false);
    }
    this.fill(dst, key, id);
  }
  y(dst, key, model, key2) {
    const m = model[key2 ? key2 : key];
    return this.fillIdList(dst, key, m);
  }
  g(model, key) {
    return model[key];
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/model-object-writer.mjs
var ModelObjectWriter = class extends ModelWriterBase {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "modelId", s, "modelid");
    _.w(d, "modelType", s, "modeltype");
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/control-writer.mjs
var ControlWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "codeName", s);
    _.w(d, "controlStyle", s);
    _.w(d, "controlType", s);
    _.w(d, "dynaSysMode", s, "", 0);
    _.w(d, "height", s, "", 0);
    _.w(d, "logicName", s);
    _.x(d, "appDataEntityId", s, "getPSAppDataEntity");
    _.v(
      d,
      "controlAttributes",
      c.m("control.ControlAttribute[]", s, "getPSControlAttributes")
    );
    _.v(
      d,
      "controlLogics",
      c.m("control.ControlLogic[]", s, "getPSControlLogics")
    );
    _.v(
      d,
      "controlParam",
      c.s("control.ControlParam[]", s, "getPSControlParam")
    );
    _.v(
      d,
      "controlRenders",
      c.m("control.ControlRender[]", s, "getPSControlRenders")
    );
    _.v(d, "ctrlMsg", c.s("res.CtrlMsg[]", s, "getPSCtrlMsg"));
    _.v(d, "sysCss", c.s("res.SysCss[]", s, "getPSSysCss"));
    _.x(d, "sysPFPluginId", s, "getPSSysPFPlugin");
    _.w(d, "priority", s);
    _.w(d, "width", s, "", 0);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/ajax-control-writer.mjs
var AjaxControlWriter = class extends ControlWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.v(
      d,
      "user2ControlAction",
      c.s("control.ControlAction[]", s, "getUser2PSControlAction")
    );
    _.v(
      d,
      "userControlAction",
      c.s("control.ControlAction[]", s, "getUserPSControlAction")
    );
    _.w(d, "autoLoad", s, "", true);
    _.w(d, "enableItemPrivilege", s);
    _.w(d, "showBusyIndicator", s, "", true);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/menu/app-menu-writer.mjs
var AppMenuWriter = class extends AjaxControlWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "appMenuStyle", s);
    _.w(d, "layoutMode", s);
    _.x(d, "appCounterRefId", s, "getPSAppCounterRef");
    _.v(
      d,
      "appMenuItems",
      c.m("control.menu.AppMenuItem[]", s, "getPSAppMenuItems")
    );
    _.w(d, "enableCustomized", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/appmenu/app-menu-model-writer.mjs
var AppMenuModelWriter = class extends AppMenuWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/bi/app-bicube-dimension-writer.mjs
var AppBICubeDimensionWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "codeName", s);
    _.w(d, "dimensionFormula", s);
    _.w(d, "dimensionTag", s);
    _.w(d, "dimensionTag2", s);
    _.w(d, "dimensionType", s);
    _.v(
      d,
      "appBICubeHierarchies",
      c.m("app.bi.AppBICubeHierarchy[]", s, "getPSAppBICubeHierarchies")
    );
    _.x(d, "appCodeListId", s, "getPSAppCodeList");
    _.x(d, "appDEFieldId", s, "getPSAppDEField");
    _.x(d, "paramAppDEUIActionId", s, "getParamPSAppDEUIAction");
    _.w(d, "stdDataType", s, "", 0);
    _.x(d, "textAppDEFieldId", s, "getTextPSAppDEField");
    _.w(d, "textTemplate", s);
    _.w(d, "tipTemplate", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/bi/app-bicube-hierarchy-writer.mjs
var AppBICubeHierarchyWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "caption", s);
    _.w(d, "hierarchyTag", s);
    _.w(d, "hierarchyTag2", s);
    _.v(
      d,
      "appBICubeLevels",
      c.m("app.bi.AppBICubeLevel[]", s, "getPSAppBICubeLevels")
    );
    _.x(d, "appDataEntityId", s, "getPSAppDataEntity");
    _.w(d, "hasAll", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/bi/app-bicube-writer.mjs
var AppBICubeWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "accessKey", s);
    _.v(
      d,
      "appBICubeDimensions",
      c.m("app.bi.AppBICubeDimension[]", s, "getPSAppBICubeDimensions")
    );
    _.v(
      d,
      "appBICubeMeasures",
      c.m("app.bi.AppBICubeMeasure[]", s, "getPSAppBICubeMeasures")
    );
    _.x(d, "appDataEntityId", s, "getPSAppDataEntity");
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/bi/app-bicube-level-writer.mjs
var AppBICubeLevelWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "aggCaption", s);
    _.w(d, "levelTag", s);
    _.w(d, "levelTag2", s);
    _.w(d, "levelType", s, "", "COMMON");
    _.x(d, "appDEFieldId", s, "getPSAppDEField");
    _.w(d, "textItemName", s);
    _.w(d, "uniqueMembers", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/bi/app-bicube-measure-writer.mjs
var AppBICubeMeasureWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "aggMode", s);
    _.w(d, "codeName", s);
    _.x(d, "drillDetailAppViewId", s, "getDrillDetailPSAppView");
    _.x(d, "drillDownAppViewId", s, "getDrillDownPSAppView");
    _.w(d, "jsonFormat", s);
    _.w(d, "measureFormula", s);
    _.w(d, "measureGroup", s);
    _.w(d, "measureTag", s);
    _.w(d, "measureTag2", s);
    _.w(d, "measureType", s);
    _.x(d, "appCodeListId", s, "getPSAppCodeList");
    _.x(d, "appDEFieldId", s, "getPSAppDEField");
    _.x(d, "paramAppDEUIActionId", s, "getParamPSAppDEUIAction");
    _.w(d, "stdDataType", s, "", 0);
    _.w(d, "textTemplate", s);
    _.w(d, "tipTemplate", s);
    _.w(d, "dataItem", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/bi/app-bireport-dimension-writer.mjs
var AppBIReportDimensionWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "dimensionFormula", s);
    _.w(d, "dimensionName", s);
    _.w(d, "dimensionParams", s);
    _.w(d, "dimensionTag", s);
    _.w(d, "dimensionType", s);
    _.w(d, "itemTag", s);
    _.w(d, "itemTag2", s);
    _.x(d, "appCodeListId", s, "getPSAppCodeList");
    _.x(d, "appDEFieldId", s, "getPSAppDEField");
    _.w(d, "placeType", s);
    _.w(d, "placement", s);
    _.w(d, "stdDataType", s, "", 0);
    _.x(d, "textAppDEFieldId", s, "getTextPSAppDEField");
    _.w(d, "textTemplate", s);
    _.w(d, "tipTemplate", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/bi/app-bireport-writer.mjs
var AppBIReportWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "accessKey", s);
    _.x(d, "appBICubeId", s, "getPSAppBICube");
    _.v(
      d,
      "appBIReportDimensions",
      c.m("app.bi.AppBIReportDimension[]", s, "getPSAppBIReportDimensions")
    );
    _.v(
      d,
      "appBIReportMeasures",
      c.m("app.bi.AppBIReportMeasure[]", s, "getPSAppBIReportMeasures")
    );
    _.x(d, "appDataEntityId", s, "getPSAppDataEntity");
    _.v(
      d,
      "layoutPanel",
      c.s("control.panel.LayoutPanel[]", s, "getPSLayoutPanel")
    );
    _.w(d, "reportTag", s);
    _.w(d, "reportTag2", s);
    _.w(d, "reportUIModel", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/bi/app-bireport-measure-writer.mjs
var AppBIReportMeasureWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "aggMode", s);
    _.x(d, "drillDetailAppViewId", s, "getDrillDetailPSAppView");
    _.x(d, "drillDownAppViewId", s, "getDrillDownPSAppView");
    _.w(d, "itemTag", s);
    _.w(d, "itemTag2", s);
    _.w(d, "jsonFormat", s);
    _.w(d, "measureFormula", s);
    _.w(d, "measureGroup", s);
    _.w(d, "measureName", s);
    _.w(d, "measureParams", s);
    _.w(d, "measureTag", s);
    _.w(d, "measureType", s);
    _.x(d, "appCodeListId", s, "getPSAppCodeList");
    _.x(d, "appDEFieldId", s, "getPSAppDEField");
    _.w(d, "placeType", s);
    _.w(d, "stdDataType", s, "", 0);
    _.w(d, "textTemplate", s);
    _.w(d, "tipTemplate", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/bi/app-bischeme-writer.mjs
var AppBISchemeWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.v(d, "appBICubes", c.m("app.bi.AppBICube[]", s, "getPSAppBICubes"));
    _.v(d, "appBIReports", c.m("app.bi.AppBIReport[]", s, "getPSAppBIReports"));
    _.w(d, "uniqueTag", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/codelist/app-code-list-writer.mjs
var AppCodeListWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "allText", s);
    _.v(
      d,
      "allTextLanguageRes",
      c.s("res.LanguageRes[]", s, "getAllTextPSLanguageRes")
    );
    _.x(d, "bkcolorAppDEFieldId", s, "getBKColorPSAppDEField");
    _.x(d, "beginValueAppDEFieldId", s, "getBeginValuePSAppDEField");
    _.w(d, "cacheTimeout", s);
    _.x(d, "clsAppDEFieldId", s, "getClsPSAppDEField");
    _.w(d, "codeListTag", s);
    _.w(d, "codeListType", s);
    _.w(d, "codeName", s);
    _.x(d, "colorAppDEFieldId", s, "getColorPSAppDEField");
    _.w(d, "customCond", s);
    _.x(d, "dataAppDEFieldId", s, "getDataPSAppDEField");
    _.x(d, "disableAppDEFieldId", s, "getDisablePSAppDEField");
    _.w(d, "dynaSysMode", s, "", 0);
    _.w(d, "emptyText", s);
    _.v(
      d,
      "emptyTextLanguageRes",
      c.s("res.LanguageRes[]", s, "getEmptyTextPSLanguageRes")
    );
    _.x(d, "endValueAppDEFieldId", s, "getEndValuePSAppDEField");
    _.x(d, "iconClsAppDEFieldId", s, "getIconClsPSAppDEField");
    _.x(d, "iconClsXAppDEFieldId", s, "getIconClsXPSAppDEField");
    _.x(d, "iconPathAppDEFieldId", s, "getIconPathPSAppDEField");
    _.x(d, "iconPathXAppDEFieldId", s, "getIconPathXPSAppDEField");
    _.w(d, "incBeginValueMode", s, "", 0);
    _.w(d, "incEndValueMode", s, "", 0);
    _.w(d, "minorSortDir", s);
    _.x(d, "minorSortAppDEFieldId", s, "getMinorSortPSAppDEField");
    _.w(d, "orMode", s);
    _.x(d, "appDEDataSetId", s, "getPSAppDEDataSet");
    _.x(d, "appDataEntityId", s, "getPSAppDataEntity");
    _.v(d, "codeItems", c.m("codelist.CodeItem[]", s, "getPSCodeItems"));
    _.x(d, "sysPFPluginId", s, "getPSSysPFPlugin");
    _.x(d, "pvalueAppDEFieldId", s, "getPValuePSAppDEField");
    _.w(d, "predefinedType", s);
    _.x(d, "textAppDEFieldId", s, "getTextPSAppDEField");
    _.w(d, "textSeparator", s);
    _.x(d, "valueAppDEFieldId", s, "getValuePSAppDEField");
    _.w(d, "valueSeparator", s);
    _.w(d, "codeItemValueNumber", s);
    _.w(d, "enableCache", s);
    _.w(d, "subSysAsCloud", s);
    _.w(d, "thresholdGroup", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/control/app-counter-writer.mjs
var AppCounterWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "codeName", s);
    _.w(d, "counterData", s);
    _.w(d, "counterData2", s);
    _.w(d, "counterType", s);
    _.w(d, "customCond", s);
    _.x(d, "getAppDEActionId", s, "getGetPSAppDEAction");
    _.x(d, "getAppDEDataSetId", s, "getGetPSAppDEDataSet");
    _.x(d, "appDataEntityId", s, "getPSAppDataEntity");
    _.w(d, "counterId", s, "getPSCounterId");
    _.v(
      d,
      "navigateContexts",
      c.m("control.NavigateContext[]", s, "getPSNavigateContexts")
    );
    _.v(
      d,
      "navigateParams",
      c.m("control.NavigateParam[]", s, "getPSNavigateParams")
    );
    _.x(d, "sysPFPluginId", s, "getPSSysPFPlugin");
    _.w(d, "timer", s, "", 0);
    _.w(d, "uniqueTag", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/counter/sys-counter-ref-writer.mjs
var SysCounterRefWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "refMode", s);
    _.w(d, "tag", s);
    _.w(d, "uniqueTag", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/control/app-counter-ref-writer.mjs
var AppCounterRefWriter = class extends SysCounterRefWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.v(d, "appCounter", c.s("app.control.AppCounter[]", s, "getPSAppCounter"));
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/control/app-portlet-cat-writer.mjs
var AppPortletCatWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "codeName", s);
    _.v(
      d,
      "nameLanguageRes",
      c.s("res.LanguageRes[]", s, "getNamePSLanguageRes")
    );
    _.v(d, "sysCss", c.s("res.SysCss[]", s, "getPSSysCss"));
    _.v(d, "sysImage", c.s("res.SysImage[]", s, "getPSSysImage"));
    _.w(d, "ungroup", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/control/app-portlet-writer.mjs
var AppPortletWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "codeName", s);
    _.x(d, "appDataEntityId", s, "getPSAppDataEntity");
    _.v(
      d,
      "appPortletCat",
      c.s("app.control.AppPortletCat[]", s, "getPSAppPortletCat")
    );
    _.v(d, "control", c.s("control.Control[]", s, "getPSControl"));
    _.w(d, "portletParams", s);
    _.w(d, "enableAppDashboard", s);
    _.w(d, "enableDEDashboard", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/dataentity/app-defield-writer2.mjs
var AppDEFieldWriter2 = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "codeName", s);
    _.x(d, "computeAppDEFLogicId", s, "getComputePSAppDEFLogic");
    _.w(d, "defaultValue", s);
    _.x(d, "defaultValueAppDEFLogicId", s, "getDefaultValuePSAppDEFLogic");
    _.w(d, "defaultValueType", s);
    _.v(d, "lnlanguageRes", c.s("res.LanguageRes[]", s, "getLNPSLanguageRes"));
    _.w(d, "logicName", s);
    _.w(d, "maxValueString", s);
    _.w(d, "minStringLength", s, "", 0);
    _.w(d, "minValueString", s);
    _.x(d, "onChangeAppDEFLogicId", s, "getOnChangePSAppDEFLogic");
    _.w(d, "precision", s, "", 0);
    _.v(
      d,
      "qsphlanguageRes",
      c.s("res.LanguageRes[]", s, "getQSPHPSLanguageRes")
    );
    _.w(d, "quickSearchPlaceHolder", s);
    _.w(d, "stdDataType", s);
    _.w(d, "stringLength", s, "", 0);
    _.w(d, "valueFormat", s);
    _.w(d, "enableQuickSearch", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/dataentity/app-demethod-dtofield-writer.mjs
var AppDEMethodDTOFieldWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "codeName", s);
    _.w(d, "jsonFormat", s);
    _.w(d, "logicName", s);
    _.x(d, "appDEFieldId", s, "getPSAppDEField");
    _.x(d, "refAppDEMethodDTOId", s, "getRefPSAppDEMethodDTO");
    _.x(d, "refAppDataEntityId", s, "getRefPSAppDataEntity");
    _.x(d, "refPickupAppDEFieldId", s, "getRefPickupPSAppDEField");
    _.w(d, "sourceType", s);
    _.w(d, "stdDataType", s, "", 0);
    _.w(d, "type", s);
    _.w(d, "allowEmpty", s, "", true);
    _.w(d, "listMap", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/dataentity/app-demethod-dtowriter.mjs
var AppDEMethodDTOWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "codeName", s);
    _.v(
      d,
      "appDEMethodDTOFields",
      c.m(
        "app.dataentity.AppDEMethodDTOField[]",
        s,
        "getPSAppDEMethodDTOFields"
      )
    );
    _.x(d, "refAppDEMethodDTOId", s, "getRefPSAppDEMethodDTO");
    _.x(d, "refAppDataEntityId", s, "getRefPSAppDataEntity");
    _.w(d, "sourceType", s);
    _.x(d, "srcAppMethodDTOId", s, "getSrcPSAppMethodDTO");
    _.w(d, "type", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/dataentity/app-demethod-writer.mjs
var AppDEMethodWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "codeName", s);
    _.w(d, "codeName2", s);
    _.w(d, "methodType", s);
    _.v(
      d,
      "appDEMethodInput",
      c.s("app.dataentity.AppDEMethodInput[]", s, "getPSAppDEMethodInput")
    );
    _.v(
      d,
      "appDEMethodReturn",
      c.s("app.dataentity.AppDEMethodReturn[]", s, "getPSAppDEMethodReturn")
    );
    _.x(d, "sysPFPluginId", s, "getPSSysPFPlugin");
    _.w(d, "requestField", s);
    _.w(d, "requestFullPaths", s, "requestFullPaths");
    _.w(d, "requestMethod", s);
    _.w(d, "requestParamType", s);
    _.w(d, "requestPath", s);
    _.w(d, "tempDataMode", s, "", 0);
    _.w(d, "builtinMethod", s);
    _.w(d, "needResourceKey", s);
    _.w(d, "noServiceCodeName", s);
    _.w(d, "actionMode", s);
    _.w(d, "actionName", s);
    _.w(d, "actionTag", s);
    _.w(d, "actionType", s, "", "REMOTE");
    _.w(d, "afterCode", s);
    _.w(d, "batchActionMode", s, "", 0);
    _.w(d, "beforeCode", s);
    _.x(d, "appDELogicId", s, "getPSAppDELogic");
    _.w(d, "scriptCode", s);
    _.w(d, "asyncAction", s);
    _.w(d, "customCode", s);
    _.w(d, "enableBatchAction", s);
    _.w(d, "enableTestMethod", s);
    _.v(
      d,
      "addedqconditions",
      c.m("dataentity.ds.DEDQCondition[]", s, "getADPSDEDQConditions")
    );
    _.w(d, "dataSetName", s);
    _.w(d, "dataSetTag", s);
    _.w(d, "dataSetType", s, "", "REMOTE");
    _.x(d, "appCodeListId", s, "getPSAppCodeList");
    _.v(
      d,
      "dedqgroupConditions",
      c.m("dataentity.ds.DEDQGroupCondition[]", s, "getPSDEDQGroupConditions")
    );
    _.w(d, "predefinedType", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/dataentity/app-demethod-input-writer.mjs
var AppDEMethodInputWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.x(d, "keyAppDEFieldId", s, "getKeyPSAppDEField");
    _.x(d, "appDEMethodDTOId", s, "getPSAppDEMethodDTO");
    _.w(d, "type", s);
    _.w(d, "output", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/dataentity/app-demethod-return-writer.mjs
var AppDEMethodReturnWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.x(d, "appDEMethodDTOId", s, "getPSAppDEMethodDTO");
    _.w(d, "stdDataType", s, "", 0);
    _.w(d, "type", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/dataentity/app-derswriter2.mjs
var AppDERSWriter2 = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "actionRSMode", s);
    _.w(d, "codeName", s);
    _.w(d, "codeName2", s);
    _.w(d, "dataRSMode", s);
    _.x(d, "majorAppDataEntityId", s, "getMajorPSAppDataEntity");
    _.x(d, "nestedAppDEDataSetId", s, "getNestedPSAppDEDataSet");
    _.w(d, "parentFilter", s);
    _.x(d, "parentAppDEFieldId", s, "getParentPSAppDEField");
    _.w(d, "rrmlanResTag", s, "rRMLanResTag");
    _.w(d, "rsmode", s, "rSMode");
    _.w(d, "rstype", s, "rSType");
    _.w(d, "removeActionType", s);
    _.w(d, "removeOrder", s, "", 0);
    _.w(d, "removeRejectMsg", s);
    _.w(d, "tempDataOrder", s);
    _.w(d, "enableCreateDataRS", s);
    _.w(d, "enableGetDataRS", s);
    _.w(d, "enableSelectDataRS", s);
    _.w(d, "enableUpdateDataRS", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/dataentity/app-data-entity-writer.mjs
var AppDataEntityWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.v(
      d,
      "appDEACModes",
      c.m("app.dataentity.AppDEACMode[]", s, "getAllPSAppDEACModes")
    );
    _.v(
      d,
      "appDEDataExports",
      c.m("app.dataentity.AppDEDataExport[]", s, "getAllPSAppDEDataExports")
    );
    _.v(
      d,
      "appDEDataImports",
      c.m("app.dataentity.AppDEDataImport[]", s, "getAllPSAppDEDataImports")
    );
    _.v(
      d,
      "appDEFields",
      c.m("app.dataentity.AppDEField[]", s, "getAllPSAppDEFields")
    );
    _.v(
      d,
      "appDELogics",
      c.m("app.dataentity.AppDELogic[]", s, "getAllPSAppDELogics")
    );
    _.v(
      d,
      "appDEMaps",
      c.m("app.dataentity.AppDEMap[]", s, "getAllPSAppDEMaps")
    );
    _.v(
      d,
      "appDEMethodDTOs",
      c.m("app.dataentity.AppDEMethodDTO[]", s, "getAllPSAppDEMethodDTOs")
    );
    _.v(
      d,
      "appDEMethods",
      c.m("app.dataentity.AppDEMethod[]", s, "getAllPSAppDEMethods")
    );
    _.v(
      d,
      "appDEPrints",
      c.m("app.dataentity.AppDEPrint[]", s, "getAllPSAppDEPrints")
    );
    _.v(
      d,
      "appDEUIActions",
      c.m("app.dataentity.AppDEUIAction[]", s, "getAllPSAppDEUIActions")
    );
    _.v(
      d,
      "appDEUILogics",
      c.m("app.dataentity.AppDEUILogic[]", s, "getAllPSAppDEUILogics")
    );
    _.v(
      d,
      "appPortletCats",
      c.m("app.control.AppPortletCat[]", s, "getAllPSAppPortletCats")
    );
    _.v(
      d,
      "demainStates",
      c.m("dataentity.mainstate.DEMainState[]", s, "getAllPSDEMainStates")
    );
    _.v(
      d,
      "deopprivs",
      c.m("dataentity.priv.DEOPPriv[]", s, "getAllPSDEOPPrivs")
    );
    _.w(d, "codeName", s);
    _.w(d, "codeName2", s);
    _.w(d, "deapicodeName", s, "dEAPICodeName");
    _.w(d, "deapicodeName2", s, "dEAPICodeName2");
    _.w(d, "deapitag", s, "dEAPITag");
    _.w(d, "decodeName", s, "dECodeName");
    _.w(d, "defgroupMode", s, "dEFGroupMode");
    _.w(d, "defullTag", s, "dEFullTag");
    _.w(d, "dename", s, "dEName");
    _.w(d, "dataAccCtrlArch", s);
    _.w(d, "dataAccCtrlMode", s);
    _.x(d, "dataTypeAppDEFieldId", s, "getDataTypePSAppDEField");
    _.x(d, "defaultAppDEDataExportId", s, "getDefaultPSAppDEDataExport");
    _.x(d, "defaultAppDEDataImportId", s, "getDefaultPSAppDEDataImport");
    _.x(d, "defaultAppDEPrintId", s, "getDefaultPSAppDEPrint");
    _.w(d, "dynaSysMode", s, "", 0);
    _.w(d, "enableUIActions", s);
    _.x(d, "formTypeAppDEFieldId", s, "getFormTypePSAppDEField");
    _.x(d, "indexTypeAppDEFieldId", s, "getIndexTypePSAppDEField");
    _.x(d, "keyAppDEFieldId", s, "getKeyPSAppDEField");
    _.v(d, "lnlanguageRes", c.s("res.LanguageRes[]", s, "getLNPSLanguageRes"));
    _.w(d, "logicName", s);
    _.y(d, "mainStateAppDEFieldIds", s, "getMainStatePSAppDEFields");
    _.x(d, "majorAppDEFieldId", s, "getMajorPSAppDEField");
    _.v(
      d,
      "minorAppDERSs",
      c.m("app.dataentity.AppDERS[]", s, "getMinorPSAppDERSs")
    );
    _.x(d, "orgIdAppDEFieldId", s, "getOrgIdPSAppDEField");
    _.v(d, "sysImage", c.s("res.SysImage[]", s, "getPSSysImage"));
    _.y(d, "quickSearchAppDEFieldIds", s, "getQuickSearchPSAppDEFields");
    _.w(d, "requestPaths", s, "requestPaths");
    _.w(d, "storageMode", s);
    _.w(d, "sysAPITag", s);
    _.y(d, "unionKeyValueAppDEFieldIds", s, "getUnionKeyValuePSAppDEFields");
    _.w(d, "defaultMode", s);
    _.w(d, "enableDEMainState", s);
    _.w(d, "enableFilterActions", s);
    _.w(d, "enableTempData", s);
    _.w(d, "enableWFActions", s);
    _.w(d, "major", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/func/app-func-writer.mjs
var AppFuncWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "appFuncType", s);
    _.w(d, "codeName", s);
    _.w(d, "funcSN", s);
    _.w(d, "htmlPageUrl", s);
    _.w(d, "jscode", s, "jSCode");
    _.v(
      d,
      "nameLanguageRes",
      c.s("res.LanguageRes[]", s, "getNamePSLanguageRes")
    );
    _.w(d, "openMode", s);
    _.w(d, "openViewParam", s);
    _.x(d, "appViewId", s, "getPSAppView");
    _.v(
      d,
      "navigateContexts",
      c.m("control.NavigateContext[]", s, "getPSNavigateContexts")
    );
    _.v(
      d,
      "navigateParams",
      c.m("control.NavigateParam[]", s, "getPSNavigateParams")
    );
    _.w(d, "pdtappFuncId", s, "getPSPDTAppFuncId");
    _.x(d, "uiactionId", s, "getPSUIAction");
    _.w(d, "predefinedType", s);
    _.w(d, "predefinedTypeParam", s);
    _.w(d, "tooltip", s);
    _.v(
      d,
      "tooltipLanguageRes",
      c.s("res.LanguageRes[]", s, "getTooltipPSLanguageRes")
    );
    _.w(d, "userData", s);
    _.w(d, "userData2", s);
    _.w(d, "systemReserved", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/res/sys-view-logic-writer.mjs
var SysViewLogicWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "codeName", s);
    _.w(d, "logicType", s);
    _.w(d, "viewLogicStyle", s);
    _.w(d, "viewLogicType", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/logic/app-uilogic-writer.mjs
var AppUILogicWriter = class extends SysViewLogicWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.x(d, "appDEUILogicId", s, "getPSAppDEUILogic");
    _.x(d, "appDataEntityId", s, "getPSAppDataEntity");
    _.v(
      d,
      "appUILogicRefViews",
      c.m("app.logic.AppUILogicRefView[]", s, "getPSAppUILogicRefViews")
    );
    _.x(d, "sysPFPluginId", s, "getPSSysPFPlugin");
    _.w(d, "builtinLogic", s, "", true);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/logic/builtin-app-uilogic-writer-base.mjs
var BuiltinAppUILogicWriterBase = class extends AppUILogicWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/logic/builtin-app-uinew-data-logic-writer.mjs
var BuiltinAppUINewDataLogicWriter = class extends BuiltinAppUILogicWriterBase {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "actionAfterWizard", s);
    _.x(d, "batchAddAppDEActionId", s, "getBatchAddPSAppDEAction");
    _.v(
      d,
      "batchAddAppViews",
      c.m("app.logic.AppUILogicRefView[]", s, "getBatchAddPSAppViews")
    );
    _.v(
      d,
      "newDataAppView",
      c.s("app.logic.AppUILogicRefView[]", s, "getNewDataPSAppView")
    );
    _.v(
      d,
      "newDataAppViews",
      c.m("app.logic.AppUILogicRefView[]", s, "getNewDataPSAppViews")
    );
    _.v(
      d,
      "wizardAppView",
      c.s("app.logic.AppUILogicRefView[]", s, "getWizardPSAppView")
    );
    _.w(d, "batchAddOnly", s);
    _.w(d, "enableBatchAdd", s);
    _.w(d, "enableWizardAdd", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/logic/builtin-app-uiopen-data-logic-writer.mjs
var BuiltinAppUIOpenDataLogicWriter = class extends BuiltinAppUILogicWriterBase {
  onFillDSL(c, s, d) {
    const _ = this;
    _.v(
      d,
      "openDataAppView",
      c.s("app.logic.AppUILogicRefView[]", s, "getOpenDataPSAppView")
    );
    _.v(
      d,
      "openDataAppViews",
      c.m("app.logic.AppUILogicRefView[]", s, "getOpenDataPSAppViews")
    );
    _.w(d, "editMode", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/logic/app-uilogic-ref-view-writer.mjs
var AppUILogicRefViewWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "openMode", s);
    _.v(
      d,
      "navigateContexts",
      c.m("control.NavigateContext[]", s, "getPSNavigateContexts")
    );
    _.v(
      d,
      "navigateParams",
      c.m("control.NavigateParam[]", s, "getPSNavigateParams")
    );
    _.w(d, "refMode", s);
    _.x(d, "refAppViewId", s, "getRefPSAppView");
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/msg/app-msg-templ-writer.mjs
var AppMsgTemplWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "codeName", s);
    _.w(d, "content", s);
    _.v(
      d,
      "contentLanguageRes",
      c.s("res.LanguageRes[]", s, "getContentPSLanguageRes")
    );
    _.w(d, "contentType", s);
    _.w(d, "ddcontent", s, "dDContent");
    _.v(d, "ddlanguageRes", c.s("res.LanguageRes[]", s, "getDDPSLanguageRes"));
    _.w(d, "imcontent", s, "iMContent");
    _.v(d, "imlanguageRes", c.s("res.LanguageRes[]", s, "getIMPSLanguageRes"));
    _.w(d, "mobTaskUrl", s);
    _.w(d, "smscontent", s, "sMSContent");
    _.v(
      d,
      "smslanguageRes",
      c.s("res.LanguageRes[]", s, "getSMSPSLanguageRes")
    );
    _.v(
      d,
      "subLanguageRes",
      c.s("res.LanguageRes[]", s, "getSubPSLanguageRes")
    );
    _.w(d, "subject", s);
    _.w(d, "taskUrl", s);
    _.w(d, "wxcontent", s, "wXContent");
    _.v(d, "wxlanguageRes", c.s("res.LanguageRes[]", s, "getWXPSLanguageRes"));
    _.w(d, "mailGroupSend", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/app-lan-writer.mjs
var AppLanWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.v(
      d,
      "languageItems",
      c.m("res.LanguageItem[]", s, "getAllPSLanguageItems")
    );
    _.w(d, "language", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/app-method-dtofield-writer.mjs
var AppMethodDTOFieldWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "codeName", s);
    _.w(d, "jsonFormat", s);
    _.w(d, "logicName", s);
    _.x(d, "refAppDEMethodDTOId", s, "getRefPSAppDEMethodDTO");
    _.x(d, "refAppDataEntityId", s, "getRefPSAppDataEntity");
    _.x(d, "refAppMethodDTOId", s, "getRefPSAppMethodDTO");
    _.w(d, "sourceType", s);
    _.w(d, "stdDataType", s, "", 0);
    _.w(d, "type", s);
    _.w(d, "allowEmpty", s, "", true);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/app-method-dtowriter.mjs
var AppMethodDTOWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "codeName", s);
    _.v(
      d,
      "appMethodDTOFields",
      c.m("app.AppMethodDTOField[]", s, "getPSAppMethodDTOFields")
    );
    _.w(d, "sourceType", s);
    _.w(d, "tag", s);
    _.w(d, "tag2", s);
    _.w(d, "type", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/app-resource-writer.mjs
var AppResourceWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "content", s);
    _.w(d, "resTag", s);
    _.w(d, "resourceType", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/app-util-page-writer.mjs
var AppUtilPageWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.x(d, "appViewId", s, "getPSAppView");
    _.w(d, "pageUrl", s);
    _.w(d, "targetType", s);
    _.w(d, "utilParams", s);
    _.w(d, "utilTag", s);
    _.w(d, "utilType", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/application-writer.mjs
var ApplicationWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "accessKeys", s, "accessKeys");
    _.y(d, "appBISchemeIds", s, "getAllPSAppBISchemes");
    _.v(
      d,
      "appDEUIActions",
      c.m("app.dataentity.AppDEUIAction[]", s, "getAllPSAppDEUIActions")
    );
    _.v(d, "appFuncs", c.m("app.func.AppFunc[]", s, "getAllPSAppFuncs"));
    _.v(
      d,
      "appMethodDTOs",
      c.m("app.AppMethodDTO[]", s, "getAllPSAppMethodDTOs")
    );
    _.v(
      d,
      "appMsgTempls",
      c.m("app.msg.AppMsgTempl[]", s, "getAllPSAppMsgTempls")
    );
    _.v(
      d,
      "appPFPluginRefs",
      c.m("app.res.AppPFPluginRef[]", s, "getAllPSAppPFPluginRefs")
    );
    _.v(
      d,
      "appPortletCats",
      c.m("app.control.AppPortletCat[]", s, "getAllPSAppPortletCats")
    );
    _.v(
      d,
      "appPortlets",
      c.m("app.control.AppPortlet[]", s, "getAllPSAppPortlets")
    );
    _.v(d, "appResources", c.m("app.AppResource[]", s, "getAllPSAppResources"));
    _.v(
      d,
      "appSubViewTypeRefs",
      c.m("app.res.AppSubViewTypeRef[]", s, "getAllPSAppSubViewTypeRefs")
    );
    _.v(
      d,
      "appUILogics",
      c.m("app.logic.AppUILogic[]", s, "getAllPSAppUILogics")
    );
    _.v(
      d,
      "appUIThemes",
      c.m("app.theme.AppUITheme[]", s, "getAllPSAppUIThemes")
    );
    _.v(d, "appUtilPages", c.m("app.AppUtilPage[]", s, "getAllPSAppUtilPages"));
    _.v(d, "appUtils", c.m("app.util.AppUtil[]", s, "getAllPSAppUtils"));
    _.v(
      d,
      "appViewMsgGroups",
      c.m("app.view.AppViewMsgGroup[]", s, "getAllPSAppViewMsgGroups")
    );
    _.v(
      d,
      "appViewMsgs",
      c.m("app.view.AppViewMsg[]", s, "getAllPSAppViewMsgs")
    );
    _.v(d, "appWFs", c.m("app.wf.AppWF[]", s, "getAllPSAppWFs"));
    _.v(
      d,
      "deopprivs",
      c.m("dataentity.priv.DEOPPriv[]", s, "getAllPSDEOPPrivs")
    );
    _.v(d, "subAppRefs", c.m("app.SubAppRef[]", s, "getAllPSSubAppRefs"));
    _.w(d, "appFolder", s);
    _.w(d, "appMode", s);
    _.w(d, "appTag", s);
    _.w(d, "appTag2", s);
    _.w(d, "appTag3", s);
    _.w(d, "appTag4", s);
    _.w(d, "appType", s);
    _.w(d, "appVersion", s);
    _.w(d, "bottomInfo", s);
    _.w(d, "caption", s);
    _.w(d, "codeName", s);
    _.w(d, "defaultOSSCat", s);
    _.w(d, "dynaSysMode", s, "", 0);
    _.w(d, "engineVer", s);
    _.w(d, "headerInfo", s);
    _.w(d, "pfstyle", s, "pFStyle");
    _.w(d, "pftype", s, "pFType");
    _.w(d, "pkgcodeName", s, "pKGCodeName");
    _.v(
      d,
      "applicationLogics",
      c.m("app.ApplicationLogic[]", s, "getPSApplicationLogics")
    );
    _.v(d, "sysImage", c.s("res.SysImage[]", s, "getPSSysImage"));
    _.w(d, "serviceCodeName", s);
    _.w(d, "subAppAccessKey", s);
    _.w(d, "subCaption", s);
    _.w(d, "sysCodeName", s);
    _.w(d, "title", s);
    _.w(d, "viewCodeNameMode", s);
    _.w(d, "enableServiceAPIDTO", s);
    _.w(d, "enableUACLogin", s);
    _.w(d, "enableUIModelEx", s);
    _.w(d, "mobileApp", s);
    _.w(d, "useServiceApi", s);
    _.w(d, "wfappMode", s, "wFAppMode");
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/application-logic-writer.mjs
var ApplicationLogicWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "eventArg", s);
    _.w(d, "eventArg2", s);
    _.w(d, "eventNames", s);
    _.w(d, "logicTag", s);
    _.w(d, "logicType", s);
    _.x(d, "appDataEntityId", s, "getPSAppDataEntity");
    _.x(d, "appUILogicId", s, "getPSAppUILogic");
    _.w(d, "scriptCode", s);
    _.w(d, "timer", s, "", 0);
    _.w(d, "triggerType", s, "", "APPEVENT");
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/sub-app-ref-writer.mjs
var SubAppRefWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "accessKey", s);
    _.y(d, "appDEUIActionGroupIds", s, "getAllPSAppDEUIActionGroups");
    _.y(d, "appMenuModelIds", s, "getAllPSAppMenuModels");
    _.y(d, "appPFPluginRefIds", s, "getAllPSAppPFPluginRefs");
    _.y(d, "appPortletIds", s, "getAllPSAppPortlets");
    _.y(d, "appViewRefIds", s, "getAllPSAppViewRefs");
    _.y(d, "appViewIds", s, "getAllPSAppViews");
    _.y(d, "controlIds", s, "getAllPSControls");
    _.y(d, "dedrcontrolIds", s, "getAllPSDEDRControls");
    _.w(d, "modelStamp", s);
    _.v(
      d,
      "appMenuModel",
      c.s("app.appmenu.AppMenuModel[]", s, "getPSAppMenuModel")
    );
    _.w(d, "refParam", s);
    _.w(d, "refParam2", s);
    _.w(d, "serviceId", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/res/app-pfplugin-ref-writer.mjs
var AppPFPluginRefWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "pluginCode", s);
    _.w(d, "pluginModel", s);
    _.w(d, "pluginParams", s);
    _.w(d, "pluginType", s);
    _.w(d, "rtobjectName", s, "rTObjectName");
    _.w(d, "rtobjectRepo", s, "rTObjectRepo");
    _.w(d, "refMode", s);
    _.w(d, "refTag", s);
    _.w(d, "refTag2", s);
    _.w(d, "templCode", s);
    _.w(d, "templCode2", s);
    _.w(d, "templCode3", s);
    _.w(d, "templCode4", s);
    _.w(d, "extendStyleOnly", s);
    _.w(d, "replaceDefault", s);
    _.w(d, "runtimeObject", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/res/app-sub-view-type-ref-writer.mjs
var AppSubViewTypeRefWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.x(d, "sysPFPluginId", s, "getPSSysPFPlugin");
    _.v(
      d,
      "viewLayoutPanel",
      c.s("control.panel.ViewLayoutPanel[]", s, "getPSViewLayoutPanel")
    );
    _.w(d, "pluginCode", s);
    _.w(d, "refTag", s);
    _.w(d, "typeCode", s);
    _.w(d, "viewModel", s);
    _.w(d, "viewType", s);
    _.w(d, "extendStyleOnly", s);
    _.w(d, "replaceDefault", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/theme/app-uitheme-writer.mjs
var AppUIThemeWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "cssStyle", s);
    _.w(d, "themeDesc", s);
    _.w(d, "themeParams", s);
    _.w(d, "themeTag", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/util/app-util-writer.mjs
var AppUtilWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "codeName", s);
    _.x(d, "sysPFPluginId", s, "getPSSysPFPlugin");
    _.w(d, "utilDE10Name", s, "utilPSDE10Name");
    _.w(d, "utilDE2Name", s, "utilPSDE2Name");
    _.w(d, "utilDE3Name", s, "utilPSDE3Name");
    _.w(d, "utilDE4Name", s, "utilPSDE4Name");
    _.w(d, "utilDE5Name", s, "utilPSDE5Name");
    _.w(d, "utilDE6Name", s, "utilPSDE6Name");
    _.w(d, "utilDE7Name", s, "utilPSDE7Name");
    _.w(d, "utilDE8Name", s, "utilPSDE8Name");
    _.w(d, "utilDE9Name", s, "utilPSDE9Name");
    _.w(d, "utilDEName", s, "utilPSDEName");
    _.w(d, "utilParams", s);
    _.w(d, "utilTag", s);
    _.w(d, "utilType", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/util/app-dyna-util-writer-base.mjs
var AppDynaUtilWriterBase = class extends AppUtilWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.x(d, "appIdAppDEFieldId", s, "getAppIdPSAppDEField");
    _.x(d, "createAppDEActionId", s, "getCreatePSAppDEAction");
    _.x(d, "getAppDEActionId", s, "getGetPSAppDEAction");
    _.x(d, "modelIdAppDEFieldId", s, "getModelIdPSAppDEField");
    _.x(d, "modelAppDEFieldId", s, "getModelPSAppDEField");
    _.x(d, "removeAppDEActionId", s, "getRemovePSAppDEAction");
    _.x(d, "stoageAppDataEntityId", s, "getStoagePSAppDataEntity");
    _.x(d, "storageAppDataEntityId", s, "getStoragePSAppDataEntity");
    _.x(d, "updateAppDEActionId", s, "getUpdatePSAppDEAction");
    _.x(d, "userIdAppDEFieldId", s, "getUserIdPSAppDEField");
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/util/app-dyna-dashboard-util-writer.mjs
var AppDynaDashboardUtilWriter = class extends AppDynaUtilWriterBase {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/util/app-filter-storage-util-writer.mjs
var AppFilterStorageUtilWriter = class extends AppDynaUtilWriterBase {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-view-writer.mjs
var AppViewWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "accUserMode", s);
    _.w(d, "accessKey", s);
    _.v(
      d,
      "capLanguageRes",
      c.s("res.LanguageRes[]", s, "getCapPSLanguageRes")
    );
    _.w(d, "caption", s);
    _.w(d, "codeName", s);
    _.w(d, "dynaSysMode", s, "", 0);
    _.w(d, "height", s, "", 0);
    _.v(
      d,
      "appCounterRefs",
      c.m("app.control.AppCounterRef[]", s, "getPSAppCounterRefs")
    );
    _.x(d, "appDataEntityId", s, "getPSAppDataEntity");
    _.v(
      d,
      "appViewEngines",
      c.m("app.view.AppViewEngine[]", s, "getPSAppViewEngines")
    );
    _.v(
      d,
      "appViewLogics",
      c.m("app.view.AppViewLogic[]", s, "getPSAppViewLogics")
    );
    _.x(d, "appViewMsgGroupId", s, "getPSAppViewMsgGroup");
    _.v(
      d,
      "appViewNavContexts",
      c.m("app.view.AppViewNavContext[]", s, "getPSAppViewNavContexts")
    );
    _.v(
      d,
      "appViewNavParams",
      c.m("app.view.AppViewNavParam[]", s, "getPSAppViewNavParams")
    );
    _.v(
      d,
      "appViewParams",
      c.m("app.view.AppViewParam[]", s, "getPSAppViewParams")
    );
    _.v(d, "appViewRefs", c.m("app.view.AppViewRef[]", s, "getPSAppViewRefs"));
    _.v(d, "controls", c.m("control.Control[]", s, "getPSControls"));
    _.v(d, "sysCss", c.s("res.SysCss[]", s, "getPSSysCss"));
    _.v(d, "sysImage", c.s("res.SysImage[]", s, "getPSSysImage"));
    _.x(d, "sysPFPluginId", s, "getPSSysPFPlugin");
    _.v(
      d,
      "viewLayoutPanel",
      c.s("control.panel.ViewLayoutPanel[]", s, "getPSViewLayoutPanel")
    );
    _.w(d, "priority", s);
    _.v(
      d,
      "subCapLanguageRes",
      c.s("res.LanguageRes[]", s, "getSubCapPSLanguageRes")
    );
    _.w(d, "subCaption", s);
    _.w(d, "title", s);
    _.v(
      d,
      "titleLanguageRes",
      c.s("res.LanguageRes[]", s, "getTitlePSLanguageRes")
    );
    _.w(d, "viewStyle", s);
    _.w(d, "viewType", s);
    _.w(d, "width", s, "", 0);
    _.w(d, "enableDP", s);
    _.w(d, "redirectView", s);
    _.w(d, "showCaptionBar", s, "", true);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-deview-writer.mjs
var AppDEViewWriter = class extends AppViewWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "funcViewMode", s);
    _.w(d, "funcViewParam", s);
    _.w(d, "openMode", s);
    _.x(d, "appCounterRefId", s, "getPSAppCounterRef");
    _.w(d, "deviewCodeName", s, "getPSDEViewCodeName");
    _.w(d, "deviewId", s, "getPSDEViewId");
    _.w(d, "tempMode", s, "", 0);
    _.w(d, "enableWF", s);
    _.x(d, "appWFId", s, "getPSAppWF");
    _.x(d, "appWFVerId", s, "getPSAppWFVer");
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-dexdata-view-writer.mjs
var AppDEXDataViewWriter = class extends AppDEViewWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "xdataControlName", s, "xDataControlName");
    _.w(d, "loadDefault", s, "", true);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-demulti-data-view-writer.mjs
var AppDEMultiDataViewWriter = class extends AppDEXDataViewWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "expandSearchForm", s);
    _.w(d, "pickupMode", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-deside-bar-explorer-view-writer.mjs
var AppDESideBarExplorerViewWriter = class extends AppDEMultiDataViewWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "markOpenDataMode", s);
    _.w(d, "sideBarLayout", s);
    _.w(d, "showDataInfoBar", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-decalendar-explorer-view-writer.mjs
var AppDECalendarExplorerViewWriter = class extends AppDESideBarExplorerViewWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-demulti-data-view2-writer.mjs
var AppDEMultiDataView2Writer = class extends AppDEMultiDataViewWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "mdctrlActiveMode", s, "mDCtrlActiveMode");
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-decalendar-view-writer.mjs
var AppDECalendarViewWriter = class extends AppDEMultiDataView2Writer {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-dechart-explorer-view-writer.mjs
var AppDEChartExplorerViewWriter = class extends AppDESideBarExplorerViewWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-desearch-view-writer.mjs
var AppDESearchViewWriter = class extends AppDEViewWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "enableQuickSearch", s);
    _.w(d, "enableSearch", s);
    _.w(d, "expandSearchForm", s);
    _.w(d, "loadDefault", s);
    _.x(d, "quickGroupCodeListId", s, "getQuickGroupPSCodeList");
    _.w(d, "enableQuickGroup", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-dechart-view-writer.mjs
var AppDEChartViewWriter = class extends AppDESearchViewWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-decustom-view-writer.mjs
var AppDECustomViewWriter = class extends AppDEViewWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-dedashboard-view-writer.mjs
var AppDEDashboardViewWriter = class extends AppDESearchViewWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "markOpenDataMode", s);
    _.w(d, "showDataInfoBar", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-view-msg-writer.mjs
var AppViewMsgWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "codeName", s);
    _.w(d, "dataAccessAction", s);
    _.w(d, "dynamicMode", s, "", 0);
    _.w(d, "enableMode", s, "", "ALL");
    _.w(d, "message", s);
    _.w(d, "messageType", s);
    _.x(d, "appDataEntityId", s, "getPSAppDataEntity");
    _.x(d, "appMsgTemplId", s, "getPSAppMsgTempl");
    _.v(
      d,
      "layoutPanel",
      c.s("control.panel.LayoutPanel[]", s, "getPSLayoutPanel")
    );
    _.v(d, "sysCss", c.s("res.SysCss[]", s, "getPSSysCss"));
    _.v(d, "sysImage", c.s("res.SysImage[]", s, "getPSSysImage"));
    _.w(d, "position", s);
    _.w(d, "removeMode", s);
    _.x(d, "testAppDELogicId", s, "getTestPSAppDELogic");
    _.x(d, "testDEOPPrivId", s, "getTestPSDEOPPriv");
    _.w(d, "testScriptCode", s);
    _.w(d, "title", s);
    _.w(d, "titleLanResTag", s);
    _.v(
      d,
      "titleLanguageRes",
      c.s("res.LanguageRes[]", s, "getTitlePSLanguageRes")
    );
    _.w(d, "enableRemove", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-dedata-set-view-msg-writer.mjs
var AppDEDataSetViewMsgWriter = class extends AppViewMsgWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "cacheScope", s);
    _.x(d, "cacheTag2AppDEFieldId", s, "getCacheTag2PSAppDEField");
    _.x(d, "cacheTagAppDEFieldId", s, "getCacheTagPSAppDEField");
    _.w(d, "cacheTimeout", s);
    _.x(d, "contentAppDEFieldId", s, "getContentPSAppDEField");
    _.x(d, "contentTypeAppDEFieldId", s, "getContentTypePSAppDEField");
    _.x(d, "msgPosAppDEFieldId", s, "getMsgPosPSAppDEField");
    _.x(d, "msgTypeAppDEFieldId", s, "getMsgTypePSAppDEField");
    _.x(d, "orderValueAppDEFieldId", s, "getOrderValuePSAppDEField");
    _.x(d, "appDEDataSetId", s, "getPSAppDEDataSet");
    _.x(d, "removeFlagAppDEFieldId", s, "getRemoveFlagPSAppDEField");
    _.x(d, "titleLanResTagAppDEFieldId", s, "getTitleLanResTagPSAppDEField");
    _.x(d, "titleAppDEFieldId", s, "getTitlePSAppDEField");
    _.w(d, "enableCache", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-dedata-view-explorer-view-writer.mjs
var AppDEDataViewExplorerViewWriter = class extends AppDESideBarExplorerViewWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-dedata-view-writer.mjs
var AppDEDataViewWriter = class extends AppDEMultiDataView2Writer {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-deedit-view-writer.mjs
var AppDEEditViewWriter = class extends AppDEXDataViewWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "markOpenDataMode", s);
    _.w(d, "multiFormMode", s, "", 0);
    _.w(d, "enableDirtyChecking", s, "", true);
    _.w(d, "hideEditForm", s);
    _.w(d, "manualAppendForms", s);
    _.w(d, "showDataInfoBar", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-deedit-view9-writer.mjs
var AppDEEditView9Writer = class extends AppDEEditViewWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-depickup-data-view-writer.mjs
var AppDEPickupDataViewWriter = class extends AppDEDataViewWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-deform-pickup-data-view-writer.mjs
var AppDEFormPickupDataViewWriter = class extends AppDEPickupDataViewWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-degantt-explorer-view-writer.mjs
var AppDEGanttExplorerViewWriter = class extends AppDESideBarExplorerViewWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-detree-view-writer-base.mjs
var AppDETreeViewWriterBase = class extends AppDEMultiDataView2Writer {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-degantt-view-writer.mjs
var AppDEGanttViewWriter = class extends AppDETreeViewWriterBase {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-degrid-explorer-view-writer.mjs
var AppDEGridExplorerViewWriter = class extends AppDESideBarExplorerViewWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-degrid-view-writer.mjs
var AppDEGridViewWriter = class extends AppDEMultiDataViewWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "gridRowActiveMode", s);
    _.w(d, "enableRowEdit", s);
    _.w(d, "rowEditDefault", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-degrid-view8-writer.mjs
var AppDEGridView8Writer = class extends AppDEGridViewWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-degrid-view9-writer.mjs
var AppDEGridView9Writer = class extends AppDEGridViewWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-dehtml-view-writer.mjs
var AppDEHtmlViewWriter = class extends AppDEViewWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "htmlUrl", s);
    _.w(d, "loadDefault", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-deindex-pickup-data-view-writer.mjs
var AppDEIndexPickupDataViewWriter = class extends AppDEPickupDataViewWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-deindex-view-writer.mjs
var AppDEIndexViewWriter = class extends AppDEXDataViewWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "markOpenDataMode", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-dekanban-view-writer.mjs
var AppDEKanbanViewWriter = class extends AppDEMultiDataView2Writer {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-delist-explorer-view-writer.mjs
var AppDEListExplorerViewWriter = class extends AppDESideBarExplorerViewWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-delist-view-writer.mjs
var AppDEListViewWriter = class extends AppDEMultiDataView2Writer {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-demedit-view-writer.mjs
var AppDEMEditViewWriter = class extends AppDEMultiDataViewWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-depickup-view-writer.mjs
var AppDEPickupViewWriter = class extends AppDEViewWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-dempickup-view-writer.mjs
var AppDEMPickupViewWriter = class extends AppDEPickupViewWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-demap-explorer-view-writer.mjs
var AppDEMapExplorerViewWriter = class extends AppDESideBarExplorerViewWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-demap-view-writer.mjs
var AppDEMapViewWriter = class extends AppDEMultiDataView2Writer {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-demob-calendar-explorer-view-writer.mjs
var AppDEMobCalendarExplorerViewWriter = class extends AppDECalendarExplorerViewWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "enablePullDownRefresh", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-demob-calendar-view-writer.mjs
var AppDEMobCalendarViewWriter = class extends AppDECalendarViewWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "enablePullDownRefresh", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-demob-chart-explorer-view-writer.mjs
var AppDEMobChartExplorerViewWriter = class extends AppDEChartExplorerViewWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "enablePullDownRefresh", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-demob-chart-view-writer.mjs
var AppDEMobChartViewWriter = class extends AppDEChartViewWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "enablePullDownRefresh", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-demob-custom-view-writer.mjs
var AppDEMobCustomViewWriter = class extends AppDECustomViewWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "enablePullDownRefresh", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-demob-dashboard-view-writer.mjs
var AppDEMobDashboardViewWriter = class extends AppDEDashboardViewWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "enablePullDownRefresh", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-demob-data-view-explorer-view-writer.mjs
var AppDEMobDataViewExplorerViewWriter = class extends AppDEDataViewExplorerViewWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "enablePullDownRefresh", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-demob-data-view-writer.mjs
var AppDEMobDataViewWriter = class extends AppDEDataViewWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "enablePullDownRefresh", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-demob-edit-view-writer.mjs
var AppDEMobEditViewWriter = class extends AppDEEditViewWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "enablePullDownRefresh", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-demob-gantt-explorer-view-writer.mjs
var AppDEMobGanttExplorerViewWriter = class extends AppDEGanttExplorerViewWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "enablePullDownRefresh", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-demob-gantt-view-writer.mjs
var AppDEMobGanttViewWriter = class extends AppDEGanttViewWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "enablePullDownRefresh", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-demob-html-view-writer.mjs
var AppDEMobHtmlViewWriter = class extends AppDEHtmlViewWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "enablePullDownRefresh", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-demob-list-explorer-view-writer.mjs
var AppDEMobListExplorerViewWriter = class extends AppDEListExplorerViewWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "enablePullDownRefresh", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-demob-list-view-writer.mjs
var AppDEMobListViewWriter = class extends AppDEMultiDataViewWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "enablePullDownRefresh", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-demob-mdview-writer.mjs
var AppDEMobMDViewWriter = class extends AppDEMultiDataViewWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "enablePullDownRefresh", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-demob-medit-view-writer.mjs
var AppDEMobMEditViewWriter = class extends AppDEMEditViewWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "enablePullDownRefresh", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-demob-mpickup-view-writer.mjs
var AppDEMobMPickupViewWriter = class extends AppDEMPickupViewWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "enablePullDownRefresh", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-demob-map-explorer-view-writer.mjs
var AppDEMobMapExplorerViewWriter = class extends AppDEMapExplorerViewWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "enablePullDownRefresh", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-demob-map-view-writer.mjs
var AppDEMobMapViewWriter = class extends AppDEMapViewWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "enablePullDownRefresh", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-depanel-view-writer.mjs
var AppDEPanelViewWriter = class extends AppDEViewWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-demob-panel-view-writer.mjs
var AppDEMobPanelViewWriter = class extends AppDEPanelViewWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "enablePullDownRefresh", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-demob-pickup-list-view-writer.mjs
var AppDEMobPickupListViewWriter = class extends AppDEMobListViewWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-demob-pickup-mdview-writer.mjs
var AppDEMobPickupMDViewWriter = class extends AppDEMobMDViewWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-detree-view-writer.mjs
var AppDETreeViewWriter = class extends AppDETreeViewWriterBase {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-demob-tree-view-writer.mjs
var AppDEMobTreeViewWriter = class extends AppDETreeViewWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "enablePullDownRefresh", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-demob-pickup-tree-view-writer.mjs
var AppDEMobPickupTreeViewWriter = class extends AppDEMobTreeViewWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-demob-pickup-view-writer.mjs
var AppDEMobPickupViewWriter = class extends AppDEPickupViewWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "enablePullDownRefresh", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-deredirect-view-writer.mjs
var AppDERedirectViewWriter = class extends AppDEViewWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.x(d, "getDataAppDEActionId", s, "getGetDataPSAppDEAction");
    _.v(
      d,
      "redirectAppViewRefs",
      c.m("app.view.AppViewRef[]", s, "getRedirectPSAppViewRefs")
    );
    _.x(d, "typeAppDEFieldId", s, "getTypePSAppDEField");
    _.w(d, "enableCustomGetDataAction", s);
    _.w(d, "enableWorkflow", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-demob-redirect-view-writer.mjs
var AppDEMobRedirectViewWriter = class extends AppDERedirectViewWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-dereport-view-writer.mjs
var AppDEReportViewWriter = class extends AppDESearchViewWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "markOpenDataMode", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-demob-report-view-writer.mjs
var AppDEMobReportViewWriter = class extends AppDEReportViewWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "enablePullDownRefresh", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-deexplorer-view-writer.mjs
var AppDEExplorerViewWriter = class extends AppDEViewWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "markOpenDataMode", s);
    _.w(d, "loadDefault", s);
    _.w(d, "showDataInfoBar", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-detab-explorer-view-writer.mjs
var AppDETabExplorerViewWriter = class extends AppDEExplorerViewWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "tabLayout", s);
    _.w(d, "enableQuickSearch", s);
    _.w(d, "enableSearch", s);
    _.w(d, "expandSearchForm", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-demob-tab-explorer-view-writer.mjs
var AppDEMobTabExplorerViewWriter = class extends AppDETabExplorerViewWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "enablePullDownRefresh", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-detab-search-view-writer.mjs
var AppDETabSearchViewWriter = class extends AppDETabExplorerViewWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-demob-tab-search-view-writer.mjs
var AppDEMobTabSearchViewWriter = class extends AppDETabSearchViewWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "enablePullDownRefresh", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-detree-explorer-view-writer.mjs
var AppDETreeExplorerViewWriter = class extends AppDEMultiDataViewWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "markOpenDataMode", s);
    _.w(d, "showDataInfoBar", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-demob-tree-explorer-view-writer.mjs
var AppDEMobTreeExplorerViewWriter = class extends AppDETreeExplorerViewWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "enablePullDownRefresh", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-dewfaction-view-writer.mjs
var AppDEWFActionViewWriter = class extends AppDEEditViewWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "wfstepValue", s, "wFStepValue");
    _.w(d, "wfutilType", s, "wFUtilType");
    _.w(d, "wfiamode", s, "wFIAMode");
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-demob-wfaction-view-writer.mjs
var AppDEMobWFActionViewWriter = class extends AppDEWFActionViewWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "enablePullDownRefresh", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-dewfdata-redirect-view-writer.mjs
var AppDEWFDataRedirectViewWriter = class extends AppDERedirectViewWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-demob-wfdata-redirect-view-writer.mjs
var AppDEMobWFDataRedirectViewWriter = class extends AppDEWFDataRedirectViewWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "enablePullDownRefresh", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-demob-wfdyna-action-view-writer.mjs
var AppDEMobWFDynaActionViewWriter = class extends AppDEMobWFActionViewWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-dewfedit-view-writer.mjs
var AppDEWFEditViewWriter = class extends AppDEEditViewWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "wfstepValue", s, "wFStepValue");
    _.w(d, "wfiamode", s, "wFIAMode");
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-demob-wfedit-view-writer.mjs
var AppDEMobWFEditViewWriter = class extends AppDEWFEditViewWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "enablePullDownRefresh", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-demob-wfdyna-edit-view-writer.mjs
var AppDEMobWFDynaEditViewWriter = class extends AppDEMobWFEditViewWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.v(
      d,
      "uiactionGroups",
      c.m("view.UIActionGroup[]", s, "getPSUIActionGroups")
    );
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-demob-wfmdview-writer.mjs
var AppDEMobWFMDViewWriter = class extends AppDEMobMDViewWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-demob-wfdyna-exp-mdview-writer.mjs
var AppDEMobWFDynaExpMDViewWriter = class extends AppDEMobWFMDViewWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-demob-wfdyna-start-view-writer.mjs
var AppDEMobWFDynaStartViewWriter = class extends AppDEMobWFEditViewWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-dewfproxy-result-view-writer.mjs
var AppDEWFProxyResultViewWriter = class extends AppDEViewWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-demob-wfproxy-result-view-writer.mjs
var AppDEMobWFProxyResultViewWriter = class extends AppDEWFProxyResultViewWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "enablePullDownRefresh", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-dewfproxy-start-view-writer.mjs
var AppDEWFProxyStartViewWriter = class extends AppDEViewWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-demob-wfproxy-start-view-writer.mjs
var AppDEMobWFProxyStartViewWriter = class extends AppDEWFProxyStartViewWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "enablePullDownRefresh", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-demob-wfstart-view-writer.mjs
var AppDEMobWFStartViewWriter = class extends AppDEMobWFEditViewWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-dewizard-view-writer.mjs
var AppDEWizardViewWriter = class extends AppDEViewWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-demob-wizard-view-writer.mjs
var AppDEMobWizardViewWriter = class extends AppDEWizardViewWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "enablePullDownRefresh", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-depickup-grid-view-writer.mjs
var AppDEPickupGridViewWriter = class extends AppDEGridViewWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-depickup-tree-view-writer.mjs
var AppDEPickupTreeViewWriter = class extends AppDETreeViewWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-desub-app-ref-view-writer.mjs
var AppDESubAppRefViewWriter = class extends AppDEViewWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-detree-explorer-view2-writer.mjs
var AppDETreeExplorerView2Writer = class extends AppDETreeExplorerViewWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-detree-grid-ex-view-writer.mjs
var AppDETreeGridExViewWriter = class extends AppDETreeViewWriterBase {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-detree-grid-view-writer.mjs
var AppDETreeGridViewWriter = class extends AppDEMultiDataViewWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "gridRowActiveMode", s, "", 2);
    _.w(d, "enableRowEdit", s);
    _.w(d, "rowEditDefault", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-view-engine-writer-base.mjs
var AppViewEngineWriterBase = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.v(d, "params", c.m("view.UIEngineParam[]", s, "getPSUIEngineParams"));
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-deview-engine-writer-base.mjs
var AppDEViewEngineWriterBase = class extends AppViewEngineWriterBase {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "engineCat", s);
    _.w(d, "engineType", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-deview-engine-writer.mjs
var AppDEViewEngineWriter = class extends AppDEViewEngineWriterBase {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-dewfdyna-action-view-writer.mjs
var AppDEWFDynaActionViewWriter = class extends AppDEWFActionViewWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-dewfdyna-edit-view-writer.mjs
var AppDEWFDynaEditViewWriter = class extends AppDEWFEditViewWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.v(
      d,
      "uiactionGroups",
      c.m("view.UIActionGroup[]", s, "getPSUIActionGroups")
    );
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-dewfgrid-view-writer.mjs
var AppDEWFGridViewWriter = class extends AppDEGridViewWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "wfstepValue", s, "wFStepValue");
    _.w(d, "wfiamode", s, "wFIAMode");
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-dewfdyna-exp-grid-view-writer.mjs
var AppDEWFDynaExpGridViewWriter = class extends AppDEWFGridViewWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-dewfdyna-start-view-writer.mjs
var AppDEWFDynaStartViewWriter = class extends AppDEWFEditViewWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-dewfedit-proxy-data-view-writer.mjs
var AppDEWFEditProxyDataViewWriter = class extends AppDEViewWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-dewfexplorer-view-writer.mjs
var AppDEWFExplorerViewWriter = class extends AppDEExplorerViewWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-dewfproxy-data-redirect-view-writer.mjs
var AppDEWFProxyDataRedirectViewWriter = class extends AppDERedirectViewWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-dewfproxy-data-view-writer.mjs
var AppDEWFProxyDataViewWriter = class extends AppDEViewWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-dewfstart-view-writer.mjs
var AppDEWFStartViewWriter = class extends AppDEWFEditViewWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-util-view-writer.mjs
var AppUtilViewWriter = class extends AppViewWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-error-view-writer.mjs
var AppErrorViewWriter = class extends AppUtilViewWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "errorCode", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-func-pickup-view-writer.mjs
var AppFuncPickupViewWriter = class extends AppUtilViewWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-index-view-writer.mjs
var AppIndexViewWriter = class extends AppViewWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "appIconPath", s);
    _.w(d, "appIconPath2", s);
    _.w(d, "appSwitchMode", s);
    _.w(d, "bottomInfo", s);
    _.x(d, "defAppViewId", s, "getDefPSAppView");
    _.w(d, "headerInfo", s);
    _.w(d, "mainMenuAlign", s);
    _.x(d, "portalAppCounterRefId", s, "getPortalPSAppCounterRef");
    _.w(d, "blankMode", s);
    _.w(d, "defaultPage", s);
    _.w(d, "enableAppSwitch", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-panel-view-writer.mjs
var AppPanelViewWriter = class extends AppViewWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-portal-view-writer.mjs
var AppPortalViewWriter = class extends AppViewWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-view-engine-param-writer.mjs
var AppViewEngineParamWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "appViewLogicName", s);
    _.w(d, "ctrlName", s);
    _.w(d, "paramType", s);
    _.w(d, "value", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-view-logic-writer-base.mjs
var AppViewLogicWriterBase = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "attrName", s);
    _.w(d, "eventArg", s);
    _.w(d, "eventArg2", s);
    _.w(d, "eventNames", s);
    _.w(d, "itemName", s);
    _.w(d, "logicTrigger", s);
    _.w(d, "logicType", s);
    _.w(d, "owner", s);
    _.x(d, "appDEUIActionId", s, "getPSAppDEUIAction");
    _.x(d, "appDEUILogicId", s, "getPSAppDEUILogic");
    _.x(d, "appDataEntityId", s, "getPSAppDataEntity");
    if (_.g(s, "getPSAppUILogic")) {
      if (_.g(_.g(s, "getPSAppUILogic"), "name")) {
        _.v(
          d,
          "builtinAppUILogic",
          c.s("app.logic.AppUILogic[]", s, "getPSAppUILogic")
        );
      } else {
        _.x(d, "appUILogicId", s, "getPSAppUILogic");
      }
    }
    _.x(d, "appViewEngineId", s, "getPSAppViewEngine");
    _.x(d, "appViewLogicId", s, "getPSAppViewLogic");
    _.x(d, "sysPFPluginId", s, "getPSSysPFPlugin");
    _.w(d, "ctrlName", s, "getPSViewCtrlName");
    _.w(d, "scriptCode", s);
    _.w(d, "timer", s, "", 0);
    _.w(d, "builtinLogic", s, "", true);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-view-logic-writer.mjs
var AppViewLogicWriter = class extends AppViewLogicWriterBase {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-view-msg-group-detail-writer.mjs
var AppViewMsgGroupDetailWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.x(d, "appViewMsgId", s, "getPSAppViewMsg");
    _.w(d, "position", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-view-msg-group-writer.mjs
var AppViewMsgGroupWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "bodyStyle", s);
    _.w(d, "bottomStyle", s);
    _.w(d, "codeName", s);
    _.v(
      d,
      "appViewMsgGroupDetails",
      c.m("app.view.AppViewMsgGroupDetail[]", s, "getPSAppViewMsgGroupDetails")
    );
    _.w(d, "topStyle", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-view-param-writer.mjs
var AppViewParamWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "desc", s);
    _.w(d, "key", s);
    _.w(d, "value", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-view-nav-param-writer.mjs
var AppViewNavParamWriter = class extends AppViewParamWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "rawValue", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-view-nav-context-writer.mjs
var AppViewNavContextWriter = class extends AppViewNavParamWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/view/app-view-ref-writer.mjs
var AppViewRefWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "height", s, "", 0);
    _.w(d, "openMode", s);
    _.w(d, "owner", s);
    _.v(
      d,
      "navigateContexts",
      c.m("control.NavigateContext[]", s, "getPSNavigateContexts")
    );
    _.v(
      d,
      "navigateParams",
      c.m("control.NavigateParam[]", s, "getPSNavigateParams")
    );
    _.w(d, "parentDataJO", s);
    _.w(d, "realOpenMode", s);
    _.w(d, "realTitle", s);
    _.v(
      d,
      "realTitleLanguageRes",
      c.s("res.LanguageRes[]", s, "getRealTitlePSLanguageRes")
    );
    _.x(d, "refAppViewId", s, "getRefPSAppView");
    _.w(d, "viewParamJO", s);
    _.w(d, "width", s, "", 0);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/wf/app-wfdewriter.mjs
var AppWFDEWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "entityWFState", s);
    _.x(d, "appDataEntityId", s, "getPSAppDataEntity");
    _.x(d, "appWFId", s, "getPSAppWF");
    _.x(d, "wfstateAppDEFieldId", s, "getWFStatePSAppDEField");
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/wf/app-wfwriter.mjs
var AppWFWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "codeName", s);
    _.v(d, "appWFDEs", c.m("app.wf.AppWFDE[]", s, "getPSAppWFDEs"));
    _.v(d, "appWFVers", c.m("app.wf.AppWFVer[]", s, "getPSAppWFVers"));
    _.w(d, "hasAppWFVer", s, "hasPSAppWFVer");
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/app/wf/app-wfver-writer.mjs
var AppWFVerWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "codeName", s);
    _.x(d, "appWFId", s, "getPSAppWF");
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/codelist/code-item-writer.mjs
var CodeItemWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "bkcolor", s, "bKColor");
    _.w(d, "beginValue", s);
    _.w(d, "codeName", s);
    _.w(d, "color", s);
    _.w(d, "data", s);
    _.w(d, "endValue", s);
    _.w(d, "iconCls", s);
    _.w(d, "iconClsX", s);
    _.w(d, "iconPath", s);
    _.w(d, "iconPathX", s);
    _.v(d, "codeItems", c.m("codelist.CodeItem[]", s, "getPSCodeItems"));
    _.v(d, "sysCss", c.s("res.SysCss[]", s, "getPSSysCss"));
    _.v(d, "sysImage", c.s("res.SysImage[]", s, "getPSSysImage"));
    _.w(d, "text", s);
    _.w(d, "textCls", s);
    _.v(
      d,
      "textLanguageRes",
      c.s("res.LanguageRes[]", s, "getTextPSLanguageRes")
    );
    _.w(d, "tooltip", s);
    _.v(
      d,
      "tooltipLanguageRes",
      c.s("res.LanguageRes[]", s, "getTooltipPSLanguageRes")
    );
    _.w(d, "userData", s);
    _.w(d, "userData2", s);
    _.w(d, "value", s);
    _.w(d, "default", s);
    _.w(d, "disableSelect", s);
    _.w(d, "includeBeginValue", s);
    _.w(d, "includeEndValue", s);
    _.w(d, "showAsEmtpy", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/ajax/ajax-control-handler-action-writer.mjs
var AjaxControlHandlerActionWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.x(d, "adappDELogicId", s, "getADPSAppDELogic");
    _.w(d, "actionDesc", s);
    _.x(d, "appDEMethodId", s, "getPSAppDEMethod");
    _.x(d, "appDataEntityId", s, "getPSAppDataEntity");
    _.w(d, "timeout", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/control-container-writer.mjs
var ControlContainerWriter = class extends ControlWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.v(
      d,
      "appCounterRefs",
      c.m("app.control.AppCounterRef[]", s, "getPSAppCounterRefs")
    );
    _.v(
      d,
      "appViewEngines",
      c.m("app.view.AppViewEngine[]", s, "getPSAppViewEngines")
    );
    _.v(
      d,
      "appViewLogics",
      c.m("app.view.AppViewLogic[]", s, "getPSAppViewLogics")
    );
    _.v(d, "appViewRefs", c.m("app.view.AppViewRef[]", s, "getPSAppViewRefs"));
    _.v(d, "controls", c.m("control.Control[]", s, "getPSControls"));
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/ajax-control-container-writer.mjs
var AjaxControlContainerWriter = class extends ControlContainerWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.v(
      d,
      "user2ControlAction",
      c.s("control.ControlAction[]", s, "getUser2PSControlAction")
    );
    _.v(
      d,
      "userControlAction",
      c.s("control.ControlAction[]", s, "getUserPSControlAction")
    );
    _.w(d, "autoLoad", s, "", true);
    _.w(d, "enableItemPrivilege", s);
    _.w(d, "showBusyIndicator", s, "", true);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/mdajax-control-container-writer.mjs
var MDAjaxControlContainerWriter = class extends AjaxControlContainerWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "activeDataField", s);
    _.v(
      d,
      "createControlAction",
      c.s("control.ControlAction[]", s, "getCreatePSControlAction")
    );
    _.v(
      d,
      "fetchControlAction",
      c.s("control.ControlAction[]", s, "getFetchPSControlAction")
    );
    _.v(
      d,
      "getDraftFromControlAction",
      c.s("control.ControlAction[]", s, "getGetDraftFromPSControlAction")
    );
    _.v(
      d,
      "getDraftControlAction",
      c.s("control.ControlAction[]", s, "getGetDraftPSControlAction")
    );
    _.v(
      d,
      "getControlAction",
      c.s("control.ControlAction[]", s, "getGetPSControlAction")
    );
    _.v(
      d,
      "moveControlAction",
      c.s("control.ControlAction[]", s, "getMovePSControlAction")
    );
    _.v(
      d,
      "controlNavContexts",
      c.m("control.ControlNavContext[]", s, "getPSControlNavContexts")
    );
    _.v(
      d,
      "controlNavParams",
      c.m("control.ControlNavParam[]", s, "getPSControlNavParams")
    );
    _.x(d, "dedataExportId", s, "getPSDEDataExport");
    _.x(d, "dedataImportId", s, "getPSDEDataImport");
    _.v(
      d,
      "removeControlAction",
      c.s("control.ControlAction[]", s, "getRemovePSControlAction")
    );
    _.v(
      d,
      "updateControlAction",
      c.s("control.ControlAction[]", s, "getUpdatePSControlAction")
    );
    _.w(d, "activeDataMode", s);
    _.w(d, "readOnly", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/mdajax-control-container-writer2.mjs
var MDAjaxControlContainerWriter2 = class extends MDAjaxControlContainerWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "navFilter", s);
    _.x(d, "navAppViewId", s, "getNavPSAppView");
    _.v(d, "navDER", c.s("dataentity.der.DERBase[]", s, "getNavPSDER"));
    _.w(d, "navViewHeight", s, "", 0);
    _.w(d, "navViewMaxHeight", s, "", 0);
    _.w(d, "navViewMaxWidth", s, "", 0);
    _.w(d, "navViewMinHeight", s, "", 0);
    _.w(d, "navViewMinWidth", s, "", 0);
    _.w(d, "navViewParamJO", s);
    _.w(d, "navViewPos", s, "", "NONE");
    _.w(d, "navViewShowMode", s, "", 0);
    _.w(d, "navViewWidth", s, "", 0);
    _.v(
      d,
      "navigateContexts",
      c.m("control.NavigateContext[]", s, "getPSNavigateContexts")
    );
    _.v(
      d,
      "navigateParams",
      c.m("control.NavigateParam[]", s, "getPSNavigateParams")
    );
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/calendar/calendar-writer.mjs
var CalendarWriter = class extends MDAjaxControlContainerWriter2 {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/calendar/sys-calendar-writer.mjs
var SysCalendarWriter = class extends CalendarWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "calendarStyle", s);
    _.w(d, "emptyText", s);
    _.v(
      d,
      "emptyTextLanguageRes",
      c.s("res.LanguageRes[]", s, "getEmptyTextPSLanguageRes")
    );
    _.w(d, "groupHeight", s, "", 0);
    _.w(d, "groupLayout", s);
    _.w(d, "groupMode", s);
    _.x(d, "groupAppDEFieldId", s, "getGroupPSAppDEField");
    _.x(d, "groupCodeListId", s, "getGroupPSCodeList");
    _.v(d, "groupSysCss", c.s("res.SysCss[]", s, "getGroupPSSysCss"));
    _.x(d, "groupSysPFPluginId", s, "getGroupPSSysPFPlugin");
    _.w(d, "groupWidth", s, "", 0);
    _.w(d, "legendPos", s);
    _.v(
      d,
      "sysCalendarItems",
      c.m("control.calendar.SysCalendarItem[]", s, "getPSSysCalendarItems")
    );
    _.w(d, "enableEdit", s);
    _.w(d, "enableGroup", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/control-object-writer2.mjs
var ControlObjectWriter2 = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "navFilter", s);
    _.x(d, "navAppViewId", s, "getNavPSAppView");
    _.v(d, "navDER", c.s("dataentity.der.DERBase[]", s, "getNavPSDER"));
    _.w(d, "navViewParamJO", s);
    _.v(
      d,
      "navigateContexts",
      c.m("control.NavigateContext[]", s, "getPSNavigateContexts")
    );
    _.v(
      d,
      "navigateParams",
      c.m("control.NavigateParam[]", s, "getPSNavigateParams")
    );
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/control-item-writer2.mjs
var ControlItemWriter2 = class extends ControlObjectWriter2 {
  onFillDSL(c, s, d) {
    const _ = this;
    _.v(
      d,
      "controlAttributes",
      c.m("control.ControlAttribute[]", s, "getPSControlAttributes")
    );
    _.v(
      d,
      "controlLogics",
      c.m("control.ControlLogic[]", s, "getPSControlLogics")
    );
    _.v(
      d,
      "controlRenders",
      c.m("control.ControlRender[]", s, "getPSControlRenders")
    );
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/calendar/sys-calendar-item-writer.mjs
var SysCalendarItemWriter = class extends ControlItemWriter2 {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "bkcolor", s, "bKColor");
    _.x(d, "bkcolorAppDEFieldId", s, "getBKColorPSAppDEField");
    _.x(d, "beginTimeAppDEFieldId", s, "getBeginTimePSAppDEField");
    _.x(d, "clsAppDEFieldId", s, "getClsPSAppDEField");
    _.w(d, "color", s);
    _.x(d, "colorAppDEFieldId", s, "getColorPSAppDEField");
    _.x(d, "contentAppDEFieldId", s, "getContentPSAppDEField");
    _.x(d, "createAppDEActionId", s, "getCreatePSAppDEAction");
    _.x(d, "createDEOPPrivId", s, "getCreatePSDEOPPriv");
    _.w(d, "customCond", s);
    _.x(d, "data2AppDEFieldId", s, "getData2PSAppDEField");
    _.x(d, "dataAppDEFieldId", s, "getDataPSAppDEField");
    _.w(d, "dynaClass", s);
    _.x(d, "endTimeAppDEFieldId", s, "getEndTimePSAppDEField");
    _.x(d, "iconAppDEFieldId", s, "getIconPSAppDEField");
    _.x(d, "idAppDEFieldId", s, "getIdPSAppDEField");
    _.w(d, "itemStyle", s);
    _.w(d, "itemType", s);
    _.x(d, "levelAppDEFieldId", s, "getLevelPSAppDEField");
    _.x(d, "linkAppDEFieldId", s, "getLinkPSAppDEField");
    _.w(d, "maxSize", s);
    _.w(d, "modelObj", s);
    _.v(
      d,
      "nameLanguageRes",
      c.s("res.LanguageRes[]", s, "getNamePSLanguageRes")
    );
    _.x(d, "appDEDataSetId", s, "getPSAppDEDataSet");
    _.v(
      d,
      "decontextMenu",
      c.s("control.toolbar.DEContextMenu[]", s, "getPSDEContextMenu")
    );
    _.v(
      d,
      "layoutPanel",
      c.s("control.panel.LayoutPanel[]", s, "getPSLayoutPanel")
    );
    _.v(d, "sysCss", c.s("res.SysCss[]", s, "getPSSysCss"));
    _.v(d, "sysImage", c.s("res.SysImage[]", s, "getPSSysImage"));
    _.x(d, "sysPFPluginId", s, "getPSSysPFPlugin");
    _.x(d, "uiactionId", s, "getPSUIAction");
    _.x(d, "removeAppDEActionId", s, "getRemovePSAppDEAction");
    _.x(d, "removeDEOPPrivId", s, "getRemovePSDEOPPriv");
    _.x(d, "tag2AppDEFieldId", s, "getTag2PSAppDEField");
    _.x(d, "tagAppDEFieldId", s, "getTagPSAppDEField");
    _.x(d, "textAppDEFieldId", s, "getTextPSAppDEField");
    _.x(d, "tipsAppDEFieldId", s, "getTipsPSAppDEField");
    _.x(d, "updateAppDEActionId", s, "getUpdatePSAppDEAction");
    _.x(d, "updateDEOPPrivId", s, "getUpdatePSDEOPPriv");
    _.w(d, "enableEdit", s);
    _.w(d, "enableQuickCreate", s);
    _.x(d, "appDataEntityId", s, "getPSAppDataEntity");
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/captionbar/caption-bar-writer.mjs
var CaptionBarWriter = class extends ControlWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.v(
      d,
      "capLanguageRes",
      c.s("res.LanguageRes[]", s, "getCapPSLanguageRes")
    );
    _.w(d, "caption", s);
    _.v(d, "sysImage", c.s("res.SysImage[]", s, "getPSSysImage"));
    _.v(
      d,
      "subCapLanguageRes",
      c.s("res.LanguageRes[]", s, "getSubCapPSLanguageRes")
    );
    _.w(d, "subCaption", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/chart/dechart-object-writer-base.mjs
var DEChartObjectWriterBase = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "index", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/chart/dechart-coordinate-system-control-writer-base.mjs
var DEChartCoordinateSystemControlWriterBase = class extends DEChartObjectWriterBase {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "baseOptionJOString", s);
    _.x(d, "chartCoordinateSystemId", s, "getPSChartCoordinateSystem");
    _.w(d, "type", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/chart/dechart-coordinate-system-control-writer-base2.mjs
var DEChartCoordinateSystemControlWriterBase2 = class extends DEChartCoordinateSystemControlWriterBase {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "bottom", s);
    _.w(d, "height", s);
    _.w(d, "left", s);
    _.w(d, "right", s);
    _.w(d, "top", s);
    _.w(d, "width", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/chart/dechart-calendar-writer.mjs
var DEChartCalendarWriter = class extends DEChartCoordinateSystemControlWriterBase2 {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/chart/dechart-coordinate-system-writer-base.mjs
var DEChartCoordinateSystemWriterBase = class extends DEChartObjectWriterBase {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "echartsType", s, "eChartsType");
    _.x(d, "sysPFPluginId", s, "getPSSysPFPlugin");
    _.w(d, "type", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/chart/dechart-coordinate-system-calendar-writer.mjs
var DEChartCoordinateSystemCalendarWriter = class extends DEChartCoordinateSystemWriterBase {
  onFillDSL(c, s, d) {
    const _ = this;
    _.v(
      d,
      "chartCalendar",
      c.s("control.chart.ChartCalendar[]", s, "getPSChartCalendar")
    );
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/chart/dechart-coordinate-system-cartesian2-dwriter.mjs
var DEChartCoordinateSystemCartesian2DWriter = class extends DEChartCoordinateSystemWriterBase {
  onFillDSL(c, s, d) {
    const _ = this;
    _.v(d, "chartGrid", c.s("control.chart.ChartGrid[]", s, "getPSChartGrid"));
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/chart/dechart-coordinate-system-geo-writer.mjs
var DEChartCoordinateSystemGeoWriter = class extends DEChartCoordinateSystemWriterBase {
  onFillDSL(c, s, d) {
    const _ = this;
    _.v(d, "chartGeo", c.s("control.chart.ChartGeo[]", s, "getPSChartGeo"));
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/chart/dechart-coordinate-system-none-writer.mjs
var DEChartCoordinateSystemNoneWriter = class extends DEChartCoordinateSystemWriterBase {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/chart/dechart-coordinate-system-parallel-writer.mjs
var DEChartCoordinateSystemParallelWriter = class extends DEChartCoordinateSystemWriterBase {
  onFillDSL(c, s, d) {
    const _ = this;
    _.v(
      d,
      "chartParallel",
      c.s("control.chart.ChartParallel[]", s, "getPSChartParallel")
    );
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/chart/dechart-coordinate-system-polar-writer.mjs
var DEChartCoordinateSystemPolarWriter = class extends DEChartCoordinateSystemWriterBase {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/chart/dechart-coordinate-system-radar-writer.mjs
var DEChartCoordinateSystemRadarWriter = class extends DEChartCoordinateSystemWriterBase {
  onFillDSL(c, s, d) {
    const _ = this;
    _.v(
      d,
      "chartRadar",
      c.s("control.chart.ChartRadar[]", s, "getPSChartRadar")
    );
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/chart/dechart-coordinate-system-single-writer.mjs
var DEChartCoordinateSystemSingleWriter = class extends DEChartCoordinateSystemWriterBase {
  onFillDSL(c, s, d) {
    const _ = this;
    _.v(
      d,
      "chartSingle",
      c.s("control.chart.ChartSingle[]", s, "getPSChartSingle")
    );
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/chart/dechart-data-grid-writer.mjs
var DEChartDataGridWriter = class extends DEChartObjectWriterBase {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "dataGridPos", s);
    _.w(d, "showDataGrid", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/chart/dechart-data-set-field-writer.mjs
var DEChartDataSetFieldWriter = class extends DEChartObjectWriterBase {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "groupMode", s);
    _.x(d, "codeListId", s, "getPSCodeList");
    _.w(d, "groupField", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/chart/dechart-data-set-group-writer.mjs
var DEChartDataSetGroupWriter = class extends DEChartObjectWriterBase {
  onFillDSL(c, s, d) {
    const _ = this;
    _.x(d, "appDEDataSetId", s, "getPSAppDEDataSet");
    _.x(d, "appDataEntityId", s, "getPSAppDataEntity");
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/chart/dechart-data-set-writer.mjs
var DEChartDataSetWriter = class extends DEChartObjectWriterBase {
  onFillDSL(c, s, d) {
    const _ = this;
    _.v(
      d,
      "chartDataSetFields",
      c.m("control.chart.ChartDataSetField[]", s, "getPSChartDataSetFields")
    );
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/chart/dechart-geo-writer.mjs
var DEChartGeoWriter = class extends DEChartCoordinateSystemControlWriterBase2 {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/chart/dechart-grid-writer.mjs
var DEChartGridWriter = class extends DEChartCoordinateSystemControlWriterBase2 {
  onFillDSL(c, s, d) {
    const _ = this;
    _.x(d, "chartGridXAxis0Id", s, "getPSChartGridXAxis0");
    _.x(d, "chartGridXAxis1Id", s, "getPSChartGridXAxis1");
    _.x(d, "chartGridYAxis0Id", s, "getPSChartGridYAxis0");
    _.x(d, "chartGridYAxis1Id", s, "getPSChartGridYAxis1");
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/chart/dechart-axis-writer-base.mjs
var DEChartAxisWriterBase = class extends DEChartObjectWriterBase {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "baseOptionJOString", s);
    _.v(
      d,
      "capLanguageRes",
      c.s("res.LanguageRes[]", s, "getCapPSLanguageRes")
    );
    _.w(d, "caption", s);
    _.w(d, "dataShowMode", s, "", 0);
    _.w(d, "echartsPos", s, "eChartsPos");
    _.w(d, "echartsType", s, "eChartsType");
    _.w(d, "maxValue", s);
    _.w(d, "minValue", s);
    _.v(
      d,
      "controlAttributes",
      c.m("control.ControlAttribute[]", s, "getPSControlAttributes")
    );
    _.v(
      d,
      "controlLogics",
      c.m("control.ControlLogic[]", s, "getPSControlLogics")
    );
    _.v(
      d,
      "controlRenders",
      c.m("control.ControlRender[]", s, "getPSControlRenders")
    );
    _.x(d, "sysPFPluginId", s, "getPSSysPFPlugin");
    _.w(d, "position", s);
    _.w(d, "type", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/chart/dechart-grid-axis-writer-base.mjs
var DEChartGridAxisWriterBase = class extends DEChartAxisWriterBase {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/chart/dechart-grid-xaxis-writer.mjs
var DEChartGridXAxisWriter = class extends DEChartGridAxisWriterBase {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/chart/dechart-grid-yaxis-writer.mjs
var DEChartGridYAxisWriter = class extends DEChartGridAxisWriterBase {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/chart/chart-writer.mjs
var ChartWriter = class extends MDAjaxControlContainerWriter2 {
  onFillDSL(c, s, d) {
    const _ = this;
    _.v(
      d,
      "chartAngleAxises",
      c.m("control.chart.ChartAngleAxis[]", s, "getPSChartAngleAxises")
    );
    _.v(
      d,
      "chartDataSetGroups",
      c.m("control.chart.ChartDataSetGroup[]", s, "getPSChartDataSetGroups")
    );
    _.v(
      d,
      "chartDataSets",
      c.m("control.chart.ChartDataSet[]", s, "getPSChartDataSets")
    );
    _.v(
      d,
      "chartGrids",
      c.m("control.chart.ChartGrid[]", s, "getPSChartGrids")
    );
    _.v(
      d,
      "chartParallelAxises",
      c.m("control.chart.ChartParallelAxis[]", s, "getPSChartParallelAxises")
    );
    _.v(
      d,
      "chartParallels",
      c.m("control.chart.ChartParallel[]", s, "getPSChartParallels")
    );
    _.v(
      d,
      "chartPolars",
      c.m("control.chart.ChartPolar[]", s, "getPSChartPolars")
    );
    _.v(
      d,
      "chartRadars",
      c.m("control.chart.ChartRadar[]", s, "getPSChartRadars")
    );
    _.v(
      d,
      "chartRadiusAxises",
      c.m("control.chart.ChartRadiusAxis[]", s, "getPSChartRadiusAxises")
    );
    _.v(
      d,
      "chartSingleAxises",
      c.m("control.chart.ChartSingleAxis[]", s, "getPSChartSingleAxises")
    );
    _.v(
      d,
      "chartSingles",
      c.m("control.chart.ChartSingle[]", s, "getPSChartSingles")
    );
    _.v(
      d,
      "chartXAxises",
      c.m("control.chart.ChartXAxis[]", s, "getPSChartXAxises")
    );
    _.v(
      d,
      "chartYAxises",
      c.m("control.chart.ChartYAxis[]", s, "getPSChartYAxises")
    );
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/chart/dechart-writer.mjs
var DEChartWriter = class extends ChartWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "baseOptionJOString", s);
    _.w(d, "coordinateSystem", s);
    _.w(d, "emptyText", s);
    _.v(
      d,
      "emptyTextLanguageRes",
      c.s("res.LanguageRes[]", s, "getEmptyTextPSLanguageRes")
    );
    _.w(d, "minorSortDir", s);
    _.x(d, "minorSortAppDEFieldId", s, "getMinorSortPSAppDEField");
    _.v(
      d,
      "chartCoordinateSystems",
      c.m(
        "control.chart.ChartCoordinateSystem[]",
        s,
        "getPSChartCoordinateSystems"
      )
    );
    _.v(
      d,
      "dechartDataGrid",
      c.s("control.chart.DEChartDataGrid[]", s, "getPSDEChartDataGrid")
    );
    _.v(
      d,
      "dechartLegend",
      c.s("control.chart.DEChartLegend[]", s, "getPSDEChartLegend")
    );
    _.v(
      d,
      "dechartSerieses",
      c.m("control.chart.DEChartSeries[]", s, "getPSDEChartSerieses")
    );
    _.v(
      d,
      "dechartTitle",
      c.s("control.chart.DEChartTitle[]", s, "getPSDEChartTitle")
    );
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/chart/dechart-legend-writer.mjs
var DEChartLegendWriter = class extends DEChartObjectWriterBase {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "legendPos", s);
    _.w(d, "showLegend", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/chart/dechart-parallel-axis-writer-base.mjs
var DEChartParallelAxisWriterBase = class extends DEChartAxisWriterBase {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/chart/dechart-parallel-axis-writer.mjs
var DEChartParallelAxisWriter = class extends DEChartParallelAxisWriterBase {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/chart/dechart-parallel-writer.mjs
var DEChartParallelWriter = class extends DEChartCoordinateSystemControlWriterBase2 {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/chart/dechart-polar-axis-writer-base.mjs
var DEChartPolarAxisWriterBase = class extends DEChartAxisWriterBase {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/chart/dechart-polar-angle-axis-writer.mjs
var DEChartPolarAngleAxisWriter = class extends DEChartPolarAxisWriterBase {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/chart/dechart-polar-writer.mjs
var DEChartPolarWriter = class extends DEChartCoordinateSystemControlWriterBase {
  onFillDSL(c, s, d) {
    const _ = this;
    _.v(
      d,
      "chartPolarAngleAxis",
      c.s("control.chart.ChartPolarAngleAxis[]", s, "getPSChartPolarAngleAxis")
    );
    _.v(
      d,
      "chartPolarRadiusAxis",
      c.s(
        "control.chart.ChartPolarRadiusAxis[]",
        s,
        "getPSChartPolarRadiusAxis"
      )
    );
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/chart/dechart-polar-radius-axis-writer.mjs
var DEChartPolarRadiusAxisWriter = class extends DEChartPolarAxisWriterBase {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/chart/dechart-radar-writer.mjs
var DEChartRadarWriter = class extends DEChartCoordinateSystemControlWriterBase {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/chart/chart-series-writer.mjs
var ChartSeriesWriter = class extends ControlItemWriter2 {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "index", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/chart/dechart-series-writer.mjs
var DEChartSeriesWriter = class extends ChartSeriesWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "baseOptionJOString", s);
    _.v(
      d,
      "capLanguageRes",
      c.s("res.LanguageRes[]", s, "getCapPSLanguageRes")
    );
    _.w(d, "caption", s);
    _.w(d, "catalogField", s);
    _.x(d, "catalogCodeListId", s, "getCatalogPSCodeList");
    _.w(d, "dataField", s);
    _.w(d, "echartsType", s, "eChartsType");
    _.w(d, "extValue2Field", s);
    _.w(d, "extValue3Field", s);
    _.w(d, "extValue4Field", s);
    _.w(d, "extValueField", s);
    _.w(d, "groupMode", s);
    _.w(d, "idField", s);
    _.x(d, "chartCoordinateSystemId", s, "getPSChartCoordinateSystem");
    _.x(d, "chartDataSetId", s, "getPSChartDataSet");
    _.v(
      d,
      "chartSeriesEncode",
      c.s("control.chart.ChartSeriesEncode[]", s, "getPSChartSeriesEncode")
    );
    _.x(d, "sysPFPluginId", s, "getPSSysPFPlugin");
    _.w(d, "sampleData", s);
    _.w(d, "seriesField", s);
    _.w(d, "seriesLayoutBy", s);
    _.x(d, "seriesCodeListId", s, "getSeriesPSCodeList");
    _.w(d, "seriesType", s);
    _.w(d, "tagField", s);
    _.w(d, "valueField", s);
    _.w(d, "enableChartDataSet", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/chart/dechart-series-writer2.mjs
var DEChartSeriesWriter2 = class extends DEChartSeriesWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/chart/dechart-series-bar-writer.mjs
var DEChartSeriesBarWriter = class extends DEChartSeriesWriter2 {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "barCategoryGap", s);
    _.w(d, "barGap", s);
    _.w(d, "barMaxWidth", s);
    _.w(d, "barMinHeight", s);
    _.w(d, "barMinWidth", s);
    _.w(d, "barWidth", s);
    _.w(d, "stack", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/chart/dechart-series-encode-writer-base.mjs
var DEChartSeriesEncodeWriterBase = class extends DEChartObjectWriterBase {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "itemId", s);
    _.w(d, "itemName", s);
    _.w(d, "type", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/chart/dechart-series-cscartesian2-dencode-writer.mjs
var DEChartSeriesCSCartesian2DEncodeWriter = class extends DEChartSeriesEncodeWriterBase {
  onFillDSL(c, s, d) {
    const _ = this;
    _.x(d, "chartXAxisId", s, "getPSChartXAxis");
    _.x(d, "chartYAxisId", s, "getPSChartYAxis");
    _.w(d, "x", s, "x");
    _.w(d, "y", s, "y");
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/chart/dechart-series-csnone-encode-writer.mjs
var DEChartSeriesCSNoneEncodeWriter = class extends DEChartSeriesEncodeWriterBase {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "category", s);
    _.w(d, "value", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/chart/dechart-series-candlestick-writer.mjs
var DEChartSeriesCandlestickWriter = class extends DEChartSeriesWriter2 {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/chart/dechart-series-custom-writer.mjs
var DEChartSeriesCustomWriter = class extends DEChartSeriesWriter2 {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/chart/dechart-series-csnone-writer-base.mjs
var DEChartSeriesCSNoneWriterBase = class extends DEChartSeriesWriter2 {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/chart/dechart-series-csnone-writer-base2.mjs
var DEChartSeriesCSNoneWriterBase2 = class extends DEChartSeriesCSNoneWriterBase {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "bottom", s);
    _.w(d, "height", s);
    _.w(d, "left", s);
    _.w(d, "right", s);
    _.w(d, "top", s);
    _.w(d, "width", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/chart/dechart-series-funnel-writer.mjs
var DEChartSeriesFunnelWriter = class extends DEChartSeriesCSNoneWriterBase2 {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "funnelAlign", s);
    _.w(d, "maxSize", s);
    _.w(d, "maxValue", s);
    _.w(d, "minSize", s);
    _.w(d, "minValue", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/chart/dechart-series-gauge-writer.mjs
var DEChartSeriesGaugeWriter = class extends DEChartSeriesCSNoneWriterBase {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "endAngle", s);
    _.w(d, "maxValue", s);
    _.w(d, "minValue", s);
    _.w(d, "radius", s);
    _.w(d, "splitNumber", s);
    _.w(d, "startAngle", s);
    _.w(d, "clockwise", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/chart/dechart-series-line-writer.mjs
var DEChartSeriesLineWriter = class extends DEChartSeriesWriter2 {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "step", s);
    _.w(d, "stack", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/chart/dechart-series-map-writer.mjs
var DEChartSeriesMapWriter = class extends DEChartSeriesWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "mapType", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/chart/dechart-series-pie-writer.mjs
var DEChartSeriesPieWriter = class extends DEChartSeriesCSNoneWriterBase2 {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "center", s);
    _.w(d, "minAngle", s);
    _.w(d, "minShowLabelAngle", s);
    _.w(d, "radius", s);
    _.w(d, "roseType", s);
    _.w(d, "startAngle", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/chart/dechart-series-radar-writer.mjs
var DEChartSeriesRadarWriter = class extends DEChartSeriesWriter2 {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/chart/dechart-series-scatter-writer.mjs
var DEChartSeriesScatterWriter = class extends DEChartSeriesWriter2 {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/chart/dechart-single-axis-writer-base.mjs
var DEChartSingleAxisWriterBase = class extends DEChartAxisWriterBase {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/chart/dechart-single-axis-writer.mjs
var DEChartSingleAxisWriter = class extends DEChartSingleAxisWriterBase {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/chart/dechart-single-writer.mjs
var DEChartSingleWriter = class extends DEChartCoordinateSystemControlWriterBase {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/chart/dechart-title-writer.mjs
var DEChartTitleWriter = class extends DEChartObjectWriterBase {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "subTitle", s);
    _.v(
      d,
      "subTitleLanguageRes",
      c.s("res.LanguageRes[]", s, "getSubTitlePSLanguageRes")
    );
    _.w(d, "title", s);
    _.v(
      d,
      "titleLanguageRes",
      c.s("res.LanguageRes[]", s, "getTitlePSLanguageRes")
    );
    _.w(d, "titlePos", s);
    _.w(d, "showTitle", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/custom/custom-control-writer.mjs
var CustomControlWriter = class extends AjaxControlWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "customTag", s);
    _.w(d, "customTag2", s);
    _.w(d, "predefinedType", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/drctrl/dedrbar-group-writer.mjs
var DEDRBarGroupWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.v(
      d,
      "capLanguageRes",
      c.s("res.LanguageRes[]", s, "getCapPSLanguageRes")
    );
    _.w(d, "caption", s);
    _.x(d, "headerSysPFPluginId", s, "getHeaderPSSysPFPlugin");
    _.v(d, "sysImage", c.s("res.SysImage[]", s, "getPSSysImage"));
    _.w(d, "hidden", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/drctrl/dedrctrl-writer.mjs
var DEDRCtrlWriter = class extends AjaxControlContainerWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "dataRelationTag", s);
    _.v(
      d,
      "editItemCapLanguageRes",
      c.s("res.LanguageRes[]", s, "getEditItemCapPSLanguageRes")
    );
    _.w(d, "editItemCaption", s);
    _.v(
      d,
      "editItemSysImage",
      c.s("res.SysImage[]", s, "getEditItemPSSysImage")
    );
    _.x(d, "formAppViewId", s, "getFormPSAppView");
    _.x(d, "appCounterRefId", s, "getPSAppCounterRef");
    _.v(
      d,
      "dedrctrlItems",
      c.m("control.drctrl.DEDRCtrlItem[]", s, "getPSDEDRCtrlItems")
    );
    _.w(d, "uniqueTag", s);
    _.w(d, "enableCustomized", s);
    _.w(d, "hideEditItem", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/drctrl/dedrbar-writer.mjs
var DEDRBarWriter = class extends DEDRCtrlWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.v(
      d,
      "dedrbarGroups",
      c.m("control.drctrl.DEDRBarGroup[]", s, "getPSDEDRBarGroups")
    );
    _.w(d, "title", s);
    _.v(
      d,
      "titleLanguageRes",
      c.s("res.LanguageRes[]", s, "getTitlePSLanguageRes")
    );
    _.w(d, "showTitle", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/drctrl/dedrctrl-item-writer.mjs
var DEDRCtrlItemWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.v(
      d,
      "capLanguageRes",
      c.s("res.LanguageRes[]", s, "getCapPSLanguageRes")
    );
    _.w(d, "caption", s);
    _.w(d, "counterId", s);
    _.w(d, "counterMode", s, "", 0);
    _.w(d, "dataAccessAction", s);
    _.w(d, "enableMode", s);
    _.x(d, "headerSysPFPluginId", s, "getHeaderPSSysPFPlugin");
    _.w(d, "itemTag", s);
    _.w(d, "itemTag2", s);
    _.x(d, "appViewId", s, "getPSAppView");
    _.v(
      d,
      "controlAttributes",
      c.m("control.ControlAttribute[]", s, "getPSControlAttributes")
    );
    _.v(
      d,
      "controlLogics",
      c.m("control.ControlLogic[]", s, "getPSControlLogics")
    );
    _.v(
      d,
      "controlRenders",
      c.m("control.ControlRender[]", s, "getPSControlRenders")
    );
    _.v(
      d,
      "navigateContexts",
      c.m("control.NavigateContext[]", s, "getPSNavigateContexts")
    );
    _.v(
      d,
      "navigateParams",
      c.m("control.NavigateParam[]", s, "getPSNavigateParams")
    );
    _.v(d, "sysImage", c.s("res.SysImage[]", s, "getPSSysImage"));
    _.x(d, "testAppDELogicId", s, "getTestPSAppDELogic");
    _.w(d, "testScriptCode", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/drctrl/dedrbar-item-writer.mjs
var DEDRBarItemWriter = class extends DEDRCtrlItemWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.x(d, "dedrbarGroupId", s, "getPSDEDRBarGroup");
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/drctrl/dedrtab-writer.mjs
var DEDRTabWriter = class extends DEDRCtrlWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.v(
      d,
      "dedrtabPages",
      c.m("control.drctrl.DEDRTabPage[]", s, "getPSDEDRTabPages")
    );
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/drctrl/dedrtab-page-writer.mjs
var DEDRTabPageWriter = class extends DEDRCtrlItemWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/dashboard/dbportlet-part-writer.mjs
var DBPortletPartWriter = class extends AjaxControlContainerWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "actionGroupExtractMode", s);
    _.x(d, "contentControlId", s, "getContentPSControl");
    _.w(d, "dynaClass", s);
    _.v(d, "layoutPos", c.s("control.layout.LayoutPos[]", s, "getPSLayoutPos"));
    _.v(d, "sysImage", c.s("res.SysImage[]", s, "getPSSysImage"));
    _.x(d, "sysUniResId", s, "getPSSysUniRes");
    _.v(
      d,
      "uiactionGroup",
      c.s("view.UIActionGroup[]", s, "getPSUIActionGroup")
    );
    _.w(d, "portletType", s);
    _.w(d, "title", s);
    _.w(d, "titleBarCloseMode", s, "", 0);
    _.v(
      d,
      "titleLanguageRes",
      c.s("res.LanguageRes[]", s, "getTitlePSLanguageRes")
    );
    _.w(d, "enableAnchor", s);
    _.w(d, "showTitleBar", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/dashboard/dbapp-menu-portlet-part-writer.mjs
var DBAppMenuPortletPartWriter = class extends DBPortletPartWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "amlistStyle", s, "aMListStyle");
    _.x(d, "amsysPFPluginId", s, "getAMPSSysPFPlugin");
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/dashboard/dbsys-portlet-part-writer.mjs
var DBSysPortletPartWriter = class extends DBPortletPartWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "timer", s, "", 0);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/dashboard/dbchart-portlet-part-writer.mjs
var DBChartPortletPartWriter = class extends DBSysPortletPartWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/dashboard/dbcontainer-portlet-part-writer.mjs
var DBContainerPortletPartWriter = class extends DBPortletPartWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.v(d, "layout", c.s("control.layout.Layout[]", s, "getPSLayout"));
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/dashboard/dbcustom-portlet-part-writer.mjs
var DBCustomPortletPartWriter = class extends DBSysPortletPartWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/dashboard/dbfilter-portlet-part-writer.mjs
var DBFilterPortletPartWriter = class extends DBSysPortletPartWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.v(
      d,
      "filterDEDQConditions",
      c.m("dataentity.ds.DEDQCondition[]", s, "getFilterPSDEDQConditions")
    );
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/dashboard/dbhtml-portlet-part-writer.mjs
var DBHtmlPortletPartWriter = class extends DBSysPortletPartWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "htmlShowMode", s);
    _.w(d, "pageUrl", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/dashboard/dblist-portlet-part-writer.mjs
var DBListPortletPartWriter = class extends DBSysPortletPartWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/dashboard/dbraw-item-portlet-part-writer.mjs
var DBRawItemPortletPartWriter = class extends DBPortletPartWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.v(d, "rawItem", c.s("control.RawItemBase[]", s, "getPSRawItem"));
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/dashboard/dbreport-portlet-part-writer.mjs
var DBReportPortletPartWriter = class extends DBSysPortletPartWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/dashboard/dbtoolbar-portlet-part-writer.mjs
var DBToolbarPortletPartWriter = class extends DBSysPortletPartWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/dashboard/dbview-portlet-part-writer.mjs
var DBViewPortletPartWriter = class extends DBSysPortletPartWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.v(
      d,
      "portletAppView",
      c.s("app.view.AppView[]", s, "getPortletPSAppView")
    );
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/dashboard/dashboard-writer.mjs
var DashboardWriter = class extends AjaxControlContainerWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "customizeMode", s, "", 0);
    _.w(d, "dashboardStyle", s);
    _.v(d, "navBarSysCss", c.s("res.SysCss[]", s, "getNavBarPSSysCss"));
    _.w(d, "navBarPos", s);
    _.w(d, "navBarStyle", s);
    _.w(d, "navBarWidth", s, "", 0);
    _.w(d, "navbarHeight", s, "", 0);
    _.x(d, "appDynaDashboardUtilId", s, "getPSAppDynaDashboardUtil");
    _.v(d, "layout", c.s("control.layout.Layout[]", s, "getPSLayout"));
    _.w(d, "enableCustomized", s);
    _.w(d, "showDashboardNavBar", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/dashboard/sys-dashboard-writer.mjs
var SysDashboardWriter = class extends DashboardWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/datainfobar/data-info-bar-writer.mjs
var DataInfoBarWriter = class extends ControlWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/data/data-item-writer.mjs
var DataItemWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "dataType", s);
    _.w(d, "format", s);
    _.x(d, "codeListId", s, "getPSCodeList");
    _.w(d, "convertToCodeItemText", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/dataview/dedata-view-data-item-writer.mjs
var DEDataViewDataItemWriter = class extends DataItemWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.x(d, "frontCodeListId", s, "getFrontPSCodeList");
    _.x(d, "appDEFieldId", s, "getPSAppDEField");
    _.w(d, "scriptCode", s);
    _.w(d, "customCode", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/dataview/dedata-view-writer.mjs
var DEDataViewWriter = class extends MDAjaxControlContainerWriter2 {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "cardColLG", s);
    _.w(d, "cardColMD", s);
    _.w(d, "cardColSM", s);
    _.w(d, "cardColXS", s);
    _.w(d, "cardHeight", s, "", 0);
    _.w(d, "cardWidth", s, "", 0);
    _.w(d, "emptyText", s);
    _.v(
      d,
      "emptyTextLanguageRes",
      c.s("res.LanguageRes[]", s, "getEmptyTextPSLanguageRes")
    );
    _.w(d, "groupColLG", s);
    _.w(d, "groupColMD", s);
    _.w(d, "groupColSM", s);
    _.w(d, "groupColXS", s);
    _.w(d, "groupHeight", s, "", 0);
    _.w(d, "groupLayout", s);
    _.w(d, "groupMode", s);
    _.v(
      d,
      "groupMoveControlAction",
      c.s("control.ControlAction[]", s, "getGroupMovePSControlAction")
    );
    _.x(d, "groupAppDEFieldId", s, "getGroupPSAppDEField");
    _.x(d, "groupAppDataEntityId", s, "getGroupPSAppDataEntity");
    _.x(d, "groupCodeListId", s, "getGroupPSCodeList");
    _.v(d, "groupSysCss", c.s("res.SysCss[]", s, "getGroupPSSysCss"));
    _.x(d, "groupSysPFPluginId", s, "getGroupPSSysPFPlugin");
    _.v(
      d,
      "groupUIActionGroup",
      c.s("view.UIActionGroup[]", s, "getGroupPSUIActionGroup")
    );
    _.w(d, "groupStyle", s, "", "DEFAULT");
    _.w(d, "groupWidth", s, "", 0);
    _.v(
      d,
      "itemLayoutPanel",
      c.s("control.panel.LayoutPanel[]", s, "getItemPSLayoutPanel")
    );
    _.v(d, "itemSysCss", c.s("res.SysCss[]", s, "getItemPSSysCss"));
    _.x(d, "itemSysPFPluginId", s, "getItemPSSysPFPlugin");
    _.w(d, "minorSortDir", s);
    _.x(d, "minorSortAppDEFieldId", s, "getMinorSortPSAppDEField");
    _.x(d, "orderValueAppDEFieldId", s, "getOrderValuePSAppDEField");
    _.v(
      d,
      "dedataViewDataItems",
      c.m(
        "control.dataview.DEDataViewDataItem[]",
        s,
        "getPSDEDataViewDataItems"
      )
    );
    _.v(
      d,
      "dedataViewItems",
      c.m("control.dataview.DEDataViewItem[]", s, "getPSDEDataViewItems")
    );
    _.w(d, "pagingMode", s, "", 0);
    _.w(d, "pagingSize", s);
    _.w(d, "hasWFDataItems", s);
    _.w(d, "appendDEItems", s);
    _.w(d, "enableCardEdit", s);
    _.w(d, "enableCardEditGroup", s);
    _.w(d, "enableCardEditOrder", s);
    _.w(d, "enableCardNew", s);
    _.w(d, "enableGroup", s);
    _.w(d, "enablePagingBar", s);
    _.w(d, "noSort", s);
    _.w(d, "singleSelect", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/dataview/dedata-view-item-writer.mjs
var DEDataViewItemWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "clconvertMode", s, "cLConvertMode");
    _.v(
      d,
      "capLanguageRes",
      c.s("res.LanguageRes[]", s, "getCapPSLanguageRes")
    );
    _.w(d, "caption", s);
    _.w(d, "dataItemName", s);
    _.w(d, "itemType", s);
    _.x(d, "appDEFieldId", s, "getPSAppDEField");
    _.x(d, "codeListId", s, "getPSCodeList");
    _.v(
      d,
      "controlAttributes",
      c.m("control.ControlAttribute[]", s, "getPSControlAttributes")
    );
    _.v(
      d,
      "controlLogics",
      c.m("control.ControlLogic[]", s, "getPSControlLogics")
    );
    _.v(
      d,
      "controlRenders",
      c.m("control.ControlRender[]", s, "getPSControlRenders")
    );
    _.v(
      d,
      "deuiactionGroup",
      c.s("dataentity.uiaction.DEUIActionGroup[]", s, "getPSDEUIActionGroup")
    );
    _.w(d, "valueFormat", s);
    _.w(d, "enableSort", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/dataview/dekanban-writer.mjs
var DEKanbanWriter = class extends DEDataViewWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.v(
      d,
      "updateGroupControlAction",
      c.s("control.ControlAction[]", s, "getUpdateGroupPSControlAction")
    );
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/editor-writer.mjs
var EditorWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "cssStyle", s);
    _.w(d, "dynaClass", s);
    _.w(d, "editorHeight", s, "", 0);
    _.w(d, "editorParams", s);
    _.w(d, "editorStyle", s);
    _.w(d, "editorType", s);
    _.w(d, "editorWidth", s, "", 0);
    _.w(d, "objectIdField", s);
    _.w(d, "objectNameField", s);
    _.w(d, "objectValueField", s);
    _.v(
      d,
      "controlAttributes",
      c.m("control.ControlAttribute[]", s, "getPSControlAttributes")
    );
    _.v(
      d,
      "controlLogics",
      c.m("control.ControlLogic[]", s, "getPSControlLogics")
    );
    _.v(
      d,
      "controlRenders",
      c.m("control.ControlRender[]", s, "getPSControlRenders")
    );
    _.v(d, "editorItems", c.m("control.EditorItem[]", s, "getPSEditorItems"));
    _.v(d, "sysCss", c.s("res.SysCss[]", s, "getPSSysCss"));
    _.v(d, "sysDictCat", c.s("res.SysDictCat[]", s, "getPSSysDictCat"));
    _.x(d, "sysPFPluginId", s, "getPSSysPFPlugin");
    _.w(d, "placeHolder", s);
    _.w(d, "predefinedType", s);
    _.w(d, "textSeparator", s);
    _.w(d, "valueSeparator", s);
    _.w(d, "valueType", s, "", "SIMPLE");
    _.w(d, "disabled", s);
    _.w(d, "editable", s, "", true);
    _.w(d, "readOnly", s);
    _.v(
      d,
      "navigateContexts",
      c.m("control.NavigateContext[]", s, "getPSNavigateContexts")
    );
    _.v(
      d,
      "navigateParams",
      c.m("control.NavigateParam[]", s, "getPSNavigateParams")
    );
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/editor/array-writer.mjs
var ArrayWriter = class extends EditorWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "dataType", s, "", "STRING");
    _.w(d, "maxLength", s);
    _.w(d, "maxValue", s);
    _.w(d, "minLength", s, "", 0);
    _.w(d, "minValue", s);
    _.x(d, "appCodeListId", s, "getPSAppCodeList");
    _.v(
      d,
      "sysValueRule",
      c.s("valuerule.SysValueRule[]", s, "getPSSysValueRule")
    );
    _.w(d, "precision", s);
    _.w(d, "showMaxLength", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/ajax-editor-writer.mjs
var AjaxEditorWriter = class extends EditorWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "handlerType", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/editor/auto-complete-writer.mjs
var AutoCompleteWriter = class extends AjaxEditorWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "acminChars", s, "aCMinChars", 0);
    _.w(d, "contextJOString", s);
    _.w(d, "itemParamJO", s);
    _.x(d, "appDEACModeId", s, "getPSAppDEACMode");
    _.x(d, "appDEDataSetId", s, "getPSAppDEDataSet");
    _.x(d, "appDataEntityId", s, "getPSAppDataEntity");
    _.v(
      d,
      "uiactionGroup",
      c.s("view.UIActionGroup[]", s, "getPSUIActionGroup")
    );
    _.w(d, "paramJOString", s);
    _.w(d, "enableAC", s);
    _.w(d, "forceSelection", s);
    _.w(d, "showTrigger", s);
    _.w(d, "maxLength", s);
    _.w(d, "minLength", s, "", 0);
    _.x(d, "appCodeListId", s, "getPSAppCodeList");
    _.v(
      d,
      "sysValueRule",
      c.s("valuerule.SysValueRule[]", s, "getPSSysValueRule")
    );
    _.w(d, "showMaxLength", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/editor/check-box-writer.mjs
var CheckBoxWriter = class extends EditorWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/editor/code-list-editor-writer.mjs
var CodeListEditorWriter = class extends EditorWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "itemsText", s);
    _.w(d, "codeListModel", s);
    _.x(d, "appCodeListId", s, "getPSAppCodeList");
    _.w(d, "allItems", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/editor/check-box-list-writer.mjs
var CheckBoxListWriter = class extends CodeListEditorWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/editor/text-editor-writer.mjs
var TextEditorWriter = class extends EditorWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "maxLength", s);
    _.w(d, "minLength", s, "", 0);
    _.x(d, "appCodeListId", s, "getPSAppCodeList");
    _.v(
      d,
      "sysValueRule",
      c.s("valuerule.SysValueRule[]", s, "getPSSysValueRule")
    );
    _.w(d, "showMaxLength", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/editor/code-writer.mjs
var CodeWriter = class extends TextEditorWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "codeType", s);
    _.w(d, "enableFullScreen", s);
    _.w(d, "enableMinimap", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/editor/color-picker-writer.mjs
var ColorPickerWriter = class extends EditorWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/editor/date-picker-writer.mjs
var DatePickerWriter = class extends EditorWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "dateTimeFormat", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/editor/date-range-writer.mjs
var DateRangeWriter = class extends DatePickerWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/editor/drop-down-list-writer.mjs
var DropDownListWriter = class extends CodeListEditorWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "singleSelect", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/editor/value-item-editor-writer.mjs
var ValueItemEditorWriter = class extends EditorWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "valueItemName", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/editor/file-uploader-writer.mjs
var FileUploaderWriter = class extends ValueItemEditorWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "fileExts", s);
    _.w(d, "maxFileCount", s);
    _.w(d, "maxFileSize", s);
    _.w(d, "minFileCount", s);
    _.w(d, "osscat", s, "oSSCat");
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/editor/hidden-writer.mjs
var HiddenWriter = class extends EditorWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/editor/html-writer.mjs
var HtmlWriter = class extends EditorWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.x(d, "appDEACModeId", s, "getPSAppDEACMode");
    _.x(d, "appDEDataSetId", s, "getPSAppDEDataSet");
    _.x(d, "appDataEntityId", s, "getPSAppDataEntity");
    _.x(d, "pickupAppViewId", s, "getPickupPSAppView");
    _.w(d, "enableAC", s);
    _.w(d, "enablePickupView", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/editor/ipaddress-writer.mjs
var IPAddressWriter = class extends EditorWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/editor/list-box-writer.mjs
var ListBoxWriter = class extends CodeListEditorWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/editor/picker-editor-writer.mjs
var PickerEditorWriter = class extends ValueItemEditorWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "contextJOString", s);
    _.w(d, "itemParamJO", s);
    _.w(d, "paramJOString", s);
    _.x(d, "pickupAppViewId", s, "getPickupPSAppView");
    _.w(d, "acminChars", s, "aCMinChars", 0);
    _.w(d, "handlerType", s);
    _.x(d, "appDEACModeId", s, "getPSAppDEACMode");
    _.x(d, "appDEDataSetId", s, "getPSAppDEDataSet");
    _.x(d, "appDataEntityId", s, "getPSAppDataEntity");
    _.v(
      d,
      "uiactionGroup",
      c.s("view.UIActionGroup[]", s, "getPSUIActionGroup")
    );
    _.w(d, "enableAC", s);
    _.w(d, "forceSelection", s);
    _.w(d, "showTrigger", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/editor/list-box-picker-writer.mjs
var ListBoxPickerWriter = class extends PickerEditorWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/editor/mdrop-down-list-writer.mjs
var MDropDownListWriter = class extends DropDownListWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/editor/picker-writer.mjs
var PickerWriter = class extends PickerEditorWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "dropDownViewHeight", s);
    _.w(d, "dropDownViewWidth", s);
    _.x(d, "linkAppViewId", s, "getLinkPSAppView");
    _.w(d, "dropDownView", s);
    _.w(d, "enableLinkView", s);
    _.w(d, "enablePickupView", s);
    _.w(d, "singleSelect", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/editor/mpicker-writer.mjs
var MPickerWriter = class extends PickerWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/editor/mail-address-writer.mjs
var MailAddressWriter = class extends PickerEditorWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "enablePickupView", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/editor/map-picker-writer.mjs
var MapPickerWriter = class extends EditorWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/editor/markdown-writer.mjs
var MarkdownWriter = class extends TextEditorWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "mode", s);
    _.x(d, "appDEACModeId", s, "getPSAppDEACMode");
    _.x(d, "appDEDataSetId", s, "getPSAppDEDataSet");
    _.x(d, "appDataEntityId", s, "getPSAppDataEntity");
    _.x(d, "pickupAppViewId", s, "getPickupPSAppView");
    _.w(d, "enableAC", s);
    _.w(d, "enablePickupView", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/editor/number-editor-writer.mjs
var NumberEditorWriter = class extends EditorWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "maxValue", s);
    _.w(d, "minValue", s);
    _.v(
      d,
      "sysValueRule",
      c.s("valuerule.SysValueRule[]", s, "getPSSysValueRule")
    );
    _.w(d, "precision", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/editor/number-range-writer.mjs
var NumberRangeWriter = class extends NumberEditorWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/editor/office2-writer.mjs
var Office2Writer = class extends ValueItemEditorWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/editor/office-writer.mjs
var OfficeWriter = class extends EditorWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/editor/password-writer.mjs
var PasswordWriter = class extends TextEditorWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/editor/pickup-view-writer.mjs
var PickupViewWriter = class extends ValueItemEditorWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "contextJOString", s);
    _.w(d, "itemParamJO", s);
    _.w(d, "paramJOString", s);
    _.x(d, "pickupAppViewId", s, "getPickupPSAppView");
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/editor/picture-writer.mjs
var PictureWriter = class extends FileUploaderWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "rawContent", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/editor/predefined-writer.mjs
var PredefinedWriter = class extends ValueItemEditorWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/editor/radio-button-list-writer.mjs
var RadioButtonListWriter = class extends CodeListEditorWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/editor/stepper-writer.mjs
var StepperWriter = class extends NumberEditorWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "stepValue", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/editor/rating-writer.mjs
var RatingWriter = class extends StepperWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/editor/raw-writer.mjs
var RawWriter = class extends EditorWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "contentType", s, "", "RAW");
    _.w(d, "template", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/editor/slider-writer.mjs
var SliderWriter = class extends StepperWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/editor/span-writer.mjs
var SpanWriter = class extends CodeListEditorWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "halign", s, "hAlign", "LEFT");
    _.x(d, "linkAppViewId", s, "getLinkPSAppView");
    _.w(d, "precision", s);
    _.w(d, "renderMode", s);
    _.w(d, "valign", s, "vAlign", "MIDDLE");
    _.w(d, "wrapMode", s, "", "NOWRAP");
    _.w(d, "enableLinkView", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/editor/text-area-writer.mjs
var TextAreaWriter = class extends TextEditorWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.x(d, "appDEACModeId", s, "getPSAppDEACMode");
    _.x(d, "appDEDataSetId", s, "getPSAppDEDataSet");
    _.x(d, "appDataEntityId", s, "getPSAppDataEntity");
    _.x(d, "pickupAppViewId", s, "getPickupPSAppView");
    _.w(d, "enableAC", s);
    _.w(d, "enablePickupView", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/editor/text-box-writer.mjs
var TextBoxWriter = class extends TextEditorWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "maxValue", s);
    _.w(d, "minValue", s);
    _.w(d, "precision", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/expbar/exp-bar-writer.mjs
var ExpBarWriter = class extends AjaxControlContainerWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.x(d, "appCounterRefId", s, "getPSAppCounterRef");
    _.v(d, "sysImage", c.s("res.SysImage[]", s, "getPSSysImage"));
    _.w(d, "title", s);
    _.v(
      d,
      "titleLanguageRes",
      c.s("res.LanguageRes[]", s, "getTitlePSLanguageRes")
    );
    _.w(d, "xdataControlName", s, "xDataControlName");
    _.w(d, "enableCounter", s);
    _.w(d, "enableSearch", s);
    _.w(d, "showTitleBar", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/expbar/mdcontrol-exp-bar-writer-base2.mjs
var MDControlExpBarWriterBase2 = class extends ExpBarWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/expbar/calendar-exp-bar-writer.mjs
var CalendarExpBarWriter = class extends MDControlExpBarWriterBase2 {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/expbar/chart-exp-bar-writer.mjs
var ChartExpBarWriter = class extends MDControlExpBarWriterBase2 {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/expbar/mdcontrol-exp-bar-writer-base.mjs
var MDControlExpBarWriterBase = class extends ExpBarWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/expbar/data-view-exp-bar-writer.mjs
var DataViewExpBarWriter = class extends MDControlExpBarWriterBase {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/expbar/gantt-exp-bar-writer.mjs
var GanttExpBarWriter = class extends MDControlExpBarWriterBase2 {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/expbar/grid-exp-bar-writer.mjs
var GridExpBarWriter = class extends MDControlExpBarWriterBase {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/expbar/list-exp-bar-writer.mjs
var ListExpBarWriter = class extends MDControlExpBarWriterBase {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/expbar/map-exp-bar-writer.mjs
var MapExpBarWriter = class extends MDControlExpBarWriterBase2 {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/expbar/tab-exp-panel-writer.mjs
var TabExpPanelWriter = class extends ControlContainerWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.y(d, "tabExpPageIds", s, "getPSTabExpPages");
    _.w(d, "tabLayout", s);
    _.w(d, "uniqueTag", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/expbar/tree-exp-bar-writer.mjs
var TreeExpBarWriter = class extends ExpBarWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/expbar/wfexp-bar-writer.mjs
var WFExpBarWriter = class extends ExpBarWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/form/deform-writer.mjs
var DEFormWriter = class extends AjaxControlContainerWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "formFuncMode", s);
    _.w(d, "formStyle", s);
    _.w(d, "formWidth", s, "", 0);
    _.v(
      d,
      "deformItemUpdates",
      c.m("control.form.DEFormItemUpdate[]", s, "getPSDEFormItemUpdates")
    );
    _.v(
      d,
      "deformItemVRs",
      c.m("control.form.DEFormItemVR[]", s, "getPSDEFormItemVRs")
    );
    _.v(
      d,
      "deformPages",
      c.m("control.form.DEFormPage[]", s, "getPSDEFormPages")
    );
    _.v(d, "layout", c.s("control.layout.Layout[]", s, "getPSLayout"));
    _.w(d, "tabHeaderPos", s);
    _.w(d, "mobileControl", s);
    _.w(d, "noTabHeader", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/form/deedit-form-writer.mjs
var DEEditFormWriter = class extends DEFormWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "activeDataField", s);
    _.w(d, "autoSaveMode", s, "", 0);
    _.v(
      d,
      "createControlAction",
      c.s("control.ControlAction[]", s, "getCreatePSControlAction")
    );
    _.v(
      d,
      "getDraftFromControlAction",
      c.s("control.ControlAction[]", s, "getGetDraftFromPSControlAction")
    );
    _.v(
      d,
      "getDraftControlAction",
      c.s("control.ControlAction[]", s, "getGetDraftPSControlAction")
    );
    _.v(
      d,
      "getControlAction",
      c.s("control.ControlAction[]", s, "getGetPSControlAction")
    );
    _.v(d, "navBarSysCss", c.s("res.SysCss[]", s, "getNavBarPSSysCss"));
    _.w(d, "navBarPos", s);
    _.w(d, "navBarStyle", s);
    _.w(d, "navBarWidth", s, "", 0);
    _.w(d, "navbarHeight", s, "", 0);
    _.x(d, "appCounterRefId", s, "getPSAppCounterRef");
    _.v(
      d,
      "controlNavContexts",
      c.m("control.ControlNavContext[]", s, "getPSControlNavContexts")
    );
    _.v(
      d,
      "controlNavParams",
      c.m("control.ControlNavParam[]", s, "getPSControlNavParams")
    );
    _.v(
      d,
      "removeControlAction",
      c.s("control.ControlAction[]", s, "getRemovePSControlAction")
    );
    _.v(
      d,
      "updateControlAction",
      c.s("control.ControlAction[]", s, "getUpdatePSControlAction")
    );
    _.w(d, "activeDataMode", s);
    _.w(d, "enableAutoSave", s);
    _.w(d, "enableCustomized", s);
    _.w(d, "infoFormMode", s);
    _.w(d, "readOnly", s);
    _.w(d, "showFormNavBar", s);
    _.v(
      d,
      "goBackControlAction",
      c.s("control.ControlAction[]", s, "getGoBackPSControlAction")
    );
    _.v(
      d,
      "dewizardForm",
      c.s("dataentity.wizard.DEWizardForm[]", s, "getPSDEWizardForm")
    );
    _.v(
      d,
      "wfstartControlAction",
      c.s("control.ControlAction[]", s, "getWFStartPSControlAction")
    );
    _.v(
      d,
      "wfsubmitControlAction",
      c.s("control.ControlAction[]", s, "getWFSubmitPSControlAction")
    );
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/form/deform-detail-writer.mjs
var DEFormDetailWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.v(
      d,
      "capLanguageRes",
      c.s("res.LanguageRes[]", s, "getCapPSLanguageRes")
    );
    _.w(d, "caption", s);
    _.w(d, "codeName", s);
    _.w(d, "columnAlign", s);
    _.w(d, "contentHeight", s, "", 0);
    _.w(d, "contentWidth", s, "", 0);
    _.w(d, "counterId", s);
    _.w(d, "counterMode", s, "", 0);
    _.w(d, "cssStyle", s);
    _.w(d, "detailStyle", s);
    _.w(d, "detailType", s);
    _.w(d, "dynaClass", s);
    _.w(d, "height", s, "", 0);
    _.w(d, "labelCssStyle", s);
    _.w(d, "labelDynaClass", s);
    _.v(d, "labelSysCss", c.s("res.SysCss[]", s, "getLabelPSSysCss"));
    _.x(d, "appCounterRefId", s, "getPSAppCounterRef");
    _.v(
      d,
      "controlAttributes",
      c.m("control.ControlAttribute[]", s, "getPSControlAttributes")
    );
    _.v(
      d,
      "controlLogics",
      c.m("control.ControlLogic[]", s, "getPSControlLogics")
    );
    _.v(
      d,
      "controlRenders",
      c.m("control.ControlRender[]", s, "getPSControlRenders")
    );
    _.v(
      d,
      "defdgroupLogics",
      c.m("control.form.DEFDCatGroupLogic[]", s, "getPSDEFDGroupLogics")
    );
    _.v(d, "layoutPos", c.s("control.layout.LayoutPos[]", s, "getPSLayoutPos"));
    _.v(d, "sysCss", c.s("res.SysCss[]", s, "getPSSysCss"));
    _.v(d, "sysImage", c.s("res.SysImage[]", s, "getPSSysImage"));
    _.x(d, "sysPFPluginId", s, "getPSSysPFPlugin");
    _.x(d, "showMoreMgrDEFormDetailId", s, "getShowMoreMgrPSDEFormDetail");
    _.w(d, "showMoreMode", s, "", 0);
    _.w(d, "width", s, "", 0);
    _.w(d, "repeatContent", s);
    _.w(d, "showCaption", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/form/deform-item-writer.mjs
var DEFormItemWriter = class extends DEFormDetailWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "captionItemName", s);
    _.w(d, "createDV", s);
    _.w(d, "createDVT", s);
    _.w(d, "dataType", s);
    _.w(d, "enableCond", s);
    _.w(d, "fieldName", s);
    _.w(d, "ignoreInput", s);
    _.w(d, "inputTip", s);
    _.w(d, "inputTipUrl", s);
    _.w(d, "itemHeight", s, "", 0);
    _.w(d, "itemWidth", s, "", 0);
    _.w(d, "labelPos", s);
    _.w(d, "labelWidth", s);
    _.w(d, "noPrivDisplayMode", s);
    _.w(d, "outputCodeListConfigMode", s, "", 0);
    _.v(d, "phlanguageRes", c.s("res.LanguageRes[]", s, "getPHPSLanguageRes"));
    _.x(d, "appDEFieldId", s, "getPSAppDEField");
    _.x(d, "deformItemUpdateId", s, "getPSDEFormItemUpdate");
    _.v(d, "editor", c.s("control.Editor[]", s, "getPSEditor"));
    _.w(d, "resetItemNames", s, "resetItemNames");
    _.w(d, "unitName", s);
    _.w(d, "unitNameWidth", s, "", 0);
    _.w(d, "updateDV", s);
    _.w(d, "updateDVT", s);
    _.w(d, "valueFormat", s);
    _.w(d, "allowEmpty", s);
    _.w(d, "compositeItem", s);
    _.w(d, "convertToCodeItemText", s);
    _.w(d, "emptyCaption", s);
    _.w(d, "enableAnchor", s);
    _.w(d, "enableInputTip", s);
    _.w(d, "enableItemPriv", s);
    _.w(d, "enableUnitName", s);
    _.w(d, "hidden", s);
    _.w(d, "inputTipClosable", s);
    _.w(d, "needCodeListConfig", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/form/deedit-form-item-writer.mjs
var DEEditFormItemWriter = class extends DEFormItemWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/form/deedit-form-item-ex-writer.mjs
var DEEditFormItemExWriter = class extends DEEditFormItemWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.v(
      d,
      "deformItems",
      c.m("control.form.DEFormItem[]", s, "getPSDEFormItems")
    );
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/form/defdlogic-writer.mjs
var DEFDLogicWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "logicType", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/form/defdgroup-logic-writer.mjs
var DEFDGroupLogicWriter = class extends DEFDLogicWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "groupOP", s);
    _.v(d, "defdlogics", c.m("control.form.DEFDLogic[]", s, "getPSDEFDLogics"));
    _.w(d, "notMode", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/form/defdcat-group-logic-writer.mjs
var DEFDCatGroupLogicWriter = class extends DEFDGroupLogicWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "logicCat", s);
    _.w(d, "relatedDetailNames", s, "relatedDetailNames");
    _.w(d, "scriptCode", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/form/defdsingle-logic-writer.mjs
var DEFDSingleLogicWriter = class extends DEFDLogicWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "condOP", s);
    _.w(d, "defdname", s, "dEFDName");
    _.w(d, "value", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/form/defiupdate-detail-writer.mjs
var DEFIUpdateDetailWriter = class extends ModelObjectWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/form/deform-button-writer.mjs
var DEFormButtonWriter = class extends DEFormDetailWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "actionType", s);
    _.w(d, "captionItemName", s);
    _.v(d, "inlineUIAction", c.s("view.UIAction[]", s, "getInlinePSUIAction"));
    _.x(d, "deformItemUpdateId", s, "getPSDEFormItemUpdate");
    _.v(
      d,
      "navigateContexts",
      c.m("control.NavigateContext[]", s, "getPSNavigateContexts")
    );
    _.v(
      d,
      "navigateParams",
      c.m("control.NavigateParam[]", s, "getPSNavigateParams")
    );
    _.x(d, "uiactionId", s, "getPSUIAction");
    _.x(d, "paramPickupAppViewId", s, "getParamPickupPSAppView");
    _.w(d, "paramViewParamJO", s);
    _.w(d, "tooltip", s);
    _.w(d, "uiactionTarget", s, "uIActionTarget");
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/form/deform-button-list-writer.mjs
var DEFormButtonListWriter = class extends DEFormDetailWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "actionGroupExtractMode", s);
    _.w(d, "buttonListType", s, "", "UIACTIONGROUP");
    _.v(
      d,
      "deformButtons",
      c.m("control.form.DEFormButton[]", s, "getPSDEFormButtons")
    );
    _.v(
      d,
      "uiactionGroup",
      c.s("view.UIActionGroup[]", s, "getPSUIActionGroup")
    );
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/form/deform-druipart-writer.mjs
var DEFormDRUIPartWriter = class extends DEFormDetailWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "maskInfo", s);
    _.w(d, "maskMode", s);
    _.v(
      d,
      "maskLanguageRes",
      c.s("res.LanguageRes[]", s, "getMaskPSLanguageRes")
    );
    _.x(d, "appViewId", s, "getPSAppView");
    _.x(d, "deformItemUpdateId", s, "getPSDEFormItemUpdate");
    _.v(
      d,
      "navigateContexts",
      c.m("control.NavigateContext[]", s, "getPSNavigateContexts")
    );
    _.v(
      d,
      "navigateParams",
      c.m("control.NavigateParam[]", s, "getPSNavigateParams")
    );
    _.w(d, "paramItem", s);
    _.w(d, "parentDataJO", s);
    _.w(d, "refreshItems", s);
    _.w(d, "needSave", s);
    _.w(d, "refreshItemsSetParamOnly", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/form/deform-base-group-panel-writer.mjs
var DEFormBaseGroupPanelWriter = class extends DEFormDetailWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.v(d, "layout", c.s("control.layout.Layout[]", s, "getPSLayout"));
    _.w(d, "captionItemName", s);
    _.w(d, "itemIgnoreInput", s, "", 0);
    _.v(
      d,
      "deformDetails",
      c.m("control.form.DEFormDetail[]", s, "getPSDEFormDetails")
    );
    _.w(d, "enableAnchor", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/form/deform-group-panel-writer.mjs
var DEFormGroupPanelWriter = class extends DEFormBaseGroupPanelWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "actionGroupExtractMode", s);
    _.w(d, "buildInActions", s, "", 0);
    _.v(
      d,
      "uiactionGroup",
      c.s("view.UIActionGroup[]", s, "getPSUIActionGroup")
    );
    _.w(d, "titleBarCloseMode", s, "", 0);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/form/deform-iframe-writer.mjs
var DEFormIFrameWriter = class extends DEFormDetailWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "iframeUrl", s, "iFrameUrl");
    _.x(d, "linkAppViewId", s, "getLinkPSAppView");
    _.w(d, "refreshItems", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/form/deform-item-update-writer.mjs
var DEFormItemUpdateWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "codeName", s);
    _.x(d, "appDEMethodId", s, "getPSAppDEMethod");
    _.v(
      d,
      "defiupdateDetails",
      c.m("control.form.DEFIUpdateDetail[]", s, "getPSDEFIUpdateDetails")
    );
    _.w(d, "scriptCode", s);
    _.w(d, "customCode", s);
    _.w(d, "showBusyIndicator", s, "", true);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/form/deform-item-vrwriter.mjs
var DEFormItemVRWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "checkMode", s);
    _.v(
      d,
      "defvalueRule",
      c.s(
        "dataentity.defield.valuerule.DEFValueRule[]",
        s,
        "getPSDEFValueRule"
      )
    );
    _.w(d, "deformItemName", s, "getPSDEFormItemName");
    _.v(
      d,
      "sysValueRule",
      c.s("valuerule.SysValueRule[]", s, "getPSSysValueRule")
    );
    _.w(d, "valueRuleType", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/form/deform-mdctrl-writer.mjs
var DEFormMDCtrlWriter = class extends DEFormBaseGroupPanelWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "actionGroupExtractMode", s);
    _.w(d, "buildInActions", s, "", 0);
    _.v(
      d,
      "contentControl",
      c.s("control.Control[]", s, "getContentPSControl")
    );
    _.w(d, "contentType", s);
    _.w(d, "ctrlParams", s);
    _.w(d, "fieldName", s);
    _.x(d, "appDEFieldId", s, "getPSAppDEField");
    _.x(d, "deformItemUpdateId", s, "getPSDEFormItemUpdate");
    _.v(
      d,
      "uiactionGroup",
      c.s("view.UIActionGroup[]", s, "getPSUIActionGroup")
    );
    _.w(d, "resetItemNames", s, "resetItemNames");
    _.w(d, "titleBarCloseMode", s, "", 0);
    _.w(d, "one2OneForm", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/form/deform-page-writer.mjs
var DEFormPageWriter = class extends DEFormBaseGroupPanelWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/form/deform-raw-item-writer.mjs
var DEFormRawItemWriter = class extends DEFormDetailWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.v(d, "rawItem", c.s("control.RawItemBase[]", s, "getPSRawItem"));
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/form/deform-tab-page-writer.mjs
var DEFormTabPageWriter = class extends DEFormBaseGroupPanelWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/form/deform-tab-panel-writer.mjs
var DEFormTabPanelWriter = class extends DEFormDetailWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.v(
      d,
      "deformTabPages",
      c.m("control.form.DEFormTabPage[]", s, "getPSDEFormTabPages")
    );
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/form/deform-user-control-writer.mjs
var DEFormUserControlWriter = class extends DEFormDetailWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "ctrlParams", s);
    _.w(d, "predefinedType", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/form/desearch-form-writer.mjs
var DESearchFormWriter = class extends DEFormWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "searchButtonPos", s);
    _.w(d, "searchButtonStyle", s);
    _.w(d, "enableAdvanceSearch", s);
    _.w(d, "enableAutoSearch", s);
    _.w(d, "enableFilterSave", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/grid/hidden-degrid-edit-item-writer.mjs
var HiddenDEGridEditItemWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "caption", s);
    _.w(d, "codeName", s);
    _.w(d, "createDV", s);
    _.w(d, "createDVT", s);
    _.w(d, "enableCond", s);
    _.w(d, "ignoreInput", s);
    _.w(d, "outputCodeListConfigMode", s, "", 0);
    _.x(d, "appDEFieldId", s, "getPSAppDEField");
    _.x(d, "degridEditItemUpdateId", s, "getPSDEGridEditItemUpdate");
    _.v(d, "editor", c.s("control.Editor[]", s, "getPSEditor"));
    _.w(d, "resetItemNames", s, "resetItemNames");
    _.w(d, "unitName", s);
    _.w(d, "unitNameWidth", s, "", 0);
    _.w(d, "updateDV", s);
    _.w(d, "updateDVT", s);
    _.w(d, "allowEmpty", s);
    _.w(d, "convertToCodeItemText", s);
    _.w(d, "enableUnitName", s);
    _.w(d, "needCodeListConfig", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/grid/degeiupdate-detail-writer.mjs
var DEGEIUpdateDetailWriter = class extends ModelObjectWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/grid/degrid-data-item-writer.mjs
var DEGridDataItemWriter = class extends DataItemWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "format", s);
    _.x(d, "appDEFieldId", s, "getPSAppDEField");
    _.w(d, "scriptCode", s);
    _.w(d, "valueType", s, "", "SIMPLE");
    _.w(d, "customCode", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/grid/degrid-edit-item-update-writer.mjs
var DEGridEditItemUpdateWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "codeName", s);
    _.x(d, "appDEMethodId", s, "getPSAppDEMethod");
    _.v(
      d,
      "degeiupdateDetails",
      c.m("control.grid.DEGEIUpdateDetail[]", s, "getPSDEGEIUpdateDetails")
    );
    _.w(d, "scriptCode", s);
    _.w(d, "customCode", s);
    _.w(d, "showBusyIndicator", s, "", true);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/grid/degrid-edit-item-vrwriter.mjs
var DEGridEditItemVRWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "checkMode", s);
    _.v(
      d,
      "defvalueRule",
      c.s(
        "dataentity.defield.valuerule.DEFValueRule[]",
        s,
        "getPSDEFValueRule"
      )
    );
    _.w(d, "degridEditItemName", s, "getPSDEGridEditItemName");
    _.v(
      d,
      "sysValueRule",
      c.s("valuerule.SysValueRule[]", s, "getPSSysValueRule")
    );
    _.w(d, "valueRuleType", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/grid/degrid-column-writer.mjs
var DEGridColumnWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "aggField", s);
    _.w(d, "aggMode", s, "", "NONE");
    _.w(d, "aggValueFormat", s);
    _.w(d, "align", s);
    _.v(
      d,
      "capLanguageRes",
      c.s("res.LanguageRes[]", s, "getCapPSLanguageRes")
    );
    _.w(d, "caption", s);
    _.v(d, "cellSysCss", c.s("res.SysCss[]", s, "getCellPSSysCss"));
    _.w(d, "codeName", s);
    _.w(d, "columnStyle", s);
    _.w(d, "columnType", s);
    _.v(d, "headerSysCss", c.s("res.SysCss[]", s, "getHeaderPSSysCss"));
    _.w(d, "hideMode", s, "", 0);
    _.w(d, "noPrivDisplayMode", s);
    _.v(
      d,
      "controlAttributes",
      c.m("control.ControlAttribute[]", s, "getPSControlAttributes")
    );
    _.v(
      d,
      "controlLogics",
      c.m("control.ControlLogic[]", s, "getPSControlLogics")
    );
    _.v(
      d,
      "controlRenders",
      c.m("control.ControlRender[]", s, "getPSControlRenders")
    );
    _.v(d, "sysImage", c.s("res.SysImage[]", s, "getPSSysImage"));
    _.x(d, "sysPFPluginId", s, "getPSSysPFPlugin");
    _.w(d, "width", s);
    _.w(d, "widthUnit", s);
    _.w(d, "enableSort", s);
    _.w(d, "hiddenDataItem", s);
    _.w(d, "hideDefault", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/grid/degrid-field-column-writer.mjs
var DEGridFieldColumnWriter = class extends DEGridColumnWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "clconvertMode", s, "cLConvertMode");
    _.w(d, "dataItemName", s);
    _.w(d, "excelCaption", s);
    _.v(d, "filterEditor", c.s("control.Editor[]", s, "getFilterPSEditor"));
    _.w(d, "groupItem", s);
    _.x(d, "linkAppViewId", s, "getLinkPSAppView");
    _.w(d, "linkValueItem", s);
    _.w(d, "objectIdField", s);
    _.w(d, "objectNameField", s);
    _.w(d, "objectValueField", s);
    _.x(d, "appCodeListId", s, "getPSAppCodeList");
    _.x(d, "appDEFieldId", s, "getPSAppDEField");
    _.x(d, "deuiactionId", s, "getPSDEUIAction");
    _.v(
      d,
      "deuiactionGroup",
      c.s("dataentity.uiaction.DEUIActionGroup[]", s, "getPSDEUIActionGroup")
    );
    _.w(d, "textSeparator", s);
    _.w(d, "treeColumnMode", s, "", 0);
    _.w(d, "unitName", s);
    _.w(d, "unitNameWidth", s, "", 0);
    _.w(d, "valueFormat", s);
    _.w(d, "valueSeparator", s);
    _.w(d, "valueType", s, "", "SIMPLE");
    _.w(d, "enableItemPriv", s);
    _.w(d, "enableLinkView", s);
    _.w(d, "enableRowEdit", s);
    _.w(d, "enableUnitName", s);
    _.w(d, "createDV", s);
    _.w(d, "createDVT", s);
    _.w(d, "enableCond", s);
    _.w(d, "ignoreInput", s);
    _.w(d, "outputCodeListConfigMode", s, "", 0);
    _.x(d, "degridEditItemUpdateId", s, "getPSDEGridEditItemUpdate");
    _.v(d, "editor", c.s("control.Editor[]", s, "getPSEditor"));
    _.w(d, "resetItemNames", s, "resetItemNames");
    _.w(d, "updateDV", s);
    _.w(d, "updateDVT", s);
    _.w(d, "allowEmpty", s);
    _.w(d, "convertToCodeItemText", s);
    _.w(d, "needCodeListConfig", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/grid/degrid-group-column-writer.mjs
var DEGridGroupColumnWriter = class extends DEGridColumnWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.v(
      d,
      "degridColumns",
      c.m("control.grid.DEGridColumn[]", s, "getPSDEGridColumns")
    );
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/grid/degrid-writer.mjs
var DEGridWriter = class extends MDAjaxControlContainerWriter2 {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "aggMode", s);
    _.x(d, "aggAppDEDataSetId", s, "getAggPSAppDEDataSet");
    _.x(d, "aggAppDataEntityId", s, "getAggPSAppDataEntity");
    _.v(
      d,
      "aggLayoutPanel",
      c.s("control.panel.LayoutPanel[]", s, "getAggPSLayoutPanel")
    );
    _.w(d, "columnEnableFilter", s);
    _.w(d, "columnEnableLink", s);
    _.w(d, "emptyText", s);
    _.v(
      d,
      "emptyTextLanguageRes",
      c.s("res.LanguageRes[]", s, "getEmptyTextPSLanguageRes")
    );
    _.w(d, "frozenFirstColumn", s, "", 0);
    _.w(d, "frozenLastColumn", s, "", 0);
    _.w(d, "gridStyle", s);
    _.w(d, "groupMode", s);
    _.x(d, "groupAppDEFieldId", s, "getGroupPSAppDEField");
    _.x(d, "groupCodeListId", s, "getGroupPSCodeList");
    _.w(d, "groupStyle", s, "", "DEFAULT");
    _.w(d, "minorSortDir", s);
    _.x(d, "minorSortAppDEFieldId", s, "getMinorSortPSAppDEField");
    _.x(d, "orderValueAppDEFieldId", s, "getOrderValuePSAppDEField");
    _.v(
      d,
      "degridColumns",
      c.m("control.grid.DEGridColumn[]", s, "getPSDEGridColumns")
    );
    _.v(
      d,
      "degridDataItems",
      c.m("control.grid.DEGridDataItem[]", s, "getPSDEGridDataItems")
    );
    _.v(
      d,
      "degridEditItemUpdates",
      c.m(
        "control.grid.DEGridEditItemUpdate[]",
        s,
        "getPSDEGridEditItemUpdates"
      )
    );
    _.v(
      d,
      "degridEditItemVRs",
      c.m("control.grid.DEGridEditItemVR[]", s, "getPSDEGridEditItemVRs")
    );
    _.v(
      d,
      "degridEditItems",
      c.m("control.grid.DEGridEditItem[]", s, "getPSDEGridEditItems")
    );
    _.w(d, "pagingMode", s, "", 0);
    _.w(d, "pagingSize", s);
    _.w(d, "sortMode", s);
    _.w(d, "hasWFDataItems", s);
    _.w(d, "enableColFilter", s);
    _.w(d, "enableCustomized", s);
    _.w(d, "enableGroup", s);
    _.w(d, "enablePagingBar", s);
    _.w(d, "enableRowEdit", s);
    _.w(d, "enableRowEditChangedOnly", s);
    _.w(d, "enableRowEditOrder", s);
    _.w(d, "enableRowNew", s);
    _.w(d, "forceFit", s);
    _.w(d, "hideHeader", s);
    _.w(d, "noSort", s);
    _.w(d, "singleSelect", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/grid/degrid-uacolumn-writer.mjs
var DEGridUAColumnWriter = class extends DEGridColumnWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.v(
      d,
      "deuiactionGroup",
      c.s("dataentity.uiaction.DEUIActionGroup[]", s, "getPSDEUIActionGroup")
    );
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/grid/demulti-edit-view-panel-writer.mjs
var DEMultiEditViewPanelWriter = class extends DEGridWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.x(d, "embeddedAppViewId", s, "getEmbeddedPSAppView");
    _.w(d, "panelStyle", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/grid/detree-grid-writer.mjs
var DETreeGridWriter = class extends DEGridWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/layout/layout-writer-base.mjs
var LayoutWriterBase = class extends ModelObjectWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/layout/absolute-layout-writer.mjs
var AbsoluteLayoutWriter = class extends LayoutWriterBase {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "layout", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/layout/layout-pos-writer-base.mjs
var LayoutPosWriterBase = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "halignSelf", s, "hAlignSelf");
    _.w(d, "height", s);
    _.w(d, "heightMode", s);
    _.w(d, "layout", s);
    _.w(d, "spacingBottom", s);
    _.w(d, "spacingLeft", s);
    _.w(d, "spacingRight", s);
    _.w(d, "spacingTop", s);
    _.w(d, "valignSelf", s, "vAlignSelf");
    _.w(d, "width", s);
    _.w(d, "widthMode", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/layout/absolute-layout-pos-writer.mjs
var AbsoluteLayoutPosWriter = class extends LayoutPosWriterBase {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "bottom", s, "", 0);
    _.w(d, "layoutPos", s);
    _.w(d, "left", s, "", 0);
    _.w(d, "right", s, "", 0);
    _.w(d, "top", s, "", 0);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/layout/border-layout-writer.mjs
var BorderLayoutWriter = class extends LayoutWriterBase {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "layout", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/layout/border-layout-pos-writer.mjs
var BorderLayoutPosWriter = class extends LayoutPosWriterBase {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "layoutPos", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/layout/flex-layout-writer.mjs
var FlexLayoutWriter = class extends LayoutWriterBase {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "align", s);
    _.w(d, "dir", s);
    _.w(d, "layout", s);
    _.w(d, "valign", s, "vAlign");
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/layout/flex-layout-pos-writer.mjs
var FlexLayoutPosWriter = class extends LayoutPosWriterBase {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "basis", s);
    _.w(d, "grow", s);
    _.w(d, "shrink", s, "", 1);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/layout/grid12-layout-writer.mjs
var Grid12LayoutWriter = class extends LayoutWriterBase {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "columnCount", s);
    _.w(d, "layout", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/layout/grid-layout-pos-writer.mjs
var GridLayoutPosWriter = class extends LayoutPosWriterBase {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "colLG", s);
    _.w(d, "colLGOffset", s);
    _.w(d, "colMD", s);
    _.w(d, "colMDOffset", s);
    _.w(d, "colSM", s);
    _.w(d, "colSMOffset", s);
    _.w(d, "colWidth", s);
    _.w(d, "colXS", s);
    _.w(d, "colXSOffset", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/layout/table-layout-writer.mjs
var TableLayoutWriter = class extends LayoutWriterBase {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "layout", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/layout/table-layout-pos-writer.mjs
var TableLayoutPosWriter = class extends LayoutPosWriterBase {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/list/list-data-item-writer.mjs
var ListDataItemWriter = class extends DataItemWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.x(d, "frontCodeListId", s, "getFrontPSCodeList");
    _.w(d, "groupItem", s);
    _.w(d, "scriptCode", s);
    _.w(d, "customCode", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/list/delist-data-item-writer.mjs
var DEListDataItemWriter = class extends ListDataItemWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.x(d, "appDEFieldId", s, "getPSAppDEField");
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/list/list-writer.mjs
var ListWriter = class extends MDAjaxControlContainerWriter2 {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/list/delist-writer.mjs
var DEListWriter = class extends ListWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "emptyText", s);
    _.v(
      d,
      "emptyTextLanguageRes",
      c.s("res.LanguageRes[]", s, "getEmptyTextPSLanguageRes")
    );
    _.w(d, "groupMode", s);
    _.x(d, "groupAppDEFieldId", s, "getGroupPSAppDEField");
    _.x(d, "groupCodeListId", s, "getGroupPSCodeList");
    _.v(d, "groupSysCss", c.s("res.SysCss[]", s, "getGroupPSSysCss"));
    _.x(d, "groupSysPFPluginId", s, "getGroupPSSysPFPlugin");
    _.v(
      d,
      "groupUIActionGroup",
      c.s("view.UIActionGroup[]", s, "getGroupPSUIActionGroup")
    );
    _.w(d, "groupStyle", s, "", "DEFAULT");
    _.v(
      d,
      "itemLayoutPanel",
      c.s("control.panel.LayoutPanel[]", s, "getItemPSLayoutPanel")
    );
    _.w(d, "minorSortDir", s);
    _.x(d, "minorSortAppDEFieldId", s, "getMinorSortPSAppDEField");
    _.w(d, "mobListStyle", s);
    _.v(
      d,
      "delistDataItems",
      c.m("control.list.DEListDataItem[]", s, "getPSDEListDataItems")
    );
    _.v(
      d,
      "delistItems",
      c.m("control.list.DEListItem[]", s, "getPSDEListItems")
    );
    _.w(d, "pagingMode", s, "", 0);
    _.w(d, "pagingSize", s);
    _.w(d, "hasWFDataItems", s);
    _.w(d, "enableGroup", s);
    _.w(d, "enablePagingBar", s);
    _.w(d, "enableRowEdit", s);
    _.w(d, "enableRowEditGroup", s);
    _.w(d, "enableRowEditOrder", s);
    _.w(d, "enableRowNew", s);
    _.w(d, "noSort", s);
    _.w(d, "showHeader", s);
    _.w(d, "singleSelect", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/list/list-item-writer.mjs
var ListItemWriter = class extends ModelObjectWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/list/delist-item-writer.mjs
var DEListItemWriter = class extends ListItemWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "align", s);
    _.w(d, "clconvertMode", s, "cLConvertMode");
    _.v(
      d,
      "capLanguageRes",
      c.s("res.LanguageRes[]", s, "getCapPSLanguageRes")
    );
    _.w(d, "caption", s);
    _.w(d, "dataItemName", s);
    _.w(d, "groupItem", s);
    _.w(d, "itemPrivId", s);
    _.w(d, "itemType", s);
    _.v(
      d,
      "controlAttributes",
      c.m("control.ControlAttribute[]", s, "getPSControlAttributes")
    );
    _.v(
      d,
      "controlLogics",
      c.m("control.ControlLogic[]", s, "getPSControlLogics")
    );
    _.v(
      d,
      "controlRenders",
      c.m("control.ControlRender[]", s, "getPSControlRenders")
    );
    _.v(
      d,
      "deuiactionGroup",
      c.s("dataentity.uiaction.DEUIActionGroup[]", s, "getPSDEUIActionGroup")
    );
    _.x(d, "sysPFPluginId", s, "getPSSysPFPlugin");
    _.w(d, "valueFormat", s);
    _.w(d, "width", s);
    _.w(d, "widthString", s);
    _.w(d, "enableItemPriv", s);
    _.w(d, "enableSort", s);
    _.w(d, "hiddenDataItem", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/list/demob-mdctrl-writer.mjs
var DEMobMDCtrlWriter = class extends DEListWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.v(
      d,
      "deuiactionGroup",
      c.s("dataentity.uiaction.DEUIActionGroup[]", s, "getPSDEUIActionGroup")
    );
    _.v(
      d,
      "deuiactionGroup2",
      c.s("dataentity.uiaction.DEUIActionGroup[]", s, "getPSDEUIActionGroup2")
    );
    _.v(
      d,
      "deuiactionGroup3",
      c.s("dataentity.uiaction.DEUIActionGroup[]", s, "getPSDEUIActionGroup3")
    );
    _.v(
      d,
      "deuiactionGroup4",
      c.s("dataentity.uiaction.DEUIActionGroup[]", s, "getPSDEUIActionGroup4")
    );
    _.v(
      d,
      "deuiactionGroup5",
      c.s("dataentity.uiaction.DEUIActionGroup[]", s, "getPSDEUIActionGroup5")
    );
    _.v(
      d,
      "deuiactionGroup6",
      c.s("dataentity.uiaction.DEUIActionGroup[]", s, "getPSDEUIActionGroup6")
    );
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/map/map-writer.mjs
var MapWriter = class extends MDAjaxControlContainerWriter2 {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/map/sys-map-writer.mjs
var SysMapWriter = class extends MapWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "emptyText", s);
    _.v(
      d,
      "emptyTextLanguageRes",
      c.s("res.LanguageRes[]", s, "getEmptyTextPSLanguageRes")
    );
    _.w(d, "legendPos", s);
    _.w(d, "mapStyle", s);
    _.v(
      d,
      "sysMapItems",
      c.m("control.map.SysMapItem[]", s, "getPSSysMapItems")
    );
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/map/sys-map-item-writer.mjs
var SysMapItemWriter = class extends ControlItemWriter2 {
  onFillDSL(c, s, d) {
    const _ = this;
    _.x(d, "altitudeAppDEFieldId", s, "getAltitudePSAppDEField");
    _.w(d, "bkcolor", s, "bKColor");
    _.x(d, "bkcolorAppDEFieldId", s, "getBKColorPSAppDEField");
    _.w(d, "borderColor", s);
    _.w(d, "borderWidth", s);
    _.x(d, "clsAppDEFieldId", s, "getClsPSAppDEField");
    _.w(d, "color", s);
    _.x(d, "colorAppDEFieldId", s, "getColorPSAppDEField");
    _.x(d, "contentAppDEFieldId", s, "getContentPSAppDEField");
    _.w(d, "customCond", s);
    _.x(d, "data2AppDEFieldId", s, "getData2PSAppDEField");
    _.x(d, "dataAppDEFieldId", s, "getDataPSAppDEField");
    _.w(d, "dynaClass", s);
    _.x(d, "groupAppDEFieldId", s, "getGroupPSAppDEField");
    _.x(d, "iconAppDEFieldId", s, "getIconPSAppDEField");
    _.x(d, "idAppDEFieldId", s, "getIdPSAppDEField");
    _.w(d, "itemStyle", s);
    _.w(d, "itemType", s);
    _.x(d, "latitudeAppDEFieldId", s, "getLatitudePSAppDEField");
    _.x(d, "linkAppDEFieldId", s, "getLinkPSAppDEField");
    _.x(d, "longitudeAppDEFieldId", s, "getLongitudePSAppDEField");
    _.w(d, "maxSize", s);
    _.w(d, "modelObj", s);
    _.v(
      d,
      "nameLanguageRes",
      c.s("res.LanguageRes[]", s, "getNamePSLanguageRes")
    );
    _.x(d, "orderValueAppDEFieldId", s, "getOrderValuePSAppDEField");
    _.x(d, "appDEDataSetId", s, "getPSAppDEDataSet");
    _.x(d, "appDataEntityId", s, "getPSAppDataEntity");
    _.v(
      d,
      "decontextMenu",
      c.s("control.toolbar.DEContextMenu[]", s, "getPSDEContextMenu")
    );
    _.v(d, "sysCss", c.s("res.SysCss[]", s, "getPSSysCss"));
    _.v(d, "sysImage", c.s("res.SysImage[]", s, "getPSSysImage"));
    _.w(d, "radius", s);
    _.x(d, "removeAppDEActionId", s, "getRemovePSAppDEAction");
    _.x(d, "removeDEOPPrivId", s, "getRemovePSDEOPPriv");
    _.x(d, "shapeClsAppDEFieldId", s, "getShapeClsPSAppDEField");
    _.w(d, "shapeDynaClass", s);
    _.v(d, "shapeSysCss", c.s("res.SysCss[]", s, "getShapePSSysCss"));
    _.x(d, "tag2AppDEFieldId", s, "getTag2PSAppDEField");
    _.x(d, "tagAppDEFieldId", s, "getTagPSAppDEField");
    _.x(d, "textAppDEFieldId", s, "getTextPSAppDEField");
    _.x(d, "timeAppDEFieldId", s, "getTimePSAppDEField");
    _.x(d, "tipsAppDEFieldId", s, "getTipsPSAppDEField");
    _.w(d, "enableQuickCreate", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/menu/menu-item-writer.mjs
var MenuItemWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.v(
      d,
      "capLanguageRes",
      c.s("res.LanguageRes[]", s, "getCapPSLanguageRes")
    );
    _.w(d, "caption", s);
    _.v(
      d,
      "controlAttributes",
      c.m("control.ControlAttribute[]", s, "getPSControlAttributes")
    );
    _.v(
      d,
      "controlLogics",
      c.m("control.ControlLogic[]", s, "getPSControlLogics")
    );
    _.v(
      d,
      "controlRenders",
      c.m("control.ControlRender[]", s, "getPSControlRenders")
    );
    _.w(d, "tooltip", s);
    _.v(
      d,
      "tooltipLanguageRes",
      c.s("res.LanguageRes[]", s, "getTooltipPSLanguageRes")
    );
    _.w(d, "expanded", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/menu/app-menu-item-writer-base.mjs
var AppMenuItemWriterBase = class extends MenuItemWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "accUserMode", s);
    _.w(d, "accessKey", s);
    _.w(d, "appMenuItemState", s, "", 0);
    _.w(d, "counterId", s);
    _.w(d, "cssStyle", s);
    _.w(d, "data", s);
    _.w(d, "dynaClass", s);
    _.w(d, "informTag", s);
    _.w(d, "informTag2", s);
    _.w(d, "itemType", s);
    _.x(d, "appFuncId", s, "getPSAppFunc");
    _.v(
      d,
      "appMenuItems",
      c.m("control.menu.AppMenuItem[]", s, "getPSAppMenuItems")
    );
    _.v(d, "layout", c.s("control.layout.Layout[]", s, "getPSLayout"));
    _.v(d, "layoutPos", c.s("control.layout.LayoutPos[]", s, "getPSLayoutPos"));
    _.v(
      d,
      "navigateContexts",
      c.m("control.NavigateContext[]", s, "getPSNavigateContexts")
    );
    _.v(
      d,
      "navigateParams",
      c.m("control.NavigateParam[]", s, "getPSNavigateParams")
    );
    _.v(d, "sysCss", c.s("res.SysCss[]", s, "getPSSysCss"));
    _.v(d, "sysImage", c.s("res.SysImage[]", s, "getPSSysImage"));
    _.x(d, "sysPFPluginId", s, "getPSSysPFPlugin");
    _.w(d, "predefinedType", s);
    _.w(d, "predefinedTypeParam", s);
    _.w(d, "titleBarCloseMode", s, "", 0);
    _.w(d, "disableClose", s);
    _.w(d, "hidden", s);
    _.w(d, "hideSideBar", s);
    _.w(d, "openDefault", s);
    _.w(d, "spanMode", s);
    _.w(d, "valid", s, "", true);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/menu/app-menu-amref-writer.mjs
var AppMenuAMRefWriter = class extends AppMenuItemWriterBase {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/menu/app-menu-item-writer.mjs
var AppMenuItemWriter = class extends AppMenuItemWriterBase {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/menu/app-menu-raw-item-writer.mjs
var AppMenuRawItemWriter = class extends AppMenuItemWriterBase {
  onFillDSL(c, s, d) {
    const _ = this;
    _.v(d, "rawItem", c.s("control.RawItemBase[]", s, "getPSRawItem"));
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/menu/app-menu-seperator-writer.mjs
var AppMenuSeperatorWriter = class extends AppMenuItemWriterBase {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/control-attribute-writer.mjs
var ControlAttributeWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "attrName", s);
    _.w(d, "attrValue", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/control-logic-writer.mjs
var ControlLogicWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "attrName", s);
    _.w(d, "eventArg", s);
    _.w(d, "eventArg2", s);
    _.w(d, "eventNames", s);
    _.w(d, "itemName", s);
    _.w(d, "logicTag", s);
    _.w(d, "logicType", s);
    _.x(d, "appDEUIActionId", s, "getPSAppDEUIAction");
    _.x(d, "appDEUILogicId", s, "getPSAppDEUILogic");
    _.x(d, "appDataEntityId", s, "getPSAppDataEntity");
    _.x(d, "appUILogicId", s, "getPSAppUILogic");
    _.x(d, "appViewEngineId", s, "getPSAppViewEngine");
    _.x(d, "appViewLogicId", s, "getPSAppViewLogic");
    _.w(d, "scriptCode", s);
    _.w(d, "timer", s, "", 0);
    _.w(d, "triggerType", s, "", "CTRLEVENT");
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/navigate-param-writer.mjs
var NavigateParamWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "desc", s);
    _.w(d, "key", s);
    _.w(d, "value", s);
    _.w(d, "rawValue", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/control-nav-param-writer.mjs
var ControlNavParamWriter = class extends NavigateParamWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/control-nav-context-writer.mjs
var ControlNavContextWriter = class extends ControlNavParamWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/control-param-writer.mjs
var ControlParamWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "ctrlParams", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/control-render-writer.mjs
var ControlRenderWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "layoutPanelModel", s);
    _.v(
      d,
      "layoutPanel",
      c.s("control.panel.LayoutPanel[]", s, "getPSLayoutPanel")
    );
    _.x(d, "sysPFPluginId", s, "getPSSysPFPlugin");
    _.w(d, "renderName", s);
    _.w(d, "renderType", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/editor-item-writer.mjs
var EditorItemWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.x(d, "appDEACModeId", s, "getPSAppDEACMode");
    _.x(d, "appDEDataSetId", s, "getPSAppDEDataSet");
    _.x(d, "appDataEntityId", s, "getPSAppDataEntity");
    _.v(
      d,
      "navigateContexts",
      c.m("control.NavigateContext[]", s, "getPSNavigateContexts")
    );
    _.v(
      d,
      "navigateParams",
      c.m("control.NavigateParam[]", s, "getPSNavigateParams")
    );
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/navigate-context-writer.mjs
var NavigateContextWriter = class extends NavigateParamWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/raw-item-writer.mjs
var RawItemWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "contentType", s);
    _.w(d, "cssStyle", s);
    _.w(d, "dynaClass", s);
    _.w(d, "htmlContent", s);
    _.v(
      d,
      "controlAttributes",
      c.m("control.ControlAttribute[]", s, "getPSControlAttributes")
    );
    _.v(
      d,
      "controlLogics",
      c.m("control.ControlLogic[]", s, "getPSControlLogics")
    );
    _.v(
      d,
      "controlRenders",
      c.m("control.ControlRender[]", s, "getPSControlRenders")
    );
    _.v(
      d,
      "rawItemParams",
      c.m("control.RawItemParam[]", s, "getPSRawItemParams")
    );
    _.v(d, "sysCss", c.s("res.SysCss[]", s, "getPSSysCss"));
    _.v(d, "sysImage", c.s("res.SysImage[]", s, "getPSSysImage"));
    _.w(d, "predefinedType", s);
    _.w(d, "rawContent", s);
    _.w(d, "rawItemHeight", s, "", 0);
    _.w(d, "rawItemWidth", s, "", 0);
    _.w(d, "templateMode", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/control-item-param-writer.mjs
var ControlItemParamWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "caption", s);
    _.w(d, "key", s);
    _.v(d, "sysImage", c.s("res.SysImage[]", s, "getPSSysImage"));
    _.x(d, "uiactionId", s, "getPSUIAction");
    _.w(d, "tooltip", s);
    _.w(d, "value", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/raw-item-param-writer.mjs
var RawItemParamWriter = class extends ControlItemParamWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/panel/panel-item-logic-writer.mjs
var PanelItemLogicWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "logicType", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/panel/panel-item-group-logic-writer.mjs
var PanelItemGroupLogicWriter = class extends PanelItemLogicWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "groupOP", s);
    _.v(
      d,
      "panelItemLogics",
      c.m("control.panel.PanelItemLogic[]", s, "getPSPanelItemLogics")
    );
    _.w(d, "notMode", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/panel/panel-item-cat-group-logic-writer.mjs
var PanelItemCatGroupLogicWriter = class extends PanelItemGroupLogicWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "logicCat", s);
    _.w(d, "relatedItemNames", s, "relatedItemNames");
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/panel/panel-item-single-logic-writer.mjs
var PanelItemSingleLogicWriter = class extends PanelItemLogicWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "condOp", s);
    _.w(d, "dstModelField", s);
    _.w(d, "value", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/panel/sys-panel-item-writer.mjs
var SysPanelItemWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.v(
      d,
      "capLanguageRes",
      c.s("res.LanguageRes[]", s, "getCapPSLanguageRes")
    );
    _.w(d, "caption", s);
    _.w(d, "contentHeight", s, "", 0);
    _.w(d, "contentWidth", s, "", 0);
    _.w(d, "cssStyle", s);
    _.w(d, "dynaClass", s);
    _.w(d, "height", s, "", 0);
    _.w(d, "itemStyle", s);
    _.w(d, "itemType", s);
    _.w(d, "labelCssStyle", s);
    _.w(d, "labelDynaClass", s);
    _.v(d, "labelSysCss", c.s("res.SysCss[]", s, "getLabelPSSysCss"));
    _.v(
      d,
      "controlAttributes",
      c.m("control.ControlAttribute[]", s, "getPSControlAttributes")
    );
    _.v(
      d,
      "controlLogics",
      c.m("control.ControlLogic[]", s, "getPSControlLogics")
    );
    _.v(
      d,
      "controlRenders",
      c.m("control.ControlRender[]", s, "getPSControlRenders")
    );
    _.v(d, "layoutPos", c.s("control.layout.LayoutPos[]", s, "getPSLayoutPos"));
    _.v(
      d,
      "panelItemGroupLogics",
      c.m(
        "control.panel.PanelItemCatGroupLogic[]",
        s,
        "getPSPanelItemGroupLogics"
      )
    );
    _.v(d, "sysCss", c.s("res.SysCss[]", s, "getPSSysCss"));
    _.v(d, "sysImage", c.s("res.SysImage[]", s, "getPSSysImage"));
    _.x(d, "sysPFPluginId", s, "getPSSysPFPlugin");
    _.w(d, "width", s, "", 0);
    _.w(d, "showCaption", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/panel/sys-panel-button-writer.mjs
var SysPanelButtonWriter = class extends SysPanelItemWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "actionType", s);
    _.w(d, "borderStyle", s);
    _.w(d, "buttonCssStyle", s);
    _.w(d, "buttonHeight", s, "", 0);
    _.w(d, "buttonStyle", s);
    _.w(d, "buttonType", s, "", "PANELBUTTON");
    _.w(d, "buttonWidth", s, "", 0);
    _.w(d, "captionItemName", s);
    _.w(d, "iconAlign", s);
    _.v(d, "inlineUIAction", c.s("view.UIAction[]", s, "getInlinePSUIAction"));
    _.x(d, "uiactionId", s, "getPSUIAction");
    _.w(d, "renderMode", s, "", "BUTTON");
    _.w(d, "tooltip", s);
    _.w(d, "uiactionTarget", s, "uIActionTarget");
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/panel/sys-panel-button-list-writer.mjs
var SysPanelButtonListWriter = class extends SysPanelItemWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "actionGroupExtractMode", s, "", "ITEM");
    _.w(d, "buttonListType", s, "", "UIACTIONGROUP");
    _.v(
      d,
      "panelButtons",
      c.m("control.panel.PanelButton[]", s, "getPSPanelButtons")
    );
    _.v(
      d,
      "uiactionGroup",
      c.s("view.UIActionGroup[]", s, "getPSUIActionGroup")
    );
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/panel/sys-panel-container-writer-base.mjs
var SysPanelContainerWriterBase = class extends SysPanelItemWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.v(d, "layout", c.s("control.layout.Layout[]", s, "getPSLayout"));
    _.w(d, "dataName", s);
    _.w(d, "dataRegionType", s, "", "INHERIT");
    _.w(d, "dataSourceType", s);
    _.x(d, "appDELogicId", s, "getPSAppDELogic");
    _.x(d, "appDEMethodId", s, "getPSAppDEMethod");
    _.x(d, "appDataEntityId", s, "getPSAppDataEntity");
    _.v(
      d,
      "navigateContexts",
      c.m("control.NavigateContext[]", s, "getPSNavigateContexts")
    );
    _.v(
      d,
      "navigateParams",
      c.m("control.NavigateParam[]", s, "getPSNavigateParams")
    );
    _.w(d, "reloadTimer", s);
    _.w(d, "scriptCode", s);
    _.w(d, "showBusyIndicator", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/panel/sys-panel-container-writer.mjs
var SysPanelContainerWriter = class extends SysPanelContainerWriterBase {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "actionGroupExtractMode", s, "", "ITEM");
    _.w(d, "captionItemName", s);
    _.v(
      d,
      "panelItems",
      c.m("control.panel.PanelItem[]", s, "getPSPanelItems")
    );
    _.v(
      d,
      "uiactionGroup",
      c.s("view.UIActionGroup[]", s, "getPSUIActionGroup")
    );
    _.w(d, "predefinedType", s);
    _.w(d, "titleBarCloseMode", s, "", 0);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/panel/sys-panel-control-writer.mjs
var SysPanelControlWriter = class extends SysPanelItemWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.v(d, "control", c.s("control.Control[]", s, "getPSControl"));
    _.w(d, "viewFieldName", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/panel/sys-panel-ctrl-pos-writer.mjs
var SysPanelCtrlPosWriter = class extends SysPanelItemWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/panel/sys-panel-field-writer.mjs
var SysPanelFieldWriter = class extends SysPanelItemWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "fieldStates", s, "", 0);
    _.w(d, "outputCodeListConfigMode", s, "", 0);
    _.v(d, "editor", c.s("control.Editor[]", s, "getPSEditor"));
    _.w(d, "resetItemNames", s, "resetItemNames");
    _.w(d, "valueFormat", s);
    _.w(d, "viewFieldName", s);
    _.w(d, "allowEmpty", s, "", true);
    _.w(d, "convertToCodeItemText", s);
    _.w(d, "hidden", s);
    _.w(d, "needCodeListConfig", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/panel/sys-panel-writer.mjs
var SysPanelWriter = class extends ControlContainerWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "dataMode", s, "", 0);
    _.w(d, "dataName", s);
    _.w(d, "dataTimer", s);
    _.v(
      d,
      "getControlAction",
      c.s("control.ControlAction[]", s, "getGetPSControlAction")
    );
    _.w(d, "layoutMode", s);
    _.v(d, "layout", c.s("control.layout.Layout[]", s, "getPSLayout"));
    _.w(d, "panelStyle", s);
    _.w(d, "panelWidth", s, "", 0);
    _.v(
      d,
      "rootPanelItems",
      c.m("control.panel.PanelItem[]", s, "getRootPSPanelItems")
    );
    _.w(d, "layoutPanel", s);
    _.w(d, "mobilePanel", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/panel/sys-panel-raw-item-writer.mjs
var SysPanelRawItemWriter = class extends SysPanelItemWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.v(d, "rawItem", c.s("control.RawItemBase[]", s, "getPSRawItem"));
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/panel/sys-panel-tab-page-writer.mjs
var SysPanelTabPageWriter = class extends SysPanelContainerWriterBase {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "captionItemName", s);
    _.v(
      d,
      "panelItems",
      c.m("control.panel.PanelItem[]", s, "getPSPanelItems")
    );
    _.w(d, "predefinedType", s);
    _.w(d, "titleBarCloseMode", s, "", 0);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/panel/sys-panel-tab-panel-writer.mjs
var SysPanelTabPanelWriter = class extends SysPanelItemWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "dataName", s);
    _.w(d, "dataRegionType", s, "", "INHERIT");
    _.w(d, "dataSourceType", s);
    _.x(d, "appDELogicId", s, "getPSAppDELogic");
    _.x(d, "appDEMethodId", s, "getPSAppDEMethod");
    _.x(d, "appDataEntityId", s, "getPSAppDataEntity");
    _.v(
      d,
      "navigateContexts",
      c.m("control.NavigateContext[]", s, "getPSNavigateContexts")
    );
    _.v(
      d,
      "navigateParams",
      c.m("control.NavigateParam[]", s, "getPSNavigateParams")
    );
    _.v(
      d,
      "panelTabPages",
      c.m("control.panel.PanelTabPage[]", s, "getPSPanelTabPages")
    );
    _.w(d, "reloadTimer", s);
    _.w(d, "scriptCode", s);
    _.w(d, "showBusyIndicator", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/panel/sys-panel-user-control-writer.mjs
var SysPanelUserControlWriter = class extends SysPanelItemWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "ctrlParams", s);
    _.w(d, "predefinedType", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/panel/sys-view-layout-panel-writer.mjs
var SysViewLayoutPanelWriter = class extends SysPanelWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "layoutBodyOnly", s);
    _.w(d, "useDefaultLayout", s);
    _.w(d, "viewProxyMode", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/rawitem/raw-item-writer-base.mjs
var RawItemWriterBase = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "contentType", s);
    _.w(d, "cssStyle", s);
    _.w(d, "dynaClass", s);
    _.v(
      d,
      "controlAttributes",
      c.m("control.ControlAttribute[]", s, "getPSControlAttributes")
    );
    _.v(
      d,
      "controlLogics",
      c.m("control.ControlLogic[]", s, "getPSControlLogics")
    );
    _.v(
      d,
      "controlRenders",
      c.m("control.ControlRender[]", s, "getPSControlRenders")
    );
    _.v(
      d,
      "rawItemParams",
      c.m("control.RawItemParam[]", s, "getPSRawItemParams")
    );
    _.v(d, "sysCss", c.s("res.SysCss[]", s, "getPSSysCss"));
    _.w(d, "predefinedType", s);
    _.w(d, "rawItemHeight", s, "", 0);
    _.w(d, "rawItemWidth", s, "", 0);
    _.w(d, "templateMode", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/rawitem/html-item-writer.mjs
var HtmlItemWriter = class extends RawItemWriterBase {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "content", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/rawitem/image-item-writer.mjs
var ImageItemWriter = class extends RawItemWriterBase {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "alternativeText", s);
    _.w(d, "fitMode", s);
    _.v(d, "sysImage", c.s("res.SysImage[]", s, "getPSSysImage"));
    _.w(d, "placeCenter", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/rawitem/markdown-item-writer.mjs
var MarkdownItemWriter = class extends RawItemWriterBase {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "content", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/rawitem/placeholder-item-writer.mjs
var PlaceholderItemWriter = class extends RawItemWriterBase {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "caption", s);
    _.w(d, "content", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/rawitem/text-item-writer.mjs
var TextItemWriter = class extends RawItemWriterBase {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "caption", s);
    _.w(d, "halign", s, "hAlign", "LEFT");
    _.w(d, "renderMode", s);
    _.w(d, "valign", s, "vAlign", "MIDDLE");
    _.w(d, "wrapMode", s, "", "NOWRAP");
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/rawitem/video-item-writer.mjs
var VideoItemWriter = class extends RawItemWriterBase {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/reportpanel/dereport-panel-writer.mjs
var DEReportPanelWriter = class extends ControlWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.v(
      d,
      "appDEReport",
      c.s("app.dataentity.AppDEReport[]", s, "getPSAppDEReport")
    );
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/searchbar/sys-search-bar-item-writer-base.mjs
var SysSearchBarItemWriterBase = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.v(
      d,
      "capLanguageRes",
      c.s("res.LanguageRes[]", s, "getCapPSLanguageRes")
    );
    _.w(d, "caption", s);
    _.w(d, "cssStyle", s);
    _.w(d, "data", s);
    _.w(d, "dynaClass", s);
    _.w(d, "itemType", s);
    _.w(d, "labelCssStyle", s);
    _.w(d, "labelDynaClass", s);
    _.v(d, "labelSysCss", c.s("res.SysCss[]", s, "getLabelPSSysCss"));
    _.x(d, "appDEFieldId", s, "getPSAppDEField");
    _.v(
      d,
      "controlAttributes",
      c.m("control.ControlAttribute[]", s, "getPSControlAttributes")
    );
    _.v(
      d,
      "controlLogics",
      c.m("control.ControlLogic[]", s, "getPSControlLogics")
    );
    _.v(
      d,
      "controlRenders",
      c.m("control.ControlRender[]", s, "getPSControlRenders")
    );
    _.v(d, "sysCss", c.s("res.SysCss[]", s, "getPSSysCss"));
    _.v(d, "sysImage", c.s("res.SysImage[]", s, "getPSSysImage"));
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/searchbar/sys-search-bar-filter-writer.mjs
var SysSearchBarFilterWriter = class extends SysSearchBarItemWriterBase {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "createDV", s);
    _.w(d, "createDVT", s);
    _.w(d, "dataType", s);
    _.w(d, "itemHeight", s, "", 0);
    _.w(d, "itemWidth", s, "", 0);
    _.w(d, "labelPos", s);
    _.w(d, "labelWidth", s);
    _.w(d, "outputCodeListConfigMode", s, "", 0);
    _.v(d, "phlanguageRes", c.s("res.LanguageRes[]", s, "getPHPSLanguageRes"));
    _.v(
      d,
      "defsearchMode",
      c.s("dataentity.defield.DEFSearchMode[]", s, "getPSDEFSearchMode")
    );
    _.v(d, "editor", c.s("control.Editor[]", s, "getPSEditor"));
    _.w(d, "resetItemNames", s, "resetItemNames");
    _.w(d, "unitName", s);
    _.w(d, "unitNameWidth", s, "", 0);
    _.w(d, "width", s, "", 0);
    _.w(d, "addSeparator", s);
    _.w(d, "allowEmpty", s);
    _.w(d, "convertToCodeItemText", s);
    _.w(d, "emptyCaption", s);
    _.w(d, "enableItemPriv", s);
    _.w(d, "enableUnitName", s);
    _.w(d, "hidden", s);
    _.w(d, "needCodeListConfig", s);
    _.w(d, "showCaption", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/searchbar/sys-search-bar-group-writer.mjs
var SysSearchBarGroupWriter = class extends SysSearchBarItemWriterBase {
  onFillDSL(c, s, d) {
    const _ = this;
    _.v(
      d,
      "filterDEDQConditions",
      c.m("dataentity.ds.DEDQCondition[]", s, "getFilterPSDEDQConditions")
    );
    _.w(d, "tooltip", s);
    _.v(
      d,
      "tooltipLanguageRes",
      c.s("res.LanguageRes[]", s, "getTooltipPSLanguageRes")
    );
    _.w(d, "width", s);
    _.w(d, "addSeparator", s);
    _.w(d, "defaultGroup", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/searchbar/sys-search-bar-writer.mjs
var SysSearchBarWriter = class extends ControlContainerWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "groupMode", s, "", "SINGLE");
    _.w(d, "groupMoreText", s);
    _.x(d, "appCounterRefId", s, "getPSAppCounterRef");
    _.v(
      d,
      "searchBarFilters",
      c.m("control.searchbar.SearchBarFilter[]", s, "getPSSearchBarFilters")
    );
    _.v(
      d,
      "searchBarGroups",
      c.m("control.searchbar.SearchBarGroup[]", s, "getPSSearchBarGroups")
    );
    _.v(
      d,
      "searchBarQuickSearchs",
      c.m(
        "control.searchbar.SearchBarQuickSearch[]",
        s,
        "getPSSearchBarQuickSearchs"
      )
    );
    _.w(d, "quickGroupCount", s);
    _.w(d, "quickSearchMode", s);
    _.w(d, "quickSearchWidth", s);
    _.w(d, "searchBarStyle", s);
    _.w(d, "enableFilter", s);
    _.w(d, "enableGroup", s);
    _.w(d, "enableQuickSearch", s);
    _.w(d, "mobileSearchBar", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/searchbar/sys-search-bar-quick-search-writer.mjs
var SysSearchBarQuickSearchWriter = class extends SysSearchBarItemWriterBase {
  onFillDSL(c, s, d) {
    const _ = this;
    _.v(
      d,
      "defsearchMode",
      c.s("dataentity.defield.DEFSearchMode[]", s, "getPSDEFSearchMode")
    );
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/toolbar/detoolbar-writer.mjs
var DEToolbarWriter = class extends ControlWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.v(
      d,
      "detoolbarItems",
      c.m("control.toolbar.DEToolbarItem[]", s, "getPSDEToolbarItems")
    );
    _.w(d, "toolbarStyle", s);
    _.w(d, "xdataControlName", s, "xDataControlName");
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/toolbar/decontext-menu-writer.mjs
var DEContextMenuWriter = class extends DEToolbarWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/toolbar/detoolbar-item-writer.mjs
var DEToolbarItemWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.v(
      d,
      "capLanguageRes",
      c.s("res.LanguageRes[]", s, "getCapPSLanguageRes")
    );
    _.w(d, "caption", s);
    _.w(d, "counterId", s);
    _.w(d, "counterMode", s, "", 0);
    _.w(d, "cssStyle", s);
    _.w(d, "data", s);
    _.w(d, "dynaClass", s);
    _.w(d, "height", s, "", 0);
    _.w(d, "itemType", s);
    _.v(
      d,
      "controlAttributes",
      c.m("control.ControlAttribute[]", s, "getPSControlAttributes")
    );
    _.v(
      d,
      "controlLogics",
      c.m("control.ControlLogic[]", s, "getPSControlLogics")
    );
    _.v(
      d,
      "controlRenders",
      c.m("control.ControlRender[]", s, "getPSControlRenders")
    );
    _.v(d, "sysCss", c.s("res.SysCss[]", s, "getPSSysCss"));
    _.v(d, "sysImage", c.s("res.SysImage[]", s, "getPSSysImage"));
    _.x(d, "sysPFPluginId", s, "getPSSysPFPlugin");
    _.w(d, "tooltip", s);
    _.v(
      d,
      "tooltipLanguageRes",
      c.s("res.LanguageRes[]", s, "getTooltipPSLanguageRes")
    );
    _.w(d, "userTag", s);
    _.w(d, "userTag2", s);
    _.w(d, "width", s, "", 0);
    _.w(d, "showCaption", s);
    _.w(d, "showIcon", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/toolbar/detbgroup-item-writer.mjs
var DETBGroupItemWriter = class extends DEToolbarItemWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "actionLevel", s, "", 100);
    _.w(d, "borderStyle", s);
    _.w(d, "buttonStyle", s);
    _.w(d, "groupExtractMode", s);
    _.v(
      d,
      "detoolbarItems",
      c.m("control.toolbar.DEToolbarItem[]", s, "getPSDEToolbarItems")
    );
    _.v(
      d,
      "uiactionGroup",
      c.s("view.UIActionGroup[]", s, "getPSUIActionGroup")
    );
    _.w(d, "valid", s, "", true);
    _.v(
      d,
      "decontextMenuItems",
      c.m("control.toolbar.DEContextMenuItem[]", s, "getPSDEContextMenuItems")
    );
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/toolbar/detbraw-item-writer.mjs
var DETBRawItemWriter = class extends DEToolbarItemWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.v(d, "rawItem", c.s("control.RawItemBase[]", s, "getPSRawItem"));
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/toolbar/detbseperator-item-writer.mjs
var DETBSeperatorItemWriter = class extends DEToolbarItemWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "spanMode", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/toolbar/detbuiaction-item-writer.mjs
var DETBUIActionItemWriter = class extends DEToolbarItemWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "actionLevel", s, "", 100);
    _.w(d, "borderStyle", s);
    _.w(d, "buttonStyle", s);
    _.w(d, "noPrivDisplayMode", s);
    _.v(
      d,
      "detoolbarItems",
      c.m("control.toolbar.DEToolbarItem[]", s, "getPSDEToolbarItems")
    );
    _.x(d, "uiactionId", s, "getPSUIAction");
    _.w(d, "uiactionTarget", s, "uIActionTarget");
    _.w(d, "enableToggleMode", s);
    _.w(d, "hiddenItem", s);
    _.w(d, "valid", s, "", true);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/tree/hidden-detree-node-edit-item-writer.mjs
var HiddenDETreeNodeEditItemWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "createDV", s);
    _.w(d, "createDVT", s);
    _.w(d, "enableCond", s);
    _.w(d, "ignoreInput", s);
    _.w(d, "outputCodeListConfigMode", s, "", 0);
    _.x(d, "appDEFieldId", s, "getPSAppDEField");
    _.v(d, "editor", c.s("control.Editor[]", s, "getPSEditor"));
    _.w(d, "resetItemNames", s, "resetItemNames");
    _.w(d, "unitName", s);
    _.w(d, "unitNameWidth", s, "", 0);
    _.w(d, "updateDV", s);
    _.w(d, "updateDVT", s);
    _.w(d, "allowEmpty", s);
    _.w(d, "convertToCodeItemText", s);
    _.w(d, "enableUnitName", s);
    _.w(d, "needCodeListConfig", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/tree/detree-writer.mjs
var DETreeWriter = class extends MDAjaxControlContainerWriter2 {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "emptyText", s);
    _.v(
      d,
      "emptyTextLanguageRes",
      c.s("res.LanguageRes[]", s, "getEmptyTextPSLanguageRes")
    );
    _.w(d, "frozenFirstColumn", s, "", 0);
    _.w(d, "frozenLastColumn", s, "", 0);
    _.x(d, "appCounterRefId", s, "getPSAppCounterRef");
    _.v(
      d,
      "detreeColumns",
      c.m("control.tree.DETreeColumn[]", s, "getPSDETreeColumns")
    );
    _.v(
      d,
      "detreeNodeRSs",
      c.m("control.tree.DETreeNodeRS[]", s, "getPSDETreeNodeRSs")
    );
    _.v(
      d,
      "detreeNodes",
      c.m("control.tree.DETreeNode[]", s, "getPSDETreeNodes")
    );
    _.w(d, "treeGridMode", s);
    _.w(d, "treeStyle", s);
    _.w(d, "enableEdit", s);
    _.w(d, "enableRootSelect", s);
    _.w(d, "outputIconDefault", s);
    _.w(d, "rootVisible", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/tree/detree-grid-ex-writer.mjs
var DETreeGridExWriter = class extends DETreeWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/tree/degantt-writer.mjs
var DEGanttWriter = class extends DETreeGridExWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "beginDataItemName", s);
    _.w(d, "endDataItemName", s);
    _.w(d, "finishDataItemName", s);
    _.w(d, "prevDataItemName", s);
    _.w(d, "sndataItemName", s, "sNDataItemName");
    _.w(d, "totalDataItemName", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/control-item-writer.mjs
var ControlItemWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.v(
      d,
      "controlAttributes",
      c.m("control.ControlAttribute[]", s, "getPSControlAttributes")
    );
    _.v(
      d,
      "controlLogics",
      c.m("control.ControlLogic[]", s, "getPSControlLogics")
    );
    _.v(
      d,
      "controlRenders",
      c.m("control.ControlRender[]", s, "getPSControlRenders")
    );
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/tree/detree-node-writer-base.mjs
var DETreeNodeWriterBase = class extends ControlItemWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "accUserMode", s, "", 0);
    _.w(d, "accessKey", s);
    _.w(d, "counterId", s);
    _.w(d, "counterMode", s);
    _.w(d, "dynaClass", s);
    _.w(d, "modelObj", s);
    _.v(
      d,
      "nameLanguageRes",
      c.s("res.LanguageRes[]", s, "getNamePSLanguageRes")
    );
    _.w(d, "navFilter", s);
    _.x(d, "navAppViewId", s, "getNavPSAppView");
    _.v(d, "navDER", c.s("dataentity.der.DERBase[]", s, "getNavPSDER"));
    _.w(d, "navViewParamJO", s);
    _.w(d, "nodeType", s);
    _.x(d, "appDataEntityId", s, "getPSAppDataEntity");
    _.v(
      d,
      "decontextMenu",
      c.s("control.toolbar.DEContextMenu[]", s, "getPSDEContextMenu")
    );
    _.v(
      d,
      "detreeNodeColumns",
      c.m("control.tree.DETreeNodeColumn[]", s, "getPSDETreeNodeColumns")
    );
    _.v(
      d,
      "detreeNodeDataItems",
      c.m("control.tree.DETreeNodeDataItem[]", s, "getPSDETreeNodeDataItems")
    );
    _.v(
      d,
      "detreeNodeEditItems",
      c.m("control.tree.DETreeNodeEditItem[]", s, "getPSDETreeNodeEditItems")
    );
    _.v(
      d,
      "detreeNodeRVs",
      c.m("control.tree.DETreeNodeRV[]", s, "getPSDETreeNodeRVs")
    );
    _.v(
      d,
      "navigateContexts",
      c.m("control.NavigateContext[]", s, "getPSNavigateContexts")
    );
    _.v(
      d,
      "navigateParams",
      c.m("control.NavigateParam[]", s, "getPSNavigateParams")
    );
    _.v(d, "sysCss", c.s("res.SysCss[]", s, "getPSSysCss"));
    _.v(d, "sysImage", c.s("res.SysImage[]", s, "getPSSysImage"));
    _.x(d, "sysPFPluginId", s, "getPSSysPFPlugin");
    _.w(d, "shapeDynaClass", s);
    _.v(d, "shapeSysCss", c.s("res.SysCss[]", s, "getShapePSSysCss"));
    _.w(d, "treeNodeType", s);
    _.w(d, "hasDETreeNodeRSs", s, "hasPSDETreeNodeRSs");
    _.w(d, "allowDrag", s);
    _.w(d, "allowDrop", s);
    _.w(d, "allowEditText", s);
    _.w(d, "allowOrder", s);
    _.w(d, "appendPNodeId", s);
    _.w(d, "disableSelect", s);
    _.w(d, "enableCheck", s);
    _.w(d, "enableEditData", s);
    _.w(d, "enableNewData", s);
    _.w(d, "enableQuickCreate", s);
    _.w(d, "enableQuickSearch", s);
    _.w(d, "enableRemoveData", s);
    _.w(d, "enableRowEdit", s);
    _.w(d, "enableRowEditChangedOnly", s);
    _.w(d, "enableViewData", s);
    _.w(d, "expandFirstOnly", s);
    _.w(d, "expanded", s);
    _.w(d, "rootNode", s);
    _.w(d, "selectFirstOnly", s);
    _.w(d, "selected", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/tree/detree-code-list-node-writer.mjs
var DETreeCodeListNodeWriter = class extends DETreeNodeWriterBase {
  onFillDSL(c, s, d) {
    const _ = this;
    _.x(d, "codeListId", s, "getPSCodeList");
    _.w(d, "appendCaption", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/tree/detree-column-writer.mjs
var DETreeColumnWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "align", s);
    _.v(
      d,
      "capLanguageRes",
      c.s("res.LanguageRes[]", s, "getCapPSLanguageRes")
    );
    _.w(d, "caption", s);
    _.v(d, "cellSysCss", c.s("res.SysCss[]", s, "getCellPSSysCss"));
    _.w(d, "codeName", s);
    _.w(d, "columnStyle", s);
    _.w(d, "columnType", s);
    _.v(d, "headerSysCss", c.s("res.SysCss[]", s, "getHeaderPSSysCss"));
    _.w(d, "hideMode", s, "", 0);
    _.v(
      d,
      "controlAttributes",
      c.m("control.ControlAttribute[]", s, "getPSControlAttributes")
    );
    _.v(
      d,
      "controlLogics",
      c.m("control.ControlLogic[]", s, "getPSControlLogics")
    );
    _.v(
      d,
      "controlRenders",
      c.m("control.ControlRender[]", s, "getPSControlRenders")
    );
    _.v(d, "sysImage", c.s("res.SysImage[]", s, "getPSSysImage"));
    _.x(d, "renderSysPFPluginId", s, "getRenderPSSysPFPlugin");
    _.w(d, "width", s);
    _.w(d, "widthUnit", s);
    _.w(d, "enableExpand", s);
    _.w(d, "enableSort", s);
    _.w(d, "hideDefault", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/tree/detree-data-set-node-writer.mjs
var DETreeDataSetNodeWriter = class extends DETreeNodeWriterBase {
  onFillDSL(c, s, d) {
    const _ = this;
    _.x(d, "childCntAppDEFieldId", s, "getChildCntPSAppDEField");
    _.x(d, "clsAppDEFieldId", s, "getClsPSAppDEField");
    _.w(d, "customCond", s);
    _.x(d, "data2AppDEFieldId", s, "getData2PSAppDEField");
    _.w(d, "dataName", s);
    _.x(d, "dataAppDEFieldId", s, "getDataPSAppDEField");
    _.w(d, "dataSourceType", s);
    _.x(d, "filterAppDEDataSetId", s, "getFilterPSAppDEDataSet");
    _.x(d, "iconAppDEFieldId", s, "getIconPSAppDEField");
    _.x(d, "idAppDEFieldId", s, "getIdPSAppDEField");
    _.x(d, "leafFlagAppDEFieldId", s, "getLeafFlagPSAppDEField");
    _.x(d, "linkAppDEFieldId", s, "getLinkPSAppDEField");
    _.w(d, "maxSize", s);
    _.w(d, "moveDataAccessAction", s);
    _.x(d, "moveAppDEActionId", s, "getMovePSAppDEAction");
    _.x(d, "moveDEOPPrivId", s, "getMovePSDEOPPriv");
    _.x(d, "appDEActionId", s, "getPSAppDEAction");
    _.x(d, "appDEDataSetId", s, "getPSAppDEDataSet");
    _.x(d, "appDELogicId", s, "getPSAppDELogic");
    _.w(d, "pagingSize", s);
    _.w(d, "removeDataAccessAction", s);
    _.x(d, "removeAppDEActionId", s, "getRemovePSAppDEAction");
    _.x(d, "removeDEOPPrivId", s, "getRemovePSDEOPPriv");
    _.w(d, "scriptCode", s);
    _.x(d, "shapeClsAppDEFieldId", s, "getShapeClsPSAppDEField");
    _.w(d, "sortDir", s);
    _.x(d, "sortAppDEFieldId", s, "getSortPSAppDEField");
    _.w(d, "textFormat", s);
    _.x(d, "textAppDEFieldId", s, "getTextPSAppDEField");
    _.x(d, "tipsAppDEFieldId", s, "getTipsPSAppDEField");
    _.w(d, "updateDataAccessAction", s);
    _.x(d, "updateAppDEActionId", s, "getUpdatePSAppDEAction");
    _.x(d, "updateDEOPPrivId", s, "getUpdatePSDEOPPriv");
    _.w(d, "appendCaption", s);
    _.w(d, "distinctMode", s);
    _.w(d, "enablePaging", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/tree/detree-node-data-item-writer.mjs
var DETreeNodeDataItemWriter = class extends DataItemWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "clconvertMode", s, "cLConvertMode");
    _.w(d, "defaultValue", s);
    _.x(d, "frontCodeListId", s, "getFrontPSCodeList");
    _.x(d, "appDEFieldId", s, "getPSAppDEField");
    _.x(d, "detreeColumnId", s, "getPSDETreeColumn");
    _.w(d, "scriptCode", s);
    _.w(d, "valueType", s, "", "SIMPLE");
    _.w(d, "customCode", s);
    _.w(d, "enableItemPriv", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/tree/detree-node-column-writer.mjs
var DETreeNodeColumnWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.v(d, "cellSysCss", c.s("res.SysCss[]", s, "getCellPSSysCss"));
    _.w(d, "codeName", s);
    _.w(d, "columnStyle", s);
    _.w(d, "columnType", s);
    _.w(d, "noPrivDisplayMode", s, "", 1);
    _.v(
      d,
      "controlAttributes",
      c.m("control.ControlAttribute[]", s, "getPSControlAttributes")
    );
    _.v(
      d,
      "controlLogics",
      c.m("control.ControlLogic[]", s, "getPSControlLogics")
    );
    _.v(
      d,
      "controlRenders",
      c.m("control.ControlRender[]", s, "getPSControlRenders")
    );
    _.x(d, "detreeColumnId", s, "getPSDETreeColumn");
    _.x(d, "sysPFPluginId", s, "getPSSysPFPlugin");
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/tree/detree-node-field-column-writer.mjs
var DETreeNodeFieldColumnWriter = class extends DETreeNodeColumnWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "clconvertMode", s, "cLConvertMode");
    _.w(d, "dataItemName", s);
    _.x(d, "linkAppViewId", s, "getLinkPSAppView");
    _.w(d, "linkValueItem", s);
    _.w(d, "objectIdField", s);
    _.w(d, "objectNameField", s);
    _.w(d, "objectValueField", s);
    _.x(d, "appCodeListId", s, "getPSAppCodeList");
    _.x(d, "appDEFieldId", s, "getPSAppDEField");
    _.x(d, "deuiactionId", s, "getPSDEUIAction");
    _.v(
      d,
      "deuiactionGroup",
      c.s("dataentity.uiaction.DEUIActionGroup[]", s, "getPSDEUIActionGroup")
    );
    _.w(d, "textSeparator", s);
    _.w(d, "unitName", s);
    _.w(d, "unitNameWidth", s, "", 0);
    _.w(d, "valueFormat", s);
    _.w(d, "valueSeparator", s);
    _.w(d, "valueType", s, "", "SIMPLE");
    _.w(d, "enableItemPriv", s);
    _.w(d, "enableLinkView", s);
    _.w(d, "enableRowEdit", s);
    _.w(d, "enableUnitName", s);
    _.w(d, "createDV", s);
    _.w(d, "createDVT", s);
    _.w(d, "enableCond", s);
    _.w(d, "ignoreInput", s);
    _.w(d, "outputCodeListConfigMode", s, "", 0);
    _.v(d, "editor", c.s("control.Editor[]", s, "getPSEditor"));
    _.w(d, "resetItemNames", s, "resetItemNames");
    _.w(d, "updateDV", s);
    _.w(d, "updateDVT", s);
    _.w(d, "allowEmpty", s);
    _.w(d, "convertToCodeItemText", s);
    _.w(d, "needCodeListConfig", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/tree/detree-node-rswriter.mjs
var DETreeNodeRSWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.x(d, "childDETreeNodeId", s, "getChildPSDETreeNode");
    _.v(
      d,
      "detreeNodeRSParams",
      c.m("control.tree.DETreeNodeRSParam[]", s, "getPSDETreeNodeRSParams")
    );
    _.v(
      d,
      "navigateContexts",
      c.m("control.NavigateContext[]", s, "getPSNavigateContexts")
    );
    _.v(
      d,
      "navigateParams",
      c.m("control.NavigateParam[]", s, "getPSNavigateParams")
    );
    _.w(d, "parentFilter", s);
    _.x(d, "parentAppDEFieldId", s, "getParentPSAppDEField");
    _.v(d, "parentDER1N", c.s("dataentity.der.DER1N[]", s, "getParentPSDER1N"));
    _.x(d, "parentDETreeNodeId", s, "getParentPSDETreeNode");
    _.w(d, "parentValueLevel", s);
    _.w(d, "searchMode", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/tree/detree-node-rsparam-writer.mjs
var DETreeNodeRSParamWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "desc", s);
    _.w(d, "key", s);
    _.w(d, "value", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/tree/detree-node-rvwriter.mjs
var DETreeNodeRVWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.v(
      d,
      "navigateContexts",
      c.m("control.NavigateContext[]", s, "getPSNavigateContexts")
    );
    _.v(
      d,
      "navigateParams",
      c.m("control.NavigateParam[]", s, "getPSNavigateParams")
    );
    _.x(d, "refAppViewId", s, "getRefPSAppView");
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/tree/detree-node-uacolumn-writer.mjs
var DETreeNodeUAColumnWriter = class extends DETreeNodeColumnWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.v(
      d,
      "deuiactionGroup",
      c.s("dataentity.uiaction.DEUIActionGroup[]", s, "getPSDEUIActionGroup")
    );
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/tree/detree-static-node-writer.mjs
var DETreeStaticNodeWriter = class extends DETreeNodeWriterBase {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "nodeValue", s);
    _.w(d, "text", s);
    _.w(d, "tooltip", s);
    _.v(
      d,
      "tooltipLanguageRes",
      c.s("res.LanguageRes[]", s, "getTooltipPSLanguageRes")
    );
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/viewpanel/deview-panel-writer.mjs
var DEViewPanelWriter = class extends ControlWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.v(
      d,
      "capLanguageRes",
      c.s("res.LanguageRes[]", s, "getCapPSLanguageRes")
    );
    _.w(d, "caption", s);
    _.x(d, "embeddedAppDEViewId", s, "getEmbeddedPSAppDEView");
    _.v(
      d,
      "navigateContexts",
      c.m("control.NavigateContext[]", s, "getPSNavigateContexts")
    );
    _.v(
      d,
      "navigateParams",
      c.m("control.NavigateParam[]", s, "getPSNavigateParams")
    );
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/viewpanel/depickup-view-panel-writer.mjs
var DEPickupViewPanelWriter = class extends DEViewPanelWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/viewpanel/detab-view-panel-writer.mjs
var DETabViewPanelWriter = class extends DEViewPanelWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "counterId", s);
    _.w(d, "navFilter", s);
    _.v(d, "navDER", c.s("dataentity.der.DERBase[]", s, "getNavPSDER"));
    _.x(d, "appCounterRefId", s, "getPSAppCounterRef");
    _.x(d, "deopprivId", s, "getPSDEOPPriv");
    _.v(d, "sysImage", c.s("res.SysImage[]", s, "getPSSysImage"));
    _.w(d, "parentDataJO", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/wizardpanel/dewizard-panel-writer.mjs
var DEWizardPanelWriter = class extends AjaxControlContainerWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.v(
      d,
      "finishControlAction",
      c.s("control.ControlAction[]", s, "getFinishPSControlAction")
    );
    _.v(
      d,
      "initControlAction",
      c.s("control.ControlAction[]", s, "getInitPSControlAction")
    );
    _.v(
      d,
      "deeditForms",
      c.m("control.form.DEEditForm[]", s, "getPSDEEditForms")
    );
    _.v(d, "dewizard", c.s("dataentity.wizard.DEWizard[]", s, "getPSDEWizard"));
    _.x(d, "stateAppDEFieldId", s, "getStatePSAppDEField");
    _.w(d, "wizardStyle", s);
    _.w(d, "showActionBar", s);
    _.w(d, "showStepBar", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/control/wizardpanel/destate-wizard-panel-writer.mjs
var DEStateWizardPanelWriter = class extends DEWizardPanelWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/defield/defsearch-mode-writer.mjs
var DEFSearchModeWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "codeName", s);
    _.w(d, "itemTag", s);
    _.w(d, "itemTag2", s);
    _.w(d, "mode", s);
    _.w(d, "stdDataType", s);
    _.w(d, "valueFormat", s);
    _.w(d, "valueFunc", s);
    _.w(d, "valueOP", s);
    _.w(d, "valueSeparator", s);
    _.w(d, "default", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/defield/valuerule/defvrcondition-writer.mjs
var DEFVRConditionWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "condTag", s);
    _.w(d, "condTag2", s);
    _.w(d, "condType", s);
    _.w(d, "ruleInfo", s);
    _.w(d, "ruleInfoLanResTag", s);
    _.v(
      d,
      "ruleInfoLanguageRes",
      c.s("res.LanguageRes[]", s, "getRuleInfoPSLanguageRes")
    );
    _.w(d, "keyCond", s);
    _.w(d, "notMode", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/defield/valuerule/defvrgroup-condition-writer.mjs
var DEFVRGroupConditionWriter = class extends DEFVRConditionWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "condOp", s);
    _.v(
      d,
      "conds",
      c.m(
        "dataentity.defield.valuerule.DEFVRCondition[]",
        s,
        "getPSDEFVRConditions"
      )
    );
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/defield/valuerule/defvrsingle-condition-writer.mjs
var DEFVRSingleConditionWriter = class extends DEFVRConditionWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "defname", s, "dEFName");
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/defield/valuerule/defvrquery-count-condition-writer.mjs
var DEFVRQueryCountConditionWriter = class extends DEFVRSingleConditionWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "maxValue", s);
    _.w(d, "minValue", s);
    _.w(d, "alwaysCheck", s);
    _.w(d, "includeMaxValue", s);
    _.w(d, "includeMinValue", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/defield/valuerule/defvrreg-ex-condition-writer.mjs
var DEFVRRegExConditionWriter = class extends DEFVRSingleConditionWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "regExCode", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/defield/valuerule/defvrsimple-condition-writer.mjs
var DEFVRSimpleConditionWriter = class extends DEFVRSingleConditionWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "condOp", s);
    _.w(d, "paramType", s);
    _.w(d, "paramValue", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/defield/valuerule/defvrstring-length-condition-writer.mjs
var DEFVRStringLengthConditionWriter = class extends DEFVRSingleConditionWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "maxValue", s);
    _.w(d, "minValue", s);
    _.w(d, "includeMaxValue", s);
    _.w(d, "includeMinValue", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/defield/valuerule/defvrsys-value-rule-condition-writer.mjs
var DEFVRSysValueRuleConditionWriter = class extends DEFVRSingleConditionWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.v(
      d,
      "sysValueRule",
      c.s("valuerule.SysValueRule[]", s, "getPSSysValueRule")
    );
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/defield/valuerule/defvrvalue-range2-condition-writer.mjs
var DEFVRValueRange2ConditionWriter = class extends DEFVRSingleConditionWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "maxValue", s);
    _.w(d, "minValue", s);
    _.w(d, "includeMaxValue", s);
    _.w(d, "includeMinValue", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/defield/valuerule/defvrvalue-range3-condition-writer.mjs
var DEFVRValueRange3ConditionWriter = class extends DEFVRSingleConditionWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "separator", s);
    _.w(d, "valueRanges", s, "valueRanges");
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/defield/valuerule/defvrvalue-range-condition-writer.mjs
var DEFVRValueRangeConditionWriter = class extends DEFVRSingleConditionWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "alwaysCheck", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/defield/valuerule/defvrvalue-recursion-condition-writer.mjs
var DEFVRValueRecursionConditionWriter = class extends DEFVRSingleConditionWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/defield/valuerule/defvalue-rule-writer.mjs
var DEFValueRuleWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "codeName", s);
    _.v(
      d,
      "groupCond",
      c.s(
        "dataentity.defield.valuerule.DEFVRGroupCondition[]",
        s,
        "getPSDEFVRGroupCondition"
      )
    );
    _.x(d, "sysPFPluginId", s, "getPSSysPFPlugin");
    _.w(d, "ruleInfo", s);
    _.w(d, "ruleInfoLanResTag", s);
    _.v(
      d,
      "ruleInfoLanguageRes",
      c.s("res.LanguageRes[]", s, "getRuleInfoPSLanguageRes")
    );
    _.w(d, "ruleTag", s);
    _.w(d, "ruleTag2", s);
    _.w(d, "scriptCode", s);
    _.w(d, "checkDefault", s);
    _.w(d, "customCode", s);
    _.w(d, "defaultMode", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/ac/deacmode-data-item-writer.mjs
var DEACModeDataItemWriter = class extends DataItemWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "format", s);
    _.x(d, "appDEFieldId", s, "getPSAppDEField");
    _.w(d, "scriptCode", s);
    _.w(d, "customCode", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/ac/deacmode-writer.mjs
var DEACModeWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "actype", s, "aCType", "AUTOCOMPLETE");
    _.w(d, "codeName", s);
    _.w(d, "emptyText", s);
    _.v(
      d,
      "emptyTextLanguageRes",
      c.s("res.LanguageRes[]", s, "getEmptyTextPSLanguageRes")
    );
    _.x(d, "itemSysPFPluginId", s, "getItemPSSysPFPlugin");
    _.w(d, "logicName", s);
    _.w(d, "minorSortDir", s);
    _.v(
      d,
      "deacmodeDataItems",
      c.m("dataentity.ac.DEACModeDataItem[]", s, "getPSDEACModeDataItems")
    );
    _.v(
      d,
      "deuiactionGroup",
      c.s("dataentity.uiaction.DEUIActionGroup[]", s, "getPSDEUIActionGroup")
    );
    _.w(d, "pagingMode", s, "", 0);
    _.w(d, "pagingSize", s);
    _.w(d, "defaultMode", s);
    _.w(d, "enablePagingBar", s);
    _.v(
      d,
      "itemLayoutPanel",
      c.s("control.panel.LayoutPanel[]", s, "getItemPSLayoutPanel")
    );
    _.x(d, "linkAppViewId", s, "getLinkPSAppView");
    _.x(d, "minorSortAppDEFieldId", s, "getMinorSortPSAppDEField");
    _.x(d, "pickupAppViewId", s, "getPickupPSAppView");
    _.x(d, "textAppDEFieldId", s, "getTextPSAppDEField");
    _.x(d, "valueAppDEFieldId", s, "getValuePSAppDEField");
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/action/deaction-logic-writer.mjs
var DEActionLogicWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "actionLogicType", s);
    _.w(d, "attachMode", s);
    _.w(d, "dataSyncEvent", s, "", 0);
    _.w(d, "scriptCode", s);
    _.w(d, "cloneParam", s);
    _.w(d, "ignoreException", s);
    _.w(d, "internalLogic", s);
    _.w(d, "valid", s, "", true);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/der/derbase-writer.mjs
var DERBaseWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "codeName", s);
    _.w(d, "dertag", s, "dERTag");
    _.w(d, "dertag2", s, "dERTag2");
    _.w(d, "dertype", s, "dERType");
    _.w(d, "logicName", s);
    _.w(d, "minorCodeName", s);
    _.w(d, "minorLogicName", s);
    _.w(d, "minorServiceCodeName", s);
    _.w(d, "orderValue", s);
    _.w(d, "serviceCodeName", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/der/der1-nwriter.mjs
var DER1NWriter = class extends DERBaseWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "cloneOrder", s);
    _.w(d, "customExportOrder", s);
    _.w(d, "customExportOrder2", s);
    _.w(d, "exportMajorModel", s);
    _.w(d, "masterOrder", s);
    _.w(d, "masterRS", s);
    _.w(d, "pickupDEFName", s);
    _.w(d, "rrmlanResTag", s, "rRMLanResTag");
    _.v(
      d,
      "rrmlanguageRes",
      c.s("res.LanguageRes[]", s, "getRRMPSLanguageRes")
    );
    _.w(d, "removeActionType", s);
    _.w(d, "removeOrder", s);
    _.w(d, "removeRejectMsg", s);
    _.w(d, "cloneRS", s);
    _.w(d, "enableDEFieldWriteBack", s);
    _.w(d, "enableExtRestrict", s);
    _.w(d, "enablePDEREQ", s);
    _.w(d, "enablePhysicalDEFieldUpdate", s);
    _.w(d, "nestedRS", s);
    _.w(d, "recursiveRS", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/der/der11-writer.mjs
var DER11Writer = class extends DER1NWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/ds/dedqcondition-writer.mjs
var DEDQConditionWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "condTag", s);
    _.w(d, "condTag2", s);
    _.w(d, "condType", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/ds/dedqcustom-condition-writer.mjs
var DEDQCustomConditionWriter = class extends DEDQConditionWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "condition", s);
    _.w(d, "customType", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/ds/dedqfield-condition-writer.mjs
var DEDQFieldConditionWriter = class extends DEDQConditionWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "condOp", s);
    _.w(d, "condValue", s);
    _.w(d, "fieldName", s);
    _.w(d, "vartypeId", s, "getPSVARTypeId");
    _.w(d, "valueFunc", s);
    _.w(d, "valueFuncTag", s);
    _.w(d, "valueFuncTag2", s);
    _.w(d, "ignoreEmpty", s);
    _.w(d, "ignoreOthers", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/ds/dedqgroup-condition-writer.mjs
var DEDQGroupConditionWriter = class extends DEDQConditionWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "condOp", s);
    _.v(
      d,
      "dedqconditions",
      c.m("dataentity.ds.DEDQCondition[]", s, "getPSDEDQConditions")
    );
    _.w(d, "notMode", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/dataexport/dedata-export-writer.mjs
var DEDataExportWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "codeName", s);
    _.w(d, "expTag", s);
    _.w(d, "expTag2", s);
    _.w(d, "maxRowCount", s);
    _.v(
      d,
      "dedataExportItems",
      c.m(
        "dataentity.dataexport.DEDataExportItem[]",
        s,
        "getPSDEDataExportItems"
      )
    );
    _.x(d, "sysPFPluginId", s, "getPSSysPFPlugin");
    _.w(d, "defaultMode", s);
    _.w(d, "enableCustomized", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/dataexport/dedata-export-item-writer.mjs
var DEDataExportItemWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "align", s);
    _.v(
      d,
      "capLanguageRes",
      c.s("res.LanguageRes[]", s, "getCapPSLanguageRes")
    );
    _.w(d, "caption", s);
    _.w(d, "defaultValue", s);
    _.w(d, "format", s);
    _.x(d, "appDEFieldId", s, "getPSAppDEField");
    _.x(d, "codeListId", s, "getPSCodeList");
    _.w(d, "privilegeId", s);
    _.w(d, "hidden", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/dataimport/dedata-import-writer.mjs
var DEDataImportWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "batchSize", s);
    _.w(d, "codeName", s);
    _.w(d, "createDataAccessAction", s);
    _.w(d, "impTag", s);
    _.w(d, "impTag2", s);
    _.v(
      d,
      "dedataImportItems",
      c.m(
        "dataentity.dataimport.DEDataImportItem[]",
        s,
        "getPSDEDataImportItems"
      )
    );
    _.x(d, "sysPFPluginId", s, "getPSSysPFPlugin");
    _.w(d, "updateDataAccessAction", s);
    _.w(d, "defaultMode", s);
    _.w(d, "enableCustomized", s);
    _.w(d, "ignoreError", s);
    _.w(d, "valid", s, "", true);
    _.x(d, "createAppDEActionId", s, "getCreatePSAppDEAction");
    _.x(d, "updateAppDEActionId", s, "getUpdatePSAppDEAction");
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/dataimport/dedata-import-item-writer.mjs
var DEDataImportItemWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.v(
      d,
      "capLanguageRes",
      c.s("res.LanguageRes[]", s, "getCapPSLanguageRes")
    );
    _.w(d, "caption", s);
    _.w(d, "createDV", s);
    _.w(d, "createDVT", s);
    _.x(d, "codeListId", s, "getPSCodeList");
    _.w(d, "updateDV", s);
    _.w(d, "updateDVT", s);
    _.w(d, "hiddenDataItem", s);
    _.w(d, "uniqueItem", s);
    _.x(d, "appDEFieldId", s, "getPSAppDEField");
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/datamap/demap-writer.mjs
var DEMapWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "codeName", s);
    _.w(d, "logicName", s);
    _.w(d, "valid", s, "", true);
    _.x(d, "dstAppDataEntityId", s, "getDstPSAppDataEntity");
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/logic/delogic-node-writer.mjs
var DELogicNodeWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "codeName", s);
    _.w(d, "height", s, "", 0);
    _.w(d, "leftPos", s, "", 0);
    _.w(d, "logicNodeType", s);
    _.w(d, "nodeParams", s);
    _.v(
      d,
      "links",
      c.m("dataentity.logic.DELogicLink[]", s, "getPSDELogicLinks")
    );
    _.v(
      d,
      "delogicNodeParams",
      c.m("dataentity.logic.DELogicNodeParam[]", s, "getPSDELogicNodeParams")
    );
    _.w(d, "topPos", s, "", 0);
    _.w(d, "width", s, "", 0);
    _.w(d, "parallelOutput", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/logic/deappend-param-logic-writer.mjs
var DEAppendParamLogicWriter = class extends DELogicNodeWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "dstIndex", s);
    _.x(d, "dstDELogicParamId", s, "getDstPSDELogicParam");
    _.w(d, "srcFieldName", s);
    _.w(d, "srcIndex", s);
    _.x(d, "srcDELogicParamId", s, "getSrcPSDELogicParam");
    _.w(d, "srcSize", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/logic/debegin-logic-writer.mjs
var DEBeginLogicWriter = class extends DELogicNodeWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/logic/debind-param-logic-writer.mjs
var DEBindParamLogicWriter = class extends DELogicNodeWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.x(d, "dstDELogicParamId", s, "getDstPSDELogicParam");
    _.w(d, "srcFieldName", s);
    _.x(d, "srcDELogicParamId", s, "getSrcPSDELogicParam");
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/logic/decopy-param-logic-writer.mjs
var DECopyParamLogicWriter = class extends DELogicNodeWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "copyFields", s, "copyFields");
    _.x(d, "dstDELogicParamId", s, "getDstPSDELogicParam");
    _.x(d, "srcDELogicParamId", s, "getSrcPSDELogicParam");
    _.w(d, "copyIfNotExists", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/logic/dedeaction-logic-writer.mjs
var DEDEActionLogicWriter = class extends DELogicNodeWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.x(d, "dstAppDEActionId", s, "getDstPSAppDEAction");
    _.x(d, "dstAppDataEntityId", s, "getDstPSAppDataEntity");
    _.x(d, "dstDELogicParamId", s, "getDstPSDELogicParam");
    _.x(d, "retDELogicParamId", s, "getRetPSDELogicParam");
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/logic/dededata-query-logic-writer.mjs
var DEDEDataQueryLogicWriter = class extends DELogicNodeWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.x(d, "dstDELogicParamId", s, "getDstPSDELogicParam");
    _.x(d, "retDELogicParamId", s, "getRetPSDELogicParam");
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/logic/dededata-set-logic-writer.mjs
var DEDEDataSetLogicWriter = class extends DELogicNodeWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.x(d, "dstAppDEDataSetId", s, "getDstPSAppDEDataSet");
    _.x(d, "dstAppDataEntityId", s, "getDstPSAppDataEntity");
    _.x(d, "dstDELogicParamId", s, "getDstPSDELogicParam");
    _.x(d, "retDELogicParamId", s, "getRetPSDELogicParam");
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/logic/dedelogic-logic-writer.mjs
var DEDELogicLogicWriter = class extends DELogicNodeWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.x(d, "dstAppDELogicId", s, "getDstPSAppDELogic");
    _.x(d, "dstAppDataEntityId", s, "getDstPSAppDataEntity");
    _.x(d, "dstDELogicParamId", s, "getDstPSDELogicParam");
    _.x(d, "retDELogicParamId", s, "getRetPSDELogicParam");
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/logic/dedebug-param-logic-writer.mjs
var DEDebugParamLogicWriter = class extends DELogicNodeWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.x(d, "dstDELogicParamId", s, "getDstPSDELogicParam");
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/logic/deend-logic-writer.mjs
var DEEndLogicWriter = class extends DELogicNodeWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "dstFieldName", s);
    _.w(d, "rawValue", s);
    _.w(d, "rawValueStdDataType", s, "", 0);
    _.x(d, "returnParamId", s, "getReturnParam");
    _.w(d, "returnType", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/logic/delogic-writer.mjs
var DELogicWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "codeName", s);
    _.w(d, "debugMode", s, "", 0);
    _.w(d, "defaultParamName", s);
    _.w(d, "eventModel", s);
    _.w(d, "events", s);
    _.w(d, "logicName", s);
    _.w(d, "logicSubType", s, "", "NONE");
    _.v(
      d,
      "delogicNodes",
      c.m("dataentity.logic.DELogicNode[]", s, "getPSDELogicNodes")
    );
    _.v(
      d,
      "delogicParams",
      c.m("dataentity.logic.DELogicParam[]", s, "getPSDELogicParams")
    );
    _.w(d, "scriptCode", s);
    _.x(d, "startDELogicNodeId", s, "getStartPSDELogicNode");
    _.w(d, "threadMode", s, "", 0);
    _.w(d, "customCode", s);
    _.w(d, "ignoreException", s);
    _.w(d, "template", s);
    _.w(d, "valid", s, "", true);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/logic/deflogic-writer.mjs
var DEFLogicWriter = class extends DELogicWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "deflogicMode", s, "dEFLogicMode");
    _.x(d, "appDEFieldId", s, "getPSAppDEField");
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/logic/delogic-link-cond-writer.mjs
var DELogicLinkCondWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "logicType", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/logic/delogic-link-group-cond-writer.mjs
var DELogicLinkGroupCondWriter = class extends DELogicLinkCondWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "groupOP", s);
    _.v(
      d,
      "conds",
      c.m("dataentity.logic.DELogicLinkCond[]", s, "getPSDELogicLinkConds")
    );
    _.w(d, "notMode", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/logic/delogic-link-writer.mjs
var DELogicLinkWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.x(d, "thenId", s, "getDstPSDELogicNode");
    _.v(
      d,
      "delogicLinkGroupCond",
      c.s(
        "dataentity.logic.DELogicLinkGroupCond[]",
        s,
        "getPSDELogicLinkGroupCond"
      )
    );
    _.w(d, "catchLink", s);
    _.w(d, "defaultLink", s);
    _.w(d, "subCallLink", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/logic/delogic-link-single-cond-writer.mjs
var DELogicLinkSingleCondWriter = class extends DELogicLinkCondWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "condOP", s);
    _.w(d, "dstFieldName", s);
    _.x(d, "dstLogicParamId", s, "getDstLogicParam");
    _.w(d, "paramType", s);
    _.w(d, "paramValue", s);
    _.x(d, "srcLogicParamId", s, "getSrcLogicParam");
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/logic/delogic-node-param-writer.mjs
var DELogicNodeParamWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "aggMode", s);
    _.w(d, "dstFieldName", s);
    _.w(d, "dstIndex", s);
    _.x(d, "dstDELogicParamId", s, "getDstPSDELogicParam");
    _.w(d, "dstSortDir", s);
    _.w(d, "expression", s);
    _.w(d, "paramAction", s);
    _.w(d, "params", s);
    _.w(d, "srcFieldName", s);
    _.w(d, "srcIndex", s);
    _.x(d, "srcDELogicParamId", s, "getSrcPSDELogicParam");
    _.w(d, "srcSize", s);
    _.w(d, "srcValue", s);
    _.w(d, "srcValueStdDataType", s, "", 0);
    _.w(d, "srcValueType", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/logic/delogic-param-writer.mjs
var DELogicParamWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "codeName", s);
    _.w(d, "defaultValue", s);
    _.w(d, "defaultValueType", s);
    _.w(d, "fileType", s);
    _.w(d, "fileUrl", s);
    _.w(d, "paramTag", s);
    _.w(d, "paramTag2", s);
    _.w(d, "params", s);
    _.w(d, "stdDataType", s, "", 0);
    _.w(d, "appContextParam", s);
    _.w(d, "appGlobalParam", s);
    _.w(d, "cloneParam", s);
    _.w(d, "default", s);
    _.w(d, "entityListParam", s);
    _.w(d, "entityMapParam", s);
    _.w(d, "entityPageParam", s);
    _.w(d, "entityParam", s);
    _.w(d, "envParam", s);
    _.w(d, "fileListParam", s);
    _.w(d, "fileParam", s);
    _.w(d, "filterParam", s);
    _.w(d, "lastParam", s);
    _.w(d, "lastReturnParam", s);
    _.w(d, "originEntity", s);
    _.w(d, "sessionParam", s);
    _.w(d, "simpleListParam", s);
    _.w(d, "simpleParam", s);
    _.w(d, "webContextParam", s);
    _.w(d, "webResponseParam", s);
    _.x(d, "paramAppDataEntityId", s, "getParamPSAppDataEntity");
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/logic/deprepare-param-logic-writer.mjs
var DEPrepareParamLogicWriter = class extends DELogicNodeWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/logic/deraw-code-logic-writer.mjs
var DERawCodeLogicWriter = class extends DELogicNodeWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "code", s);
    _.w(d, "codeType", s);
    _.x(d, "dstDELogicParamId", s, "getDstPSDELogicParam");
    _.x(d, "retDELogicParamId", s, "getRetPSDELogicParam");
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/logic/derenew-param-logic-writer.mjs
var DERenewParamLogicWriter = class extends DELogicNodeWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.x(d, "dstDELogicParamId", s, "getDstPSDELogicParam");
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/logic/dereset-param-logic-writer.mjs
var DEResetParamLogicWriter = class extends DELogicNodeWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.x(d, "dstDELogicParamId", s, "getDstPSDELogicParam");
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/logic/desort-param-logic-writer.mjs
var DESortParamLogicWriter = class extends DELogicNodeWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "dstFieldName", s);
    _.x(d, "dstDELogicParamId", s, "getDstPSDELogicParam");
    _.w(d, "dstSortDir", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/logic/destart-wflogic-writer.mjs
var DEStartWFLogicWriter = class extends DELogicNodeWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.x(d, "dstDELogicParamId", s, "getDstPSDELogicParam");
    _.x(d, "optDELogicParamId", s, "getOptPSDELogicParam");
    _.x(d, "appWFId", s, "getPSAppWF");
    _.x(d, "retDELogicParamId", s, "getRetPSDELogicParam");
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/logic/dethrow-exception-logic-writer.mjs
var DEThrowExceptionLogicWriter = class extends DELogicNodeWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "errorCode", s);
    _.w(d, "errorInfo", s);
    _.w(d, "exceptionObj", s);
    _.x(d, "exceptionParamId", s, "getExceptionParam");
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/logic/deuilogic-node-writer.mjs
var DEUILogicNodeWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "codeName", s);
    _.x(d, "dstDEUILogicParamId", s, "getDstPSDEUILogicParam");
    _.w(d, "height", s, "", 0);
    _.w(d, "leftPos", s, "", 0);
    _.w(d, "logicNodeType", s);
    _.v(
      d,
      "deuilogicLinks",
      c.m("dataentity.logic.DEUILogicLink[]", s, "getPSDEUILogicLinks")
    );
    _.v(
      d,
      "deuilogicNodeParams",
      c.m(
        "dataentity.logic.DEUILogicNodeParam[]",
        s,
        "getPSDEUILogicNodeParams"
      )
    );
    _.x(d, "srcDEUILogicParamId", s, "getSrcPSDEUILogicParam");
    _.w(d, "topPos", s, "", 0);
    _.w(d, "width", s, "", 0);
    _.w(d, "parallelOutput", s);
    _.x(d, "sysPFPluginId", s, "getPSSysPFPlugin");
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/logic/deuiaction-logic-writer.mjs
var DEUIActionLogicWriter = class extends DEUILogicNodeWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.x(d, "dstAppDEUIActionId", s, "getDstPSAppDEUIAction");
    _.x(d, "dstAppDataEntityId", s, "getDstPSAppDataEntity");
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/logic/deuiappend-param-logic-writer.mjs
var DEUIAppendParamLogicWriter = class extends DEUILogicNodeWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "dstIndex", s);
    _.w(d, "srcFieldName", s);
    _.w(d, "srcIndex", s);
    _.w(d, "srcSize", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/logic/deuibegin-logic-writer.mjs
var DEUIBeginLogicWriter = class extends DEUILogicNodeWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/logic/deuibind-param-logic-writer.mjs
var DEUIBindParamLogicWriter = class extends DEUILogicNodeWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "srcFieldName", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/logic/deuicopy-param-logic-writer.mjs
var DEUICopyParamLogicWriter = class extends DEUILogicNodeWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/logic/deuictrl-fire-event-logic-writer.mjs
var DEUICtrlFireEventLogicWriter = class extends DEUILogicNodeWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "eventName", s);
    _.x(d, "eventParamId", s, "getEventParam");
    _.x(d, "fireCtrlId", s, "getFireCtrl");
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/logic/deuictrl-invoke-logic-writer.mjs
var DEUICtrlInvokeLogicWriter = class extends DEUILogicNodeWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.x(d, "invokeCtrlId", s, "getInvokeCtrl");
    _.w(d, "invokeMethod", s);
    _.x(d, "invokeParamId", s, "getInvokeParam");
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/logic/deuideaction-logic-writer.mjs
var DEUIDEActionLogicWriter = class extends DEUILogicNodeWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.x(d, "dstAppDEActionId", s, "getDstPSAppDEAction");
    _.x(d, "dstAppDataEntityId", s, "getDstPSAppDataEntity");
    _.x(d, "retDEUILogicParamId", s, "getRetPSDEUILogicParam");
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/logic/deuidedata-set-logic-writer.mjs
var DEUIDEDataSetLogicWriter = class extends DEUILogicNodeWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.x(d, "dstAppDEDataSetId", s, "getDstPSAppDEDataSet");
    _.x(d, "dstAppDataEntityId", s, "getDstPSAppDataEntity");
    _.x(d, "retDEUILogicParamId", s, "getRetPSDEUILogicParam");
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/logic/deuidelogic-logic-writer.mjs
var DEUIDELogicLogicWriter = class extends DEUILogicNodeWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.x(d, "dstAppDELogicId", s, "getDstPSAppDELogic");
    _.x(d, "dstAppDataEntityId", s, "getDstPSAppDataEntity");
    _.x(d, "retDEUILogicParamId", s, "getRetPSDEUILogicParam");
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/logic/deuidebug-param-logic-writer.mjs
var DEUIDebugParamLogicWriter = class extends DEUILogicNodeWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/logic/deuiend-logic-writer.mjs
var DEUIEndLogicWriter = class extends DEUILogicNodeWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "dstFieldName", s);
    _.w(d, "rawValue", s);
    _.w(d, "rawValueStdDataType", s, "", 0);
    _.x(d, "returnParamId", s, "getReturnParam");
    _.w(d, "returnType", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/logic/deuilogic-link-cond-writer.mjs
var DEUILogicLinkCondWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "logicType", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/logic/deuilogic-link-group-cond-writer.mjs
var DEUILogicLinkGroupCondWriter = class extends DEUILogicLinkCondWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "groupOP", s);
    _.v(
      d,
      "deuilogicLinkConds",
      c.m("dataentity.logic.DEUILogicLinkCond[]", s, "getPSDEUILogicLinkConds")
    );
    _.w(d, "notMode", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/logic/deuilogic-link-writer.mjs
var DEUILogicLinkWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.x(d, "dstDEUILogicNodeId", s, "getDstPSDEUILogicNode");
    _.w(d, "linkCond", s);
    _.w(d, "linkMode", s);
    _.v(
      d,
      "deuilogicLinkGroupCond",
      c.s(
        "dataentity.logic.DEUILogicLinkGroupCond[]",
        s,
        "getPSDEUILogicLinkGroupCond"
      )
    );
    _.x(d, "srcDEUILogicNodeId", s, "getSrcPSDEUILogicNode");
    _.w(d, "catchLink", s);
    _.w(d, "defaultLink", s);
    _.w(d, "fulfilledLink", s);
    _.w(d, "rejectedLink", s);
    _.w(d, "subCallLink", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/logic/deuilogic-link-single-cond-writer.mjs
var DEUILogicLinkSingleCondWriter = class extends DEUILogicLinkCondWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "condOP", s);
    _.w(d, "dstFieldName", s);
    _.x(d, "dstLogicParamId", s, "getDstLogicParam");
    _.w(d, "paramType", s);
    _.w(d, "paramValue", s);
    _.x(d, "srcLogicParamId", s, "getSrcLogicParam");
    _.w(d, "value", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/logic/deuilogic-node-param-writer.mjs
var DEUILogicNodeParamWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "aggMode", s);
    _.w(d, "dstFieldName", s);
    _.w(d, "dstIndex", s);
    _.x(d, "dstDEUILogicParamId", s, "getDstPSDEUILogicParam");
    _.w(d, "dstSortDir", s);
    _.w(d, "expression", s);
    _.w(d, "paramAction", s);
    _.w(d, "srcFieldName", s);
    _.w(d, "srcIndex", s);
    _.x(d, "srcDEUILogicParamId", s, "getSrcPSDEUILogicParam");
    _.w(d, "srcSize", s);
    _.w(d, "srcValue", s);
    _.w(d, "srcValueStdDataType", s, "", 0);
    _.w(d, "srcValueType", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/logic/deuilogic-param-writer.mjs
var DEUILogicParamWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "codeName", s);
    _.w(d, "defaultValue", s);
    _.w(d, "defaultValueType", s);
    _.w(d, "paramFieldName", s);
    _.w(d, "paramTag", s);
    _.w(d, "paramTag2", s);
    _.w(d, "stdDataType", s, "", 0);
    _.w(d, "activeContainerParam", s);
    _.w(d, "activeCtrlParam", s);
    _.w(d, "activeViewParam", s);
    _.w(d, "appGlobalParam", s);
    _.w(d, "applicationParam", s);
    _.w(d, "ctrlParam", s);
    _.w(d, "default", s);
    _.w(d, "entityListParam", s);
    _.w(d, "entityMapParam", s);
    _.w(d, "entityPageParam", s);
    _.w(d, "entityParam", s);
    _.w(d, "envParam", s);
    _.w(d, "filterParam", s);
    _.w(d, "lastReturnParam", s);
    _.w(d, "navContextParam", s);
    _.w(d, "navViewParamParam", s);
    _.w(d, "routeViewSessionParam", s);
    _.w(d, "sessionParam", s);
    _.w(d, "simpleListParam", s);
    _.w(d, "simpleParam", s);
    _.w(d, "viewNavDataParam", s);
    _.w(d, "viewSessionParam", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/logic/deuimsg-box-logic-writer.mjs
var DEUIMsgBoxLogicWriter = class extends DEUILogicNodeWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "buttonsType", s);
    _.w(d, "message", s);
    _.x(d, "msgBoxParamId", s, "getMsgBoxParam");
    _.w(d, "msgBoxType", s);
    _.w(d, "showMode", s);
    _.w(d, "title", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/logic/deuipfplugin-logic-writer.mjs
var DEUIPFPluginLogicWriter = class extends DEUILogicNodeWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/logic/deuiraw-code-logic-writer.mjs
var DEUIRawCodeLogicWriter = class extends DEUILogicNodeWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "code", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/logic/deuirenew-param-logic-writer.mjs
var DEUIRenewParamLogicWriter = class extends DEUILogicNodeWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/logic/deuireset-param-logic-writer.mjs
var DEUIResetParamLogicWriter = class extends DEUILogicNodeWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/logic/deuisort-param-logic-writer.mjs
var DEUISortParamLogicWriter = class extends DEUILogicNodeWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "dstFieldName", s);
    _.w(d, "dstSortDir", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/logic/deuithrow-exception-logic-writer.mjs
var DEUIThrowExceptionLogicWriter = class extends DEUILogicNodeWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "errorCode", s);
    _.w(d, "errorInfo", s);
    _.w(d, "exceptionObj", s);
    _.x(d, "exceptionParamId", s, "getExceptionParam");
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/logic/deuilogic-writer.mjs
var DEUILogicWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "codeName", s);
    _.w(d, "defaultParamName", s);
    _.w(d, "logicName", s);
    _.v(
      d,
      "deuilogicNodes",
      c.m("dataentity.logic.DEUILogicNode[]", s, "getPSDEUILogicNodes")
    );
    _.v(
      d,
      "deuilogicParams",
      c.m("dataentity.logic.DEUILogicParam[]", s, "getPSDEUILogicParams")
    );
    _.x(d, "startDEUILogicNodeId", s, "getStartPSDEUILogicNode");
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/logic/deview-logic-writer.mjs
var DEViewLogicWriter = class extends DEUILogicWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/mainstate/demain-state-writer.mjs
var DEMainStateWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "actionDenyMsg", s);
    _.w(d, "codeName", s);
    _.w(d, "enterStateMode", s);
    _.w(d, "logicName", s);
    _.w(d, "mstag", s, "mSTag");
    _.w(d, "mstype", s, "mSType", 0);
    _.w(d, "opprivDenyMsg", s, "oPPrivDenyMsg");
    _.w(d, "orderValue", s, "", 99999);
    _.v(
      d,
      "demainStateOPPrivs",
      c.m(
        "dataentity.mainstate.DEMainStateOPPriv[]",
        s,
        "getPSDEMainStateOPPrivs"
      )
    );
    _.y(d, "prevDEMainStateIds", s, "getPrevPSDEMainStates");
    _.w(d, "state2Value", s);
    _.w(d, "state3Value", s);
    _.w(d, "stateValue", s);
    _.w(d, "viewActions", s);
    _.w(d, "wfstateMode", s, "wFStateMode");
    _.w(d, "actionAllowMode", s);
    _.w(d, "default", s);
    _.w(d, "enableViewActions", s);
    _.w(d, "fieldAllowMode", s);
    _.w(d, "opprivAllowMode", s, "oPPrivAllowMode");
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/mainstate/demain-state-oppriv-writer.mjs
var DEMainStateOPPrivWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.x(d, "deopprivId", s, "getPSDEOPPriv");
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/print/deprint-writer.mjs
var DEPrintWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "codeName", s);
    _.w(d, "contentType", s);
    _.w(d, "dataAccessAction", s);
    _.x(d, "sysPFPluginId", s, "getPSSysPFPlugin");
    _.w(d, "printTag", s);
    _.w(d, "printTag2", s);
    _.w(d, "reportType", s);
    _.w(d, "defaultMode", s);
    _.w(d, "enableMulitPrint", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/priv/deoppriv-writer.mjs
var DEOPPrivWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "logicName", s);
    _.w(d, "mapDEName", s, "mapPSDEName");
    _.w(d, "mapDEOPPrivName", s, "mapPSDEOPPrivName");
    _.w(d, "mapSysUniResCode", s);
    _.w(d, "mapSysUniResMode", s, "mapSysUniRes");
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/report/dereport-writer.mjs
var DEReportWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "codeName", s);
    _.w(d, "contentType", s);
    _.x(d, "sysPFPluginId", s, "getPSSysPFPlugin");
    _.w(d, "reportTag", s);
    _.w(d, "reportTag2", s);
    _.w(d, "reportType", s);
    _.w(d, "reportUIModel", s);
    _.w(d, "sysUniResCode", s);
    _.w(d, "enableLog", s);
    _.w(d, "multiPage", s);
    _.x(d, "appBICubeId", s, "getPSAppBICube");
    _.v(d, "appBIReport", c.s("app.bi.AppBIReport[]", s, "getPSAppBIReport"));
    _.x(d, "appBISchemeId", s, "getPSAppBIScheme");
    _.x(d, "appDEDataSetId", s, "getPSAppDEDataSet");
    _.x(d, "appDEDataSet2Id", s, "getPSAppDEDataSet2");
    _.x(d, "appDEDataSet3Id", s, "getPSAppDEDataSet3");
    _.x(d, "appDEDataSet4Id", s, "getPSAppDEDataSet4");
    _.v(
      d,
      "appDEReportItems",
      c.m("app.dataentity.AppDEReportItem[]", s, "getPSAppDEReportItems")
    );
    _.v(
      d,
      "layoutPanel",
      c.s("control.panel.LayoutPanel[]", s, "getPSLayoutPanel")
    );
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/report/dereport-item-writer.mjs
var DEReportItemWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.v(
      d,
      "minorAppDEReport",
      c.s("app.dataentity.AppDEReport[]", s, "getMinorPSAppDEReport")
    );
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/uiaction/deuiaction-group-detail-writer.mjs
var DEUIActionGroupDetailWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "actionLevel", s, "", 100);
    _.w(d, "afterContent", s);
    _.w(d, "afterItemType", s, "", "NONE");
    _.v(
      d,
      "afterLanguageRes",
      c.s("res.LanguageRes[]", s, "getAfterPSLanguageRes")
    );
    _.w(d, "beforeContent", s);
    _.w(d, "beforeItemType", s, "", "NONE");
    _.v(
      d,
      "beforeLanguageRes",
      c.s("res.LanguageRes[]", s, "getBeforePSLanguageRes")
    );
    _.v(
      d,
      "capLanguageRes",
      c.s("res.LanguageRes[]", s, "getCapPSLanguageRes")
    );
    _.w(d, "caption", s);
    _.w(d, "codeName", s);
    _.w(d, "detailTag", s);
    _.w(d, "detailTag2", s);
    _.w(d, "detailType", s);
    _.w(d, "enableScriptCode", s);
    _.x(d, "sysPFPluginId", s, "getPSSysPFPlugin");
    _.x(d, "uiactionId", s, "getPSUIAction");
    _.w(d, "tooltip", s);
    _.v(
      d,
      "tooltipLanguageRes",
      c.s("res.LanguageRes[]", s, "getTooltipPSLanguageRes")
    );
    _.w(d, "uiactionParamJO", s, "uIActionParamJO");
    _.w(d, "visibleScriptCode", s);
    _.w(d, "addSeparator", s);
    _.w(d, "showCaption", s);
    _.w(d, "showIcon", s);
    _.v(d, "afterSysCss", c.s("res.SysCss[]", s, "getAfterPSSysCss"));
    _.v(d, "beforeSysCss", c.s("res.SysCss[]", s, "getBeforePSSysCss"));
    _.v(d, "sysCss", c.s("res.SysCss[]", s, "getPSSysCss"));
    _.v(d, "sysImage", c.s("res.SysImage[]", s, "getPSSysImage"));
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/uiaction/deuiaction-group-writer.mjs
var DEUIActionGroupWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "groupTag", s);
    _.w(d, "groupTag2", s);
    _.w(d, "groupTag3", s);
    _.w(d, "groupTag4", s);
    _.v(
      d,
      "uiactionGroupDetails",
      c.m("view.UIActionGroupDetail[]", s, "getPSUIActionGroupDetails")
    );
    _.x(d, "appDataEntityId", s, "getPSAppDataEntity");
    _.w(d, "uniqueTag", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/view/uiaction-writer.mjs
var UIActionWriter = class extends ModelObjectWriter {
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/uiaction/deuiaction-writer.mjs
var DEUIActionWriter = class extends UIActionWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "actionLevel", s, "", 100);
    _.w(d, "actionTarget", s);
    _.v(d, "cmlanguageRes", c.s("res.LanguageRes[]", s, "getCMPSLanguageRes"));
    _.v(
      d,
      "capLanguageRes",
      c.s("res.LanguageRes[]", s, "getCapPSLanguageRes")
    );
    _.w(d, "caption", s);
    _.w(d, "codeName", s);
    _.w(d, "confirmMsg", s);
    _.w(d, "counterId", s);
    _.w(d, "dataAccessAction", s);
    _.w(d, "dialogResult", s);
    _.x(d, "frontAppViewId", s, "getFrontPSAppView");
    _.w(d, "frontProcessType", s);
    _.w(d, "fullCodeName", s);
    _.w(d, "htmlPageUrl", s);
    _.x(d, "nextId", s, "getNextPSUIAction");
    _.x(d, "appDEMethodId", s, "getPSAppDEMethod");
    _.x(d, "deopprivId", s, "getPSDEOPPriv");
    _.v(
      d,
      "navigateContexts",
      c.m("control.NavigateContext[]", s, "getPSNavigateContexts")
    );
    _.v(
      d,
      "navigateParams",
      c.m("control.NavigateParam[]", s, "getPSNavigateParams")
    );
    _.v(d, "sysImage", c.s("res.SysImage[]", s, "getPSSysImage"));
    _.x(d, "sysPFPluginId", s, "getPSSysPFPlugin");
    _.w(d, "paramItem", s);
    _.w(d, "predefinedType", s);
    _.w(d, "refreshMode", s, "", 0);
    _.v(d, "smlanguageRes", c.s("res.LanguageRes[]", s, "getSMPSLanguageRes"));
    _.w(d, "scriptCode", s);
    _.w(d, "successMsg", s);
    _.w(d, "textItem", s);
    _.w(d, "timeout", s);
    _.w(d, "tooltip", s);
    _.v(
      d,
      "tooltipLanguageRes",
      c.s("res.LanguageRes[]", s, "getTooltipPSLanguageRes")
    );
    _.w(d, "uiactionMode", s, "uIActionMode");
    _.w(d, "uiactionParamJO", s, "uIActionParamJO");
    _.w(d, "uiactionTag", s, "uIActionTag");
    _.w(d, "uiactionType", s, "uIActionType");
    _.w(d, "uilogicAttachMode", s, "uILogicAttachMode");
    _.w(d, "uilogicType", s, "uILogicType");
    _.w(d, "valueItem", s);
    _.w(d, "asyncAction", s);
    _.w(d, "closeEditView", s);
    _.w(d, "enableConfirm", s);
    _.w(d, "group", s);
    _.w(d, "reloadData", s);
    _.w(d, "saveTargetFirst", s);
    _.w(d, "showBusyIndicator", s, "", true);
    _.w(d, "noPrivDisplayMode", s, "", 2);
    _.w(d, "contextJOString", s);
    _.x(d, "appDEACModeId", s, "getPSAppDEACMode");
    _.x(d, "appDEDataExportId", s, "getPSAppDEDataExport");
    _.x(d, "appDEDataImportId", s, "getPSAppDEDataImport");
    _.x(d, "appDEPrintId", s, "getPSAppDEPrint");
    _.x(d, "appDEUILogicId", s, "getPSAppDEUILogic");
    _.x(d, "appDataEntityId", s, "getPSAppDataEntity");
    _.x(d, "appUILogicId", s, "getPSAppUILogic");
    _.v(
      d,
      "deeditForm",
      c.s("control.form.DEEditForm[]", s, "getPSDEEditForm")
    );
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/wizard/dewizard-form-writer.mjs
var DEWizardFormWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.v(
      d,
      "cm2LanguageRes",
      c.s("res.LanguageRes[]", s, "getCM2PSLanguageRes")
    );
    _.v(d, "cmlanguageRes", c.s("res.LanguageRes[]", s, "getCMPSLanguageRes"));
    _.w(d, "confirmMsg", s);
    _.w(d, "confirmMsg2", s);
    _.w(d, "formTag", s);
    _.w(d, "goFinishEnableScriptCode", s);
    _.w(d, "goNextEnableScriptCode", s);
    _.w(d, "goPrevEnableScriptCode", s);
    _.w(d, "deformName", s, "getPSDEFormName");
    _.x(d, "dewizardStepId", s, "getPSDEWizardStep");
    _.w(d, "stepActions", s, "stepActions");
    _.w(d, "stepTag", s);
    _.w(d, "firstForm", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/wizard/dewizard-writer.mjs
var DEWizardWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "codeName", s);
    _.w(d, "finishCapLanResTag", s);
    _.v(
      d,
      "finishCapLanguageRes",
      c.s("res.LanguageRes[]", s, "getFinishCapPSLanguageRes")
    );
    _.w(d, "finishCaption", s);
    _.x(d, "firstDEWizardFormId", s, "getFirstPSDEWizardForm");
    _.w(d, "nextCapLanResTag", s);
    _.v(
      d,
      "nextCapLanguageRes",
      c.s("res.LanguageRes[]", s, "getNextCapPSLanguageRes")
    );
    _.w(d, "nextCaption", s);
    _.v(
      d,
      "dewizardForms",
      c.m("dataentity.wizard.DEWizardForm[]", s, "getPSDEWizardForms")
    );
    _.v(
      d,
      "dewizardSteps",
      c.m("dataentity.wizard.DEWizardStep[]", s, "getPSDEWizardSteps")
    );
    _.w(d, "prevCapLanResTag", s);
    _.v(
      d,
      "prevCapLanguageRes",
      c.s("res.LanguageRes[]", s, "getPrevCapPSLanguageRes")
    );
    _.w(d, "prevCaption", s);
    _.w(d, "wizardStyle", s);
    _.w(d, "enableMainStateLogic", s);
    _.w(d, "stateWizard", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dataentity/wizard/dewizard-step-writer.mjs
var DEWizardStepWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.v(d, "sysImage", c.s("res.SysImage[]", s, "getPSSysImage"));
    _.w(d, "stepTag", s);
    _.w(d, "subTitle", s);
    _.v(
      d,
      "subTitleLanguageRes",
      c.s("res.LanguageRes[]", s, "getSubTitlePSLanguageRes")
    );
    _.w(d, "title", s);
    _.v(
      d,
      "titleLanguageRes",
      c.s("res.LanguageRes[]", s, "getTitlePSLanguageRes")
    );
    _.v(d, "titleSysCss", c.s("res.SysCss[]", s, "getTitlePSSysCss"));
    _.w(d, "enableLink", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/res/ctrl-msg-writer.mjs
var CtrlMsgWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "codeName", s);
    _.w(d, "msgModel", s);
    _.v(d, "ctrlMsgItems", c.m("res.CtrlMsgItem[]", s, "getPSCtrlMsgItems"));
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/res/ctrl-msg-item-writer.mjs
var CtrlMsgItemWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "content", s);
    _.v(
      d,
      "contentLanguageRes",
      c.s("res.LanguageRes[]", s, "getContentPSLanguageRes")
    );
    _.w(d, "timeout", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/res/language-item-writer.mjs
var LanguageItemWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "content", s);
    _.w(d, "lanResTag", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/res/language-res-writer.mjs
var LanguageResWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "defaultContent", s);
    _.w(d, "lanResTag", s);
    _.w(d, "lanResType", s);
    _.w(d, "refFlag", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/res/sys-css-writer.mjs
var SysCssWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "codeName", s);
    _.w(d, "cssName", s);
    _.w(d, "cssStyle", s);
    _.w(d, "designCssStyle", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/res/sys-dict-cat-writer.mjs
var SysDictCatWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "codeName", s);
    _.w(d, "dictCatTag", s);
    _.w(d, "dictCatTag2", s);
    _.w(d, "userDictCat", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/res/sys-image-writer.mjs
var SysImageWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "codeName", s);
    _.w(d, "cssClass", s);
    _.w(d, "cssClassX", s);
    _.w(d, "glyph", s);
    _.w(d, "height", s, "", 0);
    _.w(d, "imagePath", s);
    _.w(d, "imagePathX", s);
    _.w(d, "rawContent", s);
    _.w(d, "width", s, "", 0);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/valuerule/sys-value-rule-writer.mjs
var SysValueRuleWriter = class extends ModelObjectWriter {
  onFillDSL(c, s, d) {
    const _ = this;
    _.w(d, "codeName", s);
    _.w(d, "customObject", s);
    _.w(d, "customParams", s);
    _.x(d, "sysPFPluginId", s, "getPSSysPFPlugin");
    _.w(d, "regExCode", s);
    _.w(d, "regExCode2", s);
    _.w(d, "regExCode3", s);
    _.w(d, "regExCode4", s);
    _.w(d, "ruleInfo", s);
    _.w(d, "ruleInfoLanResTag", s);
    _.v(
      d,
      "ruleInfoLanguageRes",
      c.s("res.LanguageRes[]", s, "getRuleInfoPSLanguageRes")
    );
    _.w(d, "ruleTag", s);
    _.w(d, "ruleTag2", s);
    _.w(d, "ruleType", s);
    _.w(d, "scriptCode", s);
    _.w(d, "uniqueTag", s);
    super.onFillDSL(c, s, d);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/model-dslgen-engine-base.mjs
var ModelDSLGenEngineBase = class {
  findModelListWriter(model) {
    if (model == "app.appmenu.AppMenuModel[]") {
      return new AppMenuModelListWriter();
    }
    if (model == "app.bi.AppBICube[]") {
      return new AppBICubeListWriter();
    }
    if (model == "app.bi.AppBICubeDimension[]") {
      return new AppBICubeDimensionListWriter();
    }
    if (model == "app.bi.AppBICubeHierarchy[]") {
      return new AppBICubeHierarchyListWriter();
    }
    if (model == "app.bi.AppBICubeLevel[]") {
      return new AppBICubeLevelListWriter();
    }
    if (model == "app.bi.AppBICubeMeasure[]") {
      return new AppBICubeMeasureListWriter();
    }
    if (model == "app.bi.AppBIReport[]") {
      return new AppBIReportListWriter();
    }
    if (model == "app.bi.AppBIReportDimension[]") {
      return new AppBIReportDimensionListWriter();
    }
    if (model == "app.bi.AppBIReportMeasure[]") {
      return new AppBIReportMeasureListWriter();
    }
    if (model == "app.bi.AppBIScheme[]") {
      return new AppBISchemeListWriter();
    }
    if (model == "app.codelist.AppCodeList[]") {
      return new AppCodeListListWriter();
    }
    if (model == "app.control.AppCounter[]") {
      return new AppCounterListWriter();
    }
    if (model == "app.control.AppCounterRef[]") {
      return new AppCounterRefListWriter();
    }
    if (model == "app.control.AppPortlet[]") {
      return new AppPortletListWriter();
    }
    if (model == "app.control.AppPortletCat[]") {
      return new AppPortletCatListWriter();
    }
    if (model == "app.dataentity.AppDEACMode[]") {
      return new AppDEACModeListWriter();
    }
    if (model == "app.dataentity.AppDEDataExport[]") {
      return new AppDEDataExportListWriter();
    }
    if (model == "app.dataentity.AppDEDataImport[]") {
      return new AppDEDataImportListWriter();
    }
    if (model == "app.dataentity.AppDEField[]") {
      return new AppDEFieldListWriter();
    }
    if (model == "app.dataentity.AppDELogic[]") {
      return new AppDELogicListWriter();
    }
    if (model == "app.dataentity.AppDEMap[]") {
      return new AppDEMapListWriter();
    }
    if (model == "app.dataentity.AppDEMethod[]") {
      return new AppDEMethodListWriter();
    }
    if (model == "app.dataentity.AppDEMethodDTO[]") {
      return new AppDEMethodDTOListWriter();
    }
    if (model == "app.dataentity.AppDEMethodDTOField[]") {
      return new AppDEMethodDTOFieldListWriter();
    }
    if (model == "app.dataentity.AppDEMethodInput[]") {
      return new AppDEMethodInputListWriter();
    }
    if (model == "app.dataentity.AppDEMethodReturn[]") {
      return new AppDEMethodReturnListWriter();
    }
    if (model == "app.dataentity.AppDEPrint[]") {
      return new AppDEPrintListWriter();
    }
    if (model == "app.dataentity.AppDERS[]") {
      return new AppDERSListWriter();
    }
    if (model == "app.dataentity.AppDEReport[]") {
      return new AppDEReportListWriter();
    }
    if (model == "app.dataentity.AppDEReportItem[]") {
      return new AppDEReportItemListWriter();
    }
    if (model == "app.dataentity.AppDEUIAction[]") {
      return new AppDEUIActionListWriter();
    }
    if (model == "app.dataentity.AppDEUIActionGroup[]") {
      return new AppDEUIActionGroupListWriter();
    }
    if (model == "app.dataentity.AppDEUILogic[]") {
      return new AppDEUILogicListWriter();
    }
    if (model == "app.dataentity.AppDataEntity[]") {
      return new AppDataEntityListWriter();
    }
    if (model == "app.func.AppFunc[]") {
      return new AppFuncListWriter();
    }
    if (model == "app.AppLan[]") {
      return new AppLanListWriter();
    }
    if (model == "app.AppMethodDTO[]") {
      return new AppMethodDTOListWriter();
    }
    if (model == "app.AppMethodDTOField[]") {
      return new AppMethodDTOFieldListWriter();
    }
    if (model == "app.AppResource[]") {
      return new AppResourceListWriter();
    }
    if (model == "app.AppUtilPage[]") {
      return new AppUtilPageListWriter();
    }
    if (model == "app.ApplicationLogic[]") {
      return new ApplicationLogicListWriter();
    }
    if (model == "app.SubAppRef[]") {
      return new SubAppRefListWriter();
    }
    if (model == "app.logic.AppUILogic[]") {
      return new AppUILogicListWriter();
    }
    if (model == "app.logic.AppUILogicRefView[]") {
      return new AppUILogicRefViewListWriter();
    }
    if (model == "app.msg.AppMsgTempl[]") {
      return new AppMsgTemplListWriter();
    }
    if (model == "app.res.AppPFPluginRef[]") {
      return new AppPFPluginRefListWriter();
    }
    if (model == "app.res.AppSubViewTypeRef[]") {
      return new AppSubViewTypeRefListWriter();
    }
    if (model == "app.theme.AppUITheme[]") {
      return new AppUIThemeListWriter();
    }
    if (model == "app.util.AppUtil[]") {
      return new AppUtilListWriter();
    }
    if (model == "app.view.AppDEView[]") {
      return new AppDEViewListWriter();
    }
    if (model == "app.view.AppUtilView[]") {
      return new AppUtilViewListWriter();
    }
    if (model == "app.view.AppView[]") {
      return new AppViewListWriter();
    }
    if (model == "app.view.AppViewEngine[]") {
      return new AppViewEngineListWriter();
    }
    if (model == "app.view.AppViewLogic[]") {
      return new AppViewLogicListWriter();
    }
    if (model == "app.view.AppViewMsg[]") {
      return new AppViewMsgListWriter();
    }
    if (model == "app.view.AppViewMsgGroup[]") {
      return new AppViewMsgGroupListWriter();
    }
    if (model == "app.view.AppViewMsgGroupDetail[]") {
      return new AppViewMsgGroupDetailListWriter();
    }
    if (model == "app.view.AppViewNavContext[]") {
      return new AppViewNavContextListWriter();
    }
    if (model == "app.view.AppViewNavParam[]") {
      return new AppViewNavParamListWriter();
    }
    if (model == "app.view.AppViewParam[]") {
      return new AppViewParamListWriter();
    }
    if (model == "app.view.AppViewRef[]") {
      return new AppViewRefListWriter();
    }
    if (model == "app.wf.AppWF[]") {
      return new AppWFListWriter();
    }
    if (model == "app.wf.AppWFDE[]") {
      return new AppWFDEListWriter();
    }
    if (model == "app.wf.AppWFVer[]") {
      return new AppWFVerListWriter();
    }
    if (model == "codelist.CodeItem[]") {
      return new CodeItemListWriter();
    }
    if (model == "control.calendar.SysCalendarItem[]") {
      return new SysCalendarItemListWriter();
    }
    if (model == "control.chart.ChartAngleAxis[]") {
      return new ChartAngleAxisListWriter();
    }
    if (model == "control.chart.ChartCalendar[]") {
      return new ChartCalendarListWriter();
    }
    if (model == "control.chart.ChartCoordinateSystem[]") {
      return new ChartCoordinateSystemListWriter();
    }
    if (model == "control.chart.ChartDataSet[]") {
      return new ChartDataSetListWriter();
    }
    if (model == "control.chart.ChartDataSetField[]") {
      return new ChartDataSetFieldListWriter();
    }
    if (model == "control.chart.ChartDataSetGroup[]") {
      return new ChartDataSetGroupListWriter();
    }
    if (model == "control.chart.ChartGeo[]") {
      return new ChartGeoListWriter();
    }
    if (model == "control.chart.ChartGrid[]") {
      return new ChartGridListWriter();
    }
    if (model == "control.chart.ChartParallel[]") {
      return new ChartParallelListWriter();
    }
    if (model == "control.chart.ChartParallelAxis[]") {
      return new ChartParallelAxisListWriter();
    }
    if (model == "control.chart.ChartPolar[]") {
      return new ChartPolarListWriter();
    }
    if (model == "control.chart.ChartPolarAngleAxis[]") {
      return new ChartPolarAngleAxisListWriter();
    }
    if (model == "control.chart.ChartPolarRadiusAxis[]") {
      return new ChartPolarRadiusAxisListWriter();
    }
    if (model == "control.chart.ChartRadar[]") {
      return new ChartRadarListWriter();
    }
    if (model == "control.chart.ChartRadiusAxis[]") {
      return new ChartRadiusAxisListWriter();
    }
    if (model == "control.chart.ChartSeriesEncode[]") {
      return new ChartSeriesEncodeListWriter();
    }
    if (model == "control.chart.ChartSingle[]") {
      return new ChartSingleListWriter();
    }
    if (model == "control.chart.ChartSingleAxis[]") {
      return new ChartSingleAxisListWriter();
    }
    if (model == "control.chart.ChartXAxis[]") {
      return new ChartXAxisListWriter();
    }
    if (model == "control.chart.ChartYAxis[]") {
      return new ChartYAxisListWriter();
    }
    if (model == "control.chart.DEChartDataGrid[]") {
      return new DEChartDataGridListWriter();
    }
    if (model == "control.chart.DEChartLegend[]") {
      return new DEChartLegendListWriter();
    }
    if (model == "control.chart.DEChartSeries[]") {
      return new DEChartSeriesListWriter();
    }
    if (model == "control.chart.DEChartTitle[]") {
      return new DEChartTitleListWriter();
    }
    if (model == "control.drctrl.DEDRBarGroup[]") {
      return new DEDRBarGroupListWriter();
    }
    if (model == "control.drctrl.DEDRCtrlItem[]") {
      return new DEDRCtrlItemListWriter();
    }
    if (model == "control.drctrl.DEDRTabPage[]") {
      return new DEDRTabPageListWriter();
    }
    if (model == "control.dashboard.DBPortletPart[]") {
      return new DBPortletPartListWriter();
    }
    if (model == "control.dataview.DEDataViewDataItem[]") {
      return new DEDataViewDataItemListWriter();
    }
    if (model == "control.dataview.DEDataViewItem[]") {
      return new DEDataViewItemListWriter();
    }
    if (model == "control.expbar.TabExpPage[]") {
      return new TabExpPageListWriter();
    }
    if (model == "control.form.DEEditForm[]") {
      return new DEEditFormListWriter();
    }
    if (model == "control.form.DEFDCatGroupLogic[]") {
      return new DEFDCatGroupLogicListWriter();
    }
    if (model == "control.form.DEFDLogic[]") {
      return new DEFDLogicListWriter();
    }
    if (model == "control.form.DEFIUpdateDetail[]") {
      return new DEFIUpdateDetailListWriter();
    }
    if (model == "control.form.DEFormButton[]") {
      return new DEFormButtonList2Writer();
    }
    if (model == "control.form.DEFormDetail[]") {
      return new DEFormDetailListWriter();
    }
    if (model == "control.form.DEFormItem[]") {
      return new DEFormItemListWriter();
    }
    if (model == "control.form.DEFormItemUpdate[]") {
      return new DEFormItemUpdateListWriter();
    }
    if (model == "control.form.DEFormItemVR[]") {
      return new DEFormItemVRListWriter();
    }
    if (model == "control.form.DEFormPage[]") {
      return new DEFormPageListWriter();
    }
    if (model == "control.form.DEFormTabPage[]") {
      return new DEFormTabPageListWriter();
    }
    if (model == "control.grid.DEGEIUpdateDetail[]") {
      return new DEGEIUpdateDetailListWriter();
    }
    if (model == "control.grid.DEGridColumn[]") {
      return new DEGridColumnListWriter();
    }
    if (model == "control.grid.DEGridDataItem[]") {
      return new DEGridDataItemListWriter();
    }
    if (model == "control.grid.DEGridEditItem[]") {
      return new DEGridEditItemListWriter();
    }
    if (model == "control.grid.DEGridEditItemUpdate[]") {
      return new DEGridEditItemUpdateListWriter();
    }
    if (model == "control.grid.DEGridEditItemVR[]") {
      return new DEGridEditItemVRListWriter();
    }
    if (model == "control.Control[]") {
      return new ControlListWriter();
    }
    if (model == "control.ControlAction[]") {
      return new ControlActionListWriter();
    }
    if (model == "control.ControlAttribute[]") {
      return new ControlAttributeListWriter();
    }
    if (model == "control.ControlLogic[]") {
      return new ControlLogicListWriter();
    }
    if (model == "control.ControlNavContext[]") {
      return new ControlNavContextListWriter();
    }
    if (model == "control.ControlNavParam[]") {
      return new ControlNavParamListWriter();
    }
    if (model == "control.ControlParam[]") {
      return new ControlParamListWriter();
    }
    if (model == "control.ControlRender[]") {
      return new ControlRenderListWriter();
    }
    if (model == "control.Editor[]") {
      return new EditorListWriter();
    }
    if (model == "control.EditorItem[]") {
      return new EditorItemListWriter();
    }
    if (model == "control.NavigateContext[]") {
      return new NavigateContextListWriter();
    }
    if (model == "control.NavigateParam[]") {
      return new NavigateParamListWriter();
    }
    if (model == "control.RawItemBase[]") {
      return new RawItemBaseListWriter();
    }
    if (model == "control.RawItemParam[]") {
      return new RawItemParamListWriter();
    }
    if (model == "control.layout.Layout[]") {
      return new LayoutListWriter();
    }
    if (model == "control.layout.LayoutPos[]") {
      return new LayoutPosListWriter();
    }
    if (model == "control.list.DEListDataItem[]") {
      return new DEListDataItemListWriter();
    }
    if (model == "control.list.DEListItem[]") {
      return new DEListItemListWriter();
    }
    if (model == "control.map.SysMapItem[]") {
      return new SysMapItemListWriter();
    }
    if (model == "control.menu.AppMenuItem[]") {
      return new AppMenuItemListWriter();
    }
    if (model == "control.panel.LayoutPanel[]") {
      return new LayoutPanelListWriter();
    }
    if (model == "control.panel.PanelButton[]") {
      return new PanelButtonListWriter();
    }
    if (model == "control.panel.PanelItem[]") {
      return new PanelItemListWriter();
    }
    if (model == "control.panel.PanelItemCatGroupLogic[]") {
      return new PanelItemCatGroupLogicListWriter();
    }
    if (model == "control.panel.PanelItemLogic[]") {
      return new PanelItemLogicListWriter();
    }
    if (model == "control.panel.PanelTabPage[]") {
      return new PanelTabPageListWriter();
    }
    if (model == "control.panel.ViewLayoutPanel[]") {
      return new ViewLayoutPanelListWriter();
    }
    if (model == "control.searchbar.SearchBarFilter[]") {
      return new SearchBarFilterListWriter();
    }
    if (model == "control.searchbar.SearchBarGroup[]") {
      return new SearchBarGroupListWriter();
    }
    if (model == "control.searchbar.SearchBarQuickSearch[]") {
      return new SearchBarQuickSearchListWriter();
    }
    if (model == "control.toolbar.DEContextMenu[]") {
      return new DEContextMenuListWriter();
    }
    if (model == "control.toolbar.DEContextMenuItem[]") {
      return new DEContextMenuItemListWriter();
    }
    if (model == "control.toolbar.DEToolbarItem[]") {
      return new DEToolbarItemListWriter();
    }
    if (model == "control.tree.DETreeColumn[]") {
      return new DETreeColumnListWriter();
    }
    if (model == "control.tree.DETreeNode[]") {
      return new DETreeNodeListWriter();
    }
    if (model == "control.tree.DETreeNodeColumn[]") {
      return new DETreeNodeColumnListWriter();
    }
    if (model == "control.tree.DETreeNodeDataItem[]") {
      return new DETreeNodeDataItemListWriter();
    }
    if (model == "control.tree.DETreeNodeEditItem[]") {
      return new DETreeNodeEditItemListWriter();
    }
    if (model == "control.tree.DETreeNodeRS[]") {
      return new DETreeNodeRSListWriter();
    }
    if (model == "control.tree.DETreeNodeRSParam[]") {
      return new DETreeNodeRSParamListWriter();
    }
    if (model == "control.tree.DETreeNodeRV[]") {
      return new DETreeNodeRVListWriter();
    }
    if (model == "dataentity.defield.DEFSearchMode[]") {
      return new DEFSearchModeListWriter();
    }
    if (model == "dataentity.defield.valuerule.DEFVRCondition[]") {
      return new DEFVRConditionListWriter();
    }
    if (model == "dataentity.defield.valuerule.DEFVRGroupCondition[]") {
      return new DEFVRGroupConditionListWriter();
    }
    if (model == "dataentity.defield.valuerule.DEFValueRule[]") {
      return new DEFValueRuleListWriter();
    }
    if (model == "dataentity.ac.DEACModeDataItem[]") {
      return new DEACModeDataItemListWriter();
    }
    if (model == "dataentity.action.DEActionLogic[]") {
      return new DEActionLogicListWriter();
    }
    if (model == "dataentity.der.DER1N[]") {
      return new DER1NListWriter();
    }
    if (model == "dataentity.der.DERBase[]") {
      return new DERBaseListWriter();
    }
    if (model == "dataentity.ds.DEDQCondition[]") {
      return new DEDQConditionListWriter();
    }
    if (model == "dataentity.ds.DEDQGroupCondition[]") {
      return new DEDQGroupConditionListWriter();
    }
    if (model == "dataentity.dataexport.DEDataExportItem[]") {
      return new DEDataExportItemListWriter();
    }
    if (model == "dataentity.dataimport.DEDataImportItem[]") {
      return new DEDataImportItemListWriter();
    }
    if (model == "dataentity.logic.DELogicLink[]") {
      return new DELogicLinkListWriter();
    }
    if (model == "dataentity.logic.DELogicLinkCond[]") {
      return new DELogicLinkCondListWriter();
    }
    if (model == "dataentity.logic.DELogicLinkGroupCond[]") {
      return new DELogicLinkGroupCondListWriter();
    }
    if (model == "dataentity.logic.DELogicNode[]") {
      return new DELogicNodeListWriter();
    }
    if (model == "dataentity.logic.DELogicNodeParam[]") {
      return new DELogicNodeParamListWriter();
    }
    if (model == "dataentity.logic.DELogicParam[]") {
      return new DELogicParamListWriter();
    }
    if (model == "dataentity.logic.DEUILogicLink[]") {
      return new DEUILogicLinkListWriter();
    }
    if (model == "dataentity.logic.DEUILogicLinkCond[]") {
      return new DEUILogicLinkCondListWriter();
    }
    if (model == "dataentity.logic.DEUILogicLinkGroupCond[]") {
      return new DEUILogicLinkGroupCondListWriter();
    }
    if (model == "dataentity.logic.DEUILogicNode[]") {
      return new DEUILogicNodeListWriter();
    }
    if (model == "dataentity.logic.DEUILogicNodeParam[]") {
      return new DEUILogicNodeParamListWriter();
    }
    if (model == "dataentity.logic.DEUILogicParam[]") {
      return new DEUILogicParamListWriter();
    }
    if (model == "dataentity.mainstate.DEMainState[]") {
      return new DEMainStateListWriter();
    }
    if (model == "dataentity.mainstate.DEMainStateOPPriv[]") {
      return new DEMainStateOPPrivListWriter();
    }
    if (model == "dataentity.priv.DEOPPriv[]") {
      return new DEOPPrivListWriter();
    }
    if (model == "dataentity.uiaction.DEUIActionGroup[]") {
      return new DEUIActionGroupListWriter();
    }
    if (model == "dataentity.wizard.DEWizard[]") {
      return new DEWizardListWriter();
    }
    if (model == "dataentity.wizard.DEWizardForm[]") {
      return new DEWizardFormListWriter();
    }
    if (model == "dataentity.wizard.DEWizardStep[]") {
      return new DEWizardStepListWriter();
    }
    if (model == "res.CtrlMsg[]") {
      return new CtrlMsgListWriter();
    }
    if (model == "res.CtrlMsgItem[]") {
      return new CtrlMsgItemListWriter();
    }
    if (model == "res.LanguageItem[]") {
      return new LanguageItemListWriter();
    }
    if (model == "res.LanguageRes[]") {
      return new LanguageResListWriter();
    }
    if (model == "res.SysCss[]") {
      return new SysCssListWriter();
    }
    if (model == "res.SysDictCat[]") {
      return new SysDictCatListWriter();
    }
    if (model == "res.SysImage[]") {
      return new SysImageListWriter();
    }
    if (model == "valuerule.SysValueRule[]") {
      return new SysValueRuleListWriter();
    }
    if (model == "view.UIAction[]") {
      return new UIActionListWriter();
    }
    if (model == "view.UIActionGroup[]") {
      return new UIActionGroupListWriter();
    }
    if (model == "view.UIActionGroupDetail[]") {
      return new UIActionGroupDetailListWriter();
    }
    if (model == "view.UIEngineParam[]") {
      return new UIEngineParamListWriter();
    }
    throw new Error("\u65E0\u6CD5\u8BC6\u522B\u5217\u8868\u5217\u8868\u53D1\u5E03\u5668[" + model + "]");
  }
  findModelWriter(model) {
    if (model == "app.appmenu.AppMenuModel") {
      return new AppMenuModelWriter();
    }
    if (model == "app.bi.AppBICubeDimension") {
      return new AppBICubeDimensionWriter();
    }
    if (model == "app.bi.AppBICubeHierarchy") {
      return new AppBICubeHierarchyWriter();
    }
    if (model == "app.bi.AppBICube") {
      return new AppBICubeWriter();
    }
    if (model == "app.bi.AppBICubeLevel") {
      return new AppBICubeLevelWriter();
    }
    if (model == "app.bi.AppBICubeMeasure") {
      return new AppBICubeMeasureWriter();
    }
    if (model == "app.bi.AppBIReportDimension") {
      return new AppBIReportDimensionWriter();
    }
    if (model == "app.bi.AppBIReport") {
      return new AppBIReportWriter();
    }
    if (model == "app.bi.AppBIReportMeasure") {
      return new AppBIReportMeasureWriter();
    }
    if (model == "app.bi.AppBIScheme") {
      return new AppBISchemeWriter();
    }
    if (model == "app.codelist.AppCodeList") {
      return new AppCodeListWriter();
    }
    if (model == "app.control.AppCounter") {
      return new AppCounterWriter();
    }
    if (model == "app.control.AppCounterRef") {
      return new AppCounterRefWriter();
    }
    if (model == "app.control.AppPortletCat") {
      return new AppPortletCatWriter();
    }
    if (model == "app.control.AppPortlet") {
      return new AppPortletWriter();
    }
    if (model == "app.dataentity.AppDEField2") {
      return new AppDEFieldWriter2();
    }
    if (model == "app.dataentity.AppDEMethodDTOField") {
      return new AppDEMethodDTOFieldWriter();
    }
    if (model == "app.dataentity.AppDEMethodDTO") {
      return new AppDEMethodDTOWriter();
    }
    if (model == "app.dataentity.AppDEMethod") {
      return new AppDEMethodWriter();
    }
    if (model == "app.dataentity.AppDEMethodInput") {
      return new AppDEMethodInputWriter();
    }
    if (model == "app.dataentity.AppDEMethodReturn") {
      return new AppDEMethodReturnWriter();
    }
    if (model == "app.dataentity.AppDERS2") {
      return new AppDERSWriter2();
    }
    if (model == "app.dataentity.AppDataEntity") {
      return new AppDataEntityWriter();
    }
    if (model == "app.func.AppFunc") {
      return new AppFuncWriter();
    }
    if (model == "app.logic.BuiltinAppUINewDataLogic") {
      return new BuiltinAppUINewDataLogicWriter();
    }
    if (model == "app.logic.BuiltinAppUIOpenDataLogic") {
      return new BuiltinAppUIOpenDataLogicWriter();
    }
    if (model == "app.logic.AppUILogic") {
      return new AppUILogicWriter();
    }
    if (model == "app.logic.AppUILogicRefView") {
      return new AppUILogicRefViewWriter();
    }
    if (model == "app.msg.AppMsgTempl") {
      return new AppMsgTemplWriter();
    }
    if (model == "app.AppLan") {
      return new AppLanWriter();
    }
    if (model == "app.AppMethodDTOField") {
      return new AppMethodDTOFieldWriter();
    }
    if (model == "app.AppMethodDTO") {
      return new AppMethodDTOWriter();
    }
    if (model == "app.AppResource") {
      return new AppResourceWriter();
    }
    if (model == "app.AppUtilPage") {
      return new AppUtilPageWriter();
    }
    if (model == "app.Application") {
      return new ApplicationWriter();
    }
    if (model == "app.ApplicationLogic") {
      return new ApplicationLogicWriter();
    }
    if (model == "app.SubAppRef") {
      return new SubAppRefWriter();
    }
    if (model == "app.res.AppPFPluginRef") {
      return new AppPFPluginRefWriter();
    }
    if (model == "app.res.AppSubViewTypeRef") {
      return new AppSubViewTypeRefWriter();
    }
    if (model == "app.theme.AppUITheme") {
      return new AppUIThemeWriter();
    }
    if (model == "app.util.AppDynaDashboardUtil") {
      return new AppDynaDashboardUtilWriter();
    }
    if (model == "app.util.AppFilterStorageUtil") {
      return new AppFilterStorageUtilWriter();
    }
    if (model == "app.util.AppUtil") {
      return new AppUtilWriter();
    }
    if (model == "app.view.AppDECalendarExplorerView") {
      return new AppDECalendarExplorerViewWriter();
    }
    if (model == "app.view.AppDECalendarView") {
      return new AppDECalendarViewWriter();
    }
    if (model == "app.view.AppDEChartExplorerView") {
      return new AppDEChartExplorerViewWriter();
    }
    if (model == "app.view.AppDEChartView") {
      return new AppDEChartViewWriter();
    }
    if (model == "app.view.AppDECustomView") {
      return new AppDECustomViewWriter();
    }
    if (model == "app.view.AppDEDashboardView") {
      return new AppDEDashboardViewWriter();
    }
    if (model == "app.view.AppDEDataSetViewMsg") {
      return new AppDEDataSetViewMsgWriter();
    }
    if (model == "app.view.AppDEDataViewExplorerView") {
      return new AppDEDataViewExplorerViewWriter();
    }
    if (model == "app.view.AppDEDataView") {
      return new AppDEDataViewWriter();
    }
    if (model == "app.view.AppDEEditView9") {
      return new AppDEEditView9Writer();
    }
    if (model == "app.view.AppDEEditView") {
      return new AppDEEditViewWriter();
    }
    if (model == "app.view.AppDEFormPickupDataView") {
      return new AppDEFormPickupDataViewWriter();
    }
    if (model == "app.view.AppDEGanttExplorerView") {
      return new AppDEGanttExplorerViewWriter();
    }
    if (model == "app.view.AppDEGanttView") {
      return new AppDEGanttViewWriter();
    }
    if (model == "app.view.AppDEGridExplorerView") {
      return new AppDEGridExplorerViewWriter();
    }
    if (model == "app.view.AppDEGridView8") {
      return new AppDEGridView8Writer();
    }
    if (model == "app.view.AppDEGridView9") {
      return new AppDEGridView9Writer();
    }
    if (model == "app.view.AppDEGridView") {
      return new AppDEGridViewWriter();
    }
    if (model == "app.view.AppDEHtmlView") {
      return new AppDEHtmlViewWriter();
    }
    if (model == "app.view.AppDEIndexPickupDataView") {
      return new AppDEIndexPickupDataViewWriter();
    }
    if (model == "app.view.AppDEIndexView") {
      return new AppDEIndexViewWriter();
    }
    if (model == "app.view.AppDEKanbanView") {
      return new AppDEKanbanViewWriter();
    }
    if (model == "app.view.AppDEListExplorerView") {
      return new AppDEListExplorerViewWriter();
    }
    if (model == "app.view.AppDEListView") {
      return new AppDEListViewWriter();
    }
    if (model == "app.view.AppDEMEditView") {
      return new AppDEMEditViewWriter();
    }
    if (model == "app.view.AppDEMPickupView") {
      return new AppDEMPickupViewWriter();
    }
    if (model == "app.view.AppDEMapExplorerView") {
      return new AppDEMapExplorerViewWriter();
    }
    if (model == "app.view.AppDEMapView") {
      return new AppDEMapViewWriter();
    }
    if (model == "app.view.AppDEMobCalendarExplorerView") {
      return new AppDEMobCalendarExplorerViewWriter();
    }
    if (model == "app.view.AppDEMobCalendarView") {
      return new AppDEMobCalendarViewWriter();
    }
    if (model == "app.view.AppDEMobChartExplorerView") {
      return new AppDEMobChartExplorerViewWriter();
    }
    if (model == "app.view.AppDEMobChartView") {
      return new AppDEMobChartViewWriter();
    }
    if (model == "app.view.AppDEMobCustomView") {
      return new AppDEMobCustomViewWriter();
    }
    if (model == "app.view.AppDEMobDashboardView") {
      return new AppDEMobDashboardViewWriter();
    }
    if (model == "app.view.AppDEMobDataViewExplorerView") {
      return new AppDEMobDataViewExplorerViewWriter();
    }
    if (model == "app.view.AppDEMobDataView") {
      return new AppDEMobDataViewWriter();
    }
    if (model == "app.view.AppDEMobEditView") {
      return new AppDEMobEditViewWriter();
    }
    if (model == "app.view.AppDEMobGanttExplorerView") {
      return new AppDEMobGanttExplorerViewWriter();
    }
    if (model == "app.view.AppDEMobGanttView") {
      return new AppDEMobGanttViewWriter();
    }
    if (model == "app.view.AppDEMobHtmlView") {
      return new AppDEMobHtmlViewWriter();
    }
    if (model == "app.view.AppDEMobListExplorerView") {
      return new AppDEMobListExplorerViewWriter();
    }
    if (model == "app.view.AppDEMobListView") {
      return new AppDEMobListViewWriter();
    }
    if (model == "app.view.AppDEMobMDView") {
      return new AppDEMobMDViewWriter();
    }
    if (model == "app.view.AppDEMobMEditView") {
      return new AppDEMobMEditViewWriter();
    }
    if (model == "app.view.AppDEMobMPickupView") {
      return new AppDEMobMPickupViewWriter();
    }
    if (model == "app.view.AppDEMobMapExplorerView") {
      return new AppDEMobMapExplorerViewWriter();
    }
    if (model == "app.view.AppDEMobMapView") {
      return new AppDEMobMapViewWriter();
    }
    if (model == "app.view.AppDEMobPanelView") {
      return new AppDEMobPanelViewWriter();
    }
    if (model == "app.view.AppDEMobPickupListView") {
      return new AppDEMobPickupListViewWriter();
    }
    if (model == "app.view.AppDEMobPickupMDView") {
      return new AppDEMobPickupMDViewWriter();
    }
    if (model == "app.view.AppDEMobPickupTreeView") {
      return new AppDEMobPickupTreeViewWriter();
    }
    if (model == "app.view.AppDEMobPickupView") {
      return new AppDEMobPickupViewWriter();
    }
    if (model == "app.view.AppDEMobRedirectView") {
      return new AppDEMobRedirectViewWriter();
    }
    if (model == "app.view.AppDEMobReportView") {
      return new AppDEMobReportViewWriter();
    }
    if (model == "app.view.AppDEMobTabExplorerView") {
      return new AppDEMobTabExplorerViewWriter();
    }
    if (model == "app.view.AppDEMobTabSearchView") {
      return new AppDEMobTabSearchViewWriter();
    }
    if (model == "app.view.AppDEMobTreeExplorerView") {
      return new AppDEMobTreeExplorerViewWriter();
    }
    if (model == "app.view.AppDEMobTreeView") {
      return new AppDEMobTreeViewWriter();
    }
    if (model == "app.view.AppDEMobWFActionView") {
      return new AppDEMobWFActionViewWriter();
    }
    if (model == "app.view.AppDEMobWFDataRedirectView") {
      return new AppDEMobWFDataRedirectViewWriter();
    }
    if (model == "app.view.AppDEMobWFDynaActionView") {
      return new AppDEMobWFDynaActionViewWriter();
    }
    if (model == "app.view.AppDEMobWFDynaEditView") {
      return new AppDEMobWFDynaEditViewWriter();
    }
    if (model == "app.view.AppDEMobWFDynaExpMDView") {
      return new AppDEMobWFDynaExpMDViewWriter();
    }
    if (model == "app.view.AppDEMobWFDynaStartView") {
      return new AppDEMobWFDynaStartViewWriter();
    }
    if (model == "app.view.AppDEMobWFEditView") {
      return new AppDEMobWFEditViewWriter();
    }
    if (model == "app.view.AppDEMobWFMDView") {
      return new AppDEMobWFMDViewWriter();
    }
    if (model == "app.view.AppDEMobWFProxyResultView") {
      return new AppDEMobWFProxyResultViewWriter();
    }
    if (model == "app.view.AppDEMobWFProxyStartView") {
      return new AppDEMobWFProxyStartViewWriter();
    }
    if (model == "app.view.AppDEMobWFStartView") {
      return new AppDEMobWFStartViewWriter();
    }
    if (model == "app.view.AppDEMobWizardView") {
      return new AppDEMobWizardViewWriter();
    }
    if (model == "app.view.AppDEMultiDataView") {
      return new AppDEMultiDataViewWriter();
    }
    if (model == "app.view.AppDEPanelView") {
      return new AppDEPanelViewWriter();
    }
    if (model == "app.view.AppDEPickupDataView") {
      return new AppDEPickupDataViewWriter();
    }
    if (model == "app.view.AppDEPickupGridView") {
      return new AppDEPickupGridViewWriter();
    }
    if (model == "app.view.AppDEPickupTreeView") {
      return new AppDEPickupTreeViewWriter();
    }
    if (model == "app.view.AppDEPickupView") {
      return new AppDEPickupViewWriter();
    }
    if (model == "app.view.AppDERedirectView") {
      return new AppDERedirectViewWriter();
    }
    if (model == "app.view.AppDEReportView") {
      return new AppDEReportViewWriter();
    }
    if (model == "app.view.AppDESubAppRefView") {
      return new AppDESubAppRefViewWriter();
    }
    if (model == "app.view.AppDETabExplorerView") {
      return new AppDETabExplorerViewWriter();
    }
    if (model == "app.view.AppDETabSearchView") {
      return new AppDETabSearchViewWriter();
    }
    if (model == "app.view.AppDETreeExplorerView2") {
      return new AppDETreeExplorerView2Writer();
    }
    if (model == "app.view.AppDETreeExplorerView") {
      return new AppDETreeExplorerViewWriter();
    }
    if (model == "app.view.AppDETreeGridExView") {
      return new AppDETreeGridExViewWriter();
    }
    if (model == "app.view.AppDETreeGridView") {
      return new AppDETreeGridViewWriter();
    }
    if (model == "app.view.AppDETreeView") {
      return new AppDETreeViewWriter();
    }
    if (model == "app.view.AppDEViewEngine") {
      return new AppDEViewEngineWriter();
    }
    if (model == "app.view.AppDEView") {
      return new AppDEViewWriter();
    }
    if (model == "app.view.AppDEWFActionView") {
      return new AppDEWFActionViewWriter();
    }
    if (model == "app.view.AppDEWFDataRedirectView") {
      return new AppDEWFDataRedirectViewWriter();
    }
    if (model == "app.view.AppDEWFDynaActionView") {
      return new AppDEWFDynaActionViewWriter();
    }
    if (model == "app.view.AppDEWFDynaEditView") {
      return new AppDEWFDynaEditViewWriter();
    }
    if (model == "app.view.AppDEWFDynaExpGridView") {
      return new AppDEWFDynaExpGridViewWriter();
    }
    if (model == "app.view.AppDEWFDynaStartView") {
      return new AppDEWFDynaStartViewWriter();
    }
    if (model == "app.view.AppDEWFEditProxyDataView") {
      return new AppDEWFEditProxyDataViewWriter();
    }
    if (model == "app.view.AppDEWFEditView") {
      return new AppDEWFEditViewWriter();
    }
    if (model == "app.view.AppDEWFExplorerView") {
      return new AppDEWFExplorerViewWriter();
    }
    if (model == "app.view.AppDEWFGridView") {
      return new AppDEWFGridViewWriter();
    }
    if (model == "app.view.AppDEWFProxyDataRedirectView") {
      return new AppDEWFProxyDataRedirectViewWriter();
    }
    if (model == "app.view.AppDEWFProxyDataView") {
      return new AppDEWFProxyDataViewWriter();
    }
    if (model == "app.view.AppDEWFProxyResultView") {
      return new AppDEWFProxyResultViewWriter();
    }
    if (model == "app.view.AppDEWFProxyStartView") {
      return new AppDEWFProxyStartViewWriter();
    }
    if (model == "app.view.AppDEWFStartView") {
      return new AppDEWFStartViewWriter();
    }
    if (model == "app.view.AppDEWizardView") {
      return new AppDEWizardViewWriter();
    }
    if (model == "app.view.AppErrorView") {
      return new AppErrorViewWriter();
    }
    if (model == "app.view.AppFuncPickupView") {
      return new AppFuncPickupViewWriter();
    }
    if (model == "app.view.AppIndexView") {
      return new AppIndexViewWriter();
    }
    if (model == "app.view.AppPanelView") {
      return new AppPanelViewWriter();
    }
    if (model == "app.view.AppPortalView") {
      return new AppPortalViewWriter();
    }
    if (model == "app.view.AppUtilView") {
      return new AppUtilViewWriter();
    }
    if (model == "app.view.AppViewEngineParam") {
      return new AppViewEngineParamWriter();
    }
    if (model == "app.view.AppView") {
      return new AppViewWriter();
    }
    if (model == "app.view.AppViewLogic") {
      return new AppViewLogicWriter();
    }
    if (model == "app.view.AppViewMsgGroupDetail") {
      return new AppViewMsgGroupDetailWriter();
    }
    if (model == "app.view.AppViewMsgGroup") {
      return new AppViewMsgGroupWriter();
    }
    if (model == "app.view.AppViewMsg") {
      return new AppViewMsgWriter();
    }
    if (model == "app.view.AppViewNavContext") {
      return new AppViewNavContextWriter();
    }
    if (model == "app.view.AppViewNavParam") {
      return new AppViewNavParamWriter();
    }
    if (model == "app.view.AppViewParam") {
      return new AppViewParamWriter();
    }
    if (model == "app.view.AppViewRef") {
      return new AppViewRefWriter();
    }
    if (model == "app.wf.AppWFDE") {
      return new AppWFDEWriter();
    }
    if (model == "app.wf.AppWF") {
      return new AppWFWriter();
    }
    if (model == "app.wf.AppWFVer") {
      return new AppWFVerWriter();
    }
    if (model == "codelist.CodeItem") {
      return new CodeItemWriter();
    }
    if (model == "control.ajax.AjaxControlHandlerAction") {
      return new AjaxControlHandlerActionWriter();
    }
    if (model == "control.calendar.SysCalendar") {
      return new SysCalendarWriter();
    }
    if (model == "control.calendar.SysCalendarItem") {
      return new SysCalendarItemWriter();
    }
    if (model == "control.captionbar.CaptionBar") {
      return new CaptionBarWriter();
    }
    if (model == "control.chart.DEChartCalendar") {
      return new DEChartCalendarWriter();
    }
    if (model == "control.chart.DEChartCoordinateSystemCalendar") {
      return new DEChartCoordinateSystemCalendarWriter();
    }
    if (model == "control.chart.DEChartCoordinateSystemCartesian2D") {
      return new DEChartCoordinateSystemCartesian2DWriter();
    }
    if (model == "control.chart.DEChartCoordinateSystemGeo") {
      return new DEChartCoordinateSystemGeoWriter();
    }
    if (model == "control.chart.DEChartCoordinateSystemNone") {
      return new DEChartCoordinateSystemNoneWriter();
    }
    if (model == "control.chart.DEChartCoordinateSystemParallel") {
      return new DEChartCoordinateSystemParallelWriter();
    }
    if (model == "control.chart.DEChartCoordinateSystemPolar") {
      return new DEChartCoordinateSystemPolarWriter();
    }
    if (model == "control.chart.DEChartCoordinateSystemRadar") {
      return new DEChartCoordinateSystemRadarWriter();
    }
    if (model == "control.chart.DEChartCoordinateSystemSingle") {
      return new DEChartCoordinateSystemSingleWriter();
    }
    if (model == "control.chart.DEChartDataGrid") {
      return new DEChartDataGridWriter();
    }
    if (model == "control.chart.DEChartDataSetField") {
      return new DEChartDataSetFieldWriter();
    }
    if (model == "control.chart.DEChartDataSetGroup") {
      return new DEChartDataSetGroupWriter();
    }
    if (model == "control.chart.DEChartDataSet") {
      return new DEChartDataSetWriter();
    }
    if (model == "control.chart.DEChartGeo") {
      return new DEChartGeoWriter();
    }
    if (model == "control.chart.DEChartGrid") {
      return new DEChartGridWriter();
    }
    if (model == "control.chart.DEChartGridXAxis") {
      return new DEChartGridXAxisWriter();
    }
    if (model == "control.chart.DEChartGridYAxis") {
      return new DEChartGridYAxisWriter();
    }
    if (model == "control.chart.DEChart") {
      return new DEChartWriter();
    }
    if (model == "control.chart.DEChartLegend") {
      return new DEChartLegendWriter();
    }
    if (model == "control.chart.DEChartParallelAxis") {
      return new DEChartParallelAxisWriter();
    }
    if (model == "control.chart.DEChartParallel") {
      return new DEChartParallelWriter();
    }
    if (model == "control.chart.DEChartPolarAngleAxis") {
      return new DEChartPolarAngleAxisWriter();
    }
    if (model == "control.chart.DEChartPolar") {
      return new DEChartPolarWriter();
    }
    if (model == "control.chart.DEChartPolarRadiusAxis") {
      return new DEChartPolarRadiusAxisWriter();
    }
    if (model == "control.chart.DEChartRadar") {
      return new DEChartRadarWriter();
    }
    if (model == "control.chart.DEChartSeriesBar") {
      return new DEChartSeriesBarWriter();
    }
    if (model == "control.chart.DEChartSeriesCSCartesian2DEncode") {
      return new DEChartSeriesCSCartesian2DEncodeWriter();
    }
    if (model == "control.chart.DEChartSeriesCSNoneEncode") {
      return new DEChartSeriesCSNoneEncodeWriter();
    }
    if (model == "control.chart.DEChartSeriesCandlestick") {
      return new DEChartSeriesCandlestickWriter();
    }
    if (model == "control.chart.DEChartSeriesCustom") {
      return new DEChartSeriesCustomWriter();
    }
    if (model == "control.chart.DEChartSeriesFunnel") {
      return new DEChartSeriesFunnelWriter();
    }
    if (model == "control.chart.DEChartSeriesGauge") {
      return new DEChartSeriesGaugeWriter();
    }
    if (model == "control.chart.DEChartSeriesLine") {
      return new DEChartSeriesLineWriter();
    }
    if (model == "control.chart.DEChartSeriesMap") {
      return new DEChartSeriesMapWriter();
    }
    if (model == "control.chart.DEChartSeriesPie") {
      return new DEChartSeriesPieWriter();
    }
    if (model == "control.chart.DEChartSeriesRadar") {
      return new DEChartSeriesRadarWriter();
    }
    if (model == "control.chart.DEChartSeriesScatter") {
      return new DEChartSeriesScatterWriter();
    }
    if (model == "control.chart.DEChartSingleAxis") {
      return new DEChartSingleAxisWriter();
    }
    if (model == "control.chart.DEChartSingle") {
      return new DEChartSingleWriter();
    }
    if (model == "control.chart.DEChartTitle") {
      return new DEChartTitleWriter();
    }
    if (model == "control.custom.CustomControl") {
      return new CustomControlWriter();
    }
    if (model == "control.drctrl.DEDRBarGroup") {
      return new DEDRBarGroupWriter();
    }
    if (model == "control.drctrl.DEDRBar") {
      return new DEDRBarWriter();
    }
    if (model == "control.drctrl.DEDRBarItem") {
      return new DEDRBarItemWriter();
    }
    if (model == "control.drctrl.DEDRTab") {
      return new DEDRTabWriter();
    }
    if (model == "control.drctrl.DEDRTabPage") {
      return new DEDRTabPageWriter();
    }
    if (model == "control.dashboard.DBAppMenuPortletPart") {
      return new DBAppMenuPortletPartWriter();
    }
    if (model == "control.dashboard.DBChartPortletPart") {
      return new DBChartPortletPartWriter();
    }
    if (model == "control.dashboard.DBContainerPortletPart") {
      return new DBContainerPortletPartWriter();
    }
    if (model == "control.dashboard.DBCustomPortletPart") {
      return new DBCustomPortletPartWriter();
    }
    if (model == "control.dashboard.DBFilterPortletPart") {
      return new DBFilterPortletPartWriter();
    }
    if (model == "control.dashboard.DBHtmlPortletPart") {
      return new DBHtmlPortletPartWriter();
    }
    if (model == "control.dashboard.DBListPortletPart") {
      return new DBListPortletPartWriter();
    }
    if (model == "control.dashboard.DBPortletPart") {
      return new DBPortletPartWriter();
    }
    if (model == "control.dashboard.DBRawItemPortletPart") {
      return new DBRawItemPortletPartWriter();
    }
    if (model == "control.dashboard.DBReportPortletPart") {
      return new DBReportPortletPartWriter();
    }
    if (model == "control.dashboard.DBToolbarPortletPart") {
      return new DBToolbarPortletPartWriter();
    }
    if (model == "control.dashboard.DBViewPortletPart") {
      return new DBViewPortletPartWriter();
    }
    if (model == "control.dashboard.SysDashboard") {
      return new SysDashboardWriter();
    }
    if (model == "control.datainfobar.DataInfoBar") {
      return new DataInfoBarWriter();
    }
    if (model == "control.dataview.DEDataViewDataItem") {
      return new DEDataViewDataItemWriter();
    }
    if (model == "control.dataview.DEDataView") {
      return new DEDataViewWriter();
    }
    if (model == "control.dataview.DEDataViewItem") {
      return new DEDataViewItemWriter();
    }
    if (model == "control.dataview.DEKanban") {
      return new DEKanbanWriter();
    }
    if (model == "control.editor.Array") {
      return new ArrayWriter();
    }
    if (model == "control.editor.AutoComplete") {
      return new AutoCompleteWriter();
    }
    if (model == "control.editor.CheckBox") {
      return new CheckBoxWriter();
    }
    if (model == "control.editor.CheckBoxList") {
      return new CheckBoxListWriter();
    }
    if (model == "control.editor.Code") {
      return new CodeWriter();
    }
    if (model == "control.editor.ColorPicker") {
      return new ColorPickerWriter();
    }
    if (model == "control.editor.DatePicker") {
      return new DatePickerWriter();
    }
    if (model == "control.editor.DateRange") {
      return new DateRangeWriter();
    }
    if (model == "control.editor.DropDownList") {
      return new DropDownListWriter();
    }
    if (model == "control.editor.FileUploader") {
      return new FileUploaderWriter();
    }
    if (model == "control.editor.Hidden") {
      return new HiddenWriter();
    }
    if (model == "control.editor.Html") {
      return new HtmlWriter();
    }
    if (model == "control.editor.IPAddress") {
      return new IPAddressWriter();
    }
    if (model == "control.editor.ListBox") {
      return new ListBoxWriter();
    }
    if (model == "control.editor.ListBoxPicker") {
      return new ListBoxPickerWriter();
    }
    if (model == "control.editor.MDropDownList") {
      return new MDropDownListWriter();
    }
    if (model == "control.editor.MPicker") {
      return new MPickerWriter();
    }
    if (model == "control.editor.MailAddress") {
      return new MailAddressWriter();
    }
    if (model == "control.editor.MapPicker") {
      return new MapPickerWriter();
    }
    if (model == "control.editor.Markdown") {
      return new MarkdownWriter();
    }
    if (model == "control.editor.NumberEditor") {
      return new NumberEditorWriter();
    }
    if (model == "control.editor.NumberRange") {
      return new NumberRangeWriter();
    }
    if (model == "control.editor.Office2") {
      return new Office2Writer();
    }
    if (model == "control.editor.Office") {
      return new OfficeWriter();
    }
    if (model == "control.editor.Password") {
      return new PasswordWriter();
    }
    if (model == "control.editor.Picker") {
      return new PickerWriter();
    }
    if (model == "control.editor.PickupView") {
      return new PickupViewWriter();
    }
    if (model == "control.editor.Picture") {
      return new PictureWriter();
    }
    if (model == "control.editor.Predefined") {
      return new PredefinedWriter();
    }
    if (model == "control.editor.RadioButtonList") {
      return new RadioButtonListWriter();
    }
    if (model == "control.editor.Rating") {
      return new RatingWriter();
    }
    if (model == "control.editor.Raw") {
      return new RawWriter();
    }
    if (model == "control.editor.Slider") {
      return new SliderWriter();
    }
    if (model == "control.editor.Span") {
      return new SpanWriter();
    }
    if (model == "control.editor.Stepper") {
      return new StepperWriter();
    }
    if (model == "control.editor.TextArea") {
      return new TextAreaWriter();
    }
    if (model == "control.editor.TextBox") {
      return new TextBoxWriter();
    }
    if (model == "control.expbar.CalendarExpBar") {
      return new CalendarExpBarWriter();
    }
    if (model == "control.expbar.ChartExpBar") {
      return new ChartExpBarWriter();
    }
    if (model == "control.expbar.DataViewExpBar") {
      return new DataViewExpBarWriter();
    }
    if (model == "control.expbar.ExpBar") {
      return new ExpBarWriter();
    }
    if (model == "control.expbar.GanttExpBar") {
      return new GanttExpBarWriter();
    }
    if (model == "control.expbar.GridExpBar") {
      return new GridExpBarWriter();
    }
    if (model == "control.expbar.ListExpBar") {
      return new ListExpBarWriter();
    }
    if (model == "control.expbar.MapExpBar") {
      return new MapExpBarWriter();
    }
    if (model == "control.expbar.TabExpPanel") {
      return new TabExpPanelWriter();
    }
    if (model == "control.expbar.TreeExpBar") {
      return new TreeExpBarWriter();
    }
    if (model == "control.expbar.WFExpBar") {
      return new WFExpBarWriter();
    }
    if (model == "control.form.DEEditForm") {
      return new DEEditFormWriter();
    }
    if (model == "control.form.DEEditFormItemEx") {
      return new DEEditFormItemExWriter();
    }
    if (model == "control.form.DEFDCatGroupLogic") {
      return new DEFDCatGroupLogicWriter();
    }
    if (model == "control.form.DEFDGroupLogic") {
      return new DEFDGroupLogicWriter();
    }
    if (model == "control.form.DEFDSingleLogic") {
      return new DEFDSingleLogicWriter();
    }
    if (model == "control.form.DEFIUpdateDetail") {
      return new DEFIUpdateDetailWriter();
    }
    if (model == "control.form.DEFormButton") {
      return new DEFormButtonWriter();
    }
    if (model == "control.form.DEFormButtonList") {
      return new DEFormButtonListWriter();
    }
    if (model == "control.form.DEFormDRUIPart") {
      return new DEFormDRUIPartWriter();
    }
    if (model == "control.form.DEFormGroupPanel") {
      return new DEFormGroupPanelWriter();
    }
    if (model == "control.form.DEFormIFrame") {
      return new DEFormIFrameWriter();
    }
    if (model == "control.form.DEFormItem") {
      return new DEFormItemWriter();
    }
    if (model == "control.form.DEFormItemUpdate") {
      return new DEFormItemUpdateWriter();
    }
    if (model == "control.form.DEFormItemVR") {
      return new DEFormItemVRWriter();
    }
    if (model == "control.form.DEFormMDCtrl") {
      return new DEFormMDCtrlWriter();
    }
    if (model == "control.form.DEFormPage") {
      return new DEFormPageWriter();
    }
    if (model == "control.form.DEFormRawItem") {
      return new DEFormRawItemWriter();
    }
    if (model == "control.form.DEFormTabPage") {
      return new DEFormTabPageWriter();
    }
    if (model == "control.form.DEFormTabPanel") {
      return new DEFormTabPanelWriter();
    }
    if (model == "control.form.DEFormUserControl") {
      return new DEFormUserControlWriter();
    }
    if (model == "control.form.DESearchForm") {
      return new DESearchFormWriter();
    }
    if (model == "control.grid.HiddenDEGridEditItem") {
      return new HiddenDEGridEditItemWriter();
    }
    if (model == "control.grid.DEGEIUpdateDetail") {
      return new DEGEIUpdateDetailWriter();
    }
    if (model == "control.grid.DEGridDataItem") {
      return new DEGridDataItemWriter();
    }
    if (model == "control.grid.DEGridEditItemUpdate") {
      return new DEGridEditItemUpdateWriter();
    }
    if (model == "control.grid.DEGridEditItemVR") {
      return new DEGridEditItemVRWriter();
    }
    if (model == "control.grid.DEGridFieldColumn") {
      return new DEGridFieldColumnWriter();
    }
    if (model == "control.grid.DEGridGroupColumn") {
      return new DEGridGroupColumnWriter();
    }
    if (model == "control.grid.DEGrid") {
      return new DEGridWriter();
    }
    if (model == "control.grid.DEGridUAColumn") {
      return new DEGridUAColumnWriter();
    }
    if (model == "control.grid.DEMultiEditViewPanel") {
      return new DEMultiEditViewPanelWriter();
    }
    if (model == "control.grid.DETreeGrid") {
      return new DETreeGridWriter();
    }
    if (model == "control.layout.AbsoluteLayout") {
      return new AbsoluteLayoutWriter();
    }
    if (model == "control.layout.AbsoluteLayoutPos") {
      return new AbsoluteLayoutPosWriter();
    }
    if (model == "control.layout.BorderLayout") {
      return new BorderLayoutWriter();
    }
    if (model == "control.layout.BorderLayoutPos") {
      return new BorderLayoutPosWriter();
    }
    if (model == "control.layout.FlexLayout") {
      return new FlexLayoutWriter();
    }
    if (model == "control.layout.FlexLayoutPos") {
      return new FlexLayoutPosWriter();
    }
    if (model == "control.layout.Grid12Layout") {
      return new Grid12LayoutWriter();
    }
    if (model == "control.layout.GridLayoutPos") {
      return new GridLayoutPosWriter();
    }
    if (model == "control.layout.TableLayout") {
      return new TableLayoutWriter();
    }
    if (model == "control.layout.TableLayoutPos") {
      return new TableLayoutPosWriter();
    }
    if (model == "control.list.DEListDataItem") {
      return new DEListDataItemWriter();
    }
    if (model == "control.list.DEList") {
      return new DEListWriter();
    }
    if (model == "control.list.DEListItem") {
      return new DEListItemWriter();
    }
    if (model == "control.list.DEMobMDCtrl") {
      return new DEMobMDCtrlWriter();
    }
    if (model == "control.map.SysMap") {
      return new SysMapWriter();
    }
    if (model == "control.map.SysMapItem") {
      return new SysMapItemWriter();
    }
    if (model == "control.menu.AppMenuAMRef") {
      return new AppMenuAMRefWriter();
    }
    if (model == "control.menu.AppMenu") {
      return new AppMenuWriter();
    }
    if (model == "control.menu.AppMenuItem") {
      return new AppMenuItemWriter();
    }
    if (model == "control.menu.AppMenuRawItem") {
      return new AppMenuRawItemWriter();
    }
    if (model == "control.menu.AppMenuSeperator") {
      return new AppMenuSeperatorWriter();
    }
    if (model == "control.ControlAttribute") {
      return new ControlAttributeWriter();
    }
    if (model == "control.ControlLogic") {
      return new ControlLogicWriter();
    }
    if (model == "control.ControlNavContext") {
      return new ControlNavContextWriter();
    }
    if (model == "control.ControlNavParam") {
      return new ControlNavParamWriter();
    }
    if (model == "control.ControlParam") {
      return new ControlParamWriter();
    }
    if (model == "control.ControlRender") {
      return new ControlRenderWriter();
    }
    if (model == "control.Editor") {
      return new EditorWriter();
    }
    if (model == "control.EditorItem") {
      return new EditorItemWriter();
    }
    if (model == "control.NavigateContext") {
      return new NavigateContextWriter();
    }
    if (model == "control.NavigateParam") {
      return new NavigateParamWriter();
    }
    if (model == "control.RawItem") {
      return new RawItemWriter();
    }
    if (model == "control.RawItemParam") {
      return new RawItemParamWriter();
    }
    if (model == "control.panel.PanelItemCatGroupLogic") {
      return new PanelItemCatGroupLogicWriter();
    }
    if (model == "control.panel.PanelItemGroupLogic") {
      return new PanelItemGroupLogicWriter();
    }
    if (model == "control.panel.PanelItemSingleLogic") {
      return new PanelItemSingleLogicWriter();
    }
    if (model == "control.panel.SysPanelButton") {
      return new SysPanelButtonWriter();
    }
    if (model == "control.panel.SysPanelButtonList") {
      return new SysPanelButtonListWriter();
    }
    if (model == "control.panel.SysPanelContainer") {
      return new SysPanelContainerWriter();
    }
    if (model == "control.panel.SysPanelControl") {
      return new SysPanelControlWriter();
    }
    if (model == "control.panel.SysPanelCtrlPos") {
      return new SysPanelCtrlPosWriter();
    }
    if (model == "control.panel.SysPanelField") {
      return new SysPanelFieldWriter();
    }
    if (model == "control.panel.SysPanel") {
      return new SysPanelWriter();
    }
    if (model == "control.panel.SysPanelRawItem") {
      return new SysPanelRawItemWriter();
    }
    if (model == "control.panel.SysPanelTabPage") {
      return new SysPanelTabPageWriter();
    }
    if (model == "control.panel.SysPanelTabPanel") {
      return new SysPanelTabPanelWriter();
    }
    if (model == "control.panel.SysPanelUserControl") {
      return new SysPanelUserControlWriter();
    }
    if (model == "control.panel.SysViewLayoutPanel") {
      return new SysViewLayoutPanelWriter();
    }
    if (model == "control.rawitem.HtmlItem") {
      return new HtmlItemWriter();
    }
    if (model == "control.rawitem.ImageItem") {
      return new ImageItemWriter();
    }
    if (model == "control.rawitem.MarkdownItem") {
      return new MarkdownItemWriter();
    }
    if (model == "control.rawitem.PlaceholderItem") {
      return new PlaceholderItemWriter();
    }
    if (model == "control.rawitem.TextItem") {
      return new TextItemWriter();
    }
    if (model == "control.rawitem.VideoItem") {
      return new VideoItemWriter();
    }
    if (model == "control.reportpanel.DEReportPanel") {
      return new DEReportPanelWriter();
    }
    if (model == "control.searchbar.SysSearchBarFilter") {
      return new SysSearchBarFilterWriter();
    }
    if (model == "control.searchbar.SysSearchBarGroup") {
      return new SysSearchBarGroupWriter();
    }
    if (model == "control.searchbar.SysSearchBar") {
      return new SysSearchBarWriter();
    }
    if (model == "control.searchbar.SysSearchBarQuickSearch") {
      return new SysSearchBarQuickSearchWriter();
    }
    if (model == "control.toolbar.DEContextMenu") {
      return new DEContextMenuWriter();
    }
    if (model == "control.toolbar.DETBGroupItem") {
      return new DETBGroupItemWriter();
    }
    if (model == "control.toolbar.DETBRawItem") {
      return new DETBRawItemWriter();
    }
    if (model == "control.toolbar.DETBSeperatorItem") {
      return new DETBSeperatorItemWriter();
    }
    if (model == "control.toolbar.DETBUIActionItem") {
      return new DETBUIActionItemWriter();
    }
    if (model == "control.toolbar.DEToolbar") {
      return new DEToolbarWriter();
    }
    if (model == "control.toolbar.DEToolbarItem") {
      return new DEToolbarItemWriter();
    }
    if (model == "control.tree.HiddenDETreeNodeEditItem") {
      return new HiddenDETreeNodeEditItemWriter();
    }
    if (model == "control.tree.DEGantt") {
      return new DEGanttWriter();
    }
    if (model == "control.tree.DETreeCodeListNode") {
      return new DETreeCodeListNodeWriter();
    }
    if (model == "control.tree.DETreeColumn") {
      return new DETreeColumnWriter();
    }
    if (model == "control.tree.DETreeDataSetNode") {
      return new DETreeDataSetNodeWriter();
    }
    if (model == "control.tree.DETreeGridEx") {
      return new DETreeGridExWriter();
    }
    if (model == "control.tree.DETree") {
      return new DETreeWriter();
    }
    if (model == "control.tree.DETreeNodeDataItem") {
      return new DETreeNodeDataItemWriter();
    }
    if (model == "control.tree.DETreeNodeFieldColumn") {
      return new DETreeNodeFieldColumnWriter();
    }
    if (model == "control.tree.DETreeNodeRS") {
      return new DETreeNodeRSWriter();
    }
    if (model == "control.tree.DETreeNodeRSParam") {
      return new DETreeNodeRSParamWriter();
    }
    if (model == "control.tree.DETreeNodeRV") {
      return new DETreeNodeRVWriter();
    }
    if (model == "control.tree.DETreeNodeUAColumn") {
      return new DETreeNodeUAColumnWriter();
    }
    if (model == "control.tree.DETreeStaticNode") {
      return new DETreeStaticNodeWriter();
    }
    if (model == "control.viewpanel.DEPickupViewPanel") {
      return new DEPickupViewPanelWriter();
    }
    if (model == "control.viewpanel.DETabViewPanel") {
      return new DETabViewPanelWriter();
    }
    if (model == "control.viewpanel.DEViewPanel") {
      return new DEViewPanelWriter();
    }
    if (model == "control.wizardpanel.DEStateWizardPanel") {
      return new DEStateWizardPanelWriter();
    }
    if (model == "control.wizardpanel.DEWizardPanel") {
      return new DEWizardPanelWriter();
    }
    if (model == "dataentity.defield.DEFSearchMode") {
      return new DEFSearchModeWriter();
    }
    if (model == "dataentity.defield.valuerule.DEFVRGroupCondition") {
      return new DEFVRGroupConditionWriter();
    }
    if (model == "dataentity.defield.valuerule.DEFVRQueryCountCondition") {
      return new DEFVRQueryCountConditionWriter();
    }
    if (model == "dataentity.defield.valuerule.DEFVRRegExCondition") {
      return new DEFVRRegExConditionWriter();
    }
    if (model == "dataentity.defield.valuerule.DEFVRSimpleCondition") {
      return new DEFVRSimpleConditionWriter();
    }
    if (model == "dataentity.defield.valuerule.DEFVRStringLengthCondition") {
      return new DEFVRStringLengthConditionWriter();
    }
    if (model == "dataentity.defield.valuerule.DEFVRSysValueRuleCondition") {
      return new DEFVRSysValueRuleConditionWriter();
    }
    if (model == "dataentity.defield.valuerule.DEFVRValueRange2Condition") {
      return new DEFVRValueRange2ConditionWriter();
    }
    if (model == "dataentity.defield.valuerule.DEFVRValueRange3Condition") {
      return new DEFVRValueRange3ConditionWriter();
    }
    if (model == "dataentity.defield.valuerule.DEFVRValueRangeCondition") {
      return new DEFVRValueRangeConditionWriter();
    }
    if (model == "dataentity.defield.valuerule.DEFVRValueRecursionCondition") {
      return new DEFVRValueRecursionConditionWriter();
    }
    if (model == "dataentity.defield.valuerule.DEFValueRule") {
      return new DEFValueRuleWriter();
    }
    if (model == "dataentity.ac.DEACModeDataItem") {
      return new DEACModeDataItemWriter();
    }
    if (model == "dataentity.ac.DEACMode") {
      return new DEACModeWriter();
    }
    if (model == "dataentity.action.DEActionLogic") {
      return new DEActionLogicWriter();
    }
    if (model == "dataentity.der.DER11") {
      return new DER11Writer();
    }
    if (model == "dataentity.der.DER1N") {
      return new DER1NWriter();
    }
    if (model == "dataentity.der.DERBase") {
      return new DERBaseWriter();
    }
    if (model == "dataentity.ds.DEDQCustomCondition") {
      return new DEDQCustomConditionWriter();
    }
    if (model == "dataentity.ds.DEDQFieldCondition") {
      return new DEDQFieldConditionWriter();
    }
    if (model == "dataentity.ds.DEDQGroupCondition") {
      return new DEDQGroupConditionWriter();
    }
    if (model == "dataentity.dataexport.DEDataExport") {
      return new DEDataExportWriter();
    }
    if (model == "dataentity.dataexport.DEDataExportItem") {
      return new DEDataExportItemWriter();
    }
    if (model == "dataentity.dataimport.DEDataImport") {
      return new DEDataImportWriter();
    }
    if (model == "dataentity.dataimport.DEDataImportItem") {
      return new DEDataImportItemWriter();
    }
    if (model == "dataentity.datamap.DEMap") {
      return new DEMapWriter();
    }
    if (model == "dataentity.logic.DEAppendParamLogic") {
      return new DEAppendParamLogicWriter();
    }
    if (model == "dataentity.logic.DEBeginLogic") {
      return new DEBeginLogicWriter();
    }
    if (model == "dataentity.logic.DEBindParamLogic") {
      return new DEBindParamLogicWriter();
    }
    if (model == "dataentity.logic.DECopyParamLogic") {
      return new DECopyParamLogicWriter();
    }
    if (model == "dataentity.logic.DEDEActionLogic") {
      return new DEDEActionLogicWriter();
    }
    if (model == "dataentity.logic.DEDEDataQueryLogic") {
      return new DEDEDataQueryLogicWriter();
    }
    if (model == "dataentity.logic.DEDEDataSetLogic") {
      return new DEDEDataSetLogicWriter();
    }
    if (model == "dataentity.logic.DEDELogicLogic") {
      return new DEDELogicLogicWriter();
    }
    if (model == "dataentity.logic.DEDebugParamLogic") {
      return new DEDebugParamLogicWriter();
    }
    if (model == "dataentity.logic.DEEndLogic") {
      return new DEEndLogicWriter();
    }
    if (model == "dataentity.logic.DEFLogic") {
      return new DEFLogicWriter();
    }
    if (model == "dataentity.logic.DELogic") {
      return new DELogicWriter();
    }
    if (model == "dataentity.logic.DELogicLinkGroupCond") {
      return new DELogicLinkGroupCondWriter();
    }
    if (model == "dataentity.logic.DELogicLink") {
      return new DELogicLinkWriter();
    }
    if (model == "dataentity.logic.DELogicLinkSingleCond") {
      return new DELogicLinkSingleCondWriter();
    }
    if (model == "dataentity.logic.DELogicNodeParam") {
      return new DELogicNodeParamWriter();
    }
    if (model == "dataentity.logic.DELogicParam") {
      return new DELogicParamWriter();
    }
    if (model == "dataentity.logic.DEPrepareParamLogic") {
      return new DEPrepareParamLogicWriter();
    }
    if (model == "dataentity.logic.DERawCodeLogic") {
      return new DERawCodeLogicWriter();
    }
    if (model == "dataentity.logic.DERenewParamLogic") {
      return new DERenewParamLogicWriter();
    }
    if (model == "dataentity.logic.DEResetParamLogic") {
      return new DEResetParamLogicWriter();
    }
    if (model == "dataentity.logic.DESortParamLogic") {
      return new DESortParamLogicWriter();
    }
    if (model == "dataentity.logic.DEStartWFLogic") {
      return new DEStartWFLogicWriter();
    }
    if (model == "dataentity.logic.DEThrowExceptionLogic") {
      return new DEThrowExceptionLogicWriter();
    }
    if (model == "dataentity.logic.DEUIActionLogic") {
      return new DEUIActionLogicWriter();
    }
    if (model == "dataentity.logic.DEUIAppendParamLogic") {
      return new DEUIAppendParamLogicWriter();
    }
    if (model == "dataentity.logic.DEUIBeginLogic") {
      return new DEUIBeginLogicWriter();
    }
    if (model == "dataentity.logic.DEUIBindParamLogic") {
      return new DEUIBindParamLogicWriter();
    }
    if (model == "dataentity.logic.DEUICopyParamLogic") {
      return new DEUICopyParamLogicWriter();
    }
    if (model == "dataentity.logic.DEUICtrlFireEventLogic") {
      return new DEUICtrlFireEventLogicWriter();
    }
    if (model == "dataentity.logic.DEUICtrlInvokeLogic") {
      return new DEUICtrlInvokeLogicWriter();
    }
    if (model == "dataentity.logic.DEUIDEActionLogic") {
      return new DEUIDEActionLogicWriter();
    }
    if (model == "dataentity.logic.DEUIDEDataSetLogic") {
      return new DEUIDEDataSetLogicWriter();
    }
    if (model == "dataentity.logic.DEUIDELogicLogic") {
      return new DEUIDELogicLogicWriter();
    }
    if (model == "dataentity.logic.DEUIDebugParamLogic") {
      return new DEUIDebugParamLogicWriter();
    }
    if (model == "dataentity.logic.DEUIEndLogic") {
      return new DEUIEndLogicWriter();
    }
    if (model == "dataentity.logic.DEUILogicLinkGroupCond") {
      return new DEUILogicLinkGroupCondWriter();
    }
    if (model == "dataentity.logic.DEUILogicLink") {
      return new DEUILogicLinkWriter();
    }
    if (model == "dataentity.logic.DEUILogicLinkSingleCond") {
      return new DEUILogicLinkSingleCondWriter();
    }
    if (model == "dataentity.logic.DEUILogicNode") {
      return new DEUILogicNodeWriter();
    }
    if (model == "dataentity.logic.DEUILogicNodeParam") {
      return new DEUILogicNodeParamWriter();
    }
    if (model == "dataentity.logic.DEUILogicParam") {
      return new DEUILogicParamWriter();
    }
    if (model == "dataentity.logic.DEUIMsgBoxLogic") {
      return new DEUIMsgBoxLogicWriter();
    }
    if (model == "dataentity.logic.DEUIPFPluginLogic") {
      return new DEUIPFPluginLogicWriter();
    }
    if (model == "dataentity.logic.DEUIRawCodeLogic") {
      return new DEUIRawCodeLogicWriter();
    }
    if (model == "dataentity.logic.DEUIRenewParamLogic") {
      return new DEUIRenewParamLogicWriter();
    }
    if (model == "dataentity.logic.DEUIResetParamLogic") {
      return new DEUIResetParamLogicWriter();
    }
    if (model == "dataentity.logic.DEUISortParamLogic") {
      return new DEUISortParamLogicWriter();
    }
    if (model == "dataentity.logic.DEUIThrowExceptionLogic") {
      return new DEUIThrowExceptionLogicWriter();
    }
    if (model == "dataentity.logic.DEViewLogic") {
      return new DEViewLogicWriter();
    }
    if (model == "dataentity.mainstate.DEMainState") {
      return new DEMainStateWriter();
    }
    if (model == "dataentity.mainstate.DEMainStateOPPriv") {
      return new DEMainStateOPPrivWriter();
    }
    if (model == "dataentity.print.DEPrint") {
      return new DEPrintWriter();
    }
    if (model == "dataentity.priv.DEOPPriv") {
      return new DEOPPrivWriter();
    }
    if (model == "dataentity.report.DEReport") {
      return new DEReportWriter();
    }
    if (model == "dataentity.report.DEReportItem") {
      return new DEReportItemWriter();
    }
    if (model == "dataentity.uiaction.DEUIActionGroupDetail") {
      return new DEUIActionGroupDetailWriter();
    }
    if (model == "dataentity.uiaction.DEUIActionGroup") {
      return new DEUIActionGroupWriter();
    }
    if (model == "dataentity.uiaction.DEUIAction") {
      return new DEUIActionWriter();
    }
    if (model == "dataentity.wizard.DEWizardForm") {
      return new DEWizardFormWriter();
    }
    if (model == "dataentity.wizard.DEWizard") {
      return new DEWizardWriter();
    }
    if (model == "dataentity.wizard.DEWizardStep") {
      return new DEWizardStepWriter();
    }
    if (model == "res.CtrlMsg") {
      return new CtrlMsgWriter();
    }
    if (model == "res.CtrlMsgItem") {
      return new CtrlMsgItemWriter();
    }
    if (model == "res.LanguageItem") {
      return new LanguageItemWriter();
    }
    if (model == "res.LanguageRes") {
      return new LanguageResWriter();
    }
    if (model == "res.SysCss") {
      return new SysCssWriter();
    }
    if (model == "res.SysDictCat") {
      return new SysDictCatWriter();
    }
    if (model == "res.SysImage") {
      return new SysImageWriter();
    }
    if (model == "valuerule.SysValueRule") {
      return new SysValueRuleWriter();
    }
    return this.findModelListWriter(model);
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/model-dslgen-engine.mjs
var ModelDSLGenEngine = class extends ModelDSLGenEngineBase {
  constructor() {
    super(...arguments);
    /**
     * dsl model writer cache
     *
     * @author chitanda
     * @date 2023-04-13 14:04:33
     * @protected
     * @type {{ [key: string]: IModelWriter }}
     */
    __publicField(this, "modelWriterMap", {});
    /**
     * dsl model writer list cache
     *
     * @author chitanda
     * @date 2023-04-13 14:04:24
     * @protected
     * @type {{ [key: string]: IModelListWriter }}
     */
    __publicField(this, "modelListWriterMap", {});
  }
  fillDSL(writerCls, src, dst) {
    let writer = this.modelWriterMap[writerCls];
    if (!writer) {
      writer = this.findModelWriter(writerCls);
      this.modelWriterMap[writerCls] = writer;
    }
    writer == null ? void 0 : writer.fillDSL(this, src, dst);
    return true;
  }
  fillDSLList(writerCls, src, dst) {
    let writer = this.modelListWriterMap[writerCls];
    if (!writer) {
      writer = this.findModelListWriter(writerCls);
      this.modelListWriterMap[writerCls] = writer;
    }
    writer == null ? void 0 : writer.fillDSLList(this, src, dst);
    return true;
  }
  /**
   * 填充单对象
   *
   * @author chitanda
   * @date 2023-04-14 15:04:55
   * @param {string} writerCls
   * @param {*} src
   * @param {string} key
   * @param {*} [dst]
   * @return {*}  {*}
   */
  s(writerCls, src, key, dst) {
    if (src == null || src[key] == null) {
      return null;
    }
    if (dst == void 0) {
      dst = {};
    }
    this.fillDSL(writerCls, src[key], dst);
    return dst;
  }
  /**
   * 填充对象列表
   *
   * @author chitanda
   * @date 2023-04-14 15:04:01
   * @param {string} writerCls
   * @param {*} src
   * @param {string} key
   * @param {*} [dst]
   * @return {*}  {*}
   */
  m(writerCls, src, key, dst) {
    if (src == null || src[key] == null) {
      return null;
    }
    if (dst == void 0) {
      dst = [];
    }
    this.fillDSLList(writerCls, src[key], dst);
    return dst;
  }
};

// ../../node_modules/.pnpm/@ibiz+rt-model-api@0.2.59/node_modules/@ibiz/rt-model-api/es/dsl-helper.mjs
var DSLHelper = class {
  constructor() {
    __publicField(this, "engine", new ModelDSLGenEngine());
  }
  /**
   * 换代码表
   *
   * @author chitanda
   * @date 2023-04-13 14:04:13
   * @param {ModelObject} src
   * @param {IModel} [dst={}]
   * @return {*}  {IModel}
   */
  appCodeList(src, dst = {}) {
    this.engine.fillDSL("app.codelist.AppCodeList", src, dst);
    return dst;
  }
  /**
   * 计数器
   *
   * @author chitanda
   * @date 2023-04-13 17:04:45
   * @param {ModelObject} src
   * @param {IModel} [dst={}]
   * @return {*}  {IModel}
   */
  appCounter(src, dst = {}) {
    this.engine.fillDSL("app.control.AppCounter", src, dst);
    return dst;
  }
  /**
   * 应用实体
   *
   * @author chitanda
   * @date 2023-04-13 17:04:58
   * @param {ModelObject} src
   * @param {IModel} [dst={}]
   * @return {*}  {IModel}
   */
  appDataEntity(src, dst = {}) {
    this.engine.fillDSL("app.dataentity.AppDataEntity", src, dst);
    return dst;
  }
  /**
   * 应用实体关系
   *
   * @author chitanda
   * @date 2023-04-17 15:04:59
   * @param {ModelObject} src
   * @param {IModel} [dst={}]
   * @return {*}  {IModel}
   */
  appDERS(src, dst = {}) {
    const list = this.appDERSs([src]);
    if (list.length > 0) {
      Object.assign(dst, list[0]);
    }
    return dst;
  }
  /**
   * 应用实体关系组
   *
   * @author chitanda
   * @date 2023-04-17 15:04:44
   * @param {ModelObject[]} src
   * @param {IModel[]} [list=[]]
   * @return {*}  {IModel[]}
   */
  appDERSs(src, list = []) {
    this.engine.fillDSLList("app.dataentity.AppDERS[]", src, list);
    return list;
  }
  /**
   * 应用
   *
   * @author chitanda
   * @date 2023-04-13 17:04:07
   * @param {ModelObject} src
   * @param {IModel} [dst={}]
   * @return {*}  {IModel}
   */
  application(src, dst = {}) {
    this.engine.fillDSL("app.Application", src, dst);
    if (dst.subAppRefs) {
      dst.subAppRefs.forEach((item) => {
        deepUpdateAppId(item.id, item);
      });
    }
    return dst;
  }
  /**
   * 部件
   *
   * @author chitanda
   * @date 2023-04-13 17:04:16
   * @param {ModelObject} src
   * @param {IModel} [dst={}]
   * @return {*}  {IModel}
   */
  control(src, dst = {}) {
    const list = this.controls([src]);
    if (list.length > 0) {
      Object.assign(dst, list[0]);
    }
    return dst;
  }
  /**
   * 部件组
   *
   * @author chitanda
   * @date 2023-04-13 17:04:24
   * @param {ModelObject[]} src
   * @param {IModel[]} [list=[]]
   * @return {*}  {IModel[]}
   */
  controls(src, list = []) {
    this.engine.fillDSLList("control.Control[]", src, list);
    return list;
  }
  /**
   * 编辑器
   *
   * @author chitanda
   * @date 2023-04-13 17:04:31
   * @param {ModelObject} src
   * @param {IModel} [dst={}]
   * @return {*}  {IModel}
   */
  editor(src, dst = {}) {
    const list = this.editors([src]);
    if (list.length > 0) {
      Object.assign(dst, list[0]);
    }
    return dst;
  }
  /**
   * 编辑器组
   *
   * @author chitanda
   * @date 2023-04-13 17:04:37
   * @param {ModelObject[]} src
   * @param {IModel[]} [list=[]]
   * @return {*}  {IModel[]}
   */
  editors(src, list = []) {
    this.engine.fillDSLList("control.Editor[]", src, list);
    return list;
  }
  /**
   * 视图
   *
   * @author chitanda
   * @date 2023-04-13 17:04:40
   * @param {ModelObject} src
   * @param {IModel} [dst={}]
   * @return {*}  {IModel}
   */
  appView(src, dst = {}) {
    const list = this.appViews([src]);
    if (list.length > 0) {
      Object.assign(dst, list[0]);
    }
    return dst;
  }
  /**
   * 视图组
   *
   * @author chitanda
   * @date 2023-04-13 17:04:44
   * @param {ModelObject[]} src
   * @param {IModel[]} [list=[]]
   * @return {*}  {IModel[]}
   */
  appViews(src, list = []) {
    this.engine.fillDSLList("app.view.AppView[]", src, list);
    return list;
  }
  /**
   * UI逻辑
   *
   * @author chitanda
   * @date 2023-04-13 17:04:48
   * @param {ModelObject} src
   * @param {IModel} [dst={}]
   * @return {*}  {IModel}
   */
  appUiLogic(src, dst = {}) {
    this.engine.fillDSL("app.logic.AppUILogic", src, dst);
    return dst;
  }
  /**
   * UI逻辑组
   *
   * @author chitanda
   * @date 2023-04-13 17:04:58
   * @param {ModelObject[]} src
   * @param {IModel[]} [list=[]]
   * @return {*}  {IModel[]}
   */
  appUiLogics(src, list = []) {
    this.engine.fillDSLList("app.logic.AppUILogic[]", src, list);
    return list;
  }
  /**
   * 插件引用
   *
   * @author tony001
   * @date 2024-11-26 18:11:49
   * @param {ModelObject} src
   * @param {IModel} [dst={}]
   * @return {*}  {IModel}
   */
  appPFPluginRef(src, dst = {}) {
    this.engine.fillDSL("app.res.AppPFPluginRef", src, dst);
    return dst;
  }
  /**
   * 插件引用集合
   *
   * @author tony001
   * @date 2024-11-26 17:11:46
   * @param {ModelObject[]} src
   * @param {IModel[]} [list=[]]
   * @return {*}  {IModel[]}
   */
  appPFPluginRefs(src, list = []) {
    this.engine.fillDSLList("app.res.AppPFPluginRef[]", src, list);
    return list;
  }
  /**
   * 应用多语言转换
   *
   * @author chitanda
   * @date 2023-08-24 21:08:18
   * @param {ModelObject} src
   * @param {IModel} [dst={}]
   * @return {*}  {IModel}
   */
  appLan(src, dst = {}) {
    this.engine.fillDSL("app.AppLan", src, dst);
    return dst;
  }
  /**
   * 应用智能报表体系转化
   *
   * @author tony001
   * @date 2024-06-04 14:06:05
   * @param {ModelObject} src
   * @param {IModel} [dst={}]
   * @return {*}  {IModel}
   */
  appBIScheme(src, dst = {}) {
    this.engine.fillDSL("app.bi.AppBIScheme", src, dst);
    return dst;
  }
  /**
   * 应用智能报表立方体转化
   *
   * @author tony001
   * @date 2024-06-04 16:06:48
   * @param {ModelObject} src
   * @param {IModel} [dst={}]
   * @return {*}  {IModel}
   */
  appBICube(src, dst = {}) {
    this.engine.fillDSL("app.bi.AppBICube", src, dst);
    return dst;
  }
  /**
   * 应用智能报表转化
   *
   * @author tony001
   * @date 2024-06-04 16:06:44
   * @param {ModelObject} src
   * @param {IModel} [dst={}]
   * @return {*}  {IModel}
   */
  appBIReport(src, dst = {}) {
    this.engine.fillDSL("app.bi.AppBIReport", src, dst);
    return dst;
  }
  /**
   * 界面行为组转化
   *
   * @author tony001
   * @date 2024-09-09 14:09:59
   * @param {ModelObject} src
   * @param {IModel} [dst={}]
   * @return {*}  {IModel}
   */
  uiActionGroups(src, dst = {}) {
    this.engine.fillDSL("view.UIActionGroup[]", src, dst);
    return dst;
  }
};

// ../../node_modules/.pnpm/ramda@0.29.1/node_modules/ramda/es/internal/_isPlaceholder.js
function _isPlaceholder(a) {
  return a != null && typeof a === "object" && a["@@functional/placeholder"] === true;
}

// ../../node_modules/.pnpm/ramda@0.29.1/node_modules/ramda/es/internal/_curry1.js
function _curry1(fn) {
  return function f1(a) {
    if (arguments.length === 0 || _isPlaceholder(a)) {
      return f1;
    } else {
      return fn.apply(this, arguments);
    }
  };
}

// ../../node_modules/.pnpm/ramda@0.29.1/node_modules/ramda/es/internal/_curry2.js
function _curry2(fn) {
  return function f2(a, b) {
    switch (arguments.length) {
      case 0:
        return f2;
      case 1:
        return _isPlaceholder(a) ? f2 : _curry1(function(_b) {
          return fn(a, _b);
        });
      default:
        return _isPlaceholder(a) && _isPlaceholder(b) ? f2 : _isPlaceholder(a) ? _curry1(function(_a) {
          return fn(_a, b);
        }) : _isPlaceholder(b) ? _curry1(function(_b) {
          return fn(a, _b);
        }) : fn(a, b);
    }
  };
}

// ../../node_modules/.pnpm/ramda@0.29.1/node_modules/ramda/es/internal/_curry3.js
function _curry3(fn) {
  return function f3(a, b, c) {
    switch (arguments.length) {
      case 0:
        return f3;
      case 1:
        return _isPlaceholder(a) ? f3 : _curry2(function(_b, _c) {
          return fn(a, _b, _c);
        });
      case 2:
        return _isPlaceholder(a) && _isPlaceholder(b) ? f3 : _isPlaceholder(a) ? _curry2(function(_a, _c) {
          return fn(_a, b, _c);
        }) : _isPlaceholder(b) ? _curry2(function(_b, _c) {
          return fn(a, _b, _c);
        }) : _curry1(function(_c) {
          return fn(a, b, _c);
        });
      default:
        return _isPlaceholder(a) && _isPlaceholder(b) && _isPlaceholder(c) ? f3 : _isPlaceholder(a) && _isPlaceholder(b) ? _curry2(function(_a, _b) {
          return fn(_a, _b, c);
        }) : _isPlaceholder(a) && _isPlaceholder(c) ? _curry2(function(_a, _c) {
          return fn(_a, b, _c);
        }) : _isPlaceholder(b) && _isPlaceholder(c) ? _curry2(function(_b, _c) {
          return fn(a, _b, _c);
        }) : _isPlaceholder(a) ? _curry1(function(_a) {
          return fn(_a, b, c);
        }) : _isPlaceholder(b) ? _curry1(function(_b) {
          return fn(a, _b, c);
        }) : _isPlaceholder(c) ? _curry1(function(_c) {
          return fn(a, b, _c);
        }) : fn(a, b, c);
    }
  };
}

// ../../node_modules/.pnpm/ramda@0.29.1/node_modules/ramda/es/internal/_isArray.js
var isArray_default = Array.isArray || function _isArray(val) {
  return val != null && val.length >= 0 && Object.prototype.toString.call(val) === "[object Array]";
};

// ../../node_modules/.pnpm/ramda@0.29.1/node_modules/ramda/es/internal/_arrayFromIterator.js
function _arrayFromIterator(iter) {
  var list = [];
  var next;
  while (!(next = iter.next()).done) {
    list.push(next.value);
  }
  return list;
}

// ../../node_modules/.pnpm/ramda@0.29.1/node_modules/ramda/es/internal/_includesWith.js
function _includesWith(pred, x, list) {
  var idx = 0;
  var len = list.length;
  while (idx < len) {
    if (pred(x, list[idx])) {
      return true;
    }
    idx += 1;
  }
  return false;
}

// ../../node_modules/.pnpm/ramda@0.29.1/node_modules/ramda/es/internal/_functionName.js
function _functionName(f) {
  var match = String(f).match(/^function (\w*)/);
  return match == null ? "" : match[1];
}

// ../../node_modules/.pnpm/ramda@0.29.1/node_modules/ramda/es/internal/_has.js
function _has(prop, obj) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

// ../../node_modules/.pnpm/ramda@0.29.1/node_modules/ramda/es/internal/_objectIs.js
function _objectIs(a, b) {
  if (a === b) {
    return a !== 0 || 1 / a === 1 / b;
  } else {
    return a !== a && b !== b;
  }
}
var objectIs_default = typeof Object.is === "function" ? Object.is : _objectIs;

// ../../node_modules/.pnpm/ramda@0.29.1/node_modules/ramda/es/internal/_isArguments.js
var toString = Object.prototype.toString;
var _isArguments = /* @__PURE__ */ function() {
  return toString.call(arguments) === "[object Arguments]" ? function _isArguments2(x) {
    return toString.call(x) === "[object Arguments]";
  } : function _isArguments2(x) {
    return _has("callee", x);
  };
}();
var isArguments_default = _isArguments;

// ../../node_modules/.pnpm/ramda@0.29.1/node_modules/ramda/es/keys.js
var hasEnumBug = !/* @__PURE__ */ {
  toString: null
}.propertyIsEnumerable("toString");
var nonEnumerableProps = ["constructor", "valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString"];
var hasArgsEnumBug = /* @__PURE__ */ function() {
  "use strict";
  return arguments.propertyIsEnumerable("length");
}();
var contains = function contains2(list, item) {
  var idx = 0;
  while (idx < list.length) {
    if (list[idx] === item) {
      return true;
    }
    idx += 1;
  }
  return false;
};
var keys = typeof Object.keys === "function" && !hasArgsEnumBug ? /* @__PURE__ */ _curry1(function keys2(obj) {
  return Object(obj) !== obj ? [] : Object.keys(obj);
}) : /* @__PURE__ */ _curry1(function keys3(obj) {
  if (Object(obj) !== obj) {
    return [];
  }
  var prop, nIdx;
  var ks = [];
  var checkArgsLength = hasArgsEnumBug && isArguments_default(obj);
  for (prop in obj) {
    if (_has(prop, obj) && (!checkArgsLength || prop !== "length")) {
      ks[ks.length] = prop;
    }
  }
  if (hasEnumBug) {
    nIdx = nonEnumerableProps.length - 1;
    while (nIdx >= 0) {
      prop = nonEnumerableProps[nIdx];
      if (_has(prop, obj) && !contains(ks, prop)) {
        ks[ks.length] = prop;
      }
      nIdx -= 1;
    }
  }
  return ks;
});
var keys_default = keys;

// ../../node_modules/.pnpm/ramda@0.29.1/node_modules/ramda/es/type.js
var type = /* @__PURE__ */ _curry1(function type2(val) {
  return val === null ? "Null" : val === void 0 ? "Undefined" : Object.prototype.toString.call(val).slice(8, -1);
});
var type_default = type;

// ../../node_modules/.pnpm/ramda@0.29.1/node_modules/ramda/es/internal/_equals.js
function _uniqContentEquals(aIterator, bIterator, stackA, stackB) {
  var a = _arrayFromIterator(aIterator);
  var b = _arrayFromIterator(bIterator);
  function eq(_a, _b) {
    return _equals(_a, _b, stackA.slice(), stackB.slice());
  }
  return !_includesWith(function(b2, aItem) {
    return !_includesWith(eq, aItem, b2);
  }, b, a);
}
function _equals(a, b, stackA, stackB) {
  if (objectIs_default(a, b)) {
    return true;
  }
  var typeA = type_default(a);
  if (typeA !== type_default(b)) {
    return false;
  }
  if (typeof a["fantasy-land/equals"] === "function" || typeof b["fantasy-land/equals"] === "function") {
    return typeof a["fantasy-land/equals"] === "function" && a["fantasy-land/equals"](b) && typeof b["fantasy-land/equals"] === "function" && b["fantasy-land/equals"](a);
  }
  if (typeof a.equals === "function" || typeof b.equals === "function") {
    return typeof a.equals === "function" && a.equals(b) && typeof b.equals === "function" && b.equals(a);
  }
  switch (typeA) {
    case "Arguments":
    case "Array":
    case "Object":
      if (typeof a.constructor === "function" && _functionName(a.constructor) === "Promise") {
        return a === b;
      }
      break;
    case "Boolean":
    case "Number":
    case "String":
      if (!(typeof a === typeof b && objectIs_default(a.valueOf(), b.valueOf()))) {
        return false;
      }
      break;
    case "Date":
      if (!objectIs_default(a.valueOf(), b.valueOf())) {
        return false;
      }
      break;
    case "Error":
      return a.name === b.name && a.message === b.message;
    case "RegExp":
      if (!(a.source === b.source && a.global === b.global && a.ignoreCase === b.ignoreCase && a.multiline === b.multiline && a.sticky === b.sticky && a.unicode === b.unicode)) {
        return false;
      }
      break;
  }
  var idx = stackA.length - 1;
  while (idx >= 0) {
    if (stackA[idx] === a) {
      return stackB[idx] === b;
    }
    idx -= 1;
  }
  switch (typeA) {
    case "Map":
      if (a.size !== b.size) {
        return false;
      }
      return _uniqContentEquals(a.entries(), b.entries(), stackA.concat([a]), stackB.concat([b]));
    case "Set":
      if (a.size !== b.size) {
        return false;
      }
      return _uniqContentEquals(a.values(), b.values(), stackA.concat([a]), stackB.concat([b]));
    case "Arguments":
    case "Array":
    case "Object":
    case "Boolean":
    case "Number":
    case "String":
    case "Date":
    case "Error":
    case "RegExp":
    case "Int8Array":
    case "Uint8Array":
    case "Uint8ClampedArray":
    case "Int16Array":
    case "Uint16Array":
    case "Int32Array":
    case "Uint32Array":
    case "Float32Array":
    case "Float64Array":
    case "ArrayBuffer":
      break;
    default:
      return false;
  }
  var keysA = keys_default(a);
  if (keysA.length !== keys_default(b).length) {
    return false;
  }
  var extendedStackA = stackA.concat([a]);
  var extendedStackB = stackB.concat([b]);
  idx = keysA.length - 1;
  while (idx >= 0) {
    var key = keysA[idx];
    if (!(_has(key, b) && _equals(b[key], a[key], extendedStackA, extendedStackB))) {
      return false;
    }
    idx -= 1;
  }
  return true;
}

// ../../node_modules/.pnpm/ramda@0.29.1/node_modules/ramda/es/equals.js
var equals = /* @__PURE__ */ _curry2(function equals2(a, b) {
  return _equals(a, b, [], []);
});
var equals_default = equals;

// ../../node_modules/.pnpm/ramda@0.29.1/node_modules/ramda/es/internal/_isObject.js
function _isObject(x) {
  return Object.prototype.toString.call(x) === "[object Object]";
}

// ../../node_modules/.pnpm/ramda@0.29.1/node_modules/ramda/es/internal/_isString.js
function _isString(x) {
  return Object.prototype.toString.call(x) === "[object String]";
}

// ../../node_modules/.pnpm/ramda@0.29.1/node_modules/ramda/es/internal/_cloneRegExp.js
function _cloneRegExp(pattern) {
  return new RegExp(pattern.source, pattern.flags ? pattern.flags : (pattern.global ? "g" : "") + (pattern.ignoreCase ? "i" : "") + (pattern.multiline ? "m" : "") + (pattern.sticky ? "y" : "") + (pattern.unicode ? "u" : "") + (pattern.dotAll ? "s" : ""));
}

// ../../node_modules/.pnpm/ramda@0.29.1/node_modules/ramda/es/internal/_clone.js
function _clone(value, deep, map) {
  map || (map = new _ObjectMap());
  if (_isPrimitive(value)) {
    return value;
  }
  var copy = function copy2(copiedValue) {
    var cachedCopy = map.get(value);
    if (cachedCopy) {
      return cachedCopy;
    }
    map.set(value, copiedValue);
    for (var key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        copiedValue[key] = deep ? _clone(value[key], true, map) : value[key];
      }
    }
    return copiedValue;
  };
  switch (type_default(value)) {
    case "Object":
      return copy(Object.create(Object.getPrototypeOf(value)));
    case "Array":
      return copy([]);
    case "Date":
      return new Date(value.valueOf());
    case "RegExp":
      return _cloneRegExp(value);
    case "Int8Array":
    case "Uint8Array":
    case "Uint8ClampedArray":
    case "Int16Array":
    case "Uint16Array":
    case "Int32Array":
    case "Uint32Array":
    case "Float32Array":
    case "Float64Array":
    case "BigInt64Array":
    case "BigUint64Array":
      return value.slice();
    default:
      return value;
  }
}
function _isPrimitive(param) {
  var type3 = typeof param;
  return param == null || type3 != "object" && type3 != "function";
}
var _ObjectMap = /* @__PURE__ */ function() {
  function _ObjectMap2() {
    this.map = {};
    this.length = 0;
  }
  _ObjectMap2.prototype.set = function(key, value) {
    const hashedKey = this.hash(key);
    let bucket = this.map[hashedKey];
    if (!bucket) {
      this.map[hashedKey] = bucket = [];
    }
    bucket.push([key, value]);
    this.length += 1;
  };
  _ObjectMap2.prototype.hash = function(key) {
    let hashedKey = [];
    for (var value in key) {
      hashedKey.push(Object.prototype.toString.call(key[value]));
    }
    return hashedKey.join();
  };
  _ObjectMap2.prototype.get = function(key) {
    if (this.length <= 180) {
      for (const p in this.map) {
        const bucket2 = this.map[p];
        for (let i = 0; i < bucket2.length; i += 1) {
          const element = bucket2[i];
          if (element[0] === key) {
            return element[1];
          }
        }
      }
      return;
    }
    const hashedKey = this.hash(key);
    const bucket = this.map[hashedKey];
    if (!bucket) {
      return;
    }
    for (let i = 0; i < bucket.length; i += 1) {
      const element = bucket[i];
      if (element[0] === key) {
        return element[1];
      }
    }
  };
  return _ObjectMap2;
}();

// ../../node_modules/.pnpm/ramda@0.29.1/node_modules/ramda/es/clone.js
var clone = /* @__PURE__ */ _curry1(function clone2(value) {
  return value != null && typeof value.clone === "function" ? value.clone() : _clone(value, true);
});
var clone_default = clone;

// ../../node_modules/.pnpm/ramda@0.29.1/node_modules/ramda/es/internal/_isTypedArray.js
function _isTypedArray(val) {
  var type3 = Object.prototype.toString.call(val);
  return type3 === "[object Uint8ClampedArray]" || type3 === "[object Int8Array]" || type3 === "[object Uint8Array]" || type3 === "[object Int16Array]" || type3 === "[object Uint16Array]" || type3 === "[object Int32Array]" || type3 === "[object Uint32Array]" || type3 === "[object Float32Array]" || type3 === "[object Float64Array]" || type3 === "[object BigInt64Array]" || type3 === "[object BigUint64Array]";
}

// ../../node_modules/.pnpm/ramda@0.29.1/node_modules/ramda/es/empty.js
var empty = /* @__PURE__ */ _curry1(function empty2(x) {
  return x != null && typeof x["fantasy-land/empty"] === "function" ? x["fantasy-land/empty"]() : x != null && x.constructor != null && typeof x.constructor["fantasy-land/empty"] === "function" ? x.constructor["fantasy-land/empty"]() : x != null && typeof x.empty === "function" ? x.empty() : x != null && x.constructor != null && typeof x.constructor.empty === "function" ? x.constructor.empty() : isArray_default(x) ? [] : _isString(x) ? "" : _isObject(x) ? {} : isArguments_default(x) ? /* @__PURE__ */ function() {
    return arguments;
  }() : _isTypedArray(x) ? x.constructor.from("") : void 0;
});
var empty_default = empty;

// ../../node_modules/.pnpm/ramda@0.29.1/node_modules/ramda/es/isEmpty.js
var isEmpty = /* @__PURE__ */ _curry1(function isEmpty2(x) {
  return x != null && equals_default(x, empty_default(x));
});
var isEmpty_default = isEmpty;

// ../../node_modules/.pnpm/ramda@0.29.1/node_modules/ramda/es/mergeWithKey.js
var mergeWithKey = /* @__PURE__ */ _curry3(function mergeWithKey2(fn, l, r) {
  var result = {};
  var k;
  l = l || {};
  r = r || {};
  for (k in l) {
    if (_has(k, l)) {
      result[k] = _has(k, r) ? fn(k, l[k], r[k]) : l[k];
    }
  }
  for (k in r) {
    if (_has(k, r) && !_has(k, result)) {
      result[k] = r[k];
    }
  }
  return result;
});
var mergeWithKey_default = mergeWithKey;

// ../../node_modules/.pnpm/ramda@0.29.1/node_modules/ramda/es/mergeDeepWithKey.js
var mergeDeepWithKey = /* @__PURE__ */ _curry3(function mergeDeepWithKey2(fn, lObj, rObj) {
  return mergeWithKey_default(function(k, lVal, rVal) {
    if (_isObject(lVal) && _isObject(rVal)) {
      return mergeDeepWithKey2(fn, lVal, rVal);
    } else {
      return fn(k, lVal, rVal);
    }
  }, lObj, rObj);
});
var mergeDeepWithKey_default = mergeDeepWithKey;

// ../../node_modules/.pnpm/ramda@0.29.1/node_modules/ramda/es/mergeDeepLeft.js
var mergeDeepLeft = /* @__PURE__ */ _curry2(function mergeDeepLeft2(lObj, rObj) {
  return mergeDeepWithKey_default(function(k, lVal, rVal) {
    return lVal;
  }, lObj, rObj);
});
var mergeDeepLeft_default = mergeDeepLeft;

// src/utils/format-path/format-path.ts
function formatPath(path) {
  if ((path == null ? void 0 : path.indexOf("PSSYSAPPS/")) === 0) {
    const pos = path.indexOf("/");
    return path.substring(path.indexOf("/", pos + 1));
  }
  return path;
}

// src/utils/merge-model/merge-model.ts
function mergeModel(models, m, tag) {
  models.forEach((model) => {
    const item = m[model[tag]];
    if (item) {
      Object.assign(model, mergeDeepLeft_default(model, item));
    }
  });
}

// src/utils/plural/plural.ts
var import_pluralize = __toESM(require_pluralize(), 1);
import_pluralize.default.addPluralRule(/(matr|vert|ind)ix|ex$/, "$1ices");
function plural(key) {
  return (0, import_pluralize.default)(key);
}

// src/utils/service-path-util/service-path-util.ts
var ServicePathUtil = class {
  constructor(appDataEntities, allDERss, modelUtil) {
    this.appDataEntities = appDataEntities;
    this.allDERss = allDERss;
    this.modelUtil = modelUtil;
    /**
     * 应用实体关系
     *
     * @author chitanda
     * @date 2022-08-22 22:08:18
     * @protected
     * @type {Map<string, IAppDERS[]>} <应用实体 id, 应用实体父关系>
     */
    this.entityRsMap = /* @__PURE__ */ new Map();
    /**
     * 实体资源路径
     *
     * @author chitanda
     * @date 2022-08-22 22:08:58
     * @protected
     * @type {Map<string, ServicePathItem[][]>}
     */
    this.entityRsPathMap = /* @__PURE__ */ new Map();
    /**
     * 实体资源加载状态关系
     *
     * @author tony001
     * @date 2024-05-20 16:05:41
     * @protected
     * @type {Map<string, boolean>}
     */
    this.entityRsLoadMap = /* @__PURE__ */ new Map();
  }
  /**
   * 根据应用主实体过滤从关系集合
   *
   * @author chitanda
   * @date 2023-04-20 17:04:34
   * @protected
   * @param {string} id
   * @return {*}  {IAppDERS[]}
   */
  filterDERSs(id) {
    if (this.entityRsMap.has(id)) {
      return this.entityRsMap.get(id);
    }
    const items = this.allDERss.filter((item) => {
      if (item.rSMode === 2 && item.minorAppDataEntityId === id) {
        return item;
      }
      return null;
    });
    if (items.length > 0) {
      this.entityRsMap.set(id, items);
    }
    return items;
  }
  /**
   * 计算指定应用实体所有资源路径
   *
   * @author chitanda
   * @date 2023-04-22 13:04:27
   * @param {string} id
   * @return {*}  {string[]}
   */
  async calcRequestPaths(id) {
    const paths = await this.calcPaths(id);
    return paths.map((path) => {
      return path.map((item) => "".concat(item.plural, "/${").concat(item.lower, "}")).join("/");
    });
  }
  /**
   * 计算指定实体所有资源路径
   *
   * @author chitanda
   * @date 2023-04-22 13:04:36
   * @protected
   * @param {string} id
   * @return {*}  {ServicePathItem[][]} 返回顺序为 [祖父实体，爷爷实体，父实体，当前实体]
   */
  async calcPaths(id) {
    const entityRef = this.appDataEntities.find((item) => item.id === id);
    if (!entityRef) {
      throw new Error(ibiz.i18n.t("modelHelper.utils.noFoundEntity", { id }));
    }
    const { codeName } = entityRef;
    if (!this.entityRsLoadMap.has(codeName)) {
      this.entityRsLoadMap.set(codeName, false);
    }
    if (this.entityRsPathMap.has(codeName) && this.entityRsLoadMap.get(codeName)) {
      return this.entityRsPathMap.get(codeName);
    }
    const deRss = this.filterDERSs(id);
    if (deRss) {
      const ids = [id];
      const arr = this.calcDeepPath(ids, deRss);
      await this.deepFillPath(codeName, [codeName], arr);
      let paths = this.entityRsPathMap.get(codeName);
      if (paths) {
        paths = this.sortPath(paths);
        this.entityRsPathMap.set(codeName, paths);
        this.entityRsLoadMap.set(codeName, true);
        return paths;
      }
    }
    this.entityRsLoadMap.set(codeName, true);
    return [];
  }
  /**
   * 计算递归资源路径
   *
   * @author chitanda
   * @date 2023-08-23 14:08:39
   * @protected
   * @param {string[]} ids
   * @param {IAppDERS[]} deRss
   * @param {number} [num=0]
   * @return {*}  {ServicePathDeep[]}
   */
  calcDeepPath(ids, deRss, num = 0) {
    if (num > 10) {
      throw new Error(ibiz.i18n.t("modelHelper.utils.maximumTier"));
    }
    num += 1;
    const arr = [];
    deRss.forEach((rs) => {
      if (ids.includes(rs.majorAppDataEntityId)) {
        ibiz.log.warn(
          ibiz.i18n.t("modelHelper.utils.circularRecursive"),
          rs.majorAppDataEntityId,
          ibiz.i18n.t("modelHelper.utils.calculatedEntities"),
          ids
        );
        return;
      }
      const items = this.filterDERSs(rs.majorAppDataEntityId);
      arr.push([
        rs,
        this.calcDeepPath([...ids, rs.majorAppDataEntityId], items, num)
      ]);
    });
    return arr;
  }
  /**
   * 递归填充计算所有资源路径
   *
   * @author chitanda
   * @date 2022-08-22 22:08:04
   * @protected
   * @param {string} deCodeName
   * @param {string[]} pathNames
   * @param {ServicePathDeep[]} items
   */
  async deepFillPath(deCodeName, pathNames, items) {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const [rs, children] = item;
      if (children.length > 0) {
        await this.deepFillPath(
          deCodeName,
          [...pathNames, rs.majorDECodeName],
          children
        );
      }
      if (!this.entityRsPathMap.has(deCodeName)) {
        this.entityRsPathMap.set(deCodeName, []);
      }
      const arr = this.entityRsPathMap.get(deCodeName);
      const serviceApiItems = await this.getServiceApiItems(pathNames);
      const rsServiceApiItems = await this.getServiceApiItems([
        rs.majorDECodeName
      ]);
      const tempArr = [
        ...pathNames.map((pathName, index) => {
          return {
            codeName: pathName,
            lower: pathName.toLowerCase(),
            plural: serviceApiItems[index].deApiCodeName2
          };
        }),
        {
          codeName: rs.majorDECodeName,
          lower: rs.majorDECodeName.toLowerCase(),
          plural: rsServiceApiItems[0].deApiCodeName2
        }
      ].reverse();
      const targetIndex = arr.findIndex((ele) => {
        return ele.map((val) => {
          return val.codeName;
        }).join("/") === tempArr.map((temp) => {
          return temp.codeName;
        }).join("/");
      });
      if (targetIndex === -1) {
        arr.push(tempArr);
      }
    }
  }
  /**
   * 排序资源路径顺序
   *
   * @author chitanda
   * @date 2022-08-22 22:08:44
   * @protected
   * @param {ServicePathItem[][]} paths
   * @return {*}  {ServicePathItem[][]}
   */
  sortPath(paths) {
    return paths.sort((a, b) => {
      return b.length - a.length;
    });
  }
  /**
   * 通过codeName数据获取相关接口标识数据
   *
   * @author tony001
   * @date 2024-05-11 17:05:51
   * @protected
   * @param {string[]} codeNames
   * @return {*}  {Promise<ServiceApiItem[]>}
   */
  async getServiceApiItems(codeNames) {
    const serviceApiItems = [];
    for (let i = 0; i < codeNames.length; i++) {
      const appEntity = await this.modelUtil.getAppDataEntityModel(
        codeNames[i],
        false
      );
      const serviceApiItem = {
        codeName: codeNames[i],
        deApiCodeName: appEntity.dEAPICodeName,
        deApiCodeName2: ""
      };
      if (appEntity.dEAPICodeName) {
        if (!appEntity.deapicodeName2) {
          serviceApiItem.deApiCodeName2 = plural(appEntity.dEAPICodeName);
        }
        const { engineVer } = await this.modelUtil.getAppModel();
        if (!engineVer || engineVer < 240) {
          serviceApiItem.deApiCodeName2 = appEntity.deapicodeName2.toLowerCase();
        }
      }
      serviceApiItems.push(serviceApiItem);
    }
    return serviceApiItems;
  }
};

// src/utils/merge-model/merge-app-menu.ts
function mergeMenuItem(mainItem, subItem, isReverse = false) {
  var _a, _b, _c;
  if (!((_a = mainItem.appMenuItems) == null ? void 0 : _a.length)) {
    if ((_b = subItem.appMenuItems) == null ? void 0 : _b.length) {
      mainItem.appMenuItems = subItem.appMenuItems;
    } else {
      Object.assign(mainItem, subItem);
    }
  } else {
    const addItems = [];
    (_c = subItem.appMenuItems) == null ? void 0 : _c.forEach((item) => {
      var _a2;
      const sameMenu = (_a2 = mainItem.appMenuItems) == null ? void 0 : _a2.find((x) => x.id === item.id);
      if (sameMenu) {
        mergeMenuItem(sameMenu, item);
      } else {
        addItems.push(item);
      }
    });
    if (isReverse) {
      mainItem.appMenuItems = addItems.concat(mainItem.appMenuItems);
    } else {
      mainItem.appMenuItems.push(...addItems);
    }
  }
}
function mergeSplitAppMenu(main, sub, isReverse = false) {
  var _a;
  const addItems = [];
  (_a = sub.appMenuItems) == null ? void 0 : _a.forEach((item) => {
    var _a2;
    const sameMenu = (_a2 = main.appMenuItems) == null ? void 0 : _a2.find((x) => x.id === item.id);
    if (sameMenu) {
      mergeMenuItem(sameMenu, item, isReverse);
    } else {
      addItems.push(item);
    }
  });
  if (!main.appMenuItems) {
    main.appMenuItems = [];
  }
  if (isReverse) {
    main.appMenuItems = addItems.concat(main.appMenuItems);
  } else {
    main.appMenuItems.push(...addItems);
  }
}
function mergeAppMenu(main, sub) {
  var _a, _b, _c, _d;
  if (!main.appMenuItems) {
    main.appMenuItems = [];
  }
  if (!sub.appMenuItems) {
    sub.appMenuItems = [];
  }
  const mainSplitIndex = main.appMenuItems.findIndex((item) => {
    return item.itemType === "SEPERATOR" && item.spanMode;
  });
  const subSplitIndex = sub.appMenuItems.findIndex((item) => {
    return item.itemType === "SEPERATOR" && item.spanMode;
  });
  if (mainSplitIndex === -1) {
    mergeSplitAppMenu(main, sub);
  } else {
    const topMainAppMenu = clone_default(main);
    const bottomMainAppMenu = clone_default(main);
    topMainAppMenu.appMenuItems = ((_a = topMainAppMenu.appMenuItems) == null ? void 0 : _a.slice(0, mainSplitIndex)) || [];
    bottomMainAppMenu.appMenuItems = ((_b = bottomMainAppMenu.appMenuItems) == null ? void 0 : _b.slice(mainSplitIndex + 1)) || [];
    if (subSplitIndex === -1) {
      mergeSplitAppMenu(topMainAppMenu, sub);
    } else {
      const topSubAppMenu = clone_default(sub);
      const bottomSubAppMenu = clone_default(sub);
      topSubAppMenu.appMenuItems = ((_c = topSubAppMenu.appMenuItems) == null ? void 0 : _c.slice(0, subSplitIndex)) || [];
      bottomSubAppMenu.appMenuItems = ((_d = bottomSubAppMenu.appMenuItems) == null ? void 0 : _d.slice(subSplitIndex + 1)) || [];
      mergeSplitAppMenu(topMainAppMenu, topSubAppMenu);
      mergeSplitAppMenu(bottomMainAppMenu, bottomSubAppMenu, true);
    }
    main.appMenuItems = topMainAppMenu.appMenuItems.concat(main.appMenuItems[mainSplitIndex]).concat(bottomMainAppMenu.appMenuItems || []);
  }
}

// src/utils/merge-model/merge-de-drcontrol.ts
function mergeDEDrControl(dstDRCtrl, srcDRCtrl) {
  if (!srcDRCtrl) {
    return;
  }
  if (srcDRCtrl.dedrbarGroups) {
    srcDRCtrl.dedrbarGroups.forEach((item1) => {
      var _a;
      let index = 0;
      const result = (_a = dstDRCtrl.dedrbarGroups) == null ? void 0 : _a.find(
        (item2, index2) => {
          index = index2;
          return item1.name === item2.name;
        }
      );
      if (result) {
        dstDRCtrl.dedrbarGroups[index] = item1;
      } else {
        dstDRCtrl.dedrbarGroups.push(item1);
      }
    });
  }
  if (srcDRCtrl.dedrctrlItems) {
    srcDRCtrl.dedrctrlItems.forEach((item1) => {
      let index = 0;
      const result = dstDRCtrl.dedrctrlItems.find(
        (item2, index2) => {
          index = index2;
          return item1.id === item2.id;
        }
      );
      if (result) {
        dstDRCtrl.dedrctrlItems[index] = item1;
      } else {
        dstDRCtrl.dedrctrlItems.push(item1);
      }
    });
  }
  if (srcDRCtrl.dedrtabPages) {
    srcDRCtrl.dedrtabPages.forEach((item1) => {
      let index = 0;
      const result = dstDRCtrl.dedrtabPages.find(
        (item2, index2) => {
          index = index2;
          return item1.id === item2.id;
        }
      );
      if (result) {
        dstDRCtrl.dedrtabPages[index] = item1;
      } else if (item1.itemTag) {
        const [targetPosition, targetTag] = item1.itemTag.split(":");
        if (!targetTag || !targetPosition) {
          dstDRCtrl.dedrtabPages.push(item1);
        } else {
          const targetIndex = dstDRCtrl.dedrtabPages.findIndex(
            (item3) => item3.id === targetTag
          );
          if (targetIndex !== -1) {
            if (targetPosition === "BEFORE") {
              dstDRCtrl.dedrtabPages.splice(targetIndex, 0, item1);
            } else if (targetPosition === "AFTER") {
              dstDRCtrl.dedrtabPages.splice(targetIndex + 1, 0, item1);
            } else {
              dstDRCtrl.dedrtabPages.push(item1);
            }
          } else {
            dstDRCtrl.dedrtabPages.push(item1);
          }
        }
      } else {
        dstDRCtrl.dedrtabPages.push(item1);
      }
    });
  }
}

// src/utils/merge-model/merge-app-uiaction-group.ts
function mergeAppDEUIActionGroup(dst, src) {
  if (!dst || !src) {
    return;
  }
  if (src.uiactionGroupDetails) {
    if (!dst.uiactionGroupDetails) {
      dst.uiactionGroupDetails = [];
    }
    src.uiactionGroupDetails.forEach((item) => {
      dst.uiactionGroupDetails.push(item);
    });
  }
}

// src/utils/merge-model/merge-treeview.ts
function mergeTreeView(dst, source) {
  if (!dst || !source)
    return;
  if (source.detreeNodes && source.detreeNodes.length > 0) {
    if (!dst.detreeNodes) {
      dst.detreeNodes = [];
    }
    source.detreeNodes.forEach((sourceNode) => {
      var _a;
      const isExist = dst.detreeNodes.find((dstNode) => {
        return dstNode.id === sourceNode.id;
      });
      if (!isExist) {
        (_a = dst.detreeNodes) == null ? void 0 : _a.push(sourceNode);
      }
    });
  }
  if (source.detreeNodeRSs && source.detreeNodeRSs.length > 0) {
    if (!dst.detreeNodeRSs) {
      dst.detreeNodeRSs = [];
    }
    source.detreeNodeRSs.forEach((sourceNodeRs) => {
      var _a;
      const isExist = dst.detreeNodeRSs.find((dstNodeRs) => {
        return dstNodeRs.parentDETreeNodeId === sourceNodeRs.parentDETreeNodeId && dstNodeRs.childDETreeNodeId === sourceNodeRs.childDETreeNodeId;
      });
      if (!isExist) {
        (_a = dst.detreeNodeRSs) == null ? void 0 : _a.push(sourceNodeRs);
      }
    });
  }
}

// src/utils/merge-model/merge-model-helper.ts
var MergeSubModelHelper = class {
  constructor() {
    /**
     * dsl解析包
     *
     * @author tony001
     * @date 2024-09-26 16:09:48
     * @protected
     */
    this.dsl = new DSLHelper();
  }
  /**
   * 合并应用主菜单
   *
   * @author tony001
   * @date 2024-09-26 16:09:03
   * @param {(IControl[] | undefined)} controls
   * @param {ISubAppRef[]} subAppRefs
   */
  mergeAppMainMenu(view, controls, subAppRefs) {
    const dstAppMenu = controls == null ? void 0 : controls.find((item) => {
      return item.controlType === "APPMENU" && item.name === "appmenu";
    });
    if (dstAppMenu) {
      for (let i = 0; i < subAppRefs.length; i++) {
        const srcAppMenu = subAppRefs[i].appMenuModel;
        if (srcAppMenu) {
          mergeAppMenu(dstAppMenu, srcAppMenu);
        }
      }
    }
  }
  /**
   * 合并扩展菜单
   *
   * @author tony001
   * @date 2024-09-26 16:09:27
   * @param {(IControl[] | undefined)} controls
   * @param {ISubAppRef[]} subAppRefs
   * @return {*}  {void}
   */
  mergeSubAppExtendedMenu(view, controls, subAppRefs) {
    if (view.viewType !== "APPINDEXVIEW" || !controls)
      return;
    const dstAppMenus = controls.filter((item) => {
      return item.controlType === "APPMENU" && item.name !== "appmenu";
    });
    if (dstAppMenus && dstAppMenus.length > 0) {
      for (let i = 0; i < dstAppMenus.length; i++) {
        const dstAppMenu = dstAppMenus[i];
        if (dstAppMenu && dstAppMenu.name) {
          for (let j = 0; j < subAppRefs.length; j++) {
            const srcAppMenu = ibiz.hub.getSubAppMenuModel(
              dstAppMenu.name,
              subAppRefs[j].appId
            );
            if (srcAppMenu) {
              mergeAppMenu(dstAppMenu, srcAppMenu);
            }
          }
        }
      }
    }
  }
  /**
   * 合并DRCtrl
   *
   * @author tony001
   * @date 2024-09-26 16:09:01
   * @param {IAppView} view
   * @param {(IControl[] | undefined)} controls
   * @param {ISubAppRef[]} subAppRefs
   */
  mergeSubAppDRCtrl(view, controls, subAppRefs) {
    const dstDRCtrl = controls == null ? void 0 : controls.find((item) => {
      return item.controlType === "DRBAR" || item.controlType === "DRTAB";
    });
    if (dstDRCtrl) {
      for (let i = 0; i < subAppRefs.length; i++) {
        const srcDRCtrl = ibiz.hub.getSubAppDrControl(
          "".concat(dstDRCtrl.appDataEntityId.split(".")[1], "_").concat(dstDRCtrl.modelType, "_").concat(dstDRCtrl.dataRelationTag).toLowerCase(),
          subAppRefs[i].appId
        );
        if (srcDRCtrl) {
          mergeDEDrControl(dstDRCtrl, srcDRCtrl);
        }
      }
    }
  }
  /**
   * 合并工具栏界面行为组项
   *
   * @author tony001
   * @date 2024-09-26 16:09:23
   * @param {IAppView} view
   * @param {(IControl[] | undefined)} controls
   * @param {ISubAppRef[]} subAppRefs
   */
  mergeSubAppToolbarActionGroup(view, controls, subAppRefs) {
    if (!controls)
      return;
    const dstToolBar = controls.find((item) => {
      return item.controlType === "TOOLBAR";
    });
    if (dstToolBar && dstToolBar.detoolbarItems) {
      const dstToolBarItems = dstToolBar.detoolbarItems;
      if (dstToolBarItems && dstToolBarItems.length > 0) {
        for (let i = 0; i < dstToolBarItems.length; i++) {
          const dstToolBarItem = dstToolBarItems[i];
          if (dstToolBarItem && dstToolBarItem.uiactionGroup) {
            const dstUIActionGroup = dstToolBarItem.uiactionGroup;
            if (dstUIActionGroup) {
              for (let j = 0; j < subAppRefs.length; j++) {
                if (subAppRefs[j].appId === view.appId) {
                  continue;
                }
                const srcAppDEUIActionGroup = ibiz.hub.getSubAppDEUIActionGroups(
                  dstUIActionGroup.uniqueTag,
                  subAppRefs[j].appId
                );
                if (srcAppDEUIActionGroup) {
                  mergeAppDEUIActionGroup(
                    dstToolBarItems[i].uiactionGroup,
                    srcAppDEUIActionGroup
                  );
                }
              }
            }
          }
        }
      }
    }
    controls.forEach((control) => {
      if (control && control.controls) {
        this.mergeSubAppToolbarActionGroup(
          view,
          control.controls,
          subAppRefs
        );
      }
    });
  }
  /**
   * 合并树上下文菜单
   *
   * @author tony001
   * @date 2024-09-26 16:09:02
   * @param {IAppView} view
   * @param {(IControl[] | undefined)} controls
   * @param {ISubAppRef[]} subAppRefs
   */
  mergeSubAppTreeContextMenuActionGroup(view, controls, subAppRefs) {
    var _a, _b;
    if (!controls)
      return;
    const dstTree = controls.find((item) => {
      return item.controlType === "TREEVIEW";
    });
    if (dstTree && dstTree.controls && dstTree.controls.length > 0) {
      const dstContextMenus = (_a = dstTree.controls) == null ? void 0 : _a.filter((item) => {
        return item.controlType === "CONTEXTMENU";
      });
      if (dstContextMenus && dstContextMenus.length > 0) {
        for (let k = 0; k < dstContextMenus.length; k++) {
          const dstContextMenu = dstContextMenus[k];
          if (dstContextMenu && dstContextMenu.detoolbarItems) {
            const dstContextMenuItems = dstContextMenu.detoolbarItems;
            if (dstContextMenuItems && dstContextMenuItems.length > 0) {
              for (let i = 0; i < dstContextMenuItems.length; i++) {
                const dstContextMenuItem = dstContextMenuItems[i];
                if (dstContextMenuItem && dstContextMenuItem.uiactionGroup) {
                  const dstUIActionGroup = dstContextMenuItem.uiactionGroup;
                  if (dstUIActionGroup) {
                    for (let j = 0; j < subAppRefs.length; j++) {
                      const srcAppDEUIActionGroup = ibiz.hub.getSubAppDEUIActionGroups(
                        dstUIActionGroup.uniqueTag,
                        subAppRefs[j].appId
                      );
                      if (srcAppDEUIActionGroup) {
                        mergeAppDEUIActionGroup(
                          dstContextMenuItems[i].uiactionGroup,
                          srcAppDEUIActionGroup
                        );
                        const targetDeTreeNode = (_b = dstTree.detreeNodes) == null ? void 0 : _b.find(
                          (treeNode) => {
                            return treeNode.decontextMenu && treeNode.decontextMenu.modelId === dstContextMenu.modelId;
                          }
                        );
                        if (targetDeTreeNode) {
                          targetDeTreeNode.decontextMenu = dstContextMenu;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    controls.forEach((control) => {
      if (control && control.controls) {
        this.mergeSubAppTreeContextMenuActionGroup(
          view,
          control.controls,
          subAppRefs
        );
      }
    });
  }
  mergeSubAppTreeView(view, controls, subAppRefs) {
    if (!controls)
      return;
    const dstTree = controls.find((item) => {
      return item.controlType === "TREEVIEW";
    });
    if (dstTree) {
      const ids = dstTree.id.split(".");
      for (let i = 0; i < subAppRefs.length; i++) {
        const srcTree = ibiz.hub.getSubAppControl(
          ids[1] + ids[2],
          subAppRefs[i].appId
        );
        if (srcTree) {
          mergeTreeView(dstTree, srcTree);
        }
      }
    }
    controls.forEach((control) => {
      if (control && control.controls) {
        this.mergeSubAppTreeView(view, control.controls, subAppRefs);
      }
    });
  }
};

// src/model/PSSYSAPP.ts
var PSSysApp = {
  getAllPSAppDEUIActions: {
    New: {
      refreshMode: 1,
      reloadData: true,
      showBusyIndicator: true
    },
    Save: {
      showBusyIndicator: false
    }
  }
};

// src/model-util.ts
var ModelUtil = class {
  /**
   * Creates an instance of GlobalModel.
   *
   * @author chitanda
   * @date 2023-04-13 21:04:21
   * @param {string}appId 应用标识
   * @param {string} modelTag
   * @param {(url: string, params?: IParams) => Promise<IModel>} get 模型加载方法
   * @param {boolean} hub 是否为 hub 应用基座
   * @param {IParams} appContext 应用级上下文参数
   */
  constructor(appId, modelTag, get, hub, appContext, permission = true) {
    this.appId = appId;
    this.modelTag = modelTag;
    this.get = get;
    this.hub = hub;
    this.appContext = appContext;
    this.permission = permission;
    /**
     * 模型缓存
     *
     * @author chitanda
     * @date 2023-04-16 17:04:40
     * @protected
     * @type {Map<string, IModel>}
     */
    this.modelCache = /* @__PURE__ */ new Map();
  }
  /**
   * 在使用前需要初始化，来进行异步加载
   *
   * @author chitanda
   * @date 2023-04-16 17:04:35
   * @return {*}  {Promise<void>}
   */
  async init() {
    await this.getAppModel();
    await this.specialHandling();
    {
      const { cache } = this.appModel;
      if (cache) {
        const views = cache.getPSAppViews;
        if (views) {
          views.forEach((item) => {
            item.path = item.dynaModelFilePath;
            const appPath = this.calcAppPath(item.path);
            this.modelCache.set(appPath, item);
          });
          if (this.appModel.getAllPSAppViews == null) {
            this.appModel.getAllPSAppViews = views;
          } else {
            this.appModel.getAllPSAppViews.push(...views);
          }
        }
      }
    }
    const allDataEntities = this.appModel.getAllPSAppDataEntities || [];
    allDataEntities.forEach((item) => {
      item.id = calcUniqueTag(item, false);
    });
    const allViews = this.appModel.getAllPSAppViews || [];
    allViews.forEach((item) => {
      item.id = calcUniqueTag(item, false);
    });
    const allAppDERSs = this.appModel.getAllPSAppDERSs || [];
    allAppDERSs.forEach((item) => {
      const major = item.getMajorPSAppDataEntity;
      const minor = item.getMinorPSAppDataEntity;
      item.majorAppDataEntityId = calcUniqueTag(major, false);
      item.minorAppDataEntityId = calcUniqueTag(minor, false);
    });
    this.servicePathUtil = new ServicePathUtil(
      allDataEntities,
      allAppDERSs,
      this
    );
    if (this.appModel.getAllPSAppLans && this.appModel.getAllPSAppLans.length > 0) {
      ibiz.env.isEnableMultiLan = true;
    } else {
      ibiz.env.isEnableMultiLan = false;
    }
  }
  /**
   * 特殊处理应用模型
   *
   * @author chitanda
   * @date 2023-09-21 15:09:07
   * @protected
   * @return {*}  {Promise<void>}
   */
  async specialHandling() {
    if (this.appModel.getAllPSAppDEUIActions) {
      mergeModel(
        this.appModel.getAllPSAppDEUIActions,
        PSSysApp.getAllPSAppDEUIActions,
        "codeName"
      );
    }
  }
  /**
   * 获取应用模型
   *
   * @author chitanda
   * @date 2023-04-16 17:04:21
   * @return {*}  {Promise<IModel>}
   */
  async getAppModel() {
    if (!this.appModel) {
      let appPath = "/PSSYSAPP.json";
      if (this.hub && ibiz.env.hub) {
        appPath = "/PSSYSAPP.hub.json";
      }
      if (this.permission === false) {
        appPath = "/simple/PSSYSAPP.simple.json";
      }
      this.appModel = await this.getModel(appPath);
      this.appModel.id = this.appId;
    }
    return this.appModel;
  }
  /**
   * 加载应用模型全局样式
   *
   * @author chitanda
   * @date 2023-09-06 10:09:11
   * @return {*}  {(Promise<string | null>)}
   */
  async getAppStyle() {
    let style = "";
    try {
      let stylePath = "/PSSYSAPP.json.css";
      if (this.hub && ibiz.env.hub) {
        stylePath = "/PSSYSAPP.hubsubapp.json.css";
      }
      if (this.permission === false) {
        stylePath = "/simple/PSSYSAPP.simple.json.css";
      }
      style = await this.getStyleModel(stylePath);
      if (style) {
        return style;
      }
    } catch (error) {
      ibiz.log.error(error);
    }
    return null;
  }
  /**
   * 根据应用实体 codeName 或者 id 获取应用实体模型
   *
   * @author chitanda
   * @date 2023-04-16 18:04:45
   * @param {string} tag
   * @param {boolean} [isId=true]
   * @param {boolean} [ignoreCase=false]
   * @return {*}  {Promise<IModel>}
   */
  async getAppDataEntityModel(tag, isId = true, ignoreCase = false) {
    const allDataEntities = this.appModel.getAllPSAppDataEntities;
    if (allDataEntities && allDataEntities.length > 0) {
      const lowerTag = tag.toLowerCase();
      let dataEntity;
      if (isId) {
        dataEntity = allDataEntities.find((v) => {
          if (ignoreCase) {
            return v.id.toLowerCase() === lowerTag;
          }
          return v.id === tag;
        });
      } else {
        dataEntity = allDataEntities.find((v) => {
          if (ignoreCase) {
            return v.codeName.toLowerCase() === lowerTag;
          }
          return v.codeName === tag;
        });
      }
      if (dataEntity) {
        return this.getModel(dataEntity.path);
      }
    }
    throw new Error(
      ibiz.i18n.t("modelHelper.noFoundEntity", { appId: this.appId, tag })
    );
  }
  /**
   * 根据应用视图 id 获取应用视图模型,如果给了 params 则每次都会重新加载模型
   *
   * @author chitanda
   * @date 2024-01-15 12:01:36
   * @param {string} tag
   * @param {IParams} [params]
   * @param {boolean} [isDynamic]
   * @return {*}  {Promise<IModel>}
   */
  async getAppViewModel(tag, params, isDynamic) {
    const allViews = this.appModel.getAllPSAppViews;
    if (allViews && allViews.length > 0) {
      const lowerTag = tag.toLowerCase();
      const exTag = ".".concat(lowerTag);
      const view = allViews.find(
        (v) => v.id.endsWith(exTag) || v.id === lowerTag
      );
      if (view) {
        return this.getModel(view.path, params, isDynamic);
      }
    }
    throw new Error(
      ibiz.i18n.t("modelHelper.noFoundView", { appId: this.appId, tag })
    );
  }
  /**
   * 加载应用多语言模型
   *
   * @author chitanda
   * @date 2023-08-24 22:08:23
   * @param {string} language
   * @return {*}  {Promise<IModel>}
   */
  async getPSAppLang(language) {
    const app = await this.getAppModel();
    if (app.getAllPSAppLans) {
      const langs = app.getAllPSAppLans;
      const lang = langs.find((item) => item.language === language);
      if (lang) {
        return this.getModel(lang.path);
      }
      ibiz.log.error(ibiz.i18n.t("modelHelper.noSupported", { language }));
    }
    return {};
  }
  /**
   * 加载应用样式字符串
   *
   * @author chitanda
   * @date 2023-09-07 11:09:11
   * @param {string} modelPath
   * @return {*}  {Promise<string>}
   */
  getStyleModel(modelPath) {
    let url;
    if (this.hub) {
      url = this.calcAppPath(modelPath);
    } else {
      url = this.calcSubAppPath(modelPath);
    }
    return this.get(url);
  }
  /**
   * 获取应用智能报表体系集合
   *
   * @author tony001
   * @date 2024-06-04 16:06:19
   * @param {IModel[]} model
   * @return {*}  {Promise<IModel[]>}
   */
  async getAppBISchemeModel(model = []) {
    const appBISchemeModel = [];
    if (model.length > 0) {
      for (let i = 0; i < model.length; i++) {
        const appBISchemeItem = await this.getModel(model[i].path);
        appBISchemeModel.push(appBISchemeItem);
      }
    }
    return appBISchemeModel;
  }
  /**
   * 获取应用智能报表立方体数据集合
   *
   * @author tony001
   * @date 2024-06-04 16:06:19
   * @param {IModel[]} [model=[]]
   * @return {*}  {Promise<IModel[]>}
   */
  async getAppAppBICubes(model = []) {
    const appBICubeModel = [];
    if (model.length > 0) {
      for (let i = 0; i < model.length; i++) {
        const appBICubeItem = await this.getModel(model[i].path);
        appBICubeModel.push(appBICubeItem);
      }
    }
    return appBICubeModel;
  }
  /**
   * 获取应用智能报表数据集合
   *
   * @author tony001
   * @date 2024-06-04 16:06:29
   * @param {IModel[]} [model=[]]
   * @return {*}  {Promise<IModel[]>}
   */
  async getAppBIReports(model = []) {
    const appBIReportModel = [];
    if (model.length > 0) {
      for (let i = 0; i < model.length; i++) {
        const appBIReportItem = await this.getModel(model[i].path);
        appBIReportModel.push(appBIReportItem);
      }
    }
    return appBIReportModel;
  }
  /**
   * 加载模型，如果给了 params 则不会缓存模型
   *
   * @author chitanda
   * @date 2024-01-15 12:01:57
   * @param {string} modelPath
   * @param {IParams} [params]
   * @param {boolean} [isDynamic]
   * @return {*}  {Promise<IModel>}
   */
  async getModel(modelPath, params, isDynamic) {
    let url;
    if (this.hub) {
      url = this.calcAppPath(modelPath, isDynamic);
    } else {
      url = this.calcSubAppPath(modelPath, isDynamic);
    }
    const isParams = params && !isEmpty_default(params);
    if (this.modelCache.has(url) && !isParams) {
      return this.modelCache.get(url);
    }
    const model = await this.get(url, params);
    if (!isParams) {
      this.modelCache.set(url, model);
    }
    this.deepFillAppId(model);
    return model;
  }
  /**
   * 递归填充应用标识
   *
   * @author chitanda
   * @date 2023-08-21 10:08:41
   * @protected
   * @param {IModel} model
   */
  deepFillAppId(model) {
    model.appId = this.appId;
    const keys4 = Object.keys(model);
    keys4.forEach((key) => {
      const value = model[key];
      if (value && typeof value === "object") {
        if (Array.isArray(value)) {
          value.forEach((item) => {
            if (item && typeof item === "object") {
              this.deepFillAppId(item);
            }
          });
        } else {
          this.deepFillAppId(value);
        }
      }
    });
  }
  /**
   * 计算应用模型请求路径
   *
   * @author chitanda
   * @date 2024-01-15 12:01:45
   * @protected
   * @param {string} modelPath
   * @param {boolean} [isDynamic=false]
   * @return {*}  {string}
   */
  calcAppPath(modelPath, isDynamic = false) {
    if (isDynamic) {
      return formatPath(modelPath);
    }
    return "".concat(formatPath(modelPath)).concat(this.modelTag ? "?dynamodeltag=".concat(this.modelTag).concat(this.appContext && this.appContext.srfembsubapp ? "&srfembsubapp=".concat(this.appContext.srfembsubapp) : "") : "");
  }
  /**
   * 计算子应用模型请求路径
   *
   * @author chitanda
   * @date 2024-01-15 12:01:39
   * @protected
   * @param {string} modelPath
   * @param {boolean} [isDynamic=false]
   * @return {*}  {string}
   */
  calcSubAppPath(modelPath, isDynamic = false) {
    if (isDynamic) {
      return "/subapps/".concat(this.appId).concat(formatPath(modelPath));
    }
    return "/subapps/".concat(this.appId).concat(formatPath(modelPath), "?dynamodeltag=").concat(this.modelTag);
  }
};

// src/model-loader.ts
var ModelLoader = class {
  constructor(helper) {
    this.helper = helper;
  }
  initApp(id) {
    return this.helper.initApp(id);
  }
  getApp(id) {
    return this.helper.getAppModel(id);
  }
  getSubAppRef(appId) {
    return this.helper.getSubAppRef(appId);
  }
  getAppView(appId, codeName) {
    return this.helper.getAppViewModel(codeName, appId);
  }
  getAppDataEntity(appId, id) {
    return this.helper.getAppDataEntityModel(id, appId);
  }
  getAppDataEntityByCodeName(appId, codeName) {
    return this.helper.getAppDataEntityModel(codeName, appId, false);
  }
  getAppStyle(appId) {
    return this.helper.getAppStyle(appId);
  }
  loadAppView(appId, viewId, params) {
    return this.helper.loadAppViewModel(viewId, params, appId);
  }
  getAppBISchemes(appId, ids) {
    return this.helper.getAppBISchemes(appId, ids);
  }
  getAppAppBICubes(appId, ids) {
    return this.helper.getAppAppBICubes(appId, ids);
  }
  getAppBIReports(appId, ids) {
    return this.helper.getAppBIReports(appId, ids);
  }
  translationModelToDsl(data, type3) {
    return this.helper.translationModelToDsl(data, type3);
  }
};

// src/model-helper.ts
var ModelHelper = class {
  /**
   * Creates an instance of ModelHelper.
   * @author chitanda
   * @date 2024-01-08 10:01:20
   * @param {(url: string, params?: IParams) => Promise<IModel>} getModel 模型加载方法
   * @param {string} defaultAppId 默认应用标识
   * @param {string} appContext 应用级上下文参数
   * @param {boolean} [permission=true] 是否启用权限
   */
  constructor(getModel, defaultAppId, appContext, permission = true) {
    this.getModel = getModel;
    this.defaultAppId = defaultAppId;
    this.appContext = appContext;
    this.permission = permission;
    /**
     * dsl解析包
     *
     * @author tony001
     * @date 2024-09-26 16:09:49
     * @protected
     */
    this.dsl = new DSLHelper();
    /**
     * 子应用模型合并对象
     *
     * @author tony001
     * @date 2024-09-26 16:09:51
     * @protected
     */
    this.merge = new MergeSubModelHelper();
    /**
     * 当前子应用清单
     *
     * @author chitanda
     * @date 2023-12-06 15:12:30
     * @protected
     * @type {ISubAppRef[]}
     */
    this.subAppRefs = [];
    /**
     * 模型获取工具类缓存
     *
     * @author chitanda
     * @date 2023-04-16 17:04:56
     * @protected
     * @type {Map<string, ModelUtil>}
     */
    this.cache = /* @__PURE__ */ new Map();
    ibiz.hub.registerModelLoaderProvider(new ModelLoader(this));
  }
  /**
   * 初始化应用内容
   *
   * @author chitanda
   * @date 2023-12-06 17:12:51
   * @param {string} [id]
   * @return {*}  {Promise<boolean>}
   */
  async initApp(id) {
    await this.initToHub(id);
    return true;
  }
  /**
   * 初始化具体应用模型工具类
   *
   * @author chitanda
   * @date 2023-04-16 17:04:41
   * @param {string} modelTag
   * @param {string} [appId=this.defaultAppId]
   * @return {*}  {Promise<void>}
   */
  async initModelUtil(modelTag, appId = this.defaultAppId) {
    const modelUtil = new ModelUtil(
      appId,
      modelTag,
      this.getModel,
      this.defaultAppId === appId,
      this.appContext,
      this.permission
    );
    await modelUtil.init();
    this.cache.set(appId, modelUtil);
  }
  /**
   * 初始化模型至Hub中
   *
   * @author chitanda
   * @date 2023-04-17 14:04:55
   * @protected
   * @param {(string | IObject)} [appId]
   * @return {*}  {Promise<void>}
   */
  async initToHub(appId) {
    const id = this.calcAppId(appId);
    const app = ibiz.hub.getApp(id);
    const modelUtil = this.getModelUtil(appId);
    const appSourceModel = await modelUtil.getAppModel();
    if (appSourceModel.getAllPSAppViews && appId === ibiz.env.appId) {
      const appViews = appSourceModel.getAllPSAppViews;
      appViews.forEach((appView) => {
        ibiz.hub.setAppView(appView.id, appSourceModel.id, appView.priority);
        if (appView.defaultPage === true) {
          ibiz.hub.defaultPage = appView;
        }
      });
    }
    if (appSourceModel.getAllPSAppPFPluginRefs && appId === ibiz.env.appId) {
      const appPFPluginRefs = appSourceModel.getAllPSAppPFPluginRefs;
      appPFPluginRefs.forEach((appPFPluginRef) => {
        ibiz.hub.setPlugin(this.dsl.appPFPluginRef(appPFPluginRef));
      });
    }
    if (appSourceModel.getDefaultPSAppIndexView) {
      const view = appSourceModel.getDefaultPSAppIndexView;
      const name = view.path.split("/").pop().replace(".json", "");
      ibiz.hub.defaultAppIndexViewName = name;
      if (!ibiz.env.AppTitle) {
        if (appSourceModel.caption) {
          ibiz.env.AppTitle = appSourceModel.caption;
        } else {
          const views = appSourceModel.cache.getPSAppViews;
          const indexView = views.find(
            (viewItem) => viewItem.dynaModelFilePath === view.path
          );
          if (indexView) {
            ibiz.env.AppTitle = indexView.caption;
          }
        }
      }
    }
    if (appSourceModel.getAllPSAppCodeLists) {
      const codeLists = appSourceModel.getAllPSAppCodeLists;
      codeLists.forEach((codeList) => {
        app.codeList.setCodeList(
          this.dsl.appCodeList(codeList)
        );
      });
    }
    if (appSourceModel.getAllPSAppDataEntities) {
      const dataEntities = appSourceModel.getAllPSAppDataEntities;
      dataEntities.forEach((dataEntity) => {
        app.deName2DeCodeName.set(dataEntity.name, dataEntity.codeName);
      });
    }
    if (appSourceModel.getAllPSAppBISchemes) {
      const allAppBISchemes = appSourceModel.getAllPSAppBISchemes;
      allAppBISchemes.forEach((biScheme) => {
        app.appBISchemeMap.set(calcUniqueTag(biScheme), biScheme);
      });
    }
    const subViewRefs = app.model.appSubViewTypeRefs || [];
    subViewRefs.forEach((item) => {
      if (item.replaceDefault) {
        ibiz.util.layoutPanel.register(
          "".concat(item.viewType, "_DEFAULT"),
          item.viewLayoutPanel
        );
      }
    });
    {
      const { subAppRefs = [] } = app.model;
      const { getAllPSSubAppRefs = [] } = appSourceModel;
      for (let i = 0; i < subAppRefs.length; i++) {
        const subApp = subAppRefs[i];
        const sourceSubApp = getAllPSSubAppRefs[i];
        await this.initSubApp(app, subApp, sourceSubApp);
      }
    }
  }
  /**
   * 递归填充指定应用标识
   *
   * @author tony001
   * @date 2024-09-09 15:09:20
   * @protected
   * @param {IModel} model
   * @param {string} appId
   */
  deepFillSubAppId(model, appId) {
    model.appId = appId;
    const keys4 = Object.keys(model);
    keys4.forEach((key) => {
      const value = model[key];
      if (value && typeof value === "object") {
        if (Array.isArray(value)) {
          value.forEach((item) => {
            if (item && typeof item === "object") {
              this.deepFillSubAppId(item, appId);
            }
          });
        } else {
          this.deepFillSubAppId(value, appId);
        }
      }
    });
  }
  /**
   * 初始化子应用相关内容
   *
   * @author chitanda
   * @date 2023-12-06 15:12:23
   * @protected
   * @param {IApplication} app
   * @param {ISubAppRef} subApp
   * @return {*}  {Promise<void>}
   */
  async initSubApp(app, subApp, sourceSubApp) {
    this.subAppRefs.push(subApp);
    const viewIds = subApp.appViewIds || [];
    const views = sourceSubApp.getAllPSAppViews || [];
    viewIds.forEach((id, index) => {
      const view = views[index];
      ibiz.hub.setAppView(id, subApp.id, view.priority);
    });
    const appPFPluginRefs = sourceSubApp.getAllPSAppPFPluginRefs || [];
    appPFPluginRefs.forEach((appPFPluginRef) => {
      const appPluginRef = this.dsl.appPFPluginRef(appPFPluginRef);
      appPluginRef.appId = subApp.id;
      ibiz.hub.setPlugin(appPluginRef, subApp.id);
    });
    const drCtrlIds = subApp.dedrcontrolIds || [];
    const drCtrls = this.dsl.controls(sourceSubApp.getAllPSDEDRControls || []);
    drCtrlIds.forEach((id, index) => {
      const drCtrl = drCtrls[index];
      ibiz.hub.registerSubAppDrControls(subApp.id || ibiz.env.appId, drCtrl);
    });
    const appDEUIActionGroupIds = subApp.appDEUIActionGroupIds || [];
    const appDEUIActionGroups = sourceSubApp.getAllPSAppDEUIActionGroups || [];
    appDEUIActionGroupIds.forEach((id, index) => {
      const appDEUIActionGroup = appDEUIActionGroups[index];
      this.deepFillSubAppId(appDEUIActionGroup, subApp.id);
      ibiz.hub.registerSubAppDEUIActionGroups(
        subApp.id || ibiz.env.appId,
        this.dsl.uiActionGroups(appDEUIActionGroup)
      );
    });
    const appMenuModelIds = subApp.appMenuModelIds || [];
    const appMenuModels = sourceSubApp.getAllPSAppMenuModels || [];
    appMenuModelIds.forEach((id, index) => {
      const appMenuModel = appMenuModels[index];
      this.deepFillSubAppId(appMenuModel, subApp.id);
      ibiz.hub.registerSubAppMenuModels(
        subApp.id || ibiz.env.appId,
        this.dsl.control(appMenuModel)
      );
    });
    const controlIds = subApp.controlIds || [];
    const appControls = sourceSubApp.getAllPSControls || [];
    controlIds.forEach((id, index) => {
      const appControl = appControls[index];
      this.deepFillSubAppId(appControl, subApp.id);
      ibiz.hub.registerSubAppControls(
        subApp.id || ibiz.env.appId,
        this.dsl.control(appControl)
      );
    });
    if (this.appContext.srfembsubapp && subApp.id && subApp.id.startsWith(this.appContext.srfembsubapp)) {
      await ibiz.hub.createApp(subApp.id);
    }
  }
  /**
   * 获取应用模型
   *
   * @author chitanda
   * @date 2023-04-16 17:04:13
   * @param {(string | IObject)} [appId]
   * @return {*}  {Promise<IApplication>}
   */
  async getAppModel(appId) {
    const id = this.calcAppId(appId);
    if (!this.cache.has(id)) {
      const data = ibiz.appData || {};
      await this.initModelUtil(data.dynamodeltag, id);
    }
    const model = await this.getModelUtil(appId).getAppModel();
    const app = this.dsl.application(model);
    if (this.appContext.srfembsubapp && appId && appId.startsWith(this.appContext.srfembsubapp)) {
      if (model.getDefaultPSAppIndexView) {
        const view = model.getDefaultPSAppIndexView;
        const name = view.path.split("/").pop().replace(".json", "");
        ibiz.hub.defaultAppIndexViewName = name;
        if (!ibiz.env.AppTitle) {
          if (model.caption) {
            ibiz.env.AppTitle = model.caption;
          } else {
            const views = model.cache.getPSAppViews;
            const indexView = views.find(
              (viewItem) => viewItem.dynaModelFilePath === view.path
            );
            if (indexView) {
              ibiz.env.AppTitle = indexView.caption;
            }
          }
        }
      }
    }
    return app;
  }
  /**
   * 获取子应用引用模型
   *
   * @author tony001
   * @date 2024-06-23 15:06:31
   * @param {string} appId
   * @return {*}  {(Promise<ISubAppRef | undefined>)}
   */
  async getSubAppRef(appId) {
    return this.subAppRefs.find((subApp) => {
      return subApp.appId === appId;
    });
  }
  /**
   * 获取应用全局样式
   *
   * @author chitanda
   * @date 2023-09-06 10:09:48
   * @param {(string | IObject)} [appId]
   * @return {*}  {(Promise<string | null>)}
   */
  getAppStyle(appId) {
    return this.getModelUtil(appId).getAppStyle();
  }
  /**
   * 根据应用实体 codeName 获取应用实体模型
   *
   * @author chitanda
   * @date 2023-04-16 18:04:33
   * @param {string} name
   * @param {(string | IObject)} [appId]
   * @param {boolean} [isId]
   * @return {*}  {Promise<IAppDataEntity>}
   */
  async getAppDataEntityModel(name, appId, isId) {
    const util = this.getModelUtil(appId);
    const model = await util.getAppDataEntityModel(name, isId, true);
    const dsl = this.dsl.appDataEntity(model);
    const list = await util.servicePathUtil.calcRequestPaths(dsl.id);
    dsl.requestPaths = list;
    dsl.codeName2 = plural(dsl.codeName.toLowerCase());
    dsl.defullTag = calcUniqueTag(
      model.getPSDataEntity,
      false,
      false
    );
    if (dsl.deapicodeName) {
      if (!dsl.deapicodeName2) {
        dsl.deapicodeName2 = plural(dsl.deapicodeName);
      }
      const { engineVer } = await util.getAppModel();
      if (!engineVer || engineVer < 240) {
        dsl.deapicodeName2 = dsl.deapicodeName2.toLowerCase();
      }
    }
    return dsl;
  }
  /**
   * 计算应用视图需要合并的子应用模型
   *
   * @author chitanda
   * @date 2023-12-06 16:12:25
   * @protected
   * @param {IAppView} view
   */
  calcAppViewSubAppModel(view) {
    var _a;
    const controls = view.controls ? view.controls : (_a = view.viewLayoutPanel) == null ? void 0 : _a.controls;
    this.merge.mergeAppMainMenu(view, controls, this.subAppRefs);
    this.merge.mergeSubAppExtendedMenu(view, controls, this.subAppRefs);
    this.merge.mergeSubAppDRCtrl(view, controls, this.subAppRefs);
    this.merge.mergeSubAppToolbarActionGroup(view, controls, this.subAppRefs);
    this.merge.mergeSubAppTreeContextMenuActionGroup(
      view,
      controls,
      this.subAppRefs
    );
    this.merge.mergeSubAppTreeView(view, controls, this.subAppRefs);
  }
  /**
   * 根据应用视图 codeName 获取应用视图模型
   *
   * @author chitanda
   * @date 2023-04-16 17:04:38
   * @param {string} name
   * @param {(string | IObject)} [appId]
   * @return {*}  {Promise<IAppView>}
   */
  async getAppViewModel(name, appId) {
    const model = await this.getModelUtil(appId).getAppViewModel(name);
    const dsl = this.dsl.appView(model);
    this.calcAppViewSubAppModel(dsl);
    return dsl;
  }
  /**
   * 根据路径和参数加载应用视图模型，主要用于后台根据运行时参数重新计算视图模型
   *
   * @author chitanda
   * @date 2024-01-08 10:01:43
   * @param {string} viewId
   * @param {IParams} [params]
   * @param {string} [appId]
   * @return {*}  {Promise<IAppView>}
   */
  async loadAppViewModel(viewId, params, appId) {
    const model = await this.getModelUtil(appId).getAppViewModel(
      viewId,
      params,
      true
    );
    const dsl = this.dsl.appView(model);
    this.calcAppViewSubAppModel(dsl);
    return dsl;
  }
  /**
   * 获取应用多语言模型
   *
   * @author chitanda
   * @date 2023-08-24 21:08:17
   * @param {string} language
   * @param {(string | IObject)} [appId]
   * @return {*}  {Promise<IAppLan>}
   */
  async getPSAppLang(language, appId) {
    const model = await this.getModelUtil(appId).getPSAppLang(language);
    return this.dsl.appLan(model);
  }
  /**
   * 获取应用智能报表体系集合
   *
   * @author tony001
   * @date 2024-06-04 15:06:46
   * @param {string} appId 应用标识
   * @param {string[]} ids 智能报表体系标识集合
   * @return {*}  {Promise<IAppBIScheme[]>}
   */
  async getAppBISchemes(appId, ids = []) {
    var _a, _b;
    const tag = this.calcAppId(appId);
    const app = ibiz.hub.getApp(tag);
    const modelUtil = this.getModelUtil(appId);
    const appBISchemes = [];
    if (ids.length === 0) {
      ids = app.model.appBISchemeIds || [];
    }
    if (ids.length > 0) {
      const sourceModel = ids.map((id) => {
        return app.appBISchemeMap.get(id);
      });
      const models = await modelUtil.getAppBISchemeModel(sourceModel);
      if (models && models.length > 0) {
        for (let i = 0; i < models.length; i++) {
          const model = models[i];
          if (((_a = model.getPSAppBICubes) == null ? void 0 : _a.length) > 0) {
            for (let m = 0; m < model.getPSAppBICubes.length; m++) {
              app.appBICubeMap.set(
                calcUniqueTag(model.getPSAppBICubes[m]),
                model.getPSAppBICubes[m]
              );
            }
          }
          if (((_b = model.getPSAppBIReports) == null ? void 0 : _b.length) > 0) {
            for (let n = 0; n < model.getPSAppBIReports.length; n++) {
              app.appBIReportMap.set(
                calcUniqueTag(model.getPSAppBIReports[n]),
                model.getPSAppBIReports[n]
              );
            }
          }
          appBISchemes.push(this.dsl.appBIScheme(model));
        }
      }
    }
    return appBISchemes;
  }
  /**
   * 获取应用智能报表立方体集合
   *
   * @author tony001
   * @date 2024-06-04 16:06:19
   * @param {string} appId 应用标识
   * @param {string[]} [ids=[]] 立方体数据标识集合
   * @return {*}  {Promise<IAppBICube[]>}
   */
  async getAppAppBICubes(appId, ids = []) {
    const tag = this.calcAppId(appId);
    const app = ibiz.hub.getApp(tag);
    const modelUtil = this.getModelUtil(appId);
    const appBICubes = [];
    if (ids.length === 0) {
      return appBICubes;
    }
    if (ids.length > 0) {
      const sourceModel = [];
      const noExistIds = [];
      ids.forEach((id) => {
        const tempCube = app.appBICubeMap.get(id);
        if (tempCube) {
          sourceModel.push(tempCube);
        } else {
          noExistIds.push(id);
        }
      });
      if (noExistIds.length > 0) {
        await this.getAppBISchemes(appId);
        noExistIds.forEach((id) => {
          const tempCube = app.appBICubeMap.get(id);
          if (tempCube) {
            sourceModel.push(tempCube);
          }
        });
      }
      const models = await modelUtil.getAppAppBICubes(sourceModel);
      if (models && models.length > 0) {
        for (let i = 0; i < models.length; i++) {
          const model = models[i];
          appBICubes.push(this.dsl.appBICube(model));
        }
      }
    }
    return appBICubes;
  }
  /**
   * 获取应用智能报表集合
   *
   * @author tony001
   * @date 2024-06-04 16:06:39
   * @param {string} appId 应用标识
   * @param {string[]} [ids=[]] 报表数据标识集合
   * @return {*}  {Promise<IAppBIReport[]>}
   */
  async getAppBIReports(appId, ids = []) {
    const tag = this.calcAppId(appId);
    const app = ibiz.hub.getApp(tag);
    const modelUtil = this.getModelUtil(appId);
    const appBIReports = [];
    if (ids.length === 0) {
      return appBIReports;
    }
    if (ids.length > 0) {
      const sourceModel = [];
      const noExistIds = [];
      ids.forEach((id) => {
        const tempReport = app.appBIReportMap.get(id);
        if (tempReport) {
          sourceModel.push(tempReport);
        } else {
          noExistIds.push(id);
        }
      });
      if (noExistIds.length > 0) {
        await this.getAppBISchemes(appId);
        noExistIds.forEach((id) => {
          const tempReport = app.appBIReportMap.get(id);
          if (tempReport) {
            sourceModel.push(tempReport);
          }
        });
      }
      const models = await modelUtil.getAppBIReports(sourceModel);
      if (models && models.length > 0) {
        for (let i = 0; i < models.length; i++) {
          const model = models[i];
          appBIReports.push(this.dsl.appBIReport(model));
        }
      }
    }
    return appBIReports;
  }
  /**
   * 原始模型转化为dsl对象
   *
   * @author tony001
   * @date 2024-06-27 17:06:54
   * @param {ModelObject} data
   * @param {('APP' | 'VIEW' | 'CTRL' | 'APPENTITY' | 'APPBIREPORT')} type
   * @return {*}  {(Promise<IData | undefined>)}
   */
  async translationModelToDsl(data, type3) {
    switch (type3) {
      case "APP":
        return this.dsl.application(data);
      case "VIEW":
        return this.dsl.appView(data);
      case "CTRL":
        return this.dsl.control(data);
      case "APPENTITY":
        return this.dsl.appDataEntity(data);
      case "APPBIREPORT":
        return this.dsl.appBIReport(data);
      default:
        break;
    }
  }
  /**
   * 获取对应模型工具类
   *
   * @author chitanda
   * @date 2023-04-16 18:04:08
   * @protected
   * @param {(IObject | string)} context
   * @return {*}  {ModelUtil}
   */
  getModelUtil(context = this.defaultAppId) {
    const appId = this.calcAppId(context);
    if (this.cache.has(appId)) {
      return this.cache.get(appId);
    }
    throw new Error(ibiz.i18n.t("modelHelper.noInitialized", { appId }));
  }
  /**
   * 计算应用标识
   *
   * @author chitanda
   * @date 2023-04-16 17:04:19
   * @protected
   * @param {(IObject | string)} [data=this.defaultAppId]
   * @return {*}  {string}
   */
  calcAppId(data = this.defaultAppId) {
    let appId;
    if (typeof data === "string") {
      appId = data;
    } else {
      appId = data.appId;
    }
    return appId;
  }
};

// src/locale/en/index.ts
var en = {
  modelHelper: {
    utils: {
      noFoundEntity: "Entity not found {id}",
      maximumTier: "Service path calculation exceeds maximum tier 10",
      circularRecursive: "A circular recursive reference appears in the computational resource relationship path, triggering the entity:",
      calculatedEntities: "Current list of calculated entities. "
    },
    noInitialized: "[{appId}] is not initialized, please call initModelUtil method to initialize it first",
    noFoundEntity: "Application [{appId}] data entity not found [{tag}]",
    noFoundView: "Application [{appId}] view not found [{tag}]",
    noSupported: "[{language}] language not supported"
  }
};

// src/locale/zh-CN/index.ts
var zhCn = {
  modelHelper: {
    utils: {
      noFoundEntity: "\u672A\u627E\u5230\u5B9E\u4F53 {id}",
      maximumTier: "\u670D\u52A1\u8DEF\u5F84\u8BA1\u7B97\u8D85\u8FC7\u6700\u5927\u5C42\u7EA7 10",
      circularRecursive: "\u8BA1\u7B97\u8D44\u6E90\u5173\u7CFB\u8DEF\u5F84\u51FA\u73B0\u5FAA\u73AF\u9012\u5F52\u5F15\u7528\uFF0C\u89E6\u53D1\u5B9E\u4F53\uFF1A",
      calculatedEntities: "\u5F53\u524D\u5DF2\u8BA1\u7B97\u8FC7\u5B9E\u4F53\u6E05\u5355: "
    },
    noInitialized: "[{appId}]\u672A\u521D\u59CB\u5316\uFF0C\u8BF7\u5148\u8C03\u7528 initModelUtil \u65B9\u6CD5\u521D\u59CB\u5316",
    noFoundEntity: "\u5E94\u7528[{appId}]\u672A\u627E\u5230\u6570\u636E\u5B9E\u4F53[{tag}]",
    noFoundView: "\u5E94\u7528[{appId}]\u672A\u627E\u5230\u89C6\u56FE[{tag}]",
    noSupported: "[{language}]\u8BED\u8A00\u672A\u652F\u6301"
  }
};
export {
  ModelHelper,
  en,
  zhCn
};
