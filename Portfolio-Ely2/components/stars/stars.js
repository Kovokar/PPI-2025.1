const addStarsBackground = () => {
  const body = document.body;
  const starsWrapper = document.createElement("section");
  starsWrapper.className = "stars-wrapper";
  const star1 = document.createElement("div");
  star1.id = "stars1";
  const star2 = document.createElement("div");
  star2.id = "stars2";
  const star3 = document.createElement("div");
  star3.id = "stars3";
  starsWrapper.appendChild(star1);
  starsWrapper.appendChild(star2);
  starsWrapper.appendChild(star3);
  body.appendChild(starsWrapper);
};

addStarsBackground();

// TextDecoderStream
