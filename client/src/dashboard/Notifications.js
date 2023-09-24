import { useState, useEffect, useRef } from 'react';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import Input from '@mui/joy/Input';
import InputAdornment from '@mui/material/InputAdornment';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsRow from './NotificationsRow.js';
import useFetch from '../hooks/useFetch.js';

function Notifications() {
    let token = localStorage.getItem("token");

    const [ rows, setRows ] = useState([]);
    const { fetchMethod: fetchNotifs, loading, data, error } = useFetch("http://localhost:9090/apiv2/notifications", "GET", {}, token);

    let mounted = useRef(false);
    useEffect(() => {
        if(mounted.current) return;
        fetchNotifs();
        mounted.current = true;
    }, []);
    useEffect(() => {
        if(data !== null) {
            let newRows = [];
            data.notifs.forEach(n => {
                newRows.push({
                    uuid: n.uuid,
                    time: n.time,
                    message: n.message,
                    status: n.status
                });
            });
            newRows.reverse();
            setRows(newRows);

            newRows.filter(r => r.status === 0).forEach(r => {
                let options = { 
                    method: "PATCH",
                    headers: {},
                    body: JSON.stringify({
                        status: 1
                    })
                };
                options.headers["Content-Type"] = "application/json";
                options.headers["Authorization"] = "Basic " + token;
                fetch("http://localhost:9090/apiv2/notifications/" + r.uuid, options).then(data => 
                    data.json().then(json => {
                        console.log(json); 
                    }));
            });
        }
    }, [loading, data, error]);

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
                    <col width="30%" />
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
                            <NotificationsRow row={row}/>
                        ))}
                    </tbody>
                </Table>
        </Sheet>
    </div>;
}

export default Notifications;