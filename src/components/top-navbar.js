class TopNavbar extends HTMLElement {
    constructor() {
        super()
        this.shadow = this.attachShadow({mode: 'open'})
    }

    connectedCallback() {
        this.render()
    }
    
    createCustomEvents() {

    }

    listenerEventsfromWindow() {

    }

    listenerEventsfromEscope() {

    }

    render() {
        this.shadow.innerHTML = `
        <style>
            @import "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css";
            nav {
                padding: 0 170px;
            }

            nav ul a {
                color: black;
            }
        </style>
        <nav class="white">
            <div class="nav-wrapper">
                <a href="#" class="brand-logo black-text">Ped <span class="orange-text">/ Beer</span></a>
                <ul id="nav-mobile" class="right hide-on-med-and-down">
                    <li><a href="#">Test#01</a></li>
                    <li><a href="#">Test#02</a></li>
                    <li><a href="#">Test#03</a></li>
                </ul>
            </div>
        </nav>
    `
    }
}

customElements.define('top-navbar', TopNavbar)