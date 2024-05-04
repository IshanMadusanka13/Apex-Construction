import React, { useState, useEffect } from "react";
import { Typography, Button, Grid, TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from "@mui/material";
import axios from "axios"; 
import { errorAlert, successAlert } from "../../utils.js"; 

export default function ResponseLeaveApplication() {
    const [leaveRequests, setLeaveRequests] = useState([]);

    useEffect(() => {
        // Fetch leave requests from the server
        fetchLeaveRequests();
    }, []);

    const fetchLeaveRequests = async () => {
        try {
            // Make a GET request to fetch leave requests from the server
            const response = await axios.get("/api/leave-requests");

            // Set leave requests to the response data
            setLeaveRequests(response.data);
        } catch (error) {
            // Handle error
            errorAlert("Error fetching leave requests");
            console.error("Error fetching leave requests:", error);
        }
    };
   
    const handleAccept = async (id) => {
        try {
            // Make a PUT request to update the status of the leave request to accepted
            await axios.put(`/api/leave-requests/${id}`, { status: 'accepted' });

            // Update the leaveRequests state after successful acceptance
            setLeaveRequests(prevRequests => prevRequests.map(request => {
                if (request.id === id) {
                    return { ...request, status: 'accepted' };
                }
                return request;
            }));

            // Show success message
            successAlert("Leave request accepted successfully");
        } catch (error) {
            // Handle error
            errorAlert("Error accepting leave request");
            console.error("Error accepting leave request:", error);
        }
    };

    const handleDecline = async (id) => {
        try {
            // Make a PUT request to update the status of the leave request to declined
            await axios.put(`/api/leave-requests/${id}`, { status: 'declined' });

            // Update the leaveRequests state after successful decline
            setLeaveRequests(prevRequests => prevRequests.map(request => {
                if (request.id === id) {
                    return { ...request, status: 'declined' };
                }
                return request;
            }));

            // Show success message
            successAlert("Leave request declined successfully");
        } catch (error) {
            // Handle error
            errorAlert("Error declining leave request");
            console.error("Error declining leave request:", error);
        }
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant="h5" gutterBottom>
                    Leave Requests
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Leave Message</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {leaveRequests.map(request => (
                                <TableRow key={request.id}>
                                    <TableCell>{request.name}</TableCell>
                                    <TableCell>{request.email}</TableCell>
                                    <TableCell>{request.message}</TableCell>
                                    <TableCell>
                                        {request.status === 'pending' && (
                                            <>
                                                <Button onClick={() => handleAccept(request.id)} variant="contained" color="primary">Accept</Button>
                                                <Button onClick={() => handleDecline(request.id)} variant="contained" color="secondary">Decline</Button>
                                            </>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    );
}
