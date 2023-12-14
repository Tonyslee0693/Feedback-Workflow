import { Manifest } from "deno-slack-sdk/mod.ts";
import FeedbackWorkflow from "./workflows/feedback_workflow.ts";

/**
 * The app manifest contains the app's configuration. This
 * file defines attributes like app name and description.
 * https://api.slack.com/automation/manifest
 */
export default Manifest({
  name: "feedback-app",
  description:
    "A workflow that sends feedback to a team member in a DM with a bot",
  icon: "assets/default_new_app_icon.png",
  workflows: [FeedbackWorkflow],
  outgoingDomains: [],
  botScopes: ["commands", "chat:write"],
});
