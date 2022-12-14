import React from 'react'
import { useEffect } from 'react';
import { loadCountries } from './countries-slice';
import { selectCountriesInfo, selectVisibleCountries } from './countries-slice';
import { selectControls } from '../controls/controls-slice';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { List } from '../../components/List';
import { Card } from '../../components/Card';

const CountriesList = () => {

   const navigate = useNavigate();
   const dispatch = useDispatch()
   const { search, filter } = useSelector(selectControls)

   const countries = useSelector((state) => selectVisibleCountries(state, { search, filter }));
   const { status, error, qty } = useSelector(selectCountriesInfo)

   useEffect(() => {
      if (!qty) {
         dispatch(loadCountries())
      }
   }, [dispatch, qty])




   return (
      <div>
         {status === 'loading' && <h1 style={{ textAlign: 'center', marginTop: '50px' }}>LOADING...</h1>}
         {status === 'error' && <h1 style={{ textAlign: 'center', marginTop: '50px' }}>ERROR: {error}</h1>}

         {status === 'received' &&
            <List>
               {countries.map((c) => {
                  const countryInfo = {
                     img: c.flags.png,
                     name: c.name,
                     info: [
                        {
                           title: 'Population',
                           description: c.population.toLocaleString(),
                        },
                        {
                           title: 'Region',
                           description: c.region,
                        },
                        {
                           title: 'Capital',
                           description: c.capital,
                        },
                     ],
                  };

                  return (
                     <Card
                        key={c.name}
                        onClick={() => navigate(`/country/${c.name}`)}
                        {...countryInfo}
                     />
                  );
               })}
            </List>
         }

      </div>
   )
}

export default CountriesList