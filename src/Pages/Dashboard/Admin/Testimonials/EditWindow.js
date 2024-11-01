import React, { useContext, useState } from 'react';
import { AppContext } from '../../../../context/Context';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Box,
  Rating
} from '@mui/material';
import axios from "axios";
const EditWindow = ({ testimonial, handleClose }) => {
    const {setOpen,setAlertMsg,alertMsg,setMsgType} = useContext(AppContext);
  const [formData, setFormData] = useState({
    name: testimonial.name,
    rating: testimonial.rating,
    discipline: testimonial.discipline,
    message: testimonial.message
  });

  const handleChange = (field) => (event, value) => {
    setFormData({
      ...formData,
      [field]: value !== undefined ? value : event.target.value
    });
  };

  const handleSubmit = () => {
    axios.put(`http://localhost:8000/api/testimonial/editTestimonial/${testimonial._id}`,formData).then(res=>{
      setAlertMsg("Testimonial edited successfully...");
      setMsgType("info");
      setOpen(true);
      handleClose("edit");

    }).catch(e => console.log(e));
  };

  return (
    <Dialog open={true} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Testimonial</DialogTitle>
      <br />
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={formData.name}
            onChange={handleChange('name')}
          />
          <Box display="flex" alignItems="center">
            Rating:
            <Rating
              name="rating"
              value={formData.rating}
              onChange={handleChange('rating')}
              max={5}
            />
          </Box>
          <TextField
            label="Discipline"
            variant="outlined"
            fullWidth
            value={formData.discipline}
            onChange={handleChange('discipline')}
          />
          <TextField
            label="Message"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={formData.message}
            onChange={handleChange('message')}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={()=>handleClose("edit")} color="secondary">Cancel</Button>
        <Button onClick={handleSubmit} color="primary">Edit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditWindow;
