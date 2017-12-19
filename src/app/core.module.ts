import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreService } from './core.service';

import { CoreAlertComponent } from './core-alert/core-alert';
import { CoreConfirmComponent } from './core-confirm/core-confirm';
import { CoreToastComponent } from './core-toast/core-toast';
import { CoreLoadingComponent } from './core-loading/core-loading';
import { CoreRootComponent } from './core-root/core-root';


const CoreComponents: any[] = [
    CoreAlertComponent,
    CoreRootComponent,
    CoreConfirmComponent,
    CoreToastComponent,
    CoreLoadingComponent
];

@NgModule({
    declarations: [
        ...CoreComponents
    ],
    imports: [CommonModule],
    exports: [
        ...CoreComponents
    ],
    providers: [
        CoreService
    ],
})
export class MeepoCoreModule { }
