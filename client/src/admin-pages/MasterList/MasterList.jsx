import React from 'react';
import './MasterList.scss'
import { RiDeleteBin5Fill } from 'react-icons/ri'
import { FiEdit } from 'react-icons/fi';
import { useQuery, useMutation } from "@apollo/react-hooks";
import { QUERY_PLAYERS } from '../../utils/queries';
import { DELETE_PLAYER, UPDATE_PLAYER } from '../../utils/mutations';

const MasterList = () => {
  const { playerData } = useQuery(QUERY_PLAYERS);
  const [deletePlayer] = useMutation(DELETE_PLAYER);
  const [updatePlayer] = useMutation(UPDATE_PLAYER);

  const players = playerData?.query.players || [];
  return (
    <div id='masterList'>
        <div className='background'>
          <h2 className='head-text'>Master List</h2>
            <div className='master-list'>
              <table>
                  <thead>
                      <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Phone</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr>
                          <td>caroline{players.firstName} {players.lastName}</td>
                          <td>email{players.email}</td>
                          <td>555555555{players.phoneNumber}</td>
                      </tr>
                  </tbody>
              </table>
            </div>
        </div>
    </div>
  );
}

export default MasterList;