import React from 'react';
import './CountryCard.css';

export default function CountryCard({ country, onClick }) {
  const population = country.population ? country.population.toLocaleString() : 'N/A';
  const flagSrc = country.flags && country.flags.svg ? country.flags.svg : null;

  return (
    <div className="country-card" onClick={onClick}>
      {flagSrc && <img src={flagSrc} alt={country.name?.common || 'flag'} className="country-flag" />}
      <div className="country-info">
        <h3>{country.name?.common}</h3>
        <p><strong>Population:</strong> {population}</p>
        <p><strong>Region:</strong> {country.region || 'N/A'}</p>
        <p><strong>Capital:</strong> {country.capital ? country.capital[0] : 'N/A'}</p>
      </div>
    </div>
  );
}