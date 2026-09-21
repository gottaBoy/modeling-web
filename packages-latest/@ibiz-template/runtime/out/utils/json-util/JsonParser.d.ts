import { JsonContext } from './JsonContext';
export declare class JsonParser {
    jsonStr: string;
    index: number;
    context: JsonContext;
    logging: boolean;
    logger: any[];
    constructor(jsonStr?: string, logging?: boolean);
    log(text: string): void;
    parse(): any;
    parseValue(): any;
    parseObject(): any;
    parseArray(): any[];
    parseString(): string | number | boolean | null;
    parseNumber(): string | number;
    parseUnquotedString(): string;
    skipWhitespace(): void;
    peek(): string;
}
//# sourceMappingURL=JsonParser.d.ts.map