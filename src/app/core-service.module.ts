import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { getCoreService, CoreService } from './core.service';
import { UtilService } from './util.service';
import { DateTimeService } from './date-time';
import { DomService } from './dom';

@NgModule({
    providers: [
        {
            provide: CoreService,
            useFactory: getCoreService
        },
        UtilService,
        DateTimeService,
        DomService
    ]
})
export class MeepoCoreServiceModule {}
