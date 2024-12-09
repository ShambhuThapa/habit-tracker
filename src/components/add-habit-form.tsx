import { Box, Button, FormControl, InputLabel, Select,MenuItem, TextField } from '@mui/material';
import  { useState } from 'react'
import { AppDispatch } from '../store/store';
import { useDispatch } from 'react-redux';
import { addHabit } from '../store/habit-slice';

const AddHabitForm = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [name, setName] = useState<string>("");
    const [frequency, setFrequency] = useState<"daily" | "weekly">("daily");


    const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(name.trim() ){
            dispatch(addHabit({name, frequency}));
        }
    }
  return (
    <form onSubmit={handleForm}>
        <Box sx={{display:"flex", flexDirection:"column", gap:"1rem"}} >
            <TextField label="Habit Name" id='name' value={name} onChange={(e) => setName(e.target.value)} />
                <FormControl>
                    <InputLabel>Frequency</InputLabel>
                    <Select value={frequency} onChange={(e)=>setFrequency(e.target.value as "daily" | "weekly")}>
                        <MenuItem value="daily">Daily</MenuItem>       
                        <MenuItem value="weekly">Weekly</MenuItem>                        
                    </Select>
                </FormControl>
                <Button type='submit' variant='contained' color='secondary'>Add</Button>
        </Box>
    </form>
  )
}

export default AddHabitForm