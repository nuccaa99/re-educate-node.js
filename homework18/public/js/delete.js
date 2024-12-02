const handleDelete = async (id) => {
  const res = await fetch(`http://localhost:3000/expenses/${id}`, {
    method: 'DELETE',
    headers: {
      'api-key': '99999',
    },
  });

  if (res.ok) {
    window.location.reload();
  } else {
    console.error('Failed to delete expense:', await res.json());
  }

  console.log(res);
};
