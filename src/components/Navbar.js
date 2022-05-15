/*

Importing Tabulator, AmCharts and Materialize

import * as am5 from "@amcharts/amcharts5"
import * as am5xy from "@amcharts/amcharts5/xy"

import {Tabulator} from 'tabulator-tables'

import 'materialize-css/dist/css/materialize.css'

*/

class Navbar extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {
        const shadow = this.attachShadow({mode: 'open'})
        shadow.innerHTML = `
            <nav class="white">
                <div class="nav-wrapper">
                    <a href="#" class="brand-logo black-text">Ped<span class="orange-text">/Beer</span></a>
                    <ul id="nav-mobile" class="right hide-on-med-and-down">
                        <li><a href="#">Sass</a></li>
                        <li><a href="#">Components</a></li>
                        <li><a href="#">JavaScript</a></li>
                    </ul>
                </div>
            </nav>
            
        `
        shadow.appendChild(this.style())
    }

    style() {
        const style = document.createElement('style')

        style.textContent = `
            @import "../../node_modules/materialize-css/dist/css/materialize.min.css";

            nav {
                padding: 0 170px;
            }

            nav ul a {
                color: black;
            }
        `

        return style
    }
}

customElements.define('nav-bar', Navbar)