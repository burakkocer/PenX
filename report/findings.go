package report

import (
	"bytes"
	"encoding/csv"
	"fmt"
	"path"
	"regexp"
	"sort"
	"strings"
	"time"

	"github.com/Autumn-27/artex/db"
	"github.com/Autumn-27/artex/i18n"
)

// 发现页「导出」用的渲染:把一批 findings 表行渲染成汇总 Markdown、单条 Markdown、
// 或 CSV。JSON 由 server 层直接用 DTO 序列化,不在此处。

// sortFindingsForExport 按严重等级降序、再按时间倒序排,与汇总报告的分组一致。
func sortFindingsForExport(fs []*db.DBFinding) {
	sort.SliceStable(fs, func(i, j int) bool {
		ri, rj := sevRank[fs[i].Severity], sevRank[fs[j].Severity]
		if ri != rj {
			return ri < rj // sevRank 越小越严重
		}
		return fs[i].CreatedAt.After(fs[j].CreatedAt)
	})
}

// findingTitle 取漏洞可读标题:名称 → 类别 → 本地化的「未分类」。
func findingTitle(loc i18n.Locale, f *db.DBFinding) string {
	return nz(f.Name, nz(f.VulnClass, i18n.T(loc, "report.uncategorized")))
}

// FindingsMarkdown 把一批 findings 整合成一份汇总报告(摘要 + 按严重等级分组,
// 每条含类别/状态/所属任务/证据/详细报告)。
func FindingsMarkdown(loc i18n.Locale, fs []*db.DBFinding, generatedAt time.Time) string {
	items := append([]*db.DBFinding(nil), fs...)
	sortFindingsForExport(items)

	var b strings.Builder
	b.WriteString("# " + i18n.T(loc, "report.fTitle") + "\n\n")
	b.WriteString(i18n.T(loc, "report.generatedAt", generatedAt.Format("2006-01-02 15:04:05")) + "\n")
	b.WriteString(i18n.T(loc, "report.fTotal", len(items)) + "\n\n")

	// 摘要:各严重等级计数。
	counts := map[string]int{}
	for _, f := range items {
		counts[f.Severity]++
	}
	b.WriteString("## " + i18n.T(loc, "report.summary") + "\n\n")
	b.WriteString(i18n.T(loc, "report.sevTable"))
	for _, s := range []struct {
		key   string
		label i18n.Key
	}{
		{"critical", "report.sevCritical"}, {"high", "report.sevHigh"}, {"medium", "report.sevMedium"}, {"low", "report.sevLow"},
	} {
		fmt.Fprintf(&b, "| %s | %d |\n", i18n.T(loc, s.label), counts[s.key])
	}
	b.WriteString("\n")

	if len(items) == 0 {
		b.WriteString(i18n.T(loc, "report.fNone") + "\n")
		return b.String()
	}

	b.WriteString("## " + i18n.T(loc, "report.fDetails") + "\n\n")
	for i, f := range items {
		fmt.Fprintf(&b, "### %d. [%s] %s\n\n", i+1, strings.ToUpper(nz(f.Severity, "info")), findingTitle(loc, f))
		if f.VulnClass != "" {
			b.WriteString(i18n.T(loc, "report.fClass", f.VulnClass) + "\n")
		}
		b.WriteString(i18n.T(loc, "report.fStatus", nz(f.Status, "pending")) + "\n")
		if desc := strings.TrimSpace(f.TaskDescription); desc != "" {
			b.WriteString(i18n.T(loc, "report.fTask", desc) + "\n")
		}
		b.WriteString(i18n.T(loc, "report.fFoundAt", f.CreatedAt.Format("2006-01-02 15:04:05")) + "\n\n")
		if s := strings.TrimSpace(f.Summary); s != "" {
			fmt.Fprintf(&b, "%s\n\n", s)
		}
		if e := strings.TrimSpace(f.Evidence); e != "" {
			fmt.Fprintf(&b, "%s\n\n```\n%s\n```\n\n", i18n.T(loc, "report.fEvidence"), e)
		}
		if rep := strings.TrimSpace(f.Report); rep != "" {
			b.WriteString(i18n.T(loc, "report.fReport") + "\n\n")
			b.WriteString(rep)
			b.WriteString("\n\n")
		}
		b.WriteString(findingTrafficMarkdown(loc, f, false))
		b.WriteString("---\n\n")
	}
	return b.String()
}

// SingleFindingMarkdown 渲染单条漏洞为一份独立 Markdown(用于「一漏洞一文件」打包)。
func SingleFindingMarkdown(loc i18n.Locale, f *db.DBFinding, generatedAt time.Time) string {
	var b strings.Builder
	fmt.Fprintf(&b, "# [%s] %s\n\n", strings.ToUpper(nz(f.Severity, "info")), findingTitle(loc, f))
	if f.VulnClass != "" {
		b.WriteString(i18n.T(loc, "report.fClass", f.VulnClass) + "\n")
	}
	b.WriteString(i18n.T(loc, "report.fSeverity", nz(f.Severity, "info")) + "\n")
	b.WriteString(i18n.T(loc, "report.fStatus", nz(f.Status, "pending")) + "\n")
	if desc := strings.TrimSpace(f.TaskDescription); desc != "" {
		b.WriteString(i18n.T(loc, "report.fTask", desc) + "\n")
	}
	b.WriteString(i18n.T(loc, "report.fFoundAt", f.CreatedAt.Format("2006-01-02 15:04:05")) + "\n")
	b.WriteString(i18n.T(loc, "report.generatedAt", generatedAt.Format("2006-01-02 15:04:05")) + "\n\n")
	if s := strings.TrimSpace(f.Summary); s != "" {
		fmt.Fprintf(&b, "## %s\n\n%s\n\n", i18n.T(loc, "report.sSummary"), s)
	}
	if e := strings.TrimSpace(f.Evidence); e != "" {
		fmt.Fprintf(&b, "## %s\n\n```\n%s\n```\n\n", i18n.T(loc, "report.sEvidence"), e)
	}
	if rep := strings.TrimSpace(f.Report); rep != "" {
		b.WriteString("## " + i18n.T(loc, "report.sReport") + "\n\n")
		b.WriteString(rep)
		b.WriteString("\n")
	}
	b.WriteString(findingTrafficMarkdown(loc, f, true))
	return b.String()
}

