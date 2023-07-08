import React from 'react';
import './Rules.scss';
// import { motion } from "framer-motion";
import {useQuery, useMutation} from '@apollo/client';
import {QUERY_RULES} from '../../utils/queries';
import {
  ADD_INFO,
  EDIT_INFO,
  DELETE_INFO,
  SWAP_INFO_PLACE,
} from '../../utils/mutations';
import {Cheat} from '../../components';
import {CreatePDFfromHTML} from '../../utils/downloadPDF';
import Auth from '../../utils/auth';

const Rules = () => {
  const {loading, data: rulesData, refetch} = useQuery(QUERY_RULES);
  const rules = rulesData?.info || [];
  const [addRule] = useMutation(ADD_INFO);
  const [editRule] = useMutation(EDIT_INFO);
  const [deleteRule] = useMutation(DELETE_INFO);
  const [swapRule] = useMutation(SWAP_INFO_PLACE);

  const loggedIn = Auth.loggedIn();
  const admin = Auth.adminLogIn();

  const handleAddRule = async (subject) => {};

  const handleEditRule = async (editInfoId) => {};

  const handleDeleteRule = async (deleteInfoId) => {
    try {
      await deleteRule({
        variables: {deleteInfoId},
      });
    } catch (err) {
      console.error(err);
    }
    refetch();
  };

  function handleSwapRule(firstId, e) {
    let firstSibling = e.target.parentNode.parentNode.parentNode;
    let lastSibling = e.target.parentNode.parentNode.parentNode;
  }

  if (!loggedIn) {
    return <Cheat />;
  }

  return (
    <div id="rules">
      <div className="background" id="printRules">
        <h2 className="head-text">Rules & Regulations</h2>
        <div className="video-div">
          <h3>
            If you don't feel like reading, heres a video to sum up this entire
            page...
          </h3>
          <iframe
            width="795"
            height="447"
            src="https://www.youtube.com/embed/30B7RYcorGQ"
            title="Irish Golf Vs American Golf"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>

        <div className="rules-content">
          <p className="p-text">
            Welcome to the guys joining us for the first time! <br />
            Here's information that will make your golfing more enjoyable.{' '}
            <br />
            All competition is based on what you shoot against your own handicap
            (or what you told us you shoot). <br />
            Each day has prize money, so make sure to bring your A game. You
            have already anteed up when you paid for your golf.
          </p>

          {rules.map(
            (rule) =>
              rule.subject === 'Rules & Regulations' && (
                <div data-id={rule._id} key={rule._id}>
                  <h4 className="h4-text">{rule.header}</h4>

                  <p className="p-text">{rule.body}</p>
                </div>
              )
          )}

          <h2 className="secondary-text">Ryder Cup</h2>
          {rules.map(
            (rule) =>
              rule.subject === 'Ryder Cup' && (
                <>
                  <h4 className="h4-text" key={rule._id}>
                    {rule.header}
                  </h4>
                  <p className="p-text">{rule.body}</p>
                </>
              )
          )}
        </div>

        <div className="app__flex">
          <button type="button" onClick={() => CreatePDFfromHTML()}>
            Print Rules
          </button>
        </div>
      </div>
    </div>
  );
};

export default Rules;
