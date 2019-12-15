import React, { Component } from 'react';
import { IonList, IonItem, IonLabel, IonAvatar, IonBadge } from '@ionic/react';
import { Plugins } from '@capacitor/core';
import {compareWithToday, getDayMonth} from "../../services/dateService";

const { Browser } = Plugins;

class HolidaysListView extends Component {
    renderHolidays = () => {
        const { countryData: { days } } = this.props;
        let upcomingCount = 0;
        let todayCount = 0;
        return days.map((item, index) => {
            const { day, weekDay, name, type, location, detailsURL } = item;
            if (day) {
                let upcomingBadge = null;
                let todayBadge = null;
                if(compareWithToday(day) === 1 && upcomingCount === 0) {
                  upcomingBadge = <IonBadge color="tertiary">Upcoming</IonBadge>;
                  upcomingCount++;
                }
                if(compareWithToday(day) === 0 && todayCount === 0) {
                  todayBadge = <IonBadge color="success">Today!</IonBadge>;
                  todayCount++;
                }

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
                                    color: 'rgb(117, 201, 131)',
                                }}>
                                    <b>{(weekDay).substring(0,3)}</b>
                                </h6>
                            </IonAvatar>
                            <IonLabel style={{
                                whiteSpace: 'normal',
                            }}>
                              <h3><b>{getDayMonth(day)}</b></h3>{upcomingBadge}&nbsp;{todayBadge}
                                <h2><p>{name}</p></h2>
                                <p style={{ color: 'rgb(117, 201, 131)' }}>{type}{location!== ' ' && location !== '' && location !== undefined? ', ': ''}{location}</p>
                            </IonLabel>
                        </IonItem>
                    </div>
                );
            }
            return "";
        });
    };


    render() {
        return (
            <>
                <IonList>
                    {this.renderHolidays()}
                </IonList>
            </>
        );
    }
}

export default HolidaysListView;
