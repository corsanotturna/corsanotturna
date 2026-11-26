/*
  Corsa Notturna site settings
  ----------------------------
  This is the only file you need to edit to update the site.
  Leave a link as "" and the button or link for it stays hidden.
*/
window.CORSA = {

  // Your Ko-fi page, for example "https://ko-fi.com/corsanotturna"
  kofi: "",

  // A contact email, for example "hello@yourdomain.com"
  email: "",

  // Your Formspree form link, for example "https://formspree.io/f/abcd1234".
  // While this is "", the contact form stays hidden.
  contactForm: "",

  // Your social pages (full links)
  social: {
    youtube: "",
    tiktok: "",
    instagram: "",
    discord: ""
  },

  // Your dashboards. While this list is empty, the site shows a
  // "coming soon" message. To add one, copy the example in README.md
  // between the [ and ] below.
  dashes: [
    {
      name: "Esagono Verde CM2",
      device: "MOZA CM2 dash, 1280×720",
      description: "Everything you need during the race, on one clean screen. A qualifying page keeps your delta, best lap and time left in the session in view.",
      features: [
        "Shift lights, gear and speed, with the gear turning red in neutral",
        "Position and gaps to the cars ahead and behind",
        "Current lap, predicted lap and live delta",
        "Fuel in gallons, with laps of fuel left that keeps counting after a garage visit",
        "Laps left turns yellow, then red, with a LOW FUEL warning in the gear hexagon",
        "TC, ABS, brake bias and engine map",
        "Flag and pit limiter alerts",
        "Qualifying page with a lap progress bar"
      ],
      pages: [
        { label: "Race", image: "img/dashes/esagono-verde-cm2-race.png" },
        { label: "Qualifying", image: "img/dashes/esagono-verde-cm2-qualifying.png" },
        { label: "Yellow flag", image: "img/dashes/esagono-verde-cm2-flag.png" }
      ],
      download: "downloads/esagono-verde-cm2.mzdash",
      downloadLabel: "Download for CM2",
      size: "864 KB",
      version: "1.1",
      updated: "November 2026"
    }
  ]
};
