import { useEffect, useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import "./List.css";

const Modal = ({submit,cancel,overlay,input}) => {
    const [inputs,setInputs]= useState({});
    const options = ['Admin','Project Lead','Member'];
    const [formErrors, setFormErrors] = useState({});
    const status =['Active','Inactive'];
    const [selectedDate,setSelectedDate] = useState(null);
    useEffect(()=>{
        console.log(Object.keys(formErrors).length);
        console.log(formErrors);
    },[formErrors,inputs])
    const handleChange = (event) =>{
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values=>({...values, [name]:value}));
        setFormErrors(validate(inputs));
    }

    function refreshPage (){
        window.location.reload(false);
    }


    const handleSubmit = (event)=>{
        event.preventDefault();
       
        if((Object.keys(formErrors).length) === 0){
            console.log("There is no error");
            setFormErrors(validate(inputs));
            refreshPage();

        }
        else{
            console.log("There is error");
            setFormErrors(validate(inputs));
        }
        // event.preventDefault();
        // console.log("submitted");
        // axios.post("http://localhost:80/api/user/save",inputs).then(function(response){
        //         console.log(response.data);
        //     });
        // (Object.keys(formErrors).length === 0)?submit(true):submit(false);
        
        //     setFormErrors(validate(inputs));
    }

    const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.username) {
          errors.username = "Username is required!";
        }
        if (!values.email) {
          errors.email = "Email is required!";
        } else if (!regex.test(values.email)) {
          errors.email = "This is not a valid email format!";
        }
        if (!values.phone) {
          errors.phone = "Phone Number is required";
        }
         else if (values.phone.length > 10) {
          errors.password = "Phone Number cannot exceed more than 10 characters";
        }
        if (!values.role) {
            errors.role = "Select the role of the user";
          } 
        if (!values.valid_till) {
            errors.valid_till = "Select a date range";
          }
        if (!values.status) {
            errors.status = "Select the status of the user";
          }
           
        return errors;
      };
    
  return (
    <>
     <div className="modal">
          <div onClick={()=>overlay(true)} className="overlay"></div>
          <div className="modal-content">
          <h1>Create User</h1>
    <form onSubmit={handleSubmit}>
        <table cellSpacing="15">
            <tbody>
                <tr>
                    <th>
                    <label>User Name:</label>
                    </th>
                    <td>
                    <input type='text' value={input.username}  name='username' onChange={handleChange}/>
                    </td>
                    <td className='errors'>{formErrors.username}</td>
                </tr>
               
                
                <tr>
                    <th>
                    <label>Email:</label>
                    </th>
                    <td>
                    <input type='text' name='email' value={input.email} onChange={handleChange}/>
                    </td>
                    <td className='errors'>{formErrors.email}</td>
                </tr>
               
                <tr>
                    <th>
                    <label>Phone:</label>
                    </th>
                    <td>
                    <input type='text' name='phone' value={input.phone} onChange={handleChange}/>
                    </td>
                    <td className='errors'>{formErrors.phone}</td>
                </tr>
                
                <tr>
                    <th>
                    <label>Role:</label>
                    </th>
                    <td>
                    <select name='role' value={input.role} onChange={handleChange}>
                    <option disabled selected value>--select a role--</option>
            {options.map(option =>(
                <option value={option}>{option}</option>
            ))}
        </select>
                    </td>
                    <td className='errors'>{formErrors.role}</td>
                </tr>
                
                <tr>
                    <th>
                    <label>Valid Till:</label>
        
                    </th>
                    <td>
                    <DatePicker name='valid_till' value={input.valid_till} selected={selectedDate} onBlur={handleChange} onChange={(date)=>setSelectedDate(date)} />
                    </td>
                    <td className='errors'>{formErrors.valid_till}</td>
                </tr>
           
                <tr>
                    <th>
                    <label>Status:</label>
       
                    </th>
                    <td>
                    <select name='status'value={input.status} onChange={handleChange}>
                        <option disabled selected value>--select a status--</option>
            {status.map(stat =>(
                <option value={stat}>{stat}</option>
            ))}
        </select>
                    </td>
                    <td className='errors'>{formErrors.status}</td>
                </tr>
                
            </tbody>
        </table>
    </form>
    <button type="submit" onClick={(e)=>handleSubmit(e)}className="submit-modal" >
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

export default Modal
