import * as core from './src/core';
import FloatingLayer from './src/floatingLayer';
import View from './src/view';
tui.util.defineNamespace('tui.component', {FloatingLayer});
tui.component.FloatingLayer.core = core;
tui.component.FloatingLayer.View = View;

