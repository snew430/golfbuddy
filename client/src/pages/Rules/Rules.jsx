import React from "react";
import "./Rules.scss";
import { motion } from "framer-motion";
import { CreatePDFfromHTML } from "../../utils/downloadPDF";
import Auth from "../../utils/auth";

const Rules = () => {
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
        <motion.div
          className="rules-content"
          whileInView={{ opacity: [0, 1] }}
          transition={{ duration: 0.7 }}
        >
          <h4>Senior Tees</h4>
          <p className="p-text">
            We are all using the tees that are 5800 yards and shorter.
          </p>
          <h4>Max Stroke on Any Hole is Par plus 3</h4>
          <p className="p-text">
            On a par 3, max is 6, par 4 max is 7, par 5 max is 8. Once you reach
            this score, please pick up and move to the next hole.
          </p>
          <h4> Balls Hit Out of Bounds, into the Water, or Any Other Hazard</h4>
          <p className="p-text">
            Play the ball laterally and add a stroke (if in the water, drop on
            other side). Provisional balls not necessary.
          </p>
          <p className="p-text">
            For unplayable sand traps: ok to move the ball to where it can be
            played, but it cannot be closer to the pin.
          </p>
          <p className="p-text">
            Ok to roll the ball in the fairway, lift and clean is ok.
          </p>
          <h4>Putts: Gimmes are Ok</h4>
          <p className="p-text">Player must add a stroke for the gimme.</p>
        </motion.div>
        <p className="info-text">
          We have assigned the foursomes for Sunday and Wednesday's Ryder Cup
          Round. If there is a foursome group you want to play with on Monday or
          Tuesday, please let us know when we meet Sunday morning. If there's
          someone you want to play with, here's your chance!
        </p>
        <p className="info-text">
          If you would like to take part in other daily competitions, please
          reach out to Dr. Tim or Ken Dulaney. They oversee OPTIONAL daily
          wagers at an additonal fee. All wagers will be explained in detail
          before we tee off.
        </p>
        <motion.div
          className="rules-content"
          whileInView={{ opacity: [0, 1] }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="head-text">Ryder Cup</h2>
          <h4>
            We have two teams each with a different color shirt (one team Black
            and one White).
          </h4>
          <br />
          <p className="p-text">
            • Each foursome will have two players from each team.
            <br />
            • The format is 3 six-hole competitions. Each 6-hole format is worth
            one point for the winning team for a total of 3 points.
            <br />
            • There are no strokes given, as foursomes are matched by players
            with similar averages.
            <br />
            • Teams will be announced prior to the trip.
            <br />
          </p>
          <h4>Holes #1-6 Scramble: Captains Choice</h4> <br />
          <p className="p-text">
            Both players will tee off, go to whatever shot is the best and play
            from that spot. Players will repeat until the ball is holed. There
            will be one score for each side.
          </p>
          <h4>Holes #1-6 Scramble: Captains Choice</h4> <br />
          <p className="p-text">
            Both players will tee off, go to whatever shot is the best and play
            from that spot. Players will repeat until the ball is holed. There
            will be one score for each side.
          </p>
          <br />
          <h4>Holes #7-12 Alternate Shot</h4>
          <br />
          <p className="p-text">
            On each hole, both players will tee off, and select the best shot.
            From that point, the OTHER player (from the pair) will play the next
            shot. Players will alternate shots until the ball is holed. There
            will be one score for each side.
          </p>
          <br />
          <h4>Holes #13-18 (Better Ball) Play your own Ball</h4>
          <br />
          <p className="p-text">
            Both players tee off and each plays his own ball into the hole. For
            each hole the better of the two scores of the pair will be the team
            score. In addition, please track the total numbers of holes won in
            the round. We will use this at the end of the competition in case
            the teams are tied.
            <br />
            <br />
            There are two options when the total number of players is uneven.
            The committee will choose which option will be used.
            <br />
          </p>
          <br />
          <h4>Option #1 3 Man Rover</h4>
          <br />
          <p className="p-text">
            • One person plays for the white team, the second plays for the
            black team, and the third is a rover (playing on both white and
            black teams). • The format is the same 3 six-hole competitions
            stated above (captain’s choice, alternate shot and better ball.) •
            For each of the 3 formats, the rover partners with the white team
            player for three holes, then partners with the black team player for
            three holes. • There is no format or scoring change in each of the 3
            competitions
          </p>
          <br />
          <br />
          <h4>Option #2 Solo Player (one guy vs. two guys)</h4>
          <br />
          <p className="p-text">
            Captain’s Choice: Solo player hits two balls and chooses which ball
            he then plays. He does this throughout until the ball is holed.
            Alternate Shot: Solo player hits two drives then chooses and plays
            one ball until it is holed. Better Ball: The solo player plays two
            balls separately marked to distinguish each ball. Takes the score of
            the better ball.
          </p>
        </motion.div>
        <h3>
          Please reach out to us if you have questions. <br />
          We are looking forward to a great trip!
        </h3>
      </div>

      <div className="app__flex background">
        <button type="button" onClick={() => CreatePDFfromHTML()}>
          Print Rules
        </button>
      </div>
    </div>
  );
};

export default Rules;
