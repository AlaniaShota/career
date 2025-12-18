export interface FAQItem {
  id: number;
  label: string;
  value: string;
}

export const faqConfig: FAQItem[] = [
  {
    id: 1,
    label: "How long does it take to get a response?:",
    value:
      "We typically respond within 24–48 business hours, depending on the volume of requests.",
  },
  {
    id: 2,
    label: "I can’t log into my account. What should I do?:",
    value:
      "Try resetting your password first. If the issue persists, contact our support team with the email address you used to register.",
  },
  {
    id: 3,
    label: "How can I partner with JobBoard as a company?",
    value:
      "Send us a brief description of your company and partnership idea to business@jobboard.com and we’ll get back to you.",
  },
  {
    id: 4,
    label: "Do you charge job seekers for using JobBoard?",
    value:
      "No, JobBoard is free for job seekers. Some advanced employer features may require a paid plan.",
  },
];
