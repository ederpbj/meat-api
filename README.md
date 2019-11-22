# meat-api
https://www.udemy.com/course/nodejs-rest-pt/learn/lecture/9649370#content

API de restaurantes

> Commits

[Git-commits](https://github.com/ederpbj/meat-api/commits/master)

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

> Erro no mongo community local

    Criar pasta 'C:\Data\db'

> Ferramenta para encriptar senha

    npm i bcrypt@1.0.3 -P -E

    npm i @types/bcrypt@1.0.0 -D -E

> Seção 9: Testando a API com Jest e Supertest
> A48. Instalando as Dependências


    npm i jest@22.4.2 ts-jest@22.0.4 typescript@2.6.2 supertest@3.0.0 @types/jest@22.1.2 @types/supertest@2.0.4 -D -E

>Acessar o git

[Github](https://github.com/kulshekhar/ts-jest)

[Config](https://kulshekhar.github.io/ts-jest/user/config/)

>Configuração do jest segundo A48

        "jest": {
    "testEnvironment": "node",
    "transform": {
      "^.+\\.tsx?$": "ts-jest"
    },
    "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
    "moduleFileExtensions": [
      "ts",
      "tsx",
      "js",
      "jsx",
      "json",
      "node"
    ]
  },

>Para rodar o teste

    npm test

> A51 Inicialização Global para todas as Suites

    npm i ts-node@5.0.1 jest-cli@22.4.2 -D -E


> Token

    npm i jsonwebtoken@8.1.1 -P -E

Definições de tipo

    npm i @types/jsonwebtoken@7.2.5 -D -E

>Ver o que tem no token

[jwt.io](https://jwt.io/)

> A57 Habilitando HTTPS

Criptografando de ponta a ponta