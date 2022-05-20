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
        this.exportExcel = new CustomEvent('exportExcel', {detail: {solicitante: this}})
        this.toggleColumn = new CustomEvent('toggleColumn', {detail: {solicitante: this, column: ''}})
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
        const excelBtn = this.shadow.querySelector('[data-excel]')
        excelBtn.addEventListener('click', e => {
            window.dispatchEvent(this.exportExcel)
        })
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
                <li><a class="subheader">Excel</a></li>
                <li><a data-excel class="waves-effect" href="#!">Exportar Excel</a></li>
            </ul>
        `

        this.createAllinstances()
        this.listenerEventsfromEscope()
        this.renderCheckBoxes()
    }

    errorHandler(err, errorMessage) {
        throw new Error(err.code, errorMessage)
    }

    async getData() {
        try {
            const res = await fetch('../data.json')
            const data = await res.json()
        
            return data
        }
        catch(error) {
            this.errorHandler(error, 'Erro ao buscar dados.')
        }
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
        
        headers.forEach(option => {
            let p = document.createElement('p')
            p.setAttribute('data-name', option)
            p.innerHTML = `
                            <label>
                                <input type="checkbox" checked="checked"/>
                                <span>${option}</span>
                            </label>
                        `
            let checkbox = p.querySelector('[type="checkbox"]')

            checkbox.addEventListener('click', e => {
                this.toggleColumn.detail.column = p.getAttribute('data-name')
                window.dispatchEvent(this.toggleColumn)
            })
            form.appendChild(p)
        })
    }


}

window.customElements.define('sidenav-right', SidenavRight);