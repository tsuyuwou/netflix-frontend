const content = [
  { title: 'Dr. Stone', src: 'https://www.youtube.com/embed/SKfor6O-8hs' },
  { title: 'Black Clover', src: 'https://www.youtube.com/embed/6g3xi65r80o' },
  { title: 'One Piece', src: 'https://www.youtube.com/embed/T90-B1Ivv9A' },
  { title: 'Attack on Titan', src: 'https://www.youtube.com/embed/-YiM-sFVUmM' },
  { title: 'Demon Slayer', src: 'https://www.youtube.com/embed/tPEicYJWyQQ' },
  { title: 'Business Proposal', src: 'https://www.youtube.com/embed/3EPIJporhxc' },
  { title: "Harry Potter and the Sorcerer's Stone", src: 'https://www.youtube.com/embed/NBClQpIsEXk' },
  { title: 'Harry Potter and the Chamber of Secrets', src: 'https://www.youtube.com/embed/VjN5_mB7KFs' },
  { title: 'Harry Potter and the Prisoner of Azkaban', src: 'https://www.youtube.com/embed/MjoMN9RMKAY' }
];

const titles = document.getElementById('titles');
const trailers = document.getElementById('trailers');
for (let i = 0; i < content.length; i++) {
  titles.innerHTML += `<td>${content[i].title}</td>`
  const trailerHTML = `
    <td>
      <div style="position: relative;">
        <iframe width="560" height="315" src="${content[i].src}" title="${content[i].title}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        <div class="screen" style="position: absolute; top: 0; left: 0; width: 560px; height: 315px; display: flex; justify-content: center; align-items: center; font-size: 50px; cursor: pointer; user-select: none;">
          <div style="transform: translateX(-28px);">
            Watch
            <svg style="transform: translateY(3px);" xmlns="http://www.w3.org/2000/svg" width="44" height="44" fill="currentColor" class="bi bi-play" viewBox="0 0 16 16">
              <path d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"/>
            </svg>
            now
          </div>
        </div>
      </div>
    </td>
  `;
  trailers.innerHTML += trailerHTML;
}

let idx = 0;
const screens = document.getElementsByClassName('screen');
for (let i = 0; i < screens.length; i++) {
  screens[i].onclick = () => {
    screens[idx].style.zIndex = 0;
    screens[i].style.zIndex = -1;
    idx = i;
    window.getSelection().removeAllRanges();
  };
}

let width = window.innerWidth;
let fullscreen = false;
window.onresize = () => {
  if (!fullscreen) {
    width = window.innerWidth;
  }
};

const catalog = document.getElementById('catalog');
catalog.scrollTo({left: 2});
window.addEventListener('fullscreenchange', () => {
  if (!document.fullscreenElement) {
    fullscreen = false;
    const correction = width < 602 ? 2 : 2 - (width - 602) / 2;
    catalog.scrollTo({
      left: idx * 602 + correction
    });
  }
  else {
    fullscreen = true;
  }
});

const anchorElements = document.getElementsByTagName('a');
for (let i = 0; i < anchorElements.length; i++) {
  anchorElements[i].onclick = e => {
    if (window.location.pathname === '/' + e.target.getAttribute('href')) {
      e.preventDefault();
      e.target.blur();
    }
  };
}

catalog.onclick = function(e) {
  if (e.target === this) {
    screens[idx].style.zIndex = 0;
  }
};

titles.onclick = () => {
  screens[idx].style.zIndex = 0;
};
