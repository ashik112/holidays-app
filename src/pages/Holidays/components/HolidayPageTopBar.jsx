import React from 'react';
import SingleDay from './SingleDay';

const HolidayPageTopBar = ({ countryName, year }) => {
    return (
        <div style={{
            zIndex: 1,
            opacity: 0.7,
        }}>
            <SingleDay description={`${year}`} day={`Holidays of ${countryName}`} />
        </div>
    );
};

export default HolidayPageTopBar;