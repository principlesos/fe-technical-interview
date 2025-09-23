import ReactDOM from "react-dom";
import App from "./components/App";
import { QueryClient, QueryClientProvider } from "react-query";

async function renderRoot(): Promise<void> {
  const rootElement = document.getElementById("root");
  if (!rootElement) {
    throw new Error('Root element with id "root" not found');
  }
  const { worker } = await import("./mocks/browser");
  await worker.start({ onUnhandledRequest: "bypass" });
  const queryClient = new QueryClient();
  ReactDOM.render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>,
    rootElement
  );
}

renderRoot();
