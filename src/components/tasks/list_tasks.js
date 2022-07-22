import { Row, Col } from 'react-bootstrap';
import Task from './task';

function ListTasks(props) {
    const {tasks} = props;
    return (
      <>
        {tasks.map((task) => (
          <Row key={task.id}>
            <Col>
              <Task {...task} {...props} />
            </Col>
          </Row>
        ))}
      </>
    )
}

export default ListTasks;  