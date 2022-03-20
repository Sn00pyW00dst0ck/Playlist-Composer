import React, {useState} from 'react'
import "./Searchbar.css"

function Searchbar () {
    const [searchTerm, setSearchTerm] = useState('')
    return (
        <div className="search-bar"><input type="text" placeholder="Search..." onChange={event => {setSearchTerm(event.target.value)}} /></div>

    );
}

export default Searchbar;