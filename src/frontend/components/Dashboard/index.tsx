
import Typography from '@mui/material/Typography';

export default function Dashboard() {
    return (
        <div className='grid grid-cols-2'>
            <div className='text-center h-full mt-10'>
                <Typography variant='body1'>
                    Welcome to the Dashboard!
                    Take a look at your notebooks and start coding!
                </Typography>
            </div>
        </div>
    );
}
