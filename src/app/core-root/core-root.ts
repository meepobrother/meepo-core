import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CoreService } from '../core.service';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'core-root',
    templateUrl: './core-root.html',
    styleUrls: ['./core-root.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CoreRootComponent implements OnInit {
    widget: any = {
        title: '页面标题'
    };
    constructor(
        public core: CoreService,
        public title: Title
    ) {
        this.core.app$.subscribe((res: any) => {
            this.widget = { ...this.widget, ...res };
            // 设置浏览器标题
            this.title.setTitle(this.widget.title);
            // 设置微信分享
        });
    }

    ngOnInit() {

    }
}
