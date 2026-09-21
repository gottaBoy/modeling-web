import { IPanelContainer } from '@ibiz/model-core';
import { PropType } from 'vue';
import { ScreenPanelContainerController } from './screen-panel-container.controller';

export declare const ScreenPanelContainer: import('vue').DefineComponent<{
    modelData: {
        type: PropType<IPanelContainer>;
        required: true;
    };
    controller: {
        type: typeof ScreenPanelContainerController;
        required: true;
    };
}, {
    ns: import('@ibiz-template/core').Namespace;
}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    modelData: {
        type: PropType<IPanelContainer>;
        required: true;
    };
    controller: {
        type: typeof ScreenPanelContainerController;
        required: true;
    };
}>>, {}, {}>;
