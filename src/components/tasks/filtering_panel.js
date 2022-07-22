import { useDispatch } from 'react-redux';
import { setFilterBy, changeAscDesc } from '../../store/features/container_tasks_slice'
import { ToggleButton, ButtonGroup, Button } from 'react-bootstrap';

function FilteringPanel(props) {
    const list_options_filter = [
        {name: 'По Id', value: 'id'},
        {name: 'По Имени', value: 'name'},
        {name: 'По Email', value: 'email'},
        {name: 'По Статусу', value: 'status'},
    ];
    const {filtering} = props;
    const dispatch = useDispatch();

    return (
        <>
        <ButtonGroup>
            {list_options_filter.map((radio, idx) => (
            <ToggleButton
                key={idx}
                id={`radio-${idx}`}
                type="radio"
                variant='outline-success'
                name="radio"
                value={radio.value}
                checked={filtering.by === radio.value}
                onChange={(e) => dispatch(setFilterBy(e.currentTarget.value))}
            >
                {radio.name}
            </ToggleButton>
            ))}
            <Button variant="outline-info" onClick={(e) => dispatch(changeAscDesc())}>
                {filtering.asc ? <>&#8593;</>: <>&#8595;</>}
            </Button>
        </ButtonGroup>        
        </>
    )
}

export default FilteringPanel;