import SelectionRectangle from './selection_rectangle'
import ResizeDot from './resize_dot'

class Selection {

    constructor(actualX, actualY, actualWidth, actualHeight) {
        this.actualX = actualX;
        this.actualY = actualY;
        this.actualWidth = actualWidth;
        this.actualHeight = actualHeight;
        this.selectionDotSize = 15;
        this.smallestSelectionWidth = 50;
        this.smallestSelectionHeight = 50;
        this.htmlNode = this._createHtmlNode();
        this.ratio = 1;
    }

    getHtmlNode = () => this.htmlNode;

    updateDisplayRatio = (ratio) => {
        this.ratio = ratio;
        this.getChildDelements().forEach(childElement => childElement.updateDisplayRatio(ratio));
    }

    moveSelectionByDisplayDelta = (displayDeltaX, displayDeltaY) => {
        this.getChildDelements().forEach(childElement => 
            childElement.moveByDisplayDelta(displayDeltaX, displayDeltaY, this.ratio));
    }

    getResizeDots = () => {
        return [this.topLeft, this.topRight, this.bottomRight, this.bottomLeft];
    }

    getChildDelements = () => {
        return [this.selectionRectangle, ...this.getResizeDots()];
    }

    _createHtmlNode = () => {
        const selectionGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
        this.selectionRectangle = new SelectionRectangle(this.actualX, this.actualY, this.actualWidth, this.actualHeight);
        this._createResizeDots();
        this.getChildDelements().forEach(childElement => selectionGroup.appendChild(childElement.getHtmlNode()));
        this._setDragCallbacks();
        return selectionGroup;
    }

    _createResizeDots = () => {
        this.topLeft = new ResizeDot(this.actualX, this.actualY, this.selectionDotSize);
        this.topRight = new ResizeDot(this.actualX + this.actualWidth, this.actualY, this.selectionDotSize);
        this.bottomRight = new ResizeDot(this.actualX + this.actualWidth, this.actualY + this.actualHeight, this.selectionDotSize);
        this.bottomLeft = new ResizeDot(this.actualX, this.actualY + this.actualHeight, this.selectionDotSize);
    }

    _setDragCallbacks = () => {
        this.selectionRectangle._onDrag = this.moveSelectionByDisplayDelta;
        this.bottomRight._onDrag = this._onBottomRightResizeDotMove;
        this.topLeft._onDrag = this._onTopLeftResizeDotMove;
        this.topRight._onDrag = this._onTopRightResizeDotMove;
        this.bottomLeft._onDrag = this._onBottomLeftResizeDotMove;
    }

    _onBottomRightResizeDotMove = (displayDeltaX, displayDeltaY) => {
        if( displayDeltaX > 0 || this.selectionRectangle.actualWidth - this.smallestSelectionWidth > displayDeltaX / this.ratio){
            this.bottomRight.moveByDisplayDelta(displayDeltaX, 0, this.ratio);
            this.topRight.moveByDisplayDelta(displayDeltaX, 0, this.ratio);
            this.selectionRectangle.resizeByDisplayDelta(displayDeltaX, 0, this.ratio);
        }
            
        if( displayDeltaY > 0 || this.selectionRectangle.actualHeight - this.smallestSelectionHeight > displayDeltaY / this.ratio){
            this.bottomRight.moveByDisplayDelta(0, displayDeltaY, this.ratio);
            this.bottomLeft.moveByDisplayDelta(0, displayDeltaY, this.ratio);
            this.selectionRectangle.resizeByDisplayDelta(0, displayDeltaY, this.ratio);
        }     
    }

    _onTopLeftResizeDotMove = (displayDeltaX, displayDeltaY) => {
        if( displayDeltaX < 0 || this.selectionRectangle.actualWidth - this.smallestSelectionWidth > displayDeltaX / this.ratio){
            this.topLeft.moveByDisplayDelta(displayDeltaX, 0, this.ratio);
            this.bottomLeft.moveByDisplayDelta(displayDeltaX, 0, this.ratio);
            this.selectionRectangle.moveByDisplayDelta(displayDeltaX, 0, this.ratio);
            this.selectionRectangle.resizeByDisplayDelta(-displayDeltaX, 0, this.ratio);
        }

        if( displayDeltaY < 0 || this.selectionRectangle.actualHeight - this.smallestSelectionHeight > displayDeltaY / this.ratio){
            this.topLeft.moveByDisplayDelta(0, displayDeltaY, this.ratio);
            this.topRight.moveByDisplayDelta(0, displayDeltaY, this.ratio);
            this.selectionRectangle.moveByDisplayDelta(0, displayDeltaY, this.ratio);
            this.selectionRectangle.resizeByDisplayDelta(0, -displayDeltaY, this.ratio);
        }
    }

    _onTopRightResizeDotMove = (displayDeltaX, displayDeltaY) => {
        if( displayDeltaX > 0 || this.selectionRectangle.actualWidth - this.smallestSelectionWidth > displayDeltaX / this.ratio){
            this.topRight.moveByDisplayDelta(displayDeltaX, 0, this.ratio);
            this.bottomRight.moveByDisplayDelta(displayDeltaX, 0, this.ratio);
            this.selectionRectangle.resizeByDisplayDelta(displayDeltaX, 0, this.ratio);
        }

        if( displayDeltaY < 0 || this.selectionRectangle.actualHeight - this.smallestSelectionHeight > displayDeltaY / this.ratio){
            this.topRight.moveByDisplayDelta(0, displayDeltaY, this.ratio);
            this.topLeft.moveByDisplayDelta(0, displayDeltaY, this.ratio);
            this.selectionRectangle.moveByDisplayDelta(0, displayDeltaY, this.ratio);
            this.selectionRectangle.resizeByDisplayDelta(0, -displayDeltaY, this.ratio);
        }
    }

    _onBottomLeftResizeDotMove = (displayDeltaX, displayDeltaY) => {
        if( displayDeltaX < 0 || this.selectionRectangle.actualWidth - this.smallestSelectionWidth > displayDeltaX / this.ratio){
            this.bottomLeft.moveByDisplayDelta(displayDeltaX, 0, this.ratio);
            this.topLeft.moveByDisplayDelta(displayDeltaX, 0, this.ratio);
            this.selectionRectangle.moveByDisplayDelta(displayDeltaX, 0, this.ratio);
            this.selectionRectangle.resizeByDisplayDelta(-displayDeltaX, 0, this.ratio);
        }

        if( displayDeltaY > 0 || this.selectionRectangle.actualHeight - this.smallestSelectionHeight > displayDeltaY / this.ratio){
            this.bottomLeft.moveByDisplayDelta(0, displayDeltaY, this.ratio);
            this.bottomRight.moveByDisplayDelta(0, displayDeltaY, this.ratio);
            this.selectionRectangle.resizeByDisplayDelta(0, displayDeltaY, this.ratio);
        }
    }
}

export default Selection;