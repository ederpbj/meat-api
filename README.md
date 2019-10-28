# meat-api
https://www.udemy.com/course/nodejs-rest-pt/learn/lecture/9649370#content

API de restaurantes

>Iniciando aplicação

    npm init -y 

> Instalando Biblioteca 
    > --save (para instalar nas minhas dependências)
    >-E (Versão exata)

    npm i restify@6.3.4 --save -E

> Corrigindo Erro

    npm audit fix
    npm audit fix --force

> Instalando restify
    > -D (Em dev)
    > -E (Versão exata)

    npm i @types/restify@5.0.6 -D -E

>tsc em modo Watch

    tsc -w

> Instalar nodemon para monitorar
> -g (modo global)

    npm i nodemon -g

> Rodando com nodemon

    nodemon dist/main.js

A14-Primeiro exemplo com restify

> Primeiros passos
> Criar o server, configurar as rotas, ouvir porta

A15- Os objetos Requeste, response, Next

    http://localhost:3000/info?name=teste&age=30


>Correção de erro

    rm -rf node_modules
    npm install -g npm@latest
    npm i core-util-is