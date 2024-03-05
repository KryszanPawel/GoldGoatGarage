async function printPhotos() {
  const photos = await getPhotosList();
  const photosRow = document.querySelector(".photos");
  photos.forEach((photo) => {
    const photoDiv = document.createElement("DIV");
    photoDiv.classList.add("col-sm-6", "col-md-4", "col-lg-3", "item");
    const a = document.createElement("A");
    a.href = `../../static/images/Honda_CM400_RocketMouse/${photo}`;
    a.setAttribute("data-lightbox", "photos");
    const img = document.createElement("IMG");
    img.classList.add("img-fluid");
    img.src = `../../static/images/Honda_CM400_RocketMouse/${photo}`;
    a.appendChild(img);
    photoDiv.appendChild(a);
    photosRow.appendChild(photoDiv);
  });
  console.log(photos);
}

async function getPhotosList() {
  const response = await fetch(
    `../../static/images/Honda_CM400_RocketMouse/info.json`
  )
    .then((response) => response.json())
    .then((data) => data["picList"]);
  return response;
}

printPhotos();
