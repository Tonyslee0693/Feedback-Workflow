import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";

/**
 * Functions are reusable building blocks of automation that accept
 * inputs, perform calculations, and provide outputs. Functions can
 * be used independently or as steps in workflows.
 * https://api.slack.com/automation/functions/custom
 */
export const FeedbackFunctionDefinition = DefineFunction({
  callback_id: "feedback_funtion",
  title: "Generate feedback",
  description: "Generate feedback",
  source_file: "functions/feedback_function.ts",
  input_parameters: {
    properties: {
      user: {
        type: Schema.slack.types.user_id,
        description: "Team Member",
      },
      message: {
        type: Schema.types.string,
        description: "Message to the team member",
      },
    },
    required: ["message", "user"],
  },
  output_parameters: {
    properties: {
      feedback: {
        type: Schema.types.string,
        description: "feedback for the team member",
      },
    },
    required: ["feedback"],
  },
});

export default SlackFunction(
  FeedbackFunctionDefinition,
  ({ inputs }) => {
    const { user, message } = inputs;
    const feedback =
      `<@${user}>! :wave: Someone sent the following feedback: \n\n>${message}`;
    return { outputs: { feedback } };
  },
);
