import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { randomUUID } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

interface User {
  id: string;
  firstName: string;
  lastName: string;
}

interface State {
  users: User[];
}

const PORT = Number(process.env.PORT || 8080);
const STATE_FILE = process.env.STATE_FILE || "/state.json";

function ensureStateFile(): void {
  const dir = path.dirname(STATE_FILE);

  mkdirSync(dir, { recursive: true });

  if (!existsSync(STATE_FILE)) {
    writeFileSync(STATE_FILE, JSON.stringify({ users: [] }, null, 2));
  }
}

function readState(): State {
  ensureStateFile();

  try {
    const raw = readFileSync(STATE_FILE, "utf8").trim();

    if (!raw) {
      return { users: [] };
    }

    const parsed: unknown = JSON.parse(raw);

    if (Array.isArray(parsed)) {
      return { users: parsed as User[] };
    }

    if (
      typeof parsed === "object" &&
      parsed !== null &&
      "users" in parsed &&
      Array.isArray(parsed.users)
    ) {
      return { users: parsed.users as User[] };
    }

    return { users: [] };
  } catch {
    return { users: [] };
  }
}

function writeState(state: State): void {
  writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let body = "";

    req.on("data", (chunk: string | Buffer) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      resolve(body);
    });

    req.on("error", reject);
  });
}

function sendJson(
  res: ServerResponse,
  statusCode: number,
  payload: unknown
): void {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(payload));
}

function sendNoContent(res: ServerResponse, statusCode: number): void {
  res.writeHead(statusCode);
  res.end();
}

function isValidUserPayload(
  payload: unknown
): payload is { firstName: string; lastName: string } {
  return (
    typeof payload === "object" &&
    payload !== null &&
    "firstName" in payload &&
    typeof payload.firstName === "string" &&
    payload.firstName.trim() !== "" &&
    "lastName" in payload &&
    typeof payload.lastName === "string" &&
    payload.lastName.trim() !== ""
  );
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);

  if (req.method === "GET" && url.pathname === "/health") {
    return sendJson(res, 200, { status: "ok" });
  }

  if (req.method === "GET" && url.pathname === "/users") {
    return sendJson(res, 200, readState().users);
  }

  if (req.method === "POST" && url.pathname === "/users") {
    try {
      const rawBody = await readBody(req);
      const payload: unknown = rawBody ? JSON.parse(rawBody) : {};

      if (!isValidUserPayload(payload)) {
        return sendJson(res, 400, {
          error: "firstName and lastName are required strings"
        });
      }

      const state = readState();
      const user: User = {
        id: randomUUID(),
        firstName: payload.firstName.trim(),
        lastName: payload.lastName.trim()
      };

      state.users.push(user);
      writeState(state);

      return sendJson(res, 201, user);
    } catch {
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
