class TabulatorTable extends HTMLElement {
    constructor(data){
        super()
        this.data = data
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
    }

    listenerEventsfromWindow(){
        window.addEventListener('downloadTable', () => {
            console.log('Copiado!')
            this.table.copyToClipboard("table", true);
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
                }

                .tabulator-header {
                    color: black !important;
                    border: none !important;
                }

                .tabulator-col {
                    padding: 10px 0;
                }

                .tabulator-col {
                    background: #ffbb7a !important;
                    border-right: 1px solid #ff8817 !important;
                    border-bottom: 1px solid #ff8817 !important;

                }

                .tabulator-row-even {
                    background-color: #fff1e3 !important;
                }

                .tabulator-footer {
                    background: #ffbb7a !important;
                    border-top: 1px solid #ff8817 !important;
                }

            </style>
            <div id="tabulator-table"></div>
        `
        this.createAllinstances()
        this.listenerEventsfromEscope()
        this.createTable()
    }
    
    async getData() {
        const res = await fetch('../data.json')
        const data = await res.json()
    
        return data
    }

    async createTable() {
        const options = {
            data: await this.getData(),
            clipboardCopySelector:"table",
            clipboard:true,
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
                {title: "Created At", field: "created-at", formatter: "datetime", formatterParams:{
                    inputFormat: "YYYY-MM-DD",
                    outputFormat: "DD/MM/YYYY",
                    invalidPlaceholder:"(invalid date)"
                }}
            ],
            rowDblClick: function(e, row) {
                console.log(row.getData())
            }
    }

        const table = new Tabulator(this.shadow.querySelector('#tabulator-table'), options)
    }

    validateAge(cell, formatterParams, onRendered) {
        let value = cell.getValue()
        if(value >= 18) {
            return `<span style="color: #348c19;">${value}</span>`
        } else {
            return `<span style="color: #f21d1d;">${value}</span>`
        }
    }
    // downloadTable(data) {
    //     const tableData = data
    //     tableData.download("xlsx", "data.xlsx", {sheetName:"PedBeer-Dados"}) //download a Xlsx file that has a sheet name of "MyData"
    // }
}

window.customElements.define('tabulator-table', TabulatorTable);