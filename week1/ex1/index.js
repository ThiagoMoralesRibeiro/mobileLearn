import { unique, groupBy, sumBy } from "./arrayUtils.js";

const n = [1,1,2,3,4,3];
const result = unique(n);


const groups = [
  {type: 'A', value: 'car'},
  {type: 'B', value: 'bike'},
  {type: 'A', value: 'skate'},
  {type: 'B', value: 'motorcycle'}  
]
const resultGroup = groupBy(groups, 'type');


const dataValues = [
  {value: 20},
  {value: 60},
  {value: 80}
]; 
const resultSum = sumBy(dataValues, 'value');

console.log(result);
console.log(resultGroup);
console.log(resultSum);
