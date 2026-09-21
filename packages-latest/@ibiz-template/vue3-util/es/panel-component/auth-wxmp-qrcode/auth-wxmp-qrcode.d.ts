import { PropType } from 'vue';
import { IPanelRawItem } from '@ibiz/model-core';
import { AuthWxmpQrcodeController } from './auth-wxmp-qrcode.controller';
import './auth-wxmp-qrcode.scss';
/**
 * 微信二维码
 * @primary
 * @description 用于在微信环境加载二维码并登录，需在面板项中配置预定义类型为AUTH_WXMP_QRCODE。
 * @panelitemparams {name:pollingtime,parameterType:number,defaultvalue:2,description:登录轮询时间（秒）}
 * @param {*} props
 * @return {*}
 */
export declare const AuthWxmpQrcode: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    /**
     * @description 微信二维码模型
     */
    modelData: {
        type: PropType<IPanelRawItem>;
        required: true;
    };
    /**
     * @description 微信二维码控制器
     */
    controller: {
        type: PropType<AuthWxmpQrcodeController>;
        required: true;
    };
}>, {
    ns: import("@ibiz-template/core").Namespace;
    loadQrcode: () => Promise<void>;
    semanticClass: import("../../use").UseSemanticClassReturn;
    semanticStyle: import("../../use").UseSemanticStyleReturn;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    /**
     * @description 微信二维码模型
     */
    modelData: {
        type: PropType<IPanelRawItem>;
        required: true;
    };
    /**
     * @description 微信二维码控制器
     */
    controller: {
        type: PropType<AuthWxmpQrcodeController>;
        required: true;
    };
}>> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
//# sourceMappingURL=auth-wxmp-qrcode.d.ts.map