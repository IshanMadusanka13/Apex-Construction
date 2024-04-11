import { Button, Grid, Typography, TextField, Select, MenuItem, TextareaAutosize, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const ComplaintForm = ({ addComplaint, updateComplaint, submitted, data, isEdit }) => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [type, setType] = useState('');
    const [subject, setSubject] = useState('');
    const [complaint, setComplaint] = useState('');

    useEffect(() => {
        if (!submitted) {
            setName('');
            setEmail('');
            setPhone('');
            setType('');
            setSubject('');
            setComplaint('');
        }
    }, [submitted]);

    useEffect(() => {
        if (data?.name && data.name !== 0) {
            setName(data.name);
            setEmail(data.email);
            setPhone(data.phone);
            setType(data.type);
            setSubject(data.subject);
            setComplaint(data.complaint);
        }
    }, [data]);

    return (
        <div className="container">
            <Paper elevation={3} sx={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
                <Typography variant="h4" gutterBottom>Complaint Form</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => navigate('/users')}
                            style={{ marginRight: '10px' }}
                        >
                            Users
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => navigate('/auths')}
                            style={{ marginRight: '10px' }}
                        >
                            Auths
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
                            id="name"
                            label="Name"
                            variant="outlined"
                            fullWidth
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="Enter Name"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="email"
                            label="Email"
                            variant="outlined"
                            fullWidth
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="Enter Email"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="phone"
                            label="Phone"
                            variant="outlined"
                            fullWidth
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                            placeholder="Enter Phone"
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
                            <MenuItem value="employee">Employee</MenuItem>
                            <MenuItem value="Site">Site</MenuItem>
                            <MenuItem value="Package">Package</MenuItem>
                            <MenuItem value="Stock">Stock</MenuItem>
                            <MenuItem value="Transportation">Transportation</MenuItem>
                            <MenuItem value="HR">HR</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="subject"
                            label="Subject"
                            variant="outlined"
                            fullWidth
                            value={subject}
                            onChange={e => setSubject(e.target.value)}
                            placeholder="Enter Subject"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextareaAutosize
                            id="complaint"
                            rowsMin={3}
                            placeholder="Enter Complaint"
                            value={complaint}
                            onChange={e => setComplaint(e.target.value)}
                            style={{ width: '100%', minHeight: '100px', padding: '10px', fontSize: '16px', lineHeight: '1.5', border: '1px solid #ccc', borderRadius: '5px' }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                if (isEdit) {
                                    updateComplaint({ name, email, phone, type, subject, complaint });
                                } else {
                                    addComplaint({ name, email, phone, type, subject, complaint });
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

export default ComplaintForm;
