import React, {useState, useEffect} from "react";

import UserService from "../services/user.service";
import {useDispatch, useSelector} from "react-redux";
import {getAllUsers} from "../redux/actions/admin";
import AdminService from "../services/admin.service";
import {Button} from "react-bootstrap";
import Header from "./Header";

const BoardAdmin = () => {
    const [content, setContent] = useState("");

    const [users, setUsers] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        UserService.getAdminContent().then(
            (response) => {
                setContent(response.data);
            },
            (error) => {
                const _content =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setContent(_content);
            }
        );

        fetchUsers();

    }, []);

    const fetchUsers = () => {
        AdminService.getAll().then((response) => {
            setUsers(response.data);
        });
    }

    const handleDelete = (id) => {
        console.log(id);
        AdminService.deleteUser(id).then(r => fetchUsers());
    }

    return (
        <div>
            <Header/>
            <div className="container">
                <header className="jumbotron">
                    <h3>{content}</h3>
                    {/*<Button onClick={() => handleDelete(6)}>delete 6</Button>*/}
                    {users.map(user => <div key={user.email}><Button
                        onClick={() => handleDelete(user.id)}
                    >{user.email}</Button></div>)}
                </header>
            </div>
        </div>
    );
};

export default BoardAdmin;