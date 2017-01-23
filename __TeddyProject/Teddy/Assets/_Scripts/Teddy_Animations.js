﻿var anim : Animator;
var walkStateHash : int = Animator.StringToHash("Base Layer.Locomotion.Walk");

var freezeStateHash : int = Animator.StringToHash("Base Layer.Freeze");
var idle1StateHash : int = Animator.StringToHash("Base Layer.Idle_Tree.Idle1");
var idle2StateHash : int = Animator.StringToHash("Base Layer.Idle_Tree.Idle2");
var idle3StateHash : int = Animator.StringToHash("Base Layer.Idle_Tree.Idle3");


var curSpeed : float;

var Dead : boolean = false;

var frozen : boolean = false;

var health : float = 100;

var idleRange : float = 0;
var idleGoUp : boolean = true;
var idleGoDown : boolean = false;

var motor : CharacterMotor;
var tedMove : Teddy_Movement;
var platformMotor : PlatformInputController;


var climbing : boolean;

function Awake()
{
platformMotor = GetComponent(PlatformInputController);
motor = GetComponent(CharacterMotor);
tedMove = GetComponent(Teddy_Movement);
}


function Start () 
{
    anim = GetComponent("Animator");
}


function Update () 
{
 	  curSpeed = tedMove.currSpeed;
 	  motor.movement.maxForwardSpeed = curSpeed;
 	  
 	  
    anim.SetFloat("Speed", curSpeed);
    anim.SetFloat("IdleRange", idleRange);
    
    
    
    if(climbing)
    {
    	anim.SetBool("Climbing", true);
    }
    else
    {
    	anim.SetBool("Climbing", false);
    }
    
    if(tedMove.climbObst)
    {
    	climbing = true;
    }
    else
    {
    	climbing = false;
    }
    
    if(Input.GetAxis("Horizontal") || Input.GetAxis("Vertical") && frozen == false)
    {
    	tedMove.currSpeed += 25;
    
    }
    else {
    	tedMove.currSpeed -= 25 * Time.deltaTime * 7;
    
    }
    
    if(idleGoUp)
    {
    	idleRange += 0.05 * Time.deltaTime;
    }
    
    if(idleRange >= 1)
    {
    	idleGoUp = false;
    	idleGoDown = true;
    }
    
    if(idleRange >= 1)
    {
    	
    	idleRange = 1;
    }
    
     if(idleRange <= 0)
    {
    	
    	idleRange = 0;
    }
    
    if(idleRange <= 0)
    {
    	idleGoDown = false;
    	idleGoUp = true;
    	
    }
    
    if(idleGoDown)
    {
    	idleRange -= 0.02 * Time.deltaTime;
    }
    
    if(health <= 0)
    {
    	Dead = true;
    
    }
    
    if(platformMotor.climbObst)
    {
    	anim.SetBool("Climbing", true);
    }
    else
    {
    	anim.SetBool("Climbing", false);
    }
    
    
    if(Dead)
    {
    	locationToStay = transform.position;
    	anim.SetBool("Dead", true);
    	
    	transform.position = locationToStay;
    }

    var stateInfo : AnimatorStateInfo = anim.GetCurrentAnimatorStateInfo(0);
   
   
  
   
   
   
   
   
   
   if(Input.GetKeyDown(KeyCode.LeftControl))
   {
   
   anim.SetBool("Shout", false);
   anim.SetBool("Climbing", false);
   platformMotor.canJump = false;
   platformMotor.canMove = false;
   frozen = true;
   tedMove.currSpeed = 0;
   }
   
   if(Input.GetKeyUp(KeyCode.LeftControl))
   {
   platformMotor.canJump = true;
	platformMotor.canMove = true;
	frozen = false;
  
   }
   
   if(frozen)
   {
   anim.SetBool("Frozen", true);
   	curSpeed = 0;
   }
   else{
   anim.SetBool("Frozen", false);
    }
}
   
   function UpdateHealth(newDamage : float)
   {
   	health -= newDamage; 
   
   }
  

 
 