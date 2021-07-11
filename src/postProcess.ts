export class ScreenPostProcess extends BABYLON.PostProcess {

    sources: [id: string, params: BABYLON.Vector4][];

    constructor(name: string, camera: BABYLON.Camera, scene: BABYLON.Scene) {
        // you might need to change the path to the .fragment.fx file
        super(name, "./shader", [
            "source1",
            "source2",
            "source3",
            "source4",
            "source5",
            "source6",
            "source7",
            "source8",
            "source9",
            "source10",
            "time"
        ], [], 1, camera, BABYLON.Texture.BILINEAR_SAMPLINGMODE, scene.getEngine(), true);

        let time = 0;

        this.sources = [
            ["source1", new BABYLON.Vector4(0.5, 0.5, 1.0, 1.0)],
            ["source2", new BABYLON.Vector4(0.1, 0.3, 1.0, 1.0)],
            ["source3", new BABYLON.Vector4(0.9, 0.1, 1.0, 1.0)],
            ["source4", new BABYLON.Vector4(0.2, 0.4, 1.0, 1.0)],
            ["source5", new BABYLON.Vector4(0.7, 0.6, 1.0, 1.0)],
            ["source6", new BABYLON.Vector4(0.5, 0.9, 1.0, 1.0)],
            ["source7", new BABYLON.Vector4(0.5, 0.9, 1.0, .0)],
            ["source8", new BABYLON.Vector4(0.5, 0.9, 1.0, .0)],
            ["source9", new BABYLON.Vector4(0.5, 0.9, 1.0, .0)],
            ["source10", new BABYLON.Vector4(0.5, 0.9, 1.0, .0)],
        ];

        this.onBeforeRender = (effect: BABYLON.Effect) => {
            time += 0.005;
            effect.setFloat("time", time);
            for (let source of this.sources) {
                effect.setVector4(source[0], source[1]);
            }
        };
    }
}