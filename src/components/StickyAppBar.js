import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function StickyAppBar() {
    return (
        <AppBar position="sticky">
            <Toolbar>
                <Typography variant="h6" component="div">
                    FitFlex
                </Typography>
                {/* Add navigation links or buttons here */}
            </Toolbar>
        </AppBar>
    );
}

export default StickyAppBar;
