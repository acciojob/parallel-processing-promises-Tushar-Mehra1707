//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;

    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image from ${url}`));
  });
}
function downloadImages(urls) {
  const loadingDiv = document.getElementById("loading");
  const errorDiv = document.getElementById("error");
  const outputDiv = document.getElementById("output");
  errorDiv.innerText = "";
  outputDiv.innerHTML = "";
  loadingDiv.style.display = "block";

  const imagePromises = urls.map(downloadImage);

  Promise.all(imagePromises)
    .then(images => {
      images.forEach(img => outputDiv.appendChild(img));
    })
    .catch(err => {
      errorDiv.innerText = err.message;
    })
    .finally(() => {
      loadingDiv.style.display = "none";
    });
}
downloadImages(imageUrls);
