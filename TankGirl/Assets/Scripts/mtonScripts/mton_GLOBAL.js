#pragma strict
//GLOBAL singleton
public class mton_GLOBAL extends MonoBehaviour{

	private static var instance:mton_GLOBAL;
	
	public static function Instance():mton_GLOBAL{
		return instance; //use instance to return nonstatic variable such as textField
	}
	
	function Awake():void{
	    instance = this;
	}
	
	//global/static var and functions here
	static var uiTimeBool:boolean = false;
	static var debugIcon :boolean = false;
	
	public var textField  : TextMesh;
	
	static function DisplayText( text:String ){
	    if( mton_GLOBAL.Instance().textField )
	        mton_GLOBAL.Instance().textField.text = text;
	    else
	        Debug.Log( text );
	}
	
	static function PickObject( screenPos : Vector2 ) : GameObject{
	    var ray : Ray = Camera.main.ScreenPointToRay( screenPos );
	    var hit : RaycastHit;
	
	    if( Physics.Raycast( ray, hit ) ){
	        return hit.collider.gameObject;
		}
		else{
	    	return null;
	    }
	}
}
