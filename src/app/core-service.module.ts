import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { getCoreService, CoreService } from './core.service';
@NgModule({})
export class MeepoCoreServiceModule {
    public static forRoot(): ModuleWithProviders {
        return {
            ngModule: MeepoCoreServiceModule,
            providers: [
                {
                    provide: CoreService,
                    useFactory: getCoreService
                }
            ]
        };
    }
}
