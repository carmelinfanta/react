import { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import "./List.css";


const EditModal = ({submit,cancel,overlay,handleChange,inputs}) => {
   
   
    const options = ['Admin','Project Lead','Member'];
    const status =['Active','Inactive'];
   
    const [selectedDate,setSelectedDate] = useState(null);
   
    const handleSubmit = (event)=>{
        event.preventDefault();
        submit(false);
        axios.put(`http://localhost:80/api/user/${inputs.id}/edit`,inputs).then(function(response){
           console.log(response.data);
           refreshPage();
        })
    }

    function refreshPage (){
        window. location. reload(false);
    }
   

    
  return (
    <>
     <div className="modal">
          <div onClick={()=>overlay(true)} className="overlay"></div>
          <div className="modal-content">
          <h1>Edit User</h1>
    <form onSubmit={handleSubmit}>
        <table cellSpacing="15">
            <tbody>
                <tr>
                    <th>
                    <label>User Name:</label>
                    </th>
                    <td>
                    <input type='text' value={inputs.username} name='username' onChange={handleChange}/>
                    </td>
                </tr>
                <tr>
                    <th>
                    <label>Email:</label>
                    </th>
                    <td>
                    <input type='text' value={inputs.email} name='email' onChange={handleChange}/>
                    </td>
                </tr>
                <tr>
                    <th>
                    <label>Phone:</label>
                    </th>
                    <td>
                    <input type='text' value={inputs.phone} name='phone'onChange={handleChange}/>
                    </td>
                </tr>
                <tr>
                    <th>
                    <label>Role:</label>
                    </th>
                    <td>
                    <select name='role'value={inputs.role} onChange={handleChange}>
                    <option disabled selected value>--select a role--</option>
            {options.map(option =>(
                <option value={option}>{option}</option>
            ))}
        </select>
                    </td>
                </tr>
                <tr>
                    <th>
                    <label>Valid Till:</label>
        
                    </th>
                    <td>
                    <DatePicker value={inputs.valid_till} name='valid_till' selected={selectedDate} onBlur={handleChange} onChange={(date)=>setSelectedDate(date)} />
                    </td>
                </tr>
                <tr>
                    <th>
                    <label>Status:</label>
       
                    </th>
                    <td>
                    <select name='status' value={inputs.status} onChange={handleChange}>
                        <option disabled selected value>--select a status--</option>
            {status.map(stat =>(
                <option value={stat}>{stat}</option>
            ))}
        </select>
                    </td>
                </tr>
            </tbody>
        </table>
    </form>
    <button className="submit-modal" onClick={handleSubmit} >
              SUBMIT
            </button>
            
            <button className="close-modal" onClick={()=>cancel(false)}>
              CANCEL
            </button>
          </div>
        </div> 
    </>
  )
}

export default EditModal
