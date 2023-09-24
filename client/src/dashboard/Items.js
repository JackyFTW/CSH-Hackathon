import { useState } from 'react';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import InputAdornment from '@mui/material/InputAdornment';
import Modal from '@mui/material/Modal';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';


// icons
import FilterListIcon from '@mui/icons-material/FilterList';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';

function createData(name, description, status) {
    return { name, description, status };
}
  
const rows = [
    createData('Dog', "brendaaaaaaaaaa", 0),
    createData('Wallet', "contact ", 0),
    createData('Horse', "(201)-988-3590 ", 1)
];
  

function Items() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
            <Button onClick={handleOpen} sx={{
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
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div style={{ marginLeft: '350px' }}>
                    <Sheet sx={{
                        width: '30vw',
                        mx: 'auto',
                        mt: 10,
                        borderRadius: 10,
                        pb: 2
                    }}>
                        <form onSubmit={ () => console.log('test') }>
                            <Typography variant="h1" sx={{
                                mt: 3,
                                fontSize: 60,
                                fontWeight: 'bold',
                                textAlign: 'center'
                            }}>
                                Create Item
                            </Typography>
                            <FormControl sx={{
                                width: '80%',
                                mx: 'auto',
                                my: 3
                            }}>
                                <FormLabel sx={{
                                    fontSize: 'lg'
                                }}>Item Name</FormLabel>
                                <Input
                                    name="itemName"
                                    type="itemName"
                                    placeholder="Ex: 'Garden Hose'"
                                />
                            </FormControl>

                            <FormControl sx={{
                                width: '80%',
                                mx: 'auto',
                                my: 3
                            }}>
                                <FormLabel sx={{
                                    fontSize: 'lg'
                                }}>Lost Message</FormLabel>
                                <Input
                                    name="lostMessage"
                                    type="lostMessage"
                                    placeholder="Ex: 'Call me at (911)'"
                                />
                            </FormControl>

                            <Button type="submit" sx={{ 
                                display: 'flex',
                                mx: 'auto',
                                my: 5,
                                width: 200,
                                height: 70,
                                fontSize: 'lg'
                            }}>Create Item</Button>
                        </form>
                    </Sheet>
                </div>
            </Modal>
        </Stack>
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
                <Input placeholder="Search items..." startDecorator={
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
                        <th style={{ textAlign: 'center' }}>Name</th>
                        <th style={{ textAlign: 'center' }}>Description</th>
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
                        <td>{row.name}</td>
                        <td>{row.description}</td>
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

export default Items;