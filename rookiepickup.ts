import { Selector} from 'testcafe';
import { Digimon } from './model/digimon';
import { Stage } from './model/stage';
import { getField, getAttributes } from './utilities';

var fs = require('fs');

const missingList: Digimon[] = [];
const missing: string[] = ['Algomon_(Child)', 'Angoramon', 'Agumon_(Black)_(X-Antibody)', 'Blucomon', 'Dot_Gaomon', 'Dot_Kamemon',
    'Dot_Kudamon', 'Dot_Lalamon', 'Dracomon_(X-Antibody)', 'Espimon', 'Gammamon', 'Ghostmon', 'Herissmon', 'Impmon_(X-Antibody)',
    'Jellymon', 'Jazamon', 'Junkmon', 'Keramon_(X-Antibody)', 'Kodokugumon_Child', 'Loogamon', 'Lopmon_(X-Antibody)', 'Ludomon',
    'Luxmon', 'Morphomon', 'Pomumon', 'Pulsemon', 'Pillomon', 'Renamon_(X-Antibody)', 'Sangomon', 'Shakomon_(X-Antibody)',
    'Soundbirdmon', 'Sunarizamon', 'Terriermon_(X-Antibody)', 'Terriermon_Assistant', 'Tinpet', 'Vorvomon', 'Zubamon', 'Koemon'];

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
        digimon.stage = Stage.ROOKIE;
        await getField(digiTable, digimon);
        await getAttributes(digiTable, digimon);
    });
}
fixture('final');
test('write everything', async t => {
    
    console.log(missingList);
    console.log('Number of missing digimon: '+missing.length);
    console.log('Number of retrieved digimon: '+missingList.length);

    const written = JSON.stringify(missingList);
    fs.writeFile('output/missingRookie.json', written, err=>{});
});

