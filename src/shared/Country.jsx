import React, { useState } from 'react';
import { IonSelect, IonSelectOption, IonList, IonItem, IonLabel, IonListHeader } from '@ionic/react';
import countryList from '../assets/country_list.json';

const renderCountryOptions = () => {
    let list = [];
    list = countryList.map((country) => {
        return (
            <IonSelectOption value={country} key={country}>
                {country}
            </IonSelectOption>
        );
    });
    return list;
};

const Country = () => {
    const [country, setCountry] = useState('');
    const countryChange = (e) => {
        const { detail: { value } } = e;
        console.log(value);
        renderCountryOptions();
    };

    return (
        <IonItem>
            <IonLabel>Country</IonLabel>
            <IonSelect onIonChange={countryChange} cancelText="Cancel" interface="alert" placeholder="Select one">
                {renderCountryOptions()}
            </IonSelect>
        </IonItem>
    );
}

export default Country;