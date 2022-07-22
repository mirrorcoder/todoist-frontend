import axios from 'axios';
import config from '../../config';
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, FloatingLabel, Row, Col } from 'react-bootstrap';
import { dropTasksContainer } from '../../store/features/container_tasks_slice'
import { setValidated, setName, setEmail, setDesc } from '../../store/features/add_task_slice'

function AddTask() {
    const state_add_task_form = useSelector((state) => state.addTaskForm);
    const {name, email, desc, validated} = state_add_task_form;
    const dispatch = useDispatch();

    const clearStates = () => {
        dispatch(setName(''));
        dispatch(setEmail(''));
        dispatch(setDesc(''));
    }

    const handleNameChange = (e) => {
        dispatch(setName(e.target.value));
    }

    const handleEmailChange = (e) => {
        dispatch(setEmail(e.target.value));
    }

    const handleDescChange = (e) => {
        dispatch(setDesc(e.target.value));
    }

    const handleSubmitTask = (e) => {
        const form = e.currentTarget;
        if (form.checkValidity() === true) {
            dispatch(setValidated(true));
            const json = JSON.stringify({
                    name_user: name,
                    email_user: email,
                    desc_task: desc,
                    is_done: false,            
                });
            axios.post(`${config.api_url}/api/tasks/`, json, {
                headers: {
                  'Content-Type': 'application/json'
                }
              }).then(res => {
                clearStates();
                dispatch(dropTasksContainer({}))
                alert("Задача добавлена!");            
            }).catch(e => {
                alert("Ошибка сети, задача не добавлена!");
            });
        } else {
            dispatch(setValidated(false));
        }
        e.preventDefault();
        e.stopPropagation();
    };

    return (            
    <Form validated={validated} onSubmit={handleSubmitTask}>
        <Row>
          <Col><h3>Добавь задачу</h3></Col>                  
        </Row>
        <Row>
          <Col>
            <FloatingLabel
            controlId="floatingInputEmail"
            label="Email address"
            className="mb-3"
            >
            <Form.Control required type="email" placeholder="name@example.com" value={email} onChange={handleEmailChange}/>
            </FloatingLabel>              
          </Col>
          <Col>
            <FloatingLabel
            controlId="floatingInputName"
            label="Имя пользователя"
            className="mb-3"
            >
              <Form.Control required type="text" placeholder="Elon Mask, Jonh, etc" value={name} onChange={handleNameChange}/>
            </FloatingLabel>
          </Col>
        </Row>
        <Row>
          <Col>
            <FloatingLabel controlId="floatingTextarea2" label="Comments">
              <Form.Control
              required
              as="textarea"
              placeholder="Описание задачи"
              className="desc_task_textarea"
              value={desc} onChange={handleDescChange}
              />
            </FloatingLabel>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <Button variant="primary" type="submit">
              Создать
            </Button>
          </Col>
        </Row>
    </Form>
      )
}

export default AddTask;