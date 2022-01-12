/* menu */
let menuButton = document.querySelector("#menu");
let menu = document.querySelector(".links");

menuButton.addEventListener("click", function (e) {
    menu.classList.toggle("active");
    menuButton.classList.toggle('fa-times');
});
//close the menu whe we click outside
document.addEventListener("click", function(event){
    if(event.target !== menuButton && event.target !== menu){
        if(menu.classList.contains("active")){
            menu.classList.toggle("active");
            menuButton.classList.toggle('fa-times');
        }
    }
});

menu.onclick = function(e){
    e.stopPropagation();
}

/* Select Landing Page Element */

let landingPage = document.querySelector(".landing-page");
let imgsArray = ["1.jpg", "2.jpg", "3.jpg"];
//Random Background Option
let backgroundOption = true;

//Variable To control the interval
let theBgInterval;

//Check if there is local storage random background item

let backgroundLocalItem = localStorage.getItem("background-option");
//Check if random background local storage is not empty
if (backgroundLocalItem !== null) {

    if (backgroundLocalItem === 'true') {
        backgroundOption = true
    } else {
        backgroundOption = false
    }
    //Remove Active Class From All Span
    document.querySelectorAll(".random-backgrounds span").forEach(element => {
        element.classList.remove("active");
    });
    if (backgroundLocalItem === 'true') {
        document.querySelector(".random-backgrounds .yes").classList.add("active");
    } else {
        document.querySelector(".random-backgrounds .no").classList.add("active");
    }
}
//Function to Randomsize Imgs
function randomizeImgs() {
    if (backgroundOption === true) {
        // Get Random Number
        theBgInterval = setInterval(() => {
            let randomNumber = Math.floor(Math.random() * imgsArray.length);
            //change Background Image Url
            landingPage.style.backgroundImage = 'url("img/' + imgsArray[randomNumber] + '")';

        }, 3000)
    }
}
randomizeImgs();

/* Settings Box */
let settingBtn = document.querySelector("#settingsBtn");
let settingsBox = document.querySelector(".settings-box");

settingBtn.addEventListener("click", function (e) {
    this.classList.toggle("fa-spin");
    settingsBox.classList.toggle("open");
})

//Switch Colors

let colorsLi = document.querySelectorAll(".colors-list li");
//Loop On all List Items
colorsLi.forEach(li => {
    //Click on every list item
    li.addEventListener("click", function (e) {
        //Loop to remove active class
        colorsLi.forEach((ele) => {
            ele.classList.remove("active");
        });
        li.classList.add("active");
        //Set Color On Root
        document.documentElement.style.setProperty('--mainColor', e.target.dataset.color);
        //Set color in local Storage
        window.localStorage.setItem("color-option", e.target.dataset.color);
    });
});
//Check if there is color in local storage
let mainColor = window.localStorage.getItem("color-option")
if (mainColor !== null) {
    document.documentElement.style.setProperty('--mainColor', mainColor);
    //remove class active from all li
    colorsLi.forEach((li) => {
        li.classList.remove("active");
        //Add class active to the li that containe the color of local storage
        if (li.dataset.color === mainColor) {
            li.classList.add("active");
        }
    });

}

//Switch Random Background Images

let randomBackEle = document.querySelectorAll(".random-backgrounds span");
//Loop On all spans
randomBackEle.forEach(span => {
    //Click on every span
    span.addEventListener("click", function (e) {
        //Loop to remove active class
        randomBackEle.forEach((ele) => {
            ele.classList.remove("active");
        });
        span.classList.add("active");
        if (e.target.dataset.background === 'yes') {
            backgroundOption = true;
            randomizeImgs();
            localStorage.setItem("background-option", true);
        } else {
            backgroundOption = false;
            clearInterval(theBgInterval);
            localStorage.setItem("background-option", false);
        }
    });
});

//Select skills Selector

let ourSkills = document.querySelector(".our-skills");
window.onscroll = function () {
    //Skills offset Top
    let skillOffsetTop = ourSkills.offsetTop;

    //Skills Outer Height
    let skillsOuterHeight = ourSkills.offsetHeight;

    // Window Height
    let windowHeight = this.innerHeight;

    //window ScrollTop
    let windowSrollTop = this.pageYOffset;

    if (windowSrollTop >= (skillOffsetTop + skillsOuterHeight - windowHeight)) {
        let allSkills = document.querySelectorAll(".skill-box .skill-progress span");
        allSkills.forEach(skill => {
            skill.style.width = skill.dataset.progress;
        });
    }
}

// Create Popup with the image

