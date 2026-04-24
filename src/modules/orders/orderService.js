const orderRepository = require('./orderRepository');
const cartService = require('../cart/cartService');
const productRepository = require('../products/productRepository');
<<<<<<< HEAD
const couponService = require('../coupons/couponService');
const AppError = require('../../utils/AppError');
const logger = require('../../config/logger');
const redisClient = require('../../config/redis');
=======
const AppError = require('../../utils/AppError');
const logger = require('../../config/logger');
>>>>>>> 35a4f5c9f644d653549f1d057fcfe07d21e1b27d

const orderService = {
    listOrders: async (userId) => {
        return await orderRepository.findManyByUser(userId);
    },

    checkout: async (userId) => {
        // 1. Recuperar Carrinho
        const cart = await cartService.getCart(userId);
        if (!cart || cart.items.length === 0) {
            throw new AppError('Carrinho vazio', 400, 'INVALID_PAYLOAD');
        }

        // 2. Recalcular Preços e Validar (Snapshot)
<<<<<<< HEAD
        let subtotal = 0;
=======
        let totalValue = 0;
>>>>>>> 35a4f5c9f644d653549f1d057fcfe07d21e1b27d
        const validItems = [];

        for (const item of cart.items) {
            const product = await productRepository.findById(item.productId);
            if (!product) {
                throw new AppError(`Produto ${item.productId} não existe mais`, 409, 'CONFLICT');
            }
            if (product.stock < item.quantity) {
                throw new AppError(`Estoque insuficiente para ${product.name}`, 409, 'OUT_OF_STOCK');
            }
            if (product.status !== 'ACTIVE') {
                throw new AppError(`Produto ${product.name} indisponível`, 409, 'CONFLICT');
            }

            validItems.push({
                productId: product.id,
                quantity: item.quantity,
                price: Number(product.price)
            });
<<<<<<< HEAD
            subtotal += Number(product.price) * item.quantity;
        }

        // 3. Processar Desconto (Cupom)
        let discount = 0;
        let couponId = null;

        if (cart.couponCode) {
            try {
                const { coupon, discountValue } = await couponService.validateCoupon(cart.couponCode, subtotal);
                discount = discountValue;
                couponId = coupon.id;
            } catch (error) {
                // Cupom expirou ou regras mudaram no checkout
                throw new AppError(`Erro no cupom: ${error.message}`, 400, 'INVALID_PAYLOAD');
            }
        }

        let totalValue = subtotal - discount;
        if (totalValue < 0) totalValue = 0;

        // 4. Executar Transação no Banco
        let order;
        try {
            order = await orderRepository.createOrderTransaction(
                userId,
                validItems,
                totalValue,
                subtotal,
                discount,
                couponId
            );
        } catch (error) {
            logger.error(`Checkout falhou: ${error.message}`);
            // Melhorar mensagem de erro pro user
            throw new AppError(error.message || 'Erro ao processar pedido', 500, 'INTERNAL_SERVER_ERROR');
        }

        // 5. Limpar Carrinho
        await redisClient.del(`cart:default:${userId}`);

        // 6. Emitir Evento
=======
            totalValue += Number(product.price) * item.quantity;
        }

        // 3. Executar Transação no Banco
        let order;
        try {
            order = await orderRepository.createOrderTransaction(userId, validItems, totalValue);
        } catch (error) {
            logger.error(`Checkout falhou: ${error.message}`);
            throw new AppError('Erro ao processar pedido ou estoque', 500, 'INTERNAL_SERVER_ERROR');
        }

        // 4. Limpar Carrinho
        // Como o redis remove item a item, seria bom ter um clearCart.
        // Vou simular um clear setando vazio ou iterando.
        // O ideal é implementar clear no cartService.
        // Por hora, vou expirar a chave ou deletar.
        const redisClient = require('../../config/redis');
        await redisClient.del(`cart:default:${userId}`);

        // 5. Emitir Evento (Simulado)
>>>>>>> 35a4f5c9f644d653549f1d057fcfe07d21e1b27d
        logger.info(`Evento Emitido: order.created { orderId: ${order.id} }`);

        return order;
    }
};

module.exports = orderService;
