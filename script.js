const shadowsContainer = document.getElementById('shadows-container');
const imagesContainer = document.getElementById('images-container');

// Lista de imagens de sombra
const shadowImages = [
    'bulbasaurSombra.jpg', 'charizardSombra.jpg', 'charmanderSombra.jpg', 'charmeleonSombra.jpg',
    'ivysaurSombra.png', 'pikachuSombra.jpg', 'squirtleSombra.jpg', 'wartortleSombra.jpg',
];

// Lista de imagens a serem arrastadas
const imageOrder = ['bulbasaur.jpg', 'charizard.jpg', 'charmander.jpg', 'charmeleon.png',
    'ivysaur.jpg', 'pikachu.jpg', 'squirtle.png', 'wartortle.png',]

// Função para embaralhar a ordem das imagens
function shuffleImages() {
    imageOrder.sort(() => Math.random() - 0.5);
    imageOrder.forEach((image, index) => {
        const imageDiv = document.createElement('div');
        imageDiv.className = 'image';
        imageDiv.style.backgroundImage = `url(${image})`;
        imageDiv.dataset.index = index;
        imagesContainer.appendChild(imageDiv);
    });
}

shuffleImages();

// Função para mostrar sombras uma por vez aleatoriamente
function showShadows() {
    const shadowDiv = document.createElement('div');
    shadowDiv.className = 'shadow';
    shadowImages.sort(() => Math.random() - 0.5);
    shadowDiv.style.backgroundImage = `url(${shadowImages.pop()})`;
    shadowsContainer.appendChild(shadowDiv);
}

showShadows();

imagesContainer.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text', e.target.dataset.index);
});

shadowsContainer.addEventListener('dragover', (e) => {
    e.preventDefault();
});

shadowsContainer.addEventListener('drop', (e) => {
    e.preventDefault();
    const imageIndex = e.dataTransfer.getData('text');
    const imageDiv = document.querySelector(`[data-index="${imageIndex}"]`);
    if (imageDiv) {
        shadowsContainer.removeChild(e.target);
        imageDiv.style.backgroundImage = '';
        imageDiv.draggable = false;
    }
    if (shadowsContainer.children.length === 0) {
        showShadows();
    }
});
