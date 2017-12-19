import { Component, OnInit } from '@angular/core';
import { CoreService } from '../core.service';

@Component({
    selector: 'core-confirm',
    templateUrl: './core-confirm.html',
    styleUrls: ['./core-confirm.scss']
})
export class CoreConfirmComponent implements OnInit {
    widget: ConfirmWidget = {
        title: '弹窗标题',
        content: '自定义内容',
        btnCancel: '取消',
        btnSure: '确定',
        show: false
    };
    constructor(
        public core: CoreService
    ) {
        this.core.confirm$.subscribe((res: ConfirmWidget) => {
            if (res) {
                this.widget = { ...this.widget, ...res };
            }
        });
    }

    ngOnInit() { }

    cancel() {
        this.core.confirmBack$.next(true);
        this.core.closeConfirm();
    }

    sure() {
        this.core.confirmBack$.next(true);
        this.core.closeConfirm();
    }
}

interface ConfirmWidget {
    title?: string;
    content?: string;
    btnCancel?: string;
    btnSure?: string;
    show?: boolean;
}
