import React, {useEffect, useState} from "react";
import AdminService from "../services/admin.service";
import {Jumbotron, Button, Table} from "react-bootstrap";
import Header from "./Header";

const AddTestsToUser = (props) => {

    const [tests, setTests] = useState([]);

    const [added, setAdded] = useState(false);

    useEffect(() => {
        getTests();
    }, []);

    useEffect(()=>{
        getTests();
    },[added]);

    const getTests = () => {
        AdminService.getAvailableTests(props.match.params.id).then(
            resp => {
                console.log(resp.data);
                setTests(resp.data)
            });
        setAdded(false);
    };

    const handleAddOneTest = (e, testId) => {
        AdminService.addOneTestToUser(props.match.params.id, testId);
        setAdded(true)
        getTests();
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