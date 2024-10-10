import React, { useState } from 'react'
import './style.css'
import { useDispatch } from 'react-redux';
import { postDoubt } from '../Redux/Slices/AuthSlice';
import { toast, ToastContainer } from 'react-toastify';
const AskDoubt = () => {
    const [doubts, setDoubts] = useState([]);
    const [topic, setTopic] = useState('');
    const [doubt, setDoubt] = useState('');

    const dispatch=useDispatch()
    const [data,setData]=useState({
        title:"",
        description:""
    })
    function handleUserInput(e){
        const {name,value}=e.target;
        console.log(name,value);
        setData({
            ...data,
            [name]:value
        })
    }
    
    
    const addDoubt = async() => {
        console.log('daa is',data);
        const res=await dispatch(postDoubt(data))
        console.log('res in posting',res);
        if(res?.payload?.success) toast.success("Doubt Uploaded Successfully")
          else toast.error("Some Error Occured")
        
    };

    const addComment = (index, commentText) => {
        if (commentText.trim() === '') {
            alert('Please enter a comment.');
            return;
        }

        const newDoubts = doubts.map((doubtItem, i) => {
            if (i === index) {
                return { ...doubtItem, comments: [...doubtItem.comments, commentText] };
            }
            return doubtItem;
        });

        setDoubts(newDoubts);
    };

    return (
        <div>
          <ToastContainer/>
            <header>
                <h1>Discussion Forum</h1>
            </header>
            <main>
                <section className="post-form">
                    <h2>Post Your Doubt</h2>
                    <input
                        type="text"
                        value={data.title}
                        name='title'
                        onChange={handleUserInput}
                        placeholder="Enter topic..."
                    />
                    <textarea
                        rows="3"
                        value={data.description}
                        name='description'
                        onChange={handleUserInput}
                        placeholder="Enter your doubt..."
                    ></textarea>
                    <button onClick={addDoubt}>Post</button>
                </section>
                <section className="posts">
                    {doubts.map((doubtItem, index) => (
                        <Post
                            key={index}
                            doubtItem={doubtItem}
                            onAddComment={(commentText) => addComment(index, commentText)}
                        />
                    ))}
                </section>
            </main>
        </div>
    );
};


const DoubtsTable = () => {
  const [doubts, setDoubts] = useState([]);

  // Fetch the doubts when the component is mounted
  useEffect(() => {
    const fetchDoubts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/doubts/', { withCredentials: true });
        setDoubts(res.data); // Assuming res.data is an array of doubts
      } catch (err) {
        console.error('Error fetching doubts:', err);
      }
    };

    fetchDoubts();
  }, []);

  return (
    <div>
      <ToastContainer/>
      <h2>List of Doubts</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {doubts.length > 0 ? (
            doubts.map((doubt, index) => (
              <tr key={index}>
                <td>{doubt.title}</td>
                <td>{doubt.description}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No doubts found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const Post = ({ doubtItem, onAddComment }) => {
    const [comment, setComment] = useState('');

    const handleAddComment = () => {
        onAddComment(comment);
        setComment('');
    };

    return (
        <div className="post">
            <p className="topic">Topic: {doubtItem.topic}</p>
            <h3>{doubtItem.doubt}</h3>
            <div className="comment-section">
                <h4>Comments:</h4>
                <div className="comments">
                    {doubtItem.comments.map((comment, i) => (
                        <div className="comment" key={i}>
                            {comment}
                        </div>
                    ))}
                </div>
                <div className="comment-input">
                    <textarea
                        rows="2"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Add a comment..."
                    ></textarea>
                    <button onClick={handleAddComment}>Comment</button>
                </div>
            </div>
        </div>
    );
}

export default AskDoubt
