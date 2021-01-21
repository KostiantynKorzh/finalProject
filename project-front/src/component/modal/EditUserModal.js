import React, {useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";

const EditUserModal = () => {

    const [userEditModalShow, setUserEditModalShow] = useState(false);


    return (<div></div>
        // <Modal show={userEditModalShow}
        //        onHide={() => props.setModal(false)}
        //        animation={false}
        // >
        //     <Modal.Header>Editing User</Modal.Header>
        //     <Modal.Body>
        //         <Form>
        //             <Form.Group controlId="formFirstName">
        //                 <Form.Label>First Name</Form.Label>
        //                 <Form.Control type="text" name="firstName"
        //                               onChange={(e) => onChangeFirstName(e)}
        //                               value={firstNameTemp}
        //                               isInvalid={!!firstNameError}
        //                 />
        //                 {firstNameError && (
        //                     <Form.Control.Feedback type="invalid">
        //                         {firstNameError}
        //                     </Form.Control.Feedback>
        //                 )}
        //             </Form.Group>
        //
        //             <Form.Group controlId="formLastName">
        //                 <Form.Label>Last Name</Form.Label>
        //                 <Form.Control type="text" name="lastName"
        //                               onChange={(e) => onChangeLastName(e)}
        //                               value={lastNameTemp}
        //                               isInvalid={!!lastNameError}
        //                 />
        //                 {lastNameError && (
        //                     <Form.Control.Feedback type="invalid">
        //                         {lastNameError}
        //                     </Form.Control.Feedback>
        //                 )}
        //             </Form.Group>
        //
        //             <Button variant="primary"
        //                     onClick={(e) => handleEditModal(e)}>
        //                 Edit
        //             </Button>
        //         </Form>
        //     </Modal.Body>
        // </Modal>
    );
};

export default EditUserModal;