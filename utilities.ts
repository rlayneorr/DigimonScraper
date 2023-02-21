import { Field } from './model/field';
import { Attribute } from './model/attribute';

export async function getField(digiTable, digimon) {
    const fields = [Field.nsp, Field.da, Field.dr, Field.ds, Field.jt, Field.me, Field.nso, Field.uk, Field.vb, Field.wg];
    for(let field of fields) {
        if(await digiTable.find('font').withText(field.valueOf()).exists) {
            digimon.field.push(field)
        }
    }
}
export async function getAttributes(digiTable, digimon) {
    let attributes: Attribute[] = [];
    const free = await digiTable.find('font').withText("Free").exists;
    if (free) {
        attributes.push(Attribute.Free)
    }
    const data = await digiTable.find('font').withText("Data").exists;
    if (data) {
        attributes.push(Attribute.Data)
    }
    const virus = await digiTable.find('font').withText("Virus").exists;
    if (virus) {
        attributes.push(Attribute.Virus)
    }
    const vaccine = await digiTable.find('font').withText("Vaccine").exists;
    if (vaccine) {
        attributes.push(Attribute.Vaccine)
    }
    if (attributes.length == 1) {
        digimon.attribute = attributes[0]
    } else {
        digimon.attribute = attributes;
    }
}