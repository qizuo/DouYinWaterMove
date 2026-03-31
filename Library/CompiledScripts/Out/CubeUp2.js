const {BasicScriptNode} = require('./BasicScriptNode');
const {
  customNode,
  component,
  input,
  output,
  serializeSceneObjectFlag,
  serializeProperty,
  label, readOnly, slider, spinBox, dropDown,
  textArea, header, showIf, tooltip, separator,
  space, groupBegin, groupEnd, disablePin,
} = require('./OrionDecorators');

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CubeUp2 = void 0;
var Vector3f = APJS.Vector3f;
let CubeUp2 = class CubeUp2 extends APJS.BasicScriptComponent {
    onClick2() {
        // console.log("click");
        this.trans.localPosition = new Vector3f(2, 0, -40);
    }
    /**
     * Called before the first frame update
     */
    onStart() {
        this.sceneObject = this.getSceneObject();
        this.trans = this.sceneObject.getTransform();
        this.imageComponent = this.sceneObject.getComponent("Image");
        // 绑定触摸事件到全局事件发射器
        const objectEmitter = APJS.EventManager.getGlobalEmitter();
        objectEmitter.on(APJS.EventType.Touch, this.onTouch, this);
    }
    // 处理触摸事件
    onTouch(event) {
        // event.stopPropagation();
        const touch = event.args[0];
        if (touch.phase === APJS.TouchPhase.Began) {
            // 检查点击是否发生在当前物体上
            if (this.isPointOnImage(touch.position)) {
                this.onClick2();
            }
        }
    }
    // 检查点击是否发生在当前图片上
    isPointOnImage(screenPoint) {
        // 使用 Physics3D.raycast 进行射线检测
        const scene = this.sceneObject.scene;
        const sceneObjects = scene.getAllSceneObjects();
        for (let i = 0; i < sceneObjects.length; i++) {
            const camera = sceneObjects[i].getComponent("Camera");
            if (camera) {
                // 从屏幕坐标创建射线
                const ray = camera.viewportPointToRay(screenPoint);
                // 使用 Physics3D.raycast 进行射线检测
                const hits = APJS.Physics3D.raycast(ray, 1000, true);
                if (hits.length > 0) {
                    // 检查第一个击中的物体是否是当前物体
                    const hit = hits[0];
                    if (hit.colliderObject === this.sceneObject) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    /**
     * Called once per frame
     */
    onUpdate(deltaTime) {
    }
};
CubeUp2 = __decorate([
    component()
], CubeUp2);
exports.CubeUp2 = CubeUp2;
