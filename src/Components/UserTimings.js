import React,{useState} from 'react'
import user from '../Data/Test.json';
import {Modal,Button} from 'react-bootstrap' 
function UserTimings() {
    const [data, setData] = useState([...user.members]);
    const [show, setShow] = useState(false);
    const [timings, setTimings] = useState([])
    const [timings2, setTimings2] = useState([])
    const [mal, setMal] = useState([])
    const [givenDate, setGivenDate] = useState()
    const [fname, setFname] = useState()


const getData=(x,y)=>{
   // console.log(x.activity_periods,"i am here");
    setTimings2(x.activity_periods);
    setTimings(x.activity_periods);
    setFname(y);
    handleShow();

   // console.log(timings2,"timings");
}
const handleClose = () => setShow(false);
  const handleShow = () => {
      setShow(true);
      setGivenDate()
  }
  
  const Update=(e)=>{
     // console.log(e.target.value,"tagere")
      setGivenDate(e.target.value)
      setMal([])
  }
  const showData=()=>{
   // console.log("month");
    var d = new Date(givenDate);
    var n = d.getMonth();
    var mL = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
     var str=mL[n];
    // console.log(timings,"timings");
   // console.log(n,"month",str);
    for(let i=0;i<timings.length;i++){
       // console.log(str.startsWith(timings[i].start_time.slice(0,2).toLowerCase()),"x.startsWith(str)",timings[i].start_time.slice(0,3));
        if(str.startsWith(timings[i].start_time.slice(0,2).toLowerCase())===true){
            mal.push(timings[i]);
        }
    }

     
setTimings2(mal);
  }

    return (
        <div>
            <h1>List of Employees</h1><br/><br/>
            {
                data.length>0 && data.map((x,index)=>{
                    return <div  key={index} onClick={()=>getData(x,x.real_name)}><h4 > {x.real_name}</h4></div>
                  })
            }
            <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        <Modal.Title>Timings of {fname}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
   {
    timings2.length>0 ? timings2.map((x,index)=>{
    return <div key={index}>
        <h6><span style={{color:'orangered'}}> Start Time : </span>{x.start_time}</h6>
    <h6><span style={{color:'#7b6ceb'}}> End Time : </span> {x.end_time}</h6><br/>
    </div>
    }):<h5>No Timings Data in Given Month</h5>
  }
  <input type='date' value={givenDate} onChange={Update}/> &emsp;
  <button disabled={givenDate===undefined?true:false} onClick={showData}>Click me</button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
        </div>
    )
}

export default UserTimings
