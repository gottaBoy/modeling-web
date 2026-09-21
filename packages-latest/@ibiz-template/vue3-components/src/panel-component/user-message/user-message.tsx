import { defineComponent, onMounted, onUnmounted, PropType, ref } from 'vue';
import { useNamespace, useSemanticNode } from '@ibiz-template/vue3-util';
import { IPanelRawItem } from '@ibiz/model-core';
import { PanelItemController, PresetIdentifier } from '@ibiz-template/runtime';
import { showTitle } from '@ibiz-template/core';
import { updateDevToolConfig } from '@ibiz-template/devtool';
import { AsyncActionTab } from './async-action/async-action-tab/async-action-tab';
import { InternalMessageTab } from './internal-message';
import { InternalMessageDefaultProvider } from './internal-message/common';
import './user-message.scss';

/**
 * 用户消息
 * @primary
 * @description 用户消息组件，用于显示网站内关于用户的通知消息。
 */
export const UserMessage = defineComponent({
  name: 'IBizUserMessage',
  props: {
    /**
     * @description 用户消息组件模型数据
     */
    modelData: {
      type: Object as PropType<IPanelRawItem>,
      required: true,
    },
    /**
     * @description 用户消息组件控制器
     */
    controller: {
      type: Object as PropType<PanelItemController>,
      required: true,
    },
  },
  setup(props) {
    const ns = useNamespace('user-message');
    const c = props.controller;
    const { semanticClass, semanticStyle } = useSemanticNode(c);

    const noticeController = ibiz.hub.notice;

    const showPopover = ref(false);

    let hiddenTime = 0;

    noticeController.internalMessage.ns = ns;
    noticeController.internalMessage.provider =
      new InternalMessageDefaultProvider();

    const currentTab = ref<string>('notification');
    // 图片有配置拿配置，没配置取默认图片
    const sysImage = props.modelData.sysImage || {
      imagePath: 'svg/message.svg',
    };

    // 气泡控制
    const popoverRef = ref();
    const hiddenPopover = () => {
      // 默认信息点击关闭
      popoverRef.value.hide();
    };

    /** 显示的待处理通知个数 */
    const noticeNum = ref(noticeController.total);

    const onNumChange = (total: number) => {
      noticeNum.value = total;
    };
    noticeController.evt.on('totalChange', onNumChange);

    const onBatchReadClick = () => {
      noticeController.internalMessage.batchMarkRead();
    };

    const verifyAuthentication = async () => {
      const bol = await ibiz.auth.loadAppData(ibiz.appUtil.getAppContext());
      if (bol) {
        updateDevToolConfig();
      }
    };

    const handleVisibleChange = () => {
      if (document.visibilityState === 'hidden') {
        hiddenTime = new Date().getTime(); // 记录隐藏时间
      } else {
        const currentTime = new Date().getTime();
        const elapsedTime = (currentTime - hiddenTime) / 1000; // 计算隐藏时间
        if (elapsedTime > 5 * 60) {
          // if (elapsedTime > 10) {
          // 如果隐藏时间超过5分钟
          // 验证认证信息是否有效
          verifyAuthentication();
        }
      }
    };

    onMounted(() => {
      document.addEventListener('visibilitychange', handleVisibleChange);
    });

    onUnmounted(() => {
      noticeController.evt.off('totalChange', onNumChange);
      document.removeEventListener('visibilitychange', handleVisibleChange);
    });

    return {
      ns,
      c,
      noticeController,
      noticeNum,
      popoverRef,
      showPopover,
      sysImage,
      currentTab,
      hiddenPopover,
      onBatchReadClick,
      semanticClass,
      semanticStyle,
    };
  },
  render() {
    return (
      <div
        title={showTitle(ibiz.i18n.t('panelComponent.userMessage.notice'))}
        class={[
          this.ns.b(),
          this.ns.m(this.modelData.id),
          this.semanticClass('root'),
          ...this.controller.containerClass,
        ]}
        style={this.semanticStyle('root')}
      >
        <el-popover
          ref='popoverRef'
          popper-class={[this.ns.b('popover'), this.semanticClass('popup')]}
          popper-style={this.semanticStyle('popup')}
          placement='bottom'
          trigger='click'
          v-model:visible={this.showPopover}
        >
          {{
            reference: () => {
              return (
                <el-badge
                  class={[this.ns.e('badge'), this.semanticClass('content')]}
                  style={this.semanticStyle('content')}
                  value={this.noticeNum}
                  hidden={this.noticeNum === 0}
                >
                  <i-biz-icon
                    id={PresetIdentifier.MESSAGE}
                    class={[this.ns.e('image')]}
                    icon={this.sysImage}
                  ></i-biz-icon>
                </el-badge>
              );
            },
            default: () => {
              return (
                <div class={this.ns.b('popover-content-box')}>
                  <el-tabs
                    class={this.ns.b('popover-content')}
                    v-model={this.currentTab}
                  >
                    <el-tab-pane
                      label={ibiz.i18n.t('panelComponent.userMessage.notice')}
                      name='notification'
                    >
                      <InternalMessageTab
                        class={this.semanticClass('notification')}
                        style={this.semanticStyle('notification')}
                        controller={this.noticeController.internalMessage}
                        showPopover={this.showPopover}
                        onHiddenPopover={this.hiddenPopover}
                      ></InternalMessageTab>
                    </el-tab-pane>
                    <el-tab-pane
                      label={ibiz.i18n.t(
                        'panelComponent.userMessage.backendTasks',
                      )}
                      name='async-action'
                    >
                      <AsyncActionTab
                        class={this.semanticClass('asyncaction')}
                        style={this.semanticStyle('asyncaction')}
                        controller={this.noticeController.asyncAction}
                        showPopover={this.showPopover}
                        onHiddenPopover={this.hiddenPopover}
                      ></AsyncActionTab>
                    </el-tab-pane>
                  </el-tabs>
                  <div
                    class={[
                      this.ns.b('popover-icons'),
                      this.semanticClass('read'),
                    ]}
                    style={this.semanticStyle('read')}
                  >
                    <iBizIcon
                      class={this.ns.b('popover-icons-read')}
                      icon={{
                        imagePath: 'svg/read.svg',
                      }}
                      baseDir='iconfont'
                      title={showTitle(
                        ibiz.i18n.t('panelComponent.userMessage.allRead'),
                      )}
                      onClick={this.onBatchReadClick}
                    />
                  </div>
                </div>
              );
            },
          }}
        </el-popover>
      </div>
    );
  },
});
