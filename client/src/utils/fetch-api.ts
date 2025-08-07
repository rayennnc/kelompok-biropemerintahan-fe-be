// utils/fetch-api.ts
export async function fetchAPI(
  url: string,
  options: RequestInit = {}
): Promise<any> {
  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch API error:", error);
    throw error;
  }
}