import React from "react";

import "../tutorials.css";
import step1 from "./images/step1.png";
import step2 from "./images/step2.png";
import step3 from "./images/step3.png";
import step3Result from "./images/step3_result.png";
import step4 from "./images/step4.png";
import step5 from "./images/step5.png";
import step5Result from "./images/step5_result.png";
import chal1 from "./images/chal1.png";

import TickableSection from "../TickableSection";

const TopDownCar: React.FunctionComponent = () => {
  return (
    <div className="tutorial">
      <h1>Top Down Car</h1>
      <p>
        In this example we will be using vectors to control rotation and
        position of our game object.
      </p>
      <p>
        I have created a blank project that contains comments where the code
        needs to go for each step. This may be useful if you are struggling to
        know where to put things.
      </p>
      <p>
        <a href="https://editor.p5js.org/JoeSharp/sketches/qGRRC5jR0">
          It can be found here
        </a>
      </p>
      <p>
        The control scheme will emulate a top down 'driving' experience. The
        left and right arrow keys will 'steer', and the up arrow key will drive
        forward (the back key can then be programmed to reverse).
      </p>
      <p>
        The other difference from Step 2, is that we will be evaluating the keys
        within the animation code i.e. the <code>draw()</code> function.
      </p>
      <p>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://editor.p5js.org/JoeSharp/sketches/9gcY5Y4D7"
        >
          Here is a completed example.
        </a>
      </p>
      <TickableSection tickId="s4Step1" header="Step 1 - Create Variables">
        <p>We need a few variables to store the current driving state:</p>
        <ul>
          <li>
            Position - We will use{" "}
            <a href="https://p5js.org/reference/#/p5.Vector">vectors</a> instead
            of a pair of variables called x, y
          </li>
          <li>Heading - This will be an angle in Radians.</li>
          <li>
            Straight Line Speed - This will be a constant to tell the program
            how far to move each frame.
          </li>
          <li>
            Rotation Speed - This will be another constant that tells the
            program how much to rotate if the steering keys are being pressed.
          </li>
        </ul>
        <div className="image">
          <img
            style={{ height: "15rem" }}
            src={step1}
            alt="Step 1 Screenshot"
          />
        </div>
      </TickableSection>
      <TickableSection tickId="s4step2" header="Step 2 - Initialise Variables">
        <p>
          The initial values of the variables will make use of some p5.js
          constants. Therefore we must set the initial values inside the{" "}
          <code>setup()</code> function.
        </p>
        <p>
          Note that the initial position is at the midpoint of the screen, I am
          using
          <code>height</code>, <code>width</code> and <code>PI</code> which are
          provided by the framework.
        </p>
        <div className="image">
          <img
            style={{ height: "15rem" }}
            src={step2}
            alt="Step 2 Screenshot"
          />
        </div>
      </TickableSection>
      <TickableSection tickId="s4step3" header="Step 3 - Tranform and Draw">
        <p>
          This next bit of code will run the transformations required to place
          our car in the correct place.
        </p>
        <div className="image">
          <img
            style={{ height: "15rem" }}
            src={step3}
            alt="Step 3 Screenshot"
          />
        </div>
        <p>
          Once you have this code typed in, RUN the sketch and you should see
          the triangle
        </p>
        <div className="image">
          <img
            style={{ height: "15rem" }}
            src={step3Result}
            alt="Step 3 Screenshot"
          />
        </div>
      </TickableSection>
      <TickableSection tickId="s4step4" header="Step 4 - Steering">
        <p>
          This bit of code goes inside the <code>draw()</code> function and is
          where you are checking for the
          <code>LEFT_ARROW</code> and <code>RIGHT_ARROW</code> keys being
          pressed.
        </p>
        <div className="image">
          <img
            style={{ height: "15rem" }}
            src={step4}
            alt="Step 4 Screenshot"
          />
        </div>
      </TickableSection>
      <TickableSection tickId="s4step5" header="Step 5 - Moving Forward">
        <p>
          This bit of code is yet another key press detection inside{" "}
          <code>draw()</code> but the way that the position is changed is a
          little complicated.
          <code>UP_ARROW</code> is being pressed.
        </p>
        <div className="image">
          <img
            style={{ height: "15rem" }}
            src={step5}
            alt="Step 5 Screenshot"
          />
        </div>
        <p>
          Once you have this typed in correctly, RUN your sketch, click into the
          sketch to give it focus and start driving!
        </p>

        <div className="image">
          <img
            style={{ height: "15rem" }}
            src={step5Result}
            alt="Step 5 Screenshot"
          />
        </div>
      </TickableSection>
      <TickableSection tickId="s4chal1" header="Challenge: Elaborate Drawing">
        <p>
          Now that your 'car' moves around correctly, feel free to add more
          shapes or even just modify the existing ones to your liking. Remember
          to draw 'about the origin' so that the rotation works correctly. For
          example, here is the code to draw a rectangle 'about the origin':
        </p>
        <div className="image">
          <img
            style={{ height: "5rem" }}
            src={chal1}
            alt="Challenge 1 Screenshot"
          />
        </div>
      </TickableSection>
    </div>
  );
};

export default TopDownCar;
