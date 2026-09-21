import { defineComponent, ref, onMounted, onBeforeUnmount, createVNode } from 'vue';
import './fullscreen-toolbar-alarm-clock.css';
import { useNamespace } from '@ibiz-template/vue3-util';

"use strict";
const IBizAlarmClock = /* @__PURE__ */ defineComponent({
  name: "AlarmClock",
  setup() {
    const ns = useNamespace("alarm-clock");
    const close = () => {
      const div = document.getElementById("alarm-clock");
      if (div) {
        if (div.parentElement) {
          div.parentElement.removeChild(div);
        }
      }
    };
    const formattedTime = ref("00:00");
    let minutes = 0;
    let seconds = 0;
    let timerInterval;
    const formatTime = (m, s) => {
      return "".concat(m < 10 ? "0".concat(m) : m, ":").concat(s < 10 ? "0".concat(s) : s);
    };
    function updateTimer() {
      seconds++;
      if (seconds === 60) {
        seconds = 0;
        minutes++;
      }
      if (minutes === 60) {
        minutes = 0;
      }
      formattedTime.value = formatTime(minutes, seconds);
    }
    const startTimer = () => {
      timerInterval = setInterval(updateTimer, 1e3);
    };
    onMounted(() => {
      startTimer();
    });
    onBeforeUnmount(() => {
      clearInterval(timerInterval);
    });
    const closeSvg = () => {
      return createVNode("svg", {
        "viewBox": "0 0 16 16",
        "xmlns": "http://www.w3.org/2000/svg",
        "height": "1em",
        "width": "1em",
        "preserveAspectRatio": "xMidYMid meet",
        "focusable": "false"
      }, [createVNode("g", {
        "id": "atjaction/quit",
        "stroke-width": "1",
        "fill-rule": "evenodd"
      }, [createVNode("path", {
        "d": "M11.628 2.015a7.438 7.438 0 0 1 1.855 1.5 7.256 7.256 0 0 1 1.858 4.853c0 4.05-3.324 7.332-7.42 7.332C3.824 15.7.5 12.419.5 8.368c0-1.812.668-3.523 1.858-4.854a7.428 7.428 0 0 1 1.855-1.5.6.6 0 0 1 .595 1.043 6.238 6.238 0 0 0-1.556 1.257A6.056 6.056 0 0 0 1.7 8.368c0 3.385 2.783 6.132 6.22 6.132 3.438 0 6.221-2.747 6.221-6.132 0-1.514-.558-2.941-1.552-4.054a6.228 6.228 0 0 0-1.556-1.257.6.6 0 1 1 .595-1.042zM7.921.5a.6.6 0 0 1 .592.503l.008.097v7.18a.6.6 0 0 1-1.193.097l-.007-.098V1.1a.6.6 0 0 1 .6-.6z",
        "id": "atj\u5F62\u72B6\u7ED3\u5408"
      }, null)])]);
    };
    return {
      ns,
      close,
      closeSvg,
      formattedTime,
      timerInterval
    };
  },
  render() {
    return createVNode("div", {
      "ref": "componentRef",
      "class": this.ns.b()
    }, [createVNode("div", {
      "class": this.ns.e("wrapper")
    }, [createVNode("div", {
      "class": this.ns.e("light-counter")
    }, [this.formattedTime]), createVNode("div", {
      "class": this.ns.e("svg-wrapper")
    }, [createVNode("div", {
      "class": this.ns.e("svg"),
      "onClick": () => this.close()
    }, [this.closeSvg()])])])]);
  }
});

export { IBizAlarmClock };
