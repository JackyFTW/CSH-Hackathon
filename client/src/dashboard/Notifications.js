import Stack from '@mui/joy/Stack'
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import Table from '@mui/joy/Table';
import TableCell from '@mui/material/TableCell';
import Sheet from '@mui/joy/Sheet';
import InputAdornment from '@mui/material/InputAdornment';

// icons
import FilterListIcon from '@mui/icons-material/FilterList';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';

function createData(time, message, status) {
    return { time, message, status };
}
  
const rows = [
    createData('4:20pm 10/24/2006', "'Hair': Found", 0),
];
  

function Notifications() {
    return <div style={{
        width: '100%',
        height: '100%',
        mx: 'auto',
        my: 10,
        py: 3,
        px: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        borderRadius: 'lg',
        boxShadow: 'md',
    }}>
        <Typography sx={{
            marginTop: 10,
            mx: 20,
            fontSize: 50
        }}>
            Notifications
        </Typography>
        <Stack
            direction="row"
            sx={{
                my: 4,
                ml: 20,
            }}
        >
            <Sheet sx={{
                height: 60,
                width: '35%',
                mr: 3,
                borderRadius: 100,
                display: 'flex',
                flexDirection: 'column'
            }}>
                <Input placeholder="Search notifications..." startDecorator={
                    <InputAdornment position="start" sx={{
                        pl: 2
                    }}>
                        <SearchIcon/>
                    </InputAdornment>
                } sx={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 100
                }}/>
            </Sheet>
            <Button sx={{
                borderRadius: 1000
            }}>
                <FilterListIcon/>
                Filter
            </Button>
        </Stack>
        <Sheet sx={{
            display: 'flex',
            alignItems: 'center',
            mx: 20
        }}>
            <Table 
            hoverRow 
            size="lg" 
            variant="soft"
            sx = {{
                borderRadius: 20
            }}
            >
            <colgroup>
                <col width="40%" />
                <col width="30%" />
                <col width="25%" />
                <col width="5%" />
            </colgroup>
                <thead>
                    <tr style={{
                        fontSize: 30,
                    }}>
                        <th style={{ textAlign: 'center' }}>Date</th>
                        <th style={{ textAlign: 'center' }}>Message</th>
                        <th style={{ textAlign: 'center' }}>Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody style={{
                    borderRadius: 50
                }}>
                    {rows.map((row) => (
                    <tr key={row.name} style={{
                        textAlign: 'center'
                    }}>
                        <td>{row.time}</td>
                        <td>{row.message}</td>
                        <td>{row.status}</td>
                        <td>
                            <MoreVertIcon/>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </Table>
        </Sheet>
    </div>;
}

export default Notifications;