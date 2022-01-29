import { UseCollection } from "../hooks/useCollection"
import React from 'react';

function OnGoingProjectsCounter() {

    const { documents } = UseCollection('projects')

    return (
        <>
            {documents && <span>{documents.length}</span>}
        </>
    )
}

export {OnGoingProjectsCounter};
