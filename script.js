//
const imagerContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');


let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photoArray = [];

// Unsplash api
const count = 30;
const apiKey = 'Cgx0-Db5QPwFV0QE9JDh7SniY79fIllbyJRY_UNAag0'
// const apiKey = `uaYH0catQpvpDSvUXsOikW2UW_CoAvSfeA6iZS8HIi0`
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;


//checking if all images are loaded;
function photoLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}

//Creating images and other links

function displayPhotos() {
    totalImages = photoArray.length;
    imagesLoaded = 0;
    for (let photo of photoArray) {

        ///create a tag
        const item = document.createElement('a');
        item.setAttribute('href', photo.links.html);
        item.setAttribute('target', '_blank');
        ///create image
        const img = document.createElement('img');
        img.src = photo.urls.regular;
        img.alt = photo.alt_description;
        img.title = photo.alt_description
        //
        img.addEventListener('load', photoLoaded)
        //appending image and links
        item.appendChild(img);
        imagerContainer.appendChild(item);
    }
}




//Get photos from Unspalash.com
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photoArray = await response.json();
        displayPhotos();
    } catch (e) {
        console.log(e)
    }
};

//Check to see if scrolling near bootom of page;
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
});

///onLoad
getPhotos();