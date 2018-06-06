var mysql = require('mysql');

// connection with ddbb

connection = mysql.createConnection({
  host: 'eu-cdbr-west-02.cleardb.net',
  user: 'b1f0181ad445c3',
  password: 'f5b72c32',
  database: 'heroku_747ea78b85bca6a'
});

let queryModels = {}

queryModels.getAreas = (callback) => {
  if (connection) {
    connection.query(
      'SELECT * FROM areas ORDER BY id',
      (err,rows)=>{
        if(err){
          throw err;
        }
        else {
          callback(null, rows);
        }
      }
    )
  }
};

queryModels.getCamaras = (area , callback) =>{
  if (connection) {
    console.log(area);
    var sqlExists = `
      select name_area, name_calle, posx, posy from camaras
      inner join calles on camaras.id_calle = calles.id
      inner join areas on calles.id_area = areas.id
      where areas.name_area = ${connection.escape(area)}
    `;
    connection.query(sqlExists, (err, rows)=>{
      if (err) {
        throw err;
      }
      else{
        callback(null, rows)
      }
    });
  }
}

module.exports = queryModels;
