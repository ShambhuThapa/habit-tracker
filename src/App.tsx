import './App.css'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
import { Container, Typography } from '@mui/material'
import AddHabitForm from './components/add-habit-form.tsx'
import HabitList from './components/habit-list.tsx'
import HabitStats from './components/habit-stats.tsx'
function App() {

  return (
    <Provider store={store} >
      <Container maxWidth="md">
        <Typography variant="h3">Habit Tracker</Typography>
        <AddHabitForm />
        <HabitList />
        <HabitStats />
      </Container>
    </Provider>
  )
}

export default App
