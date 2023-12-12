import { SetStateAction, useState } from "react";

const CustomerInput = (props:any) => {
    const accident = {
      data: '',
    }
    const [message, setMessage] = useState('');
    const handleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setMessage(event.target.value);
    };
    const onClick = (event:any) => {
        event.preventDefault();
       
        accident.data = message;
        props.sendData(accident);
    }
    return (
      <div>
        <textarea 
            name="topicBox" 
            placeholder="Enter description of the incident here..." 
            onChange={handleChange}
            value={message}
            autoComplete="off"
            rows={10}
            cols={80}
        />
        <br/>
        <button onClick={onClick}>Submit</button>
      </div>
    )
  }
export default CustomerInput