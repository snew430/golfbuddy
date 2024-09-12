import React, {useState} from 'react';
import './Rules.scss';
import {useQuery} from '@apollo/client';
import {QUERY_RULES} from '../../utils/queries';
import {Cheat} from '../../components';
import {CreatePDFfromHTML} from '../../utils/downloadPDF';
import Auth from '../../utils/auth';

const topics = ['Rules', 'Ryder Cup', 'Etiquette'];

const Rules = () => {
  const [currentTopic, setCurrentTopic] = useState(topics[0]);
  const {data: rulesData} = useQuery(QUERY_RULES);
  const rules = rulesData?.info || [];

  const loggedIn = Auth.loggedIn();

  if (!loggedIn) {
    return <Cheat />;
  }

  return (
    <div id="rules">
      <div className="background" id="printRules">
        <div className="title-switcher">
          {topics.map((topic) => (
            <h2
              className={`topic ${currentTopic === topic ? 'current' : ''}`}
              onClick={() => setCurrentTopic(topic)}
            >
              {topic}
            </h2>
          ))}
        </div>

        <div className="rules-content">
          {currentTopic === 'Etiquette' && (
            <>
              <div>
                <h4 className="h4-text">
                  Golf Etiquette Adapted -Author Unknown
                </h4>

                <p className="p-text">
                  Here are 10 tips every new (and not so new) golfer should know
                  about basic golf course etiquette and how to keep up the pace.
                </p>
              </div>
              <div>
                <h4 className="h4-text">1. Be early to your tee time</h4>

                <p className="p-text">
                  If your tee time is at 1:40, don't show up at 1:40. And there
                  is no "5-minute rule" when it comes to grumpy starters. You
                  should arrive at the course a solid 20 minutes before your tee
                  time so you can check in, get your bag loaded and complete any
                  other miscellaneous housekeeping (hot dog, sunscreen, buy
                  tees, etc.). If you want to hit some warm-up balls, add an
                  extra 15-20 minutes. Your whole group should be at the first
                  tee 5-10 minutes before your tee time (or within eyesight of
                  the starter) and ready to have your peg in the ground at the
                  starting time.
                </p>
              </div>
              <div>
                <h4 className="h4-text">2. Learn how to share a golf cart</h4>

                <p className="p-text">
                  In my opinion, the no. 1 reason for player-induced slow play
                  is inefficient golf cart management, The relationship you have
                  with your golf cart mate should resemble a game of leapfrog
                  not a three-legged sack race. Drop your partner off at their
                  ball and go to yours (and when they hit they can walk back to
                  the cart). If being dropped off, always take a few different
                  clubs to your ball. If you and your cart mate's balls are
                  relatively close to each other, park in between them and you
                  can get ready to hit at the same time. Bring putters or other
                  wedges to the green for one another if necessary. Who says
                  golf isn't a team sport?
                </p>
              </div>
              <div>
                <h4 className="h4-text">
                  3. Don't play balls you can't afford to lose.
                </h4>

                <p className="p-text">
                  There is virtually no point to buying new golf balls until you
                  can play with one for a few holes before it ends up in a back
                  yard or at the bottom of a lake. Play balls you won't mind
                  losing in the weeds, because your playing partners don't want
                  to help you look for more than a couple balls during a round
                  anyways. The pros are now using a 3-minute rule for ball
                  searched. As a general rule, if your ball trickles into the
                  woods and you think you might have a shot, do a quick once or
                  twice over before dropping (making sure no one is waiting on
                  the tee behind you). But if it sailed in deep, leave it behind
                  and drop somewhere near where it entered and take a penalty
                  stroke.
                </p>
              </div>
              <div>
                <h4 className="h4-text">
                  4. Read your putts while others are putting, and then be ready
                  to hit
                </h4>

                <p className="p-text">
                  I've watched a lot of beginners not line up their putt until
                  the previous player's already marked their ball. Be proactive:
                  Line up your putt as others are putting (just be sure you're
                  far enough away to not be distracting), and once their ball is
                  rolling, get your ball down and start your routine. If your
                  ball isn't in the way, you can put it down and pick up your
                  mark before it's your turn to hit.
                </p>
              </div>
              <div>
                <h4 className="h4-text">5. Go easy on the practice swings</h4>

                <p className="p-text">
                  We know, the golf swing feels weird, but when you're on the
                  tee, try and make a practice swing or two off to the side
                  while others are preparing to tee off. Now, if you're at your
                  ball and it's not your turn to hit, feel free to take a few
                  extra practice swings, just be ready to go when it's your
                  turn.
                </p>
              </div>
              <div>
                <h4 className="h4-text">
                  6, If you have to ask if its your turn, you probably should
                  have hit already
                </h4>

                <p className="p-text">
                  I've seen this a lot with beginners: They're standing at their
                  ball somewhere just off the green with three sets of eyes on
                  them before they suspect something and ask, "Am I up?" Don't
                  let it get that far. If you're away, or, hell, even if it's a
                  close call, just go. The group will appreciate your
                  proactivity.
                </p>
              </div>
              <div>
                <h4 className="h4-text">7. Give the phone a rest</h4>

                <p className="p-text">
                  You're in the outdoors and among people, don't stay buried in
                  your phone. Leave it in the cart with the ringer off don't
                  keep it in your pocket so it goes off on the green as your
                  partner is over a three-footer. Checking football scores are,
                  of course, the exception.
                </p>
              </div>
              <div>
                <h4 className="h4-text">
                  8. Instruction is for the driving range
                </h4>

                <p className="p-text">
                  I know, once you hit your seventh drive of the day dead left,
                  you want to ask your playing partners what you're doing wrong.
                  Chances are, we can offer a suggestion, and it might fix it
                  for a hole or two, but you're better off with a lesson or
                  group clinic at the range after work once a week or a couple
                  times a month to gain any real improvement.
                </p>
              </div>
              <div>
                <h4 className="h4-text">
                  9. Be conscientious while others are swinging, putting
                </h4>

                <p className="p-text">
                  This includes talking to other players, clanking clubs from
                  your golf bag and while on the green, stepping in the path of
                  a ball to be putt or casting a shadow over someone’s putt.
                </p>
              </div>
              <div>
                <h4 className="h4-text">
                  10. Lastly, for new and not so new golfers HAVE FUN!
                </h4>

                <p className="p-text">
                  Everyone should be having fun. Be tolerant and be willing to
                  learn. Everyone should have the opportunity to enjoy golf.
                </p>
              </div>
            </>
          )}

          {currentTopic === 'Rules' && (
            <>
              <p className="p-text">
                Welcome to the guys joining us for the first time! <br />
                Here's information that will make your golfing more enjoyable.{' '}
                <br />
                All competition is based on what you shoot against your own
                handicap (or what you told us you shoot). <br />
                Each day has prize money, so make sure to bring your A game. You
                have already anteed up when you paid for your golf.
              </p>
              <div className="new-rule">
                <h4 className="h4-text">Save Yourself a Ball Option</h4>
                <p className="p-text">
                  When you’re game isn’t enough to clear a lake or hazard, save
                  yourself a ball and drop on the other side at the ball drop
                  zone. Add 2 strokes and play from there. Remember you need to
                  take a stroke, you save a ball but not the strokes.
                </p>
              </div>
              {rules.map(
                (rule) =>
                  rule.subject === 'Rules & Regulations' && (
                    <div data-id={rule._id} key={rule._id}>
                      <h4 className="h4-text">{rule.header}</h4>

                      <p className="p-text">{rule.body}</p>
                    </div>
                  )
              )}
            </>
          )}

          {currentTopic === 'Ryder Cup' && (
            <>
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
            </>
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
