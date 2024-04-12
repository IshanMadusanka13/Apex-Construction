import { Button, Grid, Typography, Select, MenuItem, TextField, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const AuthForm = ({ addAuth, updateAuth, submitted, data, isEdit }) => {
    const navigate = useNavigate();
    const [id, setId] = useState(0);
    const [localauthorityname, setLocalauthorityname] = useState('');
    const [type, setType] = useState('');
    const [city, setCity] = useState('');
    const [place, setPlace] = useState('');
    const [nooffloors, setNooffloors] = useState('');

    useEffect(() => {
        if (!submitted) {
            setId(0);
            setLocalauthorityname('');
            setType('');
            setCity('');
            setPlace('');
            setNooffloors('');
        }
    }, [submitted]);

    useEffect(() => {
        if (data?.id && data.id !== 0) {
            setId(data.id);
            setLocalauthorityname(data.localauthorityname);
            setType(data.type);
            setCity(data.city);
            setPlace(data.place);
            setNooffloors(data.nooffloors);
        }
    }, [data]);

    return (
        <div className="container">
            <Paper elevation={3} sx={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
                <Typography variant="h4" gutterBottom>Authorization Form</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => navigate('/feedbacks')}
                            style={{ marginRight: '10px' }}
                        >
                            Feedbacks
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => navigate('/complaints')}
                            style={{ marginRight: '10px' }}
                        >
                            Complaints
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => navigate('/')}
                        >
                            Home
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="id"
                            label="ID"
                            variant="outlined"
                            fullWidth
                            value={id}
                            onChange={e => setId(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="localauthorityname"
                            label="Local Authority Name"
                            variant="outlined"
                            fullWidth
                            value={localauthorityname}
                            onChange={e => setLocalauthorityname(e.target.value)}
                            placeholder="Enter Local Authority Name"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Select
                            value={type}
                            onChange={e => setType(e.target.value)}
                            fullWidth
                            displayEmpty
                        >
                            <MenuItem value="" disabled>Type</MenuItem>
                            <MenuItem value="building">Building</MenuItem>
                            <MenuItem value="Apartment">Apartment</MenuItem>
                            <MenuItem value="House">House</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="city"
                            label="City"
                            variant="outlined"
                            fullWidth
                            value={city}
                            onChange={e => setCity(e.target.value)}
                            placeholder="Enter City"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="place"
                            label="Place"
                            variant="outlined"
                            fullWidth
                            value={place}
                            onChange={e => setPlace(e.target.value)}
                            placeholder="Enter Place"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="nooffloors"
                            label="No of Floors"
                            variant="outlined"
                            fullWidth
                            value={nooffloors}
                            onChange={e => setNooffloors(e.target.value)}
                            placeholder="Enter No of Floors"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                if (isEdit) {
                                    updateAuth({ id, localauthorityname, type, city, place, nooffloors });
                                } else {
                                    addAuth({ id, localauthorityname, type, city, place, nooffloors });
                                }
                            }}
                        >
                            {isEdit ? 'Update' : 'Submit'}
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}

export default AuthForm;
