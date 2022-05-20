class TabulatorContainer extends HTMLElement {
    constructor(){
        super()
        this.shadow = this.attachShadow({mode: 'open'});
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
        //this.nomeDoEventoCustomizado = new CustomEvent('nomeDoEventoCustomizado', {detail: {}});
    }

    listenerEventsfromWindow(){
        // window.addEventListener('sendTableToContainer', e => {
        //     const h1 = this.shadow.querySelector('h1')
        //     const newRoot = e.detail.root.querySelector('#tabulator-table')
        //     newRoot.style.display = "none"
        // })
    }

    createAllinstances(){
        //let elementIdElement = this.shadow.querySelector('#idelement')
        //this.instanceIdElement = M.componenteMaterialize.init(elementIdElement, {});
    }

    listenerEventsfromEscope(){
        //let context = this
        //let idcomponente = this.shadow.querySelector('#idcomponente')
        //idcomponente.addEventListener('click',function(){window.dispatchEvent(context.nomeDoEventoCustomizado);})
    }

    render(){
        this.shadow.innerHTML = `
            <h1>Teste</h1>
        `
        this.createAllinstances()
        this.listenerEventsfromEscope()
    }
}

window.customElements.define('tabulator-container', TabulatorContainer)