import axios from 'axios';
import config from '../../config';
import Cookie from 'js-cookie';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { updateLoggedUser } from '../../store/features/container_tasks_slice'
import { hideModalLogin, updateUsername, updatePassword } from '../../store/features/modal_login_slice'
import { Form, Button, FloatingLabel, Row, Col, Modal } from 'react-bootstrap';

function LoginModal() {
    const state_login_modal = useSelector((state) => state.modalLogin)
    const {username, password, is_show} = state_login_modal
    const dispatch = useDispatch();
    const handleUsernameChange = (e) => {
        dispatch(updateUsername(e.target.value));
    }
    const handlePasswordChange = (e) => {
        dispatch(updatePassword(e.target.value));
    }
    const handler_login = (e) => {
        if (!(username && password)) {
            alert('Заполинте поля');
            return
        }
        const json = JSON.stringify({
                username: username,
                password: password         
        });
        
        axios.post(`${config.api_url}/api/tasks/auth`, json, {
            headers: {
                'Content-Type': 'application/json'
            }
            }).then(res => {
                dispatch(updateLoggedUser({is_logged: true}))
                Cookie.set('token', res.data.token);
                dispatch(hideModalLogin());
                alert("Вы авторизованы!");            
        }).catch(e => {
            alert("Авторизация неудачна!");
        });
        e.preventDefault();
        e.stopPropagation();          
    }  
    return (
        <Modal
        show={is_show}
        onHide={() => dispatch(hideModalLogin())}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
            Авторизация
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
            <Row>
                <Col>props
                <FloatingLabel
                    controlId="floatingInputEmailLogin"
                    label="Email address"
                    className="mb-3"
                    >
                    <Form.Control type="text" placeholder="name@example.com" value={username} onChange={handleUsernameChange}/>
                </FloatingLabel>    

                <FloatingLabel
                    controlId="floatingInputPassword"
                    label="password"
                    className="mb-3"
                    >
                    <Form.Control type="password" placeholder="name@example.com" value={password} onChange={handlePasswordChange}/>
                </FloatingLabel>    
                </Col>            
            </Row>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={() => dispatch(hideModalLogin())}>Close</Button>
            <Button onClick={handler_login}>Войти</Button>
        </Modal.Footer>
        </Modal>
    );  
}

export default LoginModal;