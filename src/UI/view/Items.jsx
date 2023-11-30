import { Alert } from 'react-bootstrap';
import Item from './EditableItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBrush } from '@fortawesome/free-solid-svg-icons';

const Items = ({items, editItem, deleteItem, refreshItems, className, style, itemUrl, addQuestion}) => {
    return (
        <div className={className} style={style}>
            { items ? (items.length > 0 ? items.map((item, index) =>
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
            ) : (
                <div className="p-5 text-center">
                    <FontAwesomeIcon icon={faBrush} style={{fontSize: "7rem"}}/>
                    <span className="pt-5 d-block" style={{fontSize: "1.5rem"}}>
                        Esta vac&iacute;o, ¿v&eacute;s? <br /> No hay contenido aqu&iacute; :&#x29;
                    </span>
                    
                    <span className="p-3 d-block" />
                    Hace click en <strong>Agregar</strong> para empezar a crear contenido
                </div>
            )) : "" }
        </div>
    );
}

export default Items;