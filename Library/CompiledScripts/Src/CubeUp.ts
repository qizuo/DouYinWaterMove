import Vector3f = APJS.Vector3f;
import Transform = APJS.Transform;

@component()
export class CubeUp extends APJS.BasicScriptComponent {
  
  trans:Transform;
  sceneObject: APJS.SceneObject;
  imageComponent: APJS.Image;

  onClick(){
    // console.log("click");
    this.trans.localPosition = new Vector3f(0, 0, -40);
  }

  onPointerClick(){
    console.log("click");
    this.trans.localPosition = new Vector3f(0, 0, -40);
  }

  /**
   * Called before the first frame update
   */
  onStart() {
    this.sceneObject = this.getSceneObject();
    this.trans = this.sceneObject.getTransform();
    this.imageComponent = this.sceneObject.getComponent("Image") as APJS.Image;
    
    // 绑定点击事件到手势事件发射器
    const gestureEmitter = APJS.EventManager.getGestureEmitter();
    gestureEmitter.on(APJS.GestureType.Tap, this.onTap, this);
  }
  
  // 处理点击事件
  onTap(event: APJS.IEvent) {
    const gestureInfo = event.args[0] as APJS.GestureInfo;
    // 检查点击是否发生在当前图片上
    if (this.isPointOnImage(gestureInfo.endPoint)) {
      this.onClick();
    }
  }
  // 检查点击是否发生在当前图片上
  isPointOnImage(screenPoint: APJS.Vector2f): boolean {
    // 使用 Physics2D.raycast2D 进行 2D 射线检测
    // const scene = this.sceneObject.scene;
    // const sceneObjects = scene.getAllSceneObjects();
    // for (let i = 0; i < sceneObjects.length; i++) {
    //   const camera = sceneObjects[i].getComponent("Camera") as APJS.Camera;
    //   if (camera) {
    //     // 从屏幕坐标创建射线
    //     const ray = camera.viewportPointToRay(screenPoint);
        
    //     // 使用 Physics2D.raycast2D 进行 2D 射线检测
    //     const hits = APJS.Physics2D.raycast2D(ray, 1000, true);
    //     if (hits.length > 0) {
    //       // 检查第一个击中的物体是否是当前物体
    //       const hit = hits[0];
    //       if (hit.colliderObject === this.sceneObject) {
    //         return true;
    //       }
    //     }
    //   }
    // }
    return true;
  }
  /**
   * Called once per frame
   */
  onUpdate(deltaTime: number) {
  }

  // Insert more for your logic
}