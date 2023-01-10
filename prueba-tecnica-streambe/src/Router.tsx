import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/home/index";
import { LoginPage } from "./pages/login/index";
import { RouterLayoutPrivate } from "./common/RouterLayoutPrivate";
import { RouterLayoutPublic } from "./common/RouterLayoutPublic";

export const AppRouter: React.FC<{}> = () => {
  return (
    <Routes>

      <Route path="/login" element={<RouterLayoutPublic />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>

        
      <Route path="/" element={<RouterLayoutPrivate />}>
        <Route path="/" element={<HomePage />} />
      </Route>
    </Routes>
  );
};
