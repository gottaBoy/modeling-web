export declare class IndexedDBUtil {
    static version: number;
    static db: IDBDatabase | null;
    static lastLink: IDBDatabase;
    /**
     * 检查数据库是否存在
     *
     * @param {string} storeName
     * @return {*}  {Promise<boolean>}
     * @memberof IndexedDBUtil
     */
    static checkDataBaseExists(storeName: string): Promise<boolean>;
    /**
     * 删除数据库
     *
     * @return {*}  {Promise<void>}
     * @memberof IndexedDBUtil
     */
    static deleteDatabase(storeName: string): Promise<boolean>;
    /**
     * 检查是否存在某个库以及库内是否存在某个表
     *
     * @param {string} storeName
     * @param {string} tableName
     * @return {*}
     * @memberof IndexedDBUtil
     */
    static checkTableExists(storeName: string, tableName: string): Promise<boolean>;
    /**
     * 创建表
     *
     * @param {string} storeName 库名称
     * @param {(string | null)} keyPath 表主键
     * @param {boolean} [useAutoIncrement=false] 是否使用自增
     * @return {*}  {Promise<void>}
     * @memberof IndexedDBUtil
     */
    static createTable(storeName: string, tableName: string, keyPath: string | null, useAutoIncrement?: boolean): Promise<boolean>;
    /**
     * 删除表
     *
     * @param {string} storeName 表名称
     * @return {*}  {Promise<void>}
     * @memberof IndexedDBUtil
     */
    static deleteTable(storeName: string, tableName: string): Promise<boolean>;
    /**
     * 新增数据
     *
     * @param {string} storeName 表名称
     * @param {*} data 新增数据
     * @return {*}  {Promise<void>}
     * @memberof IndexedDBUtil
     */
    static addData(storeName: string, tableName: string, data: object): Promise<object | null>;
    /**
     * 删除数据
     *
     * @param {string} storeName 表名称
     * @param {IDBValidKey} key 数据键
     * @return {*}  {Promise<void>}
     * @memberof IndexedDBUtil
     */
    static deleteData(storeName: string, tableName: string, key: IDBValidKey): Promise<boolean>;
    /**
     * 修改数据
     *
     * @param {string} storeName 表名称
     * @param {*} data 需要修改的数据
     * @return {*}  {Promise<void>}
     * @memberof IndexedDBUtil
     */
    static updateData(storeName: string, tableName: string, data: object): Promise<object>;
    /**
     * 读取单条数据
     *
     * @param {string} storeName 表名称
     * @param {IDBValidKey} key 数据主键
     * @return {*}  {Promise<any>}
     * @memberof IndexedDBUtil
     */
    static getData(storeName: string, tableName: string, key: IDBValidKey): Promise<object>;
    /**
     * 读取所有数据
     *
     * @param {string} storeName 表名称
     * @return {*}  {Promise<any[]>}
     * @memberof IndexedDBUtil
     */
    static getAllData(storeName: string, tableName: string): Promise<object[]>;
}
