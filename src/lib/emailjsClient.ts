import emailjs from "@emailjs/browser";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;

/** استدعِ هذا في App.tsx أو main.tsx مرة واحدة */
export function initEmailJS(): void {
  emailjs.init(PUBLIC_KEY);
}

export interface EmailVariables {
  user_name: string;
  user_email: string;
  message: string;
  [key: string]: unknown;
}

export function sendTemplate(variables: EmailVariables) {
  return emailjs.send(SERVICE_ID, TEMPLATE_ID, variables, PUBLIC_KEY);
}
