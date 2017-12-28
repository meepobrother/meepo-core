import { Component, Inject, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { CoreService } from '../core.service';
import { DOCUMENT } from '@angular/common';

@Component({
    selector: 'core-loading',
    templateUrl: './core-loading.html',
    styleUrls: ['./core-loading.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CoreLoadingComponent {
    widget: any = {
        show: false,
        type: 'skCube',
        full: true
    };

    inited: boolean = false;
    loadingElement: any;
    loadingName: string = 'skCube';

    constructor(
        public core: CoreService,
        @Inject(DOCUMENT) public document: any,
        public cd: ChangeDetectorRef
    ) {
        this.core.loading$.subscribe((res: any) => {
            this.widget = { ...this.widget, ...res };
            this.cd.detectChanges();
        });
    }
}
