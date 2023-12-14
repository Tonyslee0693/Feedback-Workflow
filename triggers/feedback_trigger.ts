import { Trigger } from "deno-slack-sdk/types.ts";
import { TriggerContextData, TriggerTypes } from "deno-slack-api/mod.ts";
import FeedbackWorkflow from "../workflows/feedback_workflow.ts";

/**
 * Triggers determine when workflows are executed. A trigger
 * file describes a scenario in which a workflow should be run,
 * such as a user pressing a button or when a specific event occurs.
 * https://api.slack.com/automation/triggers
 */
const feedbackTrigger: Trigger<typeof FeedbackWorkflow.definition> = {
  type: TriggerTypes.Shortcut,
  name: "Send Feedback",
  description: "Leave feedback to one of your team members",
  workflow: `#/workflows/${FeedbackWorkflow.definition.callback_id}`,
  inputs: {
    interactivity: {
      value: TriggerContextData.Shortcut.interactivity,
    },
    user: {
      value: TriggerContextData.Shortcut.user_id,
    },
  },
};

export default feedbackTrigger;
