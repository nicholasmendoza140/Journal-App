import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import { useEntriesContext } from '../hooks/useEntriesContext'

import EntryForm from '../components/EntryForm'

const Home = () => {

    const {entries, dispatch} = useEntriesContext()

    

    useEffect(() => {
        const fetchEntries = async () => {
            const response = await fetch('/entries')
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_ENTRIES', payload: json})
            }
        }
        fetchEntries()
    }, [])

    const handleClick = async (entry) => {
        const response = await fetch('/entries/' + entry._id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_ENTRY', payload:json})
        }

    }

    return (
        <div className="home">
            <div className="entries">
                {entries && entries.map(entry => (
                    <div className="entries-list">
                        <Link to={`/entries/${entry._id}`} key={entry._id}>{entry.title}</Link>
                        <span className="delete-button" onClick={() => handleClick(entry)}>delete</span>
                    </div>
                ))}
            </div>
            <EntryForm></EntryForm>
        </div>
    )
}

export default Home