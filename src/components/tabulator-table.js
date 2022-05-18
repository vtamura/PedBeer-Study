class TabulatorTable extends HTMLElement {
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
        // this.sendTableToContainer = new CustomEvent('sendTableToContainer', {detail: {solicitante: this}});
    }

    listenerEventsfromWindow(){
        // window.addEventListener('downloadTable', () => {
        //     console.log('Copiado!')
        //     this.table.copyToClipboard("table", true);
        // })

        window.addEventListener('getTable', e => {
            if(e.detail.table === 'tabulator-table'){
                this.shadow.querySelector('#tabulator-table').style.display = 'block'
                this.table.redraw()
            } else {
                this.shadow.querySelector('#tabulator-table').style.display = 'none'

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
                    display: block;
                }

                .tabulator-header {
                    color: #D9D5E3 !important;
                    border: none !important;
                }

                .tabulator-col {
                    padding: 10px 0;
                }

                .tabulator-col {
                    background: #36304A !important;
                    border: none !important;

                }

                // .tabulator-row-even {
                //     background-color: #fff1e3 !important;
                // }

                .tabulator-footer {
                    background: #36304A !important;
                    border-top: none;
                }

            </style>
            <div id="tabulator-table"></div>
        `
        this.createAllinstances()
        this.listenerEventsfromEscope()
        this.createTable(this.shadow)
    }
    
    async getData() {
        const res = await fetch('../data.json')
        const data = await res.json()
    
        return data
    }

    async createTable() {
        const dateFormatterParams = {
            inputFormat: "YYYY-MM-DD",
            outputFormat: "DD/MM/YYYY",
            invalidPlaceholder:"(invalid date)"
        }

        const options = {
            data: await this.getData(),
            layout: "fitColumns",

            resizableRows: false,
            resizableColumn: false,

            clipboardCopySelector: "table",
            clipboard: true,
            clipboardCopyStyled: false,

            pagination:"local",
            paginationSize: 22,
            paginationSizeSelector: [2, 4, 6, 8, 10],
            paginationCounter:"rows",

            movableColumns: false,
            rowHeight: 100,
            columns: [
                {title: "Name", field: "name", resizable: false},
                {title: "City", field: "city", resizable: false},
                {title: "Country", field: "country", resizable: false},
                {title: "Age", field: "age", editor: "input", formatter: this.validateAge, resizable: false},
                {title: "Color", field: "color", resizable: false, editor: "input"},
                {title: "Created At", field: "created-at", editor: "input", resizable: false, formatter: "datetime", formatterParams: dateFormatterParams},
                {title: "Legal", field: "legal-age", visible: false, clipboard: true}
            ],
            rowDblClick: this.rowDblClick
        }
        
        this.table = new Tabulator(this.shadow.querySelector('#tabulator-table'), options)
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
        const sendRowData = new CustomEvent('sendRowData', {detail: {solicitante: this, data: row.getTable() }});
        window.dispatchEvent(sendRowData)

        // var elems = document.querySelectorAll('.modal'); Criar instancia modal
        // var instances = M.Modal.init(elems, options);
    }

    // downloadTable(data) {
    //     const tableData = data
    //     tableData.download("xlsx", "data.xlsx", {sheetName:"PedBeer-Dados"}) //download a Xlsx file that has a sheet name of "MyData"
    // }
}

window.customElements.define('tabulator-table', TabulatorTable);