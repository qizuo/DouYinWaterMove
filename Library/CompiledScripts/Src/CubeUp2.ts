import Vector3f = APJS.Vector3f;
import Transform = APJS.Transform;

@component()
export class CubeUp2 extends APJS.BasicScriptComponent {
  
  trans:Transform;
  sceneObject: APJS.SceneObject;
  imageComponent: APJS.Image;

  onClick2(){
    // console.log("click");
    this.trans.localPosition = new Vector3f(2, 0, -40);
  }

  /**
   * Called before the first frame update
   */
  onStart() {
    this.sceneObject = this.getSceneObject();
    this.trans = this.sceneObject.getTransform();
    this.imageComponent = this.sceneObject.getComponent("Image") as APJS.Image;
    // 绑定触摸事件到全局事件发射器
    const objectEmitter = APJS.EventManager.getGlobalEmitter();
    objectEmitter.on(APJS.EventType.Touch, this.onTouch, this);
  }
  
  // 处理触摸事件
  onTouch(event: APJS.IEvent) {
    // event.stopPropagation();
    const touch = event.args[0] as APJS.TouchData;
    if (touch.phase === APJS.TouchPhase.Began) {
      // 检查点击是否发生在当前物体上
      if (this.isPointOnImage(touch.position)) {
        this.onClick2();
      }
    }
  }
  
  // 检查点击是否发生在当前图片上
   isPointOnImage(screenPoint: APJS.Vector2f): boolean {
    // 使用 Physics3D.raycast 进行射线检测
    const scene = this.sceneObject.scene;
    const sceneObjects = scene.getAllSceneObjects();
    for (let i = 0; i < sceneObjects.length; i++) {
      const camera = sceneObjects[i].getComponent("Camera") as APJS.Camera;
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
  onUpdate(deltaTime: number) {
  }

  // Insert more for your logic
}