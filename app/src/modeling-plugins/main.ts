import { createApp } from 'vue';
import Workbench from './Workbench.vue';
import '../../public/assets/font-awesome-4.7.0/css/font-awesome.min.css';
import './workbench.css';
import { initializeLocale } from './i18n';

initializeLocale();
createApp(Workbench).mount('#app');
