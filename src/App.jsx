import './App.css'
import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { toast } from 'react-toastify';

function App() {
  const [name , setName] = useState('');
  const [email , setEmail] = useState('');
  const [message , setMessage] = useState('');
  const [pass , setPass] = useState('');



  const handleSubmit = (e) =>{
    e.preventDefault();
    

  // Your EmailJS Service Id , Template Id and Public Key
  const service_ID = 'service_nmy7mcp';
  const tamplate_ID = 'template_i60ppid';
  const public_KEY = '45WgdGRertkajq7RO';
  const key = '1234' ;
  
  // Object to contain Values 
  const template_params = {
    from_name : name ,
    from_email : email ,
    to_name : 'Manohar',
    message : message ,
  }

  //form conditions 
  const isName = name.length > 0 ;
  const isEmail = email.length > 0 ;
  const isPass = pass.length > 0 ;
  const isMessage = message.length > 0 ;
  const isCorrectPass = pass == key ;

  // Send email from emailJS 
  if(isName && isEmail && isPass && isMessage && isCorrectPass) {
    emailjs.send(service_ID,tamplate_ID,template_params,public_KEY)
    .then((Response)=> {
      console.log("Email Send successfully !");
      toast.success("Email Send successfully !" , {theme : 'dark' });
      setName("");
      setEmail("");
      setMessage("");
      setPass("");
    })
    .catch((error) => {
      toast.error("Something Went Wrong!" , {theme : 'dark' });
      setEmail("");
      setName("");
      setMessage("");
      setPass("");
      console.log("Error : ", error);
    })
  }
  else{
    if(!isName) toast.warn('Please Enter Name ');
    else if(!isEmail) toast.warn('Enter the Email ');
    else if(!isPass) toast.error('Enter Acess Key');
    else if(!isCorrectPass) toast.error('Enter Correct Access Key ');
    else if(!isMessage) toast.info('Enter the Message ');
  }
 
  }
  
  return (
    <>
      <div 
      className="contact-container w-screen h-screen bg-gradient-to-r from-cyan-500 to-blue-500
       flex justify-center items-center flex-col" >

        <form 
        onSubmit={handleSubmit} 
        id='form1'
        className='left flex flex-col items-center justify-center gap-10 w-[80vw] h-[80vh]  '>

          <div className="tittle text-4xl font-bold">Contact Us </div>
          <input 
          value={name}
          type="text" 
          placeholder='Enter Your Name '
          id='inputName'
          className='w-1/2 h-12 p-5 rounded-xl' 
          onChange={(e) => setName(e.target.value)}/>

          <input 
          value={email}
          type="text" 
          id='inputEmail'
          placeholder='Enter Your Email '
          className='w-1/2 h-12 p-5 rounded-xl' 
          onChange={(e) => setEmail(e.target.value)}/>

          <input 
          value={pass}
          type='password' 
          id='inputEmail'
          placeholder='ACCESS KEY'
          className='w-1/2 h-12 p-5 rounded-xl' 
          onChange={(e) => setPass(e.target.value)}/>

          <textarea 
          value={message}
          id='inputMsg'
          placeholder='Message..'
          className='w-1/2 h-1/4 p-5 rounded-xl '
          onChange={(e) => setMessage(e.target.value)}></textarea>

          
          <button 
          id='submit'
          className='px-10 py-5 bg-blue-300 font-semibold font-serif text-xl rounded-xl'>Submit</button>

        </form>
        <span
        className='p-10 '>Note : You need Access Key to send Query</span>
      </div>
    </>
  )
}

export default App
