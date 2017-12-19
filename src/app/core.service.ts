import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class CoreService {
    toast$: Subject<any> = new Subject();
    alert$: Subject<any> = new Subject();

    confirm$: Subject<any> = new Subject();
    confirmBack$: Subject<any> = new Subject();

    loading$: Subject<any> = new Subject();

    app$: Subject<any> = new Subject();
    // loading
    showLoading(msg) {
        msg = { ...msg, ...{ show: true } };
        this.loading$.next(msg);
    }

    closeLoading() {
        this.loading$.next({ show: false });
    }
    // confirm
    showConfirm(msg: any) {
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
    showToast(msg: any) {
        msg = { ...msg, ...{ show: true } };
        this.toast$.next(msg);
    }

    closeToast() {
        this.toast$.next({ show: false });
    }
}
