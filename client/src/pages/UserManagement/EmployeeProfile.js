import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Typography, Button, Grid, Avatar } from "@mui/material";
import axios from "axios";
import ProfileSidebar from "../../components/ProfileSidebar";

export default function EmployeeProfile() {
    const [selectedContent, setSelectedContent] = useState("profile");

    const handleSidebarItemClick = (content) => {
        setSelectedContent(content);
    };
    return (
        <Grid container spacing={3} style={{ marginTop: 60 }}>
            <Grid item xs={3}>
                <ProfileSidebar onItemClick={handleSidebarItemClick} />
            </Grid>
            <Grid item xs={9}>
                <main style={{ padding: "20px" }}>
                    {selectedContent === "profile" && <Profile />}
                </main>
            </Grid>
        </Grid>
    );
}

function Profile() {
    
}