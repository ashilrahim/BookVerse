import React from "react";
import Home from "./Home";
import { Route, Router, Routes } from "react-router-dom";
import BookDetails from "./BookDetails";

const App = () => {
  return (
    <main className="min-h-screen relative pattern">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book/:id" element={<BookDetails />} />
      </Routes>
    </main>
  );
};

export default App;
