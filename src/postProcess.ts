interface FractalSettings {

}

export class ScreenPostProcess extends BABYLON.PostProcess {
    settings: FractalSettings;

    constructor(name: string, camera: BABYLON.Camera, scene: BABYLON.Scene) {
        // you might need to change the path to the .fragment.fx file
        super(name, "./shader", [
            "time"
        ], [], 1, camera, BABYLON.Texture.BILINEAR_SAMPLINGMODE, scene.getEngine(), true);

        this.settings = {
        };


        let time = 0;

        this.onBeforeRender = (effect: BABYLON.Effect) => {
            time += 0.1;
            effect.setFloat("time", time);
        };
    }
}