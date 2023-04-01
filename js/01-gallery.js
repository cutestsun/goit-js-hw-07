import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryEl = document.querySelector(".gallery");

const galleryItemsEl = galleryItems
  .map(
    ({ preview, original, description }) => `<li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`
  )
  .join("");

galleryEl.innerHTML = galleryItemsEl;

galleryEl.addEventListener("click", onGalleryClick);

function onGalleryClick(evt) {
  const { target } = evt;
  evt.preventDefault();

  if (!target.classList.contains("gallery__image")) {
    return;
  }

  createLightBox(target);
}

function createLightBox(target) {
  const instance = basicLightbox.create(
    `<img src="${target.dataset.source}">`,
    {
      onShow: () => {
        window.addEventListener("keydown", onEscClick);
      },
      onClose: () => {
        window.removeEventListener("keydown", onEscClick);
      },
    }
  );

  function onEscClick(evt) {
    if (evt.code === "Escape") {
      instance.close();
    }
  }

  showLightBox(instance);
}

function showLightBox(instance) {
  instance.show();
}
