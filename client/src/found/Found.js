import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import AspectRatio from '@mui/joy/AspectRatio';
import Link from '@mui/joy/Link';
import useFetch from '../hooks/useFetch.js';
import Modal from '@mui/material/Modal';
import LinearProgress from '@mui/joy/LinearProgress';
import Alert from '@mui/joy/Alert';
import Check from '@mui/icons-material/Check';


function Found() {
    let token = localStorage.getItem("token");
    let { uuid } = useParams([]);
    
    const [ item, setItem ] = useState({});
    const [ openMessage, setOpenMessage ] = useState(false);
    const [ alert, setAlert ] = useState("");
    const handleOpenMessage = () => setOpenMessage(true);
    const handleCloseMessage = () => setOpenMessage(false);
    const { fetchMethod: fetchItem, loading, data, error } = useFetch("https://jackb.dev/apiv2/items/" + uuid, "GET", {}, token);
    const { fetchMethod: createNotif, loading: loading2, data: data2, error: error2 } = useFetch("https://jackb.dev/apiv2/notifications", "POST", {
        itemUuid: item.uuid
    }, null);
    
    let mounted = useRef(false);
    useEffect(() => {
        if(mounted.current) return;
        fetchItem();
        mounted.current = true;
    }, []);
    useEffect(() => {
        if(data !== null) {
            setItem(data.item);
        }
    }, [loading, data, error]);

    function handleAlert() {
        createNotif();

        setAlert(
            <div role="alert" class="MuiAlert-root">
                <Stack spacing={2} sx={{ maxWidth: 400 }}>
                    <Alert
                        size="lg"
                        color="success"
                        variant="solid"
                        invertedColors
                        startDecorator={
                            <AspectRatio
                                variant="solid"
                                ratio="1"
                                sx={{
                                    minWidth: 40,
                                    borderRadius: '50%',
                                    boxShadow: '0 2px 12px 0 rgb(0 0 0/0.2)',
                                }}
                            >
                                <div>
                                    <Check fontSize="xl2" />
                                </div>
                            </AspectRatio>
                        }
                        sx={{ alignItems: 'flex-start', overflow: 'hidden' }}
                    >
                    <div>
                        <Typography level="title-lg">Success</Typography>
                        <Typography level="body-sm">
                        Notification was sent to the owner of this item.
                        </Typography>
                    </div>
                    <LinearProgress
                        variant="soft"
                        value={40}
                        sx={(theme) => ({
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        color: `rgb(${theme.vars.palette.success.lightChannel} / 0.72)`,
                        '--LinearProgress-radius': '0px',
                        })}
                    />
                    </Alert>
                </Stack>
            </div>);
    }

    return (
        <div>
            { alert !== "" && alert}

            <Sheet
                sx={{
                    mx: 2, 
                    my: 4, 
                    py: 3, 
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    borderRadius: 'lg',
                    boxShadow: 'md',
                }}
                variant="outlined"
            >

                <div style={{
                    width: '85%',
                    aspectRatio: '2374/414',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                    }}> 
                    <img alt="logo" src="/images/logo.png" style={{
                        width: '100%',
                        height: '100%'
                    }}/>
                </div>
                
                {item.status === 1 &&
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <Sheet>
                            <Typography sx={{
                                textAlign: 'center',
                                fontSize: 27,
                                mt: 5,
                                mb: 2
                            }}>
                                You found:
                            </Typography>

                            <Typography sx={{
                                textAlign: 'center',
                                fontSize: 50
                            }}>
                                {item.name}
                            </Typography>
                        </Sheet>
                        <Sheet variant="soft" color="neutral" sx={{
                            width: '95%',
                            height: '50%',
                            display: 'flex',
                            borderRadius: 'lg',
                            boxShadow: 'lg',
                            mx: 'auto',
                            mb: 3,
                        }}>
                            <Typography sx={{
                                width: '100%',
                                height: '100%',
                                fontSize: 35,
                                p: 3,
                                fontWeight: 'bold',
                                textAlign: 'center'
                            }}>This item has been marked as LOST
                            </Typography>
                        </Sheet>
                        
                        <Button onClick={handleOpenMessage} variant="outlined" color="neutral" sx={{ 
                            mx: 'auto',
                            mb: 1,
                            width: 300,
                            height: 100,
                            fontSize: 35
                        }}>Show Message
                        </Button>
                        <Modal
                            open={openMessage}
                            onClose={handleCloseMessage}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Sheet sx={{
                                width: '70%',
                                aspectRatio: '1/1',
                                borderRadius: 10,
                                mt: 12,
                                mx: 'auto'
                            }}>
                                <Typography sx={{
                                    display: 'flex',
                                    width: '100%',
                                    my: 3,
                                    pt: 2,
                                    fontSize: 18,
                                    fontWeight: 'bold',
                                    textAlign: 'center',
                                    justifyContent: 'center'
                                }}>Message: 
                                </Typography>
                                <Typography sx={{
                                    display: 'flex',
                                    width: '80%',
                                    mx: 'auto',
                                    textAlign: 'center',
                                    fontSize: 35
                                }}>{item.message}
                                </Typography>
                            </Sheet>
                        </Modal>
                        
                        <Button onClick={handleAlert} sx={{ 
                            mx: 'auto',
                            mb: 1,
                            width: 300,
                            height: 100,
                            fontSize: 35
                        }}>Alert Owner
                        </Button>
                    </div>
                }

                {item.status !== 1 &&
                    <div>
                        <Sheet variant="soft" color="neutral" sx={{
                            width: '95%',
                            height: '75%',
                            borderRadius: 'lg',
                            boxShadow: 'lg',
                            mx: 'auto',
                            mb: 4
                        }}>
                            <Typography sx={{
                                display: 'flex',
                                width: '95%',
                                height: '100%',
                                fontSize: 40,
                                m: 'auto',
                                fontWeight: 'bold',
                                textAlign: 'center',
                                alignItems: 'center'
                            }}>
                                This item is not lost. Please return it to where you found it.
                            </Typography>
                        </Sheet>
                    </div>
                }

                <Typography
                    endDecorator={<Link href="/register">Sign up</Link>}
                    fontSize="sm"
                    sx={{
                        position: 'absolute',
                        alignSelf: 'center',
                        bottom: '1%'
                    }}
                >Don&apos;t have an account?
                </Typography>
            </Sheet>
        </div>
        
    );
}

export default Found;