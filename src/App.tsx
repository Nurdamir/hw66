import React from 'react';
import Layout from "./components/Layout/Layout";
import {Route, Routes} from "react-router-dom";
import Home from "./containers/Home/Home";
import NewMeal from "./containers/NewMeal/NewMeal";
import EditMeal from "./containers/EditMeal/EditMeal";
import './App.css';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/new-meal" element={<NewMeal/>}/>
        <Route path="/edit-meal/:id" element={<EditMeal/>}/>
        <Route path="*" element={(
          <h1>Not found!</h1>
        )}/>
      </Routes>
    </Layout>
  );
}

export default App;
