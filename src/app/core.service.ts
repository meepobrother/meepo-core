import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { CorePopoverWidget } from './core-popover/core-popover';
declare const URLSearchParams: any;
@Injectable()
export class CoreService {
    toast$: Subject<any> = new Subject();
    alert$: Subject<any> = new Subject();
    menu$: Subject<any> = new Subject();
    confirm$: Subject<any> = new Subject();
    confirmBack$: Subject<any> = new Subject();

    popover$: Subject<any> = new Subject();
    popoverBack$: Subject<any> = new Subject();
    loading$: Subject<any> = new Subject();
    app$: Subject<any> = new Subject();
    time: any = new Date().getTime();

    uniacid: string;
    siteurl: string;
    protocol: string;

    searchParams = new URLSearchParams(window.location.search);
    constructor() {
        this.uniacid = this.searchParams.get('i');
        this.uniacid = this.uniacid || '2';
        this.siteurl = window.location.host;
        this.protocol = window.location.protocol;
        if (this.siteurl.indexOf('localhost') > -1) {
            this.siteurl = 'meepo.com.cn';
            this.protocol = 'https:';
        }
        if (this.protocol.indexOf('file') > -1) {
            this.siteurl = 'meepo.com.cn';
            this.protocol = 'https:';
        }
        console.log('core service', this.time);
    }
    showPopover(msg: CorePopoverWidget) {
        msg = { ...msg, ...{ show: true } };
        this.popover$.next(msg);
    }

    closePopover() {
        this.popover$.next({ show: false });
    }

    // menu
    showMenu(msg: any) {
        msg = { ...{ show: true }, ...msg };
        this.menu$.next(msg);
    }
    closeMenu() {
        this.menu$.next({ show: false });
    }
    // loading
    showLoading(msg: LoadingWidget) {
        msg = { ...msg, ...{ show: true } };
        this.loading$.next(msg);
    }

    closeLoading() {
        this.loading$.next({ show: false });
    }
    // confirm
    showConfirm(msg: LoadingWidget) {
        msg = { ...msg, ...{ show: true } };
        this.confirm$.next(msg);
    }

    closeConfirm() {
        this.confirm$.next({ show: false });
    }
    // alsert
    showAlert(msg: any) {
        msg = { ...msg, ...{ show: true } };
        this.alert$.next(msg);
    }

    closeAlert() {
        this.alert$.next({ show: false });
    }
    // toast
    showToast(toast: any) {
        toast = { ...{ config: { showCloseButton: true } }, ...toast }
        this.toast$.next(toast);
    }

    closeToast() {
        this.toast$.next({ show: false });
    }

    addToast(toast: any) {
        toast = { ...{ config: { showCloseButton: true } }, ...toast }
        this.toast$.next(toast);
    }

    murl(segment: string, params: any, isCloud: boolean) {
        const segments = segment.split('/');
        const __controller = segments[0];
        const __action = segments[1];
        const __do = segments[2];
        let str = '';
        for (const key in params) {
            str += "&" + key + "=" + params[key];
        }
        let url: string;
        if (isCloud) {
            url = `https://meepo.com.cn/app/index.php?c=${__controller}&do=${__do}&a=${__action}&i=2&j=2${str}`;
        } else {
            url = `${this.protocol}//${this.siteurl}/app/index.php?c=${__controller}&do=${__do}&a=${__action}&i=${this.uniacid}&j=${this.uniacid}${str}`;
        }
        return url;
    }

    wurl(segment: string, params: any) {
        const segments = segment.split('/');
        const __controller = segments[0];
        const __action = segments[1];
        const __do = segments[2];
        let str = '';
        for (const key in params) {
            str += '&' + key + '=' + params[key];
        }
        return `${this.protocol}//${this.siteurl}/web/index.php?c=${__controller}&` +
            `do=${__do}&a=${__action}&i=${this.uniacid}&j=${this.uniacid}${str}`;
    }
}


export interface LoadingWidget {
    show?: boolean;
    type?: string,
    full?: boolean;
}

declare const window: any;
declare const global: any;
let meepo: any;
if (window) {
    window['meepo'] = window['meepo'] || {};
    meepo = window['meepo'];
} else {
    global['meepo'] = global['meepo'] || {};
    meepo = window['meepo'];
}
export function getCoreService() {
    if (meepo._coreService) {
        return meepo._coreService;
    } else {
        meepo._coreService = new CoreService();
        return meepo._coreService;
    }
}