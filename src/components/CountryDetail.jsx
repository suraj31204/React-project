import React from 'react';
import './CountryDetail.css';

export default function CountryDetail({ country, onBack }) {
  const languages = country.languages ? Object.values(country.languages).join(', ') : 'N/A';
  const currencies = country.currencies 
    ? Object.values(country.currencies).map(c => c.name || c).join(', ') 
    : 'N/A';

  const population = country.population ? country.population.toLocaleString() : 'N/A';
  const area = country.area ? country.area.toLocaleString() : 'N/A';
  const flagSrc = country.flags && country.flags.svg ? country.flags.svg : null;

  return (
    <div className="detail-container">
      <button onClick={onBack} className="back-button">← Back</button>
      
      <div className="detail-content">
        {flagSrc && <img src={flagSrc} alt={country.name?.common || 'flag'} className="detail-flag" />}
        
        <div className="detail-info-box">
          <h2>{country.name?.official || country.name?.common}</h2>
          <div className="detail-grid">
            <div>
              <p><strong>Common Name:</strong> {country.name?.common || 'N/A'}</p>
              <p><strong>Population:</strong> {population}</p>
              <p><strong>Region:</strong> {country.region || 'N/A'}</p>
              <p><strong>Sub Region:</strong> {country.subregion || 'N/A'}</p>
              <p><strong>Capital:</strong> {country.capital ? country.capital[0] : 'N/A'}</p>
            </div>
            <div>
              <p><strong>Top Level Domain:</strong> {country.tld ? country.tld.join(', ') : 'N/A'}</p>
              <p><strong>Currencies:</strong> {currencies}</p>
              <p><strong>Languages:</strong> {languages}</p>
              <p><strong>Area:</strong> {area} km²</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}