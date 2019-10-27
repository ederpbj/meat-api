"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
class Router extends events_1.EventEmitter {
    render(response, next) {
        return (document) => {
            if (document) {
                this.emit('beforeRender', document);
                response.json(document);
            }
            else {
                response.send(404);
            }
            //Indica ao restifi que a callback terminou de trabalhar
            return next();
        };
    }
}
exports.Router = Router;
