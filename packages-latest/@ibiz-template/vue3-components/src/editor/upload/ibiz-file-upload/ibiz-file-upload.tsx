/* eslint-disable no-unused-vars */
import { computed, defineComponent } from 'vue';
import {
  useNamespace,
  getEditorEmits,
  getUploadProps,
  useFocusAndBlur,
  useSemanticNode,
  useAutoFocusBlur,
} from '@ibiz-template/vue3-util';
import { useIViewUpload } from '../use/use-iview-upload';
import { UploadEditorController } from '../upload-editor.controller';
import { useCustomUpload } from '../use/use-custom-upload';
import './ibiz-file-upload.scss';

/**
 * 文件上传
 *
 * @description 使用el-upload组件封装，用于点击上传文件。支持编辑器类型包含：`文件控件`、`文件控件（单项）`
 * @primary
 * @editorparams {"name":"isdrag","parameterType":"boolean","defaultvalue":false,"description":"el-upload组件的drag属性"}
 * @editorparams {"name":"multiple","parameterType":"boolean","defaultvalue":true,"description":"el-upload组件的multiple属性，类型为文件控件（单项）时默认值为false"}
 * @editorparams {"name":"accept","parameterType":"string","description":"el-upload组件的accept属性"}
 * @editorparams {"name":"uploadparams","parameterType":"string","description":"上传参数，图片或文件上传时，用于计算上传路径"}
 * @editorparams {"name":"exportparams","parameterType":"string","description":"下载参数，图片或文件下载时，用于计算下载路径"}
 * @editorparams {"name":"osscat","parameterType":"string","description":"用于计算上传和下载路径的OSS参数"}
 * @editorparams {"name":"infomap","parameterType":"string","description":"上传文件信息的映射规则字符串，用于将上传成功后返回的文件数据转换为保存数据所需格式。格式为'源键:目标键;源键2:目标键2'。示例：映射规则（'filesize:size;fileext:ext'），源对象（{filesize:'10000', fileext:'.gif'}），转换结果（{size:'10000', ext:'.gif'}）"}
 * @editorparams {"name":"readonly","parameterType":"boolean","defaultvalue":false,"description":"设置编辑器是否为只读态"}
 * @editorparams {"name":"appentitytag","parameterType":"string","description":"在应用启用下载授权时，用于指定当前文件所属实体。该参数值会作为验证下载权限的依据。配置格式为（应用代码名称.实体代码名称），示例：web.master"}
 * @editorparams {"name":"datafieldtag","parameterType":"string","description":"在应用启用下载授权时，用于指定当前文件所关联的数据属性。完成配置后，将自动从容器数据（涵盖表单数据、表格行数据、面板数据）、上下文环境以及视图参数中获取该属性的实际值，将其作为验证下载权限的依据"}
 * @editorparams {"name":"enablenoaccess","parameterType":"boolean","defaultvalue":"false", "description":"是否启用无权限模式，若启用无权限模式，上传文件夹需拼接'$'字符，也不需要计算下载凭证"}
 * @editorparams {"name":"globaldownloadprifix","parameterType":"boolean","defaultvalue":"false", "description":"是否使用全局文件下载前缀，若启用，则以global作为前缀"}
 * @editorparams {"name":"unzip","parameterType":"boolean","defaultvalue":"false","description":"是否开启压缩文件类解压,若开启unzip后，识别unzipfileext中后缀的上传时额外附加unzip=true参数，与unzipfileext参数搭配使用"}
 * @editorparams {"name":"unzipfileext","parameterType":"string","defaultvalue":".zip,.rar,.7z","description":"压缩文件类解压文件类型，当上传文件的后缀名包含该属性值时，若开启unzip，上传时会额外附加unzip=true参数，启用后端解压功能。格式为逗号分隔的文件后缀字符串，默认值：'.zip,.rar,.7z'，与unzip参数搭配使用"}
 * @editorparams {"name":"uploadmode","parameterType":"'DEFAULT' | 'FOLDER' | 'ALL'","defaultvalue":"DEFAULT","description":"上传文件模式，DEFAULT表示文件上传、FOLDER表示文件夹上传、ALL表示文件和文件夹都支持上传，默认值为DEFAULT"}
 * @editorparams {"name":"showfilelist","parameterType":"boolean","defaultvalue":"true","description":"是否显示文件列表,默认显示"}
 * @editorparams {"name":"hiddenfileregex","parameterType":"string","defaultvalue":"","description":"隐藏文件忽略正则，文件夹上传时基于根目录相对路径，匹配到的文件将被忽略不上传。默认空字符串，传空字符串则不过滤"}
 * @ignoreprops autoFocus | overflowMode
 * @ignoreemits blur | focus | enter | infoTextChange
 */
