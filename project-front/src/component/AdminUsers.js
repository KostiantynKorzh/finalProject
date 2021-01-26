import React, {useEffect, useState} from "react";
import AdminService from "../services/admin.service";
import Header from "./Header";
import {Jumbotron, Dropdown, Table, Pagination} from "react-bootstrap";

const AdminUsers = (props) => {

    const [users, setUsers] = useState([]);

    const [deleted, setDeleted] = useState(false);

    const [param, setParam] = useState("");

    const [currentPage, setCurrentPage] = useState(0);
    const [sizePage, setSizePage] = useState(0);

    const [pages, setPages] = useState([]);

    useEffect(() => {
        fetchUsers(param, currentPage);
    }, []);

    useEffect(() => {
        fetchUsers(param, currentPage);
        setDeleted(false);
    }, [deleted])

    useEffect(() => {
        fetchUsers(param, currentPage);
    }, [param]);

    useEffect(() => {
        setPages([]);
        for (let i = 0; i < sizePage; i++) {
            setPages(prevState => [...prevState,
                <Pagination.Item
                    key={i}
                    active={i === currentPage}
                    onClick={() => {
                        if (i !== currentPage) {
                            fetchUsers(param, i);
                            setCurrentPage(i);
                        }
                    }}>
                    {i + 1}
                </Pagination.Item>]);
        }
    }, [sizePage, currentPage]);

    const fetchUsers = (param, page) => {
        AdminService.getAllUsersSorted(param, page).then(
            resp => {
                console.log(resp.data);
                setUsers(resp.data.content);
                setCurrentPage(resp.data.number);
                setSizePage(resp.data.totalPages);

            });
    };

    const TableColumns = () => {
        return (
            users.map(user =>
                <tbody key={user.id}>
                <tr>
                    <td>{user.id}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>
                        <Dropdown>
                            <Dropdown.Toggle>
                                More
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item
                                    onClick={(e) => {
                                        props.history.push('/admin/' + user.id + '/addTests');
                                        window.location.reload();
                                    }}
                                >Add tests</Dropdown.Item>
                                <Dropdown.Item
                                    onClick={() => {
                                        props.history.push('/admin/editUser/' + user.id);
                                        window.location.reload();
                                    }}
                                >Edit</Dropdown.Item>
                                <Dropdown.Item
                                    // onClick={() => handleEdit(user)}
                                >Block</Dropdown.Item>
                                <Dropdown.Item
                                    onClick={() => {
                                        AdminService.deleteUser(user.id).then(
                                            () => setDeleted(true)
                                        );
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
                            eventKey="firstName"
                            active={"firstName" === param}
                            onSelect={(e) => setParam(e)}
                        >First Name</Dropdown.Item>
                        <Dropdown.Item
                            eventKey="lastName"
                            active={"lastName" === param}
                            onSelect={(e) => setParam(e)}
                        >Last Name</Dropdown.Item>
                        <Dropdown.Item
                            eventKey="email"
                            active={"email" === param}
                            onSelect={(e) => setParam(e)}
                        >Email</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Table striped bordered>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                    </tr>
                    </thead>
                    <TableColumns/>
                </Table>
                <Pagination>
                    {pages}
                </Pagination>
            </Jumbotron>
        </div>
    );

};

export default AdminUsers;