import React from "react";
import "./Rules.scss";
// import { motion } from "framer-motion";
import { useQuery } from "@apollo/client";
import { QUERY_RULES } from "../../utils/queries";
import { CreatePDFfromHTML } from "../../utils/downloadPDF";
import Auth from "../../utils/auth";

const Rules = () => {
  const { loading, data: rulesData } = useQuery(QUERY_RULES);
  const rules = rulesData?.info || [];
  console.log(rules);

  const loggedIn = Auth.loggedIn();

  if (!loggedIn) {
    return (
      <div>
        You need to log in first. Don't cheat by looking at something you're not
        supposed to. <br />
        Makes me think you cheat at golf too
      </div>
    );
  }

  return (
    <div id="rules">
      <div className="background" id="printRules">
        <h2 className="head-text">Rules & Regulations</h2>

        <p className="p-text">
          Welcome to the guys joining us for the first time! <br />
          Here's information that will make your golfing more enjoyable. <br />
          All competition is based on what you shoot against your own handicap
          (or what you told us you shoot). <br />
          Each day has prize money, so make sure to bring your A game. You have
          already anteed up when you paid for your golf.
        </p>
        {rules.map((rule) =>
          rule.subject === "Rules & Regulations" ? (
            <>
              <h4 className="h4-text" key={rule._id}>
                {rule.header}
              </h4>
              <p className="p-text">{rule.body}</p>
            </>
          ) : (
            <></>
          )
        )}

        <h2 className="head-text">Ryder Cup</h2>
        {rules.map((rule) =>
          rule.subject === "Ryder Cup" ? (
            <>
              <h4 className="h4-text" key={rule._id}>
                {rule.header}
              </h4>
              <p className="p-text">{rule.body}</p>
            </>
          ) : (
            <></>
          )
        )}

        <div className="app__flex background">
          <button type="button" onClick={() => CreatePDFfromHTML()}>
            Print Rules
          </button>
        </div>
      </div>
    </div>
  );
};

export default Rules;
