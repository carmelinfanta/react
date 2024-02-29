import React,{useEffect, useState} from 'react';
import Modal from './Modal';
import "./List.css";
import "./Table.css";
import axios from "axios";
import EditModal from './EditModal';

const ListUser = () => {
    const[modal,setModal] = useState(false);
    const [mark,setMark] = useState(false);
    const [inputs,setInputs]= useState({});
    const[editmodal,setEditModal] = useState(false);
    const [isChecked, setisChecked]= useState([]);
    const [users,setUsers] = useState([]);
    
    let updatedUser = {};
    useEffect(()=>{
        async function getUsers(){
            const request = await axios.get("http://localhost:80/api/users");
            console.log(request);
            setUsers(request.data);
            console.log(users);
        }
        getUsers();
    },[])

    const handlerChange = (event) =>{
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values=>({...values, [name]:value}));
    }

    function refreshPage (){
        window. location. reload(false);
    }

    const deleteUser = (id) => {
        axios.delete(`http://localhost:80/api/user/${id}/delete`).then(function(response){
            console.log(response.data);
            refreshPage();
        });
    }

    function editUser (id) {
        const user = users.map((user)=>user.userId === id? updatedUser=user : user)
            console.log(id);
            console.log(user.userId);
            setInputs(updatedUser);
        setEditModal(true);
        };

   const handleCheck = (e) =>{
    const {value, checked}= e.target;
    console.log(value);
    if(checked)
    {
      setisChecked([...isChecked, value]);
      setMark(true);
    } else{
      setisChecked(isChecked.filter( (e)=>e!== value));
    }
    if(isChecked.length === 0){
        setMark(false);
    }
   }

   const handleValidity = (e)=>{
    const value = e.target.value;
    console.log(value);
   }

   function deleteMultiUser (){
    isChecked.map((val)=>deleteUser(val));
   }

    if(modal) {
        document.body.classList.add('active-modal')
      } else {
        document.body.classList.remove('active-modal')
      }
    

  return (
    <>
    <button  className="btn-modal" onClick={()=>setEditModal(true)}> Create User </button>
    {mark && (
        <button className='mul-del-btn' onClick={(e) =>
            deleteMultiUser(e)}>Delete All</button>
    )}
    <table className='list-table'>
        <thead className='list-table-head'>
            <tr className='list-table-row'>
                <th className='list-table-column'></th>
                <th className='list-table-column'>User Name</th>
                <th className='list-table-column'>Email</th>
                <th className='list-table-column'>Phone</th>
                <th className='list-table-column'>Role</th>
                <th className='list-table-column'>Valid</th>
                <th className='list-table-column'>Valid Till</th>
                <th className='list-table-column'>Status</th>
                <th className='list-table-column'></th>
                <th className='list-table-column'></th>
                
            </tr>
        </thead>
        <tbody className='list-table-body'>
           {users.map((user,key)=>
            <tr className='list-table-row' key={user.id}>
                <td className='list-table-data'><input type="checkbox"  value={user.id} checked={ user.isChecked} onChange={(e) =>handleCheck(e)}/></td>
                <td className='list-table-data'>{user.username}</td>
                <td className='list-table-data'>{user.email}</td>
                <td className='list-table-data'>{user.phone}</td>
                <td className='list-table-data'>{user.role}</td>
                <td className='list-table-data'><input value={(e)=>e.target.checked?"Yes":"No"} type="checkbox" onChange={(e)=>handleValidity(e)}/></td>
                <td className='list-table-data'>{user.valid_till}</td>
                <td className='list-table-data'>{user.status}</td>
                <td>
                    <button className='edit-btn' onClick={()=>editUser(user.id)}>Edit</button>
                </td>
                <td>
                    <button className='del-btn' onClick={()=>deleteUser(user.id)}>Delete</button>
                </td>
            </tr>
            
           )}
            
        </tbody>
    </table>
    
     {modal && (
        <Modal cancel={setModal} inputs={inputs}  submit={setModal} overlay={setModal}/>
      )}
      {
        editmodal && (
            <EditModal inputs={inputs} handleChange={handlerChange} cancel={setEditModal} submit={setEditModal} overlay={setEditModal} /> 
        )
      }
    </>
  )
}

export default ListUser