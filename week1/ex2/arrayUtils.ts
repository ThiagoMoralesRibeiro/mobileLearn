// unique([1,2,2]) → [1,2]
export const unique = (arr: number[]) => [...new Set(arr)];

// groupBy([{tipo:'A'},{tipo:'B'}],'tipo') → {A:[…], B:[…]}

//Objeto generico para objetos que contenham valores do tipo string
type GenericObject = {
  [key: string]: string;
};

export const groupBy = (arr: GenericObject[], key: string): Record<string, GenericObject[]> =>
  arr.reduce((acc, obj) => {
    (acc[obj[key]] = acc[obj[key]] || []).push(obj);
    return acc;
  }, {} as Record<string, GenericObject[]>);

// sumBy([{valor:10},{valor:5}], 'valor') → 15

type NumberObject = {
  [key:string]: number;
}
export const sumBy = (arr: NumberObject[], key: string) =>
  arr.reduce((total, obj) => total + (obj[key] ?? 0), 0);

