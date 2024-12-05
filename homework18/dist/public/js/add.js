"use strict";
const form = document.querySelector("form");
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const category = form.category.value;
    const price = form.price.value;
    const importance = form.importance.value;
    try {
        const res = await fetch("http://localhost:3000/expenses/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                category,
                price: Number(price),
                importance,
            }),
        });
        if (res.ok) {
            window.location.href = "/expenses";
        }
        else {
            const errorData = await res.json();
            console.error("Failed to update expense:", errorData);
        }
    }
    catch (error) {
        console.error("Network or fetch error:", error);
    }
});
