import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Grid, Typography, TextField, Button } from "@mui/material";

const Contactus = () => {
    const form = useRef();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [whatsappMessage, setWhatsappMessage] = useState('');
    const [name, setName] = useState('');

    const resetFormFields = () => {
        setName('');
        setPhoneNumber('');
        setWhatsappMessage('');
    };

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm('service_k2uckof', 'template_g352bla', form.current, {
                publicKey: 'kTQ1AxubzMu1x-gd8',
            })
            .then(
                () => {
                    console.log('SUCCESS!');
                    alert("Email sent successfully");
                    resetFormFields();
                },
                (error) => {
                    console.log('FAILED...', error.text);
                    alert("Failed to send email");
                },
            );
    };

    const sendWhatsAppMessage = () => {
        const url = `https://wa.me/${phoneNumber}?text=I%27m%20api%20msg%20hello%20${name}%20friend%20${whatsappMessage}`;
        window.open(url, '_blank');
        resetFormFields();
    };

    return (
        <div>
            <Typography variant="h1" gutterBottom>Send Email</Typography>
            <form ref={form} onSubmit={sendEmail}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Name"
                            name="user_name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Email"
                            name="user_email"
                            type="email"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Message"
                            name="message"
                            multiline
                            rows={4}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" type="submit" color="primary">Send</Button>
                    </Grid>
                </Grid>
            </form>
            <div>
                <Typography variant="h3" gutterBottom>Send Messages With WhatsApp</Typography>
                <Typography variant="body1">Add number without space like 17272912606 not +1 (727) 2912606</Typography>
                <Typography variant="body1">Contact us with this number +1 (727) 2912606</Typography>
                <TextField
                    fullWidth
                    id="number"
                    type="number"
                    placeholder="Phone 966506666666"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <TextField
                    fullWidth
                    id="name"
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    fullWidth
                    id="msg"
                    type="text"
                    placeholder="Type message"
                    value={whatsappMessage}
                    onChange={(e) => setWhatsappMessage(e.target.value)}
                />
                <Button variant="contained" color="primary" onClick={sendWhatsAppMessage}>Send</Button>
            </div>
        </div>
    )
}

export default Contactus;
