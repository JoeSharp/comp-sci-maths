import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import DivisibilityRulePicker from "../components/maths/divisibility/divisibility-rule-picker";

export default {
  title: "Maths/DivisibilityRulePicker",
  component: DivisibilityRulePicker,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
  argTypes: { onChange: { action: "changed" } },
} as ComponentMeta<typeof DivisibilityRulePicker>;

const Template: ComponentStory<typeof DivisibilityRulePicker> = (args) => (
  <DivisibilityRulePicker {...args} />
);

export const Default = Template.bind({});
