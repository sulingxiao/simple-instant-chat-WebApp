import styles from './styles.module.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux"
import { setActiveRoom } from "../../store/modules/room"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const RoomAndUsers = ({ socket, username, room }) => {
  const [roomUsers, setRoomUsers] = useState([]);
  const activeRoom = useSelector((state) => state.room.activeRoom)
  const dispatch = useDispatch()
  const setRoom = (room) => dispatch(setActiveRoom(room))

  const navigate = useNavigate();

  useEffect(() => {
    socket.on('chatroom_users', (data) => {
      console.log(data);
      setRoomUsers(data);
    });

    return () => socket.off('chatroom_users');
  }, [socket]);

  const newRoom = (otherusername) => {
    if(otherusername === username) {
      return
    }
    const newRoomName = Math.random().toString(16).substring(2,8)
    socket.emit('join_room', { username: otherusername, room: newRoomName });
    socket.emit('join_room', { username, room: newRoomName });
    const __createdtime__ = Date.now();
    const message = 'I am in'
    // Send message to server. We can't specify who we send the message to from the frontend. We can only send to server. Server can then send message to rest of users in room
    socket.emit('send_message', { username: otherusername, room: newRoomName, message, __createdtime__ });
    socket.emit('send_message', { username, room: newRoomName, message, __createdtime__ });
    changeRoom(newRoomName)
  };

  const changeRoom = (room) => {
    leaveRoom()
    setRoom(room)
  }
  const leaveRoom = () => {
    const __createdtime__ = Date.now();
    socket.emit('leave_room', { username, room, __createdtime__ });
    socket.emit('get_room', { username});
    // Redirect to home page
  };

  return (
    <div className={styles.roomAndUsersColumn}>
      <h2>Users</h2>
      <div>
        {roomUsers.length > 0 && <h5 className={styles.usersTitle}>Users:</h5>}
        <ul className={styles.usersList}>
          {roomUsers.map((user) => (
            <li
              style={{
                fontWeight: `${user.username === username ? 'bold' : 'normal'}`,
                display: `flex`,
                alignItems: `center`
              }}
              key={user.id}
              onClick={() => {
                newRoom(user.username)
              }}
            >
              <AccountCircleIcon/>{user.username}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RoomAndUsers;
