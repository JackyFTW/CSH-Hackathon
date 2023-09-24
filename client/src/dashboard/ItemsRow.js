import { useState, useEffect, useRef } from 'react';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Modal from '@mui/material/Modal';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Sheet from '@mui/joy/Sheet';
import Popover from '@mui/material/Popover';
import Input from '@mui/joy/Input';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import QrCodeIcon from '@mui/icons-material/QrCode';
import Chip from '@mui/joy/Chip';
import useFetch from '../hooks/useFetch.js';
import { QRCodeSVG } from 'qrcode.react';

function ItemsRow(props) {
    const row = props.row;
    const token = localStorage.getItem("token");

    const [ name, setName ] = useState("");
    const [ message, setMessage ] = useState("");
    const [ openManage, setOpenManage ] = useState(false);
    const [ openQR, setOpenQR ] = useState(false);
    const handleOpenManage = () => setOpenManage(true);
    const handleCloseManage = () => setOpenManage(false);
    const handleOpenQR = () => setOpenQR(true);
    const handleCloseQR = () => setOpenQR(false);
    const { fetchMethod: editItem, loading, data, error } = useFetch("http://localhost:9090/apiv2/items/" + row.uuid, "PATCH", {
        name: name === "" ? row.name : name,
        message: message === "" ? row.message : message
    }, token);
    const { fetchMethod: deleteItem, loading: loading2, data: data2, error: error2 } = useFetch("http://localhost:9090/apiv2/items/" + row.uuid, "DELETE", {}, token);

    const mounted = useRef(false);
    useEffect(() => {
        if(mounted.current) return;
        if(data !== null || data2 !== null) {
           window.location.href = "/dashboard";
        }
        mounted.current = true;
    }, [loading, data, error, loading2, data2, error2]);

    function handleSetStatus() {

    }

    function handleEdit() {
        mounted.current = false;
        editItem();
    }

    function handleDelete() {
        mounted.current = false;
        deleteItem();
    }

    // Popover section
    const [anchorEl, setAnchorEl] = useState(null);
    const popoverClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const popoverClose = () => {
        setAnchorEl(null);
    };
    const popoverOpen = Boolean(anchorEl);
    const popoverid = 'simple-popover';

    return <tr key={row.uuid} style={{
        textAlign: 'center'
    }}>
        <td>{row.name}</td>
        <td>{row.message}</td>
        <td>
            {row.status === 0 && 
                <Chip color="success" variant="solid" onClick={() => handleSetStatus(1)}>Held</Chip>
            }
            {row.status === 1 &&
                <Chip color="danger" variant="solid" onClick={() => handleSetStatus(0)}>Lost</Chip>
            }
            {row.status === 2 &&
                <Chip color="warning" variant="solid" onClick={() => handleSetStatus(0)}>Found</Chip>
            }
        </td>
        <td>
            <Button aria-describedby={popoverid} onClick={popoverClick} variant="outlined" sx={{
                p: 1,
                borderRadius: 100,
            }}>
                <MoreVertIcon/>
            </Button>
            <Popover
                id={popoverid}
                open={popoverOpen}
                anchorEl={anchorEl}
                onClose={popoverClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Stack direction="column">
                    <Button uuid={row.uuid} onClick={handleOpenManage} style={{ borderRadius: 0 }}>
                        <EditIcon/>
                        Manage Item
                    </Button>
                    <Modal
                        open={openManage}
                        onClose={handleCloseManage}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <div style={{ ml: '350px', pointerEvents: 'none' }}>
                            <Sheet sx={{
                                width: '30vw',
                                mx: 'auto',
                                mt: 10,
                                borderRadius: 10,
                                pb: 2,
                                pointerEvents: 'auto'
                            }}>
                                <form onSubmit={ (e) => handleEdit(e) }>
                                    <Typography variant="h1" sx={{
                                        pt: 2,
                                        fontSize: 40,
                                        color: 'black',
                                        textAlign: 'center'
                                    }}>
                                        Edit {row.name}
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
                                            placeholder="New Name..."
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

                                    <Button onClick={(e) => handleEdit(e)} type="submit" sx={{ 
                                        display: 'flex',
                                        mx: 'auto',
                                        my: 5,
                                        width: 200,
                                        height: 70,
                                        fontSize: 'lg'
                                    }}>Update Item</Button>
                                </form>
                            </Sheet>
                        </div>
                    </Modal>
                    <Button onClick={handleDelete} style={{ borderRadius: 0 }}>
                        <DeleteIcon/>
                        Delete Item
                    </Button>
                    <Button onClick={handleOpenQR} style={{ borderRadius: 0 }}>
                        <QrCodeIcon/>
                        QR Code
                    </Button>
                    <Modal
                        open={openQR}
                        onClose={handleCloseQR}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <div style={{ 
                            ml: "350px",
                            pointerEvents: "none"
                        }}>
                            <Sheet sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '10vw',
                                height: '10vw',
                                mx: 'auto',
                                borderRadius: 10,
                                pointerEvents: 'auto'
                            }}>
                                <QRCodeSVG value={ "http://localhost:3000/found/" + row.uuid } sx={{
                                    width: '100%',
                                    height: '100%'
                                }}/>
                            </Sheet>
                        </div>
                    </Modal>
                </Stack>
            </Popover>
        </td>
    </tr>
}

export default ItemsRow;