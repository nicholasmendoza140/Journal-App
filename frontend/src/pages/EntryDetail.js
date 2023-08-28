import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import { useEntriesContext } from '../hooks/useEntriesContext'

const EntryDetail = () => {

    const {entryId} = useParams();
    //const [entry, setEntry] = useState(null)
    const [editMode, setEditMode] = useState(false);
    const [editedBody, setEditedBody] = useState("")
    const [error, setError] = useState(null)

    const {entries, dispatch} = useEntriesContext()


    useEffect(() => {
        const fetchEntry = async () => {
            const response = await fetch(`/entries/${entryId}`)
            const json = await response.json()
            if (response.ok) {
                dispatch({type: 'SET_ENTRIES', payload: json})
            }
        }
        fetchEntry()
    }, [entryId, dispatch, entries])
    
    const handleClick =  () => {
        setEditMode(!editMode);
        if (!editMode) {
            setEditedBody(entries.body)
        }
    }

    const handleSave = async (entry) => {
        //api call to update entry
        const newEntry = {editedBody}
        const response = await fetch('/entries/' + entry._id, {
            method: 'PATCH',
            body: JSON.stringify({ body: editedBody }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        console.log(JSON.stringify(newEntry))
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            dispatch({type: 'SET_ENTRIES', payload:json})
        }
        setEditMode(false)
        
    }

    const handleCancel = () => {
        setEditMode(!editMode)
    }

    return (
        <div className="entry-detail">
            {entries && (
                <div key={entries._id}>
                    <h1>{entries.title}</h1>
                    <span className="edit-button" onClick={() => handleClick(entries)}>
                        <i className="material-icons">edit</i> {/* Material Icons trash can icon */}
                    </span>
                    {editMode ? (
                        <div className="edit-mode">
                            <textarea
                                className="edit-textarea"
                                value={editedBody}
                                onChange={(e) => setEditedBody(e.target.value)}
                            />
                            <div className="edit-buttons">
                                <button className="save-button" onClick={() => handleSave(entries)}>Save</button>
                                <button className="cancel-button" onClick={handleCancel}>Cancel</button>
                            </div>
                        </div>
                    ) : (
                        <p>{entries.body}</p>
                    )}
                    
                </div>
            )}
            {error && <div className="error">{error}</div>}
        </div>
    )
}

export default EntryDetail