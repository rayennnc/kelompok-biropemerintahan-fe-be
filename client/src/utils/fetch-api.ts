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
      const text = await response.text(); // baca isi error body
      throw new Error(`HTTP error! status: ${response.status}, body: ${text}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch API error:", error, {
      url,
      options,
      errorType: typeof error,
    });
    throw error;
  }
}
