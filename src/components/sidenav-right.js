class SidenavRight extends HTMLElement {
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
        this.render()
    }

    createCustomEvents(){
        // this.downloadTable = new CustomEvent('downloadTable', {detail: {solicitante: this}})
    }

    listenerEventsfromWindow(){
        window.addEventListener('openRightMenu', e => {
            console.log('Ouvi Direita!')
            this.sidenavInstance.open()
        })
    }
    createAllinstances(){
        const rightSidenav = this.shadow.querySelector('.sidenav')
        this.sidenavInstance = M.Sidenav.init(rightSidenav, {edge: 'right'})
    }

    listenerEventsfromEscope(){
        // const downloadBtn = this.shadow.querySelector('[data-download]')
        // downloadBtn.addEventListener('click', e => {
        //     window.dispatchEvent(this.downloadTable)
        // })
    }

    async render(){
        this.shadow.innerHTML = `
            <style>
                @import "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css";
            </style>
            <ul id="slide-out" class="sidenav">
                <li><a class="subheader">Colunas</a></li>
                    <div class="container">
                        <form action="#">
                        </form>
                    </div>
            </ul>
        `

        this.createAllinstances()
        this.listenerEventsfromEscope()
        this.renderCheckBoxes()
    }

    async getData() {
        const res = await fetch('../data.json')
        const data = await res.json()
    
        return data
    }

    async getColumnTitle() {
        const data = await this.getData()
        const columnHeader = []

        for(let [key, value] of Object.entries(data[0])) {
            columnHeader.push(key)
        }

        return columnHeader
    }

    async renderCheckBoxes() {
        const headers = await this.getColumnTitle()
        const form = this.shadow.querySelector('form')
        
        console.log(headers)
        
        headers.forEach(option => {
            let p = document.createElement('p')
            p.innerHTML = `
                            <label>
                                <input type="checkbox" checked="checked"/>
                                <span>${option}</span>
                            </label>
                        `
            form.appendChild(p)
        })
    }


}

window.customElements.define('sidenav-right', SidenavRight);