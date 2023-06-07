import React from 'react';
import { useLocation } from 'react-router';
import HaditsComp from '../component/HaditsComp';
const SearchResult = () => {
  const location = useLocation();
  const data = location.state;

  if (data != null) {
      return (
        <React.Fragment>
            <h1>Hasil Pencarian</h1>
            {
               data.map((item,i) => {
                  return (
                      <HaditsComp key={i} data={item}/>
                  )
              })
            }
        </React.Fragment>
    
      );
  } else {
    return (
        <div>
            <h1>Not Found</h1>
        </div>
    )
  }
};

export default SearchResult;
