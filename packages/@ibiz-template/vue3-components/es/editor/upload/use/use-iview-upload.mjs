import { getAppCookie, CoreConst, HttpError } from '@ibiz-template/core';
import { ref, watch, computed } from 'vue';

"use strict";
function useIViewUpload(props, valueChange, c) {
  const files = ref([]);
  const headers = ref({
    ["".concat(ibiz.env.tokenHeader, "Authorization")]: "".concat(ibiz.env.tokenPrefix, "Bearer ").concat(getAppCookie(CoreConst.TOKEN))
  });
  const uploadUrl = ref("");
  const downloadUrl = ref("");
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
  watch(
    () => props.data,
    (newVal) => {
      if (newVal) {
        const urls = ibiz.util.file.calcFileUpDownUrl(
          c.context,
          c.params,
          newVal,
          c.editorParams
        );
        uploadUrl.value = urls.uploadUrl;
        downloadUrl.value = urls.downloadUrl;
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
      if ((newVal == null ? void 0 : newVal.length) && downloadUrl.value) {
        newVal.forEach((file) => {
          file.url = file.url || downloadUrl.value.replace("%fileId%", file.id);
          if (file.name.split(".").pop() === "svg") {
            calcSvgPreview(file);
          }
        });
      }
    },
    { immediate: true }
  );
  watch(
    downloadUrl,
    (newVal) => {
      if (newVal && files.value.length) {
        files.value.forEach((file) => {
          file.url = downloadUrl.value.replace("%fileId%", file.id);
          if (file.name.split(".").pop() === "svg") {
            calcSvgPreview(file);
          }
        });
      }
    },
    { immediate: true }
  );
  const emitValue = () => {
    const _files = [...files.value, ...uploadCache.cacheFiles];
    const value = _files.length > 0 ? JSON.stringify(_files.map((file) => ({ name: file.name, id: file.id }))) : null;
    uploadCache.cacheFiles = [];
    valueChange(value);
  };
  const beforeUpload = (rawFile) => {
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
    if (!response) {
      return;
    }
    uploadCache.cacheFiles.push({
      name: response.filename,
      id: response.fileid
    });
    if (response.name.split(".").pop() === "svg") {
      const blob = svgBlob.get(response.name);
      if (blob) {
        svgBlob.set(response.fileid, blob);
        svgBlob.delete(response.name);
      }
    }
    uploadCache.count -= 1;
    if (uploadCache.count === 0) {
      emitValue();
    }
  };
  const onError = (...args) => {
    const error = args[0];
    uploadCache.count -= 1;
    throw new HttpError({
      response: { data: JSON.parse(error.message), status: error.status }
    });
  };
  const onRemove = (file) => {
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
    const url = file.url || downloadUrl.value.replace("%fileId%", file.id);
    ibiz.util.file.fileDownload(url, file.name);
  };
  const limit = computed(() => {
    return c.multiple ? 9999 : 1;
  });
  return {
    uploadUrl,
    downloadUrl,
    headers,
    files,
    limit,
    onDownload,
    onError,
    onRemove,
    onSuccess,
    beforeUpload
  };
}

export { useIViewUpload };
