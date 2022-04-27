import { Engine, Scene, Vector3, Color4, FreeCamera, Vector4, Tools } from "@babylonjs/core";

import { ScreenPostProcess } from "./postProcess";

let canvas = document.getElementById("renderer") as HTMLCanvasElement;

canvas.width = Math.min(window.innerHeight, window.innerWidth);
canvas.height = canvas.width;

let engine = new Engine(canvas);
engine.loadingScreen.displayLoadingUI();

let scene = new Scene(engine);
scene.clearColor = new Color4(0, 0, 0, 1);

let freeCamera = new FreeCamera("freeCamera", new Vector3(0, 0, -200), scene);
scene.activeCamera = freeCamera;

// The important line
let pp = new ScreenPostProcess("emitters", freeCamera, scene);

function updateSources() {
    let i = 0;
    for (let element of document.querySelectorAll("#ui>div")) {
        let vector: number[] = [];
        element.querySelectorAll("input").forEach(inputElement => {
            vector.push(parseFloat(inputElement.value));
        });
        pp.sources[i][1] = Vector4.FromArray(vector);
        i++;
    }
}
updateSources();

//#endregion

let interval = 0;
let pause = false;

document.addEventListener("keydown", e => {
    if (e.key == "p") { // take screenshots
        Tools.CreateScreenshotUsingRenderTarget(engine, scene.activeCamera!, { precision: 1 });
    } else if (e.key == "f") {
        console.log(Math.round(engine.getFps()));
    } else if (e.key == " ") {
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

scene.executeWhenReady(() => {
    engine.loadingScreen.hideLoadingUI();

    interval = setInterval(() => {
        scene.render();
    }, 1000 / 60);
    //engine.runRenderLoop = () => scene.render();
});

for (let inputElement of document.querySelectorAll("input")) {
    inputElement.addEventListener("change", () => updateSources());
}

