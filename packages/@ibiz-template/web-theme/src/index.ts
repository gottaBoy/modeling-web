import './theme/index.scss';

import { install } from './publish';

export default {
  install(): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    install((key: string, model: any) => {
      ibiz.util.layoutPanel.register(key, model);
    });
  },
};
