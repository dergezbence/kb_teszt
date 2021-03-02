class DraggingManager {
    constructor() {
        this.draggingObject = null;
    }

    onMouseDown = (e, draggingObject) => {
        this.draggingObject = draggingObject;
        this.prevMouseEvent = e;
    }

    onMouseUp = e => {
        this.draggingObject = null;
    }

    onMouseMove = e => {
        if(!this.draggingObject) return;
        const displayDeltaX = e.x - this.prevMouseEvent.x;
        const displayDeltaY = e.y - this.prevMouseEvent.y;
        this.draggingObject._onDrag(displayDeltaX, displayDeltaY);
        this.prevMouseEvent = e;
    }

}
var draggingManager = new DraggingManager();
export default draggingManager;