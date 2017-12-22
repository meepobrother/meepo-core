import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { CoreService } from '../core.service';
import * as config from './loading/index';
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
        type: 'weui'
    };

    inited: boolean = false;
    loadingElement: any;
    loadingName: config.LoadingTypes = 'skCube';

    constructor(
        public core: CoreService,
        @Inject(DOCUMENT) public document: any
    ) {
        this.core.loading$.subscribe((res: any) => {
            this.widget = { ...this.widget, ...res };
            if (this.widget.show) {
                if (this.widget.type != 'weui') {
                    this.loadingName = this.widget.type || 'skCube';
                    this.showLoading();
                }
            } else {
                this.hideLoading();
            }
        });
    }

    createByName(name: config.LoadingTypes) {
        // html
        this.loadingElement = this.document.createElement('div');
        this.loadingElement.innerHTML = config[name].html;
        this.loadingElement.className = 'meepo-loading';
        this.loadingElement.id = 'meepo-loading';
        this.document.body.appendChild(this.loadingElement);
        // css
        let styleStr = this.document.createElement('style');
        styleStr.innerHTML = config[name].css;
        styleStr.type = 'text/css';
        this.document.head.appendChild(styleStr);
    }

    setLoading(name: config.LoadingTypes) {
        this.loadingName = name;
    }

    showLoading() {
        if(!this.loadingElement){
            this.createByName(this.loadingName);
        }
    }

    hideLoading() {
        if (this.loadingElement) {
            this.document.body.removeChild(this.loadingElement);
            this.loadingElement = null;
        }
    }
}
