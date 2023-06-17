import styles from './styles.module.css';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { setActiveRoom } from "../../store/modules/room"

const Rooms = ({ socket, username, room }) => {
  const activeRoom = useSelector((state) => state.room.activeRoom)
  const dispatch = useDispatch()
  const setRoom = (room) => dispatch(setActiveRoom(room))
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    socket.on('user_rooms', (data) => {
      console.log(data)
      if(data.indexOf('node') < 0){
        data.push('node')
      }
      setRooms(data);
    });

    return () => socket.off('user_rooms');
  }, [socket]);
  
  useEffect(() => {
    socket.on('user_rooms', (data) => {
      console.log(data)
      if(data.indexOf('node') < 0){
        data.push('node')
      }
      setRooms(data);
    });

    return () => socket.off('user_rooms');
  }, [socket]);

  const leaveRoom = () => {
    const __createdtime__ = Date.now();
    socket.emit('leave_room', { username, room, __createdtime__ });
    // Redirect to home page
    // navigate('/', { replace: true });
  };
  const changeRoom = (room) => {
    leaveRoom()
    setRoom(room)
    socket.emit('get_room', { username});
  }

  return (
    <div className={styles.roomAndUsersColumn}>
      <h2>Rooms</h2>
      <div>
        {rooms.length > 0 && <h5 className={styles.usersTitle}>Users:</h5>}
        <ul className={styles.usersList}>
          {rooms.map((item) => (
            <li
              style={{
                fontWeight: `${item === activeRoom ? 'bold' : 'normal'}`,
              }}
              key={item}
              onClick={() => {
                changeRoom(item)
              }}
            >
              <h2>{item} {`${item === activeRoom ? '<<<' : ''}`}</h2>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Rooms;
