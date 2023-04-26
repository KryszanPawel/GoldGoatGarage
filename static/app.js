// CONSTANTS
const list = document.querySelector(".nav-items"),
  button = document.querySelector(".navbar button"),
  img = document.querySelector(".img-wrapper"),
  wrapper = document.querySelector(".site-wrapper"),
  burger = document.querySelector(".burger"),
  navbar = document.querySelector(".navbar");

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
  document.querySelectorAll(".item").forEach((item, index) => {
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
  itemList = document.querySelectorAll(".item");
  if (
    !document.querySelector(".navbar").contains(e.target) ||
    burger.contains(e.target)
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

// observer keep track on footer to fire animation

const observer = new IntersectionObserver((e) => {
  e.forEach((entry) => {
    entry.target.style.removeProperty("animation-name");

    entry.target.parentElement
      .querySelector(".cat1 img")
      .style.removeProperty("animation-name");

    entry.target
      .querySelectorAll(".border")
      .forEach((border) => border.style.removeProperty("animation-name"));

    entry.target
      .querySelectorAll(".paw")
      .forEach((paw) => paw.style.removeProperty("animation-name"));

    if (entry.isIntersecting) {
      entry.target.style.animationName = "openFooter";

      entry.target
        .querySelectorAll(".border")
        .forEach((border) => (border.style.animationName = "borderAnimation"));

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

observer.observe(document.querySelector("footer"));

// images opens galery on click

document.addEventListener("click", async (e) => {
  if (
    e.target.parentNode.classList.contains("segment") &&
    e.target.tagName == "IMG"
  ) {
    console.log(e.target);
    const gallery = document.querySelector(".open-gallery");

    gallery.style.background = `url(${e.target.src}) no-repeat black`;
    gallery.style.backgroundPosition = `center`;
    gallery.style.backgroundSize = `125%`;

    // find folder name in src of an image
    const folder = e.target.src.split("/").at(-2);
    // get names of pictures in folder
    const list_of_photos = await getPhotosList(folder);

    // sets first image to display
    const mainImage = gallery.querySelector(".main-photo img");
    mainImage.src = `/static/images/${folder}/${list_of_photos[0]}`;
    // sets title of a project
    gallery.querySelector(".text .title").innerText =
      e.target.parentElement.querySelector("h2").innerText;
    // creates gallery image right after loads of chosen project
    mainImage.addEventListener(
      "load",
      () => {
        gallery.classList.add("gallery-visible");
      },
      { once: true }
    );
    // event listener to close button
    gallery.querySelector(".close").addEventListener(
      "click",
      () => {
        gallery.style.removeProperty(...["background"]);
        gallery.classList.remove("gallery-visible");
      },
      { once: true }
    );

    //event listener to forward button
    gallery.querySelector(".forward").addEventListener("click", () => {
      const currentImage = gallery.querySelector(".main-photo img");
      const currentIndex = list_of_photos.indexOf(
        currentImage.src.split("/").at(-1)
      );
      mainImage.style.opacity = `0`;
      mainImage.parentElement.style.opacity = `0`;
      mainImage.addEventListener(
        "transitionend",
        () => {
          if (currentIndex < list_of_photos.length - 1) {
            mainImage.src = `/static/images/${folder}/${
              list_of_photos[currentIndex + 1]
            }`;
          } else {
            mainImage.src = `/static/images/${folder}/${list_of_photos[0]}`;
          }
          mainImage.addEventListener(
            "load",
            () => {
              mainImage.parentElement.style.opacity = `1`;
              mainImage.style.opacity = `1`;
            },
            { once: true }
          );
        },
        { once: true }
      );
    });

    //event listener to backward button
    gallery.querySelector(".backward").addEventListener("click", () => {
      const currentImage = gallery.querySelector(".main-photo img");
      const currentIndex = list_of_photos.indexOf(
        currentImage.src.split("/").at(-1)
      );
      mainImage.style.opacity = `0`;
      mainImage.parentElement.style.opacity = `0`;
      mainImage.addEventListener(
        "transitionend",
        () => {
          if (currentIndex > 0) {
            mainImage.src = `/static/images/${folder}/${
              list_of_photos[currentIndex - 1]
            }`;
          } else {
            mainImage.src = `/static/images/${folder}/${
              list_of_photos[list_of_photos.length - 1]
            }`;
          }
          mainImage.addEventListener(
            "load",
            () => {
              mainImage.parentElement.style.opacity = `1`;
              mainImage.style.opacity = `1`;
            },
            { once: true }
          );
        },
        { once: true }
      );
    });
  }
});

async function getPhotosList(folder) {
  const response = await fetch(`/static/images/${folder}/list.json`)
    .then((response) => response.json())
    .then((data) => data);

  return response;
}
