export const getSavedPlayers = () => {
  const savedPlayerIds = localStorage.getItem('saved_players')
    ? JSON.parse(localStorage.getItem('saved_players'))
    : [];

  return savePlayerIds;
};

export const savePlayerIds = (playerIdArr) => {
  if (playerIdArr.length) {
    localStorage.setItem('saved_players', JSON.stringify(playerIdArr));
  } else {
    localStorage.removeItem('saved_players');
  }
};

export const removePlayerId = (playerId) => {
    const savePlayerIds = localStorage.getItem('saved_players')
      ? JSON.parse(localStorage.getItem('saved_players'))
      : null;
  
    if (!savePlayerIds) {
      return false;
    }
  
    const updatedSavedPlayerIds = savePlayerIds?.filter((savedPlayerId) => savedPlayerId !== playerId);
    localStorage.setItem('saved_players', JSON.stringify(updatedSavedPlayerIds));
  
    return true;
};