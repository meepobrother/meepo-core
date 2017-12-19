import { Component } from '@angular/core';
import { CoreService } from '../core.service';

@Component({
    selector: 'core-toast',
    templateUrl: './core-toast.html',
    styleUrls: ['./core-toast.scss']
})
export class CoreToastComponent {
    widget: ToastWidget = {
        title: '已完成',
        icon: 'weui-icon-success-no-circle',
        show: false
    };
    constructor(
        public core: CoreService
    ) {
        this.core.toast$.subscribe((res: ToastWidget) => {
            if (res) {
                this.widget = { ...this.widget, ...res };
            }
        });
    }
}

export interface ToastWidget {
    title?: string;
    icon?: string;
    show?: boolean;
}
