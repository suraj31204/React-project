import React from 'react';
import CountryCard from './CountryCard';
import './CountryGrid.css';

export default function CountryGrid({ countries, onSelectCountry }) {
  if (countries.length === 0) {
    return <div className="center-message">No countries found matching your criteria.</div>;
  }

  return (
    <div className="country-grid">
      {countries.map((country) => (
        <CountryCard 
          key={country.cca3} 
          country={country} 
          onClick={() => onSelectCountry(country)} 
        />
      ))}
    </div>
  );
}