export const IBizFileUpload = defineComponent({
  name: 'IBizFileUpload',
  props: getUploadProps<UploadEditorController>(),
  emits: getEditorEmits(),
  setup(props, { emit }) {
    const ns = useNamespace('file-upload');
    const c = props.controller;
    const { semanticClass, semanticStyle } = useSemanticNode(c);

    // 子类类名透传
    const childClass = [
      {
        class: semanticClass('editor.list'),
        selector: '.el-upload-list',
      },
      {
        class: semanticClass('editor.item'),
        selector: '.el-upload-list__item',
      },
      {
        class: semanticClass('editor.dragger'),
        selector: '.el-upload-dragger',
      },
      {
        class: semanticClass('editor.trigger'),
        selector: `.${ns.b('button')}`,
      },
    ];

    // 子类样式透传
    const childStyle = [
      {
        style: semanticStyle('editor.list'),
        selector: '.el-upload-list',
      },
      {
        style: semanticStyle('editor.item'),
        selector: '.el-upload-list__item',
      },
      {
        style: semanticStyle('editor.dragger'),
        selector: '.el-upload-dragger',
      },
      {
        style: semanticStyle('editor.trigger'),
        selector: `.${ns.b('button')}`,
      },
    ];

    const { useInFocusAndBlur, useInValueChange } = useAutoFocusBlur(
      props,
      emit,
    );

    const {
      uploadUrl,
      headers,
      files,
      limit,
      onDownload,
      onError,
      onRemove,
      onSuccess,
      beforeUpload,
      addCacheCount,
      drainCacheCount,
    } = useIViewUpload(
      props,
      value => {
        emit('change', value);
        useInValueChange();
      },
      c,
      emit,
    );

    // 自定义上传
    const { customUpload, folderInputRef, selectFolder, handleFolderSelect } =
      useCustomUpload(
        c,
        {
          action: uploadUrl.value,
          headers: headers.value,
          onSuccess,
          onError,
          addCacheCount,
          drainCacheCount,
        },
        emit,
      );

    // 不显示上传图标
    const noUploadIcon = computed(() => {
      return limit.value === 1 && files.value?.length === 1;
    });

    // 是否是表格列编辑器
    const isGridEditor = computed(() => {
      return !!(c.parent as IData).model.columnType;
    });

    // 是否显示表单默认内容
    const showFormDefaultContent = computed(() => {
      if (
        props.controlParams &&
        props.controlParams.editmode === 'hover' &&
        !props.readonly
      ) {
        return true;
      }
      return false;
    });

    // 聚焦失焦事件
    const { componentRef } = useFocusAndBlur(
      () => emit('focus'),
      () => useInFocusAndBlur(),
    );

    return {
      c,
      ns,
      files,
      limit,
      headers,
      uploadUrl,
      childClass,
      childStyle,
      noUploadIcon,
      isGridEditor,
      componentRef,
      semanticClass,
      semanticStyle,
      folderInputRef,
      showFormDefaultContent,
      onError,
      onRemove,
      onSuccess,
      onDownload,
      beforeUpload,
      customUpload,
      selectFolder,
      handleFolderSelect,
    };
  },
  render() {
    if (this.c.uploadmode === 'ALL' || this.c.uploadmode === 'FOLDER') {
      return (
        <div
          class={[
            this.ns.b(),
            this.semanticClass('editor.root'),
            this.ns.be('uploadmode', this.c.uploadmode.toLowerCase()),
            this.disabled ? this.ns.m('disabled') : '',
            this.readonly ? this.ns.m('readonly') : '',
            this.ns.is('show-default', this.showFormDefaultContent),
          ]}
          ref='componentRef'
          style={this.semanticStyle('editor.root')}
        >
          <el-upload
            class={[
              this.ns.b('icon'),
              this.ns.e('content'),
              this.semanticClass('editor.content'),
              this.ns.is('not-show', this.noUploadIcon),
            ]}
            style={this.semanticStyle('editor.content')}
            v-child-class={this.childClass}
            v-child-style={this.childStyle}
            file-list={this.files}
            action={this.uploadUrl}
            headers={this.headers}
            disabled={this.disabled || this.readonly}
            multiple={this.c.multiple}
            limit={this.limit}
            drag={!!this.c.isDrag}
            accept={this.c.accept}
            before-upload={this.beforeUpload}
            onSuccess={this.onSuccess}
            onError={this.onError}
            onRemove={this.onRemove}
            onPreview={this.onDownload}
            http-request={this.customUpload}
            showFileList={this.c.showfilelist}
            {...this.$attrs}
          >
            {this.noUploadIcon ? null : (
              <el-button
                class={[
                  this.ns.b('button'),
                  this.semanticClass('editor.trigger'),
                  this.ns.be('button', this.c.uploadmode.toLowerCase()),
                ]}
                style={this.semanticStyle('editor.trigger')}
                size={this.isGridEditor ? 'small' : 'default'}
              >
                {ibiz.i18n.t('editor.upload.uploadFiles')}
              </el-button>
            )}
          </el-upload>
          <div class={this.ns.be('folder', this.c.uploadmode.toLowerCase())}>
            <el-button
              class={[
                this.ns.b('button'),
                this.semanticClass('editor.trigger'),
              ]}
              style={this.semanticStyle('editor.trigger')}
              size={this.isGridEditor ? 'small' : 'default'}
              onClick={(event: MouseEvent) => {
                event.stopPropagation();
                this.selectFolder();
              }}
            >
              {ibiz.i18n.t('editor.upload.uploadfolders')}
            </el-button>
            <input
              ref='folderInputRef'
              type='file'
              style={{ display: 'none' }}
              {...{
                webkitdirectory: true,
                directory: true,
              }}
              onChange={this.handleFolderSelect}
            />
          </div>
        </div>
      );
    }
    return (
      <div
        class={[
          this.ns.b(),
          this.semanticClass('editor.root'),
          this.disabled ? this.ns.m('disabled') : '',
          this.readonly ? this.ns.m('readonly') : '',
          this.ns.is('show-default', this.showFormDefaultContent),
        ]}
        style={this.semanticStyle('editor.root')}
        ref='componentRef'
      >
        <el-upload
          class={[
            this.ns.b('icon'),
            this.ns.e('content'),
            this.ns.is('not-show', this.noUploadIcon),
            this.semanticClass('editor.content'),
          ]}
          style={this.semanticStyle('editor.content')}
          v-child-class={this.childClass}
          v-child-style={this.childStyle}
          file-list={this.files}
          action={this.uploadUrl}
          headers={this.headers}
          disabled={this.disabled || this.readonly}
          multiple={this.c.multiple}
          limit={this.limit}
          drag={!!this.c.isDrag}
          accept={this.c.accept}
          before-upload={this.beforeUpload}
          onSuccess={this.onSuccess}
          onError={this.onError}
          onRemove={this.onRemove}
          onPreview={this.onDownload}
          http-request={this.customUpload}
          showFileList={this.c.showfilelist}
          {...this.$attrs}
        >
          {this.noUploadIcon ? null : (
            <el-button
              style={this.semanticStyle('editor.trigger')}
              class={[
                this.ns.b('button'),
                this.semanticClass('editor.trigger'),
              ]}
              size={this.isGridEditor ? 'small' : 'default'}
            >
              {ibiz.i18n.t('editor.upload.uploadFiles')}
            </el-button>
          )}
        </el-upload>
      </div>
    );
  },
});
