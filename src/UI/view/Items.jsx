import { Alert } from 'react-bootstrap';
import Item from './EditableItem';

const Items = ({items, editItem, deleteItem, className, style, itemUrl, addQuestion}) => {
    return (
        <div className={className} style={style}>
            { items ? items.map((item, index) =>
                <Item 
                    id={item.id}
                    item={item}
                    className="pb-5"
                    key={item.id}
                    editItem={editItem}
                    deleteItem={deleteItem}
                    itemUrl={itemUrl}
                    addQuestion={addQuestion}
                    visibility={item.visibility}
                />
            ) : "" }
        </div>
    );
}

export default Items;