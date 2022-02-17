import React from "react";

import "../tutorials.css";

import { Link } from "react-router-dom";

import TickableSection from "../TickableSection";

import step1 from "./images/step1.png";
import step2 from "./images/step2.png";
import step3 from "./images/step3.png";
import step4 from "./images/step4.png";
import step5 from "./images/step5.png";
import step6 from "./images/step6.png";
import step7 from "./images/step7.png";

const MovingWithKeyboard: React.FunctionComponent = () => {
  return (
    <div className="tutorial">
      <h1>Using Classes</h1>
      <p>
        We will be learning how to encapsulate our game entities using classes.
      </p>
      <p>
        In this game I will make a very simple 'player' that can be directed to
        move horizontally using the LEFT and RIGHT arrow keys. We will
        encapsulate this player in a class, and then use a JavaScript object to
        configure the controls for the player.
      </p>
      <p>
        Once the controls can be changed for a given player, we can then make
        multiple players, each with an independant existence in the 'game
        world'.
      </p>
      <p>
        The control scheme is a bit like{" "}
        <Link to="/codeClub/movingWithKeyboard">Moving With Keyboard</Link> but,
        instead of using the event handling functions, we will use isKeyDown
        which we used in
        <Link to="/codeClub/topDownCar">Top Down Car</Link>. So we have a mix of
        approaches.
      </p>
      <p>
        I will only implement LEFT and RIGHT, but you can add UP and DOWN if you
        like. Then try and apply this class based approach to the top down car
        and the steering controls.
      </p>
      <p>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://editor.p5js.org/JoeSharp/sketches/XqokKbcsP"
        >
          Here is a completed example.
        </a>
      </p>
      <TickableSection tickId="s6step1" header="Step 1 - Create Class">
        <p>
          Here we create the class that encapsulates our player. At this stage
          each instance will have a 'position'. I am using <code>this</code> to
          assign a position to the <code>instance</code> of the class. Each{" "}
          <code>Player</code> in our sketch will have its own position.
        </p>
        <div className="image">
          <img
            style={{ height: "15rem" }}
            src={step1}
            alt="Step 1 Screenshot"
          />
        </div>
      </TickableSection>

      <TickableSection tickId="s6step2" header="Step 2 - Create Instance">
        <p>
          Here we declare a variable called 'player' and in the{" "}
          <code>setup()</code> function we create an instance of our class.
          Inside <code>draw()</code> we can then call upon our player to{" "}
          <code>update()</code> and <code>draw()</code> itself.
        </p>
        <div className="image">
          <img
            style={{ height: "15rem" }}
            src={step2}
            alt="Step 2 Screenshot"
          />
        </div>
      </TickableSection>

      <TickableSection tickId="s6step3" header="Step 3 - Draw Something">
        <p>
          Here we add the drawing code, at the moment I will just draw an
          ellipse for our player.
        </p>
        <p>
          Note the use of <code>push()</code> and <code>pop()</code> around our
          drawing code. This prevents our translation interfering with the
          drawing of other game objects.
        </p>
        <div className="image">
          <img
            style={{ height: "15rem" }}
            src={step3}
            alt="Step 3 Screenshot"
          />
        </div>
      </TickableSection>

      <TickableSection
        tickId="s6step4"
        header="Step 4 - Update Position based on Keys"
      >
        <p>
          Here we are handling the controls of our game. The{" "}
          <code>keyIsDown()</code> function is used to determine if LEFT/RIGHT
          ARROW keys are pressed and it updates the position on{" "}
          <code>this</code> accordingly.
        </p>

        <div className="image">
          <img
            style={{ height: "15rem" }}
            src={step4}
            alt="Step 4 Screenshot"
          />
        </div>
      </TickableSection>
      <TickableSection tickId="s6step5" header="Step 5 - Add a second player">
        <p>
          We will now add a second player, I have simply added another variable
          for <code>player2</code>, renamed the original <code>player</code> to{" "}
          <code>player1</code>. I then just have to call <code>update()</code>{" "}
          and <code>draw()</code> on this second instance.
        </p>
        <p>You may notice that the same arrow keys control both players...</p>

        <div className="image">
          <img
            style={{ height: "20rem" }}
            src={step5}
            alt="Step 5 Screenshot"
          />
        </div>
      </TickableSection>
      <TickableSection
        tickId="s6step6"
        header="Step 6 - Add Configurable Controls per Player"
      >
        <p>
          I have added a second argument to the Player constructor called{" "}
          <code>controls</code>. I have then updated the <code>update()</code>{" "}
          function to use <code>controls.right</code> and{" "}
          <code>controls.left</code>
          instead of the fixed arrow key values.
        </p>
        <p>
          This code won't work yet, we now need to pass controls into the
          constructor...
        </p>

        <div className="image">
          <img
            style={{ height: "20rem" }}
            src={step6}
            alt="Step 6 Screenshot"
          />
        </div>
      </TickableSection>
      <TickableSection
        tickId="s6step7"
        header="Step 7 - Pass Controls to each Player"
      >
        <p>
          I have now added controls to each player initialisation. This is an
          example of a <em>Literal Object</em> in JavaScript. The data format is
          referred to as <code>JSON</code> (JavaScript Object Notation)
        </p>

        <div className="image">
          <img
            style={{ height: "15rem" }}
            src={step7}
            alt="Step 7 Screenshot"
          />
        </div>
      </TickableSection>
    </div>
  );
};

export default MovingWithKeyboard;
