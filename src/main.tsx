import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { StrictMode } from "react";
import "./index.css";
import { UserProvider } from "./contexts/UserContext";
import { BlogProvider } from "./contexts/BlogContext";
import { MentorProvider } from "./contexts/MentorContext";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserProvider>
      <BlogProvider>
        <MentorProvider>
          <App />
        </MentorProvider>
      </BlogProvider>
    </UserProvider>
  </StrictMode>
);
