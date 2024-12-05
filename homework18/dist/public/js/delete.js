"use strict";
const handleDelete = async (id) => {
    try {
        const res = await fetch(`http://localhost:3000/expenses/${id}`, {
            method: "DELETE",
            headers: {
                "api-key": "99999",
            },
        });
        if (res.ok) {
            window.location.reload();
        }
        else {
            const errorData = await res.json();
            console.error("Failed to delete expense:", errorData);
        }
    }
    catch (error) {
        console.error("Network or fetch error:", error);
    }
};
