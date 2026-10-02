import React, { useState } from "react";
import { AppText, Button, Field, MenuRow, Screen } from "../../components";
import { useApp, useMockSubmit } from "../../hooks";
export function HelpScreen() {
  const app = useApp(),
    mock = useMockSubmit();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  return (
    <Screen title="Help & support" onBack={app.back}>
      <AppText size={24} bold>
        We’re here to help.
      </AppText>
      {[
        [
          "How do auctions work?",
          "Confirm a bid, watch your status, and complete mock checkout if you win.",
        ],
        [
          "Where is my order?",
          "Open Profile → Purchases, then tap an order to see its journey.",
        ],
        [
          "How do I sell?",
          "Open Sell to create a listing, schedule a show, or preview the control room.",
        ],
      ].map(([title, detail]) => (
        <MenuRow
          key={title}
          title={title!}
          onPress={() => setAnswer(detail!)}
        />
      ))}
      {answer && <AppText muted>{answer}</AppText>}
      <Field
        label="Your question"
        value={question}
        onChange={setQuestion}
        multiline
      />
      <Button
        label="Submit demo request"
        disabled={!question.trim()}
        loading={mock.loading}
        onPress={() =>
          mock.submit(() => {
            app.toast("Demo support request recorded. No message was sent.");
            setQuestion("");
          })
        }
      />
    </Screen>
  );
}
