import { useState } from "react"
import { useEntriesContext } from '../hooks/useEntriesContext'
import { useAuthContext } from '../hooks/useAuthContext'

const EntryForm = () => {
    const {dispatch} = useEntriesContext()
    const {user} = useAuthContext()
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            setError('You must be logged in')
            return
        }
        const entry = {title, body}

        const response = await fetch('https://jotfull-backend1.onrender.com/api/entries', {
            method: 'POST',
            body: JSON.stringify(entry),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            setTitle('')
            setBody('')
            setError(null)
            setEmptyFields([])
            console.log('New entry added', json)
            dispatch({type: 'CREATE_ENTRY', payload: json})
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Entry</h3>
            <label>Title:</label>
            <input 
                type="text" 
                className="input-box"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            ></input>

            <label>Body:</label>
            <textarea
                className="input-box textarea-box"
                onChange={(e) => setBody(e.target.value)}
                value={body}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      setBody(prevBody => prevBody + '\n');
                    }
                  }}
            ></textarea>

            <button className="add-entry-button">Add Entry</button>
            {error && <div className="error">{error + emptyFields.join(', ')}</div>}
        </form>
    )
}

export default EntryForm