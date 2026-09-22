const express = require('express');
const mongoose = require('mongoose');

const app = express();

// --- CONFIGURAÇÕES DO SEU PROJETO ---
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Obrigatório para lidar com JSON, conforme o exemplo do professor

// --- 1. CONEXÃO COM O MONGODB //
// Substitua 'bdTodoList' pelo nome real da sua base de dados se necessário
const MONGO_URI = 'mongodb://127.0.0.1:27017/bdTarefaFlow'; 

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Conectado ao MongoDB com sucesso!');
  })
  .catch((err) => {
    console.error('Erro ao conectar ao MongoDB:', err);
  });


// Mapeamento da Coleção "tarefas"
const tarefaSchema = new mongoose.Schema({
  descricao: { type: String, required: true },
  status: { type: String, required: true }, // Ex: 'Pendente', 'Concluído'
  criadoEm: { type: Date, default: Date.now }
});
const Tarefa = mongoose.model('Tarefa', tarefaSchema);

// Mapeamento da Coleção "usuarios"
const usuarioSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true },
  cargo: { type: String, required: true }
});
const Usuario = mongoose.model('Usuario', usuarioSchema);

// Página Inicial //

app.get('/', (req, res) => {
  res.render('home');
});

// Página Login //

// Rota de visualização do Login
app.get('/login', (req, res) => {
  res.render('login', { usuario: '' });
});

// Ao fazer login, renderiza o PAINEL passando o nome do usuário
app.post('/login', (req, res) => {
  const nomeUsuario = req.body.usuario;
  res.render('painel', { usuario: nomeUsuario });
});

// Acesso direto ao painel via URL (opcional, caso precise testar direto)
app.get('/painel', (req, res) => {
  res.render('painel', { usuario: 'Visitante' });
});

// Página Home //

app.post('/home', (req, res) => {
  res.redirect('/');
});

// Página Sobre //

app.get('/sobre', (req, res) => {
  res.render('sobre');
});

// Página de Desenvolvedores //

app.get('/devs', (req, res) => {
  res.render('devs');
});

// Página de Cadastro //

app.get('/cadastro', (req, res) => {
  res.render('cadastro', { usuario: req.body.usuario });
});

app.post('/cadastro', (req, res) => {
  res.render('cadastro', { usuario: req.body.usuario });
});


// Rota de Tarefas (Busca no banco e já manda para o EJS) //
app.get('/tarefas', async (req, res) => {
  try {
    const listaDeTarefas = await Tarefa.find(); 
    // O EJS recebe a variável 'tarefas' com os dados do banco
    res.render('tarefas', { tarefas: listaDeTarefas }); 
  } catch (error) {
    res.status(500).send("Erro ao buscar tarefas");
  }
});

// Rota de Usuários (Busca no banco e já manda para o EJS) //
app.get('/usuarios', async (req, res) => {
  try {
    const listaDeUsuarios = await Usuario.find(); 
    // O EJS recebe a variável 'usuarios' com os dados do banco
    res.render('usuarios', { usuarios: listaDeUsuarios }); 
  } catch (error) {
    res.status(500).send("Erro ao buscar usuários");
  }
});

//  INICIAR O SERVIDOR //

const PORT = 8081;
app.listen(PORT, () => {
  console.log(`Servidor a correr em http://localhost:${PORT}`);
});