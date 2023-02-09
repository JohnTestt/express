// Uma boa pratica é começar o nome do arquivo com a letra maiuscula, assim identificando um Model

//Gerando tabelas com sequelize

//Usamos Model para criar as nossas tabelas, que é uma estrutura de dados que representa a nossa tabela.

//primeiro temos que importar o sequelize e nossa conexão do banco de dados


const sequelize = require('sequelize')

const connection = require('./database.js')


// em uma pergunta vai ter noso titulo e nossa descrição

//para criar um model, chamamaos a conexão e atribuimos a propriedade define()
//onde vc atribui o nome a esse model e define os campos dessa tabela.
//para criar um campo utilizando sequelize vc tem q passar 2 parametros: nome do campo e tipo

const Pergunta = connection.define('pergunta',{
    titulo:{
        type: sequelize.STRING,
        allowNull: false // isso aqui restringe de deixar um valor em branco
    }, 
    descricao: {
        type: sequelize.TEXT,
        allowNull: false
    }
})
//Pronto! criamos nossa tabela


// qual a diferença entre STRING p/ TEXT?
// STRING é para textos curtos, e o tipo TEXT para textos longos

// agora p/ criarmos nossa tabela no nosso banco

//Pergunta.sync({force:false})

//ele vai sincronizar o model com o banco de dados
//ese force significa que ele n vai forçar a criação da tabela, caso a tabela já exista

//podemos usar o then() tambem

Pergunta.sync({force:false}).then(() => {
    console.log('Tabela Pergunta criada com sucesso!')
})

//agora precisamos executar
//precisamos ir no nosso index e importar nosso model

//module.exports = Pergunta; aqui eu n sei pq n precisei exportar assim

//haha agr eu seiiii

module.exports = Pergunta;

