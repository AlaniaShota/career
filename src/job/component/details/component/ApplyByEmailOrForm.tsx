interface Props {
  recruiterEmail: string;
  jobTitle: string;
}

export default function ApplyByEmailOrForm({
  recruiterEmail,
  jobTitle,
}: Props) {
  const gmailLink = `https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(
    recruiterEmail
  )}&su=${encodeURIComponent(jobTitle)}`;

  return (
    <a href={gmailLink} target="_blank" rel="noopener noreferrer">
      <button className="px-4 py-2 bg-soft-sky cursor-pointer text-white rounded">
        <span className="text-gstore-midnight">Send Email</span>
      </button>
    </a>
  );
}
