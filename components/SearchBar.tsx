'use client';
import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (onSearch) {
            onSearch(query);
        }
    };

    return (
        <div className='search-bar'>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    placeholder='Search...'
                    value={query}
                    onChange={handleChange}
                    className='search-input'
                />
                <button type='submit' className='search-button'>
                    🔍
                </button>
            </form>
        </div>
    );
};

export default SearchBar;
