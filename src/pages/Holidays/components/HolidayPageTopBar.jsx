import React from 'react';
import SingleDay from './SingleDay';

const HolidayPageTopBar = ({ countryName, year }) => {
    return (
        <div style={{
            display: 'block',
            position: "fixed",
            top: 0,
            zIndex: 1,
            width: '100%',
            opacity: 0.7,
        }}>
            <SingleDay description={`${year}`} day={`Holidays of ${countryName}`} />
        </div>
    );
}

export default HolidayPageTopBar;