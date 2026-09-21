export class DownloadTicket {
    /**
     * Creates an instance of DownloadTicket.
     * @param {IData} opts
     * @memberof DownloadTicket
     */
    constructor(opts) {
        /**
         * @description 超时时间（毫秒数）
         * @type {number}
         * @memberof DownloadTicket
         */
        this.timeout = 3000;
        this.id = opts.id;
        this.name = opts.name;
        this.cat = opts.cat;
        this.ticket = opts.ticket;
        this.expirein = opts.expirein;
        this.expirationTime = Date.now() + Number(this.expirein) * 1000;
        for (const key in opts) {
            if (!Object.prototype.hasOwnProperty.call(this, key)) {
                this[key] = opts[key];
            }
        }
    }
    /**
     * @description 是否过期
     * @readonly
     * @type {boolean}
     * @memberof DownloadTicket
     */
    get isExpirein() {
        if (this.expirationTime - Date.now() >= this.timeout)
            return false;
        return true;
    }
}
