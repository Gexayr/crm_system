import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { RootState } from '../../store';
import {
  fetchPayments,
  createPayment,
  updatePayment,
  deletePayment,
} from '../../store/slices/paymentsSlice';
import { Payment, CreatePaymentRequest, UpdatePaymentRequest } from '../../services/paymentService';
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
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import PaymentDialog from './PaymentDialog';

const Payments: React.FC = () => {
  const dispatch = useAppDispatch();
  const { payments, loading, error } = useAppSelector(
    (state: RootState) => state.payments
  );
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | undefined>(undefined);

  useEffect(() => {
    dispatch(fetchPayments());
  }, [dispatch]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAddPayment = async (data: CreatePaymentRequest) => {
    try {
      await dispatch(createPayment(data)).unwrap();
      setOpenDialog(false);
    } catch (error) {
      console.error('Failed to create payment:', error);
    }
  };

  const handleEditPayment = async (data: CreatePaymentRequest) => {
    if (selectedPayment) {
      try {
        await dispatch(updatePayment({ 
          id: selectedPayment.id, 
          data: data 
        })).unwrap();
        setOpenDialog(false);
        setSelectedPayment(undefined);
      } catch (error) {
        console.error('Failed to update payment:', error);
      }
    }
  };

  const handleDeletePayment = async (id: string) => {
    try {
      await dispatch(deletePayment(id)).unwrap();
    } catch (error) {
      console.error('Failed to delete payment:', error);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  // Ensure payments is an array
  const paymentsList = Array.isArray(payments) ? payments : [];

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5">Payments</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setSelectedPayment(undefined);
            setOpenDialog(true);
          }}
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
            {paymentsList
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
                    <IconButton
                      size="small"
                      onClick={() => {
                        setSelectedPayment(payment);
                        setOpenDialog(true);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDeletePayment(payment.id)}
                    >
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
          count={paymentsList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      <PaymentDialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
          setSelectedPayment(undefined);
        }}
        payment={selectedPayment}
        onSubmit={selectedPayment ? handleEditPayment : handleAddPayment}
      />
    </Box>
  );
};

export default Payments; 