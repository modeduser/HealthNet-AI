import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const defaultRole = searchParams.get("role") || "";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(defaultRole);

  const users = [
    { email: "worker@example.com", password: "1234", role: "health-worker" },
    { email: "hospital@example.com", password: "1234", role: "hospital" },
    { email: "admin@example.com", password: "1234", role: "admin" },
  ];

  const handleLogin = () => {
    const found = users.find(
      (u) => u.email === email && u.password === password && u.role === role
    );

    if (!found) {
      alert("Invalid email, password, or role");
      return;
    }

    if (role === "health-worker") navigate("/health-worker");
    if (role === "hospital") navigate("/hospital");
    if (role === "admin") navigate("/admin");

  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-teal-600 mb-6">
          HealthNet AI Login
        </h1>

        <input
          className="w-full p-3 border rounded mb-3"
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full p-3 border rounded mb-3"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <select
          className="w-full p-3 border rounded mb-5"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="">Select Role</option>
          <option value="health-worker">Health Worker</option>
          <option value="hospital">Hospital</option>
          <option value="admin">Admin</option>
        </select>

        <button
          onClick={handleLogin}
          className="w-full bg-teal-600 text-white p-3 rounded hover:bg-teal-700 transition"
        >
          Login
        </button>
      </div>
    </div>
  );
}
