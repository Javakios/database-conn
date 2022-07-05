const express = require('express')
const path = require('path')
const sql = require('mssql')
const axios = require('axios');
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
 
  .get('/', (req, res) =>{
  

const knex = require('knex')({
    client:'mssql',
    connection:{
        port:1433,
        user:"sa",
        password:"Puxa3418",
        server:"87.202.130.138",
        database:"PCADB",
        options:{
            encrypt: false,
            enableArithAbort:true,
            trustServerCertificate: true,
            },
            secure : false,
            pool:{
                max:10,
                min:0,
                idleTimeoutMillis:3000
            },
            rejectUnauthorized: false
    }
})


knex.select('name').from('trdr')
.then(resData=>{
    res.send(resData);
}).catch(err=>{
   res.send(err.message);
}).finally(done=>{
        console.log("ola kala")
})
;


      
  })
  
  .listen(PORT, () => console.log(`Listening on http://localhost:${ PORT }`))
