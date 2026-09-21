import { defineComponent, createVNode, ref, withDirectives, resolveDirective } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import { getFileType, useFilesParse } from './file-util.mjs';
import './attachment-column.css';

"use strict";
const AttachmentColumn = /* @__PURE__ */ defineComponent({
  name: "IBizAttachmentColumn",
  props: {
    value: {
      type: [String, Array],
      required: true
    },
    data: {
      type: Object,
      required: true
    },
    controller: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const ns = useNamespace("attachment-column");
    const {
      getDownloadUrl,
      files,
      enableNoAccess,
      onDownload,
      getDownloadTicketParams
    } = useFilesParse(props, props.controller);
    const loading = ref(true);
    const onLoad = () => {
      loading.value = false;
    };
    const renderImagePreview = (file) => {
      return withDirectives(createVNode("div", {
        "class": ns.e("image-preview")
      }, [createVNode("div", {
        "class": ns.em("image-preview", "container")
      }, [createVNode("img", {
        "alt": "--",
        "src": file.base64 || file.url,
        "onLoad": onLoad
      }, null)])]), [[resolveDirective("loading"), loading.value]]);
    };
    const handleImagePreview = async (file) => {
      const overlay = ibiz.overlay.createModal(renderImagePreview(file), void 0, {
        modalClass: ns.e("image-preview"),
        width: 700,
        height: "auto"
      });
      overlay.present();
      await overlay.onWillDismiss();
    };
    const handlePDFPreview = async (file) => {
      const downloadUrl = getDownloadUrl(props.data, file);
      let url = file.url || downloadUrl.replace("%fileId%", file.id);
      if (ibiz.config.common.enableDownloadTicket && !enableNoAccess) {
        const downloadTicket = await ibiz.util.file.getDownloadTicket(props.controller.context, props.controller.params, props.data, {
          fileId: file.id
        }, getDownloadTicketParams());
        if (downloadTicket && downloadTicket.ticket) {
          url = downloadUrl.replace("%fileId%", downloadTicket.ticket);
        }
      }
      const response = await ibiz.net.request(url, {
        method: "get",
        responseType: "blob",
        baseURL: ""
        // 已经有baseURL了，这里无需再写
      });
      if (response.data) {
        const blob = new Blob([response.data], {
          type: "application/pdf"
        });
        const objectURL = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = objectURL;
        link.target = "_blank";
        link.style.cursor = "pointer";
        link.textContent = file.name || "";
        const handleClick = function() {
          link.removeEventListener("click", handleClick);
          document.body.removeChild(link);
        };
        link.addEventListener("click", handleClick);
        document.body.appendChild(link);
        link.click();
      }
    };
    const handleFileClick = (file) => {
      var _a, _b;
      const fileName = file.name;
      const fileExtension = (_b = (_a = fileName.split(".").pop()) == null ? void 0 : _a.toLowerCase()) != null ? _b : "";
      switch (getFileType(fileExtension)) {
        case "image":
          handleImagePreview(file);
          break;
        case "pdf":
          handlePDFPreview(file);
          break;
        case "other":
        default:
          onDownload(file);
          break;
      }
    };
    return {
      ns,
      files,
      handleFileClick
    };
  },
  render() {
    return createVNode("div", {
      "class": this.ns.b()
    }, [this.files.map((file) => {
      var _a, _b;
      const fileName = file.name;
      const fileExtension = (_b = (_a = fileName.split(".").pop()) == null ? void 0 : _a.toLowerCase()) != null ? _b : "";
      const fileType = getFileType(fileExtension);
      return createVNode("div", {
        "class": this.ns.e("file"),
        "title": file.name,
        "onClick": () => this.handleFileClick(file)
      }, [fileType === "image" ? createVNode("img", {
        "alt": "",
        "class": this.ns.em("file", "img"),
        "src": file.base64 || file.url
      }, null) : file.name]);
    })]);
  }
});

export { AttachmentColumn };
