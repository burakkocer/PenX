package report

import (
	"regexp"
	"strings"
	"testing"
	"time"

	"github.com/Autumn-27/artex/db"
	"github.com/Autumn-27/artex/i18n"
)

var hanRe = regexp.MustCompile(`[\p{Han}]`)

func sampleFinding() *db.DBFinding {
	return &db.DBFinding{
		ID:                    7,
		Severity:              "high",
		Status:                "pending",
		Summary:               "summary",
		Evidence:              "evidence",
		Report:                "report body",
		EvidenceVersion:       2,
		ReportEvidenceVersion: 1,
		CreatedAt:             time.Date(2026, 1, 2, 3, 4, 5, 0, time.UTC),
		TrafficBindings: []db.FindingTrafficBinding{{
			ID: 3, Role: "request", Note: "note",
			Snapshot: db.TrafficEvidenceSnapshot{Method: "GET", URL: "http://example.test/", Status: 200},
		}},
	}
}

func renderAll(loc i18n.Locale) string {
	now := time.Date(2026, 1, 2, 3, 4, 5, 0, time.UTC)
	f := sampleFinding()
	in := Input{
		Locale:      loc,
		GeneratedAt: now,
		AssetCounts: map[string]int{"ip": 2},
		Findings:    []*db.Node{{Payload: []byte(`{"severity":"high","summary":"s","evidence":{"poc":"p"}}`)}},
	}
	return Markdown(in) +
		FindingsMarkdown(loc, []*db.DBFinding{f}, now) +
		FindingsMarkdown(loc, nil, now) +
		SingleFindingMarkdown(loc, f, now) +
		string(FindingsCSV(loc, []*db.DBFinding{f}))
}

func TestReportLocalization(t *testing.T) {
	en := renderAll(i18n.EN)
	tr := renderAll(i18n.TR)
	if hanRe.MatchString(en) {
		t.Errorf("EN output contains Han characters")
	}
	if hanRe.MatchString(tr) {
		t.Errorf("TR output contains Han characters")
	}
	if !strings.Contains(en, "Penetration Test Report") || !strings.Contains(tr, "Sızma Testi Raporu") {
		t.Errorf("unexpected localized titles")
	}
	if strings.Contains(en, "%!") || strings.Contains(tr, "%!") {
		t.Errorf("format verb mismatch in output")
	}
}
