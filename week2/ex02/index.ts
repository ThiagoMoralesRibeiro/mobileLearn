type Sucesso = { tipo: "sucesso"; dados: string[] };
type Erro = { tipo: "erro"; mensagem: string };
type Resultado = Sucesso | Erro;

function showResult(result:Resultado): void {
  if(result.tipo === "sucesso"){
    console.log("Dados: ", result.dados);
  }else{
    console.log("Erro: ", result.mensagem);
  }
  
}

const result1: Resultado = { tipo: "sucesso", dados: ["item1", "item2"] };
const result2: Resultado = { tipo: "erro", mensagem: "Algo deu errado" };

showResult(result1); 
showResult(result2); 

