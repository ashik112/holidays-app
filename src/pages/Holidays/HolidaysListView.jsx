import React, { Component } from 'react';
import jsonHolidays from '../../assets/global_public_holiday.json';
import { IonList, IonItem, IonLabel, IonAvatar } from '@ionic/react';
import { Plugins } from '@capacitor/core';
import HolidayPageTopBar from './components/HolidayPageTopBar.jsx';

const { Browser } = Plugins;

class HolidaysListView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            country: props.country,
            year: props.year,
        };
    }

    renderHolidays = () => {
        console.log(this.state.country, this.state.year);
        const holidays = jsonHolidays[this.state.country][this.state.year];
        let list = [];
        if(!holidays) return list;
        list = holidays.map((day, index) => {
            if (day[0]) {
                return (
                    <div key={`${day[0]}${day[1]}${day[2]}${day[4]}`}>
                        <IonItem
                            detail
                            onClick={async()=>{
                                if(day[5]) {
                                    await Browser.open({ url: `${day[5]}` });
                                }
                            }}
                        >
                            {/* <IonIcon color="primary" slot="end" icon={alert}/> */}
                            <IonAvatar>
                                <h6 style={{
                                    color: '#2196F3',
                                }}>
                                    {(day[1]).substring(0,3)}
                                </h6>
                            </IonAvatar>
                            <IonLabel style={{
                                whiteSpace: 'normal',
                            }}>
                                <h3><b>{day[0]}</b></h3>
                                <h2><p>{day[2]}</p></h2>
                                <p>{day[3]}{day[4]!== ' '? ', ': ''}{day[4]}</p>
                            </IonLabel>
                        </IonItem>
                    </div>
                );
            }
            return "";
        });
        return list;
    };


    render() {
        const { country, year } = this.props;
        return (
            <>
                <HolidayPageTopBar countryName={country} year={`${year}`} />
                <div style={{
                    marginTop: '100px',
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