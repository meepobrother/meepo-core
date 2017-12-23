import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreService } from './core.service';

import { CoreAlertComponent } from './core-alert/core-alert';
import { CoreConfirmComponent } from './core-confirm/core-confirm';
import { CoreToastComponent } from './core-toast/core-toast';
import { CoreLoadingComponent } from './core-loading/core-loading';
import { CoreRootComponent } from './core-root/core-root';
import { CoreMenuComponent } from './core-menu/core-menu';
import { CorePopoverComponent } from './core-popover/core-popover';

const CoreComponents: any[] = [
    CoreAlertComponent,
    CoreRootComponent,
    CoreConfirmComponent,
    CoreToastComponent,
    CoreLoadingComponent,
    CoreMenuComponent,
    CorePopoverComponent
];

import { MeepoCoreServiceModule } from './core-service.module';
import { XscrollModule } from 'meepo-xscroll';
@NgModule({
    declarations: [
        ...CoreComponents
    ],
    imports: [
        CommonModule,
        MeepoCoreServiceModule.forRoot(),
        XscrollModule.forRoot()
    ],
    exports: [
        ...CoreComponents
    ]
})
export class MeepoCoreModule {

    constructor( @Optional() @SkipSelf() parentModule: MeepoCoreModule) {
        if (parentModule) {
            throw new Error(
                'CoreModule is already loaded. Import it in the AppModule only');
        }
    }

    public static forRoot(): ModuleWithProviders {
        return {
            ngModule: MeepoCoreModule
        };
    }
}
