import { Selector } from 'testcafe';
import { Digimon } from './model/digimon';
import { Stage } from './model/stage';
import { getField, getAttributes } from './utilities';

var fs = require('fs');

const missingList: Digimon[] = [];
const missing: string[] = ['Achillesmon','Amphimon','Abbadomon','Abbadomon_Core','Arcturusmon','Barbamon_(X-Antibody)',
    'Beel_Starmon_(X-Antibody)','Belphemon_(X-Antibody)','Blitz_Greymon','Bloom_Lordmon','Bryweludramon',
    'Cherubimon_(Vice)_(X-Antibody)','Cherubimon_(Virtue)_(X-Antibody)','Craniummon_(X-Antibody)','Cres_Garurumon',
    'Cthyllamon','Demon_(X-Antibody)','Demon_Super_Ultimate','Diablomon','Diablomon_(X-Antibody)','Diarbbitmon',
    'Dijiangmon','Durandamon','Done_Devimon','Eosmon_(Ultimate)','Examon_(X-Antibody)','Fros_Velgrmon',
    'Gaioumon:_Itto_Mode','Gankoomon_(X-Antibody)','Grace_Novamon','Heavy_Leomon','Hexeblaumon','Hououmon_(X-Antibody)',
    'Huanglongmon:_Ruin_Mode','Hydramon','Imperialdramon:_Dragon_Mode','Imperialdramon:_Dragon_Mode_(Black)',
    'Imperialdramon:_Fighter_Mode_(Black)','Jesmon_(X-Antibody)','Jesmon_GX','Justimon:_Accel_Arm',
    'Justimon:_Blitz_Arm','Justimon:_Critical_Arm','Justimon_(X-Antibody)','Jyureimon_(Christmas_Tree)',
    'Kazuchimon','Kuzuhamon:_Miko_Mode','Leviamon_(X-Antibody)','Lilithmon_(X-Antibody)','Lord_Knightmon_(X-Antibody)',
    'Lovely_Angemon','Lucemon_(X-Antibody)','Mervamon','Metal_Etemon','Metallicdramon','Minervamon_(X-Antibody)',
    'Mitamamon','NoblePumpmon','Nidhoggmon','Ofanimon_(X-Antibody)','Ofanimon:_Falldown_Mode_(X-Antibody)',
    'Ogudomon_(X-Antibody)','Omedamon','Omega_Knight','Omegamon:_Merciful_Mode','Ordinemon','Rafflesimon',
    'Ragna_Lordmon','Raguelmon','Rapidmon_(X-Antibody)','Rasenmon','Rasenmon:_Fury_Mode','Rasielmon','Regalecusmon',
    'Sleipmon_(X-Antibody)','SaberLeomon','Sakuyamon_(X-Antibody)','Sakuyamon:_Miko_Mode','Shine_Greymon',
    'Shin_Monzaemon','Shakamon','Shivamon','Shroudmon','Siriusmon','Ultimate_Brachimon','Boltboutamon','Venusmon',
    'Volcanicdramon','Xiangpengmon','Dark_Knightmon_(X-Antibody)', 'Quartzmon', 'Shoutmon_DX', 'Proximamon', 
    'Quantumon'];
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
        digimon.stage = Stage.MEGA;
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
    fs.writeFile('output/missingMega.json', written, err => { });
});

