// Array of image URLs
const imageUrls = [
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/200',
    'https://invalid-url.com/image.jpg' // Example invalid image for error testing
];

// Function to download a single image and return a Promise
function downloadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(`Failed to load image from URL: ${url}`);
        img.src = url;
    });
}

// Main function to download all images
async function downloadImages() {
    const loadingDiv = document.getElementById('loading');
    const errorDiv = document.getElementById('error');
    const outputDiv = document.getElementById('output');

    // Reset UI
    errorDiv.textContent = '';
    outputDiv.innerHTML = '';
    loadingDiv.style.display = 'block';

    try {
        // Download all images in parallel
        const images = await Promise.all(imageUrls.map(downloadImage));

        // Hide spinner
        loadingDiv.style.display = 'none';

        // Append all images to output div
        images.forEach(img => outputDiv.appendChild(img));
    } catch (error) {
        // Hide spinner
        loadingDiv.style.display = 'none';

        // Show error message
        errorDiv.textContent = error;
    }
}

// Trigger the download (you could call this on button click or on DOMContentLoaded)
downloadImages();
