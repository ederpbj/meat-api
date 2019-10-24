import * as restify from 'restify'

const server = restify.createServer({
    name: 'meat-api',
    version: '1.0.0'
})

//Origin
server.get('/hello', (req, resp, next)=>{
    //resp.contentType = 'application/json';
    resp.setHeader('Content-Type','application/json')
    //resp.status(400)
    resp.send({message: 'send hello'});
    //resp.json({message: 'hello'})
    return next()
})

 //Quando alguém manda uma requisição para api
 
 //para usar query
 server.use(restify.plugins.queryParser())

 server.get('/info', [
   (req, resp, next)=>{
     if(req.userAgent() && req.userAgent().includes('MSIE 7.0')){
     //resp.status(400)
   //  resp.json({message: 'Please, update your browser'})
     let error: any = new Error()
     error.statusCode = 400
     error.message = 'Please, update your browser'
     return next(error)
   }
   return next()
 },(req, resp, next)=>{
   //resp.contentType = 'application/json';
   //resp.status(400)
   //resp.setHeader('Content-Type','application/json')
   //resp.send({message: 'hello'});
   resp.json({
     browser: req.userAgent(),
     method: req.method,
     url: req.href(),
     path: req.path(),
     query: req.query
   })
   return next()
 }])

server.listen(3000, ()=> {
    console.log('API is running on http://localhost:3000 ')
})