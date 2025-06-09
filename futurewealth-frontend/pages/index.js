import Header from '../components/Header';

export default function Home() {
  return (
    <>
      <Header />
      <main className="p-6">
        <h1 className="text-3xl font-bold">Velkommen til FutureWealth (ALPHA)</h1>
        <p className="mt-4">Gå til menyen for å starte simulering.</p>
      </main>
    </>
  );
}
