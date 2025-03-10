import React, { useState } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Button,
  Typography,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from '@mui/icons-material';

interface Activity {
  id: string;
  type: 'call' | 'meeting' | 'email' | 'task' | 'note';
  subject: string;
  description: string;
  status: 'pending' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  relatedTo: string;
  assignedTo: string;
}

const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'call',
    subject: 'Follow-up Call',
    description: 'Discuss project progress',
    status: 'pending',
    priority: 'high',
    dueDate: '2024-03-10',
    relatedTo: 'Tech Corp',
    assignedTo: 'John Doe',
  },
  // Add more mock data
];

const ActivityDialog: React.FC<{
  open: boolean;
  onClose: () => void;
  activity?: Activity;
}> = ({ open, onClose, activity }) => {
  const [formData, setFormData] = useState<Partial<Activity>>(
    activity || {
      type: 'call',
      subject: '',
      description: '',
      status: 'pending',
      priority: 'medium',
      dueDate: '',
      relatedTo: '',
      assignedTo: '',
    }
  );

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {activity ? 'Edit Activity' : 'Add New Activity'}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
          <FormControl fullWidth>
            <InputLabel>Type</InputLabel>
            <Select
              value={formData.type}
              label="Type"
              onChange={(e) => setFormData({ ...formData, type: e.target.value as Activity['type'] })}
            >
              <MenuItem value="call">Call</MenuItem>
              <MenuItem value="meeting">Meeting</MenuItem>
              <MenuItem value="email">Email</MenuItem>
              <MenuItem value="task">Task</MenuItem>
              <MenuItem value="note">Note</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Subject"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            fullWidth
          />
          <TextField
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            multiline
            rows={3}
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={formData.status}
              label="Status"
              onChange={(e) => setFormData({ ...formData, status: e.target.value as Activity['status'] })}
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Priority</InputLabel>
            <Select
              value={formData.priority}
              label="Priority"
              onChange={(e) => setFormData({ ...formData, priority: e.target.value as Activity['priority'] })}
            >
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="high">High</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Due Date"
            type="date"
            value={formData.dueDate}
            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
          <TextField
            label="Related To"
            value={formData.relatedTo}
            onChange={(e) => setFormData({ ...formData, relatedTo: e.target.value })}
            fullWidth
          />
          <TextField
            label="Assigned To"
            value={formData.assignedTo}
            onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const Activities: React.FC = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEdit = (activity: Activity) => {
    setSelectedActivity(activity);
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    console.log('Delete activity:', id);
  };

  const handleAddNew = () => {
    setSelectedActivity(undefined);
    setDialogOpen(true);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5">Activities</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddNew}
        >
          Add Activity
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Related To</TableCell>
              <TableCell>Assigned To</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockActivities
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell>
                    <Chip label={activity.type} size="small" />
                  </TableCell>
                  <TableCell>{activity.subject}</TableCell>
                  <TableCell>
                    <Chip
                      label={activity.status}
                      color={
                        activity.status === 'completed'
                          ? 'success'
                          : activity.status === 'cancelled'
                          ? 'error'
                          : 'warning'
                      }
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={activity.priority}
                      color={
                        activity.priority === 'high'
                          ? 'error'
                          : activity.priority === 'medium'
                          ? 'warning'
                          : 'success'
                      }
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{activity.dueDate}</TableCell>
                  <TableCell>{activity.relatedTo}</TableCell>
                  <TableCell>{activity.assignedTo}</TableCell>
                  <TableCell>
                    <IconButton size="small" onClick={() => handleEdit(activity)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleDelete(activity.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={mockActivities.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      <ActivityDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        activity={selectedActivity}
      />
    </Box>
  );
};

export default Activities; 