"use client";
import TelegramLoginWidget, { tgUser } from "@/components/TelegramLoginWidget";

function logUser(user: tgUser) {
  console.log(user);
}
export default function Login() {
  return (
    <>
      <TelegramLoginWidget
        botName="threej_bot"
        dataAuthUrlOrCallback={(user: tgUser) => logUser(user)}
      ></TelegramLoginWidget>
    </>
  );
}
