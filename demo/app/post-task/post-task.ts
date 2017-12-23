import { Component, OnInit, Input } from '@angular/core';
import { CoreService } from '../../../src/app/app';
@Component({
    selector: 'post-task',
    templateUrl: 'post-task.html'
})

export class PostTaskComponent implements OnInit {
    @Input() data: any;
    constructor(
        public core: CoreService
    ) { }

    ngOnInit() { }

    cancel() { 
        this.core.closePopover();
    }

    pay() { }
}