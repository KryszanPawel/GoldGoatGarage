// CONSTANTS
const list = document.querySelector(".nav-items"),
  button = document.querySelector(".navbar button"),
  img = document.querySelector(".img-wrapper"),
  wrapper = document.querySelector(".site-wrapper"),
  burger = document.querySelector(".burger"),
  navbar = document.querySelector(".navbar");

const gallery = document.querySelector(".open-gallery");

// SCROLL TO THE TOP WHEN OPEN WEBSITE
document.addEventListener("animationend", (e) => {
  if (e.animationName === "open") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
});
//moving navbar behavior

let startPosition = wrapper.scrollTop;
wrapper.addEventListener("scroll", () => {
  // if scroll down
  if (wrapper.scrollTop > 80) {
    if (!document.querySelector(".navbar").classList.contains("moving")) {
      document.addEventListener(
        "transitionend",
        () => document.querySelector(".navbar").classList.add("moving"),
        { once: true }
      );
    }

    if (startPosition < wrapper.scrollTop) {
      document.querySelector(".navbar").style.top = `-80px`;
    } else {
      document.querySelector(".navbar").style.top = "0";
    }
    startPosition = wrapper.scrollTop;

    document.addEventListener("mousemove", (e) => {
      if (e.clientY < 100) {
        document.querySelector(".navbar").style.top = "0";
      }
    });
  } else {
    document.querySelector(".navbar").classList.remove("moving");
  }
});

//Burger button functionality
burger.addEventListener("mouseup", openSmallOnClick, { once: true });

function openSmallOnClick() {
  // CLEARS ALL NOT NESESSERY CLASSES
  clearAllClasses();
  document.querySelectorAll(".navigationItem").forEach((item, index) => {
    const delay = 0.1 + index / 10;
    item.style.transitionDelay = `${delay}s`;
  });
  burger.classList.add("click");
  img.classList.add("logo-onclick");
  list.classList.add("small-onclick");
  document.addEventListener(
    "animationend",
    () => {
      // IF CLICKED ANYWHERE ELSE THEN NAVBAR CLOSE NAVBAR
      document.addEventListener("click", removeSmallOnClick);
    },
    { once: true }
  );
}

function clearAllClasses() {
  list.classList = ["nav-items"];
  list.querySelectorAll(".closing").forEach((item) => {
    item.classList.remove("closing");
    item.style.removeProperty("transition-delay");
  });
  img.classList = ["img-wrapper"];
}

function removeSmallOnClick(e) {
  // CLOSES SMALL NAVBAR AND REMOVES EVENT LISTENER AFTER THAT
  itemList = document.querySelectorAll(".navigationItem");
  if (
    !document.querySelector(".navbar").contains(e.target) ||
    burger.contains(e.target) ||
    e.target.classList.contains("item")
  ) {
    Array.from(itemList)
      .reverse()
      .forEach((item, index) => {
        const delay = index / 10;
        item.style.transitionDelay = `${delay}s`;
        item.classList.add("closing");
      });
    list.classList.add("small-onclick-close");
    list.addEventListener("animationend", (e) => {
      if (e.animationName == "closemini") {
        list.classList.remove("small-onclick");
        list.classList.remove("small-onclick-close");
        img.classList.remove("logo-onclick");
        itemList.forEach((item) => {
          item.classList.remove("closing");
          item.style.removeProperty("transition-delay");
        });
      }
    });
    burger.classList.remove("click");
    burger.addEventListener("click", openSmallOnClick, { once: true });
    document.removeEventListener("click", removeSmallOnClick);
  }
}

// LOAD ALL THE CARDS
const breakPoint = 940;
let currentWidth = window.innerWidth;
let previousWidth = window.innerWidth;
let isWide = currentWidth > breakPoint;

const aboutBreakPoint = 690;
let isAboutWide = currentWidth > aboutBreakPoint;

const isResizeNeeded = (currentWidth, previousWidth, breakePoint) => {
  if (currentWidth < breakPoint && isWide) {
    isWide = !isWide;
    return true;
  } else if (currentWidth > breakPoint && !isWide) {
    isWide = !isWide;
    return true;
  }
  return false;
};

