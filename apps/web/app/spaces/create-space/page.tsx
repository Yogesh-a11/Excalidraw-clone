"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
function CreateSpace() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleCreateSpace = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3001/api/v1/space/space",
        { name },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage(`Space created successfully: ${response.data.spaceSlug}`);
      router.push("/spaces");
    } catch (err) {
      console.error("Error creating space:", err);
      setMessage("Error creating space. Please try again.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Create a New Space</h1>
      <form onSubmit={handleCreateSpace}>
        <input
          type="text"
          placeholder="Enter space name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ padding: "8px", width: "250px" }}
        />
        <button type="submit" style={{ padding: "8px 16px", marginLeft: "10px" }}>
          Create Space
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default CreateSpace