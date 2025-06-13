// 🚀 Day 7 + Material-UI Showcase: Best Practices with Beautiful UI
import React, { useState } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  Box,
  Chip,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Alert,
  Fab,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@mui/material';
import {
  Person,
  Email,
  LocationOn,
  Business,
  Add,
  Visibility,
  Edit,
  Delete,
  Phone,
  Language,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useGetUsers, useCreateUser } from '../hooks/useUsers';

const ShowcasePage: React.FC = () => {
  // 🚀 Day 7: Using our custom hooks with Material-UI
  const { data: users, isLoading, isError, error } = useGetUsers();
  const createUserMutation = useCreateUser();

  // Form state for creating new user
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
  });

  const handleCreateUser = () => {
    if (!formData.name.trim() || !formData.email.trim() || !formData.username.trim()) {
      return;
    }

    createUserMutation.mutate({
      name: formData.name.trim(),
      email: formData.email.trim(),
      username: formData.username.trim(),
      address: {
        street: 'N/A',
        suite: 'N/A',
        city: 'Bangkok',
        zipcode: '10110',
        geo: { lat: '13.7563', lng: '100.5018' }
      },
      phone: '02-xxx-xxxx',
      website: 'example.com',
      company: {
        name: 'Example Company',
        catchPhrase: 'Innovation at its best',
        bs: 'synergistic solutions'
      }
    });

    setFormData({ name: '', username: '', email: '' });
    setOpenDialog(false);
  };

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, textAlign: 'center' }}>
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading users with our custom hooks...
        </Typography>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">
          <Typography variant="h6">Error loading users</Typography>
          <Typography>{error?.message}</Typography>
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header Section */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom color="primary">
          🎨 Material-UI Showcase
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Day 7 Best Practices + Beautiful UI Components
        </Typography>
        <Chip 
          label={`${users?.length || 0} Users Loaded`} 
          color="success" 
          variant="outlined" 
          sx={{ mt: 1 }}
        />
      </Box>

      {/* Features Overview */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" color="primary" gutterBottom>
                🎣 Custom Hooks
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Using useGetUsers() and useCreateUser() hooks for clean, reusable logic
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" color="primary" gutterBottom>
                🏭 Query Key Factories
              </Typography>
              <Typography variant="body2" color="text.secondary">
                No more magic strings! Autocomplete and type-safe query keys
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" color="primary" gutterBottom>
                🎨 Material-UI
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Beautiful, accessible components with our clean architecture
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />

      {/* Users Grid View */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          👥 Users Gallery
        </Typography>
        <Grid container spacing={3}>
          {users?.slice(0, 6).map((user) => (
            <Grid item xs={12} sm={6} md={4} key={user.id}>
              <Card 
                elevation={2} 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'translateY(-4px)' }
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                      <Person />
                    </Avatar>
                    <Box>
                      <Typography variant="h6" component="h3">
                        {user.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        @{user.username}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Email sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {user.email}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <LocationOn sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {user.address.city}
                    </Typography>
                  </Box>
                  
                  {user.company && (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Business sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {user.company.name}
                      </Typography>
                    </Box>
                  )}
                </CardContent>
                
                <CardActions>
                  <Button 
                    size="small" 
                    component={Link} 
                    to={`/users/${user.id}`}
                    startIcon={<Visibility />}
                  >
                    View Details
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Users Table View */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          📊 Users Table
        </Typography>
        <TableContainer component={Paper} elevation={2}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: 'primary.main' }}>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Name</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Username</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Email</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Company</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users?.map((user) => (
                <TableRow 
                  key={user.id}
                  sx={{ '&:hover': { bgcolor: 'action.hover' } }}
                >
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ mr: 2, width: 32, height: 32 }}>
                        {user.name.charAt(0)}
                      </Avatar>
                      {user.name}
                    </Box>
                  </TableCell>
                  <TableCell>@{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.company?.name || 'N/A'}</TableCell>
                  <TableCell>
                    <IconButton 
                      size="small" 
                      component={Link} 
                      to={`/users/${user.id}`}
                      color="primary"
                    >
                      <Visibility />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Floating Action Button */}
      <Fab
        color="primary"
        aria-label="add user"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={() => setOpenDialog(true)}
      >
        <Add />
      </Fab>

      {/* Create User Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Typography variant="h6">➕ Create New User</Typography>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <TextField
              fullWidth
              label="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              margin="normal"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              margin="normal"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              margin="normal"
              variant="outlined"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button 
            onClick={handleCreateUser}
            variant="contained"
            disabled={createUserMutation.isPending || !formData.name.trim() || !formData.email.trim() || !formData.username.trim()}
            startIcon={createUserMutation.isPending ? <CircularProgress size={16} /> : <Add />}
          >
            {createUserMutation.isPending ? 'Creating...' : 'Create User'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success/Error Alerts */}
      {createUserMutation.isSuccess && (
        <Alert severity="success" sx={{ position: 'fixed', bottom: 80, right: 16, zIndex: 1000 }}>
          User created successfully!
        </Alert>
      )}
      
      {createUserMutation.isError && (
        <Alert severity="error" sx={{ position: 'fixed', bottom: 80, right: 16, zIndex: 1000 }}>
          Failed to create user: {createUserMutation.error?.message}
        </Alert>
      )}
    </Container>
  );
};

export default ShowcasePage;