const isAboutUsResizeNeeded = (currentWidth, previousWidth) => {
  if (currentWidth < aboutBreakPoint && isAboutWide) {
    isAboutWide = !isAboutWide;
    return true;
  } else if (currentWidth > aboutBreakPoint && !isAboutWide) {
    isAboutWide = !isAboutWide;

    return true;
  }
  return false;
};

let aboutUsInfo = {};

const aboutUsInfoSection = document.getElementById("about");
const loadAboutUsSection = async () => {
  await fetch("../resources/aboutUs.json")
    .then((response) => response.json())
    .then((json) => (aboutUsInfo = json));
  aboutUsInfoSection.classList.add("hidden");

  if (currentWidth > aboutBreakPoint) {
    buildWideAboutUs();
  } else {
    buildMobileAboutUs();
  }
};

loadAboutUsSection();

function buildWideAboutUs() {
  aboutUsInfoSection.innerHTML = "";
  aboutUsInfoSection.classList.add(...["info", "about-us"]);

  const goatLogo = document.createElement("IMG");
  goatLogo.src = aboutUsInfo.goatLogo;
  goatLogo.classList.add("goatLogo");
  aboutUsInfoSection.appendChild(goatLogo);

  const sectionWrapper = document.createElement("DIV");
  sectionWrapper.classList.add("section-wrapper");

  const title = document.createElement("H2");
  title.innerText = aboutUsInfo.title;
  sectionWrapper.appendChild(title);

  const pararaphText = document.createElement("p");
  pararaphText.innerHTML = aboutUsInfo.shortText + aboutUsInfo.longText;
  sectionWrapper.appendChild(pararaphText);

  aboutUsInfoSection.appendChild(sectionWrapper);
}

function buildMobileAboutUs() {
  aboutUsInfoSection.innerHTML = "";
  aboutUsInfoSection.classList = [];
  aboutUsInfoSection.style.marginBottom = "5px";

  const goatLogo = document.createElement("IMG");
  goatLogo.src = aboutUsInfo.goatLogo;
  goatLogo.classList.add("goatLogo");
  aboutUsInfoSection.appendChild(goatLogo);

  const aboutUsCard = document.createElement("div");
  aboutUsCard.classList.add("segment", "dark");
  const picture = document.createElement("IMG");
  picture.src = aboutUsInfo.wheelIMG;
  // picture.alt = element.cardName;
  const title = document.createElement("H2");
  title.innerText = aboutUsInfo.title;
  const paragraph = document.createElement("p");
  paragraph.innerHTML = aboutUsInfo.shortText;
  aboutUsCard.appendChild(picture);
  aboutUsCard.appendChild(title);
  aboutUsCard.appendChild(paragraph);

  aboutUsInfoSection.appendChild(aboutUsCard);
}

const cardElements = [];
const projectSection = document.getElementById("projects");
const cardsHtmlElements = [];

const loadCardsToDOM = async () => {
  await fetch("../resources/cardSupplier.json")
    .then((response) => response.json())
    .then((json) => cardElements.push(...json));
  cardElements.map((element) => new CardElement(element));
  cardElements.sort((a, b) => b.index - a.index);

  cardElements.forEach((element) => {
    const motorcycleCard = document.createElement("div");
    motorcycleCard.classList.add("segment", element.theme);
    if (!element.isMovie) {
      const picture = document.createElement("IMG");
      picture.src = element.cardPhoto;
      picture.alt = element.cardName;
      const title = document.createElement("H2");
      title.innerText = element.cardName;
      const paragraph = document.createElement("p");
      paragraph.innerHTML = element.shortText;
      motorcycleCard.appendChild(picture);
      motorcycleCard.appendChild(title);
      motorcycleCard.appendChild(paragraph);
    } else {
      motorcycleCard.classList.add("movie");
      const video = document.createElement("video");
      video.src = element.cardPhoto;
      video.autoplay = true;
      video.muted = true;
      video.loop = true;
      motorcycleCard.appendChild(video);
    }
    cardsHtmlElements.push(motorcycleCard);
  });
  if (currentWidth > breakPoint) {
    buildWideView();
  } else {
    buildMobileView();
  }
};

