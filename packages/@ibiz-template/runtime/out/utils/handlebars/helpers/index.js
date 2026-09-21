import { HelperAnd } from './and/and';
import { HelperCamelCase } from './camel-case/camel-case';
import { HelperConcat } from './concat/concat';
import { HelperEq } from './eq/eq';
import { HelperGt } from './gt/gt';
import { HelperGte } from './gte/gte';
import { HelperEqPropertyValue } from './eq-property-value/eq-property-value';
import { HelperJsonParse } from './json/json-parse';
import { HelperJsonStringify } from './json/json-stringify';
import { HelperLowerCase } from './lower-case/lower-case';
import { HelperLt } from './lt/lt';
import { HelperLte } from './lte/lte';
import { HelperNeq } from './neq/neq';
import { HelperNot } from './not/not';
import { HelperOr } from './or/or';
import { HelperPascalCase } from './pascal-case/pascal-case';
import { HelperSnakeCase } from './snake-case/snake-case';
import { HelperSpinalCase } from './spinal-case/spinal-case';
import { HelperUpperCase } from './upper-case/upper-case';
/**
 * 安装自定义助手
 *
 * @author chitanda
 * @date 2021-12-24 14:12:05
 * @export
 */
export function installHelpers(hsb) {
    new HelperAnd(hsb);
    new HelperCamelCase(hsb);
    new HelperConcat(hsb);
    new HelperEq(hsb);
    new HelperGt(hsb);
    new HelperGte(hsb);
    new HelperJsonParse(hsb);
    new HelperJsonStringify(hsb);
    new HelperLowerCase(hsb);
    new HelperLt(hsb);
    new HelperLte(hsb);
    new HelperNeq(hsb);
    new HelperNot(hsb);
    new HelperOr(hsb);
    new HelperPascalCase(hsb);
    new HelperSnakeCase(hsb);
    new HelperSpinalCase(hsb);
    new HelperUpperCase(hsb);
    new HelperEqPropertyValue(hsb);
}
