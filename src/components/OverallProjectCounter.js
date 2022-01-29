import React from 'react';
import { UseCollection } from "../hooks/useCollection"
import { OnGoingProjectsCounter } from './OnGoingProjectsCounter';

function OverallProjectCounter() {
    const { documents } = UseCollection('project-request')

    let total =  "some stuff"

    return (
        <>
            <span>{total}</span>
        </>
    )
}

export { OverallProjectCounter };
