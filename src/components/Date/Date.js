import React from 'react';

const Date = ({date,weekDays, toDate}) => {

    return (
        <div>
            <p>{weekDays[date.getDay()]}</p>
            <p>{toDate(date)}</p>
        </div>
    );
};

export default Date;