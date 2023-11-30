import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CategoryService from "../../logic/CategoryService";
import SetService from "../../logic/SetService";
import { CREATED, NO_CONTENT, OK, UNAUTHORIZED } from "../config/apiConstants";
import ItemInterface from "../view/ItemInterface";

const SetController = ({showLogin, setShowLogin, authActionsPending, setAuthActionsPending, logInAlert, setLogInAlert}) => {
    const [items, setItems] = useState(null);
    const [category, setCategory] = useState({});
    const [menuAlert, setMenuAlert] = useState({});

    const { categoryId } = useParams();

    const setUrl = (id) => `/levels/${categoryId}/sets/${id}`;

    useEffect(() => {
        refreshItems();
    }, []);

    const refreshItems = () => {
        setItems(null);
        setMenuAlert({variant: "primary", value:"Espere..."});
        CategoryService.findCategory(categoryId).then((response) => {
            if (response.status !== OK) {
                setMenuAlert({variant: "danger", value:"Ocurrió un error. Refrezque la página"});
                return;
            }
            if (response.data) setCategory(response.data);
        })

        SetService.getAllSets(categoryId).then((response) => {
            if (response.status !== OK) {
                setMenuAlert({variant: "danger", value:"Ocurrió un error. Refrezque la página"});
                return;
            }
            if (response.data) setItems(response.data);
            setMenuAlert({variant: "success", value:"Sets cargados exitosamente"});
            setTimeout(() => {
                setMenuAlert({});
            }, 3000);
        })
    }

    const addItem  = async (name, setAlert) => {
        setMenuAlert({variant: "primary", value:"Espere..."});
        return SetService.createSet(categoryId, name).then(response => {
            if (response.status === CREATED) {
                setItems([...items, response.data]);
                setAlert("");
                setMenuAlert({variant: "success", value:"Sets cargados exitosamente"});
                setTimeout(() => {
                    setMenuAlert({});
                }, 3000);
                return true;
            } else if (response.status === UNAUTHORIZED) {
                const newAuthActionsPending = [...authActionsPending, () => addItem(name, setAlert)];
                setAuthActionsPending(newAuthActionsPending);
                setLogInAlert("Necesitás ingresar nuevamente para completar la acción");
                setShowLogin(true);
                setAlert("");
                setMenuAlert({});
                return true;
            }
            setAlert("Ocurrió un error al intentar crear el set. Intente nuevamente");
            setMenuAlert({});
            return false;
        });
    }

    const editItem = async (id, name, position, visibility, setAlert) => {
        setMenuAlert({variant: "primary", value:"Espere..."});
        return SetService.changeSet(categoryId, id, name, position, visibility).then((response) => {
            if (response.status === OK) {
                let newItems = [...items];
                let modifiedItem = newItems.find(item => item.id === id);
                modifiedItem.name = name;
                setItems(newItems);
                setAlert ? setAlert("") : "";
                setMenuAlert({variant: "success", value:"Sets cargados exitosamente"});
                setTimeout(() => {
                    setMenuAlert({});
                }, 3000);
                return true;
            } else if (response.status === UNAUTHORIZED) {
                const newAuthActionsPending = [...authActionsPending, () => editItem(id, name, position, visibility, setAlert)];
                setAuthActionsPending(newAuthActionsPending);
                setLogInAlert("Necesitás ingresar nuevamente para completar la acción");
                setShowLogin(true);
                setAlert ? setAlert("") : "";
                setMenuAlert({});
                return true;
            }
            setMenuAlert({});
            setAlert ? setAlert("Ocurrió un error al intentar editar el set. Intente nuevamente") : "";
            return false;
        });
    }

    const deleteItem = async (id, setAlert) => {
        setMenuAlert({variant: "primary", value:"Espere..."});
        return SetService.removeSet(categoryId, id).then((response) => {
            if (response.status === NO_CONTENT) {
                //setItems(items.filter(item => item.id !== id));
                refreshItems();
                setAlert("");
                setMenuAlert({variant: "success", value:"Sets cargados exitosamente"});
                setTimeout(() => {
                    setMenuAlert({});
                }, 3000);
                return true;
            } else if (response.status === UNAUTHORIZED) {
                const newAuthActionsPending = [...authActionsPending, () => deleteItem(id, setAlert)];
                setAuthActionsPending(newAuthActionsPending);
                setLogInAlert("Necesitás ingresar nuevamente para completar la acción");
                setShowLogin(true);
                setAlert("");
                setMenuAlert({});
                return true;
            }
            setAlert("Ocurrió un error al intentar eliminar el set. Intente nuevamente");
            setMenuAlert({});
            return false;
        })
    }

    return (
        <ItemInterface 
            items={items}
            title={category.name ? category.name : ""}
            addItem={addItem}
            editItem={editItem}
            deleteItem={deleteItem}
            refreshItems={refreshItems}
            setShowLogin={setShowLogin}
            showLogin={showLogin}
            logInAlert={logInAlert}
            setLogInAlert={setLogInAlert}
            authActionsPending={authActionsPending}
            setAuthActionsPending={setAuthActionsPending}
            itemUrl={setUrl}
            menuAlert={menuAlert}
        />
    )
}

export default SetController;