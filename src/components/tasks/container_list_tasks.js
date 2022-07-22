import axios from 'axios';
import config from '../../config';
import { useDispatch } from 'react-redux'
import { Row, Col } from 'react-bootstrap';
import PaginationTasks from './paginations_tasks';
import ListTasks from './list_tasks';
import { updateTasksContainer, failedTasksContainer } from '../../store/features/container_tasks_slice'
import FilteringPanel from './filtering_panel';


function ContainerListTasks(props) {
    const dispatch = useDispatch();
    const {tasks, pages, status, filtering, is_logged} = props;
    if (status === 'idle') {
        axios.get(`${config.api_url}/api/tasks`, {params: {
            page: pages.current,
            field: filtering.by,
            type: (filtering.asc ? 'asc': 'desc')
        }}).then(res => {
            const {tasks, pages} = res.data;
            dispatch(updateTasksContainer({
                tasks: tasks,
                pages: pages
            }))
        
        }).catch(e => {
            dispatch(failedTasksContainer(e.message));
        });
    }
    return (
      <>
        { status === 'idle' ? null : ( <>
        <Row className="mt-1 mb-1">
            <Col>
                <FilteringPanel filtering={filtering}></FilteringPanel>
            </Col>
        </Row>
        <ListTasks tasks={tasks} is_logged={is_logged}/>
        <Row className="mt-1">
          <Col>
            <PaginationTasks pages={pages}/>
          </Col>
        </Row>      </>
        )}
      </>
    )
  }

  export default ContainerListTasks;