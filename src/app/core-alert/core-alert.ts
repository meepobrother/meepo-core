import { Component } from '@angular/core';
import { CoreService } from '../core.service';
@Component({
    selector: 'core-alert',
    templateUrl: './core-alert.html',
    styleUrls: ['./core-alert.scss']
})
export class CoreAlertComponent {
    widget: AlertWidget = {
        title: '弹窗标题',
        content: '弹窗内容，告知当前页面信息等',
        btn: '我知道了',
        show: false
    };
    constructor(
        public core: CoreService
    ) {
        this.core.alert$.subscribe((res: AlertWidget) => {
            if (res) {
                this.widget = { ...this.widget, ...res };
            }
        });
    }
}

export interface AlertWidget {
    title?: string;
    content?: string;
    btn?: string;
    show?: boolean;
}
