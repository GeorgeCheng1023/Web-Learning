import { franc } from "franc";
import langs from 'langs';

var dectSentence = '';
for (let i = 2; i < process.argv.length; i++) {
    dectSentence += process.argv[i];
}
var langsCode = franc(dectSentence);
// console.log(langsCode);
console.log(langs.where("2", langsCode).name);