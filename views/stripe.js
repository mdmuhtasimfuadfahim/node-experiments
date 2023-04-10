const stripe = Stripe("pk_test_51MvEJzFaVYZxmREee5KTqrVTfw2y1NpeiasJ3wXNIi0knDQp7sgU2oA8mxQPLA7ayKhUhih0CLU9o0LXFft585hL005342MeBi");
const elements = stripe.elements();

// Create our card inputs
var style = {
    base: {
        color: "#fff"
    }
};

const card = elements.create('card', { style });
card.mount('#card-element');

const form = document.querySelector('form');
const errorEl = document.querySelector('#card-errors');

// Give our token to our form
const stripeTokenHandler = token => {
    const hiddenInput = document.createElement('input');
    hiddenInput.setAttribute('type', 'hidden');
    hiddenInput.setAttribute('name', 'stripeToken');
    hiddenInput.setAttribute('value', token.id);
    form.appendChild(hiddenInput);

    form.submit();
}

// Create token from card data
form.addEventListener('submit', e => {
    e.preventDefault();

    stripe.createToken(card).then(res => {
        if (res.error) errorEl.textContent = res.error.message;
        else stripeTokenHandler(res.token);
    })
})