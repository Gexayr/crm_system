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
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from '@mui/icons-material';

// Define interfaces
export interface Lead {
  id: string;
  title: string;
  customer: string;
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'closed_won' | 'closed_lost';
  value: number;
  assignedTo: string;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
}

const mockLeads: Lead[] = [
  {
    id: '1',
    title: 'New Software Implementation',
    customer: 'Tech Corp',
    status: 'new',
    value: 50000,
    assignedTo: 'John Doe',
    priority: 'high',
    createdAt: '2024-03-07',
  },
  // Add more mock data
];

const LeadDialog: React.FC<{
  open: boolean;
  onClose: () => void;
  lead?: Lead;
}> = ({ open, onClose, lead }) => {
  const [formData, setFormData] = useState<Partial<Lead>>(
    lead || {
      title: '',
      customer: '',
      status: 'new',
      value: 0,
      assignedTo: '',
      priority: 'medium',
    }
  );

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {lead ? 'Edit Lead' : 'Add New Lead'}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
          <TextField
            label="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            fullWidth
          />
          <TextField
            label="Customer"
            value={formData.customer}
            onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
            fullWidth
          />
          <TextField
            label="Value"
            type="number"
            value={formData.value}
            onChange={(e) => setFormData({ ...formData, value: Number(e.target.value) })}
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={formData.status}
              label="Status"
              onChange={(e) => setFormData({ ...formData, status: e.target.value as Lead['status'] })}
            >
              <MenuItem value="new">New</MenuItem>
              <MenuItem value="contacted">Contacted</MenuItem>
              <MenuItem value="qualified">Qualified</MenuItem>
              <MenuItem value="proposal">Proposal</MenuItem>
              <MenuItem value="negotiation">Negotiation</MenuItem>
              <MenuItem value="closed_won">Closed Won</MenuItem>
              <MenuItem value="closed_lost">Closed Lost</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Priority</InputLabel>
            <Select
              value={formData.priority}
              label="Priority"
              onChange={(e) => setFormData({ ...formData, priority: e.target.value as Lead['priority'] })}
            >
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="high">High</MenuItem>
            </Select>
          </FormControl>
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

const Leads: React.FC = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | undefined>();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEdit = (lead: Lead) => {
    setSelectedLead(lead);
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    console.log('Delete lead:', id);
  };

  const handleAddNew = () => {
    setSelectedLead(undefined);
    setDialogOpen(true);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5">Leads</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddNew}
        >
          Add Lead
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Value</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Assigned To</TableCell>
              <TableCell>Created</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockLeads
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell>{lead.title}</TableCell>
                  <TableCell>{lead.customer}</TableCell>
                  <TableCell>
                    <Chip
                      label={lead.status.replace('_', ' ')}
                      color={
                        lead.status === 'closed_won'
                          ? 'success'
                          : lead.status === 'closed_lost'
                          ? 'error'
                          : 'primary'
                      }
                      size="small"
                    />
                  </TableCell>
                  <TableCell>${lead.value.toLocaleString()}</TableCell>
                  <TableCell>
                    <Chip
                      label={lead.priority}
                      color={
                        lead.priority === 'high'
                          ? 'error'
                          : lead.priority === 'medium'
                          ? 'warning'
                          : 'success'
                      }
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{lead.assignedTo}</TableCell>
                  <TableCell>{lead.createdAt}</TableCell>
                  <TableCell>
                    <IconButton size="small" onClick={() => handleEdit(lead)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleDelete(lead.id)}>
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
          count={mockLeads.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      <LeadDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        lead={selectedLead}
      />
    </Box>
  );
};

export default Leads; 