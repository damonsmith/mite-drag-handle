Mite Drag Handle
================

A ~100 line of code class for setting up a handle to drag some content on or off
screen. With no dependencies. Cross browser, mobile, mouse and touchscreen support.

It needs you to have a parent element with a .dragHandle element and a .dragContent
element in it. Like this:

```HTML
<div class="whatever">
   <div class="dragHandle someOtherStyle"></div>
   <div class="dragContent whateverElse">
     ...
   </div>
 </div>
 ```

 How to use
 ==========

And you would then set it up in code like this:
var dragParent = document.querySelector("whatever");
var dragHandle = new DragHandle(dragParent, "left");

Your content would then be draggable to the left by the width of the content.

So if the content starts off-screen on the left, you could set it to "right" and
you could then drag it on-screen.

Installation
============

via NPM:
`npm install --save 'mite-drag-handle'`

or simply drop the index.js file into your project somewhere, rename it
to DragHandle.js and include it locally.

About
=====

This class is a part of Damon Smith's "Mite" library of simple javascript utils.

The aim of Mite is to provide small, dependency-free classes that are small enough
for developers to not only use but also to read, understand and customise.

All of these tools will do one job only and new releases will be fully backwards
compatible, only to fix bugs or browser compatibility issues.
