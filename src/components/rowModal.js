class rowModal extends HTMLElement {
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
        //this.nomeDoEventoCustomizado = new CustomEvent('nomeDoEventoCustomizado', {detail: {}});
    }

    listenerEventsfromWindow(){
        window.addEventListener('sendRowData', e => {
            const rowData = e.detail.data
            let string = ''
            console.log(rowData)
            for (let [key, value] of Object.entries(rowData)) {
                string += `${key}: ${value}, `
            }

            const finalString = string.replace(/,[\s]$/, ".")

            M.toast({html: finalString})
        })

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
            <div id="modal1" class="modal">
                <div class="modal-content">
                    <h4>Modal Header</h4>
                    <p>A bunch of text</p>
                </div>
                    <div class="modal-footer">
                    <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
                </div>
            </div>
        
        `

        this.createAllinstances()
        this.listenerEventsfromEscope()
    }
}

window.customElements.define('row-modal', rowModal);