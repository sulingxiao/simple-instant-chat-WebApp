import styles from './styles.module.css';
// simport { useState } from 'react';
import RoomsColumn from './rooms';
import UsersColumn from './users';
import SendMessage from './send-message';
import MessagesReceived from './messages';
import io from 'socket.io-client';
import { useSelector, useDispatch } from "react-redux"
import { setActiveRoom } from "../../store/modules/room"

const socket = io.connect('http://localhost:4000');


const Chat = () => {

  // const [username, setUsername] = useState('');
  // const [room, setRoom] = useState('');
  // const navigate = useNavigate(); // Add this
  const activeRoom = useSelector((state) => state.room.activeRoom)
  const dispatch = useDispatch()
  const setRoom = (room) => dispatch(setActiveRoom(room))
  let room = activeRoom ? activeRoom : 'node'
  setRoom(room)
  let username = window.localStorage.getItem('chatName');
  if (!username) {
    username = Math.random().toString(16).substring(2,16)
    window.localStorage.setItem('chatName',username);
  }
  const joinRoom = () => {
    if (room !== '' && username !== '') {
      socket.emit('join_room', { username, room });
      socket.emit('get_room', { username});
    }
  //  navigate('/chat', { replace: true });
  };
  joinRoom()
  return (
    <div className={styles.chatContainer}>
      <RoomsColumn socket={socket} username={username} room={room} />

      <div className={styles.mainColumn}>
        <MessagesReceived socket={socket} username={username}/>
        <SendMessage socket={socket} username={username} room={room} />
      </div>

      <UsersColumn socket={socket} username={username} room={room} />
    </div>
  );
};

export default Chat;
