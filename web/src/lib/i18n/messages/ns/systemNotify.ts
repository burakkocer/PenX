// Namespace "systemNotify": keys must start with "systemNotify.".
// Rich-text values may use **bold** and `code` markers (rendered by the settings page).
export const en = {
  // ---- notify page ----
  "systemNotify.title": "Notifications",
  "systemNotify.subtitle":
    "Push findings to DingTalk / Feishu / WeCom and more · each channel has its own timing and filter rules",
  "systemNotify.masterSwitch": "Master switch",
  "systemNotify.masterSwitchAria": "Notification master switch",
  "systemNotify.statChannels": "Channels",
  "systemNotify.statChannelsHint": "Enabled / total",
  "systemNotify.statSentToday": "Delivered today",
  "systemNotify.statPending": "Pending",
  "systemNotify.statFailed": "Failed",
  "systemNotify.statBacklog": "Oldest backlog",
  "systemNotify.backlogStuck": "Delivery may be stuck",
  "systemNotify.globalSettings": "Global settings",
  "systemNotify.baseUrl": "Link-back URL",
  "systemNotify.baseUrlHelp":
    "Address the 'View details' button in messages points to. Leave empty to omit the button.",
  "systemNotify.digestPeriod": "Digest interval (minutes)",
  "systemNotify.digestHelp": "Only applies to channels in digest mode.",
  "systemNotify.saveGlobal": "Save global settings",
  "systemNotify.tabChannels": "Channels",
  "systemNotify.tabDeliveries": "Deliveries",
  "systemNotify.addChannel": "Add channel",
  "systemNotify.enable": "Enable",
  "systemNotify.modeDigest": "Digest",
  "systemNotify.modeRealtime": "Realtime",
  "systemNotify.addTitle": "Add notification channel",
  "systemNotify.defaultRate": " · Default rate limit {n} msg/min",
  "systemNotify.noRateLimit": " · No rate limit",
  "systemNotify.channelType": "Channel type",
  "systemNotify.kindLocked":
    "The channel type cannot be changed (a new type means new credentials). Create a new channel instead.",
  "systemNotify.channelName": "Channel name",
  "systemNotify.channelNamePlaceholder": "Incident response group / Daily digest group",
  "systemNotify.formMissing":
    "No form is defined for this channel (CHANNEL_FIELDS entry missing in the frontend). Add it and try again.",
  "systemNotify.timing": "Delivery timing",
  "systemNotify.timingRealtime": "Realtime · one message per finding",
  "systemNotify.timingDigest": "Digest · merged into one message per interval",
  "systemNotify.timingHelp":
    "For 'high severity in realtime, the rest as a digest', create two channels: one realtime with a high severity threshold, one digest with no threshold.",
  "systemNotify.rateLimit": "Rate limit (msg/min)",
  "systemNotify.rateUnlimitedPlaceholder": "0 = unlimited",
  "systemNotify.rateHelp":
    "Leave empty to use the channel default; 0 means no limit. Messages over the limit are delayed, never dropped.",
  "systemNotify.filterTitle": "Filter rules (leave empty for no filtering)",
  "systemNotify.minSeverity": "Minimum severity",
  "systemNotify.includeTypes": "Only push these finding types",
  "systemNotify.includePlaceholder": "SQL injection\nCommand execution",
  "systemNotify.includeHelp": "One keyword per line, case-insensitive substring match. Empty = all types.",
  "systemNotify.excludeTypes": "Exclude these finding types",
  "systemNotify.excludePlaceholder": "Information disclosure",
  "systemNotify.excludeHelp": "Exclusion wins over inclusion: a finding matching both is excluded.",
  "systemNotify.taskIds": "Limit to task IDs",
  "systemNotify.assetIds": "Limit to asset IDs",
  "systemNotify.idsHelp": "Empty tasks/assets = no limit; when set, the finding must overlap with them.",
  "systemNotify.statusChangeAria": "Receive status changes",
  "systemNotify.statusChangeLabel": "Also push when a finding's handling status changes (realtime mode only)",
  "systemNotify.enableChannel": "Enable this channel",
  "systemNotify.sendTest": "Send test message",
  "systemNotify.loadMetaFailed": "Failed to load notification settings: {error}",
  "systemNotify.loadChannelsFailed": "Failed to load channel list: {error}",
  "systemNotify.nameRequired": "Please enter a channel name",
  "systemNotify.channelAdded": "Channel added",
  "systemNotify.saveFailed": "Save failed: {error}",
  "systemNotify.testSent": "Test message sent ({ms} ms). Check the group to confirm.",
  "systemNotify.testFailed": "Test failed: {error}",
  "systemNotify.deletedNamed": "Deleted: {name}",
  "systemNotify.deleteFailed": "Delete failed: {error}",
  "systemNotify.opFailed": "Operation failed: {error}",
  "systemNotify.pushOn": "Notifications enabled",
  "systemNotify.pushPaused": "Notifications paused",

  // ---- channel kinds ----
  "systemNotify.kind.dingtalk": "DingTalk",
  "systemNotify.kind.feishu": "Feishu",
  "systemNotify.kind.wecom": "WeCom",
  "systemNotify.kind.webhook": "Generic Webhook",
  "systemNotify.kind.telegram": "Telegram",
  "systemNotify.kind.email": "Email",

  // ---- channel fields ----
  "systemNotify.field.webhookUrl": "Webhook URL",
  "systemNotify.field.signSecret": "Signing secret",
  "systemNotify.field.signSecretHelp":
    "Fill in when the bot's security setting is 'Sign'; leave empty for 'Custom keywords' or when security is off",
  "systemNotify.field.feishuSecret": "Signature verification secret",
  "systemNotify.field.feishuSecretHelp":
    "Fill in when the bot has 'Signature verification' enabled; otherwise leave empty",
  "systemNotify.field.targetUrl": "Target URL",
  "systemNotify.field.method": "HTTP method",
  "systemNotify.field.methodWithBody": "{method} (with body)",
  "systemNotify.field.methodNoBody": "{method} (no body)",
  "systemNotify.field.headers": "Custom headers",
  "systemNotify.field.headersHelp": "One KEY=VALUE per line, e.g. Authorization=Bearer xxx",
  "systemNotify.field.bodyTemplate": "Request body template",
  "systemNotify.field.bodyTemplateHelp":
    "Leave empty to use the built-in default template. Variables: {{.Title}} {{.Batch}} {{.Count}} {{.HomeURL}} {{.SentAt}}, " +
    "and under range .Items: .Name/.VulnClass/.Severity/.Summary/.Assets/.DetailURL/.StatusLabel. " +
    "Insert strings with {{json .Xxx}} rather than {{.Xxx}}, otherwise quotes in titles will break the JSON.",
  "systemNotify.field.apiUrl": "API URL",
  "systemNotify.field.apiUrlHelp":
    "Leave empty for the official address; fill in when using a self-hosted Bot API reverse proxy",
  "systemNotify.field.smtpHost": "SMTP server",
  "systemNotify.field.port": "Port",
  "systemNotify.field.portHelp": "587 uses STARTTLS; for 465 turn on 'Implicit TLS'",
  "systemNotify.field.username": "Username",
  "systemNotify.field.password": "Password / app password",
  "systemNotify.field.from": "Sender",
  "systemNotify.field.to": "Recipients",
  "systemNotify.field.toHelp": "Separate multiple addresses with commas",
  "systemNotify.field.tls": "Implicit TLS",
  "systemNotify.field.tlsHelp": "Turn on for port 465; keep off for 587 (STARTTLS is used automatically)",
  "systemNotify.sev.any": "Any",
  "systemNotify.sev.low": "Low and above",
  "systemNotify.sev.medium": "Medium and above",
  "systemNotify.sev.high": "High and above",
  "systemNotify.sev.critical": "Critical only",

  // ---- channel form / filter summary ----
  "systemNotify.savedMasked": "Saved · enter a new value to overwrite, or clear it to remove",
  "systemNotify.savedMaskedTail": "Saved (ending {tail}) · enter a new value to overwrite, or clear it to remove",
  "systemNotify.filter.types": "Types: {n} included",
  "systemNotify.filter.excluded": "Types excluded: {n}",
  "systemNotify.filter.tasks": "Tasks: {n}",
  "systemNotify.filter.assets": "Assets: {n}",
  "systemNotify.filter.statusChange": "Includes status changes",
  "systemNotify.filter.all": "All findings",

  // ---- stat tile ----
  "systemNotify.backlog.sec": "{n} s",
  "systemNotify.backlog.min": "{n} min",
  "systemNotify.backlog.hour": "{n} h",

  // ---- deliveries ----
  "systemNotify.deliveries.loadFailed": "Failed to load deliveries: {error}",
  "systemNotify.deliveries.requeued": "Re-queued",
  "systemNotify.deliveries.retryFailed": "Resend failed: {error}",
  "systemNotify.deliveries.allChannels": "All channels",
  "systemNotify.deliveries.allStates": "All statuses",
  "systemNotify.deliveries.total": "{n} total",
  "systemNotify.deliveries.colFinding": "Finding",
  "systemNotify.deliveries.colChannel": "Channel",
  "systemNotify.deliveries.colAttempts": "Attempts",
  "systemNotify.deliveries.colError": "Error",
  "systemNotify.deliveries.empty": "No deliveries yet",
  "systemNotify.deliveries.untitled": "(untitled)",
  "systemNotify.deliveries.statusChanged": "Status change",
  "systemNotify.deliveries.resend": "Resend",

  // ---- settings page ----
  "systemNotify.settings.title": "System settings",
  "systemNotify.settings.subtitle": "Global runtime switches",
  "systemNotify.settings.trafficTitle": "Traffic capture",
  "systemNotify.settings.trafficDesc":
    "When on, all Agent HTTP traffic goes through the recording proxy and is stored in full, and the traffic_search / traffic_get tools and proxy settings are injected into Agents (the prompt includes proxy instructions).\n" +
    "When off (default), no traffic is recorded: Agents **do not** get the proxy settings or traffic tools, and prompts **do not** contain any proxy-related content. Switching rebuilds Agents immediately.",
  "systemNotify.settings.trafficOn": "On · recording traffic and injecting the proxy",
  "systemNotify.settings.trafficOff": "Off · not recording, not injecting the proxy",
  "systemNotify.settings.bindTitle": "Auto-bind traffic to findings",
  "systemNotify.settings.bindDesc":
    "Off by default. When on, the report Agent triggered when a finding is stored checks existing HTTP requests/responses and links the matching traffic before writing the report. **Reading packets and the extra tool calls increase token usage.**\n" +
    "Findings can still be reported for TCP, uncaptured traffic, or when no traffic matches. This switch does not affect traffic capture, manual binding, or viewing saved evidence. Takes effect from the next Agent round; turning it off rejects new auto-binding immediately.",
  "systemNotify.settings.bindOn": "On · increases token usage",
  "systemNotify.settings.bindOff": "Off · manual binding still available",
  "systemNotify.settings.bindToastOn": "Agent auto-binding of traffic enabled",
  "systemNotify.settings.bindToastOff": "Agent auto-binding of traffic disabled",
  "systemNotify.settings.gpTitle": "Global proxy",
  "systemNotify.settings.gpDesc":
    "All Agent **target traffic** leaves through this proxy (hide the source IP / use a jump host). Supports **http / https / socks5**, with optional `user:pass` auth. Empty = direct.\n" +
    "With **traffic capture** on, it is the **upstream** of the recording proxy (traffic is still stored in full, then leaves through this proxy); with capture off, it is injected directly into the Agent's bash / WebFetch egress. Independent of the web search proxy and the LLM proxy.\n" +
    "**Note**: with capture **off**, socks5 relies on each CLI tool honoring `ALL_PROXY` (curl does, some tools may ignore it). If you mainly use socks5, enabling traffic capture is recommended: in that path the MITM dials itself, so tools are unaware and it works reliably.",
  "systemNotify.settings.gpLabel": "Proxy address",
  "systemNotify.settings.gpPlaceholder": "socks5://user:pass@host:1080 or http://host:port (empty = direct)",
  "systemNotify.settings.gpOn": "Configured · all target traffic leaves through this proxy",
  "systemNotify.settings.gpOff": "Not configured · target traffic goes out directly",
  "systemNotify.settings.gpSaved": "Global proxy saved",
  "systemNotify.settings.gpCleared": "Global proxy cleared (direct connection)",
  "systemNotify.settings.injTitle": "Operation constraint injection",
  "systemNotify.settings.injDesc":
    "When on, each task's **operation constraints** (allow/deny entries maintained in the task overview under 'Operation constraints') are added to the matching Agent's system prompt to bound exploration (e.g. 'only test the current port', 'no brute force').\n" +
    "You can control injection into the **planner** and the **worker** separately; both are on by default. Changes apply immediately (read on the next round), no Agent rebuild needed. When off, that Agent no longer sees the constraints.",
  "systemNotify.settings.injPlanner": "Inject into planner",
  "systemNotify.settings.injWorker": "Inject into worker",
  "systemNotify.settings.expTitle": "Experimental features",
  "systemNotify.settings.expDesc":
    "Mechanisms still being validated, off by default. They may change Agent behavior or affect stability; enable only if you understand the impact.\n" +
    "**noa context compaction**: the model proactively compacts long conversation history (norma v0.4.0). When on, the four Agent types integrated by the platform (**planner / worker / main Agent / chat**) let noa manage context instead of the built-in compaction, and the original text is archived in the task workspace for traceability. Changes apply immediately (to runs started afterwards), no Agent rebuild needed; turning it off restores the built-in compaction immediately.",
  "systemNotify.settings.noaLabel": "noa context compaction",
  "systemNotify.settings.noaToastOn": "noa context compaction enabled (applies to runs started afterwards)",
  "systemNotify.settings.noaToastOff": "noa context compaction disabled (built-in compaction restored)",
  "systemNotify.settings.wsTitle": "Web search",
  "systemNotify.settings.wsDesc":
    "This is the **master switch + source configuration** for web search. Only when it is on can you enable **web_search** individually in **each Agent's settings** (it returns titles/links/snippets only and does not fetch page bodies; fetching is done by WebFetch). Web search **does not** go through the recording proxy and is independent of traffic capture.\n" +
    "Sources: **DuckDuckGo (ddgs)** (no key), **Brave (free tier)** (needs a Brave API Key), **Tavily** (needs a Tavily API Key), or **DeepSeek** (reuses the current LLM profile). When the master switch is off, each Agent's web search toggle is unavailable.",
  "systemNotify.settings.wsOn": "Master switch on · can be enabled per Agent in its settings",
  "systemNotify.settings.wsOff": "Off · Agents cannot enable web search",
  "systemNotify.settings.wsSource": "Search source",
  "systemNotify.settings.wsSourcePlaceholder": "Select a source",
  "systemNotify.settings.srcDdgs": "DuckDuckGo (ddgs · free, no key)",
  "systemNotify.settings.srcBrave": "Brave (free tier · key required)",
  "systemNotify.settings.srcTavily": "Tavily (key required)",
  "systemNotify.settings.srcDeepseek": "DeepSeek (official)",
  "systemNotify.settings.dsTitle": "DeepSeek official web search",
  "systemNotify.settings.dsP1":
    "This source reuses the **currently active LLM profile**. It therefore **only supports official DeepSeek models**, and the profile **must use the anthropic protocol** — DeepSeek's OpenAI-protocol endpoint does not support server-side search. Switching the LLM profile may break this source.",
  "systemNotify.settings.dsP2":
    "Unlike other sources, the search is **executed server-side by DeepSeek**: each search costs an extra model call (token fees), the request **does not go through the egress proxy above**, and is **not recorded in traffic logs**; results contain **only titles and links** (no snippets), and WebFetch fetches the body when needed.",
  "systemNotify.settings.dsP3":
    "You are responsible for confirming these conditions; the system does not block. Use the 'Test search' button below to run a real search to verify.",
  "systemNotify.settings.keyConfigured": "Configured",
  "systemNotify.settings.braveKeyPlaceholderSet": "Configured (leave empty to keep)",
  "systemNotify.settings.braveKeyPlaceholderNew": "Enter Brave API Key",
  "systemNotify.settings.braveNeedsKey":
    "Brave is selected but no key is configured — the search tool stays disabled until a key is saved.",
  "systemNotify.settings.braveQuota":
    "The free tier allows about 2,000 requests/month. Get a key at https://brave.com/search/api/.",
  "systemNotify.settings.tavilyKeyPlaceholderSet": "Configured (leave empty to keep)",
  "systemNotify.settings.tavilyKeyPlaceholderNew": "Enter Tavily API Key (tvly-…)",
  "systemNotify.settings.tavilyNeedsKey":
    "Tavily is selected but no key is configured — the search tool stays disabled until a key is saved.",
  "systemNotify.settings.tavilyHint": "Sign up at https://tavily.com to get an API Key.",
  "systemNotify.settings.proxyLabel": "Egress proxy (optional)",
  "systemNotify.settings.proxyPlaceholder": "http://host:port or socks5://host:port (empty = direct)",
  "systemNotify.settings.proxyHelp":
    "A separate egress proxy used only to reach the search endpoint (VPN/SOCKS etc.). Unrelated to the MITM proxy that records traffic; used when the network is unreachable otherwise.",
  "systemNotify.settings.testHint":
    "Run one real search for 'test' with the current settings (source + proxy + key) to verify it works.",
  "systemNotify.settings.testing": "Testing…",
  "systemNotify.settings.testBtn": "Test search",
  "systemNotify.settings.searchSaved": "Web search settings saved",
  "systemNotify.settings.braveSaved": "Brave API Key saved",
  "systemNotify.settings.tavilySaved": "Tavily API Key saved",
  "systemNotify.settings.proxySaved": "Egress proxy saved",
  "systemNotify.settings.proxyCleared": "Egress proxy cleared (direct connection)",
  "systemNotify.settings.testOk": "Search test succeeded · {backend} returned {count} results",
  "systemNotify.settings.testFail": "Search test failed: {error}",
  "systemNotify.settings.unknownError": "Unknown error",
  "systemNotify.settings.saveFailed": "Save failed: {error}",
  "systemNotify.settings.pyTitle": "Custom scripts · Python interpreter",
  "systemNotify.settings.pyDesc":
    "Custom **script** tools use this to run Python. It is auto-detected at startup (python3 preferred); you can enter an absolute path to a venv / specific version here, or leave empty to auto-detect at runtime.",
  "systemNotify.settings.pyPlaceholder": "/usr/bin/python3 (empty = auto-detect)",
  "systemNotify.settings.pyRedetect": "Re-detect",
  "systemNotify.settings.pySaved": "Python interpreter settings saved",
  "systemNotify.settings.wkTitle": "Concurrency · number of worker Agents",
  "systemNotify.settings.wkDesc":
    "Number of worker Agents running concurrently per task (default 3). Higher values probe more in parallel and cost more. **Applies to tasks started afterwards**; running tasks are unaffected.",
  "systemNotify.settings.wkInvalid": "Concurrency must be an integer greater than 0",
  "systemNotify.settings.wkSaved": "Worker Agent count saved (applies to tasks started afterwards)",
  "systemNotify.settings.sendTitle": "Chat input send key",
  "systemNotify.settings.sendDesc":
    "Shared by the chat page and the main Agent session input in task details; takes effect immediately, no save needed.\n" +
    "This preference is **stored only in this browser**, is not synced with your account, and must be set again after switching browsers or clearing site data.",
  "systemNotify.settings.sendLabel": "Send mode",

  // ---- update card ----
  "systemNotify.update.checkFailed": "Update check failed: {error}",
  "systemNotify.update.found": "New version {version} found",
  "systemNotify.update.upToDateToast": "You are on the latest version",
  "systemNotify.update.updatedReload": "Updated to {version}, reloading the page",
  "systemNotify.update.restartTimeout":
    "Timed out waiting for the service to restart. Check the backend logs, or confirm artex was started via start.sh / start.bat.",
  "systemNotify.update.failed": "Update failed: {error}",
  "systemNotify.update.confirm": "Update to {version}?\n\n",
  "systemNotify.update.confirmRestart": "The update restarts the program and interrupts running tasks.\n",
  "systemNotify.update.confirmDocker":
    "\nNote: updating inside a container only replaces the program itself; it does not update the playwright / nmap etc. toolchain in the image. If the new version needs newer tools, use docker compose pull instead.",
  "systemNotify.update.preparing": "Preparing…",
  "systemNotify.update.startFailed": "Failed to start update: {error}",
  "systemNotify.update.rollbackConfirm":
    "Roll back to the previous version?\n\nThe program will restart and running tasks will be interrupted.\nNote: the database schema is not rolled back; the old version may not understand data written by the new one.",
  "systemNotify.update.rolledBack": "Switched to the previous version, restarting…",
  "systemNotify.update.rollbackFailed": "Rollback failed: {error}",
  "systemNotify.update.title": "Version and updates",
  "systemNotify.update.description":
    "Check for and install new versions from GitHub. Updating restarts the program and interrupts running tasks.",
  "systemNotify.update.current": "Current version",
  "systemNotify.update.standalone": "Standalone",
  "systemNotify.update.latest": "Latest version",
  "systemNotify.update.changelog": "Changelog",
  "systemNotify.update.githubError": "Cannot reach GitHub: {error}",
  "systemNotify.update.githubErrorHint": "You can configure the global proxy above and retry.",
  "systemNotify.update.noAsset":
    "{latest} has no release package for {platform} (missing {asset}); automatic update is not possible.",
  "systemNotify.update.willDownload": "Will download",
  "systemNotify.update.willDownloadTail":
    ", verify SHA256 and run a smoke test before replacing; on failure the current version is kept.",
  "systemNotify.update.upToDate": "You are on the latest version.",
  "systemNotify.update.dockerNote1":
    "Updating under Docker only replaces the program itself, not the playwright / nmap etc. toolchain in the image, and after",
  "systemNotify.update.dockerNote2":
    "recreates the container it falls back to the version bundled in the image. To upgrade the image as well, run",
  "systemNotify.update.restarting":
    "Restarting and applying the new version, please wait (the page will refresh automatically)…",
  "systemNotify.update.checkBtn": "Check for updates",
  "systemNotify.update.updateTo": "Update to {version}",
  "systemNotify.update.updateNow": "Update now",
  "systemNotify.update.rollbackBtn": "Roll back to previous version",
  "systemNotify.update.guardNote1":
    "One-click update relies on the guard script to restart the program. Start ARTEX via",
  "systemNotify.update.guardNote2": "(on Windows",
  "systemNotify.update.guardNote3":
    "); if you run the artex binary directly, it will not be relaunched after it exits.",
} satisfies Record<string, string>;

