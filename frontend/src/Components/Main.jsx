import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import img from '../assets/assets/ab1.avif'
import img1 from '../assets/assets/about2.avif'
import img2 from '../assets/assets/con1.jpg'
import img3 from '../assets/assets/con2.jpg'
import img4 from '../assets/assets/dev.avif'
import img5 from '../assets/assets/img2.avif'
import img6 from '../assets/assets/img6.avif'
import { createAccount, login, signout } from '../Redux/Slices/AuthSlice.js';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Slidebar from './Slidebar.jsx';
// import myImage from '../assets/e1.jpg';
import myImage from '../assets/assets/background.jpg'




const Login = () => {
  const dispatch = useDispatch()
  function handleUserInput(e){
    const {name,value}=e.target;
    console.log(name,value);
    setSigninData({
        ...signinData,
        [name]:value
    })
}


  const [signinData,setSigninData]=useState({
    email:"",
    password:"",
})


async function signin(e){
  e.preventDefault();
  console.log('called');
  console.log('daata',signinData);

  // return

  console.log('sjdhssh');
  if(!signinData.email ||  !signinData.password){
      toast.error('Please fill all the details');
      return
  }

  console.log('sjdhssh');

  // if(!isEmail(signupData.email)){
  //     toast.error('Invalid Email Id')
  //     return
  // }

  // if(signupData.password != signupData.confirmPassword){
  //     toast.error("Password and Confirm Password didn't match")
  //     return
  // }



  //   if(!signupData.password.match(/^(?=.\d)(?=.[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/)){
  //     // setLoading(false)
  //     return toast.error('Password should contain at least 8 character 1 digit 1 lower case 1 uppercase', {
  //       position: "top-right",
  //   });


  // }

  console.log('sjdhssh');
  

 
  const response=await dispatch(login(signinData))
  console.log('from sign up',response);
  if(response?.payload?.success)    {
    console.log('inside');
    toast.success("User Logged In Successfully")
  }
  
}

  
  return (
    <div class="modal fade" id="example1Modal" tabindex="-1" aria-labelledby="example1ModalLabel" aria-hidden="true">
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
            // transition: Bounce
        />
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Login to EduVerse</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form onSubmit={signin}>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Email address</label>
                        <input type="email" class="form-control" id="exampleInputEmail1"  onChange={handleUserInput}  value={signinData.email}
                            aria-describedby="emailHelp" name='email'/>
                        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input type="password" value={signinData.password} name='password' onChange={handleUserInput} class="form-control" id="exampleInputPassword1"/>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
  )
 
}






const Navbar = () => {
  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
  const role = useSelector((state) => state?.auth?.role);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div
        style={{
          gap: "20px",
          marginLeft: "120px",
          marginBottom: "20px", // Fixed marginBottom typo
          display: "flex",
          justifySelf: "center",
          alignItems: "center",
        }}
        className="container-fluid"
      >
        {isLoggedIn && <Slidebar />}
        <a className="navbar-brand" id="bad" href="#">
          Σ ｄｕＶｅｒｓｅ{" "}
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{ backgroundColor: "green" }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="index1.html">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="about.html">
                About
              </a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Topics
              </a>
              <ul className="dropdown-menu" style={{ backgroundColor: "transparent" }}>
                <li>
                  <a className="dropdown-item" href="#">
                    Profile
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#" style={{ color: "white" }}>
                    Profile {/* Fixed incorrect style */}
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Profile
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="contact.html" aria-disabled="true">
                Contact Us
              </a>
            </li>
          </ul>
         
          <div className="mx-2">
            {!isLoggedIn && (
              <button className="btn btn-danger" onClick={() => navigate("/login")}>
                Login
              </button>
            )}
            {!isLoggedIn && (
              <button className="btn btn-success" onClick={() => navigate("/register")}>
                SignUp
              </button>
            )}
          </div>
          {/* <button id="d" type="submit" className="btn btn-primary">Submit</button> */}
        </div>
      </div>
    </nav>
  );
};



