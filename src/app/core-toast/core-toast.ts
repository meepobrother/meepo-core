import { Component, OnInit } from '@angular/core';
import { CoreService } from '../core.service';

@Component({
    selector: 'core-toast',
    templateUrl: './core-toast.html',
    styleUrls: ['./core-toast.scss']
})
export class CoreToastComponent implements OnInit {
    widget: any = {
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

    ngOnInit() { }
}

interface ToastWidget {
    title?: string;
    icon?: string;
    show?: boolean;
}
