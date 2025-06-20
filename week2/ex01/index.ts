interface Book {
  title: string;
  author: string;
  year: number;
  available: boolean;
}

let library: Book[] = [
  { title: "Livro 1", author: "Autor 1", year: 2000, available: true },
  { title: "Livro 2", author: "Autor 2", year: 2010, available: false },
  { title: "Livro 3", author: "Autor 3", year: 2012, available: false },

]

function listAvailableBooks(books:Book[]): string[] {
  let arrAvailableBooks: string[] = [];

  for (let index = 0; index < books.length; index++) {
    const element = books[index];
    if (element.available) {
       arrAvailableBooks.push(element.title);
    }    
  }

  return arrAvailableBooks; 
}

console.log(listAvailableBooks(library));


function listAvailableBooksSimplified(books: Book[]): string[]{
  return books.filter(book => book.available).map(book => book.title);
}
