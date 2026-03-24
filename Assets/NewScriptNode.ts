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
  execute() {
    // Insert more for your logic
    // this.trans.localScale = new Vector3f(3,3,3);
    // this.trans.localPosition = new Vector3f(4,-4,-40);
    this.trans.localPosition = new Vector3f(0,-4,-40);
    let endPos = new Vector3f(this.trans.localPosition.x+5,this.trans.localPosition.y,this.trans.localPosition.z);
    const tween1 = new TWEEN.Tween(this.trans).to(endPos, 500).easing(TWEEN.Easing.Quadratic.InOut);
    tween1.start();
    
    this.info = "success4";
    this.vecInfo = this.trans.localPosition; 
    }

    // transUpdate(pos: APJS.Vector3f, _elapsedTime: number){
    //   this.trans.localPosition = pos;
    // }
   update(deltaTime: number) {
    TWEEN.update();
    this.frameCount++;
    this.info = "success5."+this.frameCount;
    this.trans.localPosition = new Vector3f(0,-4,-40);
    }
}