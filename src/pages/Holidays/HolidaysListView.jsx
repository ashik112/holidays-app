import React, { Component } from 'react';
import { IonList, IonItem, IonLabel, IonAvatar } from '@ionic/react';
import { Plugins } from '@capacitor/core';
import HolidayPageTopBar from './components/HolidayPageTopBar.jsx';

const { Browser } = Plugins;

class HolidaysListView extends Component {
    renderHolidays = () => {
        const { countryData: { days } } = this.props;
        return days.map((item, index) => {
            const { day, weekDay, name, type, location, detailsURL } = item;
            if (day) {
                return (
                    <div key={`${day}${index}`}>
                        <IonItem
                            detail
                            onClick={async()=>{
                                if(detailsURL) {
                                    await Browser.open({ url: `${detailsURL}` });
                                }
                            }}
                        >
                            {/* <IonIcon color="primary" slot="end" icon={alert}/> */}
                            <IonAvatar>
                                <h6 style={{
                                    color: '#2196F3',
                                }}>
                                    {(weekDay).substring(0,3)}
                                </h6>
                            </IonAvatar>
                            <IonLabel style={{
                                whiteSpace: 'normal',
                            }}>
                                <h3><b>{day}</b></h3>
                                <h2><p>{name}</p></h2>
                                <p>{type}{location!== ' '? ', ': ''}{location}</p>
                            </IonLabel>
                        </IonItem>
                    </div>
                );
            }
            return "";
        });
    };


    render() {
        const { countryData: {country, year} } = this.props;
        return (
            <>
                <HolidayPageTopBar countryName={country} year={`${year}`} />
                <div style={{
                    marginTop: '90px',
                }}>
                    <IonList>
                        {this.renderHolidays()}
                    </IonList>
                </div>
            </>
        );
    }
}

export default HolidaysListView;
