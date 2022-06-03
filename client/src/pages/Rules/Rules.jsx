import React from 'react';
import './Rules.scss'
import { motion } from "framer-motion";
const Rules = () => {
  return (
    <div id='rules'>
        <div className='background'>
          <h2 className='head-text'>Rules & Regulations</h2>
          <p className='p-text'>
              Welcome to the guys joining us for the first time! <br/>
              Here's information that will make your golfing more enjoyable. <br />
              All competition is based on what you shoot against your own handicap (or what you told us you shoot). <br />
              Each day has prize money, so make sure to bring your A game.
              You have already anteed up when you paid for your golf.
          </p>
          <motion.div className='rules-content'
          whileInView={{ opacity: [0, 1] }}
          transition={{ duration: 0.7 }}>
            <h6>Senior Tees</h6>
                <p className='p-text'>We are all using the tees that are 5800 yards and shorter.</p>
            <h6>Max Stroke on Any Hole is Par plus 3</h6>
                <p className='p-text'>On a par 3, max is 6, par 4 max is 7, par 5 max is 8. Once you reach this score, please pick up and move to the next hole.</p>
            <h6> Balls Hit Out of Bounds, into the Water, or Any Other Hazard</h6>
                <p className='p-text'>Play the ball laterally and add a stroke (if in the water, drop on other side). Provisional balls not necessary.</p>
                <p className='p-text'>For unplayable sand traps: ok to move the ball to where it can be played, but it cannot be closer to the pin.</p>
                <p className='p-text'>Ok to roll the ball in the fairway, lift and clean is ok.</p>
            <h6>Putts: Gimmes are Ok</h6>
                <p className='p-text'>Player must add a stroke for the gimme.</p>
          </motion.div>
          <p className='info-text'>
            We have assigned the foursomes for Sunday and Wednesday's Ryder Cup Round.
            If there is a foursome group you want to play with on Monday or Tuesday, please let us know
            when we meet Sunday morning. If there's someone you want to play with, here's your chance!
          </p>
          <p className='info-text'>
            If you would like to take part in other daily competitions,
            please reach out to Dr. Tim or Ken Dulaney.
            They oversee OPTIONAL daily wagers at an additonal fee.
            All wagers will be explained in detail before we tee off.
          </p>
          <h3>Please reach out to us if you have questions. <br />We are looking forward to a great trip!</h3>
        </div>
    </div>
  );
}

export default Rules;