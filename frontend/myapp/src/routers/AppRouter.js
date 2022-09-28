import { useRoutes } from "react-router-dom";
import { AuthRouter } from "./AuthRouter";
import { ProtectedRouter } from "./ProtectedRouter";
import PublicRouter from "./PublicRouter";

const AppRouter = () => {
  return useRoutes([AuthRouter, ProtectedRouter, PublicRouter]);
};

export default AppRouter;
