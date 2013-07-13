window.onload = function() {
  var BubbleChart = (function() {
    var camera;
    var scene = new THREE.Scene();
    var renderer = new THREE.WebGLRenderer();

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
        console.log(d.x * scale, d.y * scale, d.z);
        scene.add(bubble);
      });
    };

    bChart.prototype.render = function() {
      renderer.render(scene, camera);
    };

    return bChart;
  })();

  var data = [];
  for (var i = 0; i < 55; ++i) {
    data.push({
      size: 5 + Math.random() * 15,
      x: Math.random() * 100,
      y: Math.random() * 100,
      z: Math.random() * - 255
    });
  }
  var chart = new BubbleChart('container', data);
  chart.render();
};
