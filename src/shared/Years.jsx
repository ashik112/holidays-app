import React from 'react';
import { IonSelect, IonSelectOption, IonItem, IonLabel } from '@ionic/react';
import storageService from '../services/storeageService';

const renderYearOptions = () => {
    const yearList = [2019, 2020, 2021];
    return yearList.map((year) => {
        return (
            <IonSelectOption value={year} key={year}>
                {year}
            </IonSelectOption>
        );
    });
};

const Years = ({ initialValue }) => {
    const yearChange = (e) => {
        const { detail: { value } } = e;
        storageService.setObject('year', value).then();
    };

    return (
        <IonItem>
            <IonLabel>Default Year</IonLabel>
            <IonSelect interface="popover" value={initialValue} onIonChange={yearChange} cancelText="Cancel" placeholder="Select one">
                {renderYearOptions()}
            </IonSelect>
        </IonItem>
    );
};

export default Years;
