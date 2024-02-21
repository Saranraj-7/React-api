import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

export const Searchbar = () => {
    const [input, setInput] = useState("");

    const fetchData = (value) => {
        fetch('https://gorest.co.in/public/v2/users', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer 79a3b1d569005f3bb059d351efbfc433938986d1c759d0c23bee1a7f32e8d27f'
            }
        })
        .then(response => response.json())
        .then(data => {
            // Handle the fetched data here
            console.log(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    };

    const handleChange = (value) => {
        setInput(value);
        fetchData(value);
    };

    return (
        <div>
            <FaSearch id="search-icon"/>
            <input 
                placeholder="Type to Search... " 
                value={input}
                onChange={(e)=> handleChange(e.target.value)}
            />
        </div>
    );
};
