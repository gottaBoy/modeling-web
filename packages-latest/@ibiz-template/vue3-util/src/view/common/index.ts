import { App } from 'vue';
import { registerViewProvider } from '@ibiz-template/runtime';
import { withInstall } from '../../util';
import { ViewProvider } from './view.provider';
import { View } from './view';
import { AppDataUploadViewProvider } from '../app-data-upload-view/app-data-upload-view.provider';
import { MDCustomViewProvider } from '../md-custom-view/md-custom-view.provider';

export const IBizView = withInstall(View, function (v: App) {
  v.component(View.name!, View);
  registerViewProvider('DEFAULT', () => new ViewProvider());
  // 注册应用导入视图适配器
  registerViewProvider(
    'APPDATAUPLOADVIEW',
    () => new AppDataUploadViewProvider(),
  );
  // 注册实体多数据自定义视图适配器
  registerViewProvider('DEMDCUSTOMVIEW', () => new MDCustomViewProvider());
});
