import { useState } from "react"

const EntryForm = () => {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const entry = {title, body}

        const response = await fetch('/entries', {
            method: 'POST',
            body: JSON.stringify(entry),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            setTitle('')
            setBody('')
            setError(null)
            console.log('New entry added', json)
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Entry</h3>
            <label>Title:</label>
            <input 
                type="text" 
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            ></input>

            <label>Body:</label>
            <input 
                type="text" 
                onChange={(e) => setBody(e.target.value)}
                value={body}
            ></input>

            <button>Add Entry</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default EntryForm