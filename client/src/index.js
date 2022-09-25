import React, { StrictMode } from "react";
import { createRoot } from 'react-dom/client';
import Tasks from './pages/Tasks'
import "./styles.css";

function App() {
  return <Tasks />;
}

const rootElement = document.getElementById("app");
const root = createRoot(rootElement)

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
