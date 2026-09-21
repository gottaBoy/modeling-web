'use strict';

var vue = require('vue');
var lodashEs = require('lodash-es');

"use strict";
const getFileType = (extension) => {
  switch (extension) {
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
    case "bmp":
    case "svg":
    case "webp":
    case "jfif":
      return "image";
    case "pdf":
      return "pdf";
    default:
      return "other";
  }
};
function useFilesParse(props, c) {
  var _a, _b, _c, _d;
  const files = vue.ref([]);
  const uploadUrl = vue.ref("");
  const svgBlob = /* @__PURE__ */ new Map();
  const enableNoAccess = ((_a = c.model.userParam) == null ? void 0 : _a.enablenoaccess) === "true";
  let globalDownloadPrifix = false;
  if ((_b = c.model.userParam) == null ? void 0 : _b.globaldownloadprifix) {
    globalDownloadPrifix = ((_c = c.model.userParam) == null ? void 0 : _c.globaldownloadprifix) === "true";
  } else {
    globalDownloadPrifix = ibiz.config.common.globalDownloadPrifix;
  }
  const osscat = (_d = c.model.userParam) == null ? void 0 : _d.osscat;
  const getDownloadTicketParams = () => {
    const downloadTicketParams = {};
    if (!c.model.userParam) {
      return downloadTicketParams;
    }
    if (c.model.userParam.appentitytag) {
      Object.assign(downloadTicketParams, {
        appEntityTag: c.model.userParam.appentitytag
      });
    }
    if (c.model.userParam.datafieldtag) {
      Object.assign(downloadTicketParams, {
        dataFieldTag: c.model.userParam.datafieldtag
      });
    }
    return downloadTicketParams;
  };
  const fetchSVGAsBase64 = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch SVG: ".concat(response.status));
      }
      const blob = await response.blob();
      const reader = new FileReader();
      return new Promise((resolve, reject) => {
        reader.onloadend = () => {
          const base64String = reader.result;
          if (base64String) {
            const dataURL = base64String.replace(
              "data:application/octet-stream;base64",
              "data:image/svg+xml;base64"
            );
            resolve(dataURL);
          }
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      ibiz.log.error(error == null ? void 0 : error.message);
      throw error;
    }
  };
  const calcSvgPreview = (file) => {
    const blob = svgBlob.get(file.id);
    if (blob) {
      Object.assign(file, { base64: blob });
    } else {
      fetchSVGAsBase64(file.url).then((base64String) => {
        Object.assign(file, { base64: base64String });
      });
    }
  };
  const getDownloadUrl = (data, file) => {
    const editorParams = {
      osscat,
      enableNoAccess,
      globalDownloadPrifix
    };
    if (file && file.folder) {
      editorParams.osscat = file.folder;
    }
    const urls = ibiz.util.file.calcFileUpDownUrl(
      c.context,
      c.params,
      data,
      editorParams
    );
    return urls.downloadUrl;
  };
  const onDownload = (file) => {
    const downloadUrl = getDownloadUrl(props.data, file);
    const url = file.url || downloadUrl.replace("%fileId%", file.id);
    ibiz.util.file.fileDownload(
      url,
      file.name,
      {
        context: c.context,
        params: c.params,
        data: props.data,
        file: { fileId: file.id, ...file },
        extraParams: { osscat, enableNoAccess, globalDownloadPrifix },
        downloadTicketParams: getDownloadTicketParams()
      },
      void 0,
      enableNoAccess
    );
  };
  vue.watch(
    () => props.value,
    (newVal) => {
      files.value = !newVal ? [] : lodashEs.isString(newVal) ? JSON.parse(newVal) : newVal;
    },
    { immediate: true }
  );
  vue.watch(
    () => props.data,
    (newVal) => {
      if (newVal) {
        const editorParams = { osscat, enableNoAccess };
        const urls = ibiz.util.file.calcFileUpDownUrl(
          c.context,
          c.params,
          newVal,
          editorParams
        );
        uploadUrl.value = urls.uploadUrl;
      }
    },
    { immediate: true, deep: true }
  );
  vue.watch(
    files,
    (newVal) => {
      if (newVal == null ? void 0 : newVal.length) {
        newVal.forEach((file) => {
          const downloadUrl = getDownloadUrl(props.data, file);
          Object.assign(file, {
            url: file.url || downloadUrl.replace("%fileId%", file.id)
          });
          if (ibiz.config.common.enableDownloadTicket && !enableNoAccess) {
            ibiz.util.file.getDownloadTicket(
              c.context,
              c.params,
              props.data,
              {
                fileId: file.id
              },
              getDownloadTicketParams()
            ).then((downloadTicket) => {
              if (downloadTicket && downloadTicket.ticket) {
                file.url = downloadUrl.replace(
                  "%fileId%",
                  downloadTicket.ticket
                );
                if (file.name.split(".").pop() === "svg") {
                  calcSvgPreview(file);
                }
              }
            });
          } else if (file.name.split(".").pop() === "svg") {
            calcSvgPreview(file);
          }
        });
      }
    },
    { immediate: true }
  );
  return {
    files,
    uploadUrl,
    enableNoAccess,
    onDownload,
    getDownloadUrl,
    getDownloadTicketParams
  };
}

exports.getFileType = getFileType;
exports.useFilesParse = useFilesParse;
