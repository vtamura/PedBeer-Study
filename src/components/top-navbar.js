class TopNavbar extends HTMLElement {
    constructor(){
        super()
        this.createCustomEvents()
        this.listenerEventsfromWindow()
        this.navbarTitle = 'Bem Vindo ao PebBeer!'
        this.shadow = this.attachShadow({mode:'open'});
    }
     static get observedAttributes() {
        return [];
     }
    /*get propriedade(){
        return this.getAttribute('atributo');
    }*/
    /*set propriedade(valor){
            this.setAttribute('atributo',valor);
    }*/
    static get observedAttributes(){
        return []
    }
    connectedCallback(){
       this.render()
    }
    adoptedCallback() {
        console.log('o componente foi adotado por outro componenten parent')
     }
    disconnectedCallback() {
        console.log('o componente foi removido DOM');
     }
    attributeChangedCallback(name, oldVal, newVal) {
        /* if (oldVal !== newVal) {
        console.log('name changed from oldVal to newVal')
     } */
        this.render()
    }
    createCustomEvents(){
        this.openLeftMenu = new CustomEvent('openLeftMenu', {detail: {solicitante: this}})
    }

    listenerEventsfromWindow(){
        window.addEventListener('changeNavbarText', e => {
            console.log(e)
            this.navbarTitle = e.detail.text
            this.render()
        })
    }

    createAllinstances(){
        //let elementIdElement = this.shadow.querySelector('#idelement')
        //this.instanceIdElement = M.componenteMaterialize.init(elementIdElement, {});
    }
    listenerEventsfromEscope(){
        // let context = this
        const btnMenuLeft = this.shadow.querySelector('[data-name="menu-left"]')

        btnMenuLeft.addEventListener('click', e => {
            window.dispatchEvent(this.openLeftMenu)
            console.log('Fui clicado! - Navbar')
        })

    }
    render(){
        this.shadow.innerHTML = `
            <style>
                @import "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css";
                .nav-wrapper {
                    padding: 0 200px;
                }
                ul li a {
                    color: black;
                }
                .badge {
                    display: inline !important;
                    padding: 10px 16px !important;
                    color: black !important;
                    border-radius: 10px;
                }

            </style>
            <nav>
                <div class="nav-wrapper grey lighten-5 z-depth-0">
                    <a href="#" class="brand-logo">
                        <span class="orange-text">Ped / </span><span class="black-text">Beer</span>
                    </a>
                    <ul id="nav-mobile" class="right hide-on-med-and-down">
                        <li>
                            <a><span class="badge orange">${this.navbarTitle}</span></a>
                        </li>
                        <li>
                            <a href="#" data-name="menu-left" data-target="slide-out" class="sidenav-trigger show-on-large">
                                Menu-left
                            </a>
                        </li>
                        <li>
                            <a href="#" data-name="menu-right" data-target="slide-out" class="sidenav-trigger show-on-large">
                                Menu-Right
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>

        `
        this.createAllinstances()
        this.listenerEventsfromEscope()
    }
}

window.customElements.define('top-navbar', TopNavbar);