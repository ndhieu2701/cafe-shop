import { ConfigProvider as AntdConfigProvider } from "antd";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RecoilRoot } from "recoil";
import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Suspense } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Home from "./pages/home";
import ErrorPage from "./pages/error";
import AuthPage from "./pages/auth";
import Cookies from "js-cookie";
import ResetPass from "./pages/resetPass";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      cacheTime: 24 * 3600 * 1000,
      retry: false,
    },
  },
});

const isAuth = Cookies.get("token");

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Home />} />
      <Route
        path="/auth"
        element={!isAuth ? <AuthPage /> : <Navigate to="/" />}
      />
      <Route path="/reset-password" element={<ResetPass />}/>
      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
);

const theme = {
  token: {
    colorPrimary: "#895a42",
  },
  components: {
    Form: {
      labelFontSize: "1rem",
      labelColor: "#895a42",
    },
  },
};

function App() {
  return (
    <AntdConfigProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <RouterProvider router={router} />
          <Suspense fallback={null}></Suspense>
        </RecoilRoot>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </AntdConfigProvider>
  );
}

export default App;
