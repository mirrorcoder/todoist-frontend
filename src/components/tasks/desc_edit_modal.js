import axios from 'axios';
import config from '../../config';
import Cookie from 'js-cookie';
import { Form, Button, FloatingLabel, Row, Col, Modal } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { dropTasksContainer } from '../../store/features/container_tasks_slice'
import { hideModalEditTask, updateTask } from '../../store/features/modal_edit_slice'

function DescEditModal() {
    const state_desc_edit_modal = useSelector((state) => state.modalEditTask)
    const {is_show, task_id, desc_task, is_done} = state_desc_edit_modal;
    const dispatch = useDispatch();
    const on_hide = () => dispatch(hideModalEditTask());
    const on_change_checkbox_done = (e) => dispatch(updateTask({is_done: e.target.checked}))
    const on_change_textarea_desc = (e) => dispatch(updateTask({desc_task: e.target.value}))
    const on_save_change = () => {
        const json = JSON.stringify({
            desc_task: desc_task,
            is_done: is_done,
            token: Cookie.get('token')
        });
        axios.post(`${config.api_url}/api/tasks/${task_id}`, json, {
            headers: {
              'Content-Type': 'application/json'
            }
        }).then(res => {
            dispatch(dropTasksContainer({}))
            on_hide();
            alert("Задача обновлена!");            
        }).catch(e => {
            alert("Ошибка! Задача не обновлена!");
        });

    }

    return (
      <Modal
        show={is_show}
        onHide={on_hide}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Редактирование описания
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col>
                <FloatingLabel controlId="floatingTextareaEditDesc" label="Comments">
                    <Form.Control
                    value={desc_task}
                    as="textarea"
                    placeholder="Описание задачи"
                    className="desc_task_textarea"
                    onChange={on_change_textarea_desc}
                    />
                </FloatingLabel>
              </Col>            
            </Row>
            <Row>
                <Col>
                    <Form.Check type="switch" label="Выполнено" checked={is_done} onChange={on_change_checkbox_done}/>
                </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={on_hide}>Закрыть</Button>
          <Button onClick={on_save_change}>Сохранить</Button>
        </Modal.Footer>
      </Modal>
    );  
}

export default DescEditModal;