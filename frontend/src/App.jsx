import { BrowserRouter, Route, Routes } from "react-router-dom";

import Body from "./pages/Body";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

function App() {
  return (
    <main>
      <BrowserRouter basename='/'>
        <Routes>
          <Route path='/' element={<Body />}>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/profile' element={<Profile />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
