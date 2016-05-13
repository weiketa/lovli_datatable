import React from 'react';
import { subscribe } from 'horizon-react';
import {Table,Column,Cell} from 'fixed-data-table';


const mapDataToProps = {
    todos: (hz, props) => hz('todos')
};


const DataTable = (props) => (
        <Table
            rowsCount={props.todos.length}
            rowHeight={50}
            headerHeight={50}
            width={1000}
            height={500}>
                <Column
            header={<Cell>ID</Cell>}
            cell={f_props => (
            <Cell {...f_props}>
            {props.todos[f_props.rowIndex].id}
            </Cell>
            )}
            width={400}
            />
            <Column
            header={<Cell>Text</Cell>}
            cell={f_props => (
            <Cell {...f_props}>
            {props.todos[f_props.rowIndex].text}
            </Cell>
            )}
            width={300}
            />
        </Table>
    )


export default subscribe({
    mapDataToProps
})(DataTable);


