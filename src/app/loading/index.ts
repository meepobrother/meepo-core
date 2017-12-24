import { bounce } from './bounce';
import { cube } from './cube';
import { dot } from './dot';
import { doubleBounce } from './doubleBounce';
import { rect } from './rect';
import { skCircle } from './skCircle';
import { skCube } from './skCube';
import { skFadingCircle } from './skFadingCircle';
import { skFoldingCube } from './skFoldingCube';
import { spinner } from './spinner';


export type LoadingTypes =
    'bounce' |
    'cube' |
    'dot' |
    'doubleBounce' |
    'rect' |
    'skCircle' |
    'skCube' |
    'skFadingCircle' |
    'skFoldingCube' |
    'spinner';

export const Loadings = {
    spinner: spinner,
    skFoldingCube: skFoldingCube,
    skFadingCircle: skFadingCircle,
    skCube: skCube,
    skCircle: skCircle,
    rect: rect,
    doubleBounce: doubleBounce,
    dot: dot,
    cube: cube,
    bounce: bounce
};