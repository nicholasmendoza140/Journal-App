import {BrowserRouter, Routes, Route} from 'react-router-dom'

//pages & components
import Home from './pages/Home'
import Navbar from './components/Navbar'
import EntryDetail from './pages/EntryDetail';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />
            <Route
              path="/entries/:entryId"
              element={<EntryDetail />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
