import { Routes, Route } from "react-router-dom";
import { Home } from "./views/Home";
import { Auth } from "./views/Auth";
import { useEffect } from "react";
import { ConfigProvider } from "antd";
import ruRU from "antd/locale/ru_RU";

function App() {
  useEffect(() => {
    // const userData = JSON.parse(localStorage.getItem("userData") ?? "{}");
    // if (userData && userData.role) {
    //   appState.setUserRole(userData.role);
    //   if (userData.id) {
    //     appState.setUserId(userData.id);
    //   }
    // }
  }, []);

  return (
    <div className="app">
      <ConfigProvider locale={ruRU}>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/auth" element={<Auth />}></Route>
        </Routes>
      </ConfigProvider>
    </div>
  );
}

export default App;
