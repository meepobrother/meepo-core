import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { getCoreService, CoreService } from './core.service';
@NgModule({
    providers: [
        {
            provide: CoreService,
            useFactory: getCoreService
        }
    ]
})
export class MeepoCoreServiceModule {}
