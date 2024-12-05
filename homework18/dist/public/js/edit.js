"use strict";
form.addEventListener('submit', async (e) => {
    const url = window.location.pathname;
    const id = url.split('/').pop();
    e.preventDefault();
    const category = form.category.value;
    const price = form.price.value;
    const importance = form.importance.value;
    try {
        const res = await fetch(`http://localhost:3000/expenses/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                category,
                price: Number(price),
                importance,
            }),
        });
        if (res.ok) {
            window.location.href = '/expenses';
        }
        else {
            const errorData = await res.json();
            console.error('Failed to update expense:', errorData);
        }
    }
    catch (error) {
        console.error('Network or fetch error:', error);
    }
});
