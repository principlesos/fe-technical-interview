import React from "react";
import ReactDOM from "react-dom";
import { App } from "./components/App";
import { QueryClient, QueryClientProvider } from "react-query";

function renderRoot(): void {
  const rootElement = document.getElementById("root");
  if (!rootElement) {
    throw new Error('Root element with id "root" not found');
  }
  const queryClient = new QueryClient();
  ReactDOM.render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>,
    rootElement
  );
}

renderRoot();
