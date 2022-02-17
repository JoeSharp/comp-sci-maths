import React from "react";

import "../tutorials.css";

import TickableSection from "../TickableSection";

import topDownControl from "./images/top_down_control.png";
import step1 from "./images/step1.png";
import step2 from "./images/step2.png";
import step3a from "./images/step3_a.png";
import step3b from "./images/step3_b.png";
import step4a from "./images/step4_a.png";
import step4b from "./images/step4_b.png";
import step4c from "./images/step4_c.png";
import challenge1 from "./images/challenge_1.png";

const MovingWithKeyboard: React.FunctionComponent = () => {
  return (
    <div className="tutorial">
      <h1>Moving With Keyboard</h1>
      <p>
        We will be learning how to move shapes around the screen using our
        keyboard. This will give you some options when writing games.
      </p>
      <p>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://editor.p5js.org/JoeSharp/sketches/UxliLhatH"
        >
          Here is a completed example.
        </a>
      </p>
      <p>The control scheme could be visualised like this:</p>
      <div className="image">
        <img
          style={{ height: "15rem" }}
          src={topDownControl}
          alt="Top Down Control Demo"
        />
      </div>
      <TickableSection tickId="s3Step1" header="Step 1 - Create Variables">
        <p>
          A variable is a named container for a value in your program. You will
          create two variables.
        </p>
        <ol>
          <li>x: The 'x' position of your player</li>
          <li>y: The 'y' position of your player</li>
        </ol>
        <p>
          In JavaScript we use the keyword <code>let</code> to declare the
          existence of the variable. I declare the variables{" "}
          <code>outside</code> the <code>setup()</code> and <code>draw()</code>
          functions. This ensures the following:
        </p>
        <ol>
          <li>
            They are globally available to both, if we declared x and y inside
            either function, they would not be visible to the other function.
          </li>
          <li>
            There is a single ‘instance’ of x and y used for all frames, if we
            declared x and y inside draw(), we would get a new variable for each
            frame.
          </li>
        </ol>
        <div className="image">
          <img
            style={{ height: "15rem" }}
            src={step1}
            alt="Step 1 Screenshot"
          />
        </div>
      </TickableSection>
      <TickableSection
        tickId="s3Step2"
        header="Step 2 – Initialise Variable Values"
      >
        <p>
          This is done inside the <code>setup()</code> function. Remember:
        </p>
        <p>Setup() is called once, at the beginning of the sketch</p>
        <p>
          I use the <code>width</code> and <code>height</code> values which are
          available from the p5 framework to place x and y in the middle of the
          sketch.
        </p>
        <p>
          I <strong>must</strong> do this inside <code>setup()</code> so that{" "}
          <code>width</code> and <code>height</code> are available. Width and
          height do not exist outside of p5 functions.
        </p>
        <div className="image">
          <img
            style={{ height: "10rem" }}
            src={step2}
            alt="Step 2 Screenshot"
          />
        </div>
      </TickableSection>
      <TickableSection
        tickId="s3Step3"
        header="Step 3 - Use x and y to position drawing"
      >
        <p>
          Now that <code>x</code> and <code>y</code> exist and have been
          initialised, we can use them inside the draw() function to position
          our player drawing. For now, I will simply draw an ellipse about the
          origin. I will use translate with our x and y values to position that
          ellipse correctly.
        </p>
        <div className="image">
          <img
            style={{ height: "10rem" }}
            src={step3a}
            alt="Step 3a Screenshot"
          />
          <img
            style={{ height: "10rem" }}
            src={step3b}
            alt="Step 3b Screenshot"
          />
        </div>
        <p>
          Now run the program and you should see the green ellipse in the middle
          of your sketch.
        </p>
      </TickableSection>
      <TickableSection
        tickId="s3Step4"
        header="Step 4 - Use Left and Right Arrows"
      >
        <p>
          Remember to use the Reference document to find out what functions are
          available and how to use them. In this case we will be using{" "}
          <code>keyPressed()</code> from <code>Events</code>.
        </p>
        <div className="image">
          <img
            style={{ height: "15rem" }}
            src={step4a}
            alt="Step 4a Screenshot"
          />
        </div>
        <p>It even has an example for what we need!</p>
        <div className="image">
          <img
            style={{ height: "15rem" }}
            src={step4b}
            alt="Step 4b Screenshot"
          />
        </div>
        <p>
          Add this function to your program. I put it after <code>draw()</code>.
        </p>
        <div className="image">
          <img
            style={{ height: "8rem" }}
            src={step4c}
            alt="Step 4c Screenshot"
          />
        </div>
        <p>
          Now run your code and you should find that the left and right arrow
          keys move your ellipse!
        </p>
      </TickableSection>
      <h1>Challenges</h1>
      <TickableSection
        tickId="s3chal1"
        header="Challenge 1 - Up and Down Arrow"
      >
        <p>
          I will not show you how to do this, but you have enough code above to
          figure out how to do it. Add code to your program to use the UP and
          DOWN arrows to move the ellipse UP and DOWN.
        </p>
        <p>When coding this, remember the following:</p>
        <ol>
          <li>
            The ‘y’ coordinates start at 0 at the top and increase downwards,
            this may mean your y += statements need to be ‘inverted’ from what
            you expect.
          </li>
          <li>
            The values UP_ARROW and DOWN_ARROW are available as per this
            documentation
          </li>
        </ol>
        <div className="image">
          <img
            style={{ height: "10rem" }}
            src={challenge1}
            alt="Challenge 1 Screenshot"
          />
        </div>
        <p>Let the teacher know when you have this working</p>
      </TickableSection>
      <TickableSection
        tickId="s3chal2"
        header="Challenge 2 - Elaborate Your Drawing"
      >
        <p>
          The steps above give you a simple ellipse, feel free to add your own
          flair to the visual design now. You can replace the ellipse with
          something else, or just start adding more shapes to it.
        </p>
      </TickableSection>
      <TickableSection
        tickId="s3chal3"
        header="Challenge 3 - Create a constant to control speed"
      >
        <p>
          The <code>keyPressed</code> code currently uses a hard-coded value (5)
          across all 4 movement lines of code. Replace this with a constant
          called <code>STEP</code> or <code>SPEED</code> which is declared and
          set at the top of the sketch.
        </p>
      </TickableSection>
      <TickableSection
        tickId="s3chal4"
        header="Challenge 4 - Replace x, y with p5.Vector"
      >
        <p>
          Vectors are data structures that are used to describe movement and
          position in computer graphics. A vector essentially wraps x, y (and
          potentially z) values inside a single object.
        </p>
        <p>
          Replace x and y with a variable called position and initialise this
          value with createVector. You can then use <code>position.x</code> and{" "}
          <code>position.y</code> in place of x, y.
        </p>
        <p>
          I promise this will prove useful later when we make proper player
          objects using classes.
        </p>
      </TickableSection>
    </div>
  );
};

export default MovingWithKeyboard;
