async function fetchProducts() {
  console.log('Fetching dental.json...');
  const response = await fetch('dental.json');
  if (!response.ok) {
    console.error('Fetch failed with status:', response.status);
    throw new Error('Failed to fetch products');
  }
  const data = await response.json();
  console.log('Fetched products:', data);
  return data;
}

// Product list
async function renderProductList() {
  console.log('renderProductList() called');
  const container = document.getElementById('product-list');
  if (!container) {
    console.warn('No #product-list element found in the DOM.');
    return;
  }

  try {
    const products = await fetchProducts();
    console.log('Product data:', products);

    products.forEach(product => {
      console.log('🔹 Rendering product:', product);
      const item = document.createElement('div');
      item.innerHTML = `
        <a href="product.html?id=${product.id}">
          <img src="${product.imageUrl}" alt="${product.name}" />
          <h3>${product.name}</h3>
        </a>
      `;
      container.appendChild(item);
    });
  } catch (err) {
    console.error('Error in renderProductList:', err);
  }
}

// Product details
function getIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  console.log('Extracted ID from URL:', id);
  return id;
}

async function renderProductDetails() {
  console.log('renderProductDetails() called');
  const container = document.getElementById('details');
  if (!container) {
    console.warn('No #details section found in DOM.');
    return;
  }

  const id = getIdFromURL();
  if (!id) {
    console.warn('No product ID present in URL.');
    return;
  }

  try {
    const products = await fetchProducts();
    const product = products.find(p => p.id === id || p.id.toString() === id);
    console.log('Matched product:', product);

    if (!product) {
      console.warn('No product found for ID:', id);
      return;
    }

    document.getElementById('name').textContent = product.name;
    document.getElementById('desc').textContent = product.description;
    document.getElementById('price').textContent = `$${product.price}`;
    const img = document.getElementById('product-img');
    img.src = product.imageUrl;
    img.alt = product.name;
  } catch (err) {
    console.error('Error in renderProductDetails:', err);
  }
}

// Modal overlay (details page)
function initOverlay() {
  console.log('Initializing overlay...');
  const overlay = document.getElementById('overlay');
  const emailInput = document.getElementById('email');
  const signUpButton = document.getElementById('signup');

  if (!overlay || !emailInput || !signUpButton) {
    console.warn('Modal elements not found');
    return;
  }

  function showOverlay() {
    console.log('Showing overlay');
    overlay.style.display = 'flex';
    overlay.setAttribute('aria-hidden', 'false');
  }

  function hideOverlay() {
    console.log('Hiding overlay');
    overlay.style.display = 'none';
    overlay.setAttribute('aria-hidden', 'true');
  }

  document.addEventListener('DOMContentLoaded', showOverlay);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') hideOverlay();
  });

  overlay.addEventListener('click', e => {
    if (e.target === overlay) hideOverlay();
  });

  signUpButton.addEventListener('click', () => {
    const email = emailInput.value.trim();
    if (email) hideOverlay();
    else {
      alert('Please enter a valid email!');
      console.warn('Sign-up attempted with empty email');
    }
  });
}

// Conditional execution
if (document.getElementById('product-list')) {
  console.log('Detected #product-list – initializing list renderer');
  renderProductList();
}

if (document.getElementById('details')) {
  console.log('Detected #details – initializing product renderer');
  renderProductDetails();
}

if (document.getElementById('overlay')) {
  console.log('Detected #overlay – initializing modal');
  initOverlay();
}