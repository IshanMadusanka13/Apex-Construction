import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, Select, MenuItem, useTheme, styled, tableCellClasses, TablePagination } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { GET_NEW_FEEDBACK, REPLY_FEEDBACK } from "../../EndPoints";
import { errorAlert, scrollPage, successAlert, userTypes } from "../../utils";
import { useNavigate } from "react-router-dom";

const FeedbackReply = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [selectedFeedback, setSelectedFeedback] = useState({});
    const [viewForm, setViewForm] = useState(false);

    const theme = useTheme();
    const navigate = useNavigate();

    useEffect(() => {
        getNewFeedbacks();
    }, [navigate]);

    const getNewFeedbacks = () => {
        axios.get(GET_NEW_FEEDBACK)
            .then(response => {
                setFeedbacks(response.data);
            })
            .catch(error => {
                console.error(error);
                errorAlert("Error Loading Feedbacks");
            });
    }

    const replyToFeedback = (data) => {
        axios.put(REPLY_FEEDBACK, data)
            .then(() => {
                getNewFeedbacks();
                setViewForm(false);
                successAlert("Replied to Feedback Succesfully");
            })
            .catch(error => {
                console.error(error);
                errorAlert(error.response.data.message);
            });
    }

    return (
        <Grid container>
            <Grid item md={12} sx={theme.palette.gridBody}>
                <FeedbackTable
                    rows={feedbacks}
                    selectedFeedback={data => {
                        setSelectedFeedback(data);
                        setViewForm(true);
                    }}
                />
            </Grid>
            {viewForm && (
                <Grid item md={12} sx={theme.palette.gridBody}>
                    <ReplyForm
                        replyFeedback={replyToFeedback}
                        feedbackDetails={selectedFeedback}
                    />
                </Grid>
            )}
        </Grid>
    );
}

const ReplyForm = ({ replyFeedback, feedbackDetails }) => {

    const [replyDetails, setReplyDetails] = useState({
        id: "",
        name: "",
        email: "",
        type: "",
        message: "",
        reply: ""
    });

    const handleChange = (field, value) => {
        setReplyDetails((prevDetails) => ({
            ...prevDetails,
            [field]: value,
        }));
    };

    useEffect(() => {
        handleChange('id', feedbackDetails._id);
        handleChange('name', feedbackDetails.name);
        handleChange('email', feedbackDetails.email);
        handleChange('message', feedbackDetails.message);
        handleChange('type', feedbackDetails.type);
    }, [feedbackDetails]);

    const replyToFeedback = (e) => {
        e.preventDefault();
        replyFeedback(replyDetails);
    }

    return (
        <Box>
            <Typography variant="h4" gutterBottom>FeedBack Reply</Typography>
            <Grid container spacing={2} component="form" onSubmit={replyToFeedback}>
                <Grid item md={5}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        name="name"
                        value={replyDetails.name}
                        disabled
                    />
                </Grid>
                <Grid item md={5}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        value={replyDetails.email}
                        disabled
                    />
                </Grid>
                <Grid item md={2}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="type"
                        label="Type"
                        name="type"
                        value={replyDetails.type}
                        disabled
                    />
                </Grid>
                <Grid item md={12}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        multiline
                        minRows={4}
                        id="message"
                        label="Message"
                        name="message"
                        value={replyDetails.message}
                        disabled
                    />
                </Grid>
                <Grid item md={12}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        multiline
                        minRows={4}
                        id="reply"
                        label="Response"
                        name="reply"
                        value={replyDetails.reply}
                        onChange={(e) => handleChange('reply', e.target.value)}
                    />
                </Grid>
                <Grid item md={12}>
                    <Button type="submit" variant="contained" sx={{ mt: 2, width: "20%", borderRadius: "5" }}>Submit</Button>
                </Grid>
            </Grid>
        </Box>
    );

}

const FeedbackTable = ({ rows, selectedFeedback, }) => {

    const theme = useTheme();

    //--------------------------Table Functions------------------------------
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const StyledTableCell = styled(TableCell)(() => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.text.default,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(() => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.primary.mainOpacity,
        },
        '&:nth-of-type(even)': {
            backgroundColor: theme.palette.primary.mainOpacity2,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));
    //--------------------------Table Functions end------------------------------


    return (
        <Box>
            <TableContainer component={Paper} sx={{ backgroundColor: theme.palette.primary.main }}>
                <Table>
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell>Email</StyledTableCell>
                            <StyledTableCell>Type</StyledTableCell>
                            <StyledTableCell>Action</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {rows && rows.length > 0 ? (
                            rows.map(row => (
                                <StyledTableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <StyledTableCell>{row.name}</StyledTableCell>
                                    <StyledTableCell>{row.email}</StyledTableCell>
                                    <StyledTableCell>{row.type}</StyledTableCell>
                                    <StyledTableCell>
                                        <Button sx={{ margin: '0px 10px' }} onClick={() => selectedFeedback(row)}>
                                            Reply
                                        </Button>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))
                        ) : (
                            <StyledTableRow>
                                <StyledTableCell colSpan={3}>No Data</StyledTableCell>
                            </StyledTableRow>
                        )}
                    </TableBody>
                </Table>

                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
        </Box>
    );
}

export default FeedbackReply;
