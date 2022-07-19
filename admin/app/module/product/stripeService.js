
const stripe = require('stripe')(process.env.STRIPE_SECRET);

const createPlan = async (title, price, interval, intervalCount) => {
    try {
        const body = {
            amount: Number((price * 100).toFixed(2)),
            currency: 'usd',
            interval: interval.toLowerCase(),
            product: { name: title }
        }
        if (intervalCount) {
            body.interval_count = intervalCount
        }
        const planDetails = await stripe.plans.create(body)
        return planDetails
    } catch (error) {
        throw error;
    }
}

const retrievePlan = async (planId) => {
    try {
        const planDetails = await stripe.plans.retrieve(planId);
        return planDetails
    } catch (error) {
        throw error;
    }
}

const deletePlanById = async (planId) => {
    try {
        const { deleted } = await stripe.plans.del(planId);
        return deleted
    } catch (error) {
        throw error;
    }
}

const addPrice = async (productId, price, interval, intervalCount) => {
    try {
        const productPrices = await getProductPrices(productId)
        let productPrice = null
        if (productPrices.data && productPrices.data.length) {
            productPrice = await productPrices.data.find(onePrice => onePrice.unit_amount === price)
        }
        if (!productPrice) {
            productPrice = await stripe.prices.create({
                unit_amount: Number((price * 100).toFixed(2)),
                currency: 'usd',
                recurring: { interval: interval.toLowerCase(), interval_count: intervalCount },
                product: productId,
            });
        }
        await stripe.products.update(
            productId,
            { default_price: productPrice.id }
        );
        return productPrice
    } catch (error) {
        throw error;
    }
}


const getProductPrices = async (productId) => {
    try {
        const productPrices = await stripe.prices.list({
            product: productId,
        });
        return productPrices
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createPlan,
    retrievePlan,
    deletePlanById,
    addPrice
}