class TabulatorTable02 extends HTMLElement {
    constructor(){
        super()
        this.shadow = this.attachShadow({mode:'open'});
        this.createCustomEvents()
        this.listenerEventsfromWindow()
    }
    //  static get observedAttributes() {
    //     return [];
    //  }
    /*get propriedade(){
        return this.getAttribute('atributo');
    }*/
    /*set propriedade(valor){
            this.setAttribute('atributo',valor);
    }*/
    // static get observedAttributes(){
    //     return []
    // }

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
        this.sendRowData = new CustomEvent('sendRowData', {detail: {solicitante: this, data: "" }});
        this.sendTableToContainer = new CustomEvent('sendTableToContainer', {detail: {solicitante: this}});
    }

    listenerEventsfromWindow(){
        // window.addEventListener('downloadTable', () => {
        //     console.log('Copiado!')
        //     this.table.copyToClipboard("table", true);
        // })

        window.addEventListener('getTable', e => {
            if(e.detail.table === 'tabulator-table02'){
                this.shadow.querySelector('#tabulator-table02').style.display = 'block'
                this.table.redraw()
            } else {
                this.shadow.querySelector('#tabulator-table02').style.display = 'none'
            }
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
            <style>
                @import "https://unpkg.com/tabulator-tables@4.0.5/dist/css/tabulator.min.css";
                .tabulator {
                    background-color: none;
                    background: none;
                    border: none;
                    display: none;
                }

                .tabulator-header {
                    color: #D9D5E3 !important;
                    border: none !important;
                }

                .tabulator-col {
                    padding: 10px 0;
                }

                .tabulator-col {
                    background: #b84eba !important;
                    border: none !important;

                }

                // .tabulator-row-even {
                //     background-color: #fff1e3 !important;
                // }

                .tabulator-footer {
                    background: #b84eba !important;
                    border-top: none;
                }

            </style>
            <div id="tabulator-table02"></div>
        `
        this.createAllinstances()
        this.listenerEventsfromEscope()
        this.createTable()
    }
    
    async getData() {
        const res = await fetch('../data02.json')
        const data = await res.json()
        return data
    }

    async createTable(shadowDOM) {
        const shadow = shadowDOM

        const dateFormatterParams = {
            inputFormat: "YYYY-MM-DD",
            outputFormat: "DD/MM/YYYY",
            invalidPlaceholder:"(invalid date)"
        }

        const options = {
            data: await this.getData(),
            clipboardCopySelector: "table",
            clipboard: true,
            clipboardCopyStyled: false,
            pagination:"local",
            paginationSize: 22,
            paginationSizeSelector: [2, 4, 6, 8, 10],
            movableColumns: false,
            paginationCounter:"rows",
            layout: "fitColumns",
            rowHeight: 100,
            columns: [
                {title: "Name", field: "name", editor: "input"},
                {title: "City", field: "city", editor: "input"},
                {title: "Country", field: "country", editor: "input"},
                {title: "Age", field: "age", formatter: this.validateAge},
                {title: "Color", field: "color"},
                {title: "Created At", field: "created-at", formatter: "datetime", formatterParams: dateFormatterParams},
                {title: "Legal", field: "legal-age", visible: true}
            ],
            rowDblClick: this.rowDblClick
        }
        
        this.table = new Tabulator(this.shadow.querySelector('#tabulator-table02'), options)
    }

    validateAge(cell, formatterParams, onRendered) {
        let value = cell.getValue()
        if(value >= 18) {
            return `<span style="color: #348c19;">${value}</span>`
        } else {
            return `<span style="color: #f21d1d;">${value}</span>`
        }
    }

    rowDblClick(e, row) {
        const sendRowData = new CustomEvent('sendRowData', {detail: {solicitante: this, data: row.getData() }});
        window.dispatchEvent(sendRowData)
    }

    // downloadTable(data) {
    //     const tableData = data
    //     tableData.download("xlsx", "data.xlsx", {sheetName:"PedBeer-Dados"}) //download a Xlsx file that has a sheet name of "MyData"
    // }
}

window.customElements.define('tabulator-table02', TabulatorTable02);