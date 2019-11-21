import React from 'react';
import Card11 from '../../../shared/karakoy/components/Card11';


const SingleDay = ({ day, description }) => {
    return(
        <Card11 fromColor="#2196F3" toColor="#2196F3" title={description} preTitle={day} />
    );
};

export default SingleDay;