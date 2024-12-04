const form = document.querySelector('form') as HTMLFormElement;

form.addEventListener('submit', async (e: Event) => {
  e.preventDefault();

  const category = (form.category as HTMLInputElement).value;
  const price = (form.price as HTMLInputElement).value;
  const importance = (form.importance as HTMLInputElement).value;

  try {
    const res = await fetch('http://localhost:3000/expenses/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        category,
        price: Number(price),
        importance,
      }),
    });

    if (res.ok) {
      window.location.href = '/expenses';
    } else {
      const errorData = await res.json();
      console.error('Failed to update expense:', errorData);
    }
  } catch (error) {
    console.error('Network or fetch error:', error);
  }
});