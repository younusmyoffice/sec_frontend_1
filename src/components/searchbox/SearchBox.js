import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBox = () => {
    return (
        <Box
            display="flex"
            margin="10px"
            flexWrap="wrap"
            border={1}
            borderColor="#AEAAAE"
            borderRadius="25px"
            width="30em"
            height="38px"
            backgroundColor="#E6E1E5"
        >
            <Stack direction="row" alignItems="center" gap={1} padding="10px">
                <SearchIcon sx={{ color: "#AEAAAE" }} />
                <Typography variant="body1" sx={{ textAlign: "left", color: "#AEAAAE" }}>
                    Search Patient Name / ID
                </Typography>
            </Stack>
        </Box>
    );
};

export default SearchBox;
