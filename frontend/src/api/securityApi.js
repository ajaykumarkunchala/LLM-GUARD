const API_BASE_URL = "http://localhost:5000";

export async function getSecurityLogs() {
  const response = await fetch(
    `${API_BASE_URL}/api/security-logs`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch security logs");
  }

  return response.json();
}