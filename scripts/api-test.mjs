// Exercises /api/enquiry against a local production server and a mock Resend endpoint. Sends no real email.
import http from "node:http";
import { spawn } from "node:child_process";

const mailbox = [];
const mock = http.createServer((req, res) => {
  let b = "";
  req.on("data", (c) => (b += c));
  req.on("end", () => { mailbox.push({ auth: req.headers.authorization, body: JSON.parse(b) }); res.writeHead(200, { "content-type": "application/json" }); res.end('{"id":"mock"}'); });
}).listen(4010);

const start = async (port, env) => {
  const p = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "-p", String(port)], { env: { ...process.env, ...env }, stdio: "ignore" });
  for (let i = 0; i < 60; i++) {
    try { await fetch("http://localhost:" + port + "/"); return p; } catch { await new Promise((r) => setTimeout(r, 500)); }
  }
  throw new Error("server did not start");
};
const post = (port, body) => fetch(`http://localhost:${port}/api/enquiry`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) }).then(async (r) => ({ status: r.status, json: await r.json() }));
const good = { kind: "project", name: "Test Person", phone: "+91 98765 43210", email: "t@example.com", company: "Acme", type: "Custom software", message: "Line one\nLine two", elapsed: 5000 };
const show = (label, r, want) => console.log(r.status === want ? "PASS" : "FAIL", label, r.status, JSON.stringify(r.json));

// 1. No configuration: must report not_configured so the browser can fall back to WhatsApp
let s = await start(3101, {});
show("unconfigured -> 503", await post(3101, good), 503);
show("invalid -> 422", await post(3101, { ...good, phone: "12", name: "" }), 422);
show("bad kind -> 422", await post(3101, { kind: "x" }), 422);
s.kill();

// 2. Configured against the mock
s = await start(3102, { RESEND_API_KEY: "test-key", ENQUIRY_TO_EMAIL: "owner@example.test", ENQUIRY_FROM_EMAIL: "Site <site@example.test>", RESEND_API_URL: "http://localhost:4010/emails" });
show("valid project -> 200", await post(3102, good), 200);
show("valid waitlist -> 200", await post(3102, { kind: "waitlist", email: "w@example.com", elapsed: 4000 }), 200);
const before = mailbox.length;
show("honeypot -> 200 but no mail", await post(3102, { ...good, website: "http://spam" }), 200);
show("too fast -> 200 but no mail", await post(3102, { ...good, elapsed: 100 }), 200);
console.log(mailbox.length === before ? "PASS" : "FAIL", "bots produced no email");
const m = mailbox[0];
console.log("mail 1:", m.auth, m.body.to, m.body.reply_to, "|", m.body.subject, "|", JSON.stringify(m.body.text.slice(0, 90)));
console.log("mail 2:", mailbox[1].body.subject, mailbox[1].body.reply_to);
const inj = await post(3102, { ...good, name: "Evil\r\nBcc: x@y.z", elapsed: 5000 });
console.log("header-injection subject:", JSON.stringify(mailbox.at(-1)?.body.subject), inj.status);
// rate limit: 5 per window per client; 5 sent so far above (2 mails + 2 bot + 1 inj) -> next one is blocked
show("rate limit -> 429", await post(3102, good), 429);
s.kill(); mock.close();
