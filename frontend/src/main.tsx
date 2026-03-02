import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PrimeReactProvider } from "primereact/api";
import { store } from "./app/store.ts";
import App from "./App.tsx";

import "./styles/BootStrap.css";

import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PrimeReactProvider>
        <App />
      </PrimeReactProvider>
    </Provider>
  </StrictMode>,
);
