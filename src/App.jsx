import React from "react";
import "./app.css";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "./redux/thunks/dataThunk";
import { selectData } from "./redux/dataSlice";
import { Button } from "@mui/material";
import Header from "./components/Header";
import DataGrid from "./components/DataTable";

function App() {
  // const dispatch = useDispatch();
  // const data = useSelector(selectData);

  return (
    <div className="app-container">
      <Header />
      <div className="container">
        <DataGrid />
      </div>
    </div>
  );
}

export default App;
