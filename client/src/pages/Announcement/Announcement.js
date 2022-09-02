import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { UPDATE_NOTE } from '../../utils/mutations';
import { QUERY_NOTE } from '../../utils/queries';

const Info = () => {
  const { loading, data: noteData, refetch } = useQuery(QUERY_NOTE);
  const [updateNote] = useMutation(UPDATE_NOTE);

  console.log(noteData);

  return <div>Info</div>;
};

export default Info;
