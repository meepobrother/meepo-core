import { Component, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CoreService } from '../core.service';

@Component({
    selector: 'core-toast',
    templateUrl: './core-toast.html',
    styleUrls: ['./core-toast.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CoreToastComponent {
    toasts: any[] = [];
    config: any = {
        titleClass: 'toast-title',
        messageClass: 'total-message'
    };
    position: string = 'toast-bottom-right';
    constructor(
        public core: CoreService,
        public sanitizer: DomSanitizer,
        public cd: ChangeDetectorRef
    ) {
        this.core.toast$.subscribe((res: any) => {
            if (res) {
                res = { ...res, ...{ pocent: 100 } };
                if (this.position.indexOf('top') > 0) {
                    this.toasts = [...this.toasts, res];
                } else {
                    this.toasts = [res, ...this.toasts];
                }
                this.toasts.map((to, index) => {
                    to['interval'] = setInterval(() => {
                        to.pocent--;
                        if (to.pocent === 0) {
                            this.removeToast(index);
                            clearInterval(to['interval']);
                        }
                        this.cd.markForCheck();
                    }, 30);
                });
            }
        });
    }

    removeToast(index) {
        this.toasts.splice(index, 1);
    }

    clicked(toast: any) {
        console.log(toast);
    }
}

export interface ToastWidget {
    title?: string;
    icon?: string;
    show?: boolean;
}
