import { useEffect, useState } from "react";
import CategoryService from "../../logic/CategoryService";
import { CREATED, NO_CONTENT, OK, UNAUTHORIZED } from "../config/apiConstants";
import ItemInterface from "../view/ItemInterface";

const CategoryController = ({showLogin, setShowLogin, authActionsPending, setAuthActionsPending, logInAlert, setLogInAlert}) => {
    const [items, setItems] = useState([]);
    const [menuAlert, setMenuAlert] = useState({});

    const categoryUrl = (id) => `/levels/${id}`;

    useEffect(() => {
        setMenuAlert({variant: "primary", value:"Espere..."});
        CategoryService.getAllCategories().then((response) => {
            if (response.status !== OK) {
                setMenuAlert({variant: "danger", value:"Ocurrió un error. Refrezque la página"});
                return;
            }
            if (response.data) setItems(response.data);
            setMenuAlert({variant: "success", value:"Niveles cargados exitosamente"});
            setTimeout(() => {
                setMenuAlert({});
            }, 3000);
        })
    }, []);

    const addItem  = async (name, setAlert) => {
        setMenuAlert({variant: "primary", value:"Espere..."});
        return CategoryService.createCategory(name).then(response => {
            if (response.status === CREATED) {
                setItems([...items, response.data]);
                setAlert("");
                setMenuAlert({variant: "success", value:"Niveles cargados exitosamente"});
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
            setAlert("Ocurrió un error al intentar crear el nivel. Intente nuevamente");
            setMenuAlert({});
            return false;
        });
    }

    const editItem = async (id, name, setAlert) => {
        setMenuAlert({variant: "primary", value:"Espere..."});
        return CategoryService.changeCategory(id, name, "visible").then((response) => {
            if (response.status === OK) {
                let newItems = [...items];
                let modifiedItem = newItems.find(item => item.id === id);
                modifiedItem.name = name;
                setItems(newItems);
                setAlert("");
                setMenuAlert({variant: "success", value:"Niveles cargados exitosamente"});
                setTimeout(() => {
                    setMenuAlert({});
                }, 3000);
                return true;
            } else if (response.status === UNAUTHORIZED) {
                const newAuthActionsPending = [...authActionsPending, () => editItem(id, name, setAlert)];
                setAuthActionsPending(newAuthActionsPending);
                setLogInAlert("Necesitás ingresar nuevamente para completar la acción");
                setShowLogin(true);
                setAlert("");
                setMenuAlert({});
                return true;
            }
            setMenuAlert({});
            setAlert("Ocurrió un error al intentar editar el nivel. Intente nuevamente");
            return false;
        });
    }

    const deleteItem = async (id, setAlert) => {
        setMenuAlert({variant: "primary", value:"Espere..."});
        return CategoryService.removeCategory(id).then((response) => {
            if (response.status === NO_CONTENT) {
                setItems(items.filter(item => item.id !== id));
                setAlert("");
                setMenuAlert({variant: "success", value:"Niveles cargados exitosamente"});
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
            setMenuAlert({});
            setAlert("Ocurrió un error al intentar eliminar el nivel. Intente nuevamente");
            return false;
        })
    }

    return (
        <ItemInterface 
            items={items}
            title="Niveles"
            addItem={addItem}
            editItem={editItem}
            deleteItem={deleteItem}
            setShowLogin={setShowLogin}
            showLogin={showLogin}
            logInAlert={logInAlert}
            setLogInAlert={setLogInAlert}
            authActionsPending={authActionsPending}
            setAuthActionsPending={setAuthActionsPending}
            itemUrl={categoryUrl}
            menuAlert={menuAlert}
        />
    )
}

export default CategoryController;