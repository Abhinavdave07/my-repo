import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import styled from 'styled-components';

const Answer = () => {
    const { doubtId } = useParams();
    const [answer, setAnswer] = useState([]);
    const [inputText, setInputText] = useState('');

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/doubts/answer/${doubtId}`);
                setAnswer(res?.data?.result);
            } catch (err) {
                console.error('Error fetching answers:', err);
            }
        };
        fetch();
    }, [doubtId]);

    const onSubmit = async () => {
        if (inputText === '') {
            toast.error('Provide answer for Upload');
            return;
        }
        try {
            const response = await axios.post(
                `http://localhost:5000/doubts/${doubtId}/answer`,
                { answer: inputText },
                { withCredentials: true }
            );

            if (response?.data?.success) {
                window.location.reload();
                toast.success('Answer Uploaded Successfully');
            }
        } catch (error) {
            console.error('Error sending data to backend:', error);
        }
    };

    return (
        <Container>
            <ToastContainer />
            <Title>Answers</Title>
            <Table>
                <thead>
                    <TableRow>
                        <TableHeader>Answer</TableHeader>
                        <TableHeader>Uploaded By</TableHeader>
                    </TableRow>
                </thead>
                <tbody>
                    {answer.map((a, index) => (
                        <TableRow key={index}>
                            <TableData>{a.answer}</TableData>
                            <TableData>{a.teacherName}</TableData>
                        </TableRow>
                    ))}
                </tbody>
            </Table>

            <InputContainer>
                <Input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Enter your Answer"
                />
                <SubmitButton onClick={onSubmit}>Upload</SubmitButton>
            </InputContainer>
        </Container>
    );
};

export default Answer;

// Styled Components
const Container = styled.div`
    max-width: 800px;
    margin: 20px auto;
    padding: 20px;
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    animation: fadeIn 0.5s ease-in-out;

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;

const Title = styled.h2`
    text-align: center;
    color: #495057;
    margin-bottom: 20px;
    font-family: 'Arial', sans-serif;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
`;

const TableRow = styled.tr`
    &:nth-child(even) {
        background-color: #f2f2f2;
    }
`;

const TableHeader = styled.th`
    padding: 12px;
    text-align: left;
    background-color: #007bff;
    color: white;
    border-bottom: 2px solid #0056b3;
    font-weight: bold;
`;

const TableData = styled.td`
    padding: 12px;
    border: 1px solid #dee2e6;
    text-align: left;
    border-radius: 6px;
    transition: background-color 0.3s;

    &:hover {
        background-color: #f1f1f1;
    }
`;

const InputContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 10px;
`;

const Input = styled.input`
    border: 2px solid #007bff;
    border-radius: 25px;
    padding: 12px 20px;
    margin-right: 10px;
    width: 70%;
    font-size: 16px;
    transition: border-color 0.3s;

    &:focus {
        outline: none;
        border-color: #0056b3;
        box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    }
`;

const SubmitButton = styled.button`
    padding: 1px 25px;
    background-color: #007bff;
    border: none;
    border-radius: 224px;
    color: white;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;

    &:hover {
        background-color: #0056b3;
    }
`;
