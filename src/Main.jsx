import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux/store/store.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import { App } from "./App.js";
import { BrowserRouter } from "react-router-dom";



ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>

        <BrowserRouter>  <App /></BrowserRouter>


    </Provider>
);
