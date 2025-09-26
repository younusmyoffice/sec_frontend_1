import React, { useEffect, useState } from 'react';
import { Box, Typography, Skeleton } from '@mui/material';
import CustomButton from '../../../../components/CustomButton';
import CustomTextField from '../../../../components/CustomTextField/custom-text-field';
import CustomSnackBar from '../../../../components/CustomSnackBar/custom-sack-bar';
import axiosInstance from '../../../../config/axiosInstance';

const HCFAddQuestioner = ({ doctor_id, doctor_list_id }) => {
  const [existingQuestions, setExistingQuestions] = useState([]);
  const [data, setData] = useState({ questions: [] });
  const [loading, setLoading] = useState(false);
  const [snack, setSnack] = useState({ open: false, msg: '', type: 'success' });

  const loadQuestions = async () => {
    if (!doctor_id || !doctor_list_id) return;
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/sec/getdoctorlisting/questionAll/${Number(doctor_list_id)}/${Number(doctor_id)}`);
      if (Array.isArray(res?.data?.response)) setExistingQuestions(res.data.response);
    } catch (e) {
      setSnack({ open: true, type: 'error', msg: e?.response?.data?.error || 'Failed to load questions' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQuestions();
  }, [doctor_id, doctor_list_id]);

  const addBlank = () => {
    setData(prev => ({
      questions: [
        ...prev.questions,
        { doctor_id: Number(doctor_id), doctor_list_id: Number(doctor_list_id), question: '', ans_1: '', ans_2: '', ans_3: '', ans_4: '' },
      ]
    }));
  };

  const handleChange = (idx, field, val) => {
    setData(prev => {
      const copy = [...prev.questions];
      copy[idx] = { ...copy[idx], [field]: val };
      return { questions: copy };
    });
  };

  const submit = async () => {
    try {
      const payload = {
        questions: data.questions.map(q => ({
          ...q,
          doctor_id: Number(doctor_id),
          doctor_list_id: Number(doctor_list_id),
        }))
      };
      await axiosInstance.post('/sec/createUpdatedoctorlisting/questionCreate', JSON.stringify(payload));
      setSnack({ open: true, type: 'success', msg: 'Questions saved' });
      setData({ questions: [] });
      loadQuestions();
    } catch (e) {
      setSnack({ open: true, type: 'error', msg: e?.response?.data?.error || 'Failed to save questions' });
    }
  };

  return (
    <Box>
      <Typography variant='h6' sx={{ mb: 1 }}>Add Questioner</Typography>
      <CustomButton label='Add Question' isTransaprent handleClick={addBlank} />
      <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {data.questions.map((q, idx) => (
          <Box key={idx} sx={{ border: '1px solid #E6E1E5', borderRadius: 2, p: 2 }}>
            <CustomTextField label={`Question ${idx + 1}`} defaultValue={q.question} onInput={(e)=>handleChange(idx,'question', e.target.value)} textcss={{ width: '100%' }} />
            {[1,2,3,4].map(n => (
              <CustomTextField key={n} label={`Answer ${n}`} defaultValue={q[`ans_${n}`]} onInput={(e)=>handleChange(idx,`ans_${n}`, e.target.value)} textcss={{ width: '100%' }} />
            ))}
          </Box>
        ))}
      </Box>
      {data.questions.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <CustomButton label='Save Questions' handleClick={submit} />
        </Box>
      )}
      <Typography variant='subtitle1' sx={{ mt: 3 }}>Existing Questions</Typography>
      {loading ? (
        <Skeleton height={48} />
      ) : existingQuestions.length === 0 ? (
        <Typography>No existing questions</Typography>
      ) : (
        existingQuestions.map((row) => (
          <Box key={row.doctor_questions_id} sx={{ borderBottom: '1px solid #f0f0f0', py: 1 }}>
            <Typography sx={{ fontWeight: 500 }}>{row.question}</Typography>
            <Typography variant='body2'>1. {row.ans_1}</Typography>
            <Typography variant='body2'>2. {row.ans_2}</Typography>
            <Typography variant='body2'>3. {row.ans_3}</Typography>
            <Typography variant='body2'>4. {row.ans_4}</Typography>
          </Box>
        ))
      )}
      <CustomSnackBar isOpen={snack.open} message={snack.msg} type={snack.type} />
    </Box>
  );
};

export default HCFAddQuestioner;

