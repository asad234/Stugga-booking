import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar/>
      <main className="p-4">
        <h1 className="text-2xl">Welcome to Laundry Booking App</h1>
      </main>
    </div>
  );
}