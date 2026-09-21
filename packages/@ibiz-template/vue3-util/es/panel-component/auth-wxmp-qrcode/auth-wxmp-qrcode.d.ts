import { PropType } from 'vue';
import { IPanelRawItem } from '@ibiz/model-core';
import { AuthWxmpQrcodeController } from './auth-wxmp-qrcode.controller';
import './auth-wxmp-qrcode.scss';
export declare const AuthWxmpQrcode: import("vue").DefineComponent<{
    modelData: {
        type: PropType<IPanelRawItem>;
        required: true;
    };
    controller: {
        type: PropType<AuthWxmpQrcodeController>;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    loadQrcode: () => Promise<void>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: PropType<IPanelRawItem>;
        required: true;
    };
    controller: {
        type: PropType<AuthWxmpQrcodeController>;
        required: true;
    };
}>>, {}, {}>;
//# sourceMappingURL=auth-wxmp-qrcode.d.ts.map