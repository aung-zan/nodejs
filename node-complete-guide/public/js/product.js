const deleteButtons = document.getElementsByClassName('delete');

const deleteProduct = async (element) => {
  // need to add for cors
  const productId = element.previousElementSibling.value;

  const response = await fetch(`/admin/product/${productId}`, {
    method: "DELETE",
    headers: {
      'accept': 'application/json'
    }
  });

  if (response.status === 200) {
    element.closest('article').remove();
  }

}

Array.from(deleteButtons).forEach(element => {
  element.addEventListener('click', () => deleteProduct(element));
});