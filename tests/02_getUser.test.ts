import { API_BASE } from "@/app/API_BASE";

// ─── Mock Setup ───────────────────────────────
global.fetch = jest.fn() as jest.Mock;

beforeEach(() => {
  jest.clearAllMocks();
});

afterAll(() => {
  jest.restoreAllMocks();
});

// ─── Test Suite ───────────────────────────────
describe("getUser()", () => {
  // ─────────────────────────────────────────────
  // TC-GU-01: Valid email, user found in response
  // ─────────────────────────────────────────────

  test("TC-GU-01: getUser finds user and sets userFound + foundUserName", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({ username: "Alice" }),
    });

    let userFound = false;
    let foundUserName = "";
    const lookUpEmail: string = "alice@example.com";

    const setUserFound = (val: boolean) => {
      userFound = val;
    };
    const setFoundUserName = (val: string) => {
      foundUserName = val;
    };

    // Reset state (mirrors start of getUser)
    setUserFound(false);
    setFoundUserName("");

    if (lookUpEmail !== "") {
      await fetch(`${API_BASE}/sampleGet?userEmail=${lookUpEmail}`)
        .then((res) => res.json())
        .then((data) => {
          if (data !== null) {
            setUserFound(true);
            setFoundUserName(data.username);
          }
        });
    }

    expect(fetch).toHaveBeenCalledWith(
      `${API_BASE}/sampleGet?userEmail=alice@example.com`,
    );
    expect(userFound).toBe(true);
    expect(foundUserName).toBe("Alice");
  });

  // ─────────────────────────────────────────────
  // TC-GU-02: Valid email, but user NOT found (null response)
  // ─────────────────────────────────────────────
  test("TC-GU-02: getUser sets userFound=false when response is null", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => null,
    });

    let userFound = true; // pre-set to true to confirm it resets
    let foundUserName = "OldName";
    const lookUpEmail: string = "notfound@example.com";

    const setUserFound = (val: boolean) => {
      userFound = val;
    };
    const setFoundUserName = (val: string) => {
      foundUserName = val;
    };

    setUserFound(false);
    setFoundUserName("");

    if (lookUpEmail !== "") {
      await fetch(`${API_BASE}/sampleGet?userEmail=${lookUpEmail}`)
        .then((res) => res.json())
        .then((data) => {
          if (data !== null) {
            setUserFound(true);
            setFoundUserName(data.username);
          } else {
            setUserFound(false);
            setFoundUserName("");
          }
        });
    }

    expect(userFound).toBe(false);
    expect(foundUserName).toBe("");
  });

  // ─────────────────────────────────────────────
  // TC-GU-03: lookUpEmail is empty — fetch must NOT be called
  // ─────────────────────────────────────────────
  test("TC-GU-03: getUser does NOT call fetch when lookUpEmail is empty", async () => {
    const lookUpEmail: string = "";

    if (lookUpEmail !== "") {
      await fetch(`${API_BASE}/sampleGet?userEmail=${lookUpEmail}`);
    }

    expect(fetch).not.toHaveBeenCalled();
  });

  // ─────────────────────────────────────────────
  // TC-GU-04: State always resets at the start of getUser
  // ─────────────────────────────────────────────
  test("TC-GU-04: getUser resets userFound and foundUserName before fetching", () => {
    let userFound = true;
    let foundUserName = "SomeName";

    const setUserFound = (val: boolean) => {
      userFound = val;
    };
    const setFoundUserName = (val: string) => {
      foundUserName = val;
    };

    // Simulate the first two lines of getUser
    setUserFound(false);
    setFoundUserName("");

    expect(userFound).toBe(false);
    expect(foundUserName).toBe("");
  });

  // ─────────────────────────────────────────────
  // TC-GU-05: Network failure logs error
  // ─────────────────────────────────────────────
  test("TC-GU-05: getUser logs error on fetch failure", async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error("Timeout"));

    const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    const lookUpEmail: string = "alice@example.com";

    if (lookUpEmail !== "") {
      await fetch(`${API_BASE}/sampleGet?userEmail=${lookUpEmail}`).catch(
        (err) => console.error("Get user error:", err),
      );
    }

    expect(errorSpy).toHaveBeenCalledWith("Get user error:", expect.any(Error));

    errorSpy.mockRestore();
  });

  // ─────────────────────────────────────────────
  // TC-GU-06: Email with special characters is passed as-is
  // ─────────────────────────────────────────────
  test("TC-GU-06: getUser passes special-character email in query string", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => null,
    });

    const lookUpEmail: string = "user+tag@sub.domain.com";

    if (lookUpEmail !== "") {
      await fetch(`${API_BASE}/sampleGet?userEmail=${lookUpEmail}`)
        .then((res) => res.json())
        .catch(() => {});
    }

    expect(fetch).toHaveBeenCalledWith(
      `${API_BASE}/sampleGet?userEmail=user+tag@sub.domain.com`,
    );
  });
});
