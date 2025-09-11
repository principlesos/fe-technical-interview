import "@testing-library/jest-dom";
import "whatwg-fetch";

// MSW test server setup
import { server } from "./src/mocks/server";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

