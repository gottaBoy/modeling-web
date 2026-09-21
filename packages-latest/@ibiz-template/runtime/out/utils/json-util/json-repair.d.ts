/**
 * Bozuk JSON string'ini onarır
 * @param {string} jsonStr - Onarılacak JSON string'i
 * @param {Object} options - Onarım seçenekleri
 * @param {boolean} options.returnObjects - true ise JavaScript objesi döner, false ise JSON string döner
 * @param {boolean} options.skipJsonParse - true ise JSON.parse kontrolünü atlar
 * @param {boolean} options.logging - true ise onarım loglarını da döner
 * @param {boolean} options.ensureAscii - false ise Unicode karakterleri korur
 * @returns {string|Object} Onarılmış JSON string'i veya objesi
 */
export declare function repairJson(jsonStr?: string, options?: any): any;
/**
 * JSON.parse benzeri fonksiyon, ancak bozuk JSON'ları da onarır
 * @param {string} jsonStr - Parse edilecek JSON string'i
 * @param {Object} options - Parse seçenekleri
 * @param {boolean} options.skipJsonParse - true ise JSON.parse kontrolünü atlar
 * @param {boolean} options.logging - true ise onarım loglarını da döner
 * @returns {Object} Parse edilmiş JavaScript objesi
 */
export declare function loads(jsonStr: string, options?: {}): any;
//# sourceMappingURL=json-repair.d.ts.map