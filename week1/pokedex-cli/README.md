### 🛠️ Como Executar os Projetos

Clone o repositório:
```
git clone https://github.com/ThiagoMoralesRibeiro/mobileLearn.git
cd mobileLearn
```
Navegue até o diretório do projeto desejado, por exemplo:
```
cd week1/pokedex-cli
```
Instale as dependências
```
npm install
```
Execute o projeto:
```
ts-node pokedex.ts pikachu
```
O retorno deverá ser algo mais ou menos assim:
```
PIKACHU - 0.4 m - 6 kg - ELECTRIC
```
E em caso de erro:
```
ts-node pokedex.ts
❌ Você precisa informar o nome ou ID de um Pokémon.

ts-node pokedex.ts pikacho                                                                                                                                           ─╯
❌ Erro: Pokémon "pikacho" não encontrado.
```
Certifique-se de ter o ts-node instalado globalmente ou como dependência do projeto.
