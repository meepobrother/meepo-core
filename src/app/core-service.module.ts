import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { CoreService } from './core.service';
@NgModule({})
export class MeepoCoreServiceModule {
    public static forRoot(): ModuleWithProviders {
        return {
            ngModule: MeepoCoreServiceModule,
            providers: [
                CoreService
            ]
        };
    }
}
