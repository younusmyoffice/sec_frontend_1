import React, { useState } from 'react';
import { Box, Typography, TextareaAutosize } from '@mui/material';
import CustomButton from '../../../../components/CustomButton';
import CustomSnackBar from '../../../../components/CustomSnackBar/custom-sack-bar';
import axiosInstance from '../../../../config/axiosInstance';

const HCFAddTerms = ({ doctor_id, doctor_list_id }) => {
  const [description, setDescription] = useState('');
  const [snack, setSnack] = useState({ open: false, msg: '', type: 'success' });

  const submit = async () => {
    try {
      if (!description.trim()) {
        setSnack({ open: true, type: 'error', msg: 'Please enter terms & conditions' });
        return;
      }
      const payload = { doctor_id: Number(doctor_id), doctor_list_id: Number(doctor_list_id), description };
      await axiosInstance.post('/sec/createUpdatedoctorlisting/terms', JSON.stringify(payload));
      setSnack({ open: true, type: 'success', msg: 'Terms saved' });
      setDescription('');
    } catch (e) {
      setSnack({ open: true, type: 'error', msg: e?.response?.data?.error || 'Failed to save terms' });
    }
  };

  return (
    <Box>
      <Typography variant='h6' sx={{ mb: 1 }}>Terms & Conditions</Typography>
      <TextareaAutosize minRows={6} placeholder='Enter terms & conditions visible to patients' style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #E6E1E5' }} value={description} onChange={(e)=>setDescription(e.target.value)} />
      <Box sx={{ mt: 2 }}>
        <CustomButton label='Save Terms' handleClick={submit} />
      </Box>
      <CustomSnackBar isOpen={snack.open} message={snack.msg} type={snack.type} />
    </Box>
  );
};

export default HCFAddTerms;

