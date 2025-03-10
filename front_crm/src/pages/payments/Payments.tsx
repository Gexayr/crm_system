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

interface Payment {
  id: string;
  invoiceNumber: string;
  customer: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentMethod: 'credit_card' | 'bank_transfer' | 'cash' | 'other';
  date: string;
  dueDate: string;
}

const mockPayments: Payment[] = [
  {
    id: '1',
    invoiceNumber: 'INV-2024-001',
    customer: 'Tech Corp',
    amount: 5000,
    status: 'completed',
    paymentMethod: 'credit_card',
    date: '2024-03-07',
    dueDate: '2024-04-07',
  },
  // Add more mock data
];

const PaymentDialog: React.FC<{
  open: boolean;
  onClose: () => void;
  payment?: Payment;
}> = ({ open, onClose, payment }) => {
  const [formData, setFormData] = useState<Partial<Payment>>(
    payment || {
      invoiceNumber: '',
      customer: '',
      amount: 0,
      status: 'pending',
      paymentMethod: 'credit_card',
      date: '',
      dueDate: '',
    }
  );

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {payment ? 'Edit Payment' : 'Add New Payment'}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
          <TextField
            label="Invoice Number"
            value={formData.invoiceNumber}
            onChange={(e) => setFormData({ ...formData, invoiceNumber: e.target.value })}
            fullWidth
          />
          <TextField
            label="Customer"
            value={formData.customer}
            onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
            fullWidth
          />
          <TextField
            label="Amount"
            type="number"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={formData.status}
              label="Status"
              onChange={(e) => setFormData({ ...formData, status: e.target.value as Payment['status'] })}
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="failed">Failed</MenuItem>
              <MenuItem value="refunded">Refunded</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Payment Method</InputLabel>
            <Select
              value={formData.paymentMethod}
              label="Payment Method"
              onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value as Payment['paymentMethod'] })}
            >
              <MenuItem value="credit_card">Credit Card</MenuItem>
              <MenuItem value="bank_transfer">Bank Transfer</MenuItem>
              <MenuItem value="cash">Cash</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Payment Date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
          <TextField
            label="Due Date"
            type="date"
            value={formData.dueDate}
            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
            InputLabelProps={{ shrink: true }}
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

const Payments: React.FC = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | undefined>();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEdit = (payment: Payment) => {
    setSelectedPayment(payment);
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    console.log('Delete payment:', id);
  };

  const handleAddNew = () => {
    setSelectedPayment(undefined);
    setDialogOpen(true);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5">Payments</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddNew}
        >
          Add Payment
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Invoice #</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Payment Method</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockPayments
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>{payment.invoiceNumber}</TableCell>
                  <TableCell>{payment.customer}</TableCell>
                  <TableCell>${payment.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <Chip
                      label={payment.status}
                      color={
                        payment.status === 'completed'
                          ? 'success'
                          : payment.status === 'failed'
                          ? 'error'
                          : payment.status === 'refunded'
                          ? 'warning'
                          : 'default'
                      }
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{payment.paymentMethod.replace('_', ' ')}</TableCell>
                  <TableCell>{payment.date}</TableCell>
                  <TableCell>{payment.dueDate}</TableCell>
                  <TableCell>
                    <IconButton size="small" onClick={() => handleEdit(payment)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleDelete(payment.id)}>
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
          count={mockPayments.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      <PaymentDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        payment={selectedPayment}
      />
    </Box>
  );
};

export default Payments; 