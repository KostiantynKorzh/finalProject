import React, {useEffect, useState} from "react";
import {Modal} from "react-bootstrap";

const CreateTestModal = ({props}) => {

    const [createTestShow, setCreateTestShow] = useState(false);

    useEffect(() => {
        console.log("Here", props.createTestShow);
        setCreateTestShow(props.createTestShow);
    }, []);

    // const modalHide = () => {
    //     setCreateTestShow(false);
    // }

    return (
        <Modal
            onShow={props.createTestShow}
            // onShow={props.createTestShow}
            onHide={() => props.setCreateTestShow(false)}
            // onHide={() => modalHide()}
            animation={false}
        >
            <Modal.Header>Creating test</Modal.Header>
            <Modal.Body>
                {/*<Form>*/}
                {/*    <Form.Group controlId="formTestTitle">*/}
                {/*        <Form.Label>Test Title</Form.Label>*/}
                {/*        <Form.Control type="text" name="testTitle"*/}
                {/*        />*/}
                {/*    </Form.Group>*/}

                {/*    <Form.Group controlId="formSubject">*/}
                {/*        <Form.Label>Last Name</Form.Label>*/}
                {/*        <Form.Control as="select" name="subject"*/}
                {/*        >*/}
                {/*            <option>First</option>*/}
                {/*            <option>Second</option>*/}
                {/*            <option>Third</option>*/}
                {/*        </Form.Control>*/}
                {/*    </Form.Group>*/}
                {/*</Form>*/}
                <h2>Hi</h2>
            </Modal.Body>
        </Modal>
    );

};

export default CreateTestModal;