import { Pagination } from 'react-bootstrap';
import { useDispatch } from 'react-redux'
import { goToStartPage, goToPrevPage, goToNextPage, goToLastPage } from '../../store/features/container_tasks_slice'

function PaginationTasks(props) {
    const {start, prev, next, last} = props.pages;
    const dispatch = useDispatch();
    return (
      <>
        { 
          (start || prev || next || last) ? (    
            <Pagination>
              { start ? (<Pagination.First onClick={() => dispatch(goToStartPage())}/>) : null}
              { prev ? (<Pagination.Prev onClick={() => dispatch(goToPrevPage())}/>) : null}
              { next ? (<Pagination.Next onClick={() => dispatch(goToNextPage())}/>) : null}
              { last ? (<Pagination.Last onClick={() => dispatch(goToLastPage())}/>) : null}
            </Pagination>
            ) : null}
      </>
    )
}

export default PaginationTasks;