import { Injectable } from '@angular/core';

@Injectable()
export class DomService {

    constructor() { }

    pointerCoord(ev: any): PointerCoordinates {
        // get coordinates for either a mouse click
        // or a touch depending on the given event
        if (ev) {
            var changedTouches = ev.changedTouches;
            if (changedTouches && changedTouches.length > 0) {
                var touch = changedTouches[0];
                return { x: touch.clientX, y: touch.clientY };
            }
            var pageX = ev.pageX;
            if (pageX !== undefined) {
                return { x: pageX, y: ev.pageY };
            }
        }
        return { x: 0, y: 0 };
    }

    hasPointerMoved(threshold: number, startCoord: PointerCoordinates, endCoord: PointerCoordinates) {
        if (startCoord && endCoord) {
            const deltaX = (startCoord.x - endCoord.x);
            const deltaY = (startCoord.y - endCoord.y);
            const distance = deltaX * deltaX + deltaY * deltaY;
            return distance > (threshold * threshold);
        }
        return false;
    }
}

export interface PointerCoordinates {
    x?: number;
    y?: number;
}