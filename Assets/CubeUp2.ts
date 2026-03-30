import Vector3f = APJS.Vector3f;
import Transform = APJS.Transform;

@component()
export class CubeUp2 extends APJS.BasicScriptComponent {
  
  trans:Transform;
  sceneObject: APJS.SceneObject;
  imageComponent: APJS.Image;

  onClick(){
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
    const globalEmitter = APJS.EventManager.getGlobalEmitter();
    globalEmitter.off(APJS.EventType.Touch, this.onTouch, this);
    globalEmitter.on(APJS.EventType.Touch, this.onTouch, this);
  }
  
  // 处理触摸事件
  onTouch(event: APJS.IEvent) {
    const touch = event.args[0] as APJS.TouchData;
    if (touch.phase === APJS.TouchPhase.Began) {
      // 检查点击是否发生在当前物体上
      if (this.isPointOnImage(touch.position)) {
        this.onClick();
      }
    }
  }
  
  // 检查点击是否发生在当前图片上
  isPointOnImage(screenPoint: APJS.Vector2f): boolean {
    // 使用 TouchUtils.isScreenPointOnImage 方法来检测点击是否在图片上
    // if (this.imageComponent) {
    //   return APJS.TouchUtils.isScreenPointOnImage(screenPoint, this.imageComponent);
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