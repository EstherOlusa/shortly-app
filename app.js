const navIcon = document.querySelector(".nav-icon-mobile");
const drawer = document.querySelector(".drawer");
const input = document.querySelector(".input");
const labelButton = document.querySelector(".label-button");
const errorText = document.querySelector(".error-text");
const linkList = document.querySelector(".link-list");

navIcon.addEventListener("click", (e) => {
  drawer.classList.toggle("active");
});
document.addEventListener("mouseup", (e) => {
  drawer.classList.remove("active");
});
const createError = (error) => {
  errorText.innerHTML = error;
  input.classList.add("input-error");
};
const clearError = () => {
  errorText.innerHTML = "";
  input.classList.remove("input-error");
};
const shortenLink = async (url) => {
  try {
    const resp = await fetch(`https://api.shrtco.de/v2/shorten?url=${url}`);
    const data = await resp.json();
    console.log(data);
    if (data.ok) {
      appendList(data.result.original_link, data.result.short_link);
      //do something with data
    } else {
      createError(data.error);
    }
    // return data;
  } catch (e) {
    createError("an error occured");
  }
};
const appendList = (ol, sl) => {
  linkList.insertAdjacentHTML(
    "beforeend",
    `<div class="link-card">
  <p class="original-link">${ol}</p>
  <p class="short-link">${sl}</p>
  <button class="btn-copy">Copy</button>
</div>`
  );
  //   linkList.append(`<div class="link-card">
  //     <p class="original-link">${ol}</p>
  //     <p class="short-link">${sl}</p>
  //     <button class="btn-copy">Copy</button>
  //   </div>`);
};
labelButton.addEventListener("click", (e) => {
  e.preventDefault();
  clearError();
  if (input.value !== "") {
    shortenLink(input.value);
  } else {
    createError("Please add a link");
  }
  //   console.dir(input);
});
