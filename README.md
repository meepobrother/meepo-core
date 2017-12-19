## 用法

```sh
yarn add meepo-core
```

```html
<core-root>
    <!-- 任何东西 -->
</core-root>
```

```ts
// 引入
import { MeepoCoreModule } from 'meepo-core';

import { CoreService } from 'meepo-core';

export class ExampleComponent{
    constructor(
        public core: CoreService
    ){}

    doSometing(){
        // 显示loading
        this.core.showLoading({title: 'loading'});
        this.core.closeLoading();

        // 显示toast
        this.core.showToast({title: 'toast'});
        this.core.closeToast();

        // 显示alert
        this.core.showAlert({title: '标题', content: '内容'});
        this.core.closeAlert();

        // 显示confirm
        this.core.showConfirm({title: '标题', content: '内容'})；
        this.core.closeConfirm();

        // 设置标题
        this.core.app$.next({
            title: '页面标题',
            share: {
                title: '分享标题',
                icon: '分享图标',
                content: '分享内容',
                link: '分享链接'
            }
        })
    }
}
```