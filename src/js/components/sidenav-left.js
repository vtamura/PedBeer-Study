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
        this.getTable = new CustomEvent('getTable', {detail: {solicitante: this, table: ""}})
        this.changeNavbarText = new CustomEvent('changeNavbarText', {detail: {solicitante: this, text: ""}})
    }

    listenerEventsfromWindow(){
        window.addEventListener('openLeftMenu', e => {
            this.sidenavInstance.open()
        })
    }

    createAllinstances(){
        const sidenav = this.shadow.querySelector('.sidenav')
        this.sidenavInstance = M.Sidenav.init(sidenav)

        const collapsibles = this.shadow.querySelectorAll('.collapsible')
        this.collapsible = M.Collapsible.init(collapsibles)
        
    }

    listenerEventsfromEscope(){
        const menuBtnsTable = this.shadow.querySelectorAll('[data-sidenav-btn]')

        menuBtnsTable.forEach( btnTable => {
            btnTable.addEventListener('click', e => {
                let cont = 0
                this.getTable.detail.table = btnTable.getAttribute('data-table')
                this.changeNavbarText.detail.text = btnTable.getAttribute('data-text')
                window.dispatchEvent(this.getTable)
                window.dispatchEvent(this.changeNavbarText)

                while(cont < menuBtnsTable.length) {
                    menuBtnsTable[cont++].className = ''
                }

                btnTable.className = 'active orange lighten-1'
            })
        })
    }
    
    render(){
        this.shadow.innerHTML = `
            <style>
                @import "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css";

                waves-effect.active {

                }
            </style>

            <ul id="slide-out" class="sidenav">
                <li><a class="subheader">Tabelas</a></li>
                
                <ul class="collapsible collapsible-accordion">
                    <li>
                        <a class="collapsible-header">Pessoas</a>
                        <div class="collapsible-body">
                            <ul>
                                <li data-sidenav-btn data-table="tabulator-table" data-text="Tabela 01" class="active orange lighten-1"><a class="waves-effect" href="#!">Tabela 01</a></li>
                                <li data-sidenav-btn data-table="tabulator-table02" data-text="Tabela 02"><a class="waves-effect" href="#!">Tabela 02</a></li>
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