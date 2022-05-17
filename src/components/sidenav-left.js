class SidenavLeft extends HTMLElement {
    constructor(){
        super()
        this.shadow = this.attachShadow({mode:'open'});
        this.createCustomEvents()
        this.listenerEventsfromWindow()
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
    }

    createCustomEvents(){
        this.changeNavbarText = new CustomEvent('changeNavbarText', {detail: {solicitante: this, text: ""}})
    }

    listenerEventsfromWindow(){
        window.addEventListener('openLeftMenu', e => {
            console.log(e.detail)
            this.sidenavInstance.open()
            console.log('Sidenav: Ouvi o evento!') 
        })
    }

    createAllinstances(){
        const sidenav = this.shadow.querySelector('.sidenav')
        this.sidenavInstance = M.Sidenav.init(sidenav)

        const collapsibles = this.shadow.querySelectorAll('.collapsible')
        this.collapsible = M.Collapsible.init(collapsibles)
        
    }

    listenerEventsfromEscope(){
        //let context = this
        //let idcomponente = this.shadow.querySelector('#idcomponente')
        //idcomponente.addEventListener('click',function(){window.dispatchEvent(context.nomeDoEventoCustomizado);})
        let collapsibleLinkText = this.shadow.querySelectorAll('[data-text]')

        collapsibleLinkText.forEach( link => {
            link.addEventListener('click', e => {
                this.changeNavbarText.detail.text = link.getAttribute('data-text')
                window.dispatchEvent(this.changeNavbarText)
            })
        })
        
    }
    
    render(){
        this.shadow.innerHTML = `
            <style>
                @import "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css";
            </style>

            <ul id="slide-out" class="sidenav">
                <li><a class="subheader">Some Links</a></li>
                
                <ul class="collapsible collapsible-accordion">
                    <li>
                        <a class="collapsible-header">Collapsible#01</a>
                        <div class="collapsible-body">
                            <ul>
                                <li><a data-text="Link 01 Clicado!" class="waves-effect" href="#!">Link#01</a></li>
                                <li><a data-text="Link 02 Clicado!" class="waves-effect" href="#!">Link#02</a></li>
                                <li><a data-text="Link 03 Clicado!" class="waves-effect" href="#!">Link#03</a></li>
                                <li><a data-text="Link 04 Clicado!" class="waves-effect" href="#!">Link#04</a></li>
                            </ul>
                        </div>
                    </li>
                </ul>
                <ul class="collapsible collapsible-accordion">
                    <li>
                        <a class="collapsible-header">Collapsible#02</a>
                        <div class="collapsible-body">
                            <ul>
                                <li><a data-text="Link 05 Clicado!" class="waves-effect" href="#!">Link#05</a></li>
                                <li><a data-text="Link 06 Clicado!" class="waves-effect" href="#!">Link#06</a></li>
                                <li><a data-text="Link 07 Clicado!" class="waves-effect" href="#!">Link#07</a></li>
                                <li><a data-text="Link 08 Clicado!" class="waves-effect" href="#!">Link#08</a></li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </ul>
            
        `
        this.createAllinstances()
        this.listenerEventsfromEscope()
    }
}

window.customElements.define('sidenav-left', SidenavLeft);