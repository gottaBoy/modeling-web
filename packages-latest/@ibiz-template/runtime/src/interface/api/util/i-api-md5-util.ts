type Message = string | number[] | ArrayBuffer | Uint8Array;

/**
 * @description 哈希对象，支持链式更新哈希值并以多种格式输出
 * @type {Hasher}
 * @memberof IApiMd5Util
 */
export interface Hasher {
  /**
   * @description 更新哈希
   * @param message 需要哈希的消息
   * @returns 返回哈希对象自身，支持链式调用
   */
  update(message: Message): Hasher;

  /**
   * @description 返回十六进制字符串形式的哈希值
   * @returns 十六进制字符串
   */
  hex(): string;

  /**
   * @description 返回十六进制字符串形式的哈希值
   * @returns 十六进制字符串
   */
  toString(): string;

  /**
   * @description 返回ArrayBuffer形式的哈希值
   * @returns ArrayBuffer
   */
  arrayBuffer(): ArrayBuffer;

  /**
   * @description 返回整数数组形式的哈希值
   * @returns 整数数组
   */
  digest(): number[];

  /**
   * @description 返回整数数组形式的哈希值
   * @returns 整数数组
   */
  array(): number[];

  /**
   * @description 返回Base64字符串形式的哈希值
   * @returns Base64字符串
   */
  base64(): string;
}

/**
 * @description HMAC接口，Hash-based Message Authentication Code，基于哈希的消息身份验证代码，是一种结合了密钥与哈希函数的加密机制
 * @type {Hmac}
 * @memberof IApiMd5Util
 */
export interface Hmac {
  /**
   * @description 使用密钥计算基于哈希的消息认证码（HMAC）
   * @param secretKey 密钥
   * @param message 需要哈希的消息
   * @returns HMAC十六进制字符串
   */
  (secretKey: Message, message: Message): string;

  /**
   * @description 使用密钥创建哈希对象
   * @param secretKey 密钥
   * @returns 哈希对象
   */
  create(secretKey: Message): Hasher;

  /**
   * @description 创建哈希对象并使用密钥哈希消息
   * @param secretKey 密钥
   * @param message 需要哈希的消息
   * @returns 哈希对象
   */
  update(secretKey: Message, message: Message): Hasher;

  /**
   * @description 返回十六进制字符串形式的哈希值
   * @param secretKey 密钥
   * @param message 需要哈希的消息
   * @returns 十六进制字符串
   */
  hex(secretKey: Message, message: Message): string;

  /**
   * @description 返回ArrayBuffer形式的哈希值
   * @param secretKey 密钥
   * @param message 需要哈希的消息
   * @returns ArrayBuffer
   */
  arrayBuffer(secretKey: Message, message: Message): ArrayBuffer;

  /**
   * @description 返回整数数组形式的哈希值
   * @param secretKey 密钥
   * @param message 需要哈希的消息
   * @returns 整数数组
   */
  digest(secretKey: Message, message: Message): number[];

  /**
   * @description 返回整数数组形式的哈希值
   * @param secretKey 密钥
   * @param message 需要哈希的消息
   * @returns 整数数组
   */
  array(secretKey: Message, message: Message): number[];

  /**
   * @description 返回Base64字符串形式的哈希值
   * @param secretKey 密钥
   * @param message 需要哈希的消息
   * @returns Base64字符串
   */
  base64(secretKey: Message, message: Message): string;
}

/**
 * @description 哈希接口，提供MD5哈希计算能力
 * @type {Hash}
 * @memberof IApiMd5Util
 */
export interface Hash {
  /**
   * @description 哈希并返回十六进制字符串
   * @param message 需要哈希的消息
   * @returns 十六进制字符串
   */
  (message: Message): string;

  /**
   * @description 创建哈希对象
   * @returns 哈希对象
   */
  create(): Hasher;

  /**
   * @description 创建哈希对象并哈希消息
   * @param message 需要哈希的消息
   * @returns 哈希对象
   */
  update(message: Message): Hasher;

  /**
   * @description 返回十六进制字符串形式的哈希值
   * @param message 需要哈希的消息
   * @returns 十六进制字符串
   */
  hex(message: Message): string;

  /**
   * @description 返回ArrayBuffer形式的哈希值
   * @param message 需要哈希的消息
   * @returns ArrayBuffer
   */
  arrayBuffer(message: Message): ArrayBuffer;

  /**
   * @description 返回整数数组形式的哈希值
   * @param message 需要哈希的消息
   * @returns 整数数组
   */
  digest(message: Message): number[];

  /**
   * @description 返回整数数组形式的哈希值
   * @param message 需要哈希的消息
   * @returns 整数数组
   */
  array(message: Message): number[];

  /**
   * @description 返回Base64字符串形式的哈希值
   * @param message 需要哈希的消息
   * @returns Base64字符串
   */
  base64(message: Message): string;

  /**
   * @description HMAC接口
   * @type {Hmac}
   */
  hmac: Hmac;
}
