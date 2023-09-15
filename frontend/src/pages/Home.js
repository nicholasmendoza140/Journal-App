import {useEffect} from 'react'
import {Link} from 'react-router-dom'
import { useEntriesContext } from '../hooks/useEntriesContext'
import { useAuthContext } from '../hooks/useAuthContext'

import EntryForm from '../components/EntryForm'

const Home = () => {

    const {entries, dispatch} = useEntriesContext()
    const {user} = useAuthContext()
    

    useEffect(() => {
        const fetchEntries = async () => {
            const response = await fetch('/api/entries', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_ENTRIES', payload: json})
            }
        }
        fetchEntries()
    }, [dispatch, user])

    const handleClick = async (entry) => {
        const response = await fetch('/api/entries/' + entry._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_ENTRY', payload: json})
        }

    }

    return (
        <div className="home">
            <div className="entries">
                {entries && entries.map && entries.map(entry => (
                    <div className="entries-list">
                        <Link to={`/entries/${entry._id}`} key={entry._id}>{entry.title}</Link>
                        <span className="delete-button" onClick={() => handleClick(entry)}>
                            <i className="material-icons">delete</i> {/* Material Icons trash can icon */}
                        </span>
                    </div>
                    )
                )}
            </div>
            <EntryForm></EntryForm>
        </div>
    )
}

export default Home