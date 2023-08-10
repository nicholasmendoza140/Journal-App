import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'

const EntryDetail = () => {

    const {entryId} = useParams();
    const [entry, setEntry] = useState(null)


    useEffect(() => {
        const fetchEntry = async () => {
            const response = await fetch(`/entries/${entryId}`)
            const json = await response.json()
            if (response.ok) {
                setEntry(json)
            }
        }
        fetchEntry()
    }, [entryId])

    return (
        <div className="entry-detail">
            {entry && (
                <div key={entry._id}>
                    <h1>{entry.title}</h1>
                    <p>{entry.body}</p>
                </div>
            )}
        </div>
    )
}

export default EntryDetail