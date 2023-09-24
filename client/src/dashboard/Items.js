import Stack from '@mui/joy/Stack'
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import Divider from '@mui/joy/Divider';

import FilterListIcon from '@mui/icons-material/FilterList';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

function createData(name, description, status) {
    return { name, description, status };
}
  
const rows = [
    createData('Dog', "brendaaaaaaaaaa", 0),
    createData('Wallet', "contact ", 0),
];
  

function Items() {
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
        <Stack
            direction="row"
            justifyContent="space-between"
            divider={<Divider orientation="vertical" />}
            sx = {{
                marginTop: 10,
                mx: 20
            }}
        >
            <Typography sx={{
                fontSize: 50
            }}>
                Items
            </Typography>
            <Button sx={{
                height: 60,
                fontSize: 50
            }}>
                <Typography sx={{
                    fontSize: 15,
                    mx: 1,
                    color: 'white'
                }}>
                    Create
                </Typography>
                <AddCircleOutlineIcon height="1" sx={{
                    mx: 1,
                }}/>
            </Button>
        </Stack>
        <Stack
            direction="row"
            sx={{
                my: 4,
                ml: 20,
            }}
        >
            <Input placeholder="Search items..." sx={{
                height: 60,
                width: 500,
                mr: 3,
                borderRadius: 1000
            }}/>
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
            sx={{ 
                '& thead th:nth-child(2)': { width: '40%' },
                '& thead th:nth-child(3)': { width: '10%' } }}>
                <thead>
                    <tr>
                        <th>Items</th>
                        <th>Description</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row) => (
                    <tr key={row.name}>
                        <td>{row.name}</td>
                        <td>{row.description}</td>
                        <td>{row.status}</td>
                    </tr>
                    ))}
                </tbody>
            </Table>
        </Sheet>
    </div>;
}

export default Items;