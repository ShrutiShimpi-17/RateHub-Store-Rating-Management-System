import React, { useState } from 'react';
import { Rating, Box, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

const labels = {
  1: 'Terrible',
  2: 'Poor',
  3: 'Average',
  4: 'Good',
  5: 'Excellent'
};

const StarRating = ({ value, onChange, readOnly = false, size = "medium" }) => {
  const [hover, setHover] = useState(-1);

  if (readOnly) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <Rating
          name="read-only-stars"
          value={Number(value) || 0}
          readOnly
          precision={0.1}
          size={size}
          emptyIcon={<StarIcon style={{ opacity: 0.25 }} fontSize="inherit" />}
          sx={{
            color: '#F59E0B' // Amber
          }}
        />
        <Typography 
          variant="body2" 
          sx={{ 
            fontWeight: 600, 
            color: 'text.secondary', 
            ml: 0.5,
            fontSize: size === 'small' ? '0.75rem' : '0.875rem'
          }}
        >
          {value ? parseFloat(value).toFixed(1) : '0.0'}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Rating
          name="interactive-stars"
          value={value || 0}
          precision={1}
          size="large"
          onChange={(event, newValue) => {
            if (onChange) {
              onChange(newValue);
            }
          }}
          onChangeActive={(event, newHover) => {
            setHover(newHover);
          }}
          emptyIcon={<StarIcon style={{ opacity: 0.3 }} fontSize="inherit" />}
          sx={{
            color: '#F59E0B',
            '& .MuiRating-icon': {
              transition: 'transform 0.15s ease-in-out'
            },
            '& .MuiRating-iconHover': {
              transform: 'scale(1.2)',
              color: '#F59E0B'
            }
          }}
        />
      </Box>
      <Box sx={{ minHeight: 20 }}>
        <Typography 
          variant="caption" 
          sx={{ 
            fontWeight: 600, 
            color: 'primary.main',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}
        >
          {labels[hover !== -1 ? hover : value] || 'Click to rate'}
        </Typography>
      </Box>
    </Box>
  );
};

export default StarRating;
