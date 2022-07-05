const express = require('express')
const path = require('path')
const sql = require('mssql')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
 
  .get('/', (req, res) =>{
  
const config = {
        server: "87.202.130.138",
        port:1433,
        user:"pca",
        password:"Puxa3418",
        database:"PCADB",
        options: {
            encrypt: false,
            enableArithAbort:true,
            trustServerCertificate: true,
        },
        comectionTimeout: 15000,
        pool:{
            min:0,
            max:10,
            idleTimeoutMillis:30000,
        }
    };

     

sql.on('error',err=>{
    res.send(err);
})
getDbConnection();
async function getDbConnection(){
    try{
        let pool = await (await sql.connect(config)).connect()
        let quety =  await pool.query('select name from trdr');
        res.send(quety);
        sql.close();
    }
    catch(err){
        res.send(err);
    
}
}


      
  })
  
  .listen(PORT, () => console.log(`Listening on http://localhost:${ PORT }`))
