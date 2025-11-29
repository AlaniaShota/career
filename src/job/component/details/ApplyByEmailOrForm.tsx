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
      <button className="px-4 py-2 bg-gstore-blue cursor-pointer text-white rounded hover:bg-blue-700">
        <span className="text-gstore-midnight font-semibold">Send Email</span>
      </button>
    </a>
  );
}
