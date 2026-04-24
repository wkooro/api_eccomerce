const cartService = require('./cartService');

const cartController = {
    getCart: async (req, res, next) => {
        try {
<<<<<<< HEAD
            const userId = req.user ? req.user.sub : req.query.userId;
            if (!userId) return res.status(400).json({ error: 'UserId required' });

            const cart = await cartService.getCart(userId);
            res.json({ data: cart });
        } catch (error) { next(error); }
=======
            // Assumindo que o userId vem do middleware de autenticação (req.user.id)
            // Como ainda não implementei o middleware Auth completo, vou pegar do header ou mockar por enquanto se não tiver
            const userId = req.user ? req.user.sub : req.query.userId;

            if (!userId) { // Fallback temporário para testes
                return res.status(400).json({ error: 'UserId required' });
            }

            const cart = await cartService.getCart(userId);
            res.json({ data: cart });
        } catch (error) {
            next(error);
        }
>>>>>>> 35a4f5c9f644d653549f1d057fcfe07d21e1b27d
    },

    addItem: async (req, res, next) => {
        try {
            const userId = req.user ? req.user.sub : req.query.userId;
            if (!userId) return res.status(400).json({ error: 'UserId required' });

            const cart = await cartService.addItem(userId, req.body);
            res.json({ data: cart });
<<<<<<< HEAD
        } catch (error) { next(error); }
=======
        } catch (error) {
            next(error);
        }
>>>>>>> 35a4f5c9f644d653549f1d057fcfe07d21e1b27d
    },

    removeItem: async (req, res, next) => {
        try {
            const userId = req.user ? req.user.sub : req.query.userId;
<<<<<<< HEAD
            if (!userId) return res.status(400).json({ error: 'UserId required' });

            const cart = await cartService.removeItem(userId, req.params.itemId);
            res.json({ data: cart });
        } catch (error) { next(error); }
    },

    applyCoupon: async (req, res, next) => {
        try {
            const userId = req.user ? req.user.sub : req.query.userId;
            const { code } = req.body;
            if (!userId) return res.status(400).json({ error: 'UserId required' });
            if (!code) return res.status(400).json({ error: 'Coupon code required' });

            const cart = await cartService.applyCoupon(userId, code);
            res.json({ data: cart });
        } catch (error) { next(error); }
    },

    removeCoupon: async (req, res, next) => {
        try {
            const userId = req.user ? req.user.sub : req.query.userId;
            const cart = await cartService.removeCoupon(userId);
            res.json({ data: cart });
        } catch (error) { next(error); }
=======
            const { itemId } = req.params;

            if (!userId) return res.status(400).json({ error: 'UserId required' });

            const cart = await cartService.removeItem(userId, itemId);
            res.json({ data: cart });
        } catch (error) {
            next(error);
        }
>>>>>>> 35a4f5c9f644d653549f1d057fcfe07d21e1b27d
    }
};

module.exports = cartController;
