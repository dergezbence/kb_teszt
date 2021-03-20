
class SelectionRectangle {
    constructor(actualX, actualY, actualWidth, actualHeight, draggingManager) {
        this.actualX = actualX;
        this.actualY = actualY;
        this.actualWidth = actualWidth;
        this.actualHeight = actualHeight;
        this.draggingManager = draggingManager;
        this.htmlNode = this._createHtmlNode();
        this.onDrag = null;
    }

    getHtmlNode = () => this.htmlNode;

    updateDisplayRatio = (ratio) =>{
        const displayX = this.actualX * ratio;
        const displayY = this.actualY * ratio;
        const displayWidth = this.actualWidth * ratio;
        const displayHeight = this.actualHeight * ratio;
        this.htmlNode.setAttributeNS(null, 'x', displayX);
        this.htmlNode.setAttributeNS(null, 'y',  displayY);
        this.htmlNode.setAttributeNS(null, 'width', displayWidth);
        this.htmlNode.setAttributeNS(null, 'height', displayHeight);
    }

    moveByDisplayDelta = (displayDeltaX, displayDeltaY, ratio) => {
        const actualDeltaX = displayDeltaX / ratio;
        const actualDeltaY = displayDeltaY / ratio;
        this.actualX += actualDeltaX;
        this.actualY += actualDeltaY;
        const displayX = this.actualX * ratio;
        const displayY = this.actualY * ratio;
        this.htmlNode.setAttributeNS(null, 'x', displayX);
        this.htmlNode.setAttributeNS(null, 'y',  displayY);
    }

    resizeByDisplayDelta = (displayDeltaWidth, displayDeltaHeight, ratio) => {
        const actualDeltaWidth = displayDeltaWidth / ratio;
        const actualDeltaHeight = displayDeltaHeight / ratio;
        this.actualWidth += actualDeltaWidth;
        this.actualHeight += actualDeltaHeight;
        const displayWidth = this.actualWidth * ratio;
        const displayHeight = this.actualHeight * ratio;
        this.htmlNode.setAttributeNS(null, 'width', displayWidth);
        this.htmlNode.setAttributeNS(null, 'height',  displayHeight);
    }

    _createHtmlNode = () => {
        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute('style', "fill:blue;stroke:pink;stroke-width:1;fill-opacity:0.5;stroke-opacity:1");
        rect.onmousedown = e => this.draggingManager.onMouseDown(e, this);
        return rect;
    }
}

export default SelectionRectangle;