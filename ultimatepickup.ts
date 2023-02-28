import { Selector } from 'testcafe';
import { Digimon } from './model/digimon';
import { Stage } from './model/stage';
import { getField, getAttributes } from './utilities';

var fs = require('fs');

const missingList: Digimon[] = [];
const missing: string[] = ['Ajatarmon','Angewomon_(X-Antibody)','Arresterdramon:_Superior_Mode_(Brave_Snatcher)',
    'Algomon_(Perfect)','Arkhai_Angemon','Baalmon_(X-Antibody)','Black_Mach_Gaogamon','Boutmon','Bombermon','Canoweissmon',
    'Climbmon','Crys_Paledramon','Cyberdramon_(X-Antibody)','Duramon','Entmon','Eosmon_(Perfect)','Frozomon','Fumamon',
    'Garuru Metal','Ghilliedhumon','Grey_Wars','Grademon_(Vice)','Gusokumon','Gyukimon','Gogmamon','Huankunmon',
    'Holy_Angemon:_Priest_Mode','Meteormon','Jazarichmon','Lavogaritamon','Lamortmon','Lady_Devimon_(X-Antibody)',
    'Metabee','Rokusho','Manticoremon','Marin_Chimairamon','Majiramon','Mephismon_(X-Antibody)','Meicrackmon',
    'Meicrackmon:_Vicious_Mode','Megalo_Growmon_(Orange)','Metal_Greymon_(Virus)_(X-Antibody)','Metal_Greymon:_Alterous_Mode',
    'Monzaemon_(X-Antibody)','Datamon','Oboromon','Oleamon','Piranimon','Pistmon','Rize_Greymon_(X-Antibody)','Rebellimon',
    'Rare_Raremon', 'Raiji_Ludomon','Shootmon','Sagomon','Splashmon','Splashmon_Darkness_Mode','Stiffilmon','Tekkamon','Tempomon',
    'Thetismon','Toropiamon','Vamdemon_(X-Antibody)','Vermillimon','Vulturemon','WereGarurumon:_Sagittarius_Mode',
    'Yatagaramon_(2006_Anime_Version)','Zanmetsumon', 'Xingtianshou', 'Omega_Shoutmon_(X-Antibody)'];
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
        digimon.stage = Stage.ULTIMATE;
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
    fs.writeFile('output/missingUltimate.json', written, err => { });
});

