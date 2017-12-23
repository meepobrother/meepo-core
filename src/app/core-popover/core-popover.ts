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
        hasMore: false,
        hasRefresh: false,
        hasFooter: false,
        hasHeader: false
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
    hasMore?: boolean;
    hasRefresh?: boolean;
    hasFooter?: boolean;
    hasHeader?: boolean;
}