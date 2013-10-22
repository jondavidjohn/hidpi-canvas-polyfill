# HiDPI Canvas Polyfill

**(pre-release)**

This is a drop-in polyfill to scale canvas appropriately to maintain sharpness
in browsers that currently do not provide the appropriately scaled backing
store to do this automatically.

As of this writing Safari is the only browser that accounts for this.

The goal of this drop-in is to make this behavior consistent accross all browsers,
without having to modify any of your canvas code.

## Usage

To use this module, simply include it before any of your canvas code

```html
  ...
  <script src=".../hidpi-canvas.min.js"></script>
  <script src=".../your-canvas-stuff.js"></script>
  ...
```

## TODO

  - More Complete context function converage
  - Figure out how to test this
  - Decide how to handle image drawing? (likely, don't handle it at all)
