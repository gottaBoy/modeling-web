'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var fileType = require('./file-type.cjs');
require('./upload-manager.css');

"use strict";
const IBizUploadManager = /* @__PURE__ */ vue.defineComponent({
  name: "IBizUploadManager",
  props: {
    params: {
      type: Object,
      required: true
    }
  },
  emits: {
    close: () => true,
    uploadComplete: (_data) => true
  },
  setup(props, {
    emit
  }) {
    const ns = vue3Util.useNamespace("upload-manager");
    const fileList = vue.ref([]);
    const showFileList = vue.ref(true);
    for (let i = 0; i < props.params.files.length; i++) {
      fileList.value.push({
        file: props.params.files[i],
        status: 10,
        progress: 0
      });
    }
    const uploading = vue.computed(() => {
      return fileList.value.findIndex((item) => item.status === 10) !== -1;
    });
    const uploadStatus = vue.computed(() => {
      return fileList.value.findIndex((item) => item.status === 30) === -1;
    });
    const progress = vue.computed(() => {
      const uploaded = fileList.value.filter((item) => item.status !== 10);
      return Math.floor(uploaded.length / fileList.value.length * 100);
    });
    vue.watch(() => uploading.value, () => {
      if (!uploading.value) {
        const data = fileList.value.filter((item) => item.status === 20 && !!item.data).map((item) => item.data);
        emit("uploadComplete", data);
      }
    });
    const onClose = () => {
      emit("close");
    };
    const onChangeShowFileList = () => {
      showFileList.value = !showFileList.value;
    };
    const uploadFile = async (item) => {
      const data = new FormData();
      data.append("file", item.file);
      const headers = ibiz.util.file.getUploadHeaders();
      const res = await ibiz.net.axios({
        url: props.params.uploadUrl,
        method: "post",
        headers,
        data,
        onUploadProgress: (ProgressEvent) => {
          const percentCompleted = Math.round(ProgressEvent.loaded * 100 / (ProgressEvent.total || 1));
          item.progress = percentCompleted;
        }
      });
      return res;
    };
    vue.onMounted(async () => {
      for (let i = 0; i < fileList.value.length; i++) {
        const item = fileList.value[i];
        uploadFile(item).then((res) => {
          item.data = res.data;
          item.status = res.status === 200 ? 20 : 30;
          item.statusText = res.statusText;
        }).catch((error) => {
          item.status = 30;
          item.statusText = error.message ? error.message : ibiz.i18n.t("util.uploadManager.failed");
        });
      }
    });
    return {
      ns,
      fileList,
      uploading,
      progress,
      uploadStatus,
      showFileList,
      onClose,
      onChangeShowFileList
    };
  },
  render() {
    return vue.createVNode("div", {
      "class": this.ns.b()
    }, [vue.createVNode("div", {
      "class": this.ns.e("header")
    }, [vue.createVNode("div", {
      "class": this.ns.em("header", "loading")
    }, [this.uploading ? vue.createVNode(vue.resolveComponent("el-progress"), {
      "type": "circle",
      "percentage": this.progress,
      "showText": false
    }, null) : this.uploadStatus ? vue.createVNode("ion-icon", {
      "name": "checkmark-circle",
      "class": "icon success"
    }, null) : vue.createVNode("ion-icon", {
      "name": "close-circle",
      "class": "icon danger"
    }, null)]), vue.createVNode("div", {
      "class": this.ns.em("header", "title")
    }, [vue.createVNode("span", {
      "class": "caption"
    }, [ibiz.i18n.t("util.uploadManager.title")]), vue.createVNode("span", {
      "class": "progress"
    }, ["".concat(this.fileList.filter((item) => item.status === 20).length, " / ").concat(this.fileList.length)])]), vue.createVNode("div", {
      "class": this.ns.em("header", "actions")
    }, [vue.createVNode("ion-icon", {
      "name": this.showFileList ? "chevron-down-outline" : "chevron-up-outline",
      "class": "icon down-up",
      "onClick": this.onChangeShowFileList
    }, null), vue.createVNode("ion-icon", {
      "name": "close-outline",
      "class": "icon close",
      "onClick": this.onClose
    }, null)])]), this.showFileList && vue.createVNode("div", {
      "class": this.ns.e("content")
    }, [this.fileList.map((item) => {
      return vue.createVNode("div", {
        "class": this.ns.e("file-item")
      }, [vue.createVNode("div", {
        "class": this.ns.em("file-item", "icon")
      }, [fileType.getFileSvgByType(item.file.type)]), vue.createVNode("div", {
        "class": this.ns.em("file-item", "name")
      }, [item.file.name]), vue.createVNode("div", {
        "class": this.ns.em("file-item", "status")
      }, [item.status === 10 && vue.createVNode(vue.resolveComponent("el-progress"), {
        "type": "circle",
        "percentage": item.progress
      }, null), item.status === 20 && vue.createVNode("ion-icon", {
        "name": "checkmark-circle",
        "class": "icon success"
      }, null), item.status === 30 && vue.createVNode("ion-icon", {
        "name": "close-circle",
        "class": "icon danger"
      }, null)]), item.status === 30 && vue.createVNode("div", {
        "class": this.ns.em("file-item", "status-text")
      }, [item.statusText])]);
    })])]);
  }
});

exports.IBizUploadManager = IBizUploadManager;
