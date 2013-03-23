#pragma strict
class Car_Tank_UI extends Car_Tank{

  function Awake(){
    super.Awake();
  }

  function Start () {
    super.Start();
  }

  function Update () {
  	if (Input.GetKey (KeyCode.T)){
  		//mton_GLOBAL.uiTimeBool = true;
  		Time.timeScale = 0.5;
  	}
  	else{
  		//mton_GLOBAL.uiTimeBool = false;
  		Time.timeScale = 1.0;
  	}
    super.Update();
  }

  function FixedUpdate () {
    super.FixedUpdate();
  }
}
