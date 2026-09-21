/**
 * @description 图片压缩配置
 * @export
 * @interface IApiGlobalImgCompressConfig
 */
export interface IApiGlobalImgCompressConfig {
    /**
     * @description 图片压缩阈值（单位：KB）；当图片大小超过该值时触发压缩
     * @type {number}
     * @default 1024
     * @platform mob
     * @memberof IApiGlobalImgCompressConfig
     */
    limit: number;
    /**
     * @description 图片压缩质量（范围：0~1）；值越小压缩率越高，0 表示不进行压缩
     * @type {number}
     * @default 0
     * @platform mob
     * @memberof IApiGlobalImgCompressConfig
     */
    quality: number;
    /**
     * @description 压缩后图片允许的最大宽度（单位：px），超过时按比例缩放
     * @type {number}
     * @default 1280
     * @platform mob
     * @memberof IApiGlobalImgCompressConfig
     */
    maxWidth: number;
}
//# sourceMappingURL=i-api-global-img-compress-config.d.ts.map