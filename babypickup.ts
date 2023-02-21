import { Selector, ClientFunction } from 'testcafe';
import { Digimon } from './model/digimon';
import { Stage } from './model/stage';
import { Attribute } from './model/attribute';
import { Field } from './model/field';
import { getField } from './utilities';

var fs = require('fs');

const missingList: Digimon[] = [];
const missing: string[] = ['Algomon_(Baby_I)', 'Dokimon', 'Cotsucomon', 'Curimon', 'Fusamon', 'Fuukashita_Medal',
    'Jyarimon', 'Sakumon', 'Sunamon', 'Pusumon', 'Puyomon', 'Pyonmon'];

for(let uri of missing){
    fixture('Obtain '+uri).page('https://wikimon.net/'+uri).skipJsErrors();
    test('get '+uri, async t => {
        const digimon: Digimon = new Digimon();
        digimon.name = await Selector('h1#firstHeading').innerText
        const digiTable = await Selector('div#StatsBoxMorphContent1');
        const exists = await digiTable.exists;
        if(!exists){
            throw new Error('not found');
        }
        missingList.push(digimon);
        digimon.stage = Stage.FRESH;
        digimon.attribute = Attribute.Free;
        await getField(digiTable, digimon);
    });
}
fixture('final');
test('write everything', async t => {
    
    console.log(missingList);
    console.log('Number of missing digimon: '+missing.length);
    console.log('Number of retrieved digimon: '+missingList.length);

    const written = JSON.stringify(missingList);
    fs.writeFile('output/missingBaby.json', written, err=>{});
});

