const options = {
  root: document.querySelector(".section-projects"),
  rootMargin: "0px",
  threshold: 1.0,
};

const changeColorMenu = function (entries, observer) {
  entries.forEach((entry) => {
    console.log(entry);
    if (observer.IntersectionObserver) {
      console.log("now");
    }
    if (entry.isIntersecting) {
      console.log("this works 2");
      // Change color or perform any action
      entry.target.style.stroke = "white";
    } else {
      entry.target.style.stroke = "black";
    }
  });
};

const target = document.querySelectorAll(".mobile-line");

const observer = new IntersectionObserver(changeColorMenu, options);

target.forEach((element) => {
  observer.observe(element);
  console.log("this works");
});

console.log("this works");
