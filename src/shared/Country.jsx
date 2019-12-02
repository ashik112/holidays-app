import React from 'react';
import { IonSelect, IonSelectOption, IonItem, IonLabel } from '@ionic/react';
import countryList from '../assets/country_list.json';
import storageService from '../services/storeageService.js';

const renderCountryOptions = () => {
    return countryList.map((country) => {
        return (
            <IonSelectOption value={country} key={country}>
                {country}
            </IonSelectOption>
        );
    });
};

const Country = ({ initialValue }) => {
    const countryChange = (e) => {
        const { detail: { value } } = e;
        console.log(value);
        storageService.setObject('country', value).then();
    };

    return (
        <IonItem>
            <IonLabel>Default Country</IonLabel>
            <IonSelect value={initialValue} onIonChange={countryChange} cancelText="Cancel" placeholder="Select one">
                {renderCountryOptions()}
            </IonSelect>
        </IonItem>
    );
};

export default Country;
