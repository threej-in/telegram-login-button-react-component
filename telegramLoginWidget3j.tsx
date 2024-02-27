"use client";

import { useEffect } from "react";

export interface tgUser {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  photo_url: string;
  auth_date: number;
  hash: string;
}

interface options {
  botName: string;
  dataAuthUrlOrCallback: string | Function;
  reqWriteAccess?: boolean;
  buttonSize?: "large" | "medium" | "small";
  cornerRadius?: number;
  usePic?: boolean;
  widgetVersion?: number;
}

declare global {
  interface Window {
    telegramLoginWidget3j: object;
  }
}

export default function ({
  botName,
  dataAuthUrlOrCallback,
  reqWriteAccess = true,
  buttonSize = "large",
  cornerRadius = 20,
  usePic = true,
  widgetVersion = 22,
}: options) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?" + widgetVersion;
    script.setAttribute("data-telegram-login", botName);
    script.setAttribute("data-size", buttonSize);
    script.setAttribute("data-radius", cornerRadius + "");
    reqWriteAccess && script.setAttribute("data-request-access", "write");
    script.setAttribute("data-userpic", usePic + "");

    if (typeof dataAuthUrlOrCallback == "string") {
      script.setAttribute("data-auth-url", dataAuthUrlOrCallback + "");
    } else {
      window.telegramLoginWidget3j = { dataOnAuth: dataAuthUrlOrCallback };
      script.setAttribute(
        "data-onauth",
        "telegramLoginWidget3j.dataOnAuth(user)"
      );
    }
    script.async = true;
    document.getElementById("telegram-login-widget-3j")!.appendChild(script);
  }, []);

  return (
    <>
      <div id="telegram-login-widget-3j"></div>
    </>
  );
}
