'use strict';

var core = require('@ibiz-template/core');
var lodashEs = require('lodash-es');
var vue = require('vue');
require('../../../util/index.cjs');
var pathUtil = require('../../../util/path-util/path-util.cjs');

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class UploadAjaxError extends Error {
  constructor(message, status, method, url) {
    super(message);
    __publicField(this, "name", "UploadAjaxError");
    __publicField(this, "status");
    __publicField(this, "method");
    __publicField(this, "url");
    this.status = status;
    this.method = method;
    this.url = url;
  }
}
function getError(action, option, xhr) {
  let msg;
  if (xhr.response) {
    msg = "".concat(xhr.response.error || xhr.response);
  } else if (xhr.responseText) {
    msg = "".concat(xhr.responseText);
  } else {
    msg = "fail to ".concat(option.method, " ").concat(action, " ").concat(xhr.status);
  }
  return new UploadAjaxError(msg, xhr.status, option.method, action);
}
function getBody(xhr) {
  const text = xhr.responseText || xhr.response;
  if (!text) {
    return text;
  }
  try {
    return JSON.parse(text);
  } catch (e) {
    return text;
  }
}
let fileId = 1;
const genFileId = () => Date.now() + 36e5 + fileId++;
function useCustomUpload(c, options, emit) {
  const customUpload = (option) => {
    if (typeof XMLHttpRequest === "undefined")
      throw new core.RuntimeError("XMLHttpRequest is undefined");
    const xhr = new XMLHttpRequest();
    const action = option.action;
    if (xhr.upload && option.onProgress) {
      xhr.upload.addEventListener("progress", (evt) => {
        const progressEvt = evt;
        progressEvt.percent = evt.total > 0 ? evt.loaded / evt.total * 100 : 0;
        option.onProgress(progressEvt);
      });
    }
    const formData = new FormData();
    if (option.data) {
      for (const [key, value] of Object.entries(option.data)) {
        if (Array.isArray(value)) {
          if (value.length === 2 && value[0] instanceof Blob && lodashEs.isString(value[1])) {
            formData.append(key, value[0], value[1]);
          } else {
            value.forEach((item) => {
              formData.append(key, item);
            });
          }
        } else
          formData.append(key, value);
      }
    }
    formData.append(option.filename, option.file, option.file.name);
    if (c.unzip && c.unzipfileext) {
      const fileName = option.file.name;
      const fileExt = fileName.substring(fileName.lastIndexOf("."));
      if (c.unzipfileext.indexOf(fileExt) !== -1) {
        formData.append("unzip", "true");
      }
    }
    xhr.addEventListener("error", () => {
      if (option.onError) {
        option.onError(getError(action, option, xhr));
      }
    });
    xhr.addEventListener("load", () => {
      if (xhr.status < 200 || xhr.status >= 300) {
        return option.onError(getError(action, option, xhr));
      }
      const result = getBody(xhr);
      if (!Array.isArray(result) && !result.path && option.file && option.file.path) {
        result.path = option.file.path;
      }
      option.onSuccess(result);
    });
    xhr.open(option.method, action, true);
    if (option.withCredentials && "withCredentials" in xhr) {
      xhr.withCredentials = true;
    }
    const tempheaders = option.headers || {};
    if (tempheaders instanceof Headers) {
      tempheaders.forEach((value, key) => xhr.setRequestHeader(key, value));
    } else {
      for (const [key, value] of Object.entries(tempheaders)) {
        if (lodashEs.isNil(value))
          continue;
        xhr.setRequestHeader(key, String(value));
      }
    }
    xhr.send(formData);
    return xhr;
  };
  const folderInputRef = vue.ref(null);
  const selectFolder = () => {
    var _a;
    (_a = folderInputRef.value) == null ? void 0 : _a.click();
  };
  const handleFolderSelect = (event) => {
    const target = event.target;
    if (!target.files || target.files.length === 0)
      return;
    let files = Array.from(target.files);
    if (c.hiddenFileRegex) {
      let regex = null;
      try {
        regex = new RegExp(c.hiddenFileRegex);
      } catch (e) {
        ibiz.log.warn("hiddenFileRegex invalid: ".concat(c.hiddenFileRegex));
      }
      if (regex) {
        files = files.filter((file) => {
          const rawFile = file;
          const relativePathWithoutRoot = pathUtil.getRelativePathWithoutRoot(
            rawFile.webkitRelativePath
          );
          return !regex.test(relativePathWithoutRoot);
        });
      }
    }
    const promises = [];
    for (const file of files) {
      const rawFile = file;
      rawFile.uid = genFileId();
      rawFile.path = file.webkitRelativePath;
      if (options.addCacheCount) {
        options.addCacheCount();
      }
      const promise = new Promise((resolve) => {
        const tempOption = {
          file: rawFile,
          filename: "file",
          method: "post",
          ...options,
          onSuccess: (response) => resolve({ status: "ok", data: response }),
          onError: (error) => resolve({ status: "err", data: error, rawFile })
        };
        customUpload(tempOption);
      });
      promises.push(promise);
    }
    emit == null ? void 0 : emit("customAction", { tag: "beforeUpload", data: [...files] });
    Promise.all(promises).then((results) => {
      var _a, _b;
      const successes = [];
      const errors = [];
      for (const result of results) {
        if (result.status === "ok") {
          successes.push(result);
        } else {
          errors.push(result);
        }
      }
      const totalCount = files.length;
      if (options.drainCacheCount && totalCount > 1) {
        options.drainCacheCount(totalCount - 1);
      }
      if (errors.length > 0) {
        const firstError = errors[0];
        (_a = options.onError) == null ? void 0 : _a.call(options, firstError.data, firstError.rawFile);
      } else {
        const successData = successes.map((item) => item.data);
        (_b = options.onSuccess) == null ? void 0 : _b.call(options, successData);
      }
    });
    target.files = null;
  };
  return { customUpload, folderInputRef, selectFolder, handleFolderSelect };
}

exports.UploadAjaxError = UploadAjaxError;
exports.genFileId = genFileId;
exports.getBody = getBody;
exports.getError = getError;
exports.useCustomUpload = useCustomUpload;
