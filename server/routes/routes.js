
module.exports = function(app){
  app.get('/', (req,res)=>{
    res.status(200).send("SERVIDOR ACITVO API");
  });
  app.get('/hola', (req,res)=>{
    res.status(200).send("hola, probando");
  });
}
