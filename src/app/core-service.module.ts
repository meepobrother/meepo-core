import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { getCoreService, CoreService } from './core.service';
import { UtilService } from './util.service';
@NgModule({
    providers: [
        {
            provide: CoreService,
            useFactory: getCoreService
        },
        UtilService
    ]
})
export class MeepoCoreServiceModule {}
