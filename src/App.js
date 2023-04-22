import { Routes, Route } from "react-router-dom";
import NavBar from "./routes/navigation/navigation";
import AddBook from "./components/add-book/add-book";
import Home from "./routes/home/home.jsx";
import SignInForm from "./components/sign-in-form/sign-in-form";
import SignUpForm from "./components/sign-up-form/sign-up-form";


function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignInForm />} />
        <Route path="/sign-up" element={<SignUpForm />}  />
        <Route path="/add-book" element={<AddBook />} />
      </Routes>
    </>
  );
}

export default App;
