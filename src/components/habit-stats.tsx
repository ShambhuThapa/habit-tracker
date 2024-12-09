import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { fetchHabits, IHabit } from '../store/habit-slice';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { LinearProgress } from '@mui/material';

const HabitStats:React.FC = () => {
    const {habits,isLoading,error} = useSelector((state: RootState) => state.habits);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchHabits())
    }, []);

    const getStreak = (habit: IHabit) => {
        let streak = 0;
        const currentDate = new Date();

        while (true) {
            const dateString = currentDate.toISOString().split("T")[0];
            if (habit.completedDates.includes(dateString)) {
                streak++;
                currentDate.setDate(currentDate.getDate() - 1);
            } else {
                break;
            }
        }
        return streak;
    }

    const  getLongestStreak = () => {
        return Math.max(...habits.map(habit=>getStreak(habit)),0);
    }

    if (isLoading) {
        return <LinearProgress/>;
    }
    if(error){
        return <Typography variant="body1" color='error'>Error: {error}</Typography>;
    }
    
  return (
    <Paper elevation={2} sx={{p:2,mt:4}}>
        <Typography variant="h6">Habit Statistics</Typography>
        <Typography variant="body1">Total Habits: {habits.length}</Typography>
        <Typography variant="body1">Completed Today: {habits.length}</Typography>
        <Typography variant="body1">Longest Streak: {getLongestStreak()}</Typography>
    </Paper>
  )
}

export default HabitStats