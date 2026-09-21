import { PropType } from 'vue';
import SignaturePad from './util/signature_pad';
import './signature-pad.scss';
export declare const IBizSignaturePad: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    options: {
        type: PropType<import("@ibiz-template/core").IApiData>;
    };
}>, {
    ns: import("@ibiz-template/core").Namespace;
    canvasRef: import("vue").Ref<any, any>;
    signaturePadRef: import("vue").Ref<any, any>;
    signaturePad: import("vue").Ref<SignaturePad | undefined, SignaturePad | undefined>;
    updateSignaturePad: (_callback?: () => void) => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    options: {
        type: PropType<import("@ibiz-template/core").IApiData>;
    };
}>> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
//# sourceMappingURL=signature-pad.d.ts.map