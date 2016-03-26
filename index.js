'use strict';

//
// DragHandle makes an element into the drag handle for a block of content.
//
// How to use:
// DragHandle needs one parent element that contains one .dragHandle
// element and one .dragContent element. Like this:
//
// <div class="whatever">
//   <div class="dragHandle someOtherStyle"></div>
//   <div class="dragContent whateverElse">
//     ...
//   </div>
// </div>
//
// *AND* a limits string. Which is 'up', 'down', 'left' or 'right'
// This defines which way the content should move. All content will move
// by just it's width or height when mouse dragging or touch dragging the
// handle.
var DragHandle = function(parentElement, direction) {
	if (typeof(parentElement.tagName) != 'string') {
		throw "mite-drag-handle needs parentElement to be an element, it got: " + parentElement;
	}
	this.mover = parentElement;
	this.dragHandle = parentElement.querySelector(".dragHandle");
	this.dragContent = parentElement.querySelector(".dragContent");
	this.moverPos = {x: 0, y: 0};
	this.moverPos.x = this.mover.offsetLeft;
	this.moverPos.y = this.mover.offsetTop;

	if (typeof(direction) === 'string') {
		this.limits = {
			minX: this.moverPos.x, maxX: this.moverPos.x, minY: this.moverPos.y, maxY: this.moverPos.y
		}
		switch (direction) {
			case 'down': this.limits.maxY = this.moverPos.y + this.dragContent.offsetHeight; break;
			case 'up': this.limits.minY = this.moverPos.y - this.dragContent.offsetHeight; break;
			case 'left': this.limits.minX = this.moverPos.x - this.dragContent.offsetWidth; break;
			case 'right': this.limits.maxX = this.moverPos.x + this.dragContent.offsetWidth; break;
		}
	}
	else {
		throw "mite-drag-handle needs a drag direction argument in the form of a string. It got: " + direction;
	}

	this.isDragging = false;

	var self = this;
	this.dragStartPos = {x: 0, y: 0};
	this.moverPos = {x: 0, y: 0};

	//when do we want to stop dragging? Not just when the mouse leaves the window
	//because that becomes annoying. Only when you move the mouse out of the window
	//and then releases the button.
	document.body.addEventListener('mouseenter', function(event) {
		if (self.isDragging &&
			event.target === document.body &&
			event.buttons !== 1) {

				self.stopDrag(event);
		}

	});
	this.dragHandle.addEventListener('mousedown', function(event) {self.startDrag(event)});
	document.addEventListener('mouseup', function(event) {self.stopDrag(event)});
	document.body.addEventListener('mousemove', function(event) {self.drag(event)});
}

DragHandle.prototype.startDrag = function(event) {
	this.dragStartPos.x = event.clientX;
	this.dragStartPos.y = event.clientY;
	this.moverPos.x = this.mover.offsetLeft;
	this.moverPos.y = this.mover.offsetTop;
	this.isDragging = true;
};

DragHandle.prototype.stopDrag = function(event) {
	this.isDragging = false;
};

DragHandle.prototype.drag = function(event) {
	if (this.isDragging) {
		var mouseOffsetX = event.clientX - this.dragStartPos.x;
		var mouseOffsetY = event.clientY - this.dragStartPos.y;

		var newPosX = (this.moverPos.x + mouseOffsetX);
		var newPosY = (this.moverPos.y + mouseOffsetY);

		if (this.limits) {
			newPosX = Math.max(this.limits.minX, newPosX);
			newPosX = Math.min(this.limits.maxX, newPosX);

			newPosY = Math.max(this.limits.minY, newPosY);
			newPosY = Math.min(this.limits.maxY, newPosY);
		}

		this.mover.style.left = newPosX + 'px';
		this.mover.style.top = newPosY + 'px';
	}
};

module.exports = DragHandle;
