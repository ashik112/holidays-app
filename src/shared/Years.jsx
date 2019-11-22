import React, { useState } from 'react';
import { IonSelect, IonSelectOption, IonList, IonItem, IonLabel, IonListHeader } from '@ionic/react';

const renderYearOptions = () => {
    const yearList = [2018, 2019, 2020, 2021];
    let list = [];
    list = yearList.map((year) => {
        return (
            <IonSelectOption value={year} key={year}>
                {year}
            </IonSelectOption>
        );
    });
    return list;
};

const Years = () => {
    const [year, setYear] = useState('');
    const yearChange = (e) => {
        const { detail: { value } } = e;
        console.log(value);
        renderYearOptions();
    };

    return (
        <IonItem>
            <IonLabel>Year</IonLabel>
            <IonSelect onIonChange={yearChange} cancelText="Cancel" interface="alert" placeholder="Select one">
                {renderYearOptions()}
            </IonSelect>
        </IonItem>
    );
}

export default Years;