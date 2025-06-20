function renderizarBotao(_a) {
    var title = _a.title, _b = _a.active, active = _b === void 0 ? true : _b;
    return active ? "[ ".concat(title, " ]") : "( ".concat(title, " )");
}
console.log(renderizarBotao({ title: "Salvar", active: true }));
console.log(renderizarBotao({ title: "Cancelar", active: false }));
console.log(renderizarBotao({ title: "Enviar" }));
