import React, { Component } from 'react';
import SingleDay from './components/SingleDay';
import jsonHolidays from '../../assets/global_public_holiday.json';

class HolidaysCardView extends Component {
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
        list = holidays.map( (day) => {
            if(day[0]) {
                return (
                    <div key={day[0]}>
                        <SingleDay description={day[2]} day={`${day[0]}, ${day[1]}`} />
                        <hr/>
                    </div>
                );
            }
            return "";
        });
        return list;
    };


    render() {
        return(
            <div className="ion-padding">
                {this.renderHolidays()}
            </div>
        );
    }
}

export default HolidaysCardView;