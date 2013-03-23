#pragma strict

private var nextFire : float = 0   ;
var bullet           : GameObject  ;
var speed            : float = 5   ;
var fireRate         : float = 0.5 ;

function Start(){

}

function Update(){
  if(Input.GetButton("Fire1") && Time.time > nextFire){
    nextFire                 = Time.time + fireRate                                        ;
    var clone:GameObject     = Instantiate(bullet, transform.position, transform.rotation) ;
    clone.rigidbody.velocity = transform.TransformDirection(Vector3(0,speed,0))            ;
    Physics.IgnoreCollision(clone.collider, transform.root.collider)                       ;
  }
}

