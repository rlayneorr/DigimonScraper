import {Stage} from './stage';
import {Attribute} from './attribute';

export class Digimon {
    name: string;
    stage: Stage | Stage[];
    attribute: Attribute | Attribute[];
}