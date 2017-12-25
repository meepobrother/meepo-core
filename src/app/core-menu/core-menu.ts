import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CoreService } from '../core.service';

@Component({
    selector: 'core-menu',
    templateUrl: './core-menu.html',
    styleUrls: ['./core-menu.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class CoreMenuComponent implements OnInit {
    widget: any = {
        avatar: '',
        nickname: '米波网络科技',
        tag: '普通会员',
        show: false,
        items: {
            task: {
                show: true,
                cb: () => { }
            },
            coach: {
                show: true,
                cb: () => { }
            },
            shoper: {
                show: true,
                cb: () => { }
            },
            active: {
                show: true,
                cb: () => { }
            },
            money: {
                show: true,
                cb: () => { }
            },
            kefu: {
                show: true,
                cb: () => { }
            },
            setting: {
                show: true,
                cb: () => { }
            }
        }
    };
    constructor(
        public core: CoreService,
        public cd: ChangeDetectorRef
    ) {
        this.core.menu$.subscribe(res => {
            this.widget = { ...this.widget, ...res };
            if (res && res['items']) {
                this.widget.items = { ...this.widget.items, ...res['items'] }
            }
            this.cd.detectChanges();
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