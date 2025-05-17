function handleResize(menuItems) {
    if (window.innerWidth >= 1000) {
        menuItems.classList.remove('hide');
    } else menuItems.classList.add('hide');
    console.log(window.innerWidth);
}

function imageViewer(e) {
    const closeButton = document.querySelector('.close-viewer');
    const modal = document.querySelector('dialog');

    const picture = e.target.closest('img');

    console.log(picture);
    console.log(picture.alt);

    modal.innerHTML = `<img><button class='close-viewer'>X</button>`;
    modal.firstChild.src = picture.src;
    modal.firstChild.alt = picture.alt;
    modal.showModal();

    console.log(modal);

    document.querySelector('.close-viewer').addEventListener('click', () => {
        const modal = document.querySelector('dialog');
        modal.close()
    });
}

const menu = document.querySelector('h3')
const menuItems = document.querySelector('menu');

menu.addEventListener('click', () => menuItems.classList.toggle('hide'));

handleResize(menuItems);
window.addEventListener('resize', function(){ handleResize(menuItems); });

const gallery = document.querySelector('.gallery');
gallery.addEventListener('click', imageViewer);

const modal = document.querySelector('dialog');
modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.close();
  }
})