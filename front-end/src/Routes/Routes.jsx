import React, {Component,Fragment}from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,

  } from 'react-router-dom';
import Menu from "../component/Navbar";
import KitabList from "../pages/KitabList";
import HaditsList from "../pages/HaditsList";
import SearchResult from "../pages/SearchResult";
class RoutesPages extends Component {
    render() {
        return(
            <Router>
                <Fragment>
                    <div className="container">
                    <Menu />
                    <Routes>
                    <Route path="/" element={ <KitabList />} /> 
                    <Route path="/:kitab" element={ <HaditsList />} /> 
                    <Route path="/search" element={ <SearchResult />} /> 
                    </Routes>
                    </div>
                </Fragment>
            </Router>
        )
    }
}
export default RoutesPages;