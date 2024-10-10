import axios from 'axios';
import React, { useState } from 'react';
import './Upload.css'; // Ensure the CSS file is correctly imported
import { toast, ToastContainer } from 'react-toastify';

const Upload = () => {
    const [subject, setSubject] = useState('');
    const [branch,setBranch]=useState('')
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [type,setType]=useState('')
    const [book,setBook]=useState('')
    const [description,setDescription]=useState('')
    const [year,setYear]=useState('')
    const [YearOfPapar,SetYearOfPaper]=useState('')

    let loading=false;
    const handleSubjectChange = (event) => {
      setSubject(event.target.value);
    };

    const handleyearOfPaper = (event) => {
      SetYearOfPaper(event.target.value);
    };

    const handleBranchChange = (event) => {
      setBranch(event.target.value);
    };

    const handleDescriptionChange = (event) => {
      setDescription(event.target.value);
    };


    
    const handleYearChange = (event) => {
      setYear(event.target.value);
    };

    const handleBookChange = (event) => {
      setBook(event.target.value);
    };

    const handleFileChange = (event) => {
      setFile(event.target.files[0]);
    };


    const handleType=(event)=>{
      setType(event.target.value)
    }

    const handleSubmit = async (event) => {
      event.preventDefault();
      console.log('type. ',type);
        console.log('here  cxxx,',type,subject,book,year);
        // return()
        // const toastId=toast.loading('Wait, File is Uploading') 
        loading=true;
       
        
        if(type=="Book"){
          const toastId=toast.loading('Wait, File is Uploading') 
            if(!subject || !book || !year || !file){
                toast.error('All Fields are Mandatory')
                return
            }
            const formData = new FormData();
            formData.append('subjectName',subject)
            formData.append('bookName',book)
            formData.append('bookFile',file)
            formData.append('year',year)


            try {
              console.log('req of upload',formData);
              const response = await axios.post('http://localhost:5000/doubts/uploadBook', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
                withCredentials:true
    
              });
              
              // if(response)  loading=false;
              if(response?.data?.success) toast.update(toastId, { render: 'Resource Upload successful!', type: 'success', isLoading: false });
             
              setMessage(response.data.message);
            } catch (error) {
              setMessage('Error uploading file. Please try again.',error);
              // console.log('Error:', error.response ? error.response.data : error.message);
              console.log(
                error
              );
              

            }

        }

        else if(type=="Notes"){
          const toastId=toast.loading('Wait, File is Uploading') 
          if(!file || !subject || !description || !year || !branch){
            toast.error('All Fields are Mandatory')
                return
          }

          const formData = new FormData();
            formData.append('subject',subject)
            formData.append('year',year)
            formData.append('description',description)
            formData.append('branch',branch)
            formData.append('pdf',file)

            try {
              console.log('req of upload',formData);
              const response = await axios.post('http://localhost:5000/doubts/upload', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
                withCredentials:true
    
              });
              
              // if(response)  loading=false;
              if(response?.data?.success) toast.update(toastId, { render: 'Notes Upload successful!', type: 'success', isLoading: false });
             
              setMessage(response.data.message);
            } catch (error) {
              setMessage('Error uploading file. Please try again.',error);
              // console.log('Error:', error.response ? error.response.data : error.message);
              console.log(
                error
              );
              

            }


        }


        else{

          const toastId=toast.loading('Wait, File is Uploading') 
            if(!subject  || !branch || !YearOfPapar||  !year || !file){
                toast.error('All Fields are Mandatory')
                return
            }
            const formData = new FormData();
            formData.append('subjectName',subject)
            formData.append('year',year)
            formData.append('paperYear',YearOfPapar)
            formData.append('branch',branch)
            formData.append('questionPaper',file)
            


            try {
              console.log('req of upload',formData);
              const response = await axios.post('http://localhost:5000/doubts/uploadPaper', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
                withCredentials:true
    
              });
              
              // if(response)  loading=false;
              if(response?.data?.success) toast.update(toastId, { render: 'Resource Upload successful!', type: 'success', isLoading: false });
             
              setMessage(response.data.message);
            } catch (error) {
              setMessage('Error uploading file. Please try again.',error);
              // console.log('Error:', error.response ? error.response.data : error.message);
              console.log(
                error
              );
              

            }

        }
        
       
      
       
       
        
      };
      function handleUserInput(e) {
        const { name, value } = e.target;
        setSigninData({
          ...signinData,
          [name]: value
        });
      }
      

    return (
      <div className="upload-container"> {/* Apply the CSS class here */}
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
        <h1>Upload Resources</h1>
        <form onSubmit={handleSubmit}>
          <div>
          <select id="options" className="mt-1 block w-full border text-3 p-3 rounded-xl shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" name='role' value={type} onChange={handleType}>
                <option value="" disabled selected>Type</option>
                <option value="Book">Book PDF</option>
                <option value="PYQ">PYQ</option>
                <option value="Notes">Notes</option>
              </select>
              {
                (type=="Book" || type=="PYQ" || type=="Notes") && <>
                  <label>
              Subject:
              <input type="text" value={subject} onChange={handleSubjectChange} required />
            </label>
            <label>
              <select id="options" className="mt-1 block w-full border text-3 p-3 rounded-xl shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" name='year' value={year} onChange={handleYearChange}>
                <option value="" disabled selected>Year</option>
                <option value="1st">1st</option>
                <option value="2nd">2nd</option>
                <option value="3rd">3rd</option>
                <option value="4th">4th</option>
              </select>
            </label>
            {
              type=="Notes" &&
              <label>
              Description:
              <input type="text" value={description} onChange={handleDescriptionChange} required />
            </label>
            }
            <label>
              Branch:
              <input type="text" value={branch} onChange={handleBranchChange} required />
            </label>
           {type=="PYQ" &&<label>
            Year of Paper:
            <input type="text" value={YearOfPapar} onChange={handleyearOfPaper} required />
          </label>}
           
                </>
              }
            {
              type=="Book" && <>


            <label>
              Book Name:
              <input type="text" value={book} onChange={handleBookChange} required />
            </label>
            
              </>
            }
          </div>
          <div>
            <label>
              PDF File:
              <input type="file" accept=".pdf" onChange={handleFileChange} required />
            </label>
          </div>
          <button type="submit">Upload</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    );
}

export default Upload;