import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('')

    const handleSearch = (event) => {
        event.preventDefault();
        onSearch(searchQuery)
    }

    return ( 
        <div>
            <form onSubmit={handleSearch}>
                <input type='text' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder='Search Videos' />
                <button type='submit'>Search</button>
            </form>
        </div>
     );
}
 
export default SearchBar;