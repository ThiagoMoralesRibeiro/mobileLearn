interface User {
  id: number;
  name: string;
  email: string;
  passwd: string;
}

type UserWithoutPasswd = Omit<User, "passwd">;
type UserUpdate = Partial<User>;
type UserReadOnly = Readonly<User>;

function showPerfil(user: UserWithoutPasswd): void {
  console.log("Perfil de Usuário: ");
  console.log("ID:", user.id);
  console.log("Nome:", user.name);
  console.log("Email:", user.email);
}

function updateUser(id: number, dados: UserUpdate): void {
  console.log(`Atualizando o user do seguinte id: ${id} com os seguintes dados: `);
  console.log(dados);

}

const user: User = {
  id: 1,
  name: "John",
  email: "john@email.com",
  passwd: "123456"
}

const userWithoutPasswd: UserWithoutPasswd = {
  id: user.id,
  name: user.name,
  email: user.email
};

const userReadOnly: UserReadOnly = {
  id: 2,
  name: "Maria",
  email: "maria@email.com",
  passwd: "abc123"
};

showPerfil(user);

updateUser(1, {email: "novoemail@teste.com", name: "John Updated"});

