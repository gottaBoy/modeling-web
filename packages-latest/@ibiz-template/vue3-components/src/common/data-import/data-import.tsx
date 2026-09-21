import { IAppDataEntity, IAppDEDataImport } from '@ibiz/model-core';
import { useNamespace } from '@ibiz-template/vue3-util';
import { defineComponent, ref, PropType } from 'vue';
import {
  selectAndImport,
  downloadImportTemplate,
} from '@ibiz-template/runtime';
import './data-import.scss';

export const DataImport = defineComponent({
  name: 'DataImport',
  props: {
    dismiss: {
      type: Function as PropType<() => void>,
      required: true,
    },
    appDataEntity: {
      type: Object as PropType<IAppDataEntity>,
      required: true,
    },
    dataImport: {
      type: Object as PropType<IAppDEDataImport>,
      required: false,
    },
    context: {
      type: Object as PropType<IContext>,
      required: false,
    },
    params: {
      type: Object as PropType<IParams>,
      required: false,
    },
  },
  setup(props) {
    const ns = useNamespace('data-import');
    const message = ref<{
      state: 'ready' | 'over' | 'error';
      message: string;
      errorfile: IData | undefined;
      messageTitle: string;
      errorMessage: string;
    }>({
      state: 'ready',
      message: '',
      errorfile: undefined,
      messageTitle: '',
      errorMessage: '',
    });

    const isLoading = ref(false);

    const importTemplName =
      ibiz.config.common.importTemplNameMode === 'custom'
        ? `${props.dataImport?.name}${ibiz.i18n.t('component.dataImport.template')}`
        : `${props.appDataEntity.logicName}${ibiz.i18n.t('component.dataImport.templateFile')}`;

    const onCancelButtonClick = () => {
      props.dismiss();
    };

    // 下载模板文件
    const onLinkClick = async () => {
      downloadImportTemplate(
        props.appDataEntity,
        props.dataImport,
        props.context,
        props.params,
        ibiz.config.common.importTemplNameMode === 'custom'
          ? importTemplName
          : undefined,
      );
    };

    // 下载错误文件
    const onErrorInfoClick = async () => {
      if (!message.value.errorfile) return;
      let { downloadUrl } = ibiz.util.file.calcFileUpDownUrl(
        props.context!,
        props.params!,
        {},
        { osscat: message.value.errorfile.folder },
      );
      downloadUrl = downloadUrl.replace(
        '%fileId%',
        message.value.errorfile.fileid,
      );
      ibiz.util.file.fileDownload(
        downloadUrl,
        `${ibiz.i18n.t('component.dataImport.importError')}.xlsx`,
      );
    };

    const selectFile = async () => {
      isLoading.value = true;
      // 重置提示信息
      message.value.message = '';
      message.value.state = 'ready';
      message.value.errorfile = undefined;
      message.value.messageTitle = '';
      message.value.errorMessage = '';
      const result = await selectAndImport({
        appDataEntity: props.appDataEntity,
        dataImport: props.dataImport,
        context: props.context,
        params: props.params,
      });

      // 取消上传的时候
      if (result.cancel) {
        isLoading.value = false;
        return;
      }

      if (!result.isAsync) {
        const {
          success,
          total,
          message: _message,
          errormessage,
          showTitle,
          errorfile,
        } = result;
        const totalNum = total ? Number(total) : 0;
        const successNum = success ? Number(success) : 0;
        const errorNum = totalNum - successNum;
        message.value.state = errormessage ? 'error' : 'over';
        if (showTitle) {
          message.value.messageTitle = ibiz.i18n.t(
            'component.dataImport.importSuccess',
            {
              totalNum,
              successNum,
              errorNum,
            },
          );
        }
        if (_message) {
          message.value.message = _message;
        }
        if (errormessage) {
          message.value.errorMessage = errormessage;
        }
        if (errorfile) {
          message.value.errorfile = errorfile;
        }
      }
      isLoading.value = false;
      if (result.isAsync) {
        onCancelButtonClick();
      }
    };

    return {
      ns,
      message,
      isLoading,
      importTemplName,
      selectFile,
      onLinkClick,
      onCancelButtonClick,
      onErrorInfoClick,
    };
  },
  render() {
    return (
      <div class={this.ns.b()} v-loading={this.isLoading}>
        <div class={this.ns.e('caption')}>
          {ibiz.i18n.t('component.dataImport.importData')}
        </div>
        {this.message.state === 'ready' ? (
          <div class={this.ns.b('upload')} onClick={this.selectFile}>
            <img
              class={this.ns.be('upload', 'img')}
              src='./assets/images/icon-import.svg'
            ></img>
            <span class={this.ns.be('upload', 'text')}>
              {ibiz.i18n.t('component.dataImport.clickToUpload')}
            </span>
          </div>
        ) : (
          <div class={[this.ns.b('message')]}>
            <div class={this.ns.be('message', 'title')}>
              <div>{ibiz.i18n.t('component.dataImport.importResults')}</div>
              {this.message.errorfile && (
                <div
                  class={this.ns.e('file-link')}
                  onClick={this.onErrorInfoClick}
                >
                  <ion-icon class={this.ns.e('link-icon')} name='link' />
                  {ibiz.i18n.t('component.dataImport.detailedLogs')}
                </div>
              )}
            </div>
            <div class={[this.ns.be('message', 'content')]}>
              {this.message.messageTitle && (
                <div class={this.ns.be('content', 'title')}>
                  {this.message.messageTitle}
                </div>
              )}
              {this.message.message && (
                <div class={this.ns.be('content', 'message')}>
                  {this.message.message}
                </div>
              )}
              {this.message.errorMessage && (
                <div class={this.ns.be('content', 'error')}>
                  {this.message.errorMessage}
                </div>
              )}
            </div>
          </div>
        )}
        <div class={this.ns.e('template-container')}>
          <div class={this.ns.e('template-description')}>
            {ibiz.i18n.t('component.dataImport.downloadTemplate')}
          </div>
          <div class={this.ns.e('file-link')} onClick={this.onLinkClick}>
            <ion-icon class={this.ns.e('link-icon')} name='link' />
            {this.importTemplName}
          </div>
        </div>
        <div class={this.ns.e('button-bar')}>
          <el-button onClick={this.onCancelButtonClick}>
            {ibiz.i18n.t('app.cancel')}
          </el-button>
          {this.message.state !== 'ready' && (
            <el-button onClick={this.selectFile}>
              {ibiz.i18n.t('component.dataImport.continue')}
            </el-button>
          )}
        </div>
      </div>
    );
  },
});
