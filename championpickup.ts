import { Selector } from 'testcafe';
import { Digimon } from './model/digimon';
import { Stage } from './model/stage';
import { getField, getAttributes } from './utilities';

var fs = require('fs');

const missingList: Digimon[] = [];
const missing: string[] = ['Algomon_(Adult)','Baboongamon','Bulkmon','BetelGammamon','Black_Tailmon_Uver.','Black_Gaogamon',
    'BomberNanimon','Bao_Hackmon','Baluchimon','Dark_Tyranomon_(X-Antibody)','DarkMaildramon','DexDorugamon','Ebidramon',
    'Eosmon_(Adult)','Exermon','Eyesmon','Eyesmon:_Scatter_Mode','Filmon','Greymon_(Blue)','Greymon_(Blue)_(X-Antibody)',
    'Gulus_Gammamon','Hover_Espimon','Hudiemon','Icemon','Jazardmon','Kaus_Gammamon','Komondomon','Lavorvomon','Liamon',
    'Lianpumon','Machmon','Meramon_(X-Antibody)','Metabee','Mimicmon','Numemon_(X-Antibody)','Namakemon','Orgemon_(X-Antibody)',
    'Paledramon','Pegasmon_(X-Antibody)','Parasaurmon','Potamon','Publimon','Rokusho','Runnermon','Siesamon_(X-Antibody)',
    'Shoutmon_(King_Ver.)','Shooting_Starmon','Skull_Knightmon:_Cavalier_Mode','Symbare_Angoramon','Stingmon_(Black)','Snatchmon',
    'Tesla_Jellymon','Tia_Ludomon','Targetmon','Tobiumon','Tuwarmon','Tyranomon_(X-Antibody)','Wezen_Gammamon','Wizarmon_(X-Antibody)',
    'Xiquemon','Zubaeagermon'];
for (let uri of missing) {
    fixture('Obtain ' + uri).page('https://wikimon.net/' + uri).skipJsErrors();
    test('get ' + uri, async t => {
        const digimon: Digimon = new Digimon();
        digimon.name = await Selector('h1#firstHeading').innerText
        const digiTable = await Selector('div#StatsBoxMorphContent1');
        const exists = await digiTable.exists;
        if(!exists){
            throw new Error('not found');
        }
        missingList.push(digimon);
        digimon.stage = Stage.CHAMPION;
        await getField(digiTable, digimon);
        await getAttributes(digiTable, digimon);
    });
}
fixture('final');
test('write everything', async t => {

    console.log(missingList);
    console.log('Number of missing digimon: ' + missing.length);
    console.log('Number of retrieved digimon: ' + missingList.length);

    const written = JSON.stringify(missingList);
    fs.writeFile('output/missingChampion.json', written, err => { });
});