export const tr: Record<keyof typeof en, string> = {
  // ---- notify page ----
  "systemNotify.title": "Bildirimler",
  "systemNotify.subtitle":
    "Bulguları DingTalk / Feishu / WeCom gibi kanallara gönderin · her kanalın kendi gönderim zamanlaması ve filtre kuralları vardır",
  "systemNotify.masterSwitch": "Ana anahtar",
  "systemNotify.masterSwitchAria": "Bildirim ana anahtarı",
  "systemNotify.statChannels": "Kanallar",
  "systemNotify.statChannelsHint": "Etkin / toplam",
  "systemNotify.statSentToday": "Bugün iletilen",
  "systemNotify.statPending": "Bekleyen",
  "systemNotify.statFailed": "Başarısız",
  "systemNotify.statBacklog": "En eski bekleyen",
  "systemNotify.backlogStuck": "Gönderim takılmış olabilir",
  "systemNotify.globalSettings": "Genel ayarlar",
  "systemNotify.baseUrl": "Geri bağlantı adresi",
  "systemNotify.baseUrlHelp":
    "Mesajlardaki 'Ayrıntıları gör' düğmesinin işaret ettiği adres. Boş bırakılırsa düğme eklenmez.",
  "systemNotify.digestPeriod": "Özet aralığı (dakika)",
  "systemNotify.digestHelp": "Yalnızca özet modundaki kanallar için geçerlidir.",
  "systemNotify.saveGlobal": "Genel ayarları kaydet",
  "systemNotify.tabChannels": "Kanallar",
  "systemNotify.tabDeliveries": "Gönderim kayıtları",
  "systemNotify.addChannel": "Kanal ekle",
  "systemNotify.enable": "Etkinleştir",
  "systemNotify.modeDigest": "Özet",
  "systemNotify.modeRealtime": "Gerçek zamanlı",
  "systemNotify.addTitle": "Bildirim kanalı ekle",
  "systemNotify.defaultRate": " · Varsayılan hız sınırı: dakikada {n} mesaj",
  "systemNotify.noRateLimit": " · Hız sınırı yok",
  "systemNotify.channelType": "Kanal türü",
  "systemNotify.kindLocked":
    "Kanal türü değiştirilemez (tür değişirse kimlik bilgileri de değişir). Lütfen yeni bir kanal oluşturun.",
  "systemNotify.channelName": "Kanal adı",
  "systemNotify.channelNamePlaceholder": "Olay müdahale grubu / Günlük bildirim grubu",
  "systemNotify.formMissing":
    "Bu kanal için form tanımlı değil (ön yüzde CHANNEL_FIELDS girdisi eksik). Lütfen ekleyip tekrar deneyin.",
  "systemNotify.timing": "Gönderim zamanlaması",
  "systemNotify.timingRealtime": "Gerçek zamanlı · her bulgu için ayrı mesaj",
  "systemNotify.timingDigest": "Özet · her aralıkta tek mesajda birleştirilir",
  "systemNotify.timingHelp":
    "'Yüksek önem derecesi gerçek zamanlı, gerisi özet' için iki kanal oluşturun: biri gerçek zamanlı ve yüksek eşikli, diğeri özet ve eşiksiz.",
  "systemNotify.rateLimit": "Hız sınırı (mesaj/dk)",
  "systemNotify.rateUnlimitedPlaceholder": "0 = sınırsız",
  "systemNotify.rateHelp":
    "Kanal varsayılanı için boş bırakın; 0 sınır yok demektir. Sınırı aşan mesajlar kaybolmaz, yalnızca ertelenir.",
  "systemNotify.filterTitle": "Filtre kuralları (boş bırakılırsa filtre uygulanmaz)",
  "systemNotify.minSeverity": "En düşük önem derecesi",
  "systemNotify.includeTypes": "Yalnızca bu bulgu türlerini gönder",
  "systemNotify.includePlaceholder": "SQL enjeksiyonu\nKomut yürütme",
  "systemNotify.includeHelp":
    "Her satıra bir anahtar kelime; büyük/küçük harf duyarsız alt dize eşleşmesi. Boş = tüm türler.",
  "systemNotify.excludeTypes": "Bu bulgu türlerini hariç tut",
  "systemNotify.excludePlaceholder": "Bilgi sızıntısı",
  "systemNotify.excludeHelp": "Hariç tutma, dahil etmeden önceliklidir: ikisiyle de eşleşen bulgu hariç tutulur.",
  "systemNotify.taskIds": "Görev kimlikleriyle sınırla",
  "systemNotify.assetIds": "Varlık kimlikleriyle sınırla",
  "systemNotify.idsHelp": "Görev/varlık boşsa sınır yok; doldurulursa bulgunun bunlarla kesişmesi gerekir.",
  "systemNotify.statusChangeAria": "Durum değişikliklerini al",
  "systemNotify.statusChangeLabel": "Bulgunun işlem durumu değiştiğinde de gönder (yalnızca gerçek zamanlı mod)",
  "systemNotify.enableChannel": "Bu kanalı etkinleştir",
  "systemNotify.sendTest": "Test mesajı gönder",
  "systemNotify.loadMetaFailed": "Bildirim ayarları okunamadı: {error}",
  "systemNotify.loadChannelsFailed": "Kanal listesi okunamadı: {error}",
  "systemNotify.nameRequired": "Lütfen kanal adını girin",
  "systemNotify.channelAdded": "Kanal eklendi",
  "systemNotify.saveFailed": "Kaydedilemedi: {error}",
  "systemNotify.testSent": "Test mesajı gönderildi ({ms} ms). Lütfen grupta doğrulayın.",
  "systemNotify.testFailed": "Test başarısız: {error}",
  "systemNotify.deletedNamed": "Silindi: {name}",
  "systemNotify.deleteFailed": "Silinemedi: {error}",
  "systemNotify.opFailed": "İşlem başarısız: {error}",
  "systemNotify.pushOn": "Bildirimler açıldı",
  "systemNotify.pushPaused": "Bildirimler duraklatıldı",

  // ---- channel kinds ----
  "systemNotify.kind.dingtalk": "DingTalk",
  "systemNotify.kind.feishu": "Feishu",
  "systemNotify.kind.wecom": "WeCom",
  "systemNotify.kind.webhook": "Genel Webhook",
  "systemNotify.kind.telegram": "Telegram",
  "systemNotify.kind.email": "E-posta",

  // ---- channel fields ----
  "systemNotify.field.webhookUrl": "Webhook adresi",
  "systemNotify.field.signSecret": "İmza anahtarı",
  "systemNotify.field.signSecretHelp":
    "Botun güvenlik ayarı 'İmza' ise doldurun; 'Özel anahtar kelime' veya güvenlik kapalıysa boş bırakın",
  "systemNotify.field.feishuSecret": "İmza doğrulama anahtarı",
  "systemNotify.field.feishuSecretHelp": "Botta 'İmza doğrulama' açıksa doldurun, aksi halde boş bırakın",
  "systemNotify.field.targetUrl": "Hedef URL",
  "systemNotify.field.method": "İstek yöntemi",
  "systemNotify.field.methodWithBody": "{method} (gövdeli)",
  "systemNotify.field.methodNoBody": "{method} (gövdesiz)",
  "systemNotify.field.headers": "Özel istek başlıkları",
  "systemNotify.field.headersHelp": "Her satıra bir ANAHTAR=DEĞER, örn. Authorization=Bearer xxx",
  "systemNotify.field.bodyTemplate": "İstek gövdesi şablonu",
  "systemNotify.field.bodyTemplateHelp":
    "Yerleşik varsayılan şablon için boş bırakın. Değişkenler: {{.Title}} {{.Batch}} {{.Count}} {{.HomeURL}} {{.SentAt}}, " +
    "ve range .Items altında .Name/.VulnClass/.Severity/.Summary/.Assets/.DetailURL/.StatusLabel. " +
    "Metin eklerken {{.Xxx}} yerine {{json .Xxx}} kullanın; aksi halde başlıktaki tırnaklar JSON'u bozar.",
  "systemNotify.field.apiUrl": "API adresi",
  "systemNotify.field.apiUrlHelp":
    "Resmi adres için boş bırakın; kendi barındırdığınız Bot API ters vekilini kullanıyorsanız doldurun",
  "systemNotify.field.smtpHost": "SMTP sunucusu",
  "systemNotify.field.port": "Bağlantı noktası",
  "systemNotify.field.portHelp": "587 STARTTLS kullanır; 465 için 'Örtük TLS'yi açın",
  "systemNotify.field.username": "Kullanıcı adı",
  "systemNotify.field.password": "Parola / uygulama parolası",
  "systemNotify.field.from": "Gönderen",
  "systemNotify.field.to": "Alıcılar",
  "systemNotify.field.toHelp": "Birden fazla adresi virgülle ayırın",
  "systemNotify.field.tls": "Örtük TLS",
  "systemNotify.field.tlsHelp":
    "465 numaralı bağlantı noktası için açın; 587 için kapalı tutun (STARTTLS otomatik kullanılır)",
  "systemNotify.sev.any": "Sınırsız",
  "systemNotify.sev.low": "Düşük ve üzeri",
  "systemNotify.sev.medium": "Orta ve üzeri",
  "systemNotify.sev.high": "Yüksek ve üzeri",
  "systemNotify.sev.critical": "Yalnızca kritik",

  // ---- channel form / filter summary ----
  "systemNotify.savedMasked": "Kaydedildi · üzerine yazmak için yeni değer girin, kaldırmak için boşaltın",
  "systemNotify.savedMaskedTail":
    "Kaydedildi (sonu {tail}) · üzerine yazmak için yeni değer girin, kaldırmak için boşaltın",
  "systemNotify.filter.types": "Türler: {n} dahil",
  "systemNotify.filter.excluded": "Hariç tutulan tür: {n}",
  "systemNotify.filter.tasks": "Görevler: {n}",
  "systemNotify.filter.assets": "Varlıklar: {n}",
  "systemNotify.filter.statusChange": "Durum değişikliklerini içerir",
  "systemNotify.filter.all": "Tüm bulgular",

  // ---- stat tile ----
  "systemNotify.backlog.sec": "{n} sn",
  "systemNotify.backlog.min": "{n} dk",
  "systemNotify.backlog.hour": "{n} sa",

  // ---- deliveries ----
  "systemNotify.deliveries.loadFailed": "Gönderim kayıtları okunamadı: {error}",
  "systemNotify.deliveries.requeued": "Yeniden kuyruğa alındı",
  "systemNotify.deliveries.retryFailed": "Yeniden gönderilemedi: {error}",
  "systemNotify.deliveries.allChannels": "Tüm kanallar",
  "systemNotify.deliveries.allStates": "Tüm durumlar",
  "systemNotify.deliveries.total": "Toplam {n}",
  "systemNotify.deliveries.colFinding": "Bulgu",
  "systemNotify.deliveries.colChannel": "Kanal",
  "systemNotify.deliveries.colAttempts": "Deneme",
  "systemNotify.deliveries.colError": "Hata",
  "systemNotify.deliveries.empty": "Henüz gönderim kaydı yok",
  "systemNotify.deliveries.untitled": "(başlıksız)",
  "systemNotify.deliveries.statusChanged": "Durum değişikliği",
  "systemNotify.deliveries.resend": "Yeniden gönder",

  // ---- settings page ----
  "systemNotify.settings.title": "Sistem ayarları",
  "systemNotify.settings.subtitle": "Genel çalışma zamanı anahtarları",
  "systemNotify.settings.trafficTitle": "Trafik yakalama",
  "systemNotify.settings.trafficDesc":
    "Açıkken tüm Ajanların HTTP trafiği kayıt vekilinden geçerek eksiksiz kaydedilir ve Ajanlara traffic_search / traffic_get araçları ile vekil yapılandırması eklenir (istem vekil açıklamasını içerir).\n" +
    "Kapalıyken (varsayılan) hiçbir trafik kaydedilmez: Ajanlar vekil yapılandırmasını ve trafik araçlarını **almaz**, istemler vekille ilgili hiçbir içerik **barındırmaz**. Değiştirdiğinizde Ajanlar anında yeniden oluşturulur.",
  "systemNotify.settings.trafficOn": "Açık · trafik kaydediliyor ve vekil ekleniyor",
  "systemNotify.settings.trafficOff": "Kapalı · kayıt yok, vekil eklenmiyor",
  "systemNotify.settings.bindTitle": "Ajan trafiği otomatik bağlasın",
  "systemNotify.settings.bindDesc":
    "Varsayılan olarak kapalıdır. Açıldığında, bir bulgu kaydedilince tetiklenen rapor Ajanı raporu yazmadan önce mevcut HTTP istek/yanıtlarını kontrol eder ve eşleşen trafiği ilişkilendirir. **Paketleri incelemek ve ek araç çağrıları Token tüketimini artırır.**\n" +
    "TCP, yakalanmamış trafik veya eşleşen trafik yoksa bulgu yine de bildirilebilir. Bu anahtar trafik yakalamayı, elle bağlamayı ve kayıtlı kanıtların görüntülenmesini etkilemez. Bir sonraki Ajan turundan itibaren geçerlidir; kapatıldığında yeni otomatik bağlamalar hemen reddedilir.",
  "systemNotify.settings.bindOn": "Açık · Token tüketimini artırır",
  "systemNotify.settings.bindOff": "Kapalı · elle bağlama sürer",
  "systemNotify.settings.bindToastOn": "Ajan trafiği otomatik bağlama açıldı",
  "systemNotify.settings.bindToastOff": "Ajan trafiği otomatik bağlama kapatıldı",
  "systemNotify.settings.gpTitle": "Genel vekil",
  "systemNotify.settings.gpDesc":
    "Tüm Ajanların **hedef trafiği** bu vekil üzerinden çıkar (kaynak IP'yi gizler / atlama sunucusu kullanır). **http / https / socks5** desteklenir, `user:pass` kimlik doğrulaması eklenebilir. Boş = doğrudan bağlantı.\n" +
    "**Trafik yakalama** açıkken kayıt vekilinin **üst akışı** olur (trafik yine eksiksiz kaydedilir, sonra bu vekil üzerinden çıkar); yakalama kapalıyken doğrudan Ajanın bash / WebFetch çıkışına eklenir. Web arama vekili ve LLM vekilinden bağımsızdır.\n" +
    "**Not**: yakalama **kapalıyken** socks5, komut satırı araçlarının `ALL_PROXY` desteğine bağlıdır (curl destekler, bazı araçlar yok sayabilir). Ağırlıklı olarak socks5 kullanıyorsanız trafik yakalamayı açmanız önerilir: bu yolda MITM bağlantıyı kendisi kurar, araçlar fark etmez ve kararlı çalışır.",
  "systemNotify.settings.gpLabel": "Vekil adresi",
  "systemNotify.settings.gpPlaceholder": "socks5://user:pass@host:1080 veya http://host:port (boş = doğrudan)",
  "systemNotify.settings.gpOn": "Yapılandırıldı · tüm hedef trafiği bu vekil üzerinden çıkar",
  "systemNotify.settings.gpOff": "Yapılandırılmadı · hedef trafiği doğrudan çıkar",
  "systemNotify.settings.gpSaved": "Genel vekil kaydedildi",
  "systemNotify.settings.gpCleared": "Genel vekil temizlendi (doğrudan bağlantı)",
  "systemNotify.settings.injTitle": "İşlem kısıtlarını ekleme",
  "systemNotify.settings.injDesc":
    "Açıldığında her görevin **işlem kısıtları** (görev özetindeki 'İşlem kısıtları' bölümünde tutulan allow/deny girdileri) ilgili Ajanın sistem istemine eklenir ve keşif sınırlarını belirler (örn. 'yalnızca geçerli bağlantı noktasını test et', 'kaba kuvvet yasak').\n" +
    "**Planlayıcıya (planner)** ve **yürütücüye (worker)** ayrı ayrı eklenebilir; varsayılan olarak ikisi de açıktır. Değişiklik anında geçerli olur (sonraki turda okunur), Ajanı yeniden oluşturmak gerekmez. Kapatıldığında ilgili Ajan kısıtları artık görmez.",
  "systemNotify.settings.injPlanner": "Planlayıcıya (planner) ekle",
  "systemNotify.settings.injWorker": "Yürütücüye (worker) ekle",
  "systemNotify.settings.expTitle": "Deneysel özellikler",
  "systemNotify.settings.expDesc":
    "Hâlâ doğrulanmakta olan mekanizmalar; varsayılan olarak kapalıdır. Ajan davranışını değiştirebilir veya kararlılığı etkileyebilir, etkisini anladıktan sonra etkinleştirin.\n" +
    "**noa bağlam sıkıştırma**: model uzun konuşma geçmişini kendisi sıkıştırır (norma v0.4.0). Açıldığında platformun bağladığı dört Ajan türü (**planlayıcı / yürütücü / ana Ajan / sohbet**) yerleşik sıkıştırma yerine bağlamı noa'ya bırakır; sıkıştırılan özgün metin izlenebilirlik için görev çalışma dizinine arşivlenir. Değişiklik anında geçerli olur (sonradan başlayan çalıştırmalar için), Ajanı yeniden oluşturmak gerekmez; kapatıldığında yerleşik sıkıştırma hemen geri gelir.",
  "systemNotify.settings.noaLabel": "noa bağlam sıkıştırma",
  "systemNotify.settings.noaToastOn": "noa bağlam sıkıştırma açıldı (sonradan başlayan çalıştırmalar için geçerli)",
  "systemNotify.settings.noaToastOff": "noa bağlam sıkıştırma kapatıldı (yerleşik sıkıştırma geri yüklendi)",
  "systemNotify.settings.wsTitle": "Web arama",
  "systemNotify.settings.wsDesc":
    "Bu, web aramanın **ana anahtarı + kaynak yapılandırmasıdır**. Yalnızca açıkken **her Ajanın ayarlarında** **web_search** ayrı ayrı etkinleştirilebilir (yalnızca başlık/bağlantı/özet döndürür, sayfa gövdesini çekmez; çekme işini WebFetch yapar). Web arama kayıt vekilinden **geçmez**, trafik yakalamadan bağımsızdır.\n" +
    "Kaynaklar: **DuckDuckGo (ddgs)** (anahtar gerekmez), **Brave (ücretsiz sürüm)** (Brave API Key gerekir), **Tavily** (Tavily API Key gerekir) veya **DeepSeek** (geçerli LLM profilini yeniden kullanır). Ana anahtar kapalıyken Ajanların web arama anahtarı kullanılamaz.",
  "systemNotify.settings.wsOn": "Ana anahtar açık · her Ajanın ayarlarında ayrı ayrı etkinleştirilebilir",
  "systemNotify.settings.wsOff": "Kapalı · Ajanlar web aramayı etkinleştiremez",
  "systemNotify.settings.wsSource": "Arama kaynağı",
  "systemNotify.settings.wsSourcePlaceholder": "Kaynak seçin",
  "systemNotify.settings.srcDdgs": "DuckDuckGo (ddgs · ücretsiz, anahtarsız)",
  "systemNotify.settings.srcBrave": "Brave (ücretsiz sürüm · anahtar gerekir)",
  "systemNotify.settings.srcTavily": "Tavily (anahtar gerekir)",
  "systemNotify.settings.srcDeepseek": "DeepSeek (resmi)",
  "systemNotify.settings.dsTitle": "DeepSeek resmi web araması",
  "systemNotify.settings.dsP1":
    "Bu kaynak **şu an etkin olan LLM profilini** yeniden kullanır. Bu nedenle **yalnızca resmi DeepSeek modellerini** destekler ve profil **anthropic protokolünü kullanmalıdır**; DeepSeek'in OpenAI protokolü uç noktası sunucu tarafı aramayı desteklemez. LLM profili değiştirilirse bu kaynak çalışmayabilir.",
  "systemNotify.settings.dsP2":
    "Diğer kaynaklardan farklı olarak arama **DeepSeek sunucusunda yürütülür**: her arama ek bir model çağrısı tüketir (Token ücreti doğar), arama isteği **yukarıdaki çıkış vekilinden geçmez** ve **trafik kayıtlarına işlenmez**; sonuçlarda **yalnızca başlık ve bağlantı** bulunur (özet yok), gövde gerektiğinde WebFetch ile çekilir.",
  "systemNotify.settings.dsP3":
    "Yukarıdaki koşulların sağlandığını doğrulamak size aittir, sistem engellemez; doğrulamak için aşağıdaki 'Aramayı test et' düğmesiyle gerçek bir arama çalıştırabilirsiniz.",
  "systemNotify.settings.keyConfigured": "Yapılandırıldı",
  "systemNotify.settings.braveKeyPlaceholderSet": "Yapılandırıldı (değişmemesi için boş bırakın)",
  "systemNotify.settings.braveKeyPlaceholderNew": "Brave API Key girin",
  "systemNotify.settings.braveNeedsKey":
    "Brave seçildi ancak anahtar yapılandırılmadı — anahtar kaydedilene kadar arama aracı etkinleşmez.",
  "systemNotify.settings.braveQuota":
    "Ücretsiz sürümün kotası ayda yaklaşık 2.000 istektir. Anahtarı https://brave.com/search/api/ adresinden alın.",
  "systemNotify.settings.tavilyKeyPlaceholderSet": "Yapılandırıldı (değişmemesi için boş bırakın)",
  "systemNotify.settings.tavilyKeyPlaceholderNew": "Tavily API Key girin (tvly-…)",
  "systemNotify.settings.tavilyNeedsKey":
    "Tavily seçildi ancak anahtar yapılandırılmadı — anahtar kaydedilene kadar arama aracı etkinleşmez.",
  "systemNotify.settings.tavilyHint": "https://tavily.com adresinden kaydolup API Key alın.",
  "systemNotify.settings.proxyLabel": "Çıkış vekili (isteğe bağlı)",
  "systemNotify.settings.proxyPlaceholder": "http://host:port veya socks5://host:port (boş = doğrudan)",
  "systemNotify.settings.proxyHelp":
    "Yalnızca arama uç noktasına erişmek için kullanılan ayrı bir çıkış vekili (VPN/SOCKS vb.). Trafiği kaydeden MITM vekilinden bağımsızdır; ağ erişilemezse bu vekil üzerinden erişilir.",
  "systemNotify.settings.testHint":
    "Geçerli yapılandırmayla (kaynak + vekil + anahtar) 'test' için gerçek bir arama yaparak çalışıp çalışmadığını doğrular.",
  "systemNotify.settings.testing": "Test ediliyor…",
  "systemNotify.settings.testBtn": "Aramayı test et",
  "systemNotify.settings.searchSaved": "Web arama ayarları kaydedildi",
  "systemNotify.settings.braveSaved": "Brave API Key kaydedildi",
  "systemNotify.settings.tavilySaved": "Tavily API Key kaydedildi",
  "systemNotify.settings.proxySaved": "Çıkış vekili kaydedildi",
  "systemNotify.settings.proxyCleared": "Çıkış vekili temizlendi (doğrudan bağlantı)",
  "systemNotify.settings.testOk": "Arama testi başarılı · {backend} {count} sonuç döndürdü",
  "systemNotify.settings.testFail": "Arama testi başarısız: {error}",
  "systemNotify.settings.unknownError": "Bilinmeyen hata",
  "systemNotify.settings.saveFailed": "Kaydedilemedi: {error}",
  "systemNotify.settings.pyTitle": "Özel betikler · Python yorumlayıcısı",
  "systemNotify.settings.pyDesc":
    "Özel **script** türü araçlar Python'u bununla çalıştırır. Açılışta otomatik algılanır (python3 öncelikli); buraya bir venv / belirli bir sürümün mutlak yolunu girebilir, boş bırakırsanız çalışma anında otomatik algılanır.",
  "systemNotify.settings.pyPlaceholder": "/usr/bin/python3 (boş = otomatik algıla)",
  "systemNotify.settings.pyRedetect": "Yeniden algıla",
  "systemNotify.settings.pySaved": "Python yorumlayıcı ayarı kaydedildi",
  "systemNotify.settings.wkTitle": "Eşzamanlılık · çalışan Ajan sayısı",
  "systemNotify.settings.wkDesc":
    "Her görevde eşzamanlı çalışan Ajan sayısı (varsayılan 3). Değer büyüdükçe daha fazla paralel keşif yapılır ve tüketim artar. Değişiklik **sonradan başlayan görevler için geçerlidir**; çalışan görevler etkilenmez.",
  "systemNotify.settings.wkInvalid": "Eşzamanlılık 0'dan büyük bir tam sayı olmalıdır",
  "systemNotify.settings.wkSaved": "Çalışan Ajan sayısı kaydedildi (sonradan başlayan görevler için geçerli)",
  "systemNotify.settings.sendTitle": "Sohbet girişi gönderme tuşu",
  "systemNotify.settings.sendDesc":
    "Sohbet sayfası ile görev ayrıntılarındaki ana Ajan oturumu girişi bu ayarı paylaşır; seçince hemen geçerli olur, kaydetmek gerekmez.\n" +
    "Bu tercih **yalnızca bu tarayıcıda saklanır**, hesapla eşitlenmez; tarayıcı değiştirildiğinde veya site verileri temizlendiğinde yeniden ayarlanmalıdır.",
  "systemNotify.settings.sendLabel": "Gönderme yöntemi",

  // ---- update card ----
  "systemNotify.update.checkFailed": "Güncelleme denetimi başarısız: {error}",
  "systemNotify.update.found": "Yeni sürüm bulundu: {version}",
  "systemNotify.update.upToDateToast": "En son sürümü kullanıyorsunuz",
  "systemNotify.update.updatedReload": "{version} sürümüne güncellendi, sayfa yeniden yükleniyor",
  "systemNotify.update.restartTimeout":
    "Hizmetin yeniden başlaması beklenirken zaman aşımı oluştu. Arka uç günlüklerini kontrol edin veya artex'in start.sh / start.bat ile başlatıldığından emin olun.",
  "systemNotify.update.failed": "Güncelleme başarısız: {error}",
  "systemNotify.update.confirm": "{version} sürümüne güncellensin mi?\n\n",
  "systemNotify.update.confirmRestart": "Güncelleme programı yeniden başlatır ve çalışan görevleri keser.\n",
  "systemNotify.update.confirmDocker":
    "\nNot: kapsayıcı içinde güncelleme yalnızca programın kendisini değiştirir; imajdaki playwright / nmap gibi araç zincirini güncellemez. Yeni sürüm yeni araçlara ihtiyaç duyuyorsa bunun yerine docker compose pull kullanın.",
  "systemNotify.update.preparing": "Hazırlanıyor…",
  "systemNotify.update.startFailed": "Güncelleme başlatılamadı: {error}",
  "systemNotify.update.rollbackConfirm":
    "Önceki sürüme geri dönülsün mü?\n\nProgram yeniden başlayacak ve çalışan görevler kesilecek.\nNot: veritabanı şeması geri alınmaz; eski sürüm yeni sürümün yazdığı verileri tanıyamayabilir.",
  "systemNotify.update.rolledBack": "Önceki sürüme geçildi, yeniden başlatılıyor…",
  "systemNotify.update.rollbackFailed": "Geri alma başarısız: {error}",
  "systemNotify.update.title": "Sürüm ve güncellemeler",
  "systemNotify.update.description":
    "GitHub'dan yeni sürümleri denetleyin ve kurun. Güncelleme programı yeniden başlatır ve çalışan görevleri keser.",
  "systemNotify.update.current": "Geçerli sürüm",
  "systemNotify.update.standalone": "Bağımsız program",
  "systemNotify.update.latest": "En son sürüm",
  "systemNotify.update.changelog": "Değişiklik günlüğü",
  "systemNotify.update.githubError": "GitHub'a bağlanılamıyor: {error}",
  "systemNotify.update.githubErrorHint": "Yukarıdan genel vekili yapılandırıp yeniden deneyebilirsiniz.",
  "systemNotify.update.noAsset":
    "{latest} için {platform} yayın paketi yok ({asset} eksik); otomatik güncelleme yapılamaz.",
  "systemNotify.update.willDownload": "İndirilecek:",
  "systemNotify.update.willDownloadTail":
    ". SHA256 doğrulanır ve duman testi yapılır, ancak ondan sonra değiştirilir; başarısız olursa geçerli sürüm korunur.",
  "systemNotify.update.upToDate": "En son sürümü kullanıyorsunuz.",
  "systemNotify.update.dockerNote1":
    "Docker altında güncelleme yalnızca programın kendisini değiştirir, imajdaki playwright / nmap gibi araç zincirini güncellemez; ayrıca",
  "systemNotify.update.dockerNote2":
    "ile kapsayıcı yeniden oluşturulunca imajla gelen sürüme geri döner. İmajla birlikte yükseltmek için şunu çalıştırın:",
  "systemNotify.update.restarting":
    "Yeniden başlatılıp yeni sürüm uygulanıyor, lütfen bekleyin (sayfa otomatik yenilenecek)…",
  "systemNotify.update.checkBtn": "Güncellemeleri denetle",
  "systemNotify.update.updateTo": "{version} sürümüne güncelle",
  "systemNotify.update.updateNow": "Şimdi güncelle",
  "systemNotify.update.rollbackBtn": "Önceki sürüme geri dön",
  "systemNotify.update.guardNote1":
    "Tek tıkla güncelleme, programı yeniden başlatmak için koruyucu betiğe dayanır. ARTEX'i şununla başlatın:",
  "systemNotify.update.guardNote2": "(Windows'ta",
  "systemNotify.update.guardNote3":
    "); artex ikilisini doğrudan çalıştırırsanız program çıktıktan sonra otomatik yeniden başlatılmaz.",
};
