/**
 * 搜索栏服务
 * @return {*}
 * @author: zhujiamin
 * @Date: 2023-12-22 10:28:32
 */
export class SearchBarService {
    /**
     * Creates an instance of ControlService.
     *
     */
    constructor(model, viewTag) {
        /**
         * 主题管理URL
         * @return {*}
         * @author: zhujiamin
         * @Date: 2023-12-22 10:51:49
         */
        this.themeUrl = '/extension/app_view_themes';
        this.model = model;
        this.viewTag = viewTag;
    }
    async init(_context) {
        this.app = ibiz.hub.getApp(this.model.appId);
    }
    /**
     * 执行查询多条数据的方法
     *
     */
    async fetch() {
        const searchconds = [
            {
                condop: 'EQ',
                condtype: 'DEFIELD',
                fieldname: 'app_view_tag',
                value: this.viewTag,
            },
        ];
        const res = await this.app.net.post(`${this.themeUrl}/fetch_cur_user_all`, {
            searchconds,
            sort: 'create_time,asc',
        });
        if (res.ok) {
            res.data = this.convertBackDataToFront(res.data);
        }
        return res;
    }
    /**
     * 执行获取单条数据方法
     *
     */
    async get(id) {
        const res = await this.app.net.get(`${this.themeUrl}/${id}`);
        if (res.ok) {
            [res.data] = this.convertBackDataToFront([res.data]);
        }
        return res;
    }
    /**
     * 删除单条数据
     *
     */
    async remove(id) {
        const res = await this.app.net.delete(`${this.themeUrl}/${id}`);
        return res;
    }
    /**
     * 新建数据（只有一个标题）
     *
     */
    async create(caption) {
        const res = await this.app.net.post(`${this.themeUrl}`, {
            name: `${this.viewTag}___${caption}`,
            caption,
            app_tag: this.model.appId,
            app_view_tag: this.viewTag,
        });
        return res;
    }
    /**
     * 新建数据（带参数，给平台配置建立的分组用，分组项名称就是id）
     *
     */
    async createWithParams(group, data) {
        const res = await this.app.net.post(`${this.themeUrl}`, {
            name: group.name,
            caption: group.caption,
            app_tag: this.model.appId,
            app_view_tag: this.viewTag,
            theme_model: JSON.stringify(data),
            valid_flag: group.show ? 1 : 0,
        });
        return res;
    }
    /**
     * 批量新建
     * @param {IData} data
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-12-26 15:49:00
     */
    async createBatch(data) {
        const createParams = this.convertFrontDataToBack(data);
        const res = await this.app.net.post(`${this.themeUrl}`, createParams);
        return res;
    }
    /**
     * 更新数据
     *
     */
    async update(id, data) {
        const [updateParams] = this.convertFrontDataToBack([data]);
        const res = await this.app.net.put(`${this.themeUrl}/${id}`, updateParams);
        return res;
    }
    /**
     * 批量更新数据
     * @param {IData} data
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-12-26 11:11:34
     */
    async updateBatch(data) {
        const updateParams = this.convertFrontDataToBack(data);
        const idUrl = updateParams.map(item => item.id).join(';');
        const res = await this.app.net.put(`${this.themeUrl}/${idUrl}`, updateParams);
        return res;
    }
    /**
     * 转换后台数据成前端需要的格式
     * @param {IData} data
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-12-22 11:19:50
     */
    convertBackDataToFront(data) {
        return data.map(item => {
            const tempItem = Object.assign({}, item);
            if (item.id) {
                tempItem.id = item.id;
            }
            if (item.name) {
                tempItem.name = item.name;
            }
            if (item.caption) {
                tempItem.caption = item.caption;
            }
            if (item.theme_model) {
                tempItem.searchGroupData = JSON.parse(item.theme_model);
            }
            if (typeof item.valid_flag === 'number') {
                tempItem.show = item.valid_flag === 1;
            }
            if (item.order_value) {
                tempItem.order = item.order_value;
            }
            if (item.owner_type) {
                tempItem.ownerType = item.owner_type;
            }
            return tempItem;
        });
    }
    /**
     * 转换前端数据成后台需要的格式
     * @param {IData} data
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-12-22 11:19:50
     */
    convertFrontDataToBack(data) {
        return data.map(item => {
            const tempItem = {
                app_tag: this.model.appId,
                app_view_tag: this.viewTag,
            };
            if (item.id) {
                tempItem.id = item.id;
            }
            if (item.name) {
                tempItem.name = item.name;
            }
            if (item.caption) {
                tempItem.caption = item.caption;
            }
            if (item.searchGroupData &&
                Object.keys(item.searchGroupData).length > 0) {
                tempItem.theme_model = JSON.stringify(item.searchGroupData);
            }
            if (typeof item.show === 'boolean') {
                tempItem.valid_flag = item.show ? 1 : 0;
            }
            if (item.order) {
                tempItem.order_value = item.order;
            }
            if (item.ownerType) {
                tempItem.owner_type = item.ownerType;
            }
            return tempItem;
        });
    }
}
