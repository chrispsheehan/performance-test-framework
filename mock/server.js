const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const PORT = Number(process.env.PORT || 8080);
const STATE_FILE = process.env.STATE_FILE || "/state.json";

function ensureStateFile() {
  const dir = path.dirname(STATE_FILE);

  fs.mkdirSync(dir, { recursive: true });

  if (!fs.existsSync(STATE_FILE)) {
    fs.writeFileSync(STATE_FILE, JSON.stringify({ users: [] }, null, 2));
  }
}

function readState() {
  ensureStateFile();

  try {
    const raw = fs.readFileSync(STATE_FILE, "utf8").trim();

    if (!raw) {
      return { users: [] };
    }

    const parsed = JSON.parse(raw);
    const users = Array.isArray(parsed.users)
      ? parsed.users
      : Array.isArray(parsed)
        ? parsed
        : [];

    return { users };
  } catch (_error) {
    return { users: [] };
  }
}

function writeState(state) {
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      resolve(body);
    });

    req.on("error", reject);
  });
}

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(payload));
}

function sendNoContent(res, statusCode) {
  res.writeHead(statusCode);
  res.end();
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);

  if (req.method === "GET" && url.pathname === "/health") {
    return sendJson(res, 200, { status: "ok" });
  }

  if (req.method === "GET" && url.pathname === "/users") {
    return sendJson(res, 200, readState().users);
  }

  if (req.method === "POST" && url.pathname === "/users") {
    try {
      const rawBody = await readBody(req);
      const payload = rawBody ? JSON.parse(rawBody) : {};

      if (
        typeof payload.firstName !== "string" ||
        payload.firstName.trim() === "" ||
        typeof payload.lastName !== "string" ||
        payload.lastName.trim() === ""
      ) {
        return sendJson(res, 400, {
          error: "firstName and lastName are required strings"
        });
      }

      const state = readState();
      const user = {
        id: crypto.randomUUID(),
        firstName: payload.firstName.trim(),
        lastName: payload.lastName.trim()
      };

      state.users.push(user);
      writeState(state);

      return sendJson(res, 201, user);
    } catch (_error) {
      return sendJson(res, 400, { error: "invalid json body" });
    }
  }

  if (req.method === "DELETE" && url.pathname === "/users") {
    writeState({ users: [] });
    return sendNoContent(res, 204);
  }

  return sendJson(res, 404, { error: "not found" });
});

server.listen(PORT, () => {
  console.log(`mock service listening on ${PORT}`);
});
