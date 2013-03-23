#pragma strict
class Car_Tank extends Car{

  private var xform    : Transform  ;
  private var aimPoint : GameObject ;
  
  var turretHeading : Transform;
  var turretHeadingSpeed :float = 5.0;
  var turretPitch : Transform;
  

  function Awake(){
    xform    = transform      ; //caching component lookup: transform =  = GetComponent(transform)
    aimPoint = GameObject.CreatePrimitive(PrimitiveType.Sphere);
    aimPoint.renderer.material.color = Color.magenta;
    //remove collider from sphere, don't react to physics
    Destroy(aimPoint.collider);
    //super.Awake();
  }

  function Start () {
    super.Start();
  }

  private var angleH = 0;
  private var angleV = 0;


  var aimSpeedX        = 180 ;
  var aimSpeedY        = 90  ;
  var aimVertMin       = -10 ;
  var aimVertMax       = 40  ;

  function Update () {

    // rotation
    angleH += Mathf.Clamp(Input.GetAxis("Mouse X"), -1, 1) * aimSpeedX * Time.deltaTime ;
    angleV += Mathf.Clamp(Input.GetAxis("Mouse Y"), -1, 1) * aimSpeedY * Time.deltaTime ;
    angleV = Mathf.Clamp(angleV, aimVertMin, aimVertMax)                                ; // limit vertical angle

    if(Input.GetMouseButton(0)){
      //create line from mouse position into screen
      var ray = Camera.main.ScreenPointToRay(Input.mousePosition); //Returns a ray going from camera through a screen point in world space
      var hit : RaycastHit;
      //determine where it hits something
      if(Physics.Raycast(ray, hit, 100)){ //Raycast(origin, direction, distance, layerMask) overload to use ray.origin and ray.direction instead of origin and direction.
        //put aiming object at that position
        aimPoint.transform.position=hit.point;
      }

    }

    //modify orientation and aim pose based on location of target
    var direction=aimPoint.transform.position-this.transform.position;
    //var angleToTarget=Vector3.Angle(direction, this.transform.up);
    //turretHeading.rotation = Quaternion.Euler(0, angleToTarget, 0); //Quaternion.FromToRotation (transform.forward, direction);
    //var angleToTarget= Quaternion.Slerp(transform.rotation, Quaternion.LookRotation(direction).Time.deltaTime);
    direction.y = 0.0;
    turretHeading.rotation = Quaternion.Slerp(turretHeading.rotation, Quaternion.LookRotation(direction), Time.deltaTime * turretHeadingSpeed);

    if(Input.GetButton("Jump")){
      print("Jumping Button pressed.");
    }

    //super.Update();
  }

  function FixedUpdate () {
    super.FixedUpdate();
  }
}
