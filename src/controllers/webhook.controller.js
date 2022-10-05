const Order = require('../models/order');
const stripeAPI = require('../utils/stripe');
const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

const fulfillOrder = async (session) => {
    console.log('Fulfilling Order', session)
    //database operation. session.metadata...

    const stripeItems = await stripeAPI.checkout.sessions.listLineItems(session.id);
    console.log(stripeItems, 'retrieve test1')
    const structuredItem = stripeItems.data.map((item)=>{
        
    })

    orderInstance = {
        currency: session.currency,
        totalPrice: (session.amount_total / 100).toFixed(2),
        sessionId: session.id,
        userInfo: {
            email: session.customer_details.email,
            phone: session.customer_details.phone,
            shippingAddress: {
                city: session.customer_details.address.city,
                country: session.customer_details.address.country,
                line1: session.customer_details.address.line1,
                line2: session.customer_details.address.line2,
                postal_code: session.customer_details.address.postal_code,
                state: session.customer_details.address.state
            }
        },
        items: []
    };
    //const order = new Order(req.body);
    //await order.save();
    console.log(orderInstance)

}

async function webhookHandler(req, res) {
    const sig = req.headers["stripe-signature"];

    let event;
    try {
        event = stripeAPI.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        console.log('ERROR', err.message);
        return res.status(400).send(`Webhook error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        return fulfillOrder(session)
            .then(() => res.status(200))
            .catch((err) => res.status(400).send(`Webhook Error: ${err.message}`));
    }
}

module.exports = {
    webhookHandler
}