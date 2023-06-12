<template>
  <canvas ref="bjsCanvas" />
</template>

<script>
import {
  Engine,
  Scene,
  Color3,
  OimoJSPlugin,
  ArcRotateCamera,
  Texture,
  Tools,
  StandardMaterial,
  HemisphericLight,
  MeshBuilder,
  PhysicsImpostor,
  Vector3,
  KeyboardEventTypes,
} from '@babylonjs/core';
import { onMounted, onUnmounted, ref } from 'vue';

const BJS_CANVAS_WIDTH = 500;
const BJS_CANVAS_HEIGHT = 500;
const BJS_CANVAS_ZINDEX = '9';

export default  {
  name: 'BabylonsJsScene',
  setup() {
    // the variable name MUST match the ref value used in the html templte above
    const bjsCanvas = ref(null);
    let engine;
    // the canvas is accessible only when the component is already mounted
    onMounted(() => {
      // you have to set the width on the canvas object
      // setting the width and height using css or canvas.style
      // only stretches the canvas to the desired dimensions
      bjsCanvas.value.width = BJS_CANVAS_WIDTH;
      bjsCanvas.value.height = BJS_CANVAS_HEIGHT;
      bjsCanvas.value.style.zIndex = BJS_CANVAS_ZINDEX;

      // do not forget to use the .value property on the ref object
      // everywhere you need to access the HTMLCanvasElement
      // engine = new Engine(bjsCanvas.value);
      // const scene = new Scene(engine);

      // // create a scene
      // createScene(scene, bjsCanvas.value);

      // // the render loop is actually rendering the scene
      // setupRenderLoop(engine, scene);

      window.addEventListener('resize', onWindowResize);
    });

    const onWindowResize = () => {
      if (engine) engine.resize();
    };

    const cleanup = () => {
      window.removeEventListener('resize', onWindowResize);
    };

    onUnmounted(() => {
      cleanup();
    });

    //----------------------------
    var canvas = document.getElementById('renderCanvas');

         var startRenderLoop = function (engine) {
             engine.runRenderLoop(function () {
                if (sceneToRender && sceneToRender.activeCamera) {
                    sceneToRender.render();
                }
             });
         };

        //var engine = null;
        //var scene = null;
        var sceneToRender = null;
        var createDefaultEngine = function () { return new Engine(canvas, true,
          { preserveDrawingBuffer: true, stencil: true, disableWebGL2Support: false }); };
        var createScene = async function () {

            var scene = new Scene(engine);
            scene.clearColor = new Color3(0.31, 0.48, 0.64);

            // var physicsViewer = new BABYLON.Debug.PhysicsViewer();
            // var physicsHelper = new BABYLON.PhysicsHelper(scene);

            scene.enablePhysics(new Vector3(0, -9.8, 0), new OimoJSPlugin());

            var camera = new ArcRotateCamera('camera', Tools.ToRadians(180), Tools.ToRadians(70), 55, new Vector3(0, 6, 0), scene);
            camera.attachControl(true);

            new HemisphericLight();

            // FLOOR
            const floor = new MeshBuilder.CreateGround('floor', { width: 50, height: 20 }, scene);
            const floorMat = new StandardMaterial('floorMat', scene);
            floorMat.diffuseTexture = new Texture('https://www.babylonjs-playground.com/textures/waterbump.png', scene);
            floorMat.specularPower = 256;
            floor.material = floorMat;
            // floorMat.sideOrientation = BABYLON.Mesh.DOUBLESIDE;

            // BOX BELOW PINS
            const box1 = new MeshBuilder.CreateBox('box1', { width: 50, height: 1, depth: 10 }, scene);
            box1.position.y = 0.5;
            const box1Mat = new StandardMaterial('box1Mat', scene);
            var url = 'https://doc.babylonjs.com/_next/image?url=%2Fimg%2Fresources%2Ftextures_thumbs%2Falbedo.png.jpg&w=1920&q=75';
            box1Mat.diffuseTexture = new Texture(url, scene);
            box1.material = box1Mat;

            // LEFT BOX
            const box2 = new MeshBuilder.CreateBox('box2', { width: 10, height: 1, depth: 2.5 }, scene);
            box2.position = new Vector3(0, 0 - 100, 10);
            box2.material = box1Mat;

            // RIGHT BOX
            const box3 = box2.clone('box3');
            box3.position = new Vector3(16, 0.5, 0);
            box3.rotation = new Vector3(Math.PI / 10, Math.PI / 2, 0);

            //slots
            const box4 = new MeshBuilder.CreateBox('box4', { width: 56, height: 5, depth: 12 }, scene);
            box4.position = new Vector3(60, -1, 0);

            var bowl = new MeshBuilder.CreateSphere('bowl', { diameter: 2.8 }, scene);
            bowl.position.x -= 25;
            bowl.position.y += 2.4;

            // PHYSICS
            box1.physicsImpostor = new PhysicsImpostor(box1, PhysicsImpostor.PlaneImpostor, { mass: 0, restitution: 0.5, friction: 0.5 }, scene);
            box3.physicsImpostor = new PhysicsImpostor(box3, PhysicsImpostor.PlaneImpostor, { mass: 0, restitution: 0.5, friction: 0.5 }, scene);
            box4.physicsImpostor = new PhysicsImpostor(box4, PhysicsImpostor.PlaneImpostor, { mass: 0, restitution: 0.5, friction: 0.5 }, scene);

            bowl.physicsImpostor = new PhysicsImpostor(bowl, PhysicsImpostor.SphereImpostor, { mass: 1, friction: 0.5, restitution: 0.5 }, scene);
            //bowl.physicsImpostor.applyImpulse(bowl.right.scale(25), bowl.getAbsolutePosition());

            scene.onKeyboardObservable.add((kbInfo) => {
                switch (kbInfo.type) {
                    case KeyboardEventTypes.KEYDOWN:
                        switch (kbInfo.event.key) {
                            case 'q':
                            case 'Q':
                                bowl.physicsImpostor.applyImpulse(new Vector3(20, 0, 0.7), bowl.getAbsolutePosition());
                                break;
                            case 'w':
                            case 'W':
                                bowl.physicsImpostor.applyImpulse(new Vector3(30, 0, 1.5), bowl.getAbsolutePosition());
                                break;
                            case 'e':
                            case 'E':
                                bowl.physicsImpostor.applyImpulse(new Vector3(35, 0, 2.2), bowl.getAbsolutePosition());
                                break;
                            case 'r':
                            case 'R':
                                bowl.physicsImpostor.applyImpulse(new Vector3(35, 0, -0.5), bowl.getAbsolutePosition());
                                break;
                            case 't':
                            case 'T':
                                bowl.physicsImpostor.applyImpulse(new Vector3(25, 0, -1.5), bowl.getAbsolutePosition());
                                //bowl.physicsImpostor.applyImpulse(bowl.right.scale(65), bowl.getAbsolutePosition());
                                break;
                            case 'y':
                                bowl.physicsImpostor.applyImpulse(new Vector3(40, 0, -2), bowl.getAbsolutePosition());
                                //bowl.physicsImpostor.applyImpulse(bowl.right.scale(65), bowl.getAbsolutePosition());
                                break;
                        }
                        break;
                }
            });


            return scene;
        };

        //var asyncEngineCreation = async function () {
            engine = createDefaultEngine();

        //}
        //asyncEngineCreation();
        if(engine)
            startRenderLoop(engine, canvas);
            createScene().then(returnedScene => { sceneToRender = returnedScene; });

    //----------------------------

    // you need to return the ref to the babylonJS canvas
    return {
      bjsCanvas,
    };
  },
};
</script>
<style></style>
