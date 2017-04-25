import {ProxyFactory} from '../service/ProxyFactory.js';

export class Binder {

    static bind(model, view, ...props) {
        let proxy = ProxyFactory.create(model, props, model => view.update(model));
        view.update(model);

        return proxy;
    }
}