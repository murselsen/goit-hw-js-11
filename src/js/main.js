import axios from 'axios';
// Dokümantasyonda belirtilen import
import iziToast from 'izitoast';
// Stil importu
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.app-form');
const gallery = document.querySelector('#appGallery');
const galleryList = document.querySelector('#galleryList');

const galleryItem = photoInfo => {
  const item = document.createElement('li');
  item.classList.add('gallery-item');

  const img = document.createElement('img');
  img.src = photoInfo.webformatURL;
  img.alt = photoInfo.tags;
  img.width = 360;
  img.height = 200;
  img.dataset.source = photoInfo.largeImageURL;

  const contentDiv = document.createElement('div');
  contentDiv.classList.add('content');

  // Likes
  const infoLikesDiv = document.createElement('div');
  infoLikesDiv.classList.add('info');

  const infoLikesKey = document.createElement('h5');
  infoLikesKey.classList.add('key');
  infoLikesKey.textContent = 'Likes';
  infoLikesDiv.appendChild(infoLikesKey);

  const infoLikesValue = document.createElement('p');
  infoLikesValue.classList.add('value');
  infoLikesValue.textContent = photoInfo.likes;
  infoLikesDiv.appendChild(infoLikesValue);

  contentDiv.appendChild(infoLikesDiv);

  item.appendChild(img);
  item.appendChild(contentDiv);
  galleryList.appendChild(item);
};

form.addEventListener('submit', async e => {
  e.preventDefault();
  galleryList.innerHTML = '';
  const search = e.target.elements.search.value.trim();
  axios
    .get('https://pixabay.com/api/', {
      params: {
        key: '21250106-0015933422f1e636de5f184b8',
        q: search,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    })
    .then(response => {
      console.log("Pixabay'den gelen veri", response);
      const photos = response.data.hits;
      photos.forEach(photo => {
        galleryItem(photo);
      });
    })
    .catch(error => {
      console.error("Pixabay'den gelen Hata", error);
    });
});

/* {
collections
:
3614
comments
:
33
downloads
:
136280
id
:
1400243
imageHeight
:
2000
imageSize
:
1180333
imageWidth
:
3000
largeImageURL
:
"https://pixabay.com/get/g771210c19e1526bf42ea01e9e76bd4d83b077a62987065aae9e12a92179c8b35df5a3ac4f61dd04f91a98e816f3d69c6ab6b38f719f8ddf22b6d332c2ac3e5f7_1280.jpg"
likes
:
299
pageURL
:
"https://pixabay.com/photos/buick-oldtimer-old-car-blue-car-1400243/"
previewHeight
:
99
previewURL
:
"https://cdn.pixabay.com/photo/2016/05/18/10/52/buick-1400243_150.jpg"
previewWidth
:
150
tags
:
"buick, oldtimer, old, car, blue car, classic, vintage, retro, car wallpapers, nostalgia, nostalgic, old car, parked car, car body, vehicle, transportation, automobile, automotive, car, car, car, car, car"
type
:
"photo"
user
:
"WildPixar"
userImageURL
:
"https://cdn.pixabay.com/user/2023/01/25/09-56-36-827_250x250.png"
user_id
:
2381951
views
:
174316
webformatHeight
:
426
webformatURL
:
"https://pixabay.com/get/g037427fbf8523490aa0b79e063221976aad764539993cb9ce922fdc4035488ad242f442eb83164d2283b60d0b496b25407b0ef3aa70dfc3664ec05b0be406e1e_640.jpg"
webformatWidth
:
640} */
