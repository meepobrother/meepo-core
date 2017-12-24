import {
    Component, OnInit, TemplateRef, ChangeDetectorRef,
    ChangeDetectionStrategy, ViewChild, AfterContentInit, AfterViewInit
} from '@angular/core';
import { CoreService } from '../core.service';
import { XscrollComponent } from 'meepo-xscroll';
@Component({
    selector: 'core-popover',
    templateUrl: './core-popover.html',
    styleUrls: [
        './core-popover.scss'
    ]
})

export class CorePopoverComponent implements OnInit, AfterViewInit {
    @ViewChild(XscrollComponent) xscrollComponent: XscrollComponent;
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
    list: any[] = [];
    constructor(
        public core: CoreService,
        public cd: ChangeDetectorRef
    ) {
        this.core.popover$.subscribe((res: CorePopoverWidget) => {
            this.widget = { ...this.widget, ...res };
            this.list = this.widget.list;
            this.xscrollComponent.onEnd();
            this.cd.markForCheck();
            this.cd.detectChanges();
        });
    }
    ngOnInit() { }
    ngAfterViewInit() {
        console.log(this.xscrollComponent);
    }
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