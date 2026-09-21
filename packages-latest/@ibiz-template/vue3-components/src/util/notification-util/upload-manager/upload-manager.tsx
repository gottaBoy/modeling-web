/* eslint-disable no-nested-ternary */
/* eslint-disable no-await-in-loop */
import {
  Ref,
  ref,
  watch,
  PropType,
  computed,
  onMounted,
  defineComponent,
} from 'vue';
import { IUploadManagerParams } from '@ibiz-template/runtime';
import { useNamespace } from '@ibiz-template/vue3-util';
import { getFileSvgByType } from './file-type';
import './upload-manager.scss';

interface IFile {
  /**
   * 文件
   *
   * @type {File}
   */
  file: File;
  /**
   * 状态
   *
   * (未上传 | 已上传 | 上传失败)
   * @type {(10 | 20 | 30)}
   */
  status: 10 | 20 | 30;
  /**
   * 进度
   *
   * @type {number}
   */
  progress: number;
  /**
   * 状态文本
   *
   * @type {string}
   */
  statusText?: string;
  /**
   * 响应数据
   *
   * @type {IData}
   * @memberof IFile
   */
  data?: IData;
}

export const IBizUploadManager = defineComponent({
  name: 'IBizUploadManager',
  props: {
    params: {
      type: Object as PropType<IUploadManagerParams>,
      required: true,
    },
  },
  emits: {
    close: () => true,
    uploadComplete: (_data: IData[]) => true,
  },
  setup(props, { emit }) {
    const ns = useNamespace('upload-manager');

    /**
     * 上传文件列表
     */
    const fileList: Ref<IFile[]> = ref([]);

    /**
     * 是否显示文件列表
     */
    const showFileList: Ref<boolean> = ref(true);

    for (let i = 0; i < props.params.files.length; i++) {
      fileList.value.push({
        file: props.params.files[i],
        status: 10,
        progress: 0,
      });
    }

    /**
     * 是否上传完成
     */
    const uploading = computed(() => {
      return fileList.value.findIndex(item => item.status === 10) !== -1;
    });

    /**
     * 上传结果状态(判断是否有上传错误)
     */
    const uploadStatus = computed(() => {
      return fileList.value.findIndex(item => item.status === 30) === -1;
    });

    /**
     * 文件列表上传进度
     */
    const progress = computed(() => {
      const uploaded = fileList.value.filter(item => item.status !== 10);
      return Math.floor((uploaded.length / fileList.value.length) * 100);
    });

    watch(
      () => uploading.value,
      () => {
        // 所有文件都已上传
        if (!uploading.value) {
          // 将上传成功的响应数据返回
          const data = fileList.value
            .filter(item => item.status === 20 && !!item.data)
            .map(item => item.data) as IData[];
          emit('uploadComplete', data);
        }
      },
    );

    const onClose = () => {
      emit('close');
    };

    /**
     * 改变显示文件列表
     */
    const onChangeShowFileList = () => {
      showFileList.value = !showFileList.value;
    };

    /**
     * 上传文件
     * @param item
     * @returns
     */
    const uploadFile = async (item: IFile) => {
      const data = new FormData();
      data.append('file', item.file);
      const headers = ibiz.util.file.getUploadHeaders();
      const res = await ibiz.net.axios({
        url: props.params.uploadUrl,
        method: 'post',
        headers,
        data,
        onUploadProgress: ProgressEvent => {
          const percentCompleted = Math.round(
            (ProgressEvent.loaded * 100) / (ProgressEvent.total || 1),
          );
          item.progress = percentCompleted;
        },
      });
      return res;
    };

    onMounted(async () => {
      // 异步上传
      for (let i = 0; i < fileList.value.length; i++) {
        const item = fileList.value[i];
        uploadFile(item)
          .then(res => {
            item.data = res.data;
            item.status = res.status === 200 ? 20 : 30;
            item.statusText = res.statusText;
          })
          .catch(error => {
            item.status = 30;
            item.statusText = (error as Error).message
              ? (error as Error).message
              : ibiz.i18n.t('util.uploadManager.failed');
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
      onChangeShowFileList,
    };
  },
  render() {
    return (
      <div class={this.ns.b()}>
        <div class={this.ns.e('header')}>
          <div class={this.ns.em('header', 'loading')}>
            {this.uploading ? (
              <el-progress
                type={'circle'}
                percentage={this.progress}
                showText={false}
              />
            ) : this.uploadStatus ? (
              <ion-icon
                name='checkmark-circle'
                class={'icon success'}
              ></ion-icon>
            ) : (
              <ion-icon name='close-circle' class={'icon danger'}></ion-icon>
            )}
          </div>
          <div class={this.ns.em('header', 'title')}>
            <span class={'caption'}>
              {ibiz.i18n.t('util.uploadManager.title')}
            </span>
            <span class={'progress'}>
              {`${this.fileList.filter(item => item.status === 20).length} / ${
                this.fileList.length
              }`}
            </span>
          </div>
          <div class={this.ns.em('header', 'actions')}>
            <ion-icon
              name={
                this.showFileList
                  ? 'chevron-down-outline'
                  : 'chevron-up-outline'
              }
              class={'icon down-up'}
              onClick={this.onChangeShowFileList}
            ></ion-icon>
            <ion-icon
              name='close-outline'
              class={'icon close'}
              onClick={this.onClose}
            ></ion-icon>
          </div>
        </div>
        {this.showFileList && (
          <div class={this.ns.e('content')}>
            {this.fileList.map(item => {
              return (
                <div class={this.ns.e('file-item')}>
                  <div class={this.ns.em('file-item', 'icon')}>
                    {getFileSvgByType(item.file.type)}
                  </div>
                  <div class={this.ns.em('file-item', 'name')}>
                    {item.file.name}
                  </div>
                  <div class={this.ns.em('file-item', 'status')}>
                    {item.status === 10 && (
                      <el-progress type={'circle'} percentage={item.progress} />
                    )}
                    {item.status === 20 && (
                      <ion-icon
                        name='checkmark-circle'
                        class={'icon success'}
                      ></ion-icon>
                    )}
                    {item.status === 30 && (
                      <ion-icon
                        name='close-circle'
                        class={'icon danger'}
                      ></ion-icon>
                    )}
                  </div>
                  {item.status === 30 && (
                    <div class={this.ns.em('file-item', 'status-text')}>
                      {item.statusText}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  },
});
