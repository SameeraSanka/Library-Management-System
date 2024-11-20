import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Authentication/Login";
import Register from "./Components/Authentication/Register";
import ViewBooks from "./Components/Books/ViewBooks";
import AddBook from "./Components/Books/AddBook";
import UpdateBook from "./Components/Books/UpdateBook";
import PrivateRoute from "./Components/PrivateRoute";
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<PrivateRoute />}>
          <Route path="/books" element={<ViewBooks />} />
          <Route path="/books/add" element={<AddBook />} />
          <Route path="/books/edit/:id" element={<UpdateBook />} />
        </Route>

        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
