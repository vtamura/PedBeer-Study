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
        window.addEventListener('sendTableData', e => {
            // let string = ''
            // console.log(rowData)
            // for (let [key, value] of Object.entries(rowData)) {
                //     string += `${key}: ${value}, `
                // }
                
                // const finalString = string.replace(/,[\s]$/, ".")

            this.tableData = e.detail.data
            this.createChart(this.tableData)
            this.modalInstance.open()
        })

    }

    createAllinstances(){
        const modal = document.querySelector('row-modal').shadowRoot.querySelector('.modal')
        this.modalInstance = M.Modal.init(modal)
        
    }

    listenerEventsfromEscope(){
        //let context = this
        // let idcomponente = this.shadow.querySelector('#idcomponente')
        // idcomponente.addEventListener('click',function(){window.dispatchEvent(context.nomeDoEventoCustomizado);})

    }
    render(){
        this.shadow.innerHTML = `
            <style>
                @import "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css";
            </style>
            <div id="modal1" class="modal">
                <div class="modal-content">
                    <h4>Gráfico Idades</h4>
                    <div id="chartdiv"></div>

                </div>
                <div class="modal-footer">
                    <a href="#!" class="modal-close waves-effect waves-green btn-flat">Fechar</a>
                </div>
            </div>
        
        `

        this.createAllinstances()
        this.listenerEventsfromEscope()
        
        console.log(this.tableData)
    }

    createChart(data) {
        // Chart instance
        const chart = am4core.create(this.shadow.querySelector('#chartdiv'), am4charts.XYChart)

        // Data
        const ageData = data.map(e => {
            return {age: e.age}
        })

        const totalAges = Object.values(ageData.reduce((r, {age}) => {
            r[age] ??= {age, total: 0}
            r[age].total++
            
            return r
        }, {}))

        chart.data = totalAges

        // Chart Axes
        const xAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        xAxis.dataFields.category = "age";

        const yAxis = chart.yAxes.push(new am4charts.ValueAxis());
        
        // Chart series instance
        const series = chart.series.push(new am4charts.ColumnSeries())

        // Series settings
        series.dataFields.valueY = "total"
        series.dataFields.categoryX = "age"
        series.name = "Idade"
        series.columns.template.tooltipText = "Coluna: {name}\nIdade: {categoryX}\nTotal: {valueY}"
    }
    
}

window.customElements.define('row-modal', rowModal);