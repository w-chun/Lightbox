var requestURL = 'https://cors-anywhere.herokuapp.com/https://api.flickr.com/services/feeds/photos_public.gne?tags=puppies&format=json&nojsoncallback=true';
var request = new XMLHttpRequest();
request.open('get', requestURL);
request.responseType = 'json';
request.send();
request.onload = function() {
  var puppies = request.response;
  populateHeader(puppies);
  populateImages(puppies);
  populateSlides(puppies);
};

function populateHeader(Obj) {
  var header = document.getElementById('header');
  var h1 = document.createElement('h1');
  h1.textContent = Obj['title'];
  h1.classList.add('title');
  header.appendChild(h1);
}

function populateImages(Obj) {
  var grid = document.getElementById('grid');
  var puppies = Obj['items'];

  for (var i = 0; i < puppies.length; i++) {
    var wrapper = document.createElement('div');
    var image = document.createElement('img');
    var description = document.createElement('div');

    image.setAttribute('src', puppies[i].media.m);
    image.setAttribute('onClick', `openModal();currentSlide(${i})`);

    wrapper.appendChild(image);
    wrapper.classList.add('item');
    grid.appendChild(wrapper);
  }
}

function populateSlides(Obj) {
  var content = document.getElementById('modal-content');
  var puppies = Obj['items'];

  for (var i = 0; i < puppies.length; i++) {
    var slides = document.createElement('div');
    var slideCount = document.createElement('div');
    var image = document.createElement('img');

    image.setAttribute('src', puppies[i].media.m);
    slideCount.innerHTML += `${i+1} / ${puppies.length}`;
    slides.classList.add('mySlides');
    slideCount.classList.add('slideCount');

    slides.appendChild(slideCount);
    slides.appendChild(image);
    content.appendChild(slides);
  }
}

function openModal() {
  document.getElementById('modal').style.display = "block";
}

function closeModal() {
  document.getElementById('modal').style.display = "none";
}

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var slides = document.getElementsByClassName("mySlides");
  var captionText = document.getElementById("caption");
  if (n > slides.length - 1) {slideIndex = 0;}
  if (n < 0) {slideIndex = slides.length - 1;}
  for (var i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  slides[slideIndex].style.display = "flex";
}
