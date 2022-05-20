// import ApiConnector from './apiconector'

class FactoryTags {
    constructor()

    static getAllTags() {
        const listaTag = [
            {}
        ]

        return listaTag
    }

    static getComponentsMenu() {

    }

    static getTagComponent(component) {

    }

    static getOpenEventComponent(component) {
        
    }
    
    static showContentTag(component) {

    }

    static buildInitialStructure() {
        let initial = [

        ]

    }

    static buildLoginStructure() {
    
    }

    static buildWorkspaceStructure() {
        
    }

    static _createTagOnDOM(nameTag) {
        let newComp = document.createElement(nameTag)
        let body = document.querySelector('body')
        body.appendChild(newComp)
        return 'created'
    }
}

export default FactoryTags
