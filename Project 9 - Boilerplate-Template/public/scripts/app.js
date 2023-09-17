/* <-------------------Traditional Approach (Imperative) ------------> */
// JSDoc Based comment style
/**
 * 1. Constants, helpers, variables
 */

/**
 * @type {HTMLElement}
 */
let burger, ul, menu;

/**
 * @type {NodeListOf<HTMLElement>} - Collection of navigation link elements.
 */
let navLink;

/**
 * @type {Document}
 */
let D;

/* <==============================================================> */

/**
 * 2. Application state
 */

/*
let state = { ... }
let setLoading = () => state.view = LOADING
let setReady = () => state.view = READY
let isLoading = () => state.view === LOADING
let isReady = () => state.view === READY
*/

/* <==============================================================> */

/**
 * 3. State accessor fn. (getter/setters) | fetch APIs
 */

/*
  const student = {
    firstName: "Monica",
    get getName() {
      return this.firstName;
    },
    set changeName(newName) {
      this.firstName = newName;
    },
  };
*/

/*
let isLoading = () => state.view === LOADING
let isReady = () => state.view === READY
let loadSongs = () => fetch('/api/songs/)
  .then(res => res.json())
  .then(data => {
    state.songs = data.songs
    state.view = READY
  })
  .catch(() => state.view = ERROR)
*/

/* <==============================================================> */

/**
 * 4. DOM node references
 */

/**
 * @type {Document}
 */
D = document;
// Nav hamburgerburger selections
burger = D.querySelector("#burger-menu");
ul = D.querySelector("nav ul");
nav = D.querySelector("nav");
navLink = D.querySelectorAll(".nav-link"); // Select nav links

/* <==============================================================> */

/**
 * 5. DOM Manipulation/update fn.
 */

/*
let updateView = () => {
  $viewLoading.classList.toggle('hidden', !isLoading())
  $viewReady.classList.toggle('hidden', !isReady())
  $viewError.classList.toggle('hidden', !isError())
}
let updateSongDetails = (songData, index) => {
  let $song = $$songs[index]
  $song.querySelector('.active')
    .classList.toggle('hidden', !isSelected(index))
    $song.querySelector('.title').textContent = songData.title
    $song.querySelector('.tempo').textContent = songData.tempo + 'bpm'
  }
  let updateSongs = () => state.songs.forEach(updateSongDetails)
*/

/* <==============================================================> */

/**
 * 6. Event handlers/listeners
 */

/*
let onPlay = () => {
  setPlay()
  updatePlaybackButton()
  updateScoresheet()
  startPlaybackTimer()
}
*/

/* <==============================================================> */

/**
 * 7. Event handler bindings
 */

// Toggle the hamburger menu when the burger button is clicked.
burger.addEventListener("click", () => {
  ul.classList.toggle("show");
});

// Close hamburger menu when a link is clicked
navLink.forEach((link) =>
  link.addEventListener("click", () => {
    ul.classList.remove("show");
  })
);

// Functional programming (FP) approach
/* 
const toggleMenu = () => ul.classList.toggle("show");
burger.addEventListener("click", toggleMenu);

const closeMenu = () => ul.classList.remove("show");
navLinks.forEach((link) => link.addEventListener("click", closeMenu));

$play.onclick = () => onPlay() 
*/

/* <==============================================================> */

/**
 * 8. Initial setup
 */

/*
setReady()
updateView()
*/

/* XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */
/* <-------------------ES6 Based approach (Class/OOPS)------------> */
// Best Modern approach : ES6 Classes + Modular code

// class NavigationMenu {
//   /**
//    * Creates a new NavigationMenu instance.
//    * @param {string} burgerSelector - The selector for the burger button.
//    * @param {string} ulSelector - The selector for the navigation menu ul.
//    * @param {string} navSelector - The selector for the navigation element.
//    * @param {string} navLinkSelector - The selector for navigation links.
//    */
//   constructor(burgerSelector, ulSelector, navSelector, navLinkSelector) {
//     this.burger = document.querySelector(burgerSelector);
//     this.ul = document.querySelector(ulSelector);
//     this.nav = document.querySelector(navSelector);
//     this.navLinks = document.querySelectorAll(navLinkSelector);

//     this.setupEventHandlers();
//   }
//   toggleMenu() {
//     this.ul.classList.toggle("show");
//   }
//   closeMenu() {
//     this.ul.classList.remove("show");
//   }
//   setupEventHandlers() {
//     this.burger.addEventListener("click", () => this.toggleMenu());
//     this.navLinks.forEach((link) =>
//       link.addEventListener("click", () => this.closeMenu())
//     );
//   }

//   initialSetup() {
//     // Uncomment and add any initial setup logic if needed.
//     // For example: this.setReady();
//     // this.updateView();
//   }
// }

// Create a NavigationMenu instance with selectors
// const menu = new NavigationMenu("#burger-menu", "nav ul", "nav", ".nav-link");

// Perform initial setup
// menu.initialSetup();

/* XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */
/* <---------------------Modular approach (Rarely used)-----------------> */

/* Here you could segregate code based on modules like
  - DOM node values
  - Repeatedly used functions like showing toast and modal, resetting values.
  - Constants like backend urls.
  - API calls, that is getting and setting data to backend.
  - Based on functionality, that is , for example, In to-do app, authentication and add to-do functionality are independent and can be included in different modules.
 */
