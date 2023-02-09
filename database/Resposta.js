const  Sequelize  = require('sequelize')
const connection = require('./database.js')

const Resposta = connection.define('respostas', {
    corpo: {
        type: Sequelize.TEXT,
        allowNull: false
    },
//associação entra tabelas
    perguntaId: {
        type: Sequelize.INTEGER, // integer = INT (inteiro)
        allowNull: false
    }


});

Resposta.sync({force: false}).then(() => {
    console.log('Tabela Resposta criado com sucesso!!')
})

module.exports = Resposta; 

// agr é so importar no nosso index