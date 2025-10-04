import React from 'react';
import { Box, Chip } from '@mui/material';
import './CategoryFilter.scss';

const CategoryFilter = ({
    categories = [
        { id: 'all', label: 'All' },
        { id: 'cardiology', label: 'Cardiology' },
        { id: 'dermatology', label: 'Dermatology' },
        { id: 'neurology', label: 'Neurology' },
        { id: 'orthopedics', label: 'Orthopedics' },
        { id: 'pediatrics', label: 'Pediatrics' }
    ],
    selectedCategory = 'all',
    onCategoryChange,
    className = ""
}) => {
    return (
        <Box className={`category-filter ${className}`}>
            {categories.map((category) => (
                <Chip
                    key={category.id}
                    label={category.label}
                    onClick={() => onCategoryChange?.(category.id)}
                    className={`category-chip ${
                        selectedCategory === category.id ? 'active' : ''
                    }`}
                    variant={selectedCategory === category.id ? 'filled' : 'outlined'}
                />
            ))}
        </Box>
    );
};

export default CategoryFilter;
