AI autonomous penetration testing system. Multi-agent LLM.
PenX is a multi-agent system for autonomous penetration testing in an isolated lab: a planner and workers share an asset graph and an exploration graph, with human-in-the-loop approval and full traffic recording. It ships as one binary or a Docker Compose stack.

## Languages / Diller (English · Türkçe)

This fork adds a complete English/Turkish interface. English is the default.

- **UI language**: *System Settings → Language*, or the language switcher in the sidebar footer. The choice applies immediately and is remembered on the device (`locale` cookie).
- **API messages**: the web UI sends the selected language as `Accept-Language`; the backend returns error messages in that language (`en` / `tr`, English fallback).
- **Reports** (Markdown/CSV exports) follow the language of the request that generates them.
- **Outgoing notifications** (Telegram, e-mail, webhooks…) are generated without a browser request, so they use the server-wide language set by the `ARTEX_LANG` environment variable (`en` default, or `tr`).
- Not translated by design: internal server logs, data stored by users/agents, and the license/terms legal text (the Terms of Use dialog is a verbatim translation — have it reviewed before relying on it).

Adding a language: add a catalog in `web/src/lib/i18n/messages/` (the Turkish catalog is type-checked against the English keys) and in `i18n/` (Go; `go test ./i18n/...` checks that catalogs are complete).

## Build and run from source with Docker Compose

```powershell
Copy-Item .env.example .env        # then set POSTGRES_PASSWORD (and optionally ARTEX_LANG=tr)
docker compose -f docker-compose.yml -f docker-compose.local.yml up -d --build
# UI: http://localhost:8787
```

`Dockerfile.local` builds the Next.js static export and the Go binary inside Docker, so no local Node/Go install is needed. The stock `docker-compose.yml` alone still pulls the upstream `tomicdd/artex` image, which has no Turkish UI.

Local development: `cd web && npm ci && npm run dev` (frontend), `go build -tags embedui ./cmd/artex` after `NEXT_EXPORT=1 npm run build:static` and copying `web/out` to `server/webui/dist` (or run `./build.sh`).

Checks: `cd web && npx tsc --noEmit && npx biome check src`, `go vet ./... && go test ./server/... ./i18n/...`.

> Use only against systems you own or are explicitly authorized to test.
