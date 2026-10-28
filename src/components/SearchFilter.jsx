import React from 'react';
import './SearchFilter.css';

export default function SearchFilter({ search, setSearch, region, setRegion }) {
  return (
    <div className="search-filter-container">
      <input
        type="text"
        placeholder="Search for a country..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />
      <select
        value={region}
        onChange={(e) => setRegion(e.target.value)}
        className="region-select"
      >
        <option value="">Filter by Region (All)</option>
        <option value="Africa">Africa</option>
        <option value="Americas">Americas</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
    </div>
  );
}