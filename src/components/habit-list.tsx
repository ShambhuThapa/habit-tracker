import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { Box, Button, Grid, LinearProgress, Paper, Typography } from '@mui/material';
import { deleteHabit, IHabit, toggleHabit } from '../store/habit-slice';

const HabitList: React.FC = () => {
    const { habits } = useSelector((state: RootState) => state.habits);
    const dispatch = useDispatch<AppDispatch>();
    const today = new Date().toISOString().split("T")[0];

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

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem", mt: 4 }}>
            {habits.map((habit) => {
                return <Paper key={habit.id} elevation={3} sx={{ p: 2 }}>
                    <Grid container alignContent="center" sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Grid xs={12} sm={6}>
                            <Typography variant='h6' >{habit.name}</Typography>
                            <Typography variant='body2' color='text.secodary' sx={{ textTransform: "capitalize", fontWeight: "bold" }}>
                                {habit.frequency}
                            </Typography>
                        </Grid>
                        <Grid xs={12} sm={6}>
                            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
                                <Button variant="contained"
                                    size='small'
                                    color={habit.completedDates.includes(today) ? "success" : "primary"}
                                    onClick={() => dispatch(toggleHabit({ id: habit.id, date: today }))}
                                >
                                    {habit.completedDates.includes(today) ? "Completed" : "Mark Completed"}
                                </Button>
                                <Button variant="contained"
                                    size='small'
                                    color="error"
                                    onClick={() => dispatch(deleteHabit({ id: habit.id }))}
                                >
                                    Delete
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                    <Box>
                        <Typography variant='body2' color='text.secodary' sx={{ textTransform: "capitalize", fontWeight: "bold" }}>
                            Current Streak: {getStreak(habit)} days
                        </Typography>
                        <LinearProgress variant="determinate" value={(getStreak(habit) / 30) * 100}  sx={{ mt: 1 }} />
                    </Box>
                </Paper>

            })}

        </Box>
    )
}

export default HabitList