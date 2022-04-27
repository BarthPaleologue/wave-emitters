import { PostProcess, Vector4, Camera, Scene, Texture, Effect } from "@babylonjs/core";

export class ScreenPostProcess extends PostProcess {

    sources: [id: string, params: Vector4][];

    constructor(name: string, camera: Camera, scene: Scene) {
        super(name, "./shaders/shader", [
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
        ], [], 1, camera, Texture.BILINEAR_SAMPLINGMODE, scene.getEngine(), true);

        let time = 0;

        this.sources = [
            ["source1", new Vector4(0.5, 0.5, 1.0, 1.0)],
            ["source2", new Vector4(0.1, 0.3, 1.0, 1.0)],
            ["source3", new Vector4(0.9, 0.1, 1.0, 1.0)],
            ["source4", new Vector4(0.2, 0.4, 1.0, 1.0)],
            ["source5", new Vector4(0.7, 0.6, 1.0, 1.0)],
            ["source6", new Vector4(0.5, 0.9, 1.0, 1.0)],
            ["source7", new Vector4(0.5, 0.9, 1.0, .0)],
            ["source8", new Vector4(0.5, 0.9, 1.0, .0)],
            ["source9", new Vector4(0.5, 0.9, 1.0, .0)],
            ["source10", new Vector4(0.5, 0.9, 1.0, .0)],
        ];

        this.onBeforeRender = (effect: Effect) => {
            time += 0.005;
            effect.setFloat("time", time);
            for (let source of this.sources) {
                effect.setVector4(source[0], source[1]);
            }
        };
    }
}