const stripeAPI = require('../utils/stripe');

async function createCheckoutSession(req, res) {
    const domainUrl = process.env.WEB_APP_URL;
    const { line_items, customer_email, orderId } = req.body;

    if (!line_items || !customer_email || !orderId) {
        return res.status(400).json({ error: 'missing required session parameters' })
    }

    const session = await stripeAPI.checkout.sessions.create({
        payment_method_types: ['card'],  //'afterpay_clearpay'
        mode: 'payment',
        line_items,
        customer_email,
        metadata: {orderId: orderId},
        phone_number_collection: { enabled: true },
        success_url: `${domainUrl}/success?session_id={CHECKOUT_SESSION_ID}`, //?session_id={CHECKOUT_SESSION_ID}
        cancel_url: `${domainUrl}/cancel`,
        billing_address_collection: 'required',
        //shipping_address_collection: { allowed_countries: ['AU'] },
    });

    res.status(200).json({ sessionId: session.id, })
}

async function getSessionInfoById(req, res) {
    const { id } = req.params;
    const session = await stripeAPI.checkout.sessions.retrieve(id);

    res.status(200).json(session)
}

module.exports = {
    createCheckoutSession,
    getSessionInfoById,
}