WebGL BubbleCharts
==================

An experiment in using webGL to create bubblecharts that are powerful, easy to use,
and beautiful. Bubblecharts[http://en.wikipedia.org/wiki/Bubble_chart] are a common
tool used to visualize data that is modeled as a 3-tuple of three values.

Two values are commonly plotted on the x-y cartesian plane, and the third value is
expressed as the size of the bubble on the plane. This can help explain relationships
in the data in a beautiful and simple manner.

This library provides a simple interface for drawing 3D bubblecharts with three
cartesian values, providing four axes of information.

Usage
-----
Usage is very simple, and can be accomplished with two simple calls. First,
create a chart object, then call `chart.render()`.

    var data = [{size: 50, x: 0, y:0, z:0}, {size:5, x: 555, y:123, z:-55}]
    var chart = new BubbleChart('containerID', data);
    chart.render();

Animations
----------
You can optionally animate in your bubbles by passing in an options object
to the `.animate()` call

    chart.render({animate: true});

Requirements
------------

* THREE.js[http://threejs.org/] : provides a simple interface to WebGL
* TWEEN.js[https://github.com/sole/tween.js/] provides: interpolations for beautiful animations
* Underscore.js[http://underscorejs.org/]
