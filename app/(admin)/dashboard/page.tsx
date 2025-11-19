"use client";

import { useEffect, useMemo, useState } from "react";

interface WaitlistItem {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  wishMessage: string;
}

interface WaitlistMeta {
  totalItems: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export default function DashboardPage() {
  const [items, setItems] = useState<WaitlistItem[]>([]);
  const [meta, setMeta] = useState<WaitlistMeta | null>(null);

  const [page, setPage] = useState(1);
  const [size] = useState(10);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [isExporting, setIsExporting] = useState(false);
  const [exportHint, setExportHint] = useState<null | string>(null);

  // Call API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `https://waitinglistweb.onrender.com/api/waiting-list?page=${page}&size=${size}`,
          {
            headers: {
              accept: "*/*",
            },
          }
        );

        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }

        const json = await res.json();
        const data = json.data;

        setItems(data.items ?? []);
        setMeta({
          totalItems: data.totalItems,
          currentPage: data.currentPage,
          totalPages: data.totalPages,
          pageSize: data.pageSize,
          hasPreviousPage: data.hasPreviousPage,
          hasNextPage: data.hasNextPage,
        });
      } catch (err: unknown) {
        console.error(err);
        setError("Không tải được dữ liệu waitlist. Thử F5 lại giúp em nha.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, size]);

  // Lọc theo search
  const filteredItems = useMemo(() => {
    const term = search.toLowerCase().trim();
    if (!term) return items;

    return items.filter((u) => {
      const fullName = `${u.firstName ?? ""} ${u.lastName ?? ""}`.toLowerCase();
      return (
        fullName.includes(term) ||
        (u.email ?? "").toLowerCase().includes(term) ||
        (u.phoneNumber ?? "").toLowerCase().includes(term) ||
        (u.wishMessage ?? "").toLowerCase().includes(term)
      );
    });
  }, [items, search]);

  const handleExport = () => {
    if (filteredItems.length === 0) {
      setExportHint("Không có dữ liệu để export theo bộ lọc hiện tại.");
      return;
    }

    setIsExporting(true);
    setExportHint(null);

    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10);
    const timeStr = now.toTimeString().slice(0, 8);

    const header = [
      "STT",
      "Họ",
      "Tên",
      "Họ tên đầy đủ",
      "Email",
      "Số điện thoại",
      "Lời nhắn",
    ];

    const rows = filteredItems.map((u, idx) => {
      const fullName = `${u.firstName ?? ""} ${u.lastName ?? ""}`.trim();
      return [
        idx + 1,
        u.firstName ?? "",
        u.lastName ?? "",
        fullName,
        u.email ?? "",
        u.phoneNumber ?? "",
        u.wishMessage ?? "",
      ];
    });

    const metaLines = [
      ["Waiting List Export"],
      [`Ngày export: ${dateStr} ${timeStr}`],
      [`Số bản ghi (trong trang & theo bộ lọc): ${filteredItems.length}`],
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
    link.setAttribute("download", `waiting_list_${dateStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setIsExporting(false);
    setExportHint(
      `Đã export ${filteredItems.length} dòng từ dữ liệu trên trang hiện tại. Mở file .csv bằng Excel để xem chi tiết.`
    );

    setTimeout(() => {
      setExportHint(null);
    }, 5000);
  };

  const handlePrevPage = () => {
    if (meta?.hasPreviousPage) setPage((p) => Math.max(1, p - 1));
  };

  const handleNextPage = () => {
    if (meta?.hasNextPage) setPage((p) => p + 1);
  };

  const currentPage = meta?.currentPage ?? page;
  const totalPages = meta?.totalPages ?? 1;

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#020617_0,_#020617_35%,_#000_100%)] text-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-slate-800/80 bg-black/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="space-y-1">
            <p className="text-[11px] uppercase tracking-[0.28em] text-slate-400">
              Waiting List Dashboard
            </p>
            <h1 className="text-xl font-semibold text-slate-50">
              Danh sách người dùng đăng ký
            </h1>
          </div>

          <div className="text-right text-xs text-slate-400">
            <p className="text-[11px]">Tổng số lượt đăng ký</p>
            <p className="text-lg font-semibold text-slate-50">
              {meta?.totalItems ?? 0}
            </p>
          </div>
        </div>
        {/* line mảnh chạy ngang cho vibe “console” */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-600 to-transparent" />
      </header>

      <main className="mx-auto flex max-w-6xl flex-col px-6 pb-12 pt-8">
        {/* Card chính */}
        <section className="relative rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-black/95 p-6 shadow-[0_24px_90px_rgba(0,0,0,0.95)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_30px_120px_rgba(0,0,0,1)]">
          {/* glow viền nhẹ */}
          <div className="pointer-events-none absolute -inset-px rounded-3xl border border-slate-500/10 [mask-image:radial-gradient(circle_at_top,_black,transparent)]" />

          {/* Top row: title + search + export */}
          <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-slate-50">
                Waiting list từ form landing
              </p>
              <p className="text-xs text-slate-400">
                Tìm theo tên, email, số điện thoại hoặc lời nhắn. Dữ liệu được
                lấy trực tiếp từ API.
              </p>
            </div>

            <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:justify-end">
              <div className="relative">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search tên / email / phone / lời nhắn..."
                  className="w-full min-w-[240px] rounded-full border border-slate-700 bg-slate-900/80 px-10 py-2.5 text-xs text-slate-100 placeholder:text-slate-500 outline-none ring-0 transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/40 sm:w-72 md:w-80"
                />
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[11px] text-slate-500">
                  /
                </span>
              </div>

              <button
                onClick={handleExport}
                disabled={isExporting || filteredItems.length === 0}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-sky-500/60 bg-slate-900 px-4 py-2 text-xs font-semibold text-sky-100 shadow-[0_16px_50px_rgba(8,47,73,0.8)] transition hover:-translate-y-[1px] hover:bg-sky-600/20 hover:text-sky-50 disabled:translate-y-0 disabled:border-slate-600 disabled:bg-slate-800 disabled:text-slate-400 disabled:shadow-none"
              >
                <span className="text-[11px] uppercase tracking-[0.18em]">
                  Export
                </span>
                <span className="text-[11px] text-slate-300">
                  {isExporting
                    ? "Đang xử lý..."
                    : `${filteredItems.length} dòng`}
                </span>
              </button>
            </div>
          </div>

          {/* Export hint + error */}
          {exportHint && (
            <div className="mt-3 rounded-xl border border-sky-500/40 bg-sky-900/20 px-3 py-2 text-[11px] text-sky-100">
              {exportHint}
            </div>
          )}

          {error && (
            <div className="mt-3 rounded-xl border border-red-500/40 bg-red-900/20 px-3 py-2 text-[11px] text-red-100">
              {error}
            </div>
          )}

          {/* Table */}
          <div className="mt-5 overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950/90">
            <div className="max-h-[480px] overflow-auto">
              <table className="min-w-full text-sm">
                <thead className="sticky top-0 z-10 bg-slate-950/95 text-[11px] uppercase tracking-[0.16em] text-slate-400 backdrop-blur-sm">
                  <tr>
                    <th className="px-4 py-3 text-left w-[70px]">STT</th>
                    <th className="px-4 py-3 text-left">Họ tên</th>
                    <th className="px-4 py-3 text-left">Email</th>
                    <th className="px-4 py-3 text-left whitespace-nowrap">
                      Số điện thoại
                    </th>
                    <th className="px-4 py-3 text-left">Lời nhắn</th>
                  </tr>
                </thead>
                <tbody>
                  {loading && (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-4 py-10 text-center text-xs text-slate-400"
                      >
                        Đang tải dữ liệu từ API...
                      </td>
                    </tr>
                  )}

                  {!loading && filteredItems.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-4 py-10 text-center text-xs text-slate-500"
                      >
                        Không tìm thấy entry nào phù hợp với bộ lọc hiện tại.
                      </td>
                    </tr>
                  )}

                  {!loading &&
                    filteredItems.map((user, idx) => {
                      const fullName = `${user.firstName ?? ""} ${
                        user.lastName ?? ""
                      }`.trim();
                      const index =
                        (currentPage - 1) * (meta?.pageSize ?? size) + idx + 1;

                      return (
                        <tr
                          key={`${user.email}-${idx}`}
                          className="border-t border-slate-800/80 bg-slate-900/60 transition-all duration-150 hover:-translate-y-[1px] hover:border-sky-500/60 hover:bg-slate-900"
                        >
                          {/* STT */}
                          <td className="px-4 py-3 align-middle text-xs text-slate-400">
                            {index}
                          </td>

                          {/* Họ tên */}
                          <td className="px-4 py-3 align-middle">
                            <p className="text-sm font-medium text-slate-50">
                              {fullName || "(Chưa có tên)"}
                            </p>
                          </td>

                          {/* Email */}
                          <td className="px-4 py-3 align-middle">
                            <p className="text-xs text-slate-200">
                              {user.email || "—"}
                            </p>
                          </td>

                          {/* Phone */}
                          <td className="px-4 py-3 align-middle">
                            <p className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1 text-[11px] text-slate-100">
                              {user.phoneNumber || "—"}
                            </p>
                          </td>

                          {/* Wish message */}
                          <td className="px-4 py-3 align-middle">
                            <p className="text-xs text-slate-200 line-clamp-2">
                              {user.wishMessage || "—"}
                            </p>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="mt-4 flex flex-col gap-2 text-xs text-slate-400 md:flex-row md:items-center md:justify-between">
            <div>
              Trang{" "}
              <span className="font-semibold text-slate-100">
                {currentPage}
              </span>{" "}
              /{" "}
              <span className="font-semibold text-slate-100">{totalPages}</span>{" "}
              · Mỗi trang{" "}
              <span className="font-semibold text-slate-100">
                {meta?.pageSize ?? size}
              </span>{" "}
              entries
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevPage}
                disabled={!meta?.hasPreviousPage || loading}
                className="rounded-full border border-slate-700 bg-slate-900 px-4 py-1.5 text-[11px] text-slate-200 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:border-slate-800 disabled:bg-slate-950 disabled:text-slate-500"
              >
                Trang trước
              </button>
              <button
                onClick={handleNextPage}
                disabled={!meta?.hasNextPage || loading}
                className="rounded-full border border-sky-500/70 bg-sky-900/30 px-4 py-1.5 text-[11px] text-sky-100 transition hover:bg-sky-700/40 disabled:cursor-not-allowed disabled:border-slate-800 disabled:bg-slate-950 disabled:text-slate-500"
              >
                Trang sau
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
