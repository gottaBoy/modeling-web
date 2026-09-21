import { PropType } from 'vue';
import { IDBPortletPart } from '@ibiz/model-core';
import { PortletPartController } from '@ibiz-template/runtime';
import { ScreenPortletController } from './screen-portlet.controller';

export declare const ScreenPortlet: import('vue').DefineComponent<{
    modelData: {
        type: PropType<IDBPortletPart>;
        required: true;
    };
    controller: {
        type: typeof PortletPartController;
        required: true;
    };
}, {
    c: ScreenPortletController;
    ns: Namespace;
}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    modelData: {
        type: PropType<IDBPortletPart>;
        required: true;
    };
    controller: {
        type: typeof PortletPartController;
        required: true;
    };
}>>, {}, {}>;
