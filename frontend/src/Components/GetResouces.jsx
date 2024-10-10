import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './GetResources.css'; // Import your CSS file

const GetResources = () => {
    const [uploads, setUploads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [books, setBooks] = useState([]);
    const [paper, setPaper] = useState([]);
    const [notes, setNotes] = useState([]);
    const [paperYear, setPaperYear] = useState('');
    const [subjectSearchTerm, setSubjectSearchTerm] = useState('');
    const [yearSearchTerm,setYearSearchTerm]=useState('')
    const [type, setType] = useState('');

    useEffect(() => {
        const fetchUploads = async () => {
            console.log('called', type);
            try {
                if (type === "Book") {
                    const response = await axios.get('http://localhost:5000/doubts/allBooks', { withCredentials: true });
                    setBooks(response.data);
                } else if (type === "Notes") {
                    const response = await axios.get('http://localhost:5000/doubts/allNotes', { withCredentials: true });
                    setNotes(response.data);
                } else if (type === "PYQ") {
                    const response = await axios.get('http://localhost:5000/doubts/allPYQ', { withCredentials: true });
                    setPaper(response.data);
                }
            } catch (err) {
                setError('Error fetching data');
                console.error('Error fetching data:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchUploads();
    }, [type]);

    const handleSubjectSearchChange = (event) => {
        setSubjectSearchTerm(event.target.value);
    };

    const handleYearSearchChange = (event) => {
        setYearSearchTerm(event.target.value);
    };


    const handlePaperYearSearch = (event) => {
        setPaperYear(event.target.value); // Directly set the paper year from input
    };
    
    
    

    const handleType = (event) => {
        setType(event.target.value);
    };

    const filterBySubject = (data) => {
        if (!subjectSearchTerm) return data;
        return data.filter(item => item.subject_name?.toLowerCase().includes(subjectSearchTerm.toLowerCase()));
    };

    const filterByYear = (data) => {

        if (!yearSearchTerm) {
            console.log('bahaf',data);
            
            return data;
        }
            
        return data.filter(item => item.year?.toLowerCase().includes(yearSearchTerm.toLowerCase()));
    };

    // const filterByPaperYear = (data) => {
    //     if (!paperYear) {
    //         return data; // If no filter applied, return all data
    //     }
    //     return data.filter(item => item.PaperYear?.toString().includes(paperYear)); // Ensure PaperYear is a string before checking
    // };

    const filterByPaperYear = (data) => {
        console.log('abhay',paperYear);
        
        if (!paperYear) {
            console.log('paper year abahy',paperYear,data);
            
            return data;
        }
            
        return data.filter(item => item?.PaperYear?.toString().includes(paperYear));
    };

    const Notes = () => {
       
        const filteredNotes = filterBySubject(notes?.data || []);
        const data=filterByYear(filteredNotes || []) || filteredNotes
        console.log('data is in notes',data);
        
        return (
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Subject</th>
                        <th>Description</th>
                        <th>Year</th>
                        <th>Branch</th>
                        <th>URL</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((m, idx) => (
                        <tr key={idx}>
                            <td>{m.Name}</td>
                            <td>{m.subject}</td>
                            <td>{m.description}</td>
                            <td>{m.year}</td>
                            <td>{m.branch}</td>
                            <td><a href={m.url} target="_blank" rel="noopener noreferrer">View PDF</a></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    const Books = () => {
        
        const filteredBooks = filterBySubject(books?.data || []);
        const data=filterByYear(filteredBooks || []) || filteredNotes

        return (
            <table>
                <thead>
                    <tr>
                        <th>Subject</th>
                        <th>Teacher</th>
                        <th>Year</th>
                        <th>Book</th>
                        <th>URL</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((m, idx) => (
                        <tr key={idx}>
                            <td>{m.subject_name}</td>
                            <td>{m.uploader_name}</td>
                            <td>{m.year}</td>
                            <td>{m.book_name}</td>
                            <td><a href={m.cloudinary_url} target="_blank" rel="noopener noreferrer">View PDF</a></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    const PYQ = () => {
        // set
        // const filteredName
        
        const filteredPYQs = filterBySubject(paper?.data || []);

        const data=filterByPaperYear(filteredPYQs || []) || filteredPYQs
        const d=filterByYear(data || []) || data
        console.log('daaa in parper',data);
        
        return (
            <>            <div>
                
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Subject</th>
                        <th>Branch</th>
                        <th>Year</th>
                        <th>Paper Year</th>
                        <th>URL</th>
                    </tr>
                </thead>
                <tbody>
                    {d.map((m, idx) => (
                        <tr key={idx}>
                            <td>{m.subject_name}</td>
                            <td>{m.branch}</td>
                            <td>{m.year}</td>
                            <td>{m.PaperYear}</td>
                            <td><a href={m.cloudinary_url} target="_blank" rel="noopener noreferrer">View PDF</a></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </>

        );
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="uploads-table-container">
            <h1>Uploads</h1>
            
           <div className='select'>
           <select
                id="options"
                className="mt-1 border text-3 p-3 rounded-xl shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                name='role'
                value={type}
                onChange={handleType}
            >
                <option value="" disabled selected>Type</option>
                <option value="Book">View Books</option>
                <option value="PYQ">View PYQ</option>
                <option value="Notes">View Notes</option>
            </select>
            <div className='input'>
            {
                type!="" && <>
                    <input
                type="text"
                placeholder="Search by Subject"
                value={subjectSearchTerm}
                onChange={handleSubjectSearchChange}
            />

            <input
                    type="text"
                    placeholder="Search by Year"
                    value={yearSearchTerm}
                    onChange={handleYearSearchChange}
                />
                
                </>
            }

            {   
                type=="PYQ" &&
                <input
                type="text"
                placeholder="Search by Paper Year"
                value={paperYear}
                onChange={handlePaperYearSearch}
            />
            }



            </div>
           </div>
            {type === "" && <h1>Oops No Data</h1>}
            {type === "Notes" && <Notes />}
            {type === "PYQ" && <PYQ />}
            {type === "Book" && <Books />}
            
        </div>
    );
};

export default GetResources;
