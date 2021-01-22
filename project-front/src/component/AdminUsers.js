import React, {useEffect, useState} from "react";
import AdminService from "../services/admin.service";
import Header from "./Header";
import {Jumbotron, Dropdown, Table} from "react-bootstrap";

const AdminUsers = (props) => {

    const [users, setUsers] = useState([]);

    const [deleted, setDeleted] = useState(false);

    const [param, setParam] = useState("");

    useEffect(() => {
        fetchUsers(param);
    }, []);

    useEffect(() => {
        fetchUsers(param);
        setDeleted(false);
    }, [deleted])

    useEffect(() => {
        fetchUsers(param);
    }, [param]);

    const fetchUsers = (param) => {
        AdminService.getAllUsersSorted(param).then((response) => {
            setUsers(response.data);
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
                            onSelect={(e) => setParam(e)}
                        >First Name</Dropdown.Item>
                        <Dropdown.Item
                            eventKey="lastName"
                            onSelect={(e) => setParam(e)}
                        >Last Name</Dropdown.Item>
                        <Dropdown.Item
                            eventKey="email"
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
            </Jumbotron>
        </div>
    );

};

export default AdminUsers;