const Signup=()=>{
  const dispatch = useDispatch()
  function handleUserInput(e){
    const {name,value}=e.target;
    console.log(name,value);
    setSignupData({
        ...signupData,
        [name]:value
    })
}


  const [signupData,setSignupData]=useState({
    Name:"",
    email:"",
    password:"",
    role:"",
    confirmPassword:""
})


async function createNewAccount(e){
  e.preventDefault();
  console.log('called');
  console.log('daata',signupData);

  // return

  
  if(!signupData.email || !signupData.Name || !signupData.password || !signupData.confirmPassword || !signupData.role){
      toast.error('Please fill all the details');
      return
  }


  if(!isEmail(signupData.email)){
      toast.error('Invalid Email Id')
      return
  }

  if(signupData.password != signupData.confirmPassword){
      toast.error("Password and Confirm Password didn't match")
      return
  }



    if(!signupData.password.match(/^(?=.\d)(?=.[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/)){
      // setLoading(false)
      return toast.error('Password should contain at least 8 character 1 digit 1 lower case 1 uppercase', {
        position: "top-right",
    });



  }

  console.log('sjdhssh');
  

 
  const response=await dispatch(createAccount(signupData))
  console.log('from sign up',response);
  if(response?.payload?.success)    toast("User Registered Successfully")
  // if(response?.payload?.success) navigate('/main')
  // clearing all the entry
  // setPreviewImage('')
  // setSignupData({
  //     Name:"",
  //     email:"",
  //     password:"",
  //     role:""
  //     // profile:"",
  //     // UserName:""
  // })
}


   return (
    <div class="modal fade" id="example2Modal" tabindex="-1" aria-labelledby="example2ModalLabel" aria-hidden="true">
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
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Get your icoder Account</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form>
                  <div class="mb-3">
                          <label for="exampleInputEmail1" class="form-label">Name</label>
                          <input type="email" class="form-control" name="Name" value={signupData.Name} onChange={handleUserInput} id="exampleInputEmail1"
                              aria-describedby="emailHelp"/>
                      </div>
                    
                      <div class="w-full">
                    
                      </div>

                      <div class="mb-3">
                        <select id="options" style={{ backgroundColor: 'transparent' }} className="bg-transparent mt-1 block w-full border text-3 md:h-[10%] lg:h-[10%]  max-sm:h-[20%] border-gray-300 bg-white p-3 rounded-xl shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" name='role' value={signupData.role} onChange={handleUserInput}>
                                              <option value="" disabled selected className='bg-re-300 text-xl itali text-rose-500 focus:bg-red-400'>Role</option>
                                              <option value="Teacher" className='bg-re-300 text-xl itali text-rose-500 focus:bg-red-400'>Teacher</option>
                                              <option value="Student" className='bg-re-300 text-xl itali text-rose-500 hover:bg-red-400'>Student</option>
                      </select>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label" >Email address</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" name="email" value={signupData.email} onChange={handleUserInput} 
                            aria-describedby="emailHelp"/>
                        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input type="password" class="form-control" id="exampleInputPassword1"  name="password" value={signupData.password} onChange={handleUserInput} />
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label" >Confirm Password</label>
                        <input type="password" class="form-control" id="exampleInputPassword1"  name="confirmPassword" value={signupData.confirmPassword} onChange={handleUserInput}/>
                    </div>
                    <button type="submit" class="btn btn-primary" onClick={createNewAccount}>Submit</button>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>
   )
}
const Modal = ({ id, title, children }) => {
  return (
    <div className="modal" id={id} tabIndex="-1" aria-labelledby={`${id}Label`}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id={`${id}Label`}>{title}</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            {children}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};


const Carousel = () => {
  return (
    <div id="carouselExampleCaptions" className="carousel slide">
      <div className="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={img6} className="d-block w-100" style={{ height: '400px' }} alt="..." />
          <div className="carousel-caption d-none d-md-block">
            <h5>Welcome to Σ ｄｕＶｅｒｓｅ</h5>
            <p>Technology, development, and Trends.</p>
            <button className="btn btn-primary">DSA</button>
            <button onClick={() => window.location.href = 'webdev.html'} className="btn btn-danger">Web development</button>
            <button className="btn btn-success">AI</button>
          </div>
        </div>
        <div className="carousel-item">
          <img src="assets/img4.avif" className="d-block w-100" style={{ height: '400px' }} alt="..." />
          <div className="carousel-caption d-none d-md-block">
            <h5>The best coding blog</h5>
            <p>Technology, development, and Trends.</p>
            <button className="btn btn-primary">DSA</button>
            <button onClick={() => window.location.href = 'webdev.html'} className="btn btn-danger">Web development</button>
            <button className="btn btn-success">Tech fun</button>
          </div>
        </div>
        <div className="carousel-item">
          <img src="assets/img5.avif" className="d-block w-100" style={{ height: '400px' }} alt="..." />
          <div className="carousel-caption d-none d-md-block">
            <h5>Award-winning blog</h5>
            <p>Some representative placeholder content for the third slide.</p>
            <button className="btn btn-primary">DSA</button>
            <button onClick={() => window.location.href = 'webdev.html'} className="btn btn-danger">Web development</button>
            <button className="btn btn-success">Tech fun</button>
          </div>
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden" style={{zIndex:'-1'}}>Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};
const Courses = () => {
  return (
    <div className="container my-5">
      <h1>
        <div className="text-bg-primary p-3">Platforms Where you can Explore courses </div>
      </h1>
      <div className="row mb-2">
        <CourseCard 
          title="Coursera" 
          description="Coursera is a global online learning platform offering courses, Specializations, Professional Certificates, and degrees from top universities and companies" 
          date="2012" 
          imgSrc={img1} 
          link="https://www.coursera.org/" 
        />
        <CourseCard 
          title="NPTEL" 
          description="The National Programme on Technology Enhanced (NPTEL) is an Indian e-learning platform offering university-level courses in science, technology etc." 
          date="2003" 
          imgSrc={img} 
          link="https://onlinecourses.nptel.ac.in/" 
        />
        <CourseCard 
          title="InfosysSpringBoard" 
          description="Infosys Springboard is a free online learning platform designed to provide digital and life skills to students." 
          date="2015" 
          imgSrc={img2} 
          link="https://infyspringboard.onwingspan.com/web/en/login" 
        />
        <CourseCard 
          title="Udemy" 
          description="Udemy is a popular online learning and teaching marketplace with over 250,000 courses and 73 million students." 
          date="2020" 
          imgSrc={img3} 
          link="https://www.udemy.com/" 
        />
        <CourseCard 
          title="Google Career Certificates" 
          description="Google Career Certificates are designed to provide job-ready skills in high-demand fields such as data analytics, project management and digital marketing." 
          date="Nov 25" 
          imgSrc={img4} 
          link="https://grow.google/intl/en_in/certificates/" 
        />
        <CourseCard 
          title="LinkedIn Learning" 
          description="Offers courses and learning paths that can lead to certifications, especially in business, technology, and creative fields." 
          date="Nov 30" 
          imgSrc={img5} 
          link="https://learning.linkedin.com" 
        />
      </div>
    </div>
  );
};

const CourseCard = ({ title, description, date, imgSrc, link }) => {
  const isExternalLink = link.startsWith('http'); // Check if the link is an external URL

  return (
    <div className="col-md-6">
      <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
        <div className="col p-4 d-flex flex-column position-static">
          <strong className="d-inline-block mb-2 text-primary-emphasis">{title}</strong>
          <h3 className="mb-0">{title}</h3>
          <div className="mb-1 text-body-secondary">{date}</div>
          <p className="card-text mb-auto">{description}</p>

          {/* Check if the link is external or internal */}
          {isExternalLink ? (
            <a 
              href={link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="icon-link gap-1 icon-link-hover stretched-link"
            >
              Link to Platform
            </a>
          ) : (
            <Link 
              to={link} 
              className="icon-link gap-1 icon-link-hover stretched-link"
            >
              Link to Platform
            </Link>
          )}
        </div>
        <div className="col-auto d-none d-lg-block">
          <img className="bd-placeholder-img" width="200" height="250" src={imgSrc} alt={title} />
        </div>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="container">
      <p className="float-end"><a href="#">Back to top</a></p>
      <p>© 2023–2024 icoder company, Inc.</p>
    </footer>
  );
};




const Main = () => {
  return (
    <div>
      <Navbar />
      
      {/* Container for image and text */}
      <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
       
        
        {/* Image with overlay text */}
        <div style={{ position: 'relative',height:'50%',width:'100%', backgroundImage:`url(${myImage})`, backgroundSize: 'cover', // Ensure the image covers the entire div
    backgroundPosition: 'center',}}>
          <img 
            src={myImage}
            alt="Descriptive Alt Text"
            className="img-fluid my-4"

            style={{ translate: '0px -30px',width:'100%' }} // Adjust the image position if needed
          />
          {/* Overlay text on the image */}
          <div 
            style={{
              position: 'absolute',
              
              top: '20%', // Adjust top position
              right: '50%', // Adjust left position
              left: '10%',
              color: 'white', // Change color for visibility
              fontSize: '24px', // Adjust font size
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)', // Optional: add shadow for better visibility
            }}
          >
            <h1 style={{
            fontStyle:'oblique',
            textDecorationColor: 'linear-gradient(45deg, #ffffff, #000000)' }}>Σ ｄｕＶｅｒｓｅ</h1>
            <br />
            <h3 style={{fontFamily:'cursive',textDecorationStyle:'initial'}}>EduVerse is an interactive platform where students can ask questions, access a wealth of resources, 
              and attempt quizzes to enhance their learning experience.</h3>
          </div>
        </div>
      </div>
      
      {/* Other components */}
      <Carousel/>
      <Courses />
      <Signup />
      <Modal id="example1Modal" title="Login">
        This is the login modal.
      </Modal>
      <Modal id="example2Modal" title="SignUp">
        This is the signup modal.
      </Modal>
    </div>
  );
};

export default Main;