import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from '@mui/material';
import { Activity, CreateActivityRequest } from '../../services/activityService';

interface ActivityDialogProps {
  open: boolean;
  onClose: () => void;
  activity?: Activity;
  onSubmit: (activity: CreateActivityRequest) => void;
}

const ActivityDialog: React.FC<ActivityDialogProps> = ({
  open,
  onClose,
  activity,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<CreateActivityRequest>({
    type: 'task',
    subject: '',
    description: '',
    status: 'pending',
    priority: 'medium',
    dueDate: new Date().toISOString(),
    relatedTo: '',
    assignedTo: '',
  });

  useEffect(() => {
    if (activity) {
      const { id, createdAt, updatedAt, ...rest } = activity;
      setFormData(rest);
    } else {
      setFormData({
        type: 'task',
        subject: '',
        description: '',
        status: 'pending',
        priority: 'medium',
        dueDate: new Date().toISOString(),
        relatedTo: '',
        assignedTo: '',
      });
    }
  }, [activity]);

  const handleSubmit = async () => {
    await onSubmit(formData);
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

export default ActivityDialog; 