import { isImage, uploadFile } from '@ibiz-template/core';
import { ref, watch } from 'vue';

"use strict";
function formatFileInfo(file, downloadUrl) {
  file.url = downloadUrl.replace("%fileId%", file.id);
  if (!file.status) {
    file.status = "finished";
  }
  if (!file.fileName) {
    const index = file.name.lastIndexOf(".");
    file.fileName = file.name.substring(0, index);
    file.fileExt = file.name.substring(index);
    file.isImage = isImage(file.name);
  }
  return file;
}
function useIBizUploadInit(props) {
  const uploadUrl = ref("");
  const downloadUrl = ref("");
  const valueList = ref([]);
  watch(
    props.data,
    (newVal) => {
      if (newVal) {
        const urls = ibiz.util.file.calcFileUpDownUrl(
          props.controller.value.context,
          props.controller.value.params,
          newVal,
          props.controller.value.editorParams
        );
        uploadUrl.value = urls.uploadUrl;
        downloadUrl.value = urls.downloadUrl;
      }
    },
    { immediate: true, deep: true }
  );
  watch(
    props.value,
    (newVal) => {
      valueList.value = !newVal ? [] : JSON.parse(newVal);
      if (valueList.value.length && downloadUrl.value) {
        valueList.value.forEach((file) => {
          formatFileInfo(file, downloadUrl.value);
        });
      }
    },
    { immediate: true }
  );
  watch(
    downloadUrl,
    (newVal) => {
      if (newVal && valueList.value.length) {
        valueList.value.forEach((file) => {
          formatFileInfo(file, newVal);
        });
      }
    },
    { immediate: true }
  );
  return {
    downloadUrl,
    uploadUrl,
    valueList
  };
}
function useIBizUpload(opts) {
  const uploadState = ref("undo");
  const fileList = ref([]);
  const { downloadUrl, value, uploadUrl } = opts;
  watch(
    value,
    (newVal) => {
      if (newVal.length > 0) {
        fileList.value = [];
        newVal.forEach((item) => {
          fileList.value.push(formatFileInfo(item, downloadUrl.value));
        });
      }
    },
    {
      immediate: true,
      deep: true
    }
  );
  const beforeUpload = (fileData, files) => {
    files.forEach((file) => {
      fileList.value.push({
        name: file.name,
        status: file.status,
        percentage: file.percentage,
        id: file.uid,
        url: ""
      });
    });
    return true;
  };
  const onProgress = (files) => {
    files.forEach((file) => {
      fileList.value.find((item) => {
        if (item.id === file.uid) {
          item.percentage = file.percentage;
          return true;
        }
        return false;
      });
    });
  };
  const onSuccess = (resultFiles, res) => {
    resultFiles.forEach((file) => {
      fileList.value.find((item) => {
        if (item.id === file.uid) {
          item.status = file.status;
          item.id = res.data.fileid || res.data.id;
          item.name = res.data.filename || res.data.name;
          formatFileInfo(item, downloadUrl.value);
          return true;
        }
        return false;
      });
    });
  };
  const onError = (resultFiles, error) => {
    resultFiles.forEach((file) => {
      fileList.value.find((item) => {
        if (item.id === file.uid) {
          item.status = file.status;
          return true;
        }
        return false;
      });
    });
    console.error(error);
  };
  const onFinish = (_resultFiles) => {
    fileList.value = fileList.value.filter((file) => file.status === "finished");
    uploadState.value = "done";
  };
  const selectFile = () => {
    uploadFile({
      multiple: opts.multiple,
      accept: opts.accept,
      uploadUrl: uploadUrl.value,
      beforeUpload,
      progress: onProgress,
      success: onSuccess,
      error: onError,
      finish: onFinish
    });
  };
  return {
    selectFile,
    fileList,
    uploadState
  };
}
function openImagePreview(file) {
  return ibiz.overlay.modal(
    "ImagePreview",
    { file },
    {
      width: "auto",
      height: "auto",
      placement: "center",
      modalClass: "ibiz-image-preview-modal"
    }
  );
}

export { formatFileInfo, openImagePreview, useIBizUpload, useIBizUploadInit };
