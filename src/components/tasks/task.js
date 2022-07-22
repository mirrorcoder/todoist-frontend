import { Card } from 'react-bootstrap';
import { useDispatch } from 'react-redux'
import { showModalEditTask } from '../../store/features/modal_edit_slice'


function BodyTask(props) {
    const dispatch = useDispatch()
    const on_show_modal = () => dispatch(showModalEditTask({...props}))
    const {name_user, email_user, desc_task, is_edit_admin} = props;
    return (
      <Card.Body>
        <Card.Title>
          {name_user} ({email_user}) {is_edit_admin ? "Отредактирован администратором" : null}
        </Card.Title>
        <Card.Text className="display-linebreak">
          {desc_task}
        </Card.Text>
        {props.is_logged ? (<Card.Link href="#" onClick={on_show_modal}>Edit</Card.Link>): null}
      </Card.Body>
    )
}
  
function DoneTask(props) {
    return (
        <Card
        bg="success"
        text="white"  
        >
        {props.children}
        </Card>
    )
}

function NeedDidTask(props) {
    return (
        <Card>
        {props.children}
        </Card>
    )
}
  

function Task(props) {
    const {is_done} = props;
    return (
      <>
        {is_done ? (
        <DoneTask>
          <BodyTask {...props}/>
        </DoneTask>) : (
        <NeedDidTask {...props}>
          <BodyTask {...props}/>
        </NeedDidTask>)}
      </>
    )
}

export default Task;
  