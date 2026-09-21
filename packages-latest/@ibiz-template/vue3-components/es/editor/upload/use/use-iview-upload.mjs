import { HttpError } from '@ibiz-template/core';
import { ref, watch, computed } from 'vue';
import '../../../util/index.mjs';
import { getRelativePathWithoutRoot } from '../../../util/path-util/path-util.mjs';

"use strict";
function useIViewUpload(props, valueChange, c, emit) {
  const files = ref([]);
  const uploadHeaders = ibiz.util.file.getUploadHeaders();
  const headers = ref({ ...uploadHeaders });
  const uploadUrl = ref("");
  const uploadCache = {
    count: 0,
    cacheFiles: []
    // iview上传过程中不能改default-file-list,所以需要缓存
  };
  const svgBlob = /* @__PURE__ */ new Map();
  watch(
    () => props.value,
    (newVal) => {
      files.value = !newVal ? [] : JSON.parse(newVal);
    },
    { immediate: true }
  );
  const getDownloadUrl = (data, file) => {
    const editorParams = {
      ...c.editorParams,
      enableNoAccess: c.enableNoAccess
    };
    if (editorParams.exportparams) {
      editorParams.exportParams = JSON.parse(editorParams.exportparams);
    }
    if (editorParams.globaldownloadprifix) {
      editorParams.globalDownloadPrifix = editorParams.globaldownloadprifix === "true";
    } else {
      editorParams.globalDownloadPrifix = ibiz.config.common.globalDownloadPrifix;
    }
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
  watch(
    () => props.data,
    (newVal) => {
      if (newVal) {
        const editorParams = {
          ...c.editorParams,
          enableNoAccess: c.enableNoAccess
        };
        if (editorParams.uploadparams) {
          editorParams.uploadParams = JSON.parse(editorParams.uploadparams);
        }
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
      file.base64 = blob;
    } else {
      fetchSVGAsBase64(file.url).then((base64String) => {
        file.base64 = base64String;
      });
    }
  };
  watch(
    files,
    (newVal) => {
      if (newVal == null ? void 0 : newVal.length) {
        newVal.forEach((file) => {
          const downloadUrl = getDownloadUrl(props.data, file);
          file.url = file.url || downloadUrl.replace("%fileId%", file.id);
          if (ibiz.config.common.enableDownloadTicket && !c.enableNoAccess) {
            ibiz.util.file.getDownloadTicket(
              c.context,
              c.params,
              props.data,
              {
                fileId: file.id
              },
              c.downloadTicketParams
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
  const emitValue = () => {
    const _files = [...files.value, ...uploadCache.cacheFiles];
    const value = _files.length > 0 ? JSON.stringify(
      _files.map((file) => ({
        name: file.name,
        id: file.id,
        folder: file.folder,
        ...c.transformInfoMap(file, c.infoMap, true)
      }))
    ) : null;
    uploadCache.cacheFiles = [];
    valueChange(value);
  };
  const addCacheCount = () => {
    uploadCache.count += 1;
  };
  const drainCacheCount = (n) => {
    uploadCache.count -= n;
    if (uploadCache.count <= 0) {
      uploadCache.count = 0;
      emitValue();
    }
  };
  const beforeUpload = (rawFile) => {
    emit == null ? void 0 : emit("customAction", { tag: "beforeUpload", data: [rawFile] });
    if (rawFile.name.split(".").pop() === "svg") {
      const blobUrl = URL.createObjectURL(rawFile);
      svgBlob.set(rawFile.name, blobUrl);
    }
    const size = rawFile.size / 1024 / 1024;
    if (c.size && size > c.size) {
      ibiz.message.error(
        "".concat(ibiz.i18n.t("editor.upload.fileSizeErr"), " ").concat(c.size, "MB!")
      );
      return false;
    }
    uploadCache.count += 1;
    return true;
  };
  const onSuccess = (response) => {
    let hiddenRegex = null;
    if (c.hiddenFileRegex) {
      try {
        hiddenRegex = new RegExp(c.hiddenFileRegex);
      } catch (e) {
        ibiz.log.warn("hiddenFileRegex invalid: ".concat(c.hiddenFileRegex));
      }
    }
    if (hiddenRegex && Array.isArray(response)) {
      response = response.filter((file) => {
        if (file.path && file.filename && file.path.indexOf(file.filename) > -1) {
          const relativePathWithoutRoot2 = getRelativePathWithoutRoot(file.path);
          return !hiddenRegex.test(relativePathWithoutRoot2);
        }
        const relativePathWithoutRoot = getRelativePathWithoutRoot(
          "".concat(file.path, "/").concat(file.filename)
        );
        return !hiddenRegex.test(relativePathWithoutRoot);
      });
    }
    emit == null ? void 0 : emit("customAction", {
      tag: "onSuccess",
      data: Array.isArray(response) ? response : [response]
    });
    if (!response) {
      return;
    }
    if (ibiz.config.common.enableDownloadTicket && !c.enableNoAccess && response.ticket) {
      ibiz.util.file.setDownloadTicket(response.id, response.ticket);
    }
    const handleResponse = (file) => {
      uploadCache.cacheFiles.push({
        name: file.filename,
        id: file.fileid,
        folder: file.folder,
        ...c.transformInfoMap(file, c.infoMap)
      });
      if (file.name.split(".").pop() === "svg") {
        const blob = svgBlob.get(file.name);
        if (blob) {
          svgBlob.set(file.fileid, blob);
          svgBlob.delete(file.name);
        }
      }
    };
    if (Array.isArray(response)) {
      for (let i = 0; i < response.length; i++) {
        handleResponse(response[i]);
      }
    } else {
      handleResponse(response);
    }
    uploadCache.count -= 1;
    if (uploadCache.count === 0) {
      emitValue();
    }
  };
  const onError = (...args) => {
    emit == null ? void 0 : emit("customAction", {
      tag: "onError",
      data: args
    });
    const error = args[0];
    uploadCache.count -= 1;
    throw new HttpError({
      response: { data: JSON.parse(error.message), status: error.status }
    });
  };
  const onRemove = (file) => {
    emit == null ? void 0 : emit("customAction", {
      tag: "onRemove",
      data: [file]
    });
    if (props.disabled) {
      return;
    }
    const index = files.value.findIndex((item) => item.id === file.id);
    if (index !== -1) {
      files.value.splice(index, 1);
    }
    emitValue();
  };
  const onDownload = (file) => {
    const downloadUrl = getDownloadUrl(props.data, file);
    const url = file.url || downloadUrl.replace("%fileId%", file.id);
    const editorParams = {
      ...c.editorParams,
      enableNoAccess: c.enableNoAccess
    };
    if (editorParams.exportparams) {
      editorParams.exportParams = JSON.parse(editorParams.exportparams);
    }
    if (editorParams.globaldownloadprifix) {
      editorParams.globalDownloadPrifix = editorParams.globaldownloadprifix === "true";
    } else {
      editorParams.globalDownloadPrifix = ibiz.config.common.globalDownloadPrifix;
    }
    ibiz.util.file.fileDownload(
      url,
      file.name,
      {
        context: c.context,
        params: c.params,
        data: props.data,
        file: { fileId: file.id, ...file },
        extraParams: editorParams,
        downloadTicketParams: c.downloadTicketParams
      },
      void 0,
      c.enableNoAccess
    );
  };
  const limit = computed(() => {
    return c.multiple ? 9999 : 1;
  });
  return {
    uploadUrl,
    headers,
    files,
    limit,
    onDownload,
    onError,
    onRemove,
    onSuccess,
    beforeUpload,
    addCacheCount,
    drainCacheCount
  };
}

export { useIViewUpload };
