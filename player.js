/* ============================================
   swordes.world - music player (home page only)
   Big screens get Webamp. Phones get a simple player.
   ============================================ */

// Songs in the playlist, in order. To add a song: put the .mp3 in the
// "audio" folder and add a line here.
var SONGS = [
  { file: "audio/a-place-to-sit_swordes.mp3", title: "A Place to Sit", seconds: 160 },
  { file: "audio/boyfriend-la-la-la_swordes.mp3", title: "Boyfriend la la la", seconds: 199 },
  { file: "audio/eat-ur-heart-out_swordes.mp3", title: "Eat Ur Heart Out", seconds: 295 },
  { file: "audio/finally-found_swordes.mp3", title: "Finally Found!", seconds: 222 },
  { file: "audio/luv-the-bomb_swordes.mp3", title: "How I learned 2 luv the bomb", seconds: 138 },
  { file: "audio/no-return_swordes.mp3", title: "No Return", seconds: 211 }
];

// Skins visitors can pick from Webamp's menu (right-click the player > Skins).
// To add a skin: put the .wsz file in the "skins" folder and add a line here.
var SKINS = [
  { file: "skins/pirate-winampskin.wsz", name: "Pirate" },
  { file: "skins/pinkblack-winampskin.wsz", name: "Pink Black" },
  { file: "skins/pink-sunset-winampskin.wsz", name: "Pink Sunset" }
];

// The skin Webamp starts with. Set to "" to use the classic Winamp skin.
var DEFAULT_SKIN = "skins/pirate-winampskin.wsz";

// Webamp version, loaded from the jsDelivr CDN. This bundle includes the
// Milkdrop visualizer shown on the right of the player.
var WEBAMP_URL = "https://cdn.jsdelivr.net/npm/webamp@2.3.1/built/webamp.butterchurn-bundle.min.mjs";

var ARTIST = "Swordes";
var box = document.getElementById("music-player");

var isPhone =
  window.matchMedia("(max-width: 740px)").matches ||
  window.matchMedia("(pointer: coarse)").matches;

if (isPhone) {
  showSimplePlayer();
} else {
  import(WEBAMP_URL)
    .then(function (module) { return startWebamp(module.default); })
    .catch(function (error) {
      console.error("Webamp could not load, using the simple player instead.", error);
      showSimplePlayer();
    });
}

function startWebamp(Webamp) {
  if (!Webamp.browserIsSupported()) {
    showSimplePlayer();
    return;
  }

  var options = {
    initialTracks: SONGS.map(function (song) {
      return {
        url: song.file,
        duration: song.seconds,
        metaData: { artist: ARTIST, title: song.title }
      };
    }),
    availableSkins: SKINS.map(function (skin) {
      return { url: skin.file, name: skin.name };
    }),
    // Main window, equalizer and playlist stacked on the left;
    // the Milkdrop visualizer on the right, like the mockup.
    windowLayout: {
      main: { position: { top: 0, left: 0 } },
      equalizer: { position: { top: 116, left: 0 } },
      playlist: { position: { top: 232, left: 0 }, size: { extraHeight: 4, extraWidth: 0 } },
      milkdrop: { position: { top: 0, left: 275 }, size: { extraHeight: 12, extraWidth: 4 } }
    },
    enableMediaSession: true
  };

  if (DEFAULT_SKIN) {
    options.initialSkin = { url: DEFAULT_SKIN };
  }

  box.classList.remove("player-loading");
  box.classList.add("webamp-box");
  // Webamp gets the first song ready as soon as it starts, which made every
  // visitor download several MB of music before pressing play. While Webamp
  // sets itself up, any <audio> element it creates is told not to download
  // anything until the visitor presses play.
  var createElement = document.createElement;
  document.createElement = function (tagName) {
    var element = createElement.apply(document, arguments);
    if (String(tagName).toLowerCase() === "audio") element.preload = "none";
    return element;
  };
  var webamp;
  try {
    webamp = new Webamp(options);
  } finally {
    document.createElement = createElement;
  }

  return webamp.renderInto(box);
}

// A plain player for phones: one audio bar plus a clickable song list.
function showSimplePlayer() {
  box.classList.remove("player-loading", "webamp-box");
  box.classList.add("simple-player");
  box.innerHTML = "";

  var nowPlaying = document.createElement("p");
  nowPlaying.className = "now-playing";

  var audio = document.createElement("audio");
  audio.controls = true;
  audio.preload = "none";

  var list = document.createElement("ol");

  var current = 0;
  function load(index, autoplay) {
    current = index;
    audio.src = SONGS[index].file;
    nowPlaying.textContent = "♫ " + SONGS[index].title;
    list.querySelectorAll("button").forEach(function (button, i) {
      button.classList.toggle("playing", i === index);
    });
    if (autoplay) audio.play();
  }

  SONGS.forEach(function (song, index) {
    var item = document.createElement("li");
    var button = document.createElement("button");
    button.type = "button";
    button.textContent = song.title;
    button.addEventListener("click", function () { load(index, true); });
    item.appendChild(button);
    list.appendChild(item);
  });

  // Play the next song when one finishes
  audio.addEventListener("ended", function () {
    if (current < SONGS.length - 1) load(current + 1, true);
  });

  box.appendChild(nowPlaying);
  box.appendChild(audio);
  box.appendChild(list);
  load(0, false);
}
