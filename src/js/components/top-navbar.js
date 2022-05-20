class TopNavbar extends HTMLElement {
    constructor(){
        super()
        this.createCustomEvents()
        this.listenerEventsfromWindow()
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
        this.openRightMenu = new CustomEvent('openRightMenu', {detail: {solicitante: this}})
    }
    
    createAllinstances(){
        //let elementIdElement = this.shadow.querySelector('#idelement')
        //this.instanceIdElement = M.componenteMaterialize.init(elementIdElement, {});
    }

    listenerEventsfromWindow(){
        window.addEventListener('changeNavbarText', e => {
            const title = this.shadow.querySelector('[data-title]')
            title.textContent = e.detail.text
        })
    }

    listenerEventsfromEscope(){
        // let context = this
        const btnMenuLeft = this.shadow.querySelector('#menu-left')
        const btnMenuRight = this.shadow.querySelector('#menu-right')

        btnMenuLeft.addEventListener('click', e => {
            window.dispatchEvent(this.openLeftMenu)
            console.log('Fui clicado! (esquerda) - Navbar')
        })


        btnMenuRight.addEventListener('click', e => {
            window.dispatchEvent(this.openRightMenu)
            console.log('Fui clicado! (direita) - Navbar')
        })

    }
    
    render(){
        this.shadow.innerHTML = `
            <style>
                @import "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css";
                @import "https://pro.fontawesome.com/releases/v5.10.0/css/all.css";

                .nav-wrapper {
                    padding: 0 200px;
                }
                
                .sidenav-trigger {
                    color: black;
                    margin: 0 !important;
                }

                ul li > a {
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
                    <a href="#" id="menu-left" data-target="slide-out" class="sidenav-trigger show-on-large">
                        <i class="fas fa-bars"></i>
                    </a>
    
                    <a href="#" class="brand-logo center">
                        <span class="orange-text">Ped / </span><span class="black-text">Beer</span>
                    </a>

                    <ul id="nav-mobile" class="right hide-on-med-and-down">
                        <li>
                            <a><span data-title class="badge orange">Bem vindo ao PedBeer</span></a>
                        </li>
                        <li>
                            <a href="#" id="menu-right" data-target="slide-out" class="sidenav-trigger show-on-large">
                                <i class="fas fa-cog"></i>
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