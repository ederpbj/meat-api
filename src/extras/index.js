const restify = require('restify')

let app = restify.createServer()

app.use(restify.plugins.queryParser())

app.get('/', (req, resp, next)=>{
    //Sincrona
    //for(let i=0; i< 1e8; i++){}
    //resp.json({pid: process.pid, echo: req.query})
    
    //Assincrona
    setTimeout(()=>{
        resp.json({pid: process.pid, echo: req.query})
    }, 500)
    

})

app.listen(4000, ()=>{
    console.log('listening on port 4000')
})