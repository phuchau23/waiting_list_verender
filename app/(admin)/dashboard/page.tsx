"use client";

import { useMemo, useState } from "react";

type WaitlistStatus = "new" | "contacted" | "converted";

interface WaitlistUser {
  id: number;
  name: string;
  email: string;
  bikeModel: string;
  createdAt: string; // ISO string hoặc date string
  source: string;
  status: WaitlistStatus;
}

// Dummy data mẫu – sau bind API thì thay thế chỗ này
const MOCK_WAITLIST: WaitlistUser[] = [
  {
    id: 1,
    name: "Nguyễn Minh Khôi",
    email: "khoi.nguyen@example.com",
    bikeModel: "Yamaha Exciter 155",
    createdAt: "2025-11-18 10:32",
    source: "Landing Hero",
    status: "new",
  },
  {
    id: 2,
    name: "Trần Anh Thư",
    email: "thu.anh@example.com",
    bikeModel: "Honda SH 150i",
    createdAt: "2025-11-18 11:05",
    source: "TikTok Ads",
    status: "contacted",
  },
  {
    id: 3,
    name: "Lê Hoàng Nam",
    email: "nam.le@example.com",
    bikeModel: "Kawasaki Z900",
    createdAt: "2025-11-17 09:20",
    source: "Referral",
    status: "converted",
  },
  {
    id: 4,
    name: "Phạm Quỳnh Anh",
    email: "quynhanh.pham@example.com",
    bikeModel: "Honda Winner X",
    createdAt: "2025-11-19 08:10",
    source: "Landing Hero",
    status: "new",
  },
  {
    id: 5,
    name: "Đỗ Đức Huy",
    email: "huy.do@example.com",
    bikeModel: "Suzuki GSX-S150",
    createdAt: "2025-11-16 15:45",
    source: "Facebook Group",
    status: "contacted",
  },
];

const STATUS_LABEL: Record<WaitlistStatus, string> = {
  new: "Mới",
  contacted: "Đã liên hệ",
  converted: "Đã chuyển đổi",
};

const STATUS_BADGE_CLASSES: Record<WaitlistStatus, string> = {
  new: "bg-emerald-500/12 text-emerald-300 border-emerald-400/40",
  contacted: "bg-sky-500/12 text-sky-300 border-sky-400/40",
  converted: "bg-violet-500/12 text-violet-300 border-violet-400/40",
};

