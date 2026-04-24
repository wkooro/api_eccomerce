const prisma = require('../../config/database');

const orderRepository = {
    findManyByUser: async (userId) => {
        return await prisma.order.findMany({
            where: { userId },
<<<<<<< HEAD
            include: { items: true, payment: true, coupon: true },
=======
            include: { items: true, payment: true },
>>>>>>> 35a4f5c9f644d653549f1d057fcfe07d21e1b27d
            orderBy: { createdAt: 'desc' }
        });
    },

<<<<<<< HEAD
    createOrderTransaction: async (userId, items, totalValue, subtotal, discount, couponId) => {
        return await prisma.$transaction(async (tx) => {
            // 1. Decrementar Estoque
            for (const item of items) {
                try {
                    await tx.product.update({
                        where: { id: item.productId },
                        data: { stock: { decrement: item.quantity } }
                    });

                    const p = await tx.product.findUnique({ where: { id: item.productId }, select: { stock: true, name: true } });
                    if (p.stock < 0) throw new Error(`Sem estoque para ${p.name}`);

                } catch (e) {
                    // Se for o nosso throw acima, propaga. Se for do prisma, encapsula.
                    throw new Error(e.message.includes('Sem estoque') ? e.message : `Falha ao atualizar estoque do produto ${item.productId}`);
                }
            }

            // 2. Incrementar Uso do Cupom
            if (couponId) {
                await tx.coupon.update({
                    where: { id: couponId },
                    data: { usageCount: { increment: 1 } }
                });
            }

            // 3. Criar Order
=======
    createOrderTransaction: async (userId, items, totalValue) => {
        // Prisma transaction
        return await prisma.$transaction(async (tx) => {
            // 1. Decrementar Estoque de todos os produtos
            for (const item of items) {
                // Tenta decrementar atomicamente apenas se stock >= quantidade
                // Prisma lança erro se where não der match
                try {
                    await tx.product.update({
                        where: { id: item.productId }, //, stock: { gte: item.quantity } }, // Prisma < 5 filter in update limitation?
                        data: { stock: { decrement: item.quantity } }
                    });

                    // Verificação extra caso o decrement leve a negativo (se banco não tiver check constraint)
                    // Na vdd melhor passo: ler e checkar ou confiar no decrement com check constraint no DB.
                    // Assumindo que o banco não permite unsigned negativo ou check, vai dar erro.
                    // Para garantir no node:
                    const p = await tx.product.findUnique({ where: { id: item.productId } });
                    if (p.stock < 0) throw new Error(`Sem estoque para ${p.name}`);

                } catch (e) {
                    throw new Error(`Falha ao atualizar estoque do produto ${item.productId}`);
                }
            }

            // 2. Criar Order
>>>>>>> 35a4f5c9f644d653549f1d057fcfe07d21e1b27d
            const order = await tx.order.create({
                data: {
                    userId,
                    totalValue,
<<<<<<< HEAD
                    subtotal,
                    discount,
                    couponId,
=======
>>>>>>> 35a4f5c9f644d653549f1d057fcfe07d21e1b27d
                    status: 'PENDING',
                    items: {
                        create: items.map(i => ({
                            productId: i.productId,
                            quantity: i.quantity,
                            price: i.price
                        }))
                    }
                }
            });

<<<<<<< HEAD
            // 4. Criar Payment Stub
=======
            // 3. Criar Payment Stub
>>>>>>> 35a4f5c9f644d653549f1d057fcfe07d21e1b27d
            await tx.payment.create({
                data: {
                    orderId: order.id,
                    status: 'AWAITING_CONFIRMATION'
<<<<<<< HEAD
=======
                    // externalId gerado depois no Payment Gateway
>>>>>>> 35a4f5c9f644d653549f1d057fcfe07d21e1b27d
                }
            });

            return order;
        });
    }
};

module.exports = orderRepository;
