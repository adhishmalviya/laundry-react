import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { thead,tr,th,td,Table,bootstrapreact } from 'react-bootstrap';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import Bootstraptable from 'react-bootstrap-table-next';
import { useState,useEffect } from 'react';
import axios from 'axios';
import paginationFactory from 'react-bootstrap-table2-paginator'


const Order = ()=>{
const [ players,setPlayer ] = useState([]);
const [ loading,setLoading ] = useState(false);
const getPlayerData = async ()=>{
    try{
        const data = await axios.get("https://nba-players.herokuapp.com/players-stats");
         setPlayer(data.data);
    }
    catch(e){
        console.log(e);
    }

};
const columns = [
{dataField:"name",text:"Player Name"},
{dataField:"points_per_game",text:"Points Per Game"},
{dataField:"team_name",text:"Player Team"},
];
  

   useEffect(()=> {
    getPlayerData ();
   },[]);

    return(
      <div className = "table">
      <h1 className = "tabhead">List of Pickups booked</h1>
      <Bootstraptable className = "tablehead"
      keyField= "name"
       data= {players}
       columns = {columns}/></div>

   )

}



export default Order;
