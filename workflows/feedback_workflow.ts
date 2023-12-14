import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import { FeedbackFunctionDefinition } from "../functions/feedback_function.ts";

/**
 * A workflow is a set of steps that are executed in order.
 * Each step in a workflow is a function.
 * https://api.slack.com/automation/workflows
 */
const FeedbackWorkflow = DefineWorkflow({
  callback_id: "greeting_workflow",
  title: "Send a greeting",
  description: "Send a greeting to channel",
  input_parameters: {
    properties: {
      interactivity: {
        type: Schema.slack.types.interactivity,
      },
      user: {
        type: Schema.slack.types.user_id,
      },
    },
    required: ["interactivity"],
  },
});

/**
 * For collecting input from users, we recommend the
 * built-in OpenForm function as a first step.
 * https://api.slack.com/automation/functions#open-a-form
 */
const inputForm = FeedbackWorkflow.addStep(
  Schema.slack.functions.OpenForm,
  {
    title: "Send a greeting",
    interactivity: FeedbackWorkflow.inputs.interactivity,
    submit_label: "Send greeting",
    fields: {
      elements: [{
        name: "user",
        title: "Team Member",
        type: Schema.slack.types.user_id,
      },
      {
        name: "feedback",
        title: "Feedback to team member",
        type: Schema.types.string,
        long: true,
      }],
      required: ["user", "feedback"],
    },
  },
);

const greetingFunctionStep = FeedbackWorkflow.addStep(
  FeedbackFunctionDefinition,
  {
    user: inputForm.outputs.fields.user,
    message: inputForm.outputs.fields.feedback,
  },
);

FeedbackWorkflow.addStep(
  Schema.slack.functions.SendDm, {
  user_id: inputForm.outputs.fields.user,
  message: greetingFunctionStep.outputs.feedback,
});

export default FeedbackWorkflow;
