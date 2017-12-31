import {
    Component, OnInit, TemplateRef, ChangeDetectorRef,
    ChangeDetectionStrategy, ViewChild, AfterContentInit, AfterViewInit,
    Input, ViewEncapsulation
} from '@angular/core';
import { CoreService } from '../core.service';
import { XscrollComponent } from 'meepo-xscroll';
@Component({
    selector: 'core-popover',
    templateUrl: './core-popover.html',
    styleUrls: [
        './core-popover.scss'
    ],
    encapsulation: ViewEncapsulation.None
})

export class CorePopoverComponent implements OnInit, AfterViewInit {
    @ViewChild(XscrollComponent) xscrollComponent: XscrollComponent;
    _widget: CorePopoverWidget = {
        show: false,
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
    @Input()
    set widget(val: CorePopoverWidget) {
        this._widget = { ...this._widget, ...val };
        this.cd.detectChanges();
    }
    get widget() {
        return this._widget;
    }

    @Input()
    set show(val: boolean) {
        this._widget = { ...this._widget, ...{ show: val } }
    }
    get show() {
        return this._widget.show;
    }

    @Input() online: boolean = true;
    list: any[] = [];
    constructor(
        public core: CoreService,
        public cd: ChangeDetectorRef
    ) {
        this.core.popover$.debounceTime(300).subscribe((res: CorePopoverWidget) => {
            console.log(res);
            if (this.online) {
                this._widget = { ...this._widget, ...res };
                this.list = this._widget.list;
                setTimeout(() => {
                    this.xscrollComponent.onEnd();
                }, 500);
                this.cd.detectChanges();
            }
        });
    }
    ngOnInit() { }
    ngAfterViewInit() { }
    _close() {
        this.core.closePopover();
    }
}

export interface CorePopoverWidget {
    show?: boolean;
    tpl?: TemplateRef<any>;
    headerTpl?: TemplateRef<any>;
    footerTpl?: TemplateRef<any>;
    hasMore?: boolean;
    hasRefresh?: boolean;
    style?: any;
    list?: any[];
}