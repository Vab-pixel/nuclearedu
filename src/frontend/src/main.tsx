import { InternetIdentityProvider } from "@caffeineai/core-infrastructure";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { useAppStore } from "./store/useAppStore";

// Apply persisted dark mode from store before first paint, then keep in sync
function applyDarkMode(dark: boolean) {
  document.documentElement.classList.toggle("dark", dark);
}

// Apply immediately from persisted store (before React renders)
applyDarkMode(useAppStore.getState().darkMode);

// Subscribe to future changes so toggleDarkMode() is reflected in the DOM
useAppStore.subscribe((state) => {
  applyDarkMode(state.darkMode);
});

BigInt.prototype.toJSON = function () {
  return this.toString();
};

declare global {
  interface BigInt {
    toJSON(): string;
  }
}

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <InternetIdentityProvider>
      <App />
    </InternetIdentityProvider>
  </QueryClientProvider>,
);
