import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
import '../node_modules/slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';

const selectBtn = document.querySelector('.breed-select');
const loaderText = document.querySelector('.loader-text');
const loaderEl = document.querySelector('.loader');
const alertEl = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

alertEl.style.display = 'none';
selectBtn.style.visibility = 'hidden';
loaderEl.style.display = 'none';

selectBtn.addEventListener('change', selectedCat);

function selectedCat(e) {
  const breedId = e.target.value;
  if (breedId) {
    loaderText.style.display = 'block';
    loaderEl.style.display = 'block';
    catInfo.style.display = 'none';
    fetchCat(breedId);
  } else {
    loaderText.style.display = 'none';
    loaderEl.style.display = 'none';
    catInfo.style.display = 'block';
  }
}
function fetchCat(breedId) {
  fetchCatByBreed(breedId)
    .then(response => {
      const catItemInfo = response;
      showCat(catItemInfo);
    })
    .catch(error => {
      Notiflix.Notify.failure(
        'Upps! Coś poszło nie tak. Odśwież stronę jeszcze raz.'
      );
      return error;
    })
    .finally(() => {
      loaderText.style.display = 'none';
      loaderEl.style.display = 'none';
    });
}

function showCat(catItemInfo) {
  const { name, description, temperament } = catItemInfo[0].breeds[0];
  const { url } = catItemInfo[0];
  const catInfoHTML = `
    <img class="image" src="${url}" alt="">
    <div class="wrapper">
      <h2>${name}</h2>
      <p><strong>Description:</strong> ${description}</p>
      <p><strong>Temperament:</strong> ${temperament}</p>
    </div>
  `;

  catInfo.innerHTML = catInfoHTML;
  catInfo.style.display = 'block';
}

function renderCats(cats) {
  cats.then(e => {
    const markup = e
      .map(({ id, name }) => {
        return `<option value='${id}'>${name}</option>`;
      })
      .join('');
    selectBtn.insertAdjacentHTML('beforeend', markup);
    loaderText.style.display = 'none';
    selectBtn.style.visibility = 'visible';
    const select = new SlimSelect({
      select: selectBtn,
    });
  });
}

renderCats(fetchBreeds());
