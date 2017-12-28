import { Injectable } from '@angular/core';

@Injectable()
export class DomService {

    constructor() { }

    pointerCoord(ev: any): PointerCoordinates {
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

    isTextInput(ele: any) {
        return !!ele &&
            (ele.tagName === 'TEXTAREA' ||
                ele.contentEditable === 'true' ||
                (ele.tagName === 'INPUT' && !(NON_TEXT_INPUT_REGEX.test(ele.type))));
    }

    copyInputAttributes(srcElement: HTMLElement, destElement: HTMLElement) {
        const attrs = srcElement.attributes;
        for (var i = 0; i < attrs.length; i++) {
            var attr = attrs[i];
            if (SKIP_INPUT_ATTR.indexOf(attr.name) === -1) {
                destElement.setAttribute(attr.name, attr.value);
            }
        }
    }


    getCss(docEle: HTMLElement) {
        const css: {
            transform?: string;
            transition?: string;
            transitionDuration?: string;
            transitionDelay?: string;
            transitionTimingFn?: string;
            transitionStart?: string;
            transitionEnd?: string;
            transformOrigin?: string;
            animationDelay?: string;
        } = {};
        var i: number;
        var keys = ['webkitTransform', '-webkit-transform', 'webkit-transform', 'transform'];
        for (i = 0; i < keys.length; i++) {
            if ((<any>docEle.style)[keys[i]] !== undefined) {
                css.transform = keys[i];
                break;
            }
        }
        keys = ['webkitTransition', 'transition'];
        for (i = 0; i < keys.length; i++) {
            if ((<any>docEle.style)[keys[i]] !== undefined) {
                css.transition = keys[i];
                break;
            }
        }
        var isWebkit = css.transition.indexOf('webkit') > -1;
        css.transitionDuration = (isWebkit ? '-webkit-' : '') + 'transition-duration';
        css.transitionTimingFn = (isWebkit ? '-webkit-' : '') + 'transition-timing-function';
        css.transitionDelay = (isWebkit ? '-webkit-' : '') + 'transition-delay';
        css.transitionEnd = (isWebkit ? 'webkitTransitionEnd ' : '') + 'transitionend';
        css.transformOrigin = (isWebkit ? '-webkit-' : '') + 'transform-origin';
        css.animationDelay = (isWebkit ? 'webkitAnimationDelay' : 'animationDelay');
        return css;
    }
}
const SKIP_INPUT_ATTR = ['value', 'checked', 'disabled', 'readonly', 'placeholder', 'type', 'class', 'style', 'id', 'autofocus', 'autocomplete', 'autocorrect'];
export const NON_TEXT_INPUT_REGEX = /^(radio|checkbox|range|file|submit|reset|color|image|button)$/i;

export interface PointerCoordinates {
    x?: number;
    y?: number;
}