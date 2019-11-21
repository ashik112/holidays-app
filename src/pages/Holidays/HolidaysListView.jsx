import React, { Component } from 'react';
import jsonHolidays from '../../assets/global_public_holiday.json';
import { IonList, IonItem, IonLabel, IonNote } from '@ionic/react';

class HolidaysListView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            country: 'Bangladesh',
            year: '2019',
        };
    }

    renderHolidays = () => {
        const { Bangladesh } = jsonHolidays;
        const holidays = Bangladesh['2019'];
        let list = [];
        // let count = 0;
        list = holidays.map((day, index) => {
            if (day[0]) {
                // ++count;
                return (
                    <div key={day[0]}>
                        <IonItem>
                            <IonLabel style={{
                                whiteSpace: 'normal',
                            }}>
                                <h5>{day[2]}</h5>
                                <span style={{
                                    color: '#2196F3',
                                }}><p>{day[1]}</p></span>
                            </IonLabel>
                            <IonNote slot="end" color="primary"><h6>{day[0]}</h6></IonNote>
                        </IonItem>
                    </div>
                );
            }
            return "";
        });
        return list;
    };


    render() {
        return (
            <div>
                <IonList>
                    {this.renderHolidays()}
                </IonList>
            </div>
        );
    }
}

export default HolidaysListView;