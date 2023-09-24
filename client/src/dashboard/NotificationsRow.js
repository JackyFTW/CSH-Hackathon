import Chip from '@mui/joy/Chip';

function NotificationsRow(props) {
    const row = props.row;

    return (
        <tr key={row.name} style={{
            textAlign: 'center'
        }}>
            <td>{row.time}</td>
            <td>{row.message}</td>
            <td>
                {row.status === 0 &&
                    <Chip color="danger" variant="solid">Unread</Chip>
                }
                {row.status === 1 && 
                    <Chip color="success" variant="solid">Read</Chip>
                }
            </td>
        </tr>
    );
}

export default NotificationsRow;