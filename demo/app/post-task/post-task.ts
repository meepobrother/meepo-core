import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'post-task',
    templateUrl: 'post-task.html'
})

export class PostTaskComponent implements OnInit {
    @Input() data: any;
    constructor() { }

    ngOnInit() { }
}