import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CoreService } from '../core.service';

@Component({
    selector: 'core-menu',
    templateUrl: './core-menu.html',
    styleUrls: ['./core-menu.scss'],
    encapsulation: ViewEncapsulation.None
})

export class CoreMenuComponent implements OnInit {
    widget: any = {
        avatar: '',
        nickname: '米波网络科技',
        tag: '普通会员',
        show: false
    };
    constructor(
        public core: CoreService
    ) {
        this.core.menu$.subscribe(res => {
            this.widget = { ...this.widget, ...res };
        });
    }

    ngOnInit() { }

    onBack() {
        this.widget.show = false;
    }

    onMain(e: Event) {
        e.preventDefault();
        e.preventDefault();
    }
}