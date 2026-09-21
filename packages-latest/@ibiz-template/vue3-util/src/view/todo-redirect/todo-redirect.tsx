import qs from 'qs';
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export const TodoRedirect = defineComponent({
  setup() {
    const router = useRouter();

    const { href } = window.location;

    const i = href.lastIndexOf('?');

    const queryStr: string = decodeURIComponent(
      href.substring(i + 1, href.length),
    );

    if (!queryStr) {
      throw new Error(ibiz.i18n.t('vue3Util.view.insufficientRedirection'));
    }

    const params = qs.parse(queryStr, { delimiter: ';' }) as IData;

    const { apptype, todotype, todoid } = params;

    const data: IData = { srfapptype: 'pc', srfapp: '' };

    if (!apptype) {
      data.todourltype = 'RouterUrl';
    }

    async function getLinkUrl(): Promise<void> {
      const res = await ibiz.net.post(`/systodos/${todoid}/getlinkurl`, data);
      let url: string = res.data.linkurl;
      // apptype存在，带ip、端口等完整数据
      if (apptype) {
        window.location.href = url;
      } else {
        if (url.indexOf('/') !== 0) {
          url = `/${url}`;
        }
        url += `;srfwf=${todotype}`;
        router.push(`/index${url}`);
      }
    }

    getLinkUrl();
  },
  render() {
    return <div>{ibiz.i18n.t('vue3Util.view.toDoList')}</div>;
  },
});
