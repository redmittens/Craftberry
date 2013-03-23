#pragma strict
private var xform  : Transform;
private var seeRange :float = 10.0;
public  var player : Transform;

function Awake(){
  xform = transform      ; //caching component lookup: transform =  = GetComponent(transform)
}

function Update () {
  var direction=xform.position-player.position;
  if(Input.GetButton("Fire1")){
    xform.rigidbody.AddForce(direction * 5);	
  }
  print("Visibility : " + CanSeeTarget());
}

function CanSeeTarget():boolean{
	if(Vector3.Distance(xform.position, player.position)>seeRange){
		return false;
	}
	else{
		return true;
	}
}