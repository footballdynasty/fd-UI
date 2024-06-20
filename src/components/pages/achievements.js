import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const API_URL = 'http://localhost:8080/api/v1.0/achievements';
const DELETE_URL = 'http://localhost:8080/api/v1.0/deleteAchievement';
const UPDATE_URL = 'http://localhost:8080/api/v1.0/updateAchievement';

function Achievements() {
    const [achievements, setAchievements] = useState([]);
    const [error, setError] = useState(null);
    const [open, setCreateOpen] = useState(false);
    const [dopen, setDeleteOpen] = useState(false);
    const [updateOpen, setUpdateOpen] = useState(false);
    const [newDescription, setNewDescription] = useState('');
    const [newReward, setNewReward] = useState('');
    const [savedId, setSavedId] = useState('');
    const [updateDescription, setUpdateDescription] = useState('');
    const [updateEpoch, setUpdateEpoch] = useState('');
    const [updateReward, setUpdateReward] = useState('');
    const [updateId, setUpdateId] = useState('');

    useEffect(() => {
        fetch(API_URL)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setAchievements(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError(error);
            });
    }, []);

    const handleCreateAchievement = () => {
        const createURL = `http://localhost:8080/api/v1.0/createAchievement?description=${newDescription}&reward=${newReward}`;
        fetch(createURL, {
            method: 'POST'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setAchievements([...achievements, data]);
                setCreateOpen(false);
                setNewDescription('');
                setNewReward('');
            })
            .catch(error => {
                console.error('Error creating achievement:', error);
                setError(error);
            });
    };

    const handleDeleteAchievement = () => {
        const deleteURL = `${DELETE_URL}?id=${savedId}`;
        fetch(deleteURL, {
            method: 'DELETE'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                if (response.data === undefined) {
                    console.log("preventing json error")
                } else {
                    return response.json();
                }
            })
            .then(() => {
                const updatedAchievements = achievements.filter(achievement => achievement.id !== savedId);
                setAchievements(updatedAchievements);
                setDeleteOpen(false);
                setSavedId('');
            })
            .catch(error => {
                console.error('Error deleting achievement:', error);
                setError(error);
            });
    };

    const handleUpdateAchievement = () => {
        let updateURL = `${UPDATE_URL}?id=${updateId}&description=${updateDescription}&reward=${updateReward}`;
    
        if (updateEpoch) {
            updateURL += `&date_completed=${updateEpoch}`;
        }
    
        fetch(updateURL, {
            method: 'POST'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                if (response.data === undefined) {
                    console.log("preventing json error")
                } else {
                    return response.json();
                }
            })
            .then(data => {
                const updatedAchievements = achievements.map(achievement => {
                    if (achievement.id === updateId) {
                        return {
                            ...achievement,
                            description: updateDescription,
                            reward: updateReward
                        };
                    }
                    return achievement;
                });
                setAchievements(updatedAchievements);
                setUpdateOpen(false);
                setUpdateId('');
                setUpdateDescription('');
                setUpdateReward('');
                setUpdateEpoch('');
            })
            .catch(error => {
                console.error('Error updating achievement:', error);
                setError(error);
            });
    };

    const handleDeleteOpen = (achievement) => {
        setSavedId(achievement.id);
        setDeleteOpen(true);
    };
    
    const handleDeleteClose = () => {
        setDeleteOpen(false);
    };
    
    const handleCreateOpen = () => {
        setCreateOpen(true);
    };
    
    const handleCreateClose = () => {
        setCreateOpen(false);
    };

    const handleUpdateOpen = (achievement) => {
        setUpdateOpen(true);
        setUpdateId(achievement.id);
        setUpdateDescription(achievement.description);
        setUpdateReward(achievement.reward);
        setUpdateEpoch(achievement.date_completed ? achievement.date_completed.toString() : '');
    };
    
    const handleUpdateClose = () => {
        setUpdateOpen(false);
    };

    if (error) {
        return <Typography>Error: {error.message}</Typography>;
    }

    return (
        <Box sx={{ padding: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Button variant="contained" color="primary" onClick={handleCreateOpen}>
                        Create Achievement
                    </Button>
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center', flexGrow: 1 }}>
                    {achievements.map((achievement, index) => (
                        <Card
                            key={achievement.id}
                            sx={{
                                maxWidth: 350,
                                margin: 2,
                                position: 'relative',
                                filter: achievement.date_completed ? 'blur(2px)' : 'none',
                                pointerEvents: achievement.date_completed ? 'none' : 'auto',
                                opacity: achievement.date_completed ? 0.7 : 1,
                            }}
                        >
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    Achievement {index + 1}
                                </Typography>
                                <Typography variant="body2">
                                    {achievement.description}
                                </Typography>
                                <br />
                                <Typography variant="body2">
                                    Completing this achievement will allow you to: {achievement.reward}
                                </Typography>
                                {achievement.date_completed && (
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            transform: 'translate(-50%, -50%)',
                                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                            padding: '4px 8px',
                                            borderRadius: '4px',
                                            fontWeight: 'bold',
                                            zIndex: 10000,
                                        }}
                                    >
                                        Completed on {new Date(achievement.date_completed * 1000).toLocaleDateString()}
                                    </Typography>
                                )}
                            </CardContent>
                            <CardActions>
                                <Button onClick={() => handleUpdateOpen(achievement)}>Update</Button>
                                <Button onClick={() => handleDeleteOpen(achievement)}>Delete</Button>
                                <Button>Claim Reward</Button>
                            </CardActions>
                            <Typography variant="caption" color="textSecondary" sx={{ marginLeft: 2 }}>
                                ID: {achievement.id}
                            </Typography>
                        </Card>
                    ))}
                </Box>
            </Box>
            <Dialog open={open} onClose={handleCreateClose}>
                <DialogTitle>Create a New Achievement</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Description"
                        type="text"
                        fullWidth
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Reward"
                        type="text"
                        fullWidth
                        value={newReward}
                        onChange={(e) => setNewReward(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCreateClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleCreateAchievement} color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={updateOpen} onClose={handleUpdateClose}>
                <DialogTitle>Update Achievement</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Description"
                        type="text"
                        fullWidth
                        value={updateDescription}
                        onChange={(e) => setUpdateDescription(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Reward"
                        type="text"
                        fullWidth
                        value={updateReward}
                        onChange={(e) => setUpdateReward(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Epoch (Date Completed)"
                        type="text"
                        fullWidth
                        value={updateEpoch}
                        onChange={(e) => setUpdateEpoch(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleUpdateClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleUpdateAchievement} color="primary">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={dopen} onClose={handleDeleteClose}>
                <DialogTitle>Delete an Achievement</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="ID"
                        type="text"
                        fullWidth
                        value={savedId}
                        onChange={(e) => setSavedId(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteAchievement} color="primary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default Achievements;
