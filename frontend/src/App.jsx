import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./redux/store";

import Body from "./pages/Body";
import Feed from "./pages/Feed";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Connections from "./pages/Connections";
import Requests from "./pages/Requests";

function App() {
  return (
    <main>
      <Provider store={store}>
        <BrowserRouter basename='/'>
          <Routes>
            <Route path='/' element={<Body />}>
              <Route path='/' element={<Feed />}></Route>
              <Route path='/login' element={<Login />}></Route>
              <Route path='/profile' element={<Profile />}></Route>
              <Route path='/connections' element={<Connections />}></Route>
              <Route path='/requests' element={<Requests />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </main>
  );
}

export default App;
