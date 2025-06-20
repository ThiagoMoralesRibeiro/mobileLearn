interface PropsButton {
  title: string;
  active?: boolean;
}

function renderizarBotao({ title, active = true }: PropsButton): string {
  return active ? `[ ${title} ]` : `( ${title} )`;
}

console.log(renderizarBotao({ title: "Salvar", active: true }));

console.log(renderizarBotao({ title: "Cancelar", active: false }));

console.log(renderizarBotao({ title: "Enviar" }));


