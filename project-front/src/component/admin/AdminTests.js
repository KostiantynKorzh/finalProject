import React, {useEffect, useState} from "react";
import Header from "../Header";
import {Pagination, Dropdown, Jumbotron, Table} from "react-bootstrap";
import TestService from "../../services/test.service";
import {CheckIfAdmin} from "../../utils/roleCheck";
import {useSelector} from "react-redux";

const AdminTests = (props) => {

    const [tests, setTests] = useState([]);

    const [deleted, setDeleted] = useState(false);

    const [param, setParam] = useState("");

    const [currentPage, setCurrentPage] = useState(0);
    const [sizePage, setSizePage] = useState(0);

    const [pages, setPages] = useState([]);

    const {user: currentUser} = useSelector((state) => state.auth);

    useEffect(() => {

        CheckIfAdmin({
            user: currentUser,
            history: props.history
        });

        getTestsSorted(param, currentPage);
        for (let i = 0; i < sizePage; i++) {
            setPages(prevState => [...prevState, <Pagination.Item>
                {i + 1}
            </Pagination.Item>]);
        }
    }, []);

    useEffect(() => {
        setPages([]);
        for (let i = 0; i < sizePage; i++) {
            setPages(prevState => [...prevState,
                <Pagination.Item
                    key={i}
                    active={i === currentPage}
                    onClick={() => {
                        if (i !== currentPage) {
                            getTestsSorted(param, i);
                            setCurrentPage(i);
                        }
                    }}>
                    {i + 1}
                </Pagination.Item>]);
        }
    }, [sizePage, currentPage]);

    useEffect(() => {
        getTestsSorted(param, currentPage);
        setDeleted(false);
    }, [deleted])

    useEffect(() => {
        getTestsSorted(param, currentPage);
    }, [param]);

    const getTestsSorted = (param, page) => {
        TestService.getAllTessSorted(param, page).then(
            resp => {
                setTests(resp.data.content);
                setCurrentPage(resp.data.number);
                setSizePage(resp.data.totalPages);

            }
        )
    }

    const TableColumnsTests = () => {
        return (
            tests.map(test =>
                <tbody key={test.id}>
                <tr>
                    <td>{test.id}</td>
                    <td>{test.title}</td>
                    <td>{test.subject}</td>
                    <td>{test.difficulty}</td>
                    <td>{test.duration}</td>
                    <td>
                        <Dropdown>
                            <Dropdown.Toggle>
                                More
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item
                                    onClick={() => {
                                        TestService.deleteTest(test.id).then(
                                            () => setDeleted(true));
                                    }}
                                >Delete</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </td>
                </tr>
                </tbody>));
    };

    return (
        <div>
            <Header/>
            <Jumbotron>
                <Dropdown>
                    <Dropdown.Toggle>
                        Sort By
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item
                            eventKey="title"
                            active={"title" === param}
                            onSelect={(e) => setParam(e)}
                        >Title</Dropdown.Item>
                        <Dropdown.Item
                            eventKey="subject"
                            active={"subject" === param}
                            onSelect={(e) => setParam(e)}
                        >Subject</Dropdown.Item>
                        <Dropdown.Item
                            eventKey="difficulty"
                            active={"difficulty" === param}
                            onSelect={(e) => setParam(e)}
                        >Difficulty</Dropdown.Item>
                        <Dropdown.Item
                            eventKey="duration"
                            active={"duration" === param}
                            onSelect={(e) => setParam(e)}
                        >Duration</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Table striped bordered>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Subject</th>
                        <th>Difficulty</th>
                        <th>Duration</th>
                    </tr>
                    </thead>
                    <TableColumnsTests/>
                </Table>
                <Pagination>
                    {pages}
                </Pagination>
            </Jumbotron>
        </div>
    );

};

export default AdminTests;