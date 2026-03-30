import Transform = APJS.Transform;
import Vector3f = APJS.Vector3f;
import Vector2f = APJS.Vector2f;
import { TWEEN } from "tweenLib";



@customNode()
export class CustomNodeTS extends BasicScriptNode{

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
  
  rows:number = 2;
  cols:number = 3;
  placeArr:number[][] = [];


  @input("Transform")
  cubeTrans1:Transform;
  @input("Transform")
  cubeTrans2:Transform;
  @input("Transform")
  cubeTrans3:Transform;
  @input("Transform")
  cubeTrans4:Transform;
  @input("Transform")
  cubeTrans5:Transform;


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
  
  initPlaceArr(){
    this.placeArr = [];
    for (let i = 0; i < this.rows; i++) {
      this.placeArr.push([]);
      for (let j = 0; j < this.cols; j++) {
        this.placeArr[i].push(1);
      }
    }
    this.placeArr[1][2] = 0;
  }

  onStart() {
    this.initPlaceArr();
    // const control1 = this.trans.localPosition;
    // const control2 = new Vector3f(4,0,-40);
    // let posUpdateFunc = (pos: APJS.Vector3f, _elapsedTime: number) => {
    //   this.trans.localPosition = pos;
    // };
    // const tween = new TWEEN.Tween(this.trans.localPosition).onUpdate(posUpdateFunc).to(control2, 1000).start();
  }

 

  onUpdate() {
    TWEEN.update();
  }
  
    // transUpdate(pos: APJS.Vector3f, _elapsedTime: number){
    //   this.trans.localPosition = pos;
    // }
}