import { useState } from "react";
import { BrowserRouter as Router, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import CategoryController from "./controller/CategoryController";
import QuestionController from "./controller/QuestionController";
import SetController from "./controller/SetController";

const App = () => {
    const [showLogin, setShowLogin] = useState(true);
    const [authActionsPending, setAuthActionsPending] = useState([]);
    const [logInAlert, setLogInAlert] = useState("");

    return (
        <Router>
            <Routes>
                <Route path="/">
                    <Route index element={
                        <CategoryController 
                            showLogin={showLogin}
                            setShowLogin={setShowLogin}
                            authActionsPending={authActionsPending}
                            setAuthActionsPending={setAuthActionsPending}
                            logInAlert={logInAlert}
                            setLogInAlert={setLogInAlert}
                        />
                    }/>
                    <Route path="/levels/:categoryId" element={
                        <SetController
                            showLogin={showLogin}
                            setShowLogin={setShowLogin}
                            authActionsPending={authActionsPending}
                            setAuthActionsPending={setAuthActionsPending}
                            logInAlert={logInAlert}
                            setLogInAlert={setLogInAlert}
                        />
                    }/>
                    <Route path="/levels/:categoryId/sets/:setId" element={
                        <QuestionController
                            showLogin={showLogin}
                            setShowLogin={setShowLogin}
                            authActionsPending={authActionsPending}
                            setAuthActionsPending={setAuthActionsPending}
                            logInAlert={logInAlert}
                            setLogInAlert={setLogInAlert}
                        />
                    }/>
                    <Route
                        path="*"
                        element={
                            <Navigate replace to="/"/>
                        }
                    />
                </Route>
            </Routes>
        </Router>
    )
}

export default App;
