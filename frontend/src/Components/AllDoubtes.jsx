import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const AllDoubtes = () => {
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
        <Container>
            <Title>List of Doubts</Title>
            <Table>
                <thead>
                    <TableRow>
                        <TableHeader>Title</TableHeader>
                        <TableHeader>Description</TableHeader>
                        <TableHeader>View Answers</TableHeader>
                    </TableRow>
                </thead>
                <tbody>
                    {doubts?.Doubts?.length > 0 ? (
                        doubts?.Doubts?.map((doubt, index) => (
                            <TableRow key={index}>
                                <TableData>{doubt.title}</TableData>
                                <TableData>{doubt.description}</TableData>
                                <TableData>
                                    <Link to={`/answer/${doubt.id}`}>
                                        <StyledLink>Answer</StyledLink>
                                    </Link>
                                </TableData>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableData colSpan="3">No doubts found</TableData>
                        </TableRow>
                    )}
                </tbody>
            </Table>
        </Container>
    );
};

export default AllDoubtes;

// Styled Components
const Container = styled.div`
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    max-width: 800px;
    margin: auto;
`;

const Title = styled.h2`
    text-align: center;
    color: #343a40;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
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
`;

const TableData = styled.td`
    padding: 12px;
    border: 1px solid #dee2e6;
    text-align: left;
`;

const StyledLink = styled.span`
    color: #007bff;
    text-decoration: underline;
    cursor: pointer;

    &:hover {
        color: #0056b3;
    }
`;
