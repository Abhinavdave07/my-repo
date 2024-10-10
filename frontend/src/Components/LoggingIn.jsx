import React, { useState } from 'react';
import styled from 'styled-components';
import image from '../assets/assets/snow.jpg';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { createAccount, login } from '../Redux/Slices/AuthSlice';
import { Link, useNavigate, useParams } from 'react-router-dom';

const LoggingIn = ({ flag = false }) => {    
    const {loginn}=useParams();
    const navigate=useNavigate()
    console.log('param is',loginn);
    
    function isValidEmail(email) {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    }
    function isValidPassword(password) {
        const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{6,}$/;
        return regex.test(password);
    }
    
   
    
      async function signup(e){
        e.preventDefault();
        console.log('called',signinData);
        // console.log('daata',signupData);
      
        // return
      
        
        if(!signinData.email || !signinData.Name || !signinData.password || !signinData.confirmPassword || !signinData.role){
            toast.error('Please fill all the details');
            return
        }


        
        if(!isValidEmail(signinData.email)){
            toast.error('Email is Invalid')
            return
        }


        if(!isValidPassword(signinData.password)){
            toast.error('Password should atleast 6 character having one character,one special character,one numeric')
            return
        }

        if(signinData.confirmPassword != signinData.password){
            toast.error('Password and Confirm Pasword does not Match')
            return
        }



      
      
      
       
        const response=await dispatch(createAccount(signinData))
        console.log('from sign up',response);
        if(response?.payload?.success)  {
          toast("User Registered Successfully")
          await new Promise((resolve) =>
                  setTimeout(() => resolve("Fetched Data"), 2000)
              );
              console.log('wauted');
              navigate('/loginn')
        }

            
      }
      




















































  const dispatch = useDispatch();
  const [signinData, setSigninData] = useState({
    email: "",
    password: "",
    Name: "",
    role: "",
    confirmPassword: ""
  });

  function handleUserInput(e) {
    const { name, value } = e.target;
    setSigninData({
      ...signinData,
      [name]: value
    });
  }

  async function signin(e) {
    e.preventDefault();
    if (!signinData.email || !signinData.password) {
      toast.error('Please fill all the details');
      return;
    }
    const response = await dispatch(login(signinData));
    if (response?.payload?.success) {
      toast.success("User Logged Successfully");
      await new Promise((resolve) =>
        setTimeout(() => resolve("Fetched Data"), 2000)
    );
      navigate('/')
    
    }
  }

  return (
    <PageWrapper>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <BackgroundImage />
      <FormWrapper>
        <SignInForm>
          {/* {login} */}
          <h2>{loginn=='login' ? "Sign In" : "Sign Up"}</h2>
          {loginn=='register' && <Input type="text" onChange={handleUserInput} value={signinData.Name} name='Name' placeholder="Enter Name ..." />}
          <Input type="email" onChange={handleUserInput} value={signinData.email} name='email' placeholder="Enter Email ..." />
          <Input type="password" onChange={handleUserInput} value={signinData.password} name='password' placeholder="Enter Password ..." />
          {loginn=='register' && (
            <>
              {/* <h1>dfdkf</h1> */}
              <Input type="password" onChange={handleUserInput} value={signinData.confirmPassword} name='confirmPassword' placeholder="Enter Confirm Password ..." />
              <select id="options" className="mt-1 block w-full border text-3 p-3 rounded-xl shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" name='role' value={signinData.role} onChange={handleUserInput}>
                <option value="" disabled selected>Role</option>
                <option value="Teacher">Teacher</option>
                <option value="Student">Student</option>
              </select>
            </>
          )}
          {
            loginn=='login' ? <>

                  <SignInButton onClick={signin}>Sign In</SignInButton>
                  <Link to='/register'><p>Create's New Account</p></Link>
            </> :
            <>
                <SignInButton onClick={signup}>Sign Up</SignInButton>
                <Link to='/login'><p>Already Have An Account</p></Link>
            </>
          }

        </SignInForm>
      </FormWrapper>
    </PageWrapper>
  );
};

export default LoggingIn;

// Styled Components
const PageWrapper = styled.div`
  position: relative;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start; 
  padding-top: 50px; 
  overflow: hidden;
`;

const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url(${image}) no-repeat center center/cover;
  z-index: -1;
`;

const FormWrapper = styled.div`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(5px);
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  width: 500px;
  min-height: 300px; /* Minimum height based on your needs */
  text-align: center;
  display: flex;
  flex-direction: column; 
  justify-content: center; 
`;

const SignInForm = styled.form`
  display: flex;
  width: 100%;
  margin-top: 20px;
  gap: 20px; /* Adjust the gap between inputs */
  flex-direction: column; 
`;

const Input = styled.input`
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  width: 100%;
  &:first-of-type {
    margin-bottom: 20px; 
  }
`;

const SignInButton = styled.button`
  padding: 10px;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;