loadCardsToDOM();

function buildWideView() {
  projectSection.innerHTML = "";
  const columnCointainer = document.createElement("div");
  columnCointainer.classList.add("columnContainer");
  const cardsLeftColumnDiv = document.createElement("div");
  cardsLeftColumnDiv.classList.add("cards", "leftColumn");
  const cardsRightColumnDiv = document.createElement("div");
  cardsRightColumnDiv.classList.add("cards", "rightColumn");

  const isUneven = cardsHtmlElements.length % 2 != 0;
  let lastUnevenIndexDiv;

  for (let index = 0; index < cardsHtmlElements.length; index++) {
    if (index == cardsHtmlElements.length - 1 && isUneven) {
      lastUnevenIndexDiv = document.createElement("div");
      lastUnevenIndexDiv.classList.add("last");
      lastUnevenIndexDiv.appendChild(cardsHtmlElements[index]);
    } else {
      index % 2 == 0
        ? cardsLeftColumnDiv.appendChild(cardsHtmlElements[index])
        : cardsRightColumnDiv.appendChild(cardsHtmlElements[index]);
    }
  }
  projectSection.appendChild(columnCointainer);
  columnCointainer.appendChild(cardsLeftColumnDiv);
  columnCointainer.appendChild(cardsRightColumnDiv);
  lastUnevenIndexDiv && projectSection.appendChild(lastUnevenIndexDiv);
}

function buildMobileView() {
  projectSection.innerHTML = "";
  const cardsColumnDiv = document.createElement("div");
  cardsColumnDiv.classList.add("cards");

  cardsHtmlElements.forEach((motorcycleCard, index) => {
    cardsColumnDiv.appendChild(motorcycleCard);

    projectSection.appendChild(cardsColumnDiv);
  });
}

window.addEventListener("resize", (e) => {
  currentWidth = window.innerWidth;
  if (isResizeNeeded(currentWidth, previousWidth, breakPoint)) {
    if (currentWidth > previousWidth) {
      buildWideView();
    } else {
      buildMobileView();
    }
  }

  if (isAboutUsResizeNeeded(currentWidth, previousWidth)) {
    if (currentWidth > previousWidth) {
      buildWideAboutUs();
    } else {
      buildMobileAboutUs();
    }
  }
  previousWidth = currentWidth;
});

// observer keep track on about-us section to fire animation

const aboutUsObserver = new IntersectionObserver(
  (e) => {
    e.forEach((entry) => {
      const goat = entry.target.querySelector(".goatLogo");
      goat.style.opacity = "0";

      if (entry.isIntersecting) {
        goat.style.opacity = "1";
        entry.target.classList.remove("hidden");

        return;
      }
    });
  },
  {
    root: document.querySelector("#scrollArea"),
    rootMargin: "0px",
    threshold: 0.3,
  }
);

//timeout to prevent firing animation before dom load

// observer keep track on footer to fire animation

const footerObserver = new IntersectionObserver((e) => {
  e.forEach((entry) => {
    if (entry.intersectionRatio > 0) {
      entry.target.style.animationName = "openFooter";

      entry.target.querySelector(".border1").style.animationName =
        "borderAnimation";
      entry.target.querySelector(".border2").style.animationName =
        "borderAnimation";

      entry.target
        .querySelectorAll(".paw")
        .forEach((paw) => (paw.style.animationName = "pawBlink"));

      entry.target.parentElement.querySelector(
        ".cat1 img"
      ).style.animationName = "catAppear";

      return;
    }
  });
});

setTimeout(() => {
  footerObserver.observe(document.querySelector("footer"));
  aboutUsObserver.observe(document.querySelector("#about"));
}, 500);

// card opens gallery on click

