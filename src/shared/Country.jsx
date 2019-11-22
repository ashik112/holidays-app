import React from 'react';
import { IonSelect, IonSelectOption, IonItem, IonLabel } from '@ionic/react';
import countryList from '../assets/country_list.json';
import storageService from '../services/storeageService.js';

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

const Country = ({ initialValue }) => {
    const countryChange = (e) => {
        const { detail: { value } } = e;
        console.log(value);
        storageService.setObject('country', value);
    };

    return (
        <IonItem>
            <IonLabel>Country</IonLabel>
            <IonSelect value={initialValue} onIonChange={countryChange} cancelText="Cancel" interface="alert" placeholder="Select one">
                {renderCountryOptions()}
            </IonSelect>
        </IonItem>
    );
}

export default Country;