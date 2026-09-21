'use strict';

var vue = require('vue');
var dayjs = require('dayjs');
var ramda = require('ramda');
require('./extend-action-timeline.css');
var vue3Util = require('@ibiz-template/vue3-util');
var core = require('@ibiz-template/core');

"use strict";
const acceptingOfficerNoDup = (tag, dataS) => {
  const tempData = [];
  if ((dataS == null ? void 0 : dataS.length) > 0 && tag) {
    dataS.forEach((data) => {
      tempData.push(data[tag]);
    });
  }
  const noDup = [...new Set(tempData)];
  return noDup;
};
const IBizExtendActionTimeLine = /* @__PURE__ */ vue.defineComponent({
  name: "IBizExtendActionTimeLine",
  props: {
    data: {
      type: Object
    }
  },
  setup(props) {
    const ns = vue3Util.useNamespace("extend-action-timeline");
    const UIData = vue.ref([]);
    const sortData = (a, b) => {
      return Date.parse(b.time) - Date.parse(a.time);
    };
    const handleVal = (handleTasks) => {
      const commentsData = [];
      let tasks = ramda.clone(handleTasks);
      if (tasks.length > 0) {
        tasks = tasks.reverse();
        tasks.forEach((task) => {
          if (task.usertasks) {
            const copyTasks = ramda.clone(task.usertasks);
            Object.assign(task, {
              tasks: handleVal(copyTasks)
            });
            task.isShow = false;
          }
          if (task.identitylinks.length === 0 && task.comments.length === 0) {
            Object.assign(task, {
              taskName: task.userTaskName
            });
            commentsData.push(task);
          }
          if (task.identitylinks.length > 0) {
            const authorNames = acceptingOfficerNoDup("displayname", task.identitylinks);
            commentsData.push({
              authorName: authorNames.join("\u3001"),
              taskName: task.userTaskName,
              isLink: true
            });
          }
          if (task.comments.length > 0) {
            task.comments.forEach((comment) => {
              Object.assign(comment, {
                taskName: task.userTaskName
              });
            });
            task.comments.sort(sortData);
            commentsData.push(...task.comments);
          }
        });
        return commentsData;
      }
    };
    const noDup = (data) => {
      const map = /* @__PURE__ */ new Map();
      for (let i = 0; i < data.length; i++) {
        if (!map.has(data[i])) {
          map.set(data[i], true);
        }
      }
      return map;
    };
    const handlelinkName = (handleTask) => {
      handleTask.forEach((item) => {
        const linkName = [];
        if (item.tasks) {
          handlelinkName(item.tasks);
        }
        if (item.tasks) {
          for (let i = 0; i < item.tasks.length; i++) {
            if (item.tasks[i].isLink) {
              const arr = item.tasks[i].authorName.indexOf("\u3001") !== -1 ? item.tasks[i].authorName.split("\u3001") : item.tasks[i].authorName;
              if (typeof arr === "string") {
                linkName.push(arr);
              } else {
                linkName.push(...arr);
              }
            }
            if (item.tasks[i].linkName) {
              const arr = item.tasks[i].linkName.indexOf("\u3001") !== -1 ? item.tasks[i].linkName.split("\u3001") : item.tasks[i].linkName;
              if (typeof arr === "string") {
                linkName.push(arr);
              } else {
                linkName.push(...arr);
              }
            }
          }
        }
        const noDupName = [...noDup(linkName).keys()];
        item.linkName = noDupName.join("\u3001");
      });
    };
    vue.watch(() => props.data, (newVal, oldVal) => {
      if (newVal !== oldVal && newVal) {
        const copyData = ramda.clone(newVal);
        const tasks = copyData.usertasks;
        if (tasks) {
          const handleTask = handleVal(tasks);
          if (handleTask) {
            handlelinkName(handleTask);
            UIData.value = handleTask;
          }
        }
      }
    }, {
      immediate: true
    });
    const formatDate = (date, format) => {
      return dayjs(date).format(format);
    };
    const changeExpand = (userTask) => {
      userTask.isShow = !userTask.isShow;
    };
    const renderTimeline = (data) => {
      return data.map((task) => {
        return vue.createVNode("div", {
          "class": [ns.b("task"), ns.is("wrong", task.type && task.type.includes("\u9A73\u56DE")), ns.is("link", task.isLink), ns.is("linkname", task.linkName)]
        }, [vue.createVNode("div", {
          "class": ns.be("task", "tail")
        }, null), vue.createVNode("div", {
          "class": [ns.be("task", "head"), ns.is("link-head", task.linkName)]
        }, null), vue.createVNode("div", {
          "class": ns.be("task", "top")
        }, [vue.createVNode("div", {
          "class": [ns.be("task", "user-task-name"), ns.is("task-link", task.linkName)]
        }, [task.taskName]), task.linkName ? vue.createVNode("div", {
          "class": ns.be("task", "link-name"),
          "title": core.showTitle(task.linkName)
        }, [task.linkName]) : null, vue.createVNode("div", {
          "class": [ns.be("task", "author-name"), ns.is("has-type", task.type)],
          "title": core.showTitle(task.authorName)
        }, [task.authorName]), task.type && vue.createVNode("div", {
          "class": ns.be("task", "type")
        }, [task.type]), task.time && vue.createVNode("div", {
          "class": ns.be("task", "last-time")
        }, [task.time && ibiz.i18n.t("component.extendActionTimeLine.processTime"), vue.createVNode("span", {
          "class": ns.be("task", "last-time-text")
        }, [task.time])])]), vue.createVNode("div", {
          "class": ns.be("task", "bottom")
        }, [vue.createVNode("div", {
          "class": ns.be("task", "full-message")
        }, [task.fullMessage ? "".concat(ibiz.i18n.t("component.extendActionTimeLine.comments"), "\uFF1A ").concat(task.fullMessage) : task.fullMessage])]), task.tasks && task.tasks.length >= 1 && vue.createVNode("div", {
          "class": ns.be("task", "trigger"),
          "on-click": () => {
            changeExpand(task);
          }
        }, [vue.createVNode(vue.resolveComponent("i-icon"), {
          "type": task.isShow ? "md-remove" : "md-add"
        }, null)]), task.tasks && vue.withDirectives(vue.createVNode("div", {
          "class": ns.be("task", "moreTask")
        }, [renderTimeline(task.tasks)]), [[vue.vShow, task.isShow]])]);
      });
    };
    return {
      ns,
      formatDate,
      UIData,
      renderTimeline
    };
  },
  render() {
    return vue.createVNode("div", {
      "class": this.ns.b()
    }, [this.UIData && this.renderTimeline(this.UIData)]);
  }
});

exports.IBizExtendActionTimeLine = IBizExtendActionTimeLine;
