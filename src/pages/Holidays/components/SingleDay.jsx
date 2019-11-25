import React from 'react';
import Card11 from '../../../shared/karakoy/components/Card11';

// linear-gradient(45deg,#009688,#4CAF50)
const SingleDay = ({ day, description }) => {
    return(
        <Card11 fromColor="#009688" toColor="#4CAF50" title={description} preTitle={day} />
    );
};

export default SingleDay;
