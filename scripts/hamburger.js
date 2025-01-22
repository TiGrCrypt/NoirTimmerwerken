const mobileMenuElement = document.querySelectorAll(".mobile-line");
const headerElement = document.querySelector(".sticky-nav");
const projectElement = document.querySelector(".section-homepage");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting)
        mobileMenuElement.forEach((element) => {
          element.classList.remove("light");
          element.classList.add("dark");
          headerElement.classList.remove("sticky");
        });
      else {
        mobileMenuElement.forEach((element) => {
          element.classList.remove("dark");
          element.classList.add("light");
          headerElement.classList.add("sticky");
        });
      }
    });
  },
  {
    root: null,
    rootMargin: "-10px",
    threshold: 0,
  }
);

observer.observe(projectElement);
