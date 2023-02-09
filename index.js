const express = require('express')
const app = express()

//diretorio
const path = require('path')


const bodyParser = require('body-parser') //importar (processar os dados do formulário enviados pelo cliente)

//banco de dados
const connection = require('./database/database.js') // importado diretamente  da pasta database p/ autenticação 
const Pergunta = require('./database/Perguntas.js') // criação/manipulação  perguntas(do formulario) no banco de dados
const Resposta = require('./database/Resposta.js')



// dinamicos
app.set('view engine', 'ejs')

//estaticos
app.use(express.static('public'))  

//config bodyParse
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false})) // vai decodificar os dados enviados pelo formulario


//DATABASE
connection
.authenticate()
.then(() => {
  console.log('Conexão feita')
})
.catch((error) => {
  console;log(error)
})
 


//ROTAS

//ROTA PRINCIPAL
 
app.get('/', (req, resp)=> {

  
  // pegar perguntas do bda e exibir na minha pagina com findALL()

  Pergunta.findAll({raw:true, order:[
    ['id', 'DESC']
  ]}).then(perguntas => {

    resp.render('index', {
      perguntas: perguntas // coloco perguntas em uma variavel
    })
  })

})



  // Criando formulario de perguntas 


  app.get('/perguntar', (req, resp) => {
    resp.render('perguntar') //vai ter a msm estrutura do index (com bootstrap)

  })

 

  //salvando formulario no BANCO DE DADOS

app.post('/salvarpergunta', (req, resp) => { // rota do nosso FORM



  let titulo = req.body.titulo 
  let descricao = req.body.descricao


 // resp.send('formulario recebido!'+ descricao) 

   Pergunta.create({
      titulo: titulo,  
      descricao: descricao 
   }).then(() => {

    resp.redirect('/check') // redirect('') é um atributo do express para redirecionar a rota desejada
    
  })
  
 })

  // Pagina html que não deveria estar em view, mas em public
  // Serve para flr que deu tudo certo

  app.get('/check', (req, resp) => {
   
    // resp.render('check')
      resp.sendFile(path.join(__dirname, './views/check.html'))

     
  })

  // Pegar pergunta por ID e redirecionar a uma pagina propria da pergunta
 
app.get('/pergunta/:id' , (req, resp) => {
  
  let id = req.params.id //parametro

  
  Pergunta.findOne({
    where: {id: id}
  }).then(pergunta => {
    if(pergunta != undefined){  //encontrada
         
      Resposta.findAll({
        where: { perguntaId: pergunta.id},
        order: [
          ['id', 'DESC']
        ] 
      })   
      .then(respostas => {
 
        resp.render('pergunta',{

          elemento: pergunta,
          respostas: respostas

        })

      })
     
     
      
    }else{                      // Se não encontrada voltar a raiz com a função redirect()
          resp.redirect('/')
    }

  })
})

//salvar Resposta do formulario

app.post('/responder', (req, res) => {

  //res.send('dados enviados com sucesso!!')

  //pegando os parametros do form
  let corpo = req.body.corpo
  let perguntaId = req.body.pergunta

  //chamar o metodo creat() com o model Resposta

  Resposta.create({
    corpo: corpo,  
    perguntaId: perguntaId 
 }).then(() => {

  res.redirect('/check') 
  
})




})

 //PORTA

 app.listen(5510, (error) => {
     if(error){
         console.log('algo deu ruim')
     }else {
         console.log('funfando')
     }
 })
