class UnitPlayer extends Unit{

  protected var accel    : float = 0.025          ;
  protected var move_Vec : Vector3 = Vector3.zero ;

  private var angleH = 0;
  private var angleV = 0;

  var aimSpeedX        = 180 ;
  var aimSpeedY        = 90  ;
  var aimVertMin       = -10 ;
  var aimVertMax       = 40  ;
  var friction : float = 0   ;

  function Start(){
    super.Start();
  }

  function Update(){

    // rotation
		// angleH += wiiXform() * aimSpeedX * Time.deltaTime;
		angleH += Mathf.Clamp(Input.GetAxis("Mouse X"), -1, 1) * aimSpeedX * Time.deltaTime;
		angleV += Mathf.Clamp(Input.GetAxis("Mouse Y"), -1, 1) * aimSpeedY * Time.deltaTime;
		angleV = Mathf.Clamp(angleV, aimVertMin, aimVertMax);  // limit vertical angle

		var aimRotation: Quaternion = Quaternion.Euler(-angleV, angleH, 0);
		// Quaternion camYRotation = Quaternion.Euler(0, angleH, 0);
		transform.rotation = aimRotation;
	
    // transform.Rotate(0, angleH, 0) ;
    // move
   /* 
    var contX = Input.GetAxis("Horizontal");
    if(contX){
      move_Vec.x += accel*contX;
      // print(move_Vec+" Horizontal: "+contX+" Accel: "+accel);
    }
    else{
      move_Vec.x = 0;
    }
    // move = new Vector3(move_Vec.x, 0, Input.GetAxis("Vertical")) ;
  */ 
    move = new Vector3(Input.GetAxis("Horizontal"), 0, Input.GetAxis("Vertical")) ;
    move.Normalize()                                                              ; //So diagonal xforms are not faster, uses hypotneous
    move = transform.TransformDirection(move)                                     ; //Moves along direction object is facing: local co-ordinate

    if(Input.GetButton("Jump") && control.isGrounded){
      jump = true;
    }
    dash = Input.GetButton("Fire2");

    super.Update()                                                                ;
  }

  function wiiXform(){
    var centerOffset = Screen.width*0.5;
    var mouseNorm = (Input.mousePosition.x-centerOffset)/centerOffset;
    // transform.Rotate(0, mouseNorm*aimSpeedX*Time.deltaTime, 0) ;
    return mouseNorm;
  }
}
