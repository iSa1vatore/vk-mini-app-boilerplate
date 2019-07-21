import React from 'react';
import GroupCell from '../components/GroupCell';

export const renderGroupsList = (items) => {
    let groups = null;
    if (items !== undefined && items !== null && items.length !== 0) {
        groups = items.map((group) => (
            <GroupCell
                key={group.id}
                description={group.description}
                photo={group.photo_100}
                name={group.name}/>
        ));
    }
    return groups;
};