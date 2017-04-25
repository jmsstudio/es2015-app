export class ProxyFactory {

    static create(model, props, callback) {
        return new Proxy(model, {
            get(target, prop, receiver) {
                let val;
                if (props.includes(prop) && ProxyFactory._isFunction(target[prop])) {
                    val = function() {
                        console.log(`Interceptando ${prop}`);
                        let retorno = Reflect.apply(target[prop], target, arguments);
                        callback(target);

                        return retorno;
                    }
                } else {
                    val = Reflect.get(target, prop, receiver);
                }
                
                return val;
            },

            set(target, prop, value, receiver) {
                let retorno = Reflect.set(target, prop, value, receiver);
                if (props.includes(prop)) {
                    callback(target);
                }
                return retorno;
            }
        });
    }

    static _isFunction(func) {
         return typeof(func === typeof(Function));
    }
}