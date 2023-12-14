import { SlackFunctionTester } from "deno-slack-sdk/mod.ts";
import { assert } from "https://deno.land/std@0.153.0/testing/asserts.ts";
import GreetingFunction from "./feedback_function.ts";

const { createContext } = SlackFunctionTester("feedback_function");

Deno.test("Feedback function test", async () => {
  
});
