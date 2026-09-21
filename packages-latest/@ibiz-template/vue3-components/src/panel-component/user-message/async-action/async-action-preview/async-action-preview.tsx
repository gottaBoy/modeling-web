import {
  downloadFileFromBlob,
  IPortalAsyncAction,
  RuntimeError,
} from '@ibiz-template/core';
import { IModal } from '@ibiz-template/runtime';
import { useNamespace } from '@ibiz-template/vue3-util';
import qs from 'qs';
import { defineComponent, PropType, reactive } from 'vue';
import './async-action-preview.scss';

/**
 * 请求url获取文件流，并用JS触发文件下载
 *
 * @author lxm
 * @date 2022-11-17 14:11:09
 * @param {string} url
 * @param {IData} file
 */
function fileDownload(file: { url: string; name: string }): void {
  // 发送get请求
  ibiz.net
    .request(file.url, {
      method: 'get',
      responseType: 'blob',
      baseURL: '', // 已经有baseURL了，这里无需再写
    })
    .then((response: IData) => {
      let filename = qs.parse(response.headers['content-disposition'], {
        delimiter: ';',
      }).filename as string;
      if (filename) {
        // 特殊处理返回的文件名带有双引号
        if (filename.startsWith('"') && filename.endsWith('"')) {
          filename = filename.substring(1, filename.length - 1);
        }
        file.name += `.${filename.split('.')[1]}`;
      }

      if (response.status !== 200) {
        throw new RuntimeError(
          ibiz.i18n.t(
            'panelComponent.userMessage.asyncActionPreview.downloadFailedErr',
          ),
        );
      }
      // 请求成功，后台返回的是一个文件流
      if (!response.data) {
        throw new RuntimeError(
          ibiz.i18n.t(
            'panelComponent.userMessage.asyncActionPreview.noExistentErr',
          ),
        );
      } else {
        // 获取文件名
        const fileName = file.name;
        downloadFileFromBlob(response.data, fileName);
      }
    });
}

export const AsyncActionPreview = defineComponent({
  name: 'IBizAsyncActionPreview',
  props: {
    asyncAction: {
      type: Object as PropType<IPortalAsyncAction>,
      required: true,
    },
    modal: { type: Object as PropType<IModal>, required: true },
  },
  setup(props) {
    const ns = useNamespace('async-action-preview');

    const onClose = () => {
      props.modal.dismiss();
    };

    const info = reactive({
      title: '',
      beginTime: '',
      endTime: '',
      total: 0,
      success: 0,
      error: 0,
      errorDetails: [
        {
          row: 0,
          reason: '',
        },
      ],
      errorFileUrl: '',
    });

    info.title = ibiz.i18n.t(
      'panelComponent.userMessage.asyncActionPreview.importDetailPrompt',
      { name: props.asyncAction.asyncacitonname },
    );
    info.beginTime = props.asyncAction.begintime;
    info.endTime = props.asyncAction.endtime;
    if (props.asyncAction.actionresult) {
      let actionResult: IData = props.asyncAction.actionresult;
      if (typeof actionResult === 'string') {
        try {
          actionResult = JSON.parse(actionResult as string);
        } catch (error) {
          throw new RuntimeError(
            ibiz.i18n.t(
              'panelComponent.userMessage.asyncActionPreview.parseImportInfoErr',
            ),
          );
        }
      }
      info.total = actionResult.total || 0;
      info.success = actionResult.success || 0;
      info.error = info.total - info.success;

      // 错误信息
      if (actionResult.errorinfo) {
        info.errorDetails = Object.keys(actionResult.errorinfo).map(key => {
          return {
            row: Number(key),
            reason: actionResult.errorinfo[key].errorInfo as string,
          };
        });
      } else {
        info.errorDetails = [];
      }

      // 错误文件
      if (actionResult.errorfile) {
        info.errorFileUrl =
          `${ibiz.env.baseUrl}/${ibiz.env.appId}${ibiz.env.downloadFileUrl}/${actionResult.errorfile.folder}/${actionResult.errorfile.fileid}`.replace(
            '/{cat}',
            '',
          );
      }
    }

    const onDownLoad = () => {
      fileDownload({ url: info.errorFileUrl, name: info.title });
    };

    return { ns, info, onClose, onDownLoad };
  },
  render() {
    return (
      <div class={[this.ns.b()]}>
        <div class={this.ns.b('header')}>
          <div class={this.ns.e('title')}>{this.info.title}</div>
          <div class={this.ns.b('toolbar')}>
            {this.info.errorFileUrl && (
              <el-button onClick={this.onDownLoad}>
                {ibiz.i18n.t(
                  'panelComponent.userMessage.asyncActionPreview.downloadErrFile',
                )}
              </el-button>
            )}
            <el-button onClick={this.onClose}>
              {ibiz.i18n.t('app.close')}
            </el-button>
          </div>
        </div>
        <div class={this.ns.b('time')}>
          <el-form-item
            label={ibiz.i18n.t(
              'panelComponent.userMessage.asyncActionPreview.importTime',
            )}
          >
            {this.info.beginTime} ~ {this.info.endTime}
          </el-form-item>
        </div>
        <el-row class={this.ns.b('count')}>
          <el-col span={8}>
            <el-form-item
              label={ibiz.i18n.t(
                'panelComponent.userMessage.asyncActionPreview.importTotal',
              )}
            >
              {this.info.total}
            </el-form-item>
          </el-col>
          <el-col span={8}>
            <el-form-item
              label={ibiz.i18n.t(
                'panelComponent.userMessage.asyncActionPreview.successImport',
              )}
            >
              {this.info.success}
            </el-form-item>
          </el-col>
          <el-col span={8}>
            <el-form-item
              label={ibiz.i18n.t(
                'panelComponent.userMessage.asyncActionPreview.ImportFailed',
              )}
            >
              {this.info.error}
            </el-form-item>
          </el-col>
        </el-row>
        {this.info.errorDetails.length > 0 && (
          <div class={this.ns.b('detail')}>
            {this.info.errorDetails.map(detail => {
              return (
                <div class={this.ns.b('detail-item')}>
                  <div class={this.ns.be('detail-item', 'index')}>
                    {detail.row}
                  </div>
                  <div class={this.ns.be('detail-item', 'error')}>
                    <div class={this.ns.be('detail-item', 'error-title')}>
                      {ibiz.i18n.t('app.error')}
                    </div>
                    <div class={this.ns.be('detail-item', 'error-reason')}>
                      {detail.reason}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  },
});
