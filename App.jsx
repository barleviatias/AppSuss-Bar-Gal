import {UserPreview} from './cmps/AppHeader.jsx'
import {Home} from './pages/Home.jsx'

// Simple React Component
export function App() {
    return <section className="app">
       <h1>My App</h1>
       <UserPreview/>
       <Home/>
    </section>
}


