import { defineComponent, ref, computed, watch, onMounted, createVNode, resolveComponent } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import { getAppCookie, CoreConst } from '@ibiz-template/core';
import { getFileSvgByType } from './file-type.mjs';
import './upload-manager.css';

"use strict";
const IBizUploadManager = /* @__PURE__ */ defineComponent({
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
    const ns = useNamespace("upload-manager");
    const fileList = ref([]);
    const showFileList = ref(true);
    for (let i = 0; i < props.params.files.length; i++) {
      fileList.value.push({
        file: props.params.files[i],
        status: 10,
        progress: 0
      });
    }
    const uploading = computed(() => {
      return fileList.value.findIndex((item) => item.status === 10) !== -1;
    });
    const uploadStatus = computed(() => {
      return fileList.value.findIndex((item) => item.status === 30) === -1;
    });
    const progress = computed(() => {
      const uploaded = fileList.value.filter((item) => item.status !== 10);
      return Math.floor(uploaded.length / fileList.value.length * 100);
    });
    watch(() => uploading.value, () => {
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
      const headers = {
        ["".concat(ibiz.env.tokenHeader, "Authorization")]: "".concat(ibiz.env.tokenPrefix, "Bearer ").concat(getAppCookie(CoreConst.TOKEN)),
        ...props.params.headers
      };
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
    onMounted(async () => {
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
    return createVNode("div", {
      "class": this.ns.b()
    }, [createVNode("div", {
      "class": this.ns.e("header")
    }, [createVNode("div", {
      "class": this.ns.em("header", "loading")
    }, [this.uploading ? createVNode(resolveComponent("el-progress"), {
      "type": "circle",
      "percentage": this.progress,
      "showText": false
    }, null) : this.uploadStatus ? createVNode("ion-icon", {
      "name": "checkmark-circle",
      "class": "icon success"
    }, null) : createVNode("ion-icon", {
      "name": "close-circle",
      "class": "icon danger"
    }, null)]), createVNode("div", {
      "class": this.ns.em("header", "title")
    }, [createVNode("span", {
      "class": "caption"
    }, [ibiz.i18n.t("util.uploadManager.title")]), createVNode("span", {
      "class": "progress"
    }, ["".concat(this.fileList.filter((item) => item.status === 20).length, " / ").concat(this.fileList.length)])]), createVNode("div", {
      "class": this.ns.em("header", "actions")
    }, [createVNode("ion-icon", {
      "name": this.showFileList ? "chevron-down-outline" : "chevron-up-outline",
      "class": "icon down-up",
      "onClick": this.onChangeShowFileList
    }, null), createVNode("ion-icon", {
      "name": "close-outline",
      "class": "icon close",
      "onClick": this.onClose
    }, null)])]), this.showFileList && createVNode("div", {
      "class": this.ns.e("content")
    }, [this.fileList.map((item) => {
      return createVNode("div", {
        "class": this.ns.e("file-item")
      }, [createVNode("div", {
        "class": this.ns.em("file-item", "icon")
      }, [getFileSvgByType(item.file.type)]), createVNode("div", {
        "class": this.ns.em("file-item", "name")
      }, [item.file.name]), createVNode("div", {
        "class": this.ns.em("file-item", "status")
      }, [item.status === 10 && createVNode(resolveComponent("el-progress"), {
        "type": "circle",
        "percentage": item.progress
      }, null), item.status === 20 && createVNode("ion-icon", {
        "name": "checkmark-circle",
        "class": "icon success"
      }, null), item.status === 30 && createVNode("ion-icon", {
        "name": "close-circle",
        "class": "icon danger"
      }, null)]), item.status === 30 && createVNode("div", {
        "class": this.ns.em("file-item", "status-text")
      }, [item.statusText])]);
    })])]);
  }
});

export { IBizUploadManager };
