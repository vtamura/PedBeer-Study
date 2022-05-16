class SideNav extends HTMLElement {
    constructor() {
        super()
        this.shadow = this.attachShadow({mode: 'open'})
    }

    connectedCallback() {
        this.render()
        this.listenerEventsfromEscope()
    }

    createCustomEvents() {
        // Custom Events are created here
        //this.newEvent = new CustomEvent('newEvent', {detail: {attr01:"value01", attr02:"value02"}});
    }

    listenerEventsfromWindow() {
        // Listening events created outside this component (window)
    }

    listenerEventsfromEscope() {
        const sidenav = this.shadow.querySelector('.sidenav');
        M.Sidenav.init(sidenav);
        
        //Listening events created inside this component (eg.: Materialize instances, default event listeners)
    }

    render() {
        this.shadow.innerHTML = `
        <style>
            @import "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css";
        </style>
        
        <ul id="slide-out" class="sidenav">
            <li>
                <div class="user-view">
                <div class="background">
                    <img src="images/office.jpg">
                </div>
                    <a href="#user"><img class="circle" src="images/yuna.jpg"></a>
                    <a href="#name"><span class="white-text name">John Doe</span></a>
                    <a href="#email"><span class="white-text email">jdandturk@gmail.com</span></a>
                </div>
            </li>
                <li><a href="#!"><i class="material-icons">cloud</i>First Link With Icon</a></li>
                <li><a href="#!">Second Link</a></li>
                <li><div class="divider"></div></li>
                <li><a class="subheader">Subheader</a></li>
                <li><a class="waves-effect" href="#!">Third Link With Waves</a></li>
        </ul>
        <a href="#" data-target="slide-out" class="sidenav-trigger"><i class="material-icons">menu</i></a>

        `
    }

}

customElements.define('side-nav', SideNav)

