import React, { useState , Fragment}  from "react"
import { useNavigate } from 'react-router';
import axios from "axios";

function Menu() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();


  const handleChange = (e) => {
    setSearchTerm(e.target.value)
    console.log(searchTerm)
  }

// fungsi pencarian
    const handleSubmit = (event) => {
        event.preventDefault();
        axios({
            method: 'post',
            url: `http://localhost:3001/search`,
            data: {
              query: searchTerm
            }
          }).then((response) => {
            // handle success
            navigate('/search',{state: response.data.data})
        })
    };
  return (
    <Fragment>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">Sahih Bukhari</a>
          <form className="d-flex search"  onSubmit={handleSubmit}>
            <input onChange={handleChange} className="form-control me-2" type="search" placeholder="Cari Hadits" aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </nav>
    </Fragment>
  );
}

export default Menu;