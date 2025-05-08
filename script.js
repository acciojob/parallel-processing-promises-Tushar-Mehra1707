const imageUrls = [
  'https://via.placeholder.com/300x200?text=Image+1',
  'https://via.placeholder.com/300x200?text=Image+2',
  'https://via.placeholder.com/300x200?text=Image+3',
  'https://invalid-url.com/image.jpg', // This one will trigger an error
  'https://via.placeholder.com/300x200?text=Image+5'
];

// Helper function to load an image and return a Promise
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
    img.src = url;
  });
}

// Main function to download all images
function downloadImages(urls) {
  const loadingDiv = document.getElementById('loading');
  const outputDiv = document.getElementById('output');
  const errorDiv = document.getElementById('error');

  // Clear previous state
  outputDiv.innerHTML = '';
  errorDiv.innerHTML = '';
  loadingDiv.style.display = 'block';

  const imagePromises = urls.map(downloadImage);

  Promise.all(imagePromises)
    .then(images => {
      loadingDiv.style.display = 'none';
      images.forEach(img => outputDiv.appendChild(img));
    })
    .catch(error => {
      loadingDiv.style.display = 'none';
      errorDiv.textContent = error.message;
    });
}

// Start downloading on page load
downloadImages(imageUrls);
