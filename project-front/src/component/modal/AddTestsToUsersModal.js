import React, {useEffect, useState} from "react";
import {Button, Modal, Table} from "react-bootstrap";
import AdminService from "../../services/admin.service";

const AddTestsToUsersModal = ({props}) => {

    const [tests, setTests] = useState([]);
    const [testsModalShow, setTestsModalShow] = useState(false);
    const [userToAddTests, setUserToAddTests] = useState(0);

    useEffect(() => {
        setTests(props.tests);
        setTestsModalShow(props.testsModalShow);
        setUserToAddTests(props.userToAddTests);
    });

    const handleAddOneTest = (e, id) => {
        AdminService.addOneTestToUser(userToAddTests, id);
        AdminService.getAvailableTests(id).then(
            (response) => {
                setTests(response.data);
            },
            (error) => {
                const _content =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

            }
        );
    }

    return (
        <Modal show={testsModalShow}
               onHide={() => props.setTestsModalShow(false)}
               animation={false}
        >
            <Modal.Header>Add tests</Modal.Header>
            <Modal.Body>
                <Table>
                    <tbody>
                    {tests.map(test => (
                            <tr>
                                <td>{test.title}</td>
                                <td>{test.subject}</td>
                                <td>{test.difficulty}</td>
                                {/*<td>{test.created}</td>*/}
                                <td>
                                    <Button type="submit" onClick={(e) => handleAddOneTest(e, test.id)}>ADD</Button>
                                </td>
                            </tr>
                        )
                    )}
                    </tbody>
                    {/*<Button onClick={() => handleAddTestsSubmit}>Submit</Button>*/}
                </Table>
            </Modal.Body>
        </Modal>
    )
};

export default AddTestsToUsersModal;