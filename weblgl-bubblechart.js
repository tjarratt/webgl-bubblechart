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

      var sizes = _.pluck(data, 'size');
      var xValues = _.pluck(data, 'x');
      var yValues = _.pluck(data, 'y');
      var zValues = _.pluck(data, 'z');

      var minSize = Math.min.apply({}, sizes) * 1.0;
      var maxSize = Math.max.apply({}, sizes) * 1.0;

      var minX = Math.min.apply({}, xValues);
      var maxX = Math.abs(Math.max.apply({}, xValues));

      var minY = Math.min.apply({}, yValues);
      var maxY = Math.abs(Math.max.apply({}, yValues) * 1.0);

      var minZ = Math.min.apply({}, zValues);
      var maxZ = Math.abs(Math.max.apply({}, zValues) * 1.0);

      var maxRadius = 10.0;
      var minRadius = 5;
      var numSegments = 50;
      data.forEach(function(d) {
        var radius = (d.size - minSize) * maxRadius / maxSize + minRadius;
        var scaledX = (d.x - minX) * 210.0 / maxX;
        var scaledY = (d.y - minY) * 210.0 / maxY;
        var scaledZ = (d.z - minZ) * -255.0 / maxZ;

        var bubble = new THREE.Mesh(new THREE.SphereGeometry(radius, numSegments, numSegments), new THREE.MeshNormalMaterial());
        bubble.overdraw = true;
        bubble.position.set(scaledX, scaledY, scaledZ);

        scene.add(bubble);
        objects.push(bubble);
      });
    };

    var radius = 0.00001;
    var initial = {radius: 0};
    var target = {radius: 1};
    var tween = new TWEEN.Tween(initial).to(target, 3200).easing(
      TWEEN.Easing.Elastic.Out
    ).delay(2000
    ).onUpdate(function() {
      radius = this.radius;
    }).start();

    function animate() {
      objects.forEach(function(o) {
        o.scale.set(radius, radius, radius);
      });

      renderer.render(scene, camera);

      if (radius == target.radius) {
        return;
      }

      requestAnimationFrame(function() { animate(); });
      TWEEN.update();
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
};
