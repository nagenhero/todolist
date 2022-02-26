
const taskList=[];
const badList=[];
const weekHrs=7*24;
let tasklistElm=document.getElementById("task-list");
let badlistElm=document.getElementById("bad-list")
const handleOnSubmit =(e)=>{
    const frmDt= new FormData(e);
    const task=frmDt.get("task");
    const hr=+frmDt.get("hr");
    if(hr<1)
    {
        return alert("please enter the value over 0");
    }
    const obj ={
        task,
        hr,

    };
    const ttlHr=taskTotalHrs();
    if( ttlHr +hr>weekHrs)
    { return alert("you have exceeded the weekly hour");

    }
    taskList.push(obj);
    display();
    taskTotalHrs();
    //console.log(taskList);
    //console.log(frmDt);
    //console.log(task,hr);

}
const display =() =>
{
    let str="";

//loop through the tasklist and convert in to  tr string
taskList.map((item,i)=>
{
    str+=`
    <tr>
                            
    <td><input type="checkbox"/>
    <td>${item.task}</td>
    <td>${item.hr}</td>
    <td><button class="btn btn-success" onclick="deleteTaskList(${i})"><i class="fa-solid fa-trash"></i>
        </button>
    <button class="btn btn-primary" onclick="markAsNotToDo(${i})"><i class="fas fa-long-arrow-right"></i></button></td>
  </tr>
    
    `

});
tasklistElm.innerHTML= str;
};
//dispaly bad task list
const displayBadList=()=>{
    let str="";
    badList.map((item,i)=>
    {
        str+=`
        <tr>
                            
                            <td><input type="checkbox"/>
                            <td>${item.task}</td>
                            <td>${item.hr}</td>
                            <td>
                                <button class="btn btn-warning" onclick="markAsTask(${i})" ><i class="fas fa-long-arrow-left"></i></button>
                                <button class="btn btn-success" onclick="deleteBadList(${i})"><i class="fa-solid fa-trash"></i>
                                </button>
                            </td>
                          </tr>
        
        `
    });
    badlistElm.innerHTML= str;

};

//delete item from tasklist
const deleteTaskList=i=>{

//console.log(i);
//taskList.splice(i,1);
const itm=taskList.splice(i,1);
display();
return itm[0];

};

//delete item from badlist
const deleteBadList=i=>{

  
    const itm= badList.splice(i,1);
    displayBadList();
    return itm[0];
    
    };

//mark task as to noto do item or switching to bad list frim add list
const markAsNotToDo=i=>{
console.log(i);
const badItm= deleteTaskList(i);
badList.push(badItm);
console.log(badList);
displayBadList();

};
const markAsTask=i=>
{
    const badItm=deleteBadList(i);
    taskList.push(badItm);
    display();
}
//display total  task hours
const taskTotalHrs=()=>
{
    const total=taskList.reduce((acc,item)=>
     acc + item.hr,0);
     const tlBadHrs=badTotalHrs();
     const grandTotal=total+tlBadHrs;
     document.getElementById("total-hr").innerHTML=total;
     //const tlBadHrs=badTotalHrs();
     return total;
    
};
//display total bad hours

const badTotalHrs=()=>
{
    const total=badList.reduce((acc,item)=>
     acc + item.hr,0);
     document.getElementById("bad-hr").innerHTML=total;
     return total;
    
};