import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'

import EntryForm from '../components/EntryForm'

const Home = () => {

    const [entries, setEntries] = useState(null)

    

    useEffect(() => {
        const fetchEntries = async () => {
            const response = await fetch('/entries')
            const json = await response.json()

            if (response.ok) {
                setEntries(json)
            }
        }
        fetchEntries()
    }, [])

    return (
        <div className="home">
            <div className="entries">
                {entries && entries.map((entry) => (
                    <Link to={`/entries/${entry._id}`} key={entry._id}>{entry.title}</Link>
                ))}
            </div>
            <EntryForm></EntryForm>
        </div>
    )
}

export default Home