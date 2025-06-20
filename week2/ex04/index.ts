function getFirst<T>(list: T[]): T | undefined {
  return list[0];
}

const numbers = [1, 2, 3];
const firstNumber = getFirst(numbers);
console.log(firstNumber);

const names = ["Thiago", "John"];
const firstName = getFirst(names);
console.log(firstName);


const empty: string[] = [];
const firstEmpty = getFirst(empty);
console.log(firstEmpty);

interface Produto {
  nome: string;
  preco: number;
}

const products: Produto[] = [{
  nome: "Miojo",
  preco: 20
}
]

console.log(getFirst(products));

