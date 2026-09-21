import { PropType } from 'vue';
import './view-model-viewer.scss';
import { IAppView } from '@ibiz/model-core';
import { CenterController } from '../../controller/center.controller';
export declare const ViewModelViewer: import("vue").DefineComponent<{
    view: {
        type: PropType<IAppView>;
        required: true;
    };
    center: {
        type: PropType<CenterController>;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    currentVal: import("vue").Ref<string>;
    codeEditBox: import("vue").Ref<any>;
    isLoading: import("vue").Ref<boolean>;
    dragBox: import("vue").Ref<any>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    view: {
        type: PropType<IAppView>;
        required: true;
    };
    center: {
        type: PropType<CenterController>;
        required: true;
    };
}>>, {}, {}>;