let ourGallery = document.querySelectorAll(".gallery img");
let index = 0;
ourGallery.forEach(img => {
    img.addEventListener("click", (e) => {
        //create overlay element
        let overlay = document.createElement("div");
        //Add Class To Overlay
        overlay.className = 'popup-overlay';

        //Append Overlay To The Body
        document.body.appendChild(overlay);

        //Create The Popup
        let popupBox = document.createElement("div");

        //Add Class To Popup Box
        popupBox.className = 'popup-box';

        if (img.alt !== null) {
            //Create Heading
            let imgHeading = document.createElement("h3");

            //Create text for heading
            let imgText = document.createTextNode(img.alt);

            //Append The Text to the Heading
            imgHeading.appendChild(imgText);

            //Append the heading to the popup box
            popupBox.appendChild(imgHeading);
        }

        //Create The Image
        let popupImage = document.createElement("img");

        //Set Image Source
        popupImage.src = img.src;

        //Add Image To Popup Box
        popupBox.appendChild(popupImage);

        //Append The Popup Box To Body
        document.body.appendChild(popupBox);

        //Create The Close span
        let closeButton = document.createElement("span");

        //Create The Close Button Text
        let closeButtonText = document.createTextNode("X");

        //Append Text To Close Button
        closeButton.appendChild(closeButtonText);

        //Add Class To Close Button
        closeButton.className = 'close-button';

        //Add Close Button To The Popup Box
        popupBox.appendChild(closeButton);

        //Create Next Button and Prevoius Button
        let nextButton = document.createElement("span");
        let previousButton = document.createElement("span");

        //Create The Next Button Text and previous Button
        let nextButtonText = document.createTextNode(">");
        let previousButtonText = document.createTextNode("<");

        //Append Text To next and previous Button
        nextButton.appendChild(nextButtonText);
        previousButton.appendChild(previousButtonText);

        //Add Class To next Button
        nextButton.className = 'next-button';
        previousButton.className = 'previous-button';

        //Add Next and previous Button To the Popup Box
        popupBox.appendChild(nextButton);
        popupBox.appendChild(previousButton);


    });
});

//Close Popup
document.addEventListener("click", (e) => {
    if (e.target.className == 'close-button') {
        //Remove The Current Popup
        e.target.parentNode.remove();

        //Remove Overlay
        document.querySelector(".popup-overlay").remove();
    }
})
//Close Popup
document.addEventListener("click", (e) => {
    if (e.target.className == 'popup-overlay') {
        //Remove Popup Box
        document.querySelector(".popup-box").remove();

        //Remove The Overlay
        e.target.remove();
    }
})

/*Next Popup
document.addEventListener("click", (e) => {
    if (e.target.className == 'next-button') {
        index+=1;
        if(index > ourGallery.length - 1){
            index = 0;
        }
        popupImage.src = ourGallery[index];
    }
})*/

//Select All Bullets

let allBullets = document.querySelectorAll(".nav-bullets .bullet");

function scrollToSection(element) {
    element.forEach(ele => {
        ele.addEventListener("click", (e) => {
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: 'smooth'
            })
        })
    })
}
scrollToSection(allBullets);

//show and hide bullets
let bulletSpan = document.querySelectorAll(".bullets-option span");
let bulletsContainer = document.querySelector(".nav-bullets");
let bulletLocalItem = localStorage.getItem("bullets-option");

if (bulletLocalItem !== null) {
    bulletSpan.forEach(span => {
        span.classList.remove("active");
    });
    if (bulletLocalItem === 'block') {
        bulletsContainer.style.display = 'block';
        document.querySelector(".bullets-option .yes").classList.add("active");

    } else {
        bulletsContainer.style.display = 'none';
        document.querySelector(".bullets-option .no").classList.add("active");
    }

}
bulletSpan.forEach(span => {
    span.addEventListener("click", (e) => {
        bulletSpan.forEach(e => {
            e.classList.remove("active");
        });
        span.classList.add("active");
        if (span.dataset.display === 'show') {
            bulletsContainer.style.display = 'block';
            localStorage.setItem("bullets-option", 'block');
        } else {
            bulletsContainer.style.display = 'none';
            localStorage.setItem("bullets-option", 'none');
        }

    });
});

//Reset Button
document.querySelector(".reset-option").onclick = function(){
    localStorage.removeItem("color-option");
    localStorage.removeItem("background-option");
    localStorage.removeItem("bullets-option");
    //reload window
    window.location.reload();
}

//FAQS
let faqs = document.querySelectorAll(".faq-box");

faqs.forEach(faq => {
  faq.addEventListener("click", function (e) {
    faq.classList.toggle("active");
  });
});