const app = require('./app');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3333;

mongoose.connect(process.env.MONGO_URI, {
    userNewUrlParser: true,
    userUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB conectado');
    app.listen(PORT, () => console.log('Servidor rodando na porta ${PORT}'));
}).catch(err => console.log('Erro ao conectar no MongoDB', err));
