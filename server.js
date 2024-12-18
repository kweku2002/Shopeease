const express = require('express');
const stripe = require('stripe')('your-secret-key');  // Replace with your Stripe secret key

const app = express();
app.use(express.static('public'));
app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'Stylish Shirt',
                    },
                    unit_amount: 2999,  // $29.99, in cents
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `${process.env.HOST}/success.html`,
        cancel_url: `${process.env.HOST}/cancel.html`,
    });

    res.json({ id: session.id });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
