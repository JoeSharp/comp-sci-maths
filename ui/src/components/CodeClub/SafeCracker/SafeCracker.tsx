import React from "react";
import TickableSection from "../TickableSection";

import step0 from "./images/step0.png";
import step1 from "./images/step1.png";
import step2 from "./images/step2.png";
import step3 from "./images/step3.png";

const SafeCracker = () => {
  return (
    <div className="tutorial">
      <h1>Brute Force Attack</h1>
      <p>
        We will be writing a program to demonstrate brute forcing a 3 digit PIN.
      </p>

      <TickableSection tickId="step0" header="Step 0 - Create 'Safe' Function">
        <p>
          First we define a function to encapsulate our 'Safe'. It will return
          true if we give it the correct PIN, otherwise it will return false.
        </p>
        <div className="image">
          <img style={{ height: "7rem" }} src={step0} alt="Step 0 Screenshot" />
        </div>
      </TickableSection>

      <TickableSection tickId="step1" header="Step 1 - Submit Single Values">
        <p>
          Let us check we can call this function and interpret the result
          correctly. The following code should return 'Safe still LOCKED' when
          run.
        </p>
        <div className="image">
          <img
            style={{ height: "13rem" }}
            src={step1}
            alt="Step 1 Screenshot"
          />
        </div>
        <p>
          <ul>
            <li>
              Try submitting a value of <code>345</code> and check that the
              program prints 'Safe OPENED'.
            </li>
          </ul>
        </p>
      </TickableSection>

      <TickableSection
        tickId="step2"
        header="Step 2 - Loop through all possible calues"
      >
        <p>Here we create a loop to go through all the possible values.</p>
        <div className="image">
          <img
            style={{ height: "13rem" }}
            src={step2}
            alt="Step 2 Screenshot"
          />
        </div>
        <ul>
          <li>
            Change the expected value of the PIN to 004, does the safe still
            crack? It should not
          </li>
          <li>
            Change the expected value of the PIN to 034, does the safe crack? It
            should not
          </li>
        </ul>
      </TickableSection>

      <TickableSection tickId="step3" header="Step 3 - Zero Pad the Number">
        <p>For the lower values of PIN to work, we must pad with zeros.</p>
        <div className="image">
          <img
            style={{ height: "20rem" }}
            src={step3}
            alt="Step 3 Screenshot"
          />
        </div>
        <ul>
          <li>
            Set the pin in open_safe to values 005, 065, 123, do they work? They
            should
          </li>
          <li> Set the pin to 4568, does this work? It should not</li>
        </ul>
      </TickableSection>
    </div>
  );
};

export default SafeCracker;
