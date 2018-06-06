var mysql = require('mysql');

// connection with ddbb

var db_config = {
  host: 'eu-cdbr-west-02.cleardb.net',
  user: 'b1f0181ad445c3',
  password: 'f5b72c32',
  database: 'heroku_747ea78b85bca6a'
};

// connection.connect(err => {
//   if(err) {
//     return err;
//     console.log(err);
//   }
//   else{
//     console.log("Conexión con la base de datos correcta");
//   }
// });

var connection;

function handleDisconnect() {
  connection = mysql.createConnection(db_config); // Recreate the connection, since
                                                  // the old one cannot be reused.

  connection.connect(function(err) {              // The server is either down
    if(err) {                                     // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    }                                     // to avoid a hot loop, and to allow our node script to
  });                                     // process asynchronous requests in the meantime.
                                          // If you're also serving http, display a 503 error.
  connection.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
    }
  });
}

handleDisconnect();



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
