const stripe = require('stripe')(process.env.STRIPE_SECRET);
const createCustomer = async (email, source) => {
    try {
        const name = email.split('@')[0]
        const body = {
            email,
            name,
            shipping: {
                address: {
                    city: 'Brothers',
                    country: 'US',
                    line1: '27 Fredrick Ave',
                    postal_code: '97712',
                    state: 'CA',
                },
                name,
            },
            address: {
                city: 'Brothers',
                country: 'US',
                line1: '27 Fredrick Ave',
                postal_code: '97712',
                state: 'CA',
            },
            source
        }
        if (source) {
            body.source = source
        }
        const customer = await stripe.customers.create(body);
        return customer
    } catch (error) {
        throw error;
    }
}

const createSubscription = async (planId, customerId, paymentMethod) => {
    try {
        if (paymentMethod) {
            // await clearPaymentMethods(customerId)
            await stripe.paymentMethods.attach(
                paymentMethod,
                { customer: customerId }
            );
            await stripe.customers.update(customerId, {
                invoice_settings: {
                    default_payment_method: paymentMethod,
                },
            });
        }
        const subscription = await stripe.subscriptions.create({
            customer: customerId,
            items: [
                { price: planId },
            ],
            expand: ['latest_invoice.payment_intent'],
            trial_end: 1658144626
        });
        return subscription
    } catch (error) {
        throw error
    }
}

module.exports = { createCustomer, createSubscription };