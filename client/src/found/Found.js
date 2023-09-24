import * as React from 'react';
import { useParams } from 'react-router-dom';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';

function Found() {
    let { uuid } = useParams([]);
    console.log(uuid);

    const name = "Garden Hose";
    const lost = true;
    let content;
    
    if (lost) {
        content = <div style={{
            display: 'flex',
            flexDirection: 'column'
        }}>
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
                }}>
                    This item has been marked as LOST
                </Typography>
            </Sheet>

            <Button variant="outlined" color="neutral" sx={{ 
                mx: 'auto',
                mb: 1,
                width: 300,
                height: 100,
                fontSize: 35
                }}>Show Message
            </Button>

            <Button sx={{ 
                mx: 'auto',
                mb: 1,
                width: 300,
                height: 100,
                fontSize: 35
                }}>Contact Owner
            </Button>
        </div>;
        console.log(content)
    } else {
        content = <div>
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
                    This item was not lost. Please return it to where you found it.
                </Typography>
            </Sheet>
        </div>;
    }

    return (
        <Sheet
            sx={{
                mx: 2, 
                my: 6, 
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
            <Sheet sx={{
            }}>
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
                    '{name}'
                </Typography>
            </Sheet>
            
            {content}

            <Typography
                endDecorator={<Link href="/register">Sign up</Link>}
                fontSize="sm"
                sx={{
                    position: 'absolute',
                    alignSelf: 'center',
                    bottom: '1%'
                }}
            >
            Don&apos;t have an account?
        </Typography>
        </Sheet>
    );
}

export default Found;