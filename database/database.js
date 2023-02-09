const Sequelize = require('sequelize')

//config sequelize
 const conection = new Sequelize('PerguntasandRespostas', 'admin01','Luffy@123', {
    host: 'localhost',
    dialect: 'mysql'
  }) 

  
module.exports = conection; 