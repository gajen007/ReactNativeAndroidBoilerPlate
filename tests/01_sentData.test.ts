import { API_BASE } from "@/app/API_BASE";

// ─── Mock Setup ───────────────────────────────
global.fetch = jest.fn() as jest.Mock;

beforeEach(() => {
  jest.clearAllMocks(); // reset mocks before every test
});

afterAll(() => {
  jest.restoreAllMocks(); // clean up after entire file is done
});

// ─── Test Suite ───────────────────────────────
describe("sentData()", () => {
  test("TC-SD-01: sentData posts correct payload and handles success response", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({ message: "User saved successfully" }),
    });

    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    // Simulate calling sentData with userName = 'Alice', userEmail = 'alice@example.com'
    const fd = { uname: "Alice", uemail: "alice@example.com" };

    await fetch(`${API_BASE}/samplePost`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fd),
    })
      .then((res) => res.json())
      .then((data) => console.log("Post response:", data));

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(`${API_BASE}/samplePost`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uname: "Alice", uemail: "alice@example.com" }),
    });
    expect(consoleSpy).toHaveBeenCalledWith("Post response:", {
      message: "User saved successfully",
    });

    consoleSpy.mockRestore();
  });

  // ─────────────────────────────────────────────
  // TC-SD-02: POST with empty userName
  // ─────────────────────────────────────────────
  test("TC-SD-02: sentData sends empty string for userName when not provided", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({ message: "Saved" }),
    });

    const fd = { uname: "", uemail: "alice@example.com" };

    await fetch(`${API_BASE}/samplePost`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fd),
    });

    expect(fetch).toHaveBeenCalledWith(
      `${API_BASE}/samplePost`,
      expect.objectContaining({
        body: JSON.stringify({ uname: "", uemail: "alice@example.com" }),
      }),
    );
  });

  // ─────────────────────────────────────────────
  // TC-SD-03: POST with empty userEmail
  // ─────────────────────────────────────────────
  test("TC-SD-03: sentData sends empty string for userEmail when not provided", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({ message: "Saved" }),
    });

    const fd = { uname: "Alice", uemail: "" };

    await fetch(`${API_BASE}/samplePost`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fd),
    });

    expect(fetch).toHaveBeenCalledWith(
      `${API_BASE}/samplePost`,
      expect.objectContaining({
        body: JSON.stringify({ uname: "Alice", uemail: "" }),
      }),
    );
  });

  // ─────────────────────────────────────────────
  // TC-SD-04: POST with both fields empty
  // ─────────────────────────────────────────────
  test("TC-SD-04: sentData sends both fields empty without throwing", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({}),
    });

    const fd = { uname: "", uemail: "" };

    await expect(
      fetch(`${API_BASE}/samplePost`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fd),
      }).then((res) => res.json()),
    ).resolves.toEqual({});
  });

  // ─────────────────────────────────────────────
  // TC-SD-05: Network failure / fetch rejection
  // ─────────────────────────────────────────────
  test("TC-SD-05: sentData logs error on network failure", async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(
      new Error("Network Error"),
    );

    const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    await fetch(`${API_BASE}/samplePost`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uname: "Alice", uemail: "alice@example.com" }),
    }).catch((err) => console.error("Post error:", err));

    expect(errorSpy).toHaveBeenCalledWith("Post error:", expect.any(Error));

    errorSpy.mockRestore();
  });

  // ─────────────────────────────────────────────
  // TC-SD-06: Server returns 500 error body
  // ─────────────────────────────────────────────
  test("TC-SD-06: sentData handles server-side error response gracefully", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({ error: "Internal Server Error" }),
    });

    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    await fetch(`${API_BASE}/samplePost`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uname: "Alice", uemail: "alice@example.com" }),
    })
      .then((res) => res.json())
      .then((data) => console.log("Post response:", data));

    expect(consoleSpy).toHaveBeenCalledWith("Post response:", {
      error: "Internal Server Error",
    });

    consoleSpy.mockRestore();
  });
});
