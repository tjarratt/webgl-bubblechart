window.onload = function() {
  var canvas = document.getElementsByTagName("canvas")[0];
  canvas.width = 500;
  canvas.height = 500;

  // init webgl context
  var context = canvas.getContext("experimental-webgl");
  context.viewportWidth = canvas.width;
  context.viewportHeight = canvas.height;

  // init shaders
  var fragmentShaderScript = document.getElementById("shader-fs").firstChild.nodeValue;
  var vertexShaderScript = document.getElementById("shader-vs").firstChild.nodeValue;

  var fragmentShader = context.createShader(context.FRAGMENT_SHADER);
  context.shaderSource(fragmentShader, fragmentShaderScript);
  context.compileShader(fragmentShader);

  var vertexShader = context.createShader(context.VERTEX_SHADER);
  context.shaderSource(vertexShader, vertexShaderScript);
  context.compileShader(vertexShader);

  var program = context.createProgram();
  context.attachShader(program, vertexShader);
  context.attachShader(program, fragmentShader);
  context.linkProgram(program);

  context.useProgram(program);

  program.vertexPositionAttribute = context.getAttribLocation(program, "aVertexPosition");
  context.enableVertexAttribArray(program.vertexPositionAttribute);

  program.textureCoordAttribute = context.getAttribLocation(program, "aTextureCoord");
  context.enableVertexAttribArray(program.textureCoordAttribute);

  program.vertexNormalAttribute = context.getAttribLocation(program, "aVertexNormal");
  context.enableVertexAttribArray(program.vertexNormalAttribute);

  program.pMatrixUniform = context.getUniformLocation(program, "uPMatrix");
  program.mvMatrixUniform = context.getUniformLocation(program, "uMVMatrix");
  program.nMatrixUniform = context.getUniformLocation(program, "uNMatrix");
  program.samplerUniform = context.getUniformLocation(program, "uSampler");
  program.useLightingUniform = context.getUniformLocation(program, "uUseLighting");
  program.ambientColorUniform = context.getUniformLocation(program, "uAmbientColor");
  program.lightingDirectionUniform = context.getUniformLocation(program, "uLightingDirection");
  program.directionalColorUniform = context.getUniformLocation(program, "uDirectionalColor");

  // init buffers
  var latitudeBands = 30;
  var longitudeBands = 30;
  var radius = 2;

  var latNumber;
  var vertexPositionData = [];
  var normalData = [];
  var textureCoordData = [];
  for (latNumber = 0; latNumber <= latitudeBands; latNumber++) {
    var theta = latNumber * Math.PI / latitudeBands;
    var sinTheta = Math.sin(theta);
    var cosTheta = Math.cos(theta);

    for (var longNumber = 0; longNumber <= longitudeBands; longNumber++) {
      var phi = longNumber * 2 * Math.PI / longitudeBands;
      var sinPhi = Math.sin(phi);
      var cosPhi = Math.cos(phi);

      var x = cosPhi * sinTheta;
      var y = cosTheta;
      var z = sinPhi * sinTheta;
      var u = 1 - (longNumber / longitudeBands);
      var v = 1 - (latNumber / latitudeBands);

      normalData.push(x);
      normalData.push(y);
      normalData.push(z);
      textureCoordData.push(u);
      textureCoordData.push(v);
      vertexPositionData.push(radius * x);
      vertexPositionData.push(radius * y);
      vertexPositionData.push(radius * z);
    }
  }

  var indexData = [];
  for (latNumber = 0; latNumber < latitudeBands; latNumber++) {
    for (var longNumber=0; longNumber < longitudeBands; longNumber++) {
      var first = (latNumber * (longitudeBands + 1)) + longNumber;
      var second = first + longitudeBands + 1;
      indexData.push(first);
      indexData.push(second);
      indexData.push(first + 1);

      indexData.push(second);
      indexData.push(second + 1);
      indexData.push(first + 1);
    }
  }

  var moonVertexNormalBuffer = context.createBuffer();
  context.bindBuffer(context.ARRAY_BUFFER, moonVertexNormalBuffer);
  context.bufferData(context.ARRAY_BUFFER, new Float32Array(normalData), context.STATIC_DRAW);
  moonVertexNormalBuffer.itemSize = 3;
  moonVertexNormalBuffer.numItems = normalData.length / 3;

  var moonVertexTextureCoordBuffer = context.createBuffer();
  context.bindBuffer(context.ARRAY_BUFFER, moonVertexTextureCoordBuffer);
  context.bufferData(context.ARRAY_BUFFER, new Float32Array(textureCoordData), context.STATIC_DRAW);
  moonVertexTextureCoordBuffer.itemSize = 2;
  moonVertexTextureCoordBuffer.numItems = textureCoordData.length / 2;

  var moonVertexPositionBuffer = context.createBuffer();
  context.bindBuffer(context.ARRAY_BUFFER, moonVertexPositionBuffer);
  context.bufferData(context.ARRAY_BUFFER, new Float32Array(vertexPositionData), context.STATIC_DRAW);
  moonVertexPositionBuffer.itemSize = 3;
  moonVertexPositionBuffer.numItems = vertexPositionData.length / 3;

  var moonVertexIndexBuffer = context.createBuffer();
  context.bindBuffer(context.ELEMENT_ARRAY_BUFFER, moonVertexIndexBuffer);
  context.bufferData(context.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexData), context.STATIC_DRAW);
  moonVertexIndexBuffer.itemSize = 1;
  moonVertexIndexBuffer.numItems = indexData.length;

  // init textures
};
