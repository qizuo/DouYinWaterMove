import Transform = APJS.Transform;
import Vector3f = APJS.Vector3f;
import Vector2f = APJS.Vector2f;
import { TWEEN } from "tweenLib";



@customNode()
export class CustomNodeTS extends BasicScriptNode{

  @input("Transform")
  trans:Transform;
  
  @output("string")
  info:string
  
  @output("Vector3f")
  vecInfo:Vector3f
  
  frameCount:number = 0;
  /**
   * Executed at graph node
   */
  @input()
  isStartEvent: boolean;

  //True When Start Event is triggered, Otherwise False
  @input()
  isUpdateEvent: boolean;

  execute() {

   if (this.isStartEvent && !this.isUpdateEvent) {
        this.isStartEvent = false;
        this.onStart();
      }
      if (this.isUpdateEvent) {
        this.isUpdateEvent = false;
        this.onUpdate();
      }
  }

  onStart() {
    const control1 = this.trans.localPosition;
    const control2 = new Vector3f(4,0,-40);
    let posUpdateFunc = (pos: APJS.Vector3f, _elapsedTime: number) => {
      this.trans.localPosition = pos;
    };

    const tween = new TWEEN.Tween(this.trans.localPosition).onUpdate(posUpdateFunc).to(control2, 1000).start();
  }

  onUpdate() {
    TWEEN.update();
  }
  
    // transUpdate(pos: APJS.Vector3f, _elapsedTime: number){
    //   this.trans.localPosition = pos;
    // }
}