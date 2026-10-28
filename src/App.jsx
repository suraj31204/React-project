import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import SearchFilter from './components/SearchFilter';
import CountryGrid from './components/CountryGrid';
import CountryDetail from './components/CountryDetail';
import './App.css';

export default function App() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    // Using a reliable public JSON mirror of the countries dataset
    fetch('https://raw.githubusercontent.com/mledoze/countries/master/countries.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch country data');
        return res.json();
      })
      .then((data) => {
        // Map the fields to match what your components expect (name.common, flags.svg, etc.)
        const formattedData = data.map(c => ({
          name: { common: c.name.common, official: c.name.official || c.name.common },
          cca3: c.cca3,
          capital: c.capital || ['N/A'],
          region: c.region,
          subregion: c.subregion,
          population: c.population,
          area: c.area,
          currencies: c.currencies ? Object.fromEntries(Object.entries(c.currencies).map(([k, v]) => [k, { name: v.name || v }])) : {},
          languages: c.languages || {},
          flags: { svg: c.flag ? `https://flagcdn.com/${c.cca2.toLowerCase()}.svg` : '' }
        }));
        setCountries(formattedData);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filteredCountries = Array.isArray(countries) ? countries.filter((country) => {
    const matchesSearch = country.name && country.name.common.toLowerCase().includes(search.toLowerCase());
    const matchesRegion = region ? country.region === region : true;
    return matchesSearch && matchesRegion;
  }) : [];

  if (loading) return <div className="center-message">Loading countries...</div>;
  if (error) return <div className="center-message error-message">Error: {error}</div>;

  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        {selectedCountry ? (
          <CountryDetail country={selectedCountry} onBack={() => setSelectedCountry(null)} />
        ) : (
          <>
            <SearchFilter 
              search={search} 
              setSearch={setSearch} 
              region={region} 
              setRegion={setRegion} 
            />
            <CountryGrid 
              countries={filteredCountries} 
              onSelectCountry={setSelectedCountry} 
            />
          </>
        )}
      </main>
    </div>
  );
}