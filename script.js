const form = document.querySelector('form');
const input = document.querySelector('.input');

const isValidImageUrl = (url) => {
    // Verifica se a URL termina com uma extensão de imagem
    return /\.(jpeg|jpg|gif|png|bmp|svg)$/.test(url);
};

const replaceImages = (url) => {
    const images = document.querySelectorAll('img');
    images.forEach((image) => image.src = url);
};

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const imageUrl = input.value;

    // Verifica se o URL fornecido é uma URL de imagem válida
    if (!isValidImageUrl(imageUrl)) {
        alert('Por favor, insira um link de imagem válido (JPEG, PNG, GIF, etc.).');
        return; // Sai da função se o URL não for válido
    }

    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: replaceImages,
        args: [imageUrl]
    });
});
