import Selection from './selection'

class ImageContainer {

    constructor(url, draggingManager){
        this.url = url;
        this.selections = [];
        this.draggingManager = draggingManager;
        this.container = document.createElement('div');
        this.container.style='position: relative';
        const app = document.getElementById("app");
        app.appendChild(this.container);
       // this.container.onmousemove = () => console.log("mousemoe")
        this.img = null;
        this.svgCanvas = null;
    }

    render = () => {
        this._renderImage();
        this._renderSvgCanvas();
        this.renderSelections(); //will be removed as by default the selections arent visible
    }

    renderSelections = () => {
        this.selections.forEach(this._renderSingleSelection);
    }

    clearSelections = () => {
        this.svgCanvas.innerHTML = '';
    }

    _addSelection = (displayX, displayY) => {
        const actualX = displayX / this.ratio;
        const actualY = displayY / this.ratio;
        const actualWidth = 400.0;
        const actualHeight = 400.0;
        const selection = new Selection(actualX, actualY, actualWidth, actualHeight, this.draggingManager);
        this.selections.push(selection);
        this._renderSingleSelection(selection);
    }

    _resizeSelectionsByRatio = (ratio) => {
        console.log(this.selections)
        this.selections.forEach(selection => selection.updateDisplayRatio(ratio));
    }

    _renderSingleSelection = (selection) => {
        selection.updateDisplayRatio(this.ratio);
        this.svgCanvas.appendChild(selection.getHtmlNode());
    } 

    _onWindowResize = e => {
        this.ratio = this.img.width / this.width;
        this._resizeSelectionsByRatio(this.ratio);
    }

    _onImageLoad = () => {
        this.width = this.img.naturalWidth;
        this.height = this.img.naturalHeight;
        this.ratio = this.img.width / this.width; 
    }

    _renderImage = () => {
        const img = document.createElement('img');
        img.onload = this._onImageLoad;                 
        img.src = this.url
        this.container.appendChild(img);

        this.img = img;
        window.onresize = this._onWindowResize
    }

    _renderSvgCanvas = () => {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute('style', 'border: 1px solid black');
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');

        svg.onmousemove = this.draggingManager.onMouseMove;
        svg.onmouseup = this.draggingManager.onMouseUp;
        svg.onmouseleave = this.draggingManager.onMouseUp;

        svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
        svg.oncontextmenu = (e) => {
            this._addSelection(e.layerX, e.layerY)
        }
        this.svgCanvas = svg;
        this.container.appendChild(svg);
    }
}

export default ImageContainer;