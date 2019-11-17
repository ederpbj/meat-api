"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = (req, resp, err, done) => {
    //console.log(err)
    //restify procura por esse método, vamos sobrescrever
    err.toJSON = () => {
        return {
            message: err.message
        };
    };
    switch (err.name) {
        case 'MongoError':
            if (err.code === 11000) {
                err.statusCode = 400;
            }
            break;
        case 'ValidationError':
            err.statusCode = 400;
            //Exibe erros na tela em forma de array
            const messages = [];
            for (let name in err.errors) {
                messages.push({ message: err.errors[name].message });
                //console.log(err.errors[name])
            }
            err.toJSON = () => ({
                errors: messages,
            });
            break;
    }
    done();
};
