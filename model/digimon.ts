import {Stage} from './stage';
import {Attribute} from './attribute';
import {Field} from './field';

export class Digimon {
    name: string;
    stage: Stage | Stage[];
    attribute: Attribute | Attribute[];
    field: Field[]=[];
}