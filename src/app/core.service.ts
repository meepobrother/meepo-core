import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { LoadingTypes } from './core-loading/loading/index';
import { CorePopoverWidget } from './core-popover/core-popover';
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
    constructor() {
        console.log('CoreService time is', this.time);
    }
    showPopover(msg: CorePopoverWidget) {
        msg = { ...msg, ...{ show: true } };
        this.popover$.next(msg)
    }

    closePopover() { 
        this.popover$.next({ show: false });
    }

    // menu
    showMenu(msg: any) {
        msg = { ...msg, ...{ show: true } };
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
}


export interface LoadingWidget {
    show?: boolean;
    type?: LoadingTypes
}

declare const window: any;
declare const global: any;
if (window) {
    window['meepo'] = window['meepo'] || {};
    var meepo = window['meepo'];
} else {
    global['meepo'] = global['meepo'] || {};
    var meepo = window['meepo'];
}
export function getCoreService() {
    if (meepo._coreService) {
        return meepo._coreService;
    } else {
        meepo._coreService = new CoreService();
        return meepo._coreService;
    }
}