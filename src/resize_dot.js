
class ResizeDot {
    constructor(actualX, actualY, actualRadius, draggingManager) {
        this.actualX = actualX;
        this.actualY = actualY;
        this.actualRadius = actualRadius;
        this.draggingManager = draggingManager;
        this.htmlNode = this._createHtmlNode();
    }

    getHtmlNode = () => this.htmlNode;

    updateDisplayRatio = (ratio) => {
        const displayX = this.actualX * ratio;
        const displayY = this.actualY * ratio;
        const displayRadius = this.actualRadius * ratio;
        this.htmlNode.setAttributeNS(null, 'cx', displayX);
        this.htmlNode.setAttributeNS(null, 'cy',  displayY);
        this.htmlNode.setAttributeNS(null,'r', displayRadius);
    }

    moveByDisplayDelta = (displayDeltaX, displayDeltaY, ratio) => {
        const actualDeltaX = displayDeltaX / ratio;
        const actualDeltaY = displayDeltaY / ratio;
        this.actualX += actualDeltaX;
        this.actualY += actualDeltaY;
        const displayX = this.actualX * ratio;
        const displayY = this.actualY * ratio;
        this.htmlNode.setAttributeNS(null, 'cx', displayX);
        this.htmlNode.setAttributeNS(null, 'cy',  displayY);
    }

    _createHtmlNode = () => {
        const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        dot.setAttribute('style', "fill:blue;");
        dot.onmousedown = e => this.draggingManager.onMouseDown(e, this);
        return dot;
    }
}

export default ResizeDot;