document.querySelector("#projects").addEventListener("click", async (e) => {
  if (
    e.target.parentNode.classList.contains("segment") ||
    e.target.classList.contains("segment")
  ) {
    if (
      e.target.parentNode.classList.contains("movie") ||
      e.target.classList.contains("movie")
    ) {
      return;
    }
    let url = window.location.href;
    url =
      url.indexOf("#gallery") > 0
        ? url.substring(0, url.indexOf("#gallery"))
        : url;
    // add #gallery to url (needed to control browser back button)

    let img;
    if (e.target.classList.contains("segment"))
      img = e.target.querySelector("IMG");
    if (e.target.parentNode.classList.contains("segment"))
      img = e.target.parentNode.querySelector("IMG");

    // // find folder name in src of an image
    window.location.assign(url + "#gallery");
    const folder = img.src.split("/").slice(0, -1).join("/");

    const gallery = document.createElement("DIV");
    gallery.classList.add("photo-gallery");

    const container = document.createElement("DIV");
    container.classList.add("container");

    const introContainer = document.createElement("DIV");
    introContainer.classList.add("intro");

    const h2 = document.createElement("H2");
    h2.classList.add("text-center");
    h2.textContent = e.target.parentElement.querySelector("h2").innerText;
    introContainer.appendChild(h2);

    const rowPhotos = document.createElement("DIV");
    rowPhotos.classList.add("photos");

    container.appendChild(introContainer);
    container.appendChild(rowPhotos);
    gallery.appendChild(container);

    async function printPhotos() {
      const photos = await getPhotosList(folder);
      const photosRow = gallery.querySelector(".photos");
      photos.forEach((photo) => {
        const photoDiv = document.createElement("DIV");
        photoDiv.classList.add("item");
        const a = document.createElement("A");
        a.href = `${folder}/${photo}`;
        a.setAttribute("data-lightbox", "photos");
        const img = document.createElement("IMG");
        img.classList.add("img-fluid");
        img.src = `${folder}/${photo}`;
        a.appendChild(img);
        photoDiv.appendChild(a);
        photosRow.appendChild(photoDiv);
      });
      console.log(photos);
    }

    printPhotos();

    document.body.appendChild(gallery);

    document.addEventListener("keydown", esc, { once: true });

    window.onhashchange = function () {
      if (window.location.href.indexOf("#gallery") < 0) {
        closeGallery();
      }
    };
  }
});

function closeGallery() {
  document.body.removeChild(document.querySelector(".photo-gallery"));

  document.removeEventListener("keydown", esc);
  document.querySelector("#lightbox").style.display = "none";
  document.querySelector("#lightboxOverlay").style.display = "none";
}

async function getPhotosList(folder) {
  const response = await fetch(`${folder}/info.json`)
    .then((response) => response.json())
    .then((data) => data["picList"]);
  return response;
}

async function getInfoText(folder) {
  const response = await fetch(`/static/images/${folder}/info.json`)
    .then((response) => response.json())
    .then((data) => data["info"]);
  return response[0];
}

document.querySelector("#location").addEventListener("click", (e) => {
  window.open(
    "https://www.google.pl/maps/place/Gold+Goat+Garage/@51.3753642,16.9402092,17z/data=!3m1!4b1!4m6!3m5!1s0x470f8dd03f1238d1:0xa53db5587399eaef!8m2!3d51.3753642!4d16.9427841!16s%2Fg%2F11v0_gb97v?entry=ttu"
  );
});

// close functions!

esc = (e) => {
  if (e.key === "Escape") {
    if (document.location.hash.indexOf("#gallery") >= 0) {
      back();
    }
  }
};

crossClose = () => {
  back();
  gallery.querySelector(".close").removeEventListener("click", crossClose);
  let url = window.location.href;
};

function back() {
  history.back();
}

getAspectRatio = (img) => {
  return img.naturalWidth / img.naturalHeight;
};

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

class CardElement {
  constructor(
    cardName,
    carPhoto,
    pathToInfo,
    isMovie,
    theme,
    shortText,
    index
  ) {
    this.cardName = cardName;
    this.cardPhoto = carPhoto;
    this.pathToInfo = pathToInfo;
    this.isMovie = isMovie;
    this.theme = theme;
    this.shortText = shortText;
    this.index = index;
  }
}
