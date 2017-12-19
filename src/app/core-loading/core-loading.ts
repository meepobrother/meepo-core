import { Component, OnInit } from '@angular/core';
import { CoreService } from '../core.service';

@Component({
    selector: 'core-loading',
    templateUrl: './core-loading.html',
    styleUrls: ['./core-loading.scss']
})
export class CoreLoadingComponent implements OnInit {
    widget: any = {
        title: '数据加载中',
        show: false
    };
    constructor(
        public core: CoreService
    ) {
        this.core.loading$.subscribe((res: any) => {
            this.widget = { ...this.widget, ...res };
        });
    }

    ngOnInit() { }
}
