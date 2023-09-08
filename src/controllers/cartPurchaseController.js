import CartManager from "../dao/mongo/cartManager.js";
import ProductManager from "../dao/mongo/productManager.js";
import Ticket from "../dao/mongo/models/ticketModels.js";

export const purchaseCart = async (req, res) => {
    try {
        const idCart = parseInt(req.params.cid);
        const cart = await CartManager.getCart(idCart);
        
        if (!cart) {
            return res.status(404).json({ status: "failed", error: "Cart not exist" });
        }

        const productsToPurchase = cart.products;
        const productsToUpdateStock = [];
        const productsNotPurchased = [];

        for (const product of productsToPurchase) {
            const productFromDB = await ProductManager.getProduct(product.productId);
            if (!productFromDB) {
                productsNotPurchased.push(product.productId);
                continue;
            }

            if (productFromDB.stock >= product.quantity) {
                productsToUpdateStock.push({ productId: product.productId, quantity: product.quantity });
            } else {
                productsNotPurchased.push(product.productId);
            }
        }

        if (productsToUpdateStock.length > 0) {
            for (const productToUpdate of productsToUpdateStock) {
                await ProductManager.updateProductStock(productToUpdate.productId, -productToUpdate.quantity);
            }

            const totalAmount = productsToUpdateStock.reduce((total, product) => {
                const productFromCart = productsToPurchase.find(p => p.productId === product.productId);
                return total + (productFromCart.price * product.quantity);
            }, 0);

            const ticketData = {
                code: generateUniqueCode(),
                amount: totalAmount,
                purchaser: req.user.email,
            };

            const newTicket = await Ticket.create(ticketData);

            const notPurchasedProductsIds = productsNotPurchased.map(p => p.toString());
            const updatedCart = await CartManager.updateCart(idCart, notPurchasedProductsIds);

            res.json({
                status: "success",
                message: "Purchase completed",
                ticket: newTicket,
                notPurchasedProducts: productsNotPurchased
            });
        } else {
            res.json({
                status: "failed",

                
                error: "No products available for purchase"
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", error: "Internal Server Error" });
    }
};

function generateUniqueCode() {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
}

