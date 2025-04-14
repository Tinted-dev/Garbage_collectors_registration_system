// src/pages/Home.jsx
import garbageImg from "../assets/images.jpeg";

const Home = () => (
  <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-gradient-to-br from-green-100 via-green-50 to-green-100">
    <img
      src={garbageImg}
      alt="Garbage collection"
      className="w-64 h-64 object-contain mb-8 drop-shadow-lg"
    />

    <div className="bg-white p-10 rounded-3xl shadow-xl max-w-2xl w-full border border-green-200">
      <h1 className="text-5xl font-extrabold text-green-700 mb-6">
        🌿 Welcome to WasteWatch
      </h1>
      <p className="text-xl text-gray-700 leading-relaxed">
        Track, verify, and manage garbage collectors in your community with ease.
      </p>
    </div>
  </div>
);

export default Home;
