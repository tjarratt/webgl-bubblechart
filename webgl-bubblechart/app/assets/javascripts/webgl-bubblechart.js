window.onload = function() {
  var BubbleChart = (function() {
    var camera;
    var scene = new THREE.Scene();
    var renderer = new THREE.WebGLRenderer();

    var objects = [];

    var bChart = function(containerId, data) {
      this.data = data;
      this.container = document.getElementById(containerId);

      var width = container.offsetWidth || 500;
      var height = container.offsetHeight || 500;

      camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000, new THREE.MeshNormalMaterial());
      camera.position.x = 105;
      camera.position.y = 105;
      camera.position.z = 255;

      renderer.setSize(width, height);
      renderer.domElement.style.border = "1px solid black";
      this.container.appendChild(renderer.domElement);

      var scale = 2.1;
      var numSegments = 50;
      data.forEach(function(d) {
        var radius = d.size;
        var bubble = new THREE.Mesh(new THREE.SphereGeometry(radius, numSegments, numSegments), new THREE.MeshNormalMaterial());
        bubble.overdraw = true;
        bubble.position.set(d.x * scale, d.y * scale, d.z);
        bubble.finalRadius = radius;
        scene.add(bubble);
        objects.push(bubble);
      });
    };

    var lastTime;
    var timeToAnimate = 1000;
    var scaleFactor = Math.PI / 2.0 / timeToAnimate;
    function animate() {
      lastTime = lastTime || (new Date().getTime());
      var time = new Date().getTime();
      var timeDiff = time - lastTime;

      if (timeDiff > timeToAnimate) {
        objects.forEach(function(o) {
          o.scale.set(1, 1, 1);
        });

        return renderer.render(scene, camera);
      }

      var factor = Math.abs(Math.sin(timeDiff * scaleFactor));
      objects.forEach(function(o) {
        o.scale.set(factor, factor, factor);
      });

      renderer.render(scene, camera);
      requestAnimationFrame(function() { animate(); });
    };

    bChart.prototype.render = function(options) {
      options = options || {};
      if (options.animate) {
        requestAnimationFrame(function() { animate(); } );
      }
      else {
        renderer.render(scene, camera);
      }
    };

    return bChart;
  })();

  var data = [];
  for (var i = 0; i < 55; ++i) {
    // todo: it shouldn't matter what the units are here
    // it doesn't make sense to hard code values in between
    data.push({
      size: 5 + Math.random() * 15,
      x: Math.random() * 100,
      y: Math.random() * 100,
      z: Math.random() * - 255
    });
  }
  var chart = new BubbleChart('container', data);
  chart.render({animate: true});
};
