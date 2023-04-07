import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<>home route</>}></Route>
        <Route path="/test" element={<>test route</>}></Route>
      </Routes>
    </div>
  );
}

export default App;
