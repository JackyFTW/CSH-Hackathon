import { useState, useEffect, useRef } from 'react';
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
import useFetch from '../hooks/useFetch.js';
import ItemsRow from './ItemsRow.js';

// icons
import FilterListIcon from '@mui/icons-material/FilterList';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SearchIcon from '@mui/icons-material/Search';

function Items() {
    let token = localStorage.getItem("token");

    const [ openCreate, setOpenCreate ] = useState(false);
    const [ rows, setRows ] = useState([]);
    const [ name, setName ] = useState("");
    const [ message, setMessage ] = useState("");
    const handleOpenCreate = () => setOpenCreate(true);
    const handleCloseCreate = () => setOpenCreate(false);
    const { fetchMethod: fetchItems, loading, data, error } = useFetch("https://jackb.dev/apiv2/items", "GET", {}, token);
    const { fetchMethod: createItem, loading: loading2, data: data2, error: error2 } = useFetch("https://jackb.dev/apiv2/items", "POST", {
        name: name,
        message: message,
        status: 0
    }, token);

    let mounted = useRef(false);
    useEffect(() => {
        if(mounted.current) return;
        fetchItems();
        mounted.current = true;
    }, []);
    useEffect(() => {
        if(data !== null) {
            let newRows = [];
            data.items.forEach(i => {
                newRows.push({
                    uuid: i.uuid,
                    name: i.name,
                    message: i.message,
                    status: i.status
                });
            });
            setRows(newRows);
        }
    }, [loading, data, error]);

    useEffect(() => {
        if(mounted.current) return;
        if(data2 !== null) {
           window.location.href = "/dashboard";
        }
        mounted.current = true;
    }, [loading2, data2, error2]);

    function handleSubmit(e) {
        e.preventDefault();
        mounted.current = false;
        createItem();
    }

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
            }}>Items</Typography>
            <Button onClick={handleOpenCreate} sx={{
                height: '75%',
                my: 'auto',
                fontSize: 50
            }}>
                <Typography sx={{
                    fontSize: 15,
                    mx: 1,
                    color: 'white'
                }}>Create</Typography>
                <AddCircleOutlineIcon height="1" sx={{
                    mx: 1,
                }}/>
            </Button>
            <Modal
                open={openCreate}
                onClose={handleCloseCreate}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div style={{ marginLeft: '350px', pointerEvents: 'none' }}>
                    <Sheet sx={{
                        width: '30vw',
                        mx: 'auto',
                        mt: 'calc(25vh)',
                        borderRadius: 10,
                        pb: 2,
                        pointerEvents: 'auto'
                    }}>
                        <form onSubmit={ (e) => handleSubmit(e) }>
                            <Typography variant="h1" sx={{
                                pt: 2,
                                fontSize: 40,
                                color: 'black',
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
                                    placeholder="My Wallet"
                                    onChange={(e) => setName(e.target.value)}
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
                                    placeholder="Please call me at..."
                                    onChange={(e) => setMessage(e.target.value)}
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
                <col width="30%" />
                <col width="40%" />
                <col width="20%" />
                <col width="10%" />
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
                        <ItemsRow row={row}/>
                    ))}
                </tbody>
            </Table>
        </Sheet>
    </div>;
}

export default Items;