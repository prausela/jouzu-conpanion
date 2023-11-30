import { Alert } from 'react-bootstrap';
import Item from './EditableItem';

const Items = ({items, editItem, deleteItem, refreshItems, className, style, itemUrl, addQuestion}) => {
    return (
        <div className={className} style={style}>
            { items ? items.map((item, index) =>
                <Item 
                    id={item.id}
                    item={item}
                    itemCount={items.length}
                    className="pb-5"
                    key={item.id}
                    editItem={editItem}
                    deleteItem={deleteItem}
                    refreshItems={refreshItems}
                    itemUrl={itemUrl}
                    addQuestion={addQuestion}
                    visibility={item.visibility}
                />
            ) : "" }
        </div>
    );
}

export default Items;