import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './MasterList.scss';
import {Master, Modal, Cheat} from '../../components';
import {useQuery} from '@apollo/react-hooks';
import {motion} from 'framer-motion';
import {exportCSVmaster} from '../../utils/exportCSV';

import {QUERY_PLAYERS} from '../../utils/queries';
import Auth from '../../utils/auth';

const MasterList = () => {
  const {data: playerData, refetch} = useQuery(QUERY_PLAYERS);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const players = playerData?.players || [];

  const loggedIn = Auth.adminLogIn();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const player = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    preferredRoomate: '',
    lodging: '',
  };

  if (!loggedIn) {
    return <Cheat />;
  }

  return (
    <>
      {isModalOpen && (
        <Modal
          player={player}
          onClose={toggleModal}
          update_add={'Add'}
          refetchPlayers={refetch}
        />
      )}
      <div id="masterList">
        <div className="background">
          <h2 className="head-text">Master List</h2>
          <div className="master-list">
            <Master players={players} refetchPlayers={refetch} />
          </div>

          <motion.div
            className="flex-wrap"
            whileInView={{opacity: [0, 1]}}
            transition={{duration: 0.7}}
          >
            <button onClick={() => toggleModal()}>Add New Player</button>
            <button onClick={() => exportCSVmaster()}>
              Download Master List
            </button>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default MasterList;
