import { Selector, ClientFunction } from 'testcafe';
import { Digimon } from './model/digimon';
import { Stage } from './model/stage';
import { Attribute } from './model/attribute';
import { Field } from './model/field';
import { getField } from './utilities';

var fs = require('fs');

const trainingList: Digimon[] = [];
const missing: string[] = ['Algomon_(Baby_II)', 'Bowmon', 'Bosamon', 'Bibimon', 'Medal', 'Puyoyomon',
    'Pusurimon', 'Sakuttomon', 'Chocomon', 'Goromon', 'Gurimon', 'Hiyarimon', 'Kakkinmon', 'Kodokugumon_Baby', 'Negamon'];

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
        trainingList.push(digimon);
        digimon.stage = Stage.IN_TRAINING;
        digimon.attribute = Attribute.Free;
        await getField(digiTable, digimon);
    });
}
fixture('final');
test('write everything', async t => {
    console.log('Number of missing digimon: '+missing.length);
    console.log('Number of retrieved digimon: '+trainingList.length);
    console.log(trainingList);

    const written = JSON.stringify(trainingList);
    fs.writeFile('output/missingTraining.json', written, err=>{});
});

