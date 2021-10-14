const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/', function(req, res){
    res.send('Olá mundo')
})

let port = process.env.PORT || 3001;

app.listen(port,(req,res)=>{
    console.log('Servidor ativo: http://localhost:3001');
})