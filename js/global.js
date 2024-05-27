async function load(page) {
  var response = await fetch(page);
  var content = await response.text();
  return content;
}

class Header extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    this.innerHTML = `
        <style>
            ${await load("../css/header.css")}
        </style>
        `;
    this.innerHTML += await load("../index/header.html");

    selectMenuOption();

    function selectMenuOption() {
      const page = getPageName();
      const menu = document.getElementById("js-menu");
      const menuOptions = menu.querySelectorAll(".nav-links");

      for (const element of menuOptions) {
        element.classList.remove("menu-selected");

        if (element.href.endsWith(page)) {
          element.classList.add("menu-selected");
        }
      }
    }

    function getPageName() {
      var path = window.location.pathname;
      var page = path.split("/").pop();
      return page;
    }
  }
}

class Footer extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    this.innerHTML = `
        <style>
            ${await load("../css/footer.css")}
        </style>
        `;
    this.innerHTML += await load("../index/footer.html");
  }
}

class Newsletter extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    this.innerHTML = `
        <style>
            ${await load("../css/newsletter.css")}
        </style>
        `;
    this.innerHTML += await load("../index/newsletter.html");
  }
}

customElements.define("header-component", Header);
customElements.define("footer-component", Footer);
customElements.define("newsletter-component", Newsletter);
