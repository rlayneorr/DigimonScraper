import { Selector, ClientFunction } from 'testcafe';
import { Digimon } from './model/digimon';
import { Stage } from './model/stage';
import { Attribute } from './model/attribute';

var fs = require('fs');

const digimonList: Digimon[] = [];

fixture('digimon fixture')
  .page('https://wikimon.net/List_of_Dub_Names')
  .skipJsErrors();
test('get Digimon', async t => {
  const tables = await Selector('table.wikitable');
  const count = await tables.count;
  console.log(count);
  for (let i = 0; i < count; i++) {
    const rows = await tables.nth(i).child('tbody').child('tr');
    const numRows = await rows.count;
    console.log(numRows);
    for (let j = 1; j < numRows; j++) {
      const td = await rows.nth(j).child('td');
      let mon = await td.child('a').nth(0);
      const otherMon = await td.child('span').child('a').nth(0);
      let exists = await mon.exists;
      if (!exists) {
        mon = otherMon;
        exists = await mon.exists;
      }
      if (exists) {
        const name = await mon.innerText;
        const digi = new Digimon();
        digi.name = name;
        // click on name
        await t.click(mon)
        const digiTable = await Selector('div#StatsBoxMorphContent1');
        const pageExists = await digiTable.exists;
        if (pageExists) {
          digimonList.push(digi);
          let levels: Stage[] = [];
          const baby1 = await Selector('font').withText("Baby I").exists;
          if (baby1) {
            levels.push(Stage.FRESH)
          }
          const baby2 = await Selector('font').withText("Baby II").exists;
          if (baby2) {
            levels.push(Stage.IN_TRAINING)
          }
          const rookie = await Selector('font').withText("Child").exists;
          if (rookie) {
            levels.push(Stage.ROOKIE)
          }
          const adult = await Selector('font').withText("Adult").exists;
          if (adult) {
            levels.push(Stage.CHAMPION)
          }
          const ultimate = await Selector('font').withText("Perfect").exists;
          if (ultimate) {
            levels.push(Stage.ULTIMATE)
          }
          const mega = await Selector('font').withText("Ultimate").exists;
          if (mega) {
            levels.push(Stage.MEGA)
          }
          const hybrid = await Selector('font').withText("Hybrid").exists;
          if (hybrid) {
            levels.push(Stage.HYBRID)
          }
          if (levels.length == 1) {
            digi.stage = levels[0];
          } else {
            digi.stage = levels;
          }
          let attributes: Attribute[] = [];
          const free = await Selector('font').withText("Free").exists;
          if(free){
            attributes.push(Attribute.Free)
          }
          const data = await Selector('font').withText("Data").exists;
          if(data){
            attributes.push(Attribute.Data)
          }
          const virus = await Selector('font').withText("Virus").exists;
          if(virus){
            attributes.push(Attribute.Virus)
          }
          const vaccine = await Selector('font').withText("Vaccine").exists;
          if(vaccine){
            attributes.push(Attribute.Vaccine)
          }
          if(attributes.length == 1){
            digi.attribute = attributes[0]
          } else{
            digi.attribute = attributes;
          }
        }
        const goBack = ClientFunction(() => window.history.back());
        await goBack();
      }
    }
  }
  console.log(digimonList);
  const written = JSON.stringify(digimonList);
  fs.writeFile('digimon.json', written, err=>{});
})