export default function DashboardPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<WaitlistStatus | "all">(
    "all"
  );
  const [isExporting, setIsExporting] = useState(false);
  const [exportHint, setExportHint] = useState<null | string>(null);

  const stats = useMemo(() => {
    const total = MOCK_WAITLIST.length;
    const newCount = MOCK_WAITLIST.filter((u) => u.status === "new").length;
    const contactedCount = MOCK_WAITLIST.filter(
      (u) => u.status === "contacted"
    ).length;
    const convertedCount = MOCK_WAITLIST.filter(
      (u) => u.status === "converted"
    ).length;

    return { total, newCount, contactedCount, convertedCount };
  }, []);

  const filteredUsers = useMemo(() => {
    return MOCK_WAITLIST.filter((u) => {
      const matchesStatus =
        statusFilter === "all" ? true : u.status === statusFilter;

      const term = search.toLowerCase().trim();
      const matchesSearch =
        term.length === 0 ||
        u.name.toLowerCase().includes(term) ||
        u.email.toLowerCase().includes(term) ||
        u.bikeModel.toLowerCase().includes(term);

      return matchesStatus && matchesSearch;
    });
  }, [search, statusFilter]);

  const handleExport = () => {
    if (filteredUsers.length === 0) {
      setExportHint("Không có dữ liệu để export theo bộ lọc hiện tại.");
      return;
    }

    setIsExporting(true);
    setExportHint(null);

    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10);
    const timeStr = now.toTimeString().slice(0, 8);

    const header = [
      "ID",
      "Tên",
      "Email",
      "Dòng xe",
      "Nguồn",
      "Ngày đăng ký",
      "Trạng thái",
    ];

    const rows = filteredUsers.map((u) => [
      u.id,
      u.name,
      u.email,
      u.bikeModel,
      u.source,
      u.createdAt,
      STATUS_LABEL[u.status],
    ]);

    // CSV có thêm title + meta cho nhìn “đàng hoàng” hơn khi mở Excel
    const metaLines = [
      [`Verender Waitlist Export`],
      [`Ngày export: ${dateStr} ${timeStr}`],
      [`Số bản ghi: ${filteredUsers.length}`],
      [""],
    ];

    const allRows = [...metaLines, header, ...rows];

    const csvContent =
      allRows
        .map((row) =>
          row
            .map((cell) => {
              const value = String(cell ?? "");
              if (
                value.includes('"') ||
                value.includes(",") ||
                value.includes("\n")
              ) {
                return `"${value.replace(/"/g, '""')}"`;
              }
              return value;
            })
            .join(",")
        )
        .join("\n") + "\n";

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.setAttribute("download", `verender_waitlist_${dateStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setIsExporting(false);
    setExportHint(
      `Đã export ${filteredUsers.length} dòng. Mở file .csv bằng Excel sẽ thấy tiêu đề + thông tin export ở trên.`
    );

    setTimeout(() => {
      setExportHint(null);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#022c22_0,_#020617_55%,_#000_100%)] text-white">
      {/* Top bar / header */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-black/60 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="space-y-1">
            <p className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-emerald-300/80">
              <span className="h-1 w-1 rounded-full bg-emerald-400" />
              Verender Dashboard
            </p>
            <h1 className="text-lg font-semibold text-white/90">
              Waitlist – Người dùng đang chờ trải nghiệm
            </h1>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <div className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-200 border border-emerald-500/40 whitespace-nowrap">
              Tổng: <span className="ml-1 font-semibold">{stats.total}</span>{" "}
              users
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-emerald-400 via-sky-400 to-cyan-300 text-xs font-semibold text-black shadow-[0_0_0_1px_rgba(15,23,42,0.9),0_18px_60px_rgba(8,145,178,0.6)]">
              V
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8 space-y-8">
        {/* Stats cards */}
        <section className="grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-[0_20px_70px_rgba(0,0,0,0.75)]">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.18em] text-white/55">
                Tổng chờ đợi
              </p>
              <span className="text-xs text-white/40">All users</span>
            </div>
            <p className="mt-3 text-3xl font-semibold">{stats.total}</p>
            <p className="mt-1 text-xs text-white/45">
              Tất cả user đã để lại thông tin.
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-400/35 bg-emerald-500/5 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-emerald-300/80">
              Mới đăng ký
            </p>
            <p className="mt-3 text-3xl font-semibold text-emerald-300">
              {stats.newCount}
            </p>
            <p className="mt-1 text-xs text-emerald-100/70">
              Chưa được team liên hệ.
            </p>
          </div>

          <div className="rounded-2xl border border-sky-400/35 bg-sky-500/5 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-sky-300/80">
              Đã liên hệ
            </p>
            <p className="mt-3 text-3xl font-semibold text-sky-300">
              {stats.contactedCount}
            </p>
            <p className="mt-1 text-xs text-sky-100/70">
              Đã gọi / nhắn, chờ phản hồi.
            </p>
          </div>

          <div className="rounded-2xl border border-violet-400/35 bg-violet-500/5 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-violet-300/80">
              Đã chuyển đổi
            </p>
            <p className="mt-3 text-3xl font-semibold text-violet-300">
              {stats.convertedCount}
            </p>
            <p className="mt-1 text-xs text-violet-100/70">
              Đã active / dùng app.
            </p>
          </div>
        </section>

        {/* Filter + search + export */}
        <section className="rounded-2xl border border-white/10 bg-black/70 p-4 md:p-5 shadow-[0_20px_80px_rgba(0,0,0,0.9)]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-white/90">
                Danh sách waitlist
              </p>
              <p className="text-xs text-white/45">
                Lọc theo trạng thái, tìm kiếm theo tên/email/dòng xe và export
                ra file Excel (CSV).
              </p>
            </div>

            {/* Hàng control: filter + search + export */}
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-4 lg:flex-nowrap">
              {/* Status filter pills – luôn 1 dòng trên desktop */}
              <div className="inline-flex flex-nowrap rounded-full bg-slate-950/80 p-1 border border-white/10">
                {[
                  { key: "all", label: "Tất cả" },
                  { key: "new", label: "Mới" },
                  { key: "contacted", label: "Đã liên hệ" },
                  { key: "converted", label: "Đã chuyển đổi" },
                ].map((opt) => {
                  const isActive = statusFilter === opt.key;
                  return (
                    <button
                      key={opt.key}
                      onClick={() =>
                        setStatusFilter(
                          opt.key === "all"
                            ? "all"
                            : (opt.key as WaitlistStatus)
                        )
                      }
                      className={[
                        "px-3 py-1 text-[11px] rounded-full transition-all whitespace-nowrap",
                        isActive
                          ? "bg-emerald-400 text-black shadow-[0_0_0_1px_rgba(16,185,129,0.7)]"
                          : "text-white/60 hover:text-white hover:bg-white/5",
                      ].join(" ")}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>

              {/* Search + Export: gói lại 1 row, không wrap trên desktop */}
              <div className="flex items-center gap-2 lg:gap-3 flex-nowrap">
                <div className="relative flex-shrink-0">
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Tìm theo tên / email / dòng xe..."
                    className="w-56 md:w-64 lg:w-72 rounded-full border border-white/15 bg-black/70 px-10 py-2.5 text-sm text-white placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-emerald-400/80 focus:border-transparent"
                  />
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs text-white/40">
                    🔎
                  </span>
                </div>

                <button
                  onClick={handleExport}
                  disabled={isExporting}
                  className="inline-flex flex-shrink-0 items-center justify-center gap-2 rounded-full border border-emerald-400/70 bg-gradient-to-r from-emerald-500 via-cyan-400 to-sky-400 px-4 py-2 text-xs font-semibold text-black shadow-[0_12px_40px_rgba(8,145,178,0.55)] hover:brightness-110 active:scale-95 transition-all disabled:cursor-not-allowed disabled:opacity-60 whitespace-nowrap"
                >
                  <span className="text-sm">⬇️</span>
                  <span>{isExporting ? "Đang export..." : "Export Excel"}</span>
                  {isExporting && (
                    <span className="ml-1 h-2 w-2 animate-ping rounded-full bg-black/70" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {exportHint && (
            <div className="mt-3 rounded-xl border border-emerald-400/30 bg-emerald-500/5 px-3 py-2 text-[11px] text-emerald-100 flex items-center gap-2">
              <span className="text-xs">💾</span>
              <span>{exportHint}</span>
            </div>
          )}

          {/* Table */}
          <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/80">
            <div className="max-h-[460px] overflow-auto">
              <table className="min-w-full text-sm">
                <thead className="sticky top-0 z-10 bg-slate-950/95 text-xs uppercase text-white/55 tracking-[0.14em] backdrop-blur-sm">
                  <tr>
                    <th className="px-4 py-3 text-left">User</th>
                    <th className="px-4 py-3 text-left">Xe</th>
                    <th className="px-4 py-3 text-left">Nguồn</th>
                    <th className="px-4 py-3 text-left">Ngày đăng ký</th>
                    <th className="px-4 py-3 text-left">Trạng thái</th>
                    <th className="px-4 py-3 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.length === 0 && (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-4 py-8 text-center text-xs text-white/40"
                      >
                        Không tìm thấy user nào phù hợp bộ lọc hiện tại.
                      </td>
                    </tr>
                  )}

                  {filteredUsers.map((user, idx) => (
                    <tr
                      key={user.id}
                      className={[
                        "border-t border-white/5",
                        idx % 2 === 0 ? "bg-white/[0.01]" : "bg-white/[0.03]",
                        "hover:bg-emerald-500/8 transition-colors",
                      ].join(" ")}
                    >
                      {/* User info */}
                      <td className="px-4 py-3 align-middle">
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-white/90">
                            {user.name}
                          </p>
                          <p className="text-xs text-white/55">{user.email}</p>
                        </div>
                      </td>

                      {/* Bike model */}
                      <td className="px-4 py-3 align-middle">
                        <p className="text-sm text-white/85">
                          {user.bikeModel}
                        </p>
                      </td>

                      {/* Source */}
                      <td className="px-4 py-3 align-middle">
                        <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-2.5 py-1 text-[11px] text-white/65 border border-white/10">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
                          {user.source}
                        </span>
                      </td>

                      {/* CreatedAt */}
                      <td className="px-4 py-3 align-middle">
                        <p className="text-xs text-white/60">
                          {user.createdAt}
                        </p>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3 align-middle">
                        <span
                          className={[
                            "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] border",
                            STATUS_BADGE_CLASSES[user.status],
                          ].join(" ")}
                        >
                          <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />
                          {STATUS_LABEL[user.status]}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3 align-middle text-right">
                        <div className="inline-flex items-center gap-1.5 whitespace-nowrap">
                          <button className="rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 text-[11px] text-emerald-300 hover:bg-emerald-400/20 transition-colors">
                            Gửi email
                          </button>
                          <button className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] text-white/75 hover:bg-white/10 transition-colors">
                            Cập nhật
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className="mt-3 text-[11px] text-white/35">
            * Hiện tại là dữ liệu mẫu. Sau này chỉ cần thay{" "}
            <code>MOCK_WAITLIST</code> bằng dữ liệu API thật; UI và export sẽ
            dùng lại logic này.
          </p>
        </section>
      </main>
    </div>
  );
}
