import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext.tsx";
import { EventsProvider } from "./contexts/EventsContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <EventsProvider>
          <App />
        </EventsProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);
