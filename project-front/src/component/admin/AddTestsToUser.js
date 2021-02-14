import React, {useEffect, useState} from "react";
import AdminService from "../../services/admin.service";
import {Jumbotron, Button, Table} from "react-bootstrap";
import Header from "../Header";
import {CheckIfAdmin} from "../../utils/roleCheck";
import {useSelector} from "react-redux";

const AddTestsToUser = (props) => {

    const [tests, setTests] = useState([]);

    const [added, setAdded] = useState(false);

    const {user: currentUser} = useSelector((state) => state.auth);

    useEffect(() => {

        CheckIfAdmin({
            user: currentUser,
            history: props.history
        });

        getTests();
    }, []);

    useEffect(() => {
        getTests();
    }, [added]);

    const getTests = () => {
        AdminService.getAvailableTests(props.match.params.id).then(
            resp => {
                setTests(resp.data)
            });
        setAdded(false);
    };

    const handleAddOneTest = (e, testId) => {
        AdminService.addOneTestToUser(props.match.params.id, testId)
            .then(() => {
                setAdded(true)
                getTests();
            });
    }

    return (
        <div>
            <Header/>
            <Jumbotron>
                <Table>
                    <tbody>
                    {tests.map(test => (
                            <tr>
                                <td>{test.title}</td>
                                <td>{test.subject}</td>
                                <td>{test.difficulty}</td>
                                <td>{test.duration}</td>
                                <td>
                                    <Button type="submit" onClick={(e) => handleAddOneTest(e, test.id)}>ADD</Button>
                                </td>
                            </tr>
                        )
                    )}
                    </tbody>
                </Table>
            </Jumbotron>
        </div>
    );

};

export default AddTestsToUser;