The **floating layer** is a transparent layer to float the element having `absolute` property on the page, such as a modal window, the context menu.

The FloatingLayer component can be used with other components.  
You can also set the option to customize the modal window background color, size.

Now you can float several components using the FloatingLayer component!

### How to create a modal window as a floating layer

**[Step 1]** The following two script files to include in the html page.
```js
....
<script type="text/javascript" src="tui-code-snippet.js"></script>
<script type="text/javascript" src="tui-floating-layer.js"></script>
....
```

**[Step 2]** Creates the floating layer.
 ```html
<!-- the floating layer tag -->
<div id="tui-floting-layer-container"></div>
```
```js
// If you create a transparent background is a modal window
var layer = new tui.FloatingLayer(document.getElementById('tui-floting-layer-container'));
```
```js
// If you create a modal window has dimm
var layer = new tui.FloatingLayer(document.getElementById('tui-floting-layer-container'), {
  modaless: true
});
```

**[Step 3]** Create a modal content and pop up the floating layer.
```js
var modalContent = '<div id="modal">modal layer<button>close</button></div>';

layer.setContent(modalContent);
layer.setBound({top: 50, left: 50, width: 200, height: 150});
```

**[Step 4]** Depending on the action by calling the following API changes the status of the floating layer.
```js
layer.show();
layer.hide();
```

### How to remove the floating layer
```js
layer.destroy();
```
