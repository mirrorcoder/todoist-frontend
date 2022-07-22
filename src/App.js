import React from 'react';  
import { Container, Form, Navbar, Button, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux'
import './App.css';
import ContainerListTasks from './components/tasks/container_list_tasks';
import { updateLoggedUser } from './store/features/container_tasks_slice';
import AddTask from './components/tasks/add_task';
import LoginModal from './components/auth/login_modal';
import DescEditModal from './components/tasks/desc_edit_modal';
import Cookies from 'js-cookie';
import { showModalLogin } from './store/features/modal_login_slice'

function App() {
  const container_tasks = useSelector((state) => state.containerTasks)
  const dispatch = useDispatch();
  const on_logout = () => {
    Cookies.remove('token');
    dispatch(updateLoggedUser({is_logged: false}));
  }
  const {is_logged} = container_tasks;
  return (
    <>
      <Navbar bg='dark' variant="dark">
        <Container>
          <Navbar.Brand href="#">TODOist</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll"/>
          <Navbar.Collapse id="navbarScroll" className="justify-content-end">
            <Form>
              { is_logged ? (<Button variant="outline-danger" onClick={on_logout}>Log out</Button>) : (<Button variant="outline-success" onClick={() => dispatch(showModalLogin())}>Login</Button>)}
            </Form> 
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <Row className="mt-3">
          <Col>
            <ContainerListTasks {...container_tasks}/>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <AddTask/>
          </Col>
        </Row>
      </Container>
      <LoginModal/>
      <DescEditModal/>
    </>
  );
}

export default App;
