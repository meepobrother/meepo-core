import { Component, OnInit, TemplateRef } from '@angular/core';
import { CoreService } from '../core.service';

@Component({
    selector: 'core-popover',
    templateUrl: './core-popover.html',
    styleUrls: [
        './core-popover.scss'
    ]
})

export class CorePopoverComponent implements OnInit {
    widget: CorePopoverWidget = {
        show: false,
        title: '页面标题',
        tpl: null,
        headerTpl: null,
        footerTpl: null,
        hasMore: false,
        hasRefresh: false,
        style: {
            background: 'rgba(255,255,255,.8)'
        },
        list: []
    };

    constructor(
        public core: CoreService
    ) {
        this.core.popover$.subscribe((res: CorePopoverWidget) => {
            this.widget = { ...this.widget, ...res };
        });
    }
    ngOnInit() { }
    _close() {
        this.core.closePopover();
    }
}

export interface CorePopoverWidget {
    show?: boolean;
    title?: string;
    tpl?: TemplateRef<any>;
    headerTpl?: TemplateRef<any>;
    footerTpl?: TemplateRef<any>;
    hasMore?: boolean;
    hasRefresh?: boolean;
    style?: any;
    list?: any[];
}