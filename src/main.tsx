import ReactDOM from "react-dom/client";
import App from "./App";
import { MyContextProvider } from "./Context";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
<MyContextProvider>
    <App />
</MyContextProvider>
);
