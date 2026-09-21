/**
 * 全局配置类,控制应用的功能开关。
 *
 * @author lxm
 * @date 2022-12-09 14:12:28
 * @export
 * @class GlobalConfig
 * @implements {IGlobalConfig}
 */
export class GlobalConfig {
    constructor() {
        // 全局视图配置
        this.view = {
            enableDataInfoBar: true,
            expCacheMode: 'TABEXPPANEL:',
            disableHomeTabs: false,
            mobShowPresetBack: true,
            mobShowViewHeader: true,
            timeoutDuration: 5 * 60 * 1000,
            onlyShowDataInfo: false,
            viewAccUserMode: 3,
            loadingText: '',
        };
        // 全局表格配置
        this.grid = {
            editShowMode: 'row',
            editSaveMode: 'cell-blur',
            saveErrorHandleMode: 'default',
            overflowMode: 'wrap',
            columnAlign: 'center',
            emptyHiddenUnit: true,
        };
        // 全局菜单配置
        this.appMenu = {
            enableEcho: true,
            echoMode: 'VIEW',
            defaultCollapse: false,
        };
        // 全局代码表配置
        this.codeList = {
            timeout: 60 * 60 * 1000,
        };
        // 全局表单配置
        this.form = {
            mdCtrlConfirmBeforeRemove: true,
            mobShowUnderLine: true,
            mobFormItemAlignMode: '',
            mobShowEditorBorder: false,
            emptyHiddenUnit: true,
            showTipsIcon: true,
            validateMode: 'default',
            srfCachePos: false,
            srfCacheKeyTempl: '',
            enableDynaFormJsonSchema: false,
        };
        // 全局看板配置
        this.kanban = {
            enableFullScreen: true,
            enableGroupHidden: false,
        };
        // 全局下拉选择类编辑器配置
        this.pickerEditor = {
            overflowMode: 'auto',
        };
        // 全局上传类编辑器配置
        this.uploadEditor = {
            infoMap: '',
        };
        // 全局搜索表单配置
        this.searchform = {
            enableStoredFilters: true,
            convertParamMode: 'default',
            resetSearchMode: 'default',
        };
        // 全局树配置
        this.tree = {
            contextMenuRightClickInvoke: true,
            enableClickNav: false,
        };
        // 全局通用配置
        this.common = {
            emptyText: '-',
            emptyShowMode: 'DEFAULT',
            searchPhSeparator: '、',
            enableDownloadTicket: false,
            batchToolbarMode: 'default',
            mergeAppMenu: 'default',
            enableAIMinimize: true,
            aiChatTopicCaptionMode: 'default',
            aiResourceMode: undefined,
            enableAIAgentChange: true,
            globalDownloadPrifix: false,
            autoCloseModalView: false,
            aiChatSummaryMaxTokens: 30,
            enableKnowledgeBaseSelect: true,
            enableRecallConfigSetting: true,
            reRankDefaultValue: 2,
            maxChunksDefaultValue: undefined,
            chunkThresholdDefaultValue: undefined,
            chunkPageIndexDefaultValue: undefined,
            enableAsyncActionNotice: false,
            aiChunkView: '',
            aiChunkEntity: '',
            counterMaxValue: 99,
            enhancedUI: false,
            maxExportRowsDefault: 1000,
            uiActionPermissionMode: 'default',
            importTemplNameMode: 'default',
            aiUploadMaxSize: 5242880,
            aiAutoQuestion: true,
            asyncImport: false,
        };
        // 全局分页流布局配置
        this.drtab = {
            enableNavbar: false,
            navbarPos: 'TOPRIGHT',
            navbarWidth: 200,
        };
        // 多数据部件默认排序配置
        this.mdctrldefaultsort = '';
        // 多数据部件刷新模式
        this.mdctrlrefreshmode = 'cache';
        // 下拉选择类编辑器默认排序配置
        this.pickerdefaultsort = '';
        // 提示框信息绘制模式
        this.tooltiprendermode = 'md';
        // 应用水印参数
        this.watermark = {
            enable: false,
            text: '',
            fontSize: 14,
            fontFamily: 'Microsoft YaHei',
            fontWeight: 400,
            fontStyle: 'normal',
            color: 'rgba(0,0,0,0.5)',
            opacity: 0.3,
            rotate: -30,
            gap: [90, 90],
            offset: [0, 0],
            tileSize: { width: 0, height: 0 },
            zIndex: 9999,
            useShadowDom: true,
            protect: true,
            allowSelect: false,
            strictProtect: false,
            ensureRelative: true,
        };
        /**
         * @description 全局移动端配置
         * @type {IGlobalMobConfig}
         * @memberof GlobalConfig
         */
        this.mob = {
            mobShowAppTitle: true,
            mobHomeRouteMode: 'default',
            mobGetSignUrl: '',
            mobGetSignMethod: 'post',
            mobWeChatDebug: false,
            showUploadLoading: false,
            mobShowBackTop: false,
            mobEnableStoredQuery: false,
            toolbarShowMode: 'IMMEDIATE',
            toolbarGroupShowMode: 'ACTIONSHEET',
        };
        /**
         * @description 图片压缩配置
         * @type {IGlobalImgCompressConfig}
         * @memberof GlobalConfig
         */
        this.imgCompressConfig = {
            limit: 1024,
            quality: 0,
            maxWidth: 1280,
        };
    }
}