var unsafeFilenameChars = regexp.MustCompile(`[^\p{Han}\p{L}\p{N}._-]+`)

// FindingFilename 为「一漏洞一文件」生成安全的 .md 文件名,形如
// `critical_SQL注入_#123.md`。去掉路径分隔符与控制字符,避免 zip 内非法路径。
func FindingFilename(f *db.DBFinding) string {
	sev := nz(f.Severity, "info")
	// Filename keeps the historical (locale-independent) fallback so exported
	// file names stay stable regardless of the request language.
	title := nz(f.Name, nz(f.VulnClass, "未分类"))
	name := fmt.Sprintf("%s_%s_#%d", sev, title, f.ID)
	name = unsafeFilenameChars.ReplaceAllString(name, "_")
	name = strings.Trim(name, "._")
	if name == "" {
		name = fmt.Sprintf("finding_%d", f.ID)
	}
	// 防御性:再剥一层路径,杜绝 zip slip。
	name = path.Base(name)
	if len(name) > 120 {
		name = name[:120]
	}
	return name + ".md"
}

// FindingsCSV 把一批 findings 渲染成 CSV(带 UTF-8 BOM,便于 Excel 正确识别中文)。
// 不含大段 report/evidence 全文,只放摘要类字段;需要全文用 Markdown/JSON 导出。
func FindingsCSV(loc i18n.Locale, fs []*db.DBFinding) []byte {
	items := append([]*db.DBFinding(nil), fs...)
	sortFindingsForExport(items)

	var buf bytes.Buffer
	buf.WriteString("\xEF\xBB\xBF") // UTF-8 BOM
	w := csv.NewWriter(&buf)
	_ = w.Write([]string{
		i18n.T(loc, "report.csvID"), i18n.T(loc, "report.csvName"), i18n.T(loc, "report.csvClass"),
		i18n.T(loc, "report.csvSeverity"), i18n.T(loc, "report.csvStatus"), i18n.T(loc, "report.csvTask"),
		i18n.T(loc, "report.csvFoundAt"), i18n.T(loc, "report.csvSummary"),
		i18n.T(loc, "report.csvTrafficN"), i18n.T(loc, "report.csvTrafficID"),
	})
	for _, f := range items {
		_ = w.Write([]string{
			fmt.Sprintf("%d", f.ID),
			findingTitle(loc, f),
			f.VulnClass,
			nz(f.Severity, "info"),
			nz(f.Status, "pending"),
			f.TaskDescription,
			f.CreatedAt.Format("2006-01-02 15:04:05"),
			strings.TrimSpace(f.Summary),
			fmt.Sprint(len(f.TrafficBindings)), findingTrafficIDs(f),
		})
	}
	w.Flush()
	return buf.Bytes()
}

func findingTrafficIDs(f *db.DBFinding) string {
	ids := make([]string, 0, len(f.TrafficBindings))
	for _, b := range f.TrafficBindings {
		ids = append(ids, fmt.Sprint(b.ID))
	}
	return strings.Join(ids, ",")
}

func findingTrafficMarkdown(loc i18n.Locale, f *db.DBFinding, attachments bool) string {
	stale := f.Report != "" && f.EvidenceVersion != f.ReportEvidenceVersion
	if len(f.TrafficBindings) == 0 && !stale {
		return ""
	}
	var out strings.Builder
	out.WriteString("\n## " + i18n.T(loc, "report.tHeading") + "\n\n")
	out.WriteString(i18n.T(loc, "report.tVersion", f.EvidenceVersion, len(f.TrafficBindings)) + "\n\n")
	if stale {
		out.WriteString(i18n.T(loc, "report.tStale") + "\n\n")
	}
	for i, b := range f.TrafficBindings {
		out.WriteString(i18n.T(loc, "report.tItem", i+1, b.ID, b.Role, b.Snapshot.Method, strings.ReplaceAll(b.Snapshot.URL, "`", "%60"), b.Snapshot.Status) + "\n")
		if b.Note != "" {
			fmt.Fprintf(&out, "   %s\n", strings.ReplaceAll(b.Note, "\n", "\n   "))
		}
		if attachments {
			fmt.Fprintf(&out, "   [%s](evidence/%d/%d/request.http) · [%s](evidence/%d/%d/response.http)\n", i18n.T(loc, "report.tReq"), f.ID, b.ID, i18n.T(loc, "report.tResp"), f.ID, b.ID)
		}
	}
	out.WriteString("\n")
	return out.String()
}
