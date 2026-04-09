//=================================
// SERVIDOR DE CHAT EM TEMPO REAL
//=================================
// Este servidor gerencia as conexões de usuarios e distribui mensagens
// Tecnologias:
// -Express: Framework web para HTTP
// - Socket.IO: comunicação bidiricional em tempo real via WebSockets

// Importa a Biblioteca Express
const app = require("express")();

// Importa modulo HTTP nativo do Node.js (Necessario para Socket.IO)
const server = require("http").createServer(app);

// Importa Socket.IO e configura para o servidor HTTP
const io = require("socket.io")(server, {

    // CORS (cross-origin resource sharing) permite que clientes de outros dominios/IPs se conectem
    // Altere o IP para o IP da maquina onde o servidor esta rodando
  cors: {
    // Exemplo: "http://localhost:5173" para desenvolvimento local
    // Exemplo: "http://seu-ip:5173" para rede
    origin: "http://localhost:5173",
  },
});

const PORT = 3001; // Porta na qual o servidor ira escutar as conexoes

//===============================================
// EVENT LISTENERS: Quando um cliente se conecta
// ==============================================
io.on("connection", (socket) => {
    // "socket" representa a conexao individual de um unico cliente
    // Cada cliente que se conecta recebe um novo objeto "socket"
    // socket.id é um ID unico para cada cliente
    // socket.data: Objeto para armazenar dados do clientes (username, etc.)

    // ================================
    // Evento: usuario define seu nome
    // ================================
    socket.on("set_username", (username) => {
        // Armazena o nome do usuario no objeto de dados do socket para o uso posterior
        socket.data.username = username;
        console.log(`Usuario conectado: ${username} (ID: ${socket.id})`);
        // Registra no console que um usuario se conectou 
        username(username, socket.id);
        });

//=====================================
// Evento: usuario desconecta
//=====================================

socket.on("disconnect", (reason) => {
    // Registra informação sobre deconexão
    console.log(`Usuario ${socket.data.username} desconectado! Sua id era ${socket.id}`,
    );

    // Motivo da Desconexão. Motivos comuns: "client namespace disconnect", "client left", etc
    console.log(`Motivo: ${reason}`);
});

//=====================================
// Evento: usuario envia mensagem
//=====================================
socket.on("send_message", (text) => {
    // Quando um cliente envia uma mensagem, o servidor recebe o evento "send_message"
    // O servidor então retransmite essa mensagem para todos os outros clientes conectados usando "broadcast.emit"
    // O cliente que enviou a mensagem não recebe de volta (evitando eco)
    io.emit("receive_message", {
        text,
        authorId: socket.id,
        author: socket.data.username,
    });
    console.log(`Usuario ${socket.data.username} enviou mensagem!`);
});
});

// Registra no console quando um novo usuario se conecta
const username = (username, id) => {
    console.log(`Usuario ${username} conectado com o seguinte id: ${id}`);
};

// ===============================
// Iniciar Servidor
// ===============================
server.listen(PORT, () => {
    console.log(`Servidor esta rodando na porta ${PORT}...`)
    console.log(`Cliente deve conectar em http://seu-ip:${PORT}`);
});
