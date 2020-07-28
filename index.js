

const deleteIcon = document.querySelector('.deleteIcon');
const contentItem= document.querySelector('.contentItem');
const completeIcon= document.querySelector('.completeIcon');
const task = document.querySelector('#task');
const date = document.querySelector('.date');
const check= document.querySelector('.check');
const clear= document.querySelector('.clear');





let data =[];
let id=0;
const CHECK="fa-check" 
const UNCHECK="fa-exclamation-circle"
const BLEU= "text-success"
	
 let DB=localStorage.getItem('TASKS')
   
 //   console.log(data)

 if(DB){
 	data=JSON.parse(DB)
 	draw(data)
 	id=data.length

 	
 }else{
 	data=[];
 	id=0;
 }




//get current Tasks
const time=new Date()
const options= {weekday:"long",month:"short",day:"numeric",year:"numeric"}

date.innerHTML=time.toLocaleDateString("FR",options) +" "+ "Agboville"
// contentItem.addEventListener('click',function(event){

// 	console.log(event.target)
// }) 

//get Submit Input
let value=task.value


document.addEventListener('keyup', function(event){
 // event.preventDefault()

  if(event.keyCode==13){
  	if(task.value){
  		addBefore(task.value,id,false,false)
  		data.push({
  			id:id,
  			task:task.value,
  			done:false,
  			trash:false

  		})
  		


  	}
localStorage.setItem('TASKS',JSON.stringify(data))
    console.log(data)
    task.value="";
    id++;
    

  }  
})


// draw(data)


// function draw(array){

// array.forEach( function(item){
//            addBefore(item.todo,item.id,item.done,item.trash)

// })
// }


function addBefore(todo,id,done,trash){
// Icon States

if(trash=="true") return
 
const DONE=done? CHECK :UNCHECK;
// const LINE=done? "text-primary":COLOR;

console.log(id,"identifiant")

	const item=`<li class="item " >

			<i class=" check fa ${DONE} complete "  job= "complete" style="font-size:32px;"  id=${id}> </i> <span style="margin-left:10px"> ${todo} </span>   <i class="  fa fa-trash delete " style="margin-left:100px"  id=${id} job= "delete"  > </i> </li>`

contentItem.insertAdjacentHTML("beforeend",item)


}
// Get and Edit Each Element By Id

contentItem.addEventListener("click",function(event){
const element=event.target
const  Remouve=element.attributes.job.value


if(Remouve=="complete"){
  classadd(element)

}else if(Remouve=="delete"){

	if(confirm("are you sure?")){
		Remove(element)
	}

   

}
localStorage.setItem('TASKS',JSON.stringify(data))





})
//CHECKING
function classadd(element){
	// element.classList.toggle(CHECK)
	// element.style.color=""
	console.log(element.classList)
	element.classList.toggle(UNCHECK)
	element.classList.toggle(CHECK)
	// element.style.color="green"
	// element.classList.toggle(BLEU)
	data[element.id].done= data[element.id].done?false:true;
	

}
function Remove(element){

data[element.id].trash="true"
element.parentNode.parentNode.removeChild(element.parentNode)
console.log(data)
}


// DRAW DATA TROUGHT A ITERATION IF THERE IS A DATA ON LocalStorageItem

function draw(array){
array.forEach(function(item){
	addBefore(item.task,item.id,item.done,item.trash)
})

}

// reboot localstorage
clear.addEventListener('click',function(){
	localStorage.clear()
	location.reload()
})