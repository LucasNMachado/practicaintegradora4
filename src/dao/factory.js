import CartManagerFs from './fs/cartManagerfs.js';
import ProductManagerFs from './fs/productManagerfs.js';
import CartManager from './mongo/cartManager.js';
import ProductManager from './mongo/productManager.js';

export default class DaoFactory {
    constructor() {}

    static getDao() {
        const dao = process.env.PERSISTENCE || 'mongo';
        switch (dao) {
            case 'mongo': 
                return {cartManager: new CartManager(), productManager : new ProductManager()};
            case 'fs':
                return {cartManager: new CartManagerFs(), productManager : new ProductManagerFs()};
            default:
                 return {cartManager: new CartManager(), productManager: new ProductManager()};
        }
    }
}