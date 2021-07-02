import { ScreenPostProcess } from "./postProcess.js";
let canvas = document.getElementById("renderer");
let engine = new BABYLON.Engine(canvas);
engine.loadingScreen.displayLoadingUI();
let scene = new BABYLON.Scene(engine);
scene.clearColor = new BABYLON.Color4(0, 0, 0, 1);
let freeCamera = new BABYLON.FreeCamera("freeCamera", new BABYLON.Vector3(0, 0, -200), scene);
scene.activeCamera = freeCamera;
// The important line
let pp = new ScreenPostProcess("emitters", freeCamera, scene);
//#endregion
let interval = 0;
let pause = false;
document.addEventListener("keydown", e => {
    if (e.key == "p") { // take screenshots
        BABYLON.Tools.CreateScreenshotUsingRenderTarget(engine, scene.activeCamera, { precision: 1 });
    }
    else if (e.key == "f") {
        console.log(Math.round(engine.getFps()));
    }
    else if (e.key == " ") {
        console.log(interval);
        if (!pause) {
            clearInterval(interval);
            pause = true;
        }
        else {
            interval = setInterval(() => {
                scene.render();
            }, 1000 / 60);
            pause = false;
        }
    }
});
/*window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    engine.resize();
});*/
scene.executeWhenReady(() => {
    engine.loadingScreen.hideLoadingUI();
    interval = setInterval(() => {
        scene.render();
    }, 1000 / 60);
    //engine.runRenderLoop = () => scene.render();
});
