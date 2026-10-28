"use client";

import { useEffect, useMemo, useState } from "react";

type Rsvp = {
  id: string;
  name: string;
  message: string | null;
  attending: boolean;
  created_at: string;
};

type AttendanceFilter = "all" | "yes" | "no";
type DateFilter = "all" | "today" | "7days" | "30days";
type SortOrder = "newest" | "oldest" | "name";

const adminPasswordStorageKey = "wedding-admin-password";

const dateFilterLabels: Record<DateFilter, string> = {
  all: "Any time",
  today: "Today",
  "7days": "Last 7 days",
  "30days": "Last 30 days",
};

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5" aria-hidden>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4" aria-hidden>
      <path d="M4 7h16M9 7V4h6v3m3 0-1 13H7L6 7m4 4v5m4-5v5" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5" aria-hidden>
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

export default function Admin() {
  const [password, setPassword] = useState("");
  const [rows, setRows] = useState<Rsvp[] | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [restoringSession, setRestoringSession] = useState(true);
  const [query, setQuery] = useState("");
  const [attendance, setAttendance] = useState<AttendanceFilter>("all");
  const [dateFilter, setDateFilter] = useState<DateFilter>("all");
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const [selectedRsvp, setSelectedRsvp] = useState<Rsvp | null>(null);
  const [pendingDelete, setPendingDelete] = useState<Rsvp | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const savedPassword = window.sessionStorage.getItem(adminPasswordStorageKey);
    if (savedPassword) {
      void load(undefined, savedPassword);
    } else {
      setRestoringSession(false);
    }
    // The saved credential only needs to be checked once when the admin page mounts.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!selectedRsvp) return;

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setSelectedRsvp(null);
    }

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [selectedRsvp]);

  async function load(event?: React.FormEvent, passwordOverride?: string) {
    event?.preventDefault();
    const adminPassword = passwordOverride ?? password;
    setError("");
    setLoading(true);
    try {
      const response = await fetch("/api/admin/rsvps", {
        headers: { "x-admin-password": adminPassword },
      });
      if (!response.ok) {
        if (response.status === 401) window.sessionStorage.removeItem(adminPasswordStorageKey);
        setError(response.status === 401 ? "That password doesn’t look right." : "Couldn’t load the responses. Please try again.");
        return;
      }
      setPassword(adminPassword);
      window.sessionStorage.setItem(adminPasswordStorageKey, adminPassword);
      setRows((await response.json()).rsvps);
    } catch {
      setError("Couldn’t connect. Check your internet connection and try again.");
    } finally {
      setLoading(false);
      setRestoringSession(false);
    }
  }

  async function deleteRsvp() {
    if (!pendingDelete) return;
    setDeleting(true);
    setError("");
    try {
      const response = await fetch("/api/admin/rsvps", {
        method: "DELETE",
        headers: { "Content-Type": "application/json", "x-admin-password": password },
        body: JSON.stringify({ id: pendingDelete.id }),
      });
      if (!response.ok) throw new Error("Delete failed");
      setRows((current) => current?.filter((row) => row.id !== pendingDelete.id) ?? null);
      setPendingDelete(null);
    } catch {
      setError("Couldn’t delete that response. Please try again.");
    } finally {
      setDeleting(false);
    }
  }

  const filteredRows = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const dateCutoff: Record<DateFilter, number> = {
      all: 0,
      today: startOfToday,
      "7days": now.getTime() - 7 * 24 * 60 * 60 * 1000,
      "30days": now.getTime() - 30 * 24 * 60 * 60 * 1000,
    };

    return [...(rows ?? [])]
      .filter((row) => attendance === "all" || row.attending === (attendance === "yes"))
      .filter((row) => new Date(row.created_at).getTime() >= dateCutoff[dateFilter])
      .filter((row) => !normalizedQuery || `${row.name} ${row.message ?? ""}`.toLocaleLowerCase().includes(normalizedQuery))
      .sort((a, b) => {
        if (sortOrder === "name") return a.name.localeCompare(b.name);
        const difference = new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        return sortOrder === "newest" ? difference : -difference;
      });
  }, [attendance, dateFilter, query, rows, sortOrder]);

  function exportCsv() {
    const quote = (value: string) => `"${value.replace(/"/g, '""')}"`;
    const body = [
      "Name,Attending,Message,Submitted",
      ...filteredRows.map((row) => [quote(row.name), row.attending ? "Yes" : "No", quote(row.message ?? ""), row.created_at].join(",")),
    ].join("\n");
    const url = URL.createObjectURL(new Blob([body], { type: "text/csv;charset=utf-8" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `rsvps-${new Date().toISOString().slice(0, 10)}.csv`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  if (restoringSession) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-dusty-50" aria-label="Restoring admin session">
        <span className="h-7 w-7 animate-spin rounded-full border-2 border-dusty-300 border-t-dusty-800" aria-hidden />
      </main>
    );
  }

  if (!rows) {
    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-dusty-50 p-6">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-dusty-200/45 blur-3xl" aria-hidden />
        <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-dusty-300/35 blur-3xl" aria-hidden />
        <form onSubmit={load} className="relative w-full max-w-md rounded-[2rem] border border-white/70 bg-white/90 p-8 shadow-[0_24px_80px_rgba(54,75,93,0.14)] backdrop-blur sm:p-10">
          <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-full bg-dusty-700 font-serif text-xl italic text-white">R&amp;V</div>
          <p className="text-[10px] uppercase tracking-[0.35em] text-dusty-500">Private dashboard</p>
          <h1 className="mt-2 font-serif text-4xl font-medium text-dusty-900">Welcome back</h1>
          <p className="mt-3 text-sm leading-6 text-dusty-600">Sign in to manage your guest responses.</p>
          <label htmlFor="admin-password" className="mt-7 block text-[10px] uppercase tracking-[0.25em] text-dusty-600">Admin password</label>
          <input id="admin-password" type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" className="mt-2 w-full rounded-xl border border-dusty-200 bg-dusty-50/60 px-4 py-3.5 text-sm outline-none transition placeholder:text-dusty-400 focus:border-dusty-500 focus:ring-4 focus:ring-dusty-200/60" />
          {error && <p className="mt-3 text-sm text-red-700" role="alert">{error}</p>}
          <button disabled={loading} className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-dusty-800 py-3.5 text-sm font-medium text-white shadow-md transition hover:bg-dusty-900 disabled:cursor-wait disabled:opacity-60">
            {loading && <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden />}
            {loading ? "Signing in…" : "Open dashboard"}
          </button>
        </form>
      </main>
    );
  }

  const going = rows.filter((row) => row.attending).length;
  const hasFilters = query !== "" || attendance !== "all" || dateFilter !== "all";

  return (
    <main className="min-h-screen bg-dusty-50 pb-16">
      <header className="border-b border-dusty-200/80 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-5 sm:px-8">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-dusty-500">Raymund &amp; Vanessa</p>
            <h1 className="mt-1 font-serif text-3xl font-medium text-dusty-900 sm:text-4xl">Guest responses</h1>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => load()} disabled={loading} className="rounded-full border border-dusty-300 bg-white px-4 py-2.5 text-xs font-medium text-dusty-700 transition hover:border-dusty-500 hover:bg-dusty-50 disabled:opacity-50">{loading ? "Refreshing…" : "Refresh"}</button>
            <button onClick={exportCsv} disabled={!filteredRows.length} className="rounded-full bg-dusty-800 px-4 py-2.5 text-xs font-medium text-white transition hover:bg-dusty-900 disabled:cursor-not-allowed disabled:opacity-40">Export CSV</button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
        {error && <div className="mb-5 flex items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert"><span>{error}</span><button onClick={() => setError("")} className="font-medium">Dismiss</button></div>}

        <section className="grid gap-3 sm:grid-cols-3" aria-label="RSVP summary">
          {[
            { label: "Total responses", value: rows.length, detail: "All submissions" },
            { label: "Attending", value: going, detail: rows.length ? `${Math.round((going / rows.length) * 100)}% acceptance rate` : "No responses yet" },
            { label: "Declined", value: rows.length - going, detail: "Unable to attend" },
          ].map((stat, index) => (
            <div key={stat.label} className="rounded-2xl border border-dusty-200/70 bg-white p-5 shadow-[0_8px_30px_rgba(54,75,93,0.06)]">
              <div className="flex items-start justify-between">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-dusty-500">{stat.label}</p>
                <span className={`h-2.5 w-2.5 rounded-full ${index === 0 ? "bg-dusty-400" : index === 1 ? "bg-emerald-500" : "bg-amber-400"}`} aria-hidden />
              </div>
              <p className="mt-3 font-serif text-4xl font-medium tabular-nums text-dusty-900">{stat.value}</p>
              <p className="mt-1 text-xs text-dusty-500">{stat.detail}</p>
            </div>
          ))}
        </section>

        <section className="mt-6 rounded-2xl border border-dusty-200/70 bg-white p-4 shadow-[0_8px_30px_rgba(54,75,93,0.05)] sm:p-5" aria-label="Response filters">
          <div className="grid gap-3 lg:grid-cols-[minmax(220px,1fr)_auto_auto]">
            <label className="relative block">
              <span className="sr-only">Search guests or messages</span>
              <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-dusty-400"><SearchIcon /></span>
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search guest or message…" className="w-full rounded-xl border border-dusty-200 bg-dusty-50/50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-dusty-500 focus:ring-4 focus:ring-dusty-200/60" />
            </label>
            <div className="flex rounded-xl bg-dusty-100 p-1" aria-label="Attendance status">
              {(["all", "yes", "no"] as const).map((value) => (
                <button key={value} onClick={() => setAttendance(value)} aria-pressed={attendance === value} className={`flex-1 whitespace-nowrap rounded-lg px-3.5 py-2 text-xs font-medium transition ${attendance === value ? "bg-white text-dusty-900 shadow-sm" : "text-dusty-600 hover:text-dusty-900"}`}>{value === "all" ? "All guests" : value === "yes" ? "Attending" : "Declined"}</button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <label><span className="sr-only">Submission date</span><select value={dateFilter} onChange={(event) => setDateFilter(event.target.value as DateFilter)} className="h-full w-full rounded-xl border border-dusty-200 bg-white px-3 py-2 text-xs text-dusty-700 outline-none focus:border-dusty-500">{(Object.keys(dateFilterLabels) as DateFilter[]).map((value) => <option key={value} value={value}>{dateFilterLabels[value]}</option>)}</select></label>
              <label><span className="sr-only">Sort responses</span><select value={sortOrder} onChange={(event) => setSortOrder(event.target.value as SortOrder)} className="h-full w-full rounded-xl border border-dusty-200 bg-white px-3 py-2 text-xs text-dusty-700 outline-none focus:border-dusty-500"><option value="newest">Newest first</option><option value="oldest">Oldest first</option><option value="name">Name A–Z</option></select></label>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between gap-4 border-t border-dusty-100 pt-4 text-xs text-dusty-500">
            <p>Showing <span className="font-medium text-dusty-800">{filteredRows.length}</span> of {rows.length} responses</p>
            {hasFilters && <button onClick={() => { setQuery(""); setAttendance("all"); setDateFilter("all"); }} className="font-medium text-dusty-700 underline decoration-dusty-300 underline-offset-4 hover:text-dusty-900">Clear filters</button>}
          </div>
        </section>

        <section className="mt-4 overflow-hidden rounded-2xl border border-dusty-200/70 bg-white shadow-[0_8px_30px_rgba(54,75,93,0.05)]" aria-label="RSVP responses">
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full table-fixed text-left text-sm">
              <thead className="border-b border-dusty-200 bg-dusty-50/80 text-[10px] uppercase tracking-[0.18em] text-dusty-500"><tr><th className="w-[23%] px-5 py-4 font-medium">Guest</th><th className="w-[16%] px-5 py-4 font-medium">Response</th><th className="px-5 py-4 font-medium">Message</th><th className="w-[19%] px-5 py-4 font-medium">Submitted</th><th className="w-16 px-3 py-4"><span className="sr-only">Actions</span></th></tr></thead>
              <tbody className="divide-y divide-dusty-100">
                {filteredRows.map((row) => (
                  <tr
                    key={row.id}
                    tabIndex={0}
                    onClick={() => setSelectedRsvp(row)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        setSelectedRsvp(row);
                      }
                    }}
                    className="group cursor-pointer transition hover:bg-dusty-50/70 focus:bg-dusty-50/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-dusty-500"
                    aria-label={`View full response from ${row.name}`}
                  >
                    <td className="px-5 py-4 font-medium text-dusty-900">{row.name}</td>
                    <td className="px-5 py-4"><StatusBadge attending={row.attending} /></td>
                    <td className="px-5 py-4 leading-6 text-dusty-600"><p className="line-clamp-2">{row.message || <span className="italic text-dusty-400">No message</span>}</p></td>
                    <td className="px-5 py-4 text-xs leading-5 text-dusty-500"><time dateTime={row.created_at}>{new Date(row.created_at).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}<br />{new Date(row.created_at).toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" })}</time></td>
                    <td className="px-3 py-4"><button onClick={(event) => { event.stopPropagation(); setPendingDelete(row); }} onKeyDown={(event) => event.stopPropagation()} className="rounded-lg p-2 text-dusty-400 opacity-70 transition hover:bg-red-50 hover:text-red-700 focus:opacity-100 group-hover:opacity-100" aria-label={`Delete response from ${row.name}`}><TrashIcon /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="divide-y divide-dusty-100 md:hidden">
            {filteredRows.map((row) => (
              <article key={row.id} tabIndex={0} role="button" onClick={() => setSelectedRsvp(row)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setSelectedRsvp(row); } }} className="cursor-pointer p-5 transition hover:bg-dusty-50/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-dusty-500" aria-label={`View full response from ${row.name}`}>
                <div className="flex items-start justify-between gap-4"><div><h2 className="font-medium text-dusty-900">{row.name}</h2><div className="mt-2"><StatusBadge attending={row.attending} /></div></div><button onClick={(event) => { event.stopPropagation(); setPendingDelete(row); }} onKeyDown={(event) => event.stopPropagation()} className="rounded-lg p-2 text-dusty-400 hover:bg-red-50 hover:text-red-700" aria-label={`Delete response from ${row.name}`}><TrashIcon /></button></div>
                {row.message && <p className="mt-4 line-clamp-3 text-sm leading-6 text-dusty-600">{row.message}</p>}
                <time dateTime={row.created_at} className="mt-4 block text-[11px] uppercase tracking-[0.12em] text-dusty-400">{new Date(row.created_at).toLocaleString(undefined, { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" })}</time>
              </article>
            ))}
          </div>
          {!filteredRows.length && <div className="px-6 py-16 text-center"><div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-dusty-100 text-dusty-500"><SearchIcon /></div><h2 className="mt-4 font-serif text-2xl text-dusty-800">No responses found</h2><p className="mt-2 text-sm text-dusty-500">{hasFilters ? "Try adjusting or clearing your filters." : "New guest responses will appear here."}</p></div>}
        </section>
      </div>

      {selectedRsvp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-dusty-950/45 p-5 backdrop-blur-sm" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedRsvp(null); }}>
          <div role="dialog" aria-modal="true" aria-labelledby="message-title" aria-describedby="message-content" className="relative max-h-[85vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl sm:p-8">
            <button type="button" onClick={() => setSelectedRsvp(null)} className="absolute right-4 top-4 rounded-full p-2 text-dusty-400 transition hover:bg-dusty-100 hover:text-dusty-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-dusty-500" aria-label="Close guest message"><CloseIcon /></button>
            <p className="pr-12 text-[10px] uppercase tracking-[0.25em] text-dusty-500">Guest message</p>
            <h2 id="message-title" className="mt-2 pr-12 font-serif text-3xl font-medium text-dusty-900">{selectedRsvp.name}</h2>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <StatusBadge attending={selectedRsvp.attending} />
              <time dateTime={selectedRsvp.created_at} className="text-xs text-dusty-400">{new Date(selectedRsvp.created_at).toLocaleString(undefined, { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" })}</time>
            </div>
            <div className="my-6 h-px bg-dusty-100" />
            <p id="message-content" className={`whitespace-pre-wrap break-words text-sm leading-7 ${selectedRsvp.message ? "text-dusty-700" : "italic text-dusty-400"}`}>{selectedRsvp.message || "No message was included with this response."}</p>
          </div>
        </div>
      )}

      {pendingDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-dusty-950/45 p-5 backdrop-blur-sm" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget && !deleting) setPendingDelete(null); }}>
          <div role="alertdialog" aria-modal="true" aria-labelledby="delete-title" aria-describedby="delete-description" className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl sm:p-7">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-50 text-red-700"><TrashIcon /></div>
            <h2 id="delete-title" className="mt-5 font-serif text-3xl font-medium text-dusty-900">Delete this response?</h2>
            <p id="delete-description" className="mt-3 text-sm leading-6 text-dusty-600">The RSVP from <strong className="font-medium text-dusty-900">{pendingDelete.name}</strong> will be permanently removed. This action can’t be undone.</p>
            <div className="mt-7 flex justify-end gap-3"><button onClick={() => setPendingDelete(null)} disabled={deleting} className="rounded-xl border border-dusty-300 px-4 py-2.5 text-sm font-medium text-dusty-700 hover:bg-dusty-50 disabled:opacity-50">Cancel</button><button onClick={deleteRsvp} disabled={deleting} className="rounded-xl bg-red-700 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-800 disabled:cursor-wait disabled:opacity-60">{deleting ? "Deleting…" : "Delete response"}</button></div>
          </div>
        </div>
      )}
    </main>
  );
}

function StatusBadge({ attending }: { attending: boolean }) {
  return <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium ${attending ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}><span className={`h-1.5 w-1.5 rounded-full ${attending ? "bg-emerald-500" : "bg-amber-500"}`} aria-hidden />{attending ? "Attending" : "Declined"}</span>;
}
