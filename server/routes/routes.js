
module.exports = function(app){
  app.get('/', (req,res)=>{
    res.status(200).send("SERVIDOR ACITVO API");
  });
  app.get('/hola', (req,res)=>{
    res.status(200).send("hola, probando");
  });
  app.get('/areas', (req,res)=>{
    Query.getAreas((err, data) => {
      res.status(200).json(data);
    });
  });

  app.get('/camaras/:area',(req, res) =>{
    Query.getCamaras(req.params.area, (err, data)=>{
      if (data) {
        res.status(200).json(data)
      }
    });
  });
}
