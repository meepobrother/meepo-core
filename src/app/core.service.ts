import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { LoadingTypes } from './core-loading/loading/index';

@Injectable()
export class CoreService {
    toast$: Subject<any> = new Subject();
    alert$: Subject<any> = new Subject();
    menu$: Subject<any> = new Subject();

    confirm$: Subject<any> = new Subject();
    confirmBack$: Subject<any> = new Subject();

    loading$: Subject<any> = new Subject();

    app$: Subject<any> = new Subject();

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