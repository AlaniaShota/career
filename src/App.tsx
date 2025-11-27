import JobList from "./component/JobList";

export default function App() {
  return (
    <>
    <main className="min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold p-4">Job Listings</h1>
      <JobList />
    </main>
    </>
  );
}
