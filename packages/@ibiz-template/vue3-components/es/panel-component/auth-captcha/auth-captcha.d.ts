import { PropType } from 'vue';
import { IPanelRawItem } from '@ibiz/model-core';
import { AuthCaptchaController } from './auth-captcha.controller';
import './auth-captcha.scss';
export declare const AuthCaptcha: import("vue").DefineComponent<{
    modelData: {
        type: PropType<IPanelRawItem>;
        required: true;
    };
    controller: {
        type: typeof AuthCaptchaController;
        required: true;
    };
}, {
    c: AuthCaptchaController;
    ns: import("@ibiz-template/core").Namespace;
    classArr: import("vue").ComputedRef<(string | false)[]>;
    onClick: () => void;
    onChange: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: PropType<IPanelRawItem>;
        required: true;
    };
    controller: {
        type: typeof AuthCaptchaController;
        required: true;
    };
}>>, {}, {}>;
