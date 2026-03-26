import { useState, useEffect } from "react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import {
  LayoutDashboard, Package, Users, Wrench, TrendingUp, Bell,
  Search, AlertCircle, CheckCircle, Clock, Plus, Download,
  ArrowUpRight, ArrowDownRight, DollarSign, FileText, UserCheck,
  Filter, MoreVertical, Activity, Target, Award, Wallet,
  UserPlus, Building2, Menu, Zap, BarChart2, ClipboardList, Star
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════════════
   FONTS
═══════════════════════════════════════════════════════════════════════ */
const FontLoader = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&display=swap";
    document.head.appendChild(link);
  }, []);
  return null;
};

/* ═══════════════════════════════════════════════════════════════════════
   TOAST SYSTEM
═══════════════════════════════════════════════════════════════════════ */
let _setToasts = null;
export const toast = (msg, type = "info") => {
  if (_setToasts) _setToasts(prev => [...prev, { id: Date.now() + Math.random(), msg, type }]);
};

const ToastContainer = () => {
  const [toasts, setToasts] = useState([]);
  useEffect(() => { _setToasts = setToasts; return () => { _setToasts = null; }; }, []);
  useEffect(() => {
    if (!toasts.length) return;
    const t = setTimeout(() => setToasts(p => p.slice(1)), 3000);
    return () => clearTimeout(t);
  }, [toasts]);
  const iconMap = { success: CheckCircle, error: AlertCircle, info: Activity, warn: Clock };
  const colorMap = { success: C => ({ c: C.green, bg: C.greenL }), error: C => ({ c: C.red, bg: C.redL }), info: C => ({ c: C.blue, bg: C.blueL }), warn: C => ({ c: C.orange, bg: C.orangeL }) };
  return (
    <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 9999, display: "flex", flexDirection: "column", gap: 8, pointerEvents: "none" }}>
      {toasts.map(t => {
        const Icon = iconMap[t.type] || Activity;
        const { c, bg } = (colorMap[t.type] || colorMap.info)(C);
        return (
          <div key={t.id} style={{ background: bg, border: `1.5px solid ${c}`, borderRadius: 10, padding: "12px 18px", display: "flex", alignItems: "center", gap: 10, boxShadow: "0 4px 16px rgba(0,0,0,0.1)", minWidth: 260, animation: "slideIn 0.2s ease" }}>
            <Icon size={15} color={c} />
            <span style={{ fontSize: 13, fontWeight: 600, color: c }}>{t.msg}</span>
          </div>
        );
      })}
      <style>{`@keyframes slideIn { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }`}</style>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════
   COLOR PALETTE
═══════════════════════════════════════════════════════════════════════ */
const C = {
  red: "#DC2626", redL: "#FEF2F2",
  navy: "#0F172A", navyMid: "#1E293B", navyL: "#334155",
  slate: "#64748B", slateL: "#94A3B8",
  bg: "#F1F5F9", card: "#FFFFFF", border: "#E2E8F0",
  green: "#16A34A", greenL: "#F0FDF4",
  orange: "#EA580C", orangeL: "#FFF7ED",
  blue: "#2563EB", blueL: "#EFF6FF",
  purple: "#7C3AED", purpleL: "#F5F3FF",
  text: "#0F172A", textMid: "#475569", textL: "#94A3B8",
};

/* ═══════════════════════════════════════════════════════════════════════
   DEMO DATA
═══════════════════════════════════════════════════════════════════════ */
const revenueData = [
  { bulan: "Okt", aktual: 2.8, target: 3.0, unit: 45 },
  { bulan: "Nov", aktual: 3.1, target: 3.0, unit: 51 },
  { bulan: "Des", aktual: 4.2, target: 3.5, unit: 68 },
  { bulan: "Jan", aktual: 3.6, target: 3.8, unit: 59 },
  { bulan: "Feb", aktual: 4.1, target: 4.0, unit: 67 },
  { bulan: "Mar", aktual: 4.8, target: 4.2, unit: 79 },
];

const modelData = [
  { name: "BEAT", value: 38, color: C.red },
  { name: "VARIO 125", value: 22, color: C.blue },
  { name: "SCOOPY", value: 15, color: C.purple },
  { name: "VARIO 160", value: 12, color: C.orange },
  { name: "PCX 160", value: 8, color: C.green },
  { name: "Lainnya", value: 5, color: C.slate },
];

const branchData = [
  { cabang: "Tegal Kota", sales: 23, target: 20 },
  { cabang: "Slawi", sales: 18, target: 20 },
  { cabang: "Brebes", sales: 15, target: 18 },
  { cabang: "Bumiayu", sales: 12, target: 15 },
  { cabang: "Ketanggungan", sales: 9, target: 10 },
  { cabang: "Pagerbarang", sales: 7, target: 8 },
];

const inventory = [
  { id: "NMM-0001", model: "Honda BEAT Street", warna: "Hitam Elegan", tahun: 2024, stok: 12, harga: 17500000, cabang: "Tegal Kota", status: "Tersedia" },
  { id: "NMM-0002", model: "Honda BEAT Street", warna: "Merah Marun", tahun: 2024, stok: 5, harga: 17500000, cabang: "Slawi", status: "Tersedia" },
  { id: "NMM-0003", model: "Honda VARIO 125", warna: "Biru Metalik", tahun: 2024, stok: 8, harga: 22800000, cabang: "Tegal Kota", status: "Tersedia" },
  { id: "NMM-0004", model: "Honda SCOOPY", warna: "Putih Susu", tahun: 2024, stok: 3, harga: 23900000, cabang: "Brebes", status: "Hampir Habis" },
  { id: "NMM-0005", model: "Honda VARIO 160", warna: "Hitam Doff", tahun: 2024, stok: 6, harga: 28500000, cabang: "Tegal Kota", status: "Tersedia" },
  { id: "NMM-0006", model: "Honda PCX 160", warna: "Silver", tahun: 2024, stok: 2, harga: 37500000, cabang: "Slawi", status: "Hampir Habis" },
  { id: "NMM-0007", model: "Honda ADV 160", warna: "Merah Racing", tahun: 2024, stok: 4, harga: 42000000, cabang: "Tegal Kota", status: "Tersedia" },
  { id: "NMM-0008", model: "Honda CBR 150R", warna: "Hitam Merah", tahun: 2024, stok: 1, harga: 38500000, cabang: "Bumiayu", status: "Stok Kritis" },
  { id: "NMM-0009", model: "Honda CRF 150L", warna: "Merah Putih", tahun: 2024, stok: 0, harga: 37000000, cabang: "Brebes", status: "Habis" },
  { id: "NMM-0010", model: "Honda GENIO", warna: "Ungu Pastel", tahun: 2024, stok: 7, harga: 19500000, cabang: "Ketanggungan", status: "Tersedia" },
  { id: "NMM-0011", model: "Honda STYLO 160", warna: "Krem Matte", tahun: 2024, stok: 4, harga: 29500000, cabang: "Brebes", status: "Tersedia" },
  { id: "NMM-0012", model: "Honda REVO X", warna: "Hitam Sporty", tahun: 2024, stok: 9, harga: 16800000, cabang: "Pagerbarang", status: "Tersedia" },
];

const customers = [
  { id: "C-001", nama: "Budi Santoso", phone: "0812-3456-7890", kota: "Tegal", status: "Hot Lead", nilai: 22800000, sales: "Rina W.", tanggal: "25 Mar" },
  { id: "C-002", nama: "Siti Rahayu", phone: "0813-9876-5432", kota: "Slawi", status: "Negosiasi", nilai: 37500000, sales: "Dodi P.", tanggal: "25 Mar" },
  { id: "C-003", nama: "Ahmad Fauzi", phone: "0857-1122-3344", kota: "Brebes", status: "Closing", nilai: 17500000, sales: "Rina W.", tanggal: "24 Mar" },
  { id: "C-004", nama: "Dewi Lestari", phone: "0821-5566-7788", kota: "Tegal", status: "Prospek", nilai: 42000000, sales: "Hendra K.", tanggal: "24 Mar" },
  { id: "C-005", nama: "Rizky Pratama", phone: "0877-9900-1122", kota: "Bumiayu", status: "Hot Lead", nilai: 28500000, sales: "Dodi P.", tanggal: "23 Mar" },
  { id: "C-006", nama: "Nur Hidayah", phone: "0895-4433-2211", kota: "Tegal", status: "Closing", nilai: 23900000, sales: "Hendra K.", tanggal: "23 Mar" },
  { id: "C-007", nama: "Dian Wahyu", phone: "0811-2233-4455", kota: "Ketanggungan", status: "Prospek", nilai: 19500000, sales: "Rina W.", tanggal: "22 Mar" },
  { id: "C-008", nama: "Faris Aldrian", phone: "0856-7788-9900", kota: "Slawi", status: "Negosiasi", nilai: 38500000, sales: "Dodi P.", tanggal: "22 Mar" },
  { id: "C-009", nama: "Hartini Susanti", phone: "0819-5544-3322", kota: "Tegal", status: "Hot Lead", nilai: 29500000, sales: "Nurul A.", tanggal: "21 Mar" },
  { id: "C-010", nama: "Suprapto Hadi", phone: "0823-1100-9988", kota: "Brebes", status: "Prospek", nilai: 17500000, sales: "Hendra K.", tanggal: "21 Mar" },
  { id: "C-011", nama: "Ratna Komala", phone: "0851-6677-8899", kota: "Tegal", status: "Negosiasi", nilai: 37000000, sales: "Rina W.", tanggal: "20 Mar" },
  { id: "C-012", nama: "Gunawan Putra", phone: "0878-3322-1100", kota: "Bumiayu", status: "Closing", nilai: 28500000, sales: "Dodi P.", tanggal: "20 Mar" },
  { id: "C-013", nama: "Lia Marliana", phone: "0896-0011-2233", kota: "Slawi", status: "Prospek", nilai: 19500000, sales: "Nurul A.", tanggal: "19 Mar" },
  { id: "C-014", nama: "Teguh Wibowo", phone: "0812-8899-7766", kota: "Tegal", status: "Hot Lead", nilai: 42000000, sales: "Hendra K.", tanggal: "18 Mar" },
  { id: "C-015", nama: "Indah Permata", phone: "0858-4455-6677", kota: "Ketanggungan", status: "Closing", nilai: 22800000, sales: "Rina W.", tanggal: "17 Mar" },
  { id: "C-016", nama: "Wahyu Nugroho", phone: "0821-0099-8855", kota: "Brebes", status: "Negosiasi", nilai: 38500000, sales: "Dodi P.", tanggal: "16 Mar" },
];

const serviceOrders = [
  { id: "SVC-0254", pelanggan: "Bambang S.", motor: "Honda BEAT 2023", plat: "G 4521 XB", keluhan: "Tune up + ganti oli", teknisi: "Eko S.", status: "Selesai", jam: "08:00", est: "09:30", cabang: "Tegal Kota" },
  { id: "SVC-0255", pelanggan: "Wulan P.", motor: "Honda VARIO 125 2022", plat: "G 7832 AB", keluhan: "Ganti kampas rem + cek karbu", teknisi: "Fajar R.", status: "Selesai", jam: "08:30", est: "10:00", cabang: "Tegal Kota" },
  { id: "SVC-0256", pelanggan: "Harun N.", motor: "Honda PCX 160 2024", plat: "G 1234 YC", keluhan: "Service berkala 8.000 km", teknisi: "Eko S.", status: "Dikerjakan", jam: "09:00", est: "10:30", cabang: "Slawi" },
  { id: "SVC-0257", pelanggan: "Lina M.", motor: "Honda SCOOPY 2021", plat: "G 9988 SD", keluhan: "Mogok, aki lemah", teknisi: "Budi T.", status: "Selesai", jam: "09:30", est: "11:00", cabang: "Slawi" },
  { id: "SVC-0258", pelanggan: "Tono A.", motor: "Honda CBR 150R 2023", plat: "G 5577 RF", keluhan: "Ganti rantai + sproket", teknisi: "Fajar R.", status: "Dikerjakan", jam: "10:00", est: "12:00", cabang: "Brebes" },
  { id: "SVC-0259", pelanggan: "Maya S.", motor: "Honda ADV 160 2024", plat: "G 3344 TG", keluhan: "Service berkala 4.000 km (KPB)", teknisi: "Budi T.", status: "Dikerjakan", jam: "10:30", est: "12:00", cabang: "Tegal Kota" },
  { id: "SVC-0260", pelanggan: "Gilang R.", motor: "Honda GENIO 2022", plat: "G 6611 MN", keluhan: "Bunyi aneh di mesin", teknisi: "Eko S.", status: "Antri", jam: "11:00", est: "12:30", cabang: "Bumiayu" },
  { id: "SVC-0261", pelanggan: "Parno W.", motor: "Honda BEAT 2022", plat: "G 8800 KJ", keluhan: "Ganti oli + filter udara", teknisi: "Sigit M.", status: "Antri", jam: "11:30", est: "13:00", cabang: "Brebes" },
  { id: "SVC-0262", pelanggan: "Sumiati D.", motor: "Honda REVO X 2023", plat: "G 3312 PL", keluhan: "Tune up rutin 6.000 km", teknisi: "Andi K.", status: "Antri", jam: "12:00", est: "13:30", cabang: "Ketanggungan" },
  { id: "SVC-0263", pelanggan: "Heri S.", motor: "Honda STYLO 160 2024", plat: "G 7743 QR", keluhan: "Rem belakang blong", teknisi: "Fajar R.", status: "Antri", jam: "12:30", est: "14:00", cabang: "Tegal Kota" },
  { id: "SVC-0264", pelanggan: "Lastri W.", motor: "Honda VARIO 160 2024", plat: "G 2290 UV", keluhan: "Service berkala 12.000 km + busi", teknisi: "Eko S.", status: "Antri", jam: "13:00", est: "14:30", cabang: "Slawi" },
  { id: "SVC-0265", pelanggan: "Prasetyo H.", motor: "Honda CRF 150L 2023", plat: "G 5544 ZA", keluhan: "Ganti ban depan + balancing", teknisi: "Budi T.", status: "Antri", jam: "13:30", est: "15:00", cabang: "Pagerbarang" },
  { id: "SVC-0266", pelanggan: "Novita R.", motor: "Honda SCOOPY 2023", plat: "G 9081 BC", keluhan: "Servis CVT + ganti V-belt", teknisi: "Sigit M.", status: "Antri", jam: "14:00", est: "15:30", cabang: "Tegal Kota" },
  { id: "SVC-0267", pelanggan: "Slamet B.", motor: "Honda BEAT 2021", plat: "G 4456 DE", keluhan: "Aki drop, ganti baru", teknisi: "Andi K.", status: "Antri", jam: "14:30", est: "15:45", cabang: "Brebes" },
  { id: "SVC-0268", pelanggan: "Fitri N.", motor: "Honda PCX 160 2023", plat: "G 7722 FG", keluhan: "Service berkala 20.000 km", teknisi: "Eko S.", status: "Antri", jam: "15:00", est: "17:00", cabang: "Tegal Kota" },
];

const employees = [
  { id: "EMP-001", nama: "Rudi Hartono", jabatan: "Branch Manager", dept: "Manajemen", cabang: "Tegal Kota", status: "Aktif", gaji: 12500000, join: "Jan 2019", av: "RH" },
  { id: "EMP-002", nama: "Susanto Wijoyo", jabatan: "Deputy Manager", dept: "Manajemen", cabang: "Slawi", status: "Aktif", gaji: 10000000, join: "Mar 2019", av: "SW" },
  { id: "EMP-003", nama: "Rina Wulandari", jabatan: "Sales Executive", dept: "Sales", cabang: "Tegal Kota", status: "Aktif", gaji: 5200000, join: "Mar 2021", av: "RW" },
  { id: "EMP-004", nama: "Dodi Prasetyo", jabatan: "Sales Executive", dept: "Sales", cabang: "Slawi", status: "Aktif", gaji: 5000000, join: "Jun 2020", av: "DP" },
  { id: "EMP-005", nama: "Hendra Kusuma", jabatan: "Senior Sales", dept: "Sales", cabang: "Brebes", status: "Aktif", gaji: 6500000, join: "Feb 2018", av: "HK" },
  { id: "EMP-006", nama: "Nurul Aini", jabatan: "Sales Executive", dept: "Sales", cabang: "Bumiayu", status: "Aktif", gaji: 4800000, join: "Oct 2022", av: "NA" },
  { id: "EMP-007", nama: "Wahyu Setiawan", jabatan: "Sales Executive", dept: "Sales", cabang: "Tegal Kota", status: "Aktif", gaji: 5000000, join: "Jan 2023", av: "WS" },
  { id: "EMP-008", nama: "Desi Ratnasari", jabatan: "Sales Executive", dept: "Sales", cabang: "Brebes", status: "Aktif", gaji: 4800000, join: "Apr 2023", av: "DR" },
  { id: "EMP-009", nama: "Eko Santoso", jabatan: "Kepala Mekanik", dept: "Workshop", cabang: "Tegal Kota", status: "Aktif", gaji: 8500000, join: "Sep 2017", av: "ES" },
  { id: "EMP-010", nama: "Fajar Ramadan", jabatan: "Mekanik Senior", dept: "Workshop", cabang: "Tegal Kota", status: "Aktif", gaji: 6500000, join: "Jul 2019", av: "FR" },
  { id: "EMP-011", nama: "Budi Trianto", jabatan: "Mekanik", dept: "Workshop", cabang: "Slawi", status: "Aktif", gaji: 5000000, join: "Nov 2021", av: "BT" },
  { id: "EMP-012", nama: "Sigit Mulyadi", jabatan: "Mekanik", dept: "Workshop", cabang: "Brebes", status: "Aktif", gaji: 4800000, join: "Mar 2022", av: "SM" },
  { id: "EMP-013", nama: "Andi Kurniawan", jabatan: "Mekanik", dept: "Workshop", cabang: "Ketanggungan", status: "Aktif", gaji: 4600000, join: "Jun 2022", av: "AK" },
  { id: "EMP-014", nama: "Bambang Irawan", jabatan: "Mekanik Junior", dept: "Workshop", cabang: "Bumiayu", status: "Aktif", gaji: 4000000, join: "Feb 2024", av: "BI" },
  { id: "EMP-015", nama: "Sari Dewi", jabatan: "Admin & CS", dept: "Administrasi", cabang: "Tegal Kota", status: "Aktif", gaji: 4500000, join: "Apr 2022", av: "SD" },
  { id: "EMP-016", nama: "Tri Wahyuni", jabatan: "Admin & CS", dept: "Administrasi", cabang: "Slawi", status: "Aktif", gaji: 4200000, join: "Aug 2022", av: "TW" },
  { id: "EMP-017", nama: "Endang Susilowati", jabatan: "Admin & CS", dept: "Administrasi", cabang: "Brebes", status: "Aktif", gaji: 4000000, join: "Jan 2023", av: "ES" },
  { id: "EMP-018", nama: "Agus Mulyono", jabatan: "Finance Staff", dept: "Keuangan", cabang: "Tegal Kota", status: "Aktif", gaji: 6000000, join: "Jan 2020", av: "AM" },
  { id: "EMP-019", nama: "Lestari Handayani", jabatan: "Accounting Staff", dept: "Keuangan", cabang: "Tegal Kota", status: "Aktif", gaji: 5500000, join: "Mar 2021", av: "LH" },
  { id: "EMP-020", nama: "Yanti Pratiwi", jabatan: "HR Officer", dept: "HR", cabang: "Tegal Kota", status: "Aktif", gaji: 6000000, join: "Aug 2021", av: "YP" },
  { id: "EMP-021", nama: "Rizal Hidayat", jabatan: "Warehouse Staff", dept: "Logistik", cabang: "Tegal Kota", status: "Cuti", gaji: 4200000, join: "Feb 2023", av: "RH" },
  { id: "EMP-022", nama: "Prasetyo Budi", jabatan: "Warehouse Staff", dept: "Logistik", cabang: "Brebes", status: "Aktif", gaji: 4000000, join: "Sep 2023", av: "PB" },
  { id: "EMP-023", nama: "Marlina Sari", jabatan: "Sales Executive", dept: "Sales", cabang: "Ketanggungan", status: "Aktif", gaji: 4800000, join: "Nov 2023", av: "MS" },
  { id: "EMP-024", nama: "Gunadi Santosa", jabatan: "Mekanik Junior", dept: "Workshop", cabang: "Pagerbarang", status: "Aktif", gaji: 4000000, join: "Jan 2024", av: "GS" },
  { id: "EMP-025", nama: "Fitri Handayani", jabatan: "Admin & CS", dept: "Administrasi", cabang: "Bumiayu", status: "Aktif", gaji: 4000000, join: "Mar 2024", av: "FH" },
];

const financeMonthly = [
  { bulan: "Okt", rev: 2800, hpp: 1900, gross: 900, opex: 400, net: 500 },
  { bulan: "Nov", rev: 3100, hpp: 2150, gross: 950, opex: 420, net: 530 },
  { bulan: "Des", rev: 4200, hpp: 2900, gross: 1300, opex: 450, net: 850 },
  { bulan: "Jan", rev: 3600, hpp: 2500, gross: 1100, opex: 430, net: 670 },
  { bulan: "Feb", rev: 4100, hpp: 2800, gross: 1300, opex: 440, net: 860 },
  { bulan: "Mar", rev: 4800, hpp: 3300, gross: 1500, opex: 460, net: 1040 },
];

const expenses = [
  { name: "Gaji & Tunjangan", value: 180, color: C.blue },
  { name: "Operasional Bengkel", value: 85, color: C.orange },
  { name: "Marketing", value: 65, color: C.purple },
  { name: "Sewa & Utilitas", value: 70, color: C.green },
  { name: "Lainnya", value: 60, color: C.slate },
];

/* ═══════════════════════════════════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════════════════════════════════ */
const fmt = (n) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);

const avColors = [C.red, C.blue, C.green, C.purple, C.orange, "#0891B2", "#DB2777", "#65A30D"];

const Badge = ({ label }) => {
  const map = {
    Tersedia: { bg: C.greenL, c: C.green },
    "Hampir Habis": { bg: C.orangeL, c: C.orange },
    "Stok Kritis": { bg: C.redL, c: C.red },
    Habis: { bg: "#F1F5F9", c: C.slate },
    Selesai: { bg: C.greenL, c: C.green },
    Dikerjakan: { bg: C.blueL, c: C.blue },
    Antri: { bg: C.orangeL, c: C.orange },
    "Hot Lead": { bg: C.redL, c: C.red },
    Negosiasi: { bg: C.orangeL, c: C.orange },
    Closing: { bg: C.greenL, c: C.green },
    Prospek: { bg: C.blueL, c: C.blue },
    Aktif: { bg: C.greenL, c: C.green },
    Cuti: { bg: C.orangeL, c: C.orange },
  };
  const s = map[label] || { bg: "#F1F5F9", c: C.slate };
  return (
    <span style={{ background: s.bg, color: s.c, padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, whiteSpace: "nowrap" }}>
      {label}
    </span>
  );
};

const KPI = ({ icon: Icon, label, value, change, sub, color = C.red, bg = C.redL }) => (
  <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: "20px 22px" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
      <div style={{ background: bg, borderRadius: 10, padding: 10 }}>
        <Icon size={19} color={color} />
      </div>
      {change !== undefined && (
        <span style={{ fontSize: 11, color: change >= 0 ? C.green : C.red, background: change >= 0 ? C.greenL : C.redL, padding: "3px 8px", borderRadius: 20, fontWeight: 600, display: "flex", alignItems: "center", gap: 3 }}>
          {change >= 0 ? <ArrowUpRight size={11} /> : <ArrowDownRight size={11} />}
          {Math.abs(change)}%
        </span>
      )}
    </div>
    <div style={{ fontSize: 26, fontWeight: 800, color: C.text, letterSpacing: "-0.5px" }}>{value}</div>
    <div style={{ fontSize: 12, color: C.textMid, marginTop: 3 }}>{label}</div>
    {sub && <div style={{ fontSize: 11, color: C.textL, marginTop: 4 }}>{sub}</div>}
  </div>
);

const SectionCard = ({ title, subtitle, children, action }) => (
  <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden" }}>
    <div style={{ padding: "18px 22px", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div>
        <div style={{ fontWeight: 700, fontSize: 14, color: C.text }}>{title}</div>
        {subtitle && <div style={{ fontSize: 12, color: C.textMid, marginTop: 2 }}>{subtitle}</div>}
      </div>
      {action}
    </div>
    {children}
  </div>
);

const Btn = ({ children, variant = "primary", ...props }) => (
  <button {...props} style={{
    background: variant === "primary" ? C.red : C.bg,
    color: variant === "primary" ? "#fff" : C.textMid,
    border: variant === "primary" ? "none" : `1px solid ${C.border}`,
    borderRadius: 8, padding: "7px 14px", fontSize: 12, fontWeight: 600,
    cursor: "pointer", display: "flex", alignItems: "center", gap: 5,
    ...(props.style || {}),
  }}>
    {children}
  </button>
);

/* ═══════════════════════════════════════════════════════════════════════
   MODULE: DASHBOARD
═══════════════════════════════════════════════════════════════════════ */
function Dashboard() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
        <KPI icon={DollarSign} label="Pendapatan Bulan Ini" value="Rp 4,8M" change={17} sub="Target: Rp 4,2M ✓" color={C.red} bg={C.redL} />
        <KPI icon={BarChart2} label="Unit Terjual (MTD)" value="79 unit" change={18} sub="Target 75 unit · 105%" color={C.blue} bg={C.blueL} />
        <KPI icon={Wrench} label="Service Order Aktif" value="34 order" change={-8} sub="7 selesai hari ini" color={C.orange} bg={C.orangeL} />
        <KPI icon={UserPlus} label="Prospek Baru" value="28 leads" change={12} sub="7 hari terakhir" color={C.green} bg={C.greenL} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16 }}>
        <SectionCard
          title="Tren Pendapatan vs Target"
          subtitle="6 bulan terakhir (Rp Miliar)"
          action={<select style={{ border: `1px solid ${C.border}`, borderRadius: 8, padding: "5px 10px", fontSize: 12, color: C.textMid }}><option>6 Bulan Terakhir</option></select>}
        >
          <div style={{ padding: "20px 22px" }}>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="gR" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={C.red} stopOpacity={0.15} />
                    <stop offset="95%" stopColor={C.red} stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gB" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={C.blue} stopOpacity={0.1} />
                    <stop offset="95%" stopColor={C.blue} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                <XAxis dataKey="bulan" tick={{ fontSize: 11, fill: C.textL }} />
                <YAxis tick={{ fontSize: 11, fill: C.textL }} />
                <Tooltip formatter={(v) => [`Rp ${v}M`, ""]} contentStyle={{ borderRadius: 8, border: `1px solid ${C.border}`, fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Area type="monotone" dataKey="aktual" name="Aktual" stroke={C.red} strokeWidth={2.5} fill="url(#gR)" />
                <Area type="monotone" dataKey="target" name="Target" stroke={C.blue} strokeWidth={1.5} strokeDasharray="5 5" fill="url(#gB)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="Penjualan per Model" subtitle="Bulan berjalan">
          <div style={{ padding: "16px 22px" }}>
            <ResponsiveContainer width="100%" height={150}>
              <PieChart>
                <Pie data={modelData} cx="50%" cy="50%" innerRadius={45} outerRadius={68} paddingAngle={3} dataKey="value">
                  {modelData.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip formatter={(v) => [`${v} unit`, ""]} contentStyle={{ borderRadius: 8, fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ display: "flex", flexDirection: "column", gap: 7, marginTop: 6 }}>
              {modelData.slice(0, 5).map((m) => (
                <div key={m.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    <div style={{ width: 8, height: 8, borderRadius: 2, background: m.color, flexShrink: 0 }} />
                    <span style={{ fontSize: 12, color: C.textMid }}>{m.name}</span>
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 700, color: C.text }}>{m.value} unit</span>
                </div>
              ))}
            </div>
          </div>
        </SectionCard>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 16 }}>
        <SectionCard title="Performa Cabang" subtitle="Sales vs Target — Maret 2026">
          <div style={{ padding: "16px 22px" }}>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={branchData} layout="vertical" barSize={10} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.border} horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11, fill: C.textL }} />
                <YAxis dataKey="cabang" type="category" width={100} tick={{ fontSize: 11, fill: C.textMid }} />
                <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="target" name="Target" fill={C.border} radius={[0, 4, 4, 0]} />
                <Bar dataKey="sales" name="Aktual" fill={C.red} radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="Notifikasi Sistem" subtitle="Real-time alerts">
          <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { icon: AlertCircle, c: C.red, bg: C.redL, title: "Stok CBR 150R kritis", desc: "Sisa 1 unit · Bumiayu", t: "5 mnt lalu" },
              { icon: AlertCircle, c: C.orange, bg: C.orangeL, title: "SCOOPY hampir habis", desc: "Sisa 3 unit · Brebes", t: "12 mnt lalu" },
              { icon: CheckCircle, c: C.green, bg: C.greenL, title: "SVC-0254 selesai", desc: "Bambang S. — BEAT", t: "30 mnt lalu" },
              { icon: Activity, c: C.blue, bg: C.blueL, title: "Target Maret tercapai", desc: "79/75 unit (105%)", t: "1 jam lalu" },
              { icon: Clock, c: C.purple, bg: C.purpleL, title: "8 jadwal KPB hari ini", desc: "Lihat modul Workshop", t: "2 jam lalu" },
            ].map((a, i) => (
              <div key={i} style={{ display: "flex", gap: 10, padding: "10px 12px", background: a.bg, borderRadius: 8 }}>
                <a.icon size={15} color={a.c} style={{ marginTop: 1, flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: C.text }}>{a.title}</div>
                  <div style={{ fontSize: 11, color: C.textMid }}>{a.desc}</div>
                </div>
                <span style={{ fontSize: 10, color: C.textL, whiteSpace: "nowrap", flexShrink: 0 }}>{a.t}</span>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   MODULE: INVENTORY
═══════════════════════════════════════════════════════════════════════ */
function Inventory() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Semua");

  const filtered = inventory.filter(item => {
    const ms = item.model.toLowerCase().includes(search.toLowerCase()) || item.cabang.toLowerCase().includes(search.toLowerCase());
    const mf = filter === "Semua" || item.status === filter;
    return ms && mf;
  });

  const totalUnit = inventory.reduce((s, i) => s + i.stok, 0);
  const totalNilai = inventory.reduce((s, i) => s + i.stok * i.harga, 0);
  const tersedia = inventory.filter(i => i.status === "Tersedia").reduce((s, i) => s + i.stok, 0);
  const kritis = inventory.filter(i => i.status === "Stok Kritis" || i.status === "Habis").length;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
        <KPI icon={Package} label="Total Unit Stok" value={`${totalUnit} unit`} color={C.blue} bg={C.blueL} />
        <KPI icon={DollarSign} label="Nilai Inventory" value={`Rp ${(totalNilai / 1e9).toFixed(1)}M`} color={C.green} bg={C.greenL} />
        <KPI icon={CheckCircle} label="Unit Tersedia" value={`${tersedia} unit`} color={C.purple} bg={C.purpleL} />
        <KPI icon={AlertCircle} label="Item Kritis/Habis" value={`${kritis} item`} color={C.red} bg={C.redL} />
      </div>

      <SectionCard
        title="Daftar Stok Motor"
        subtitle={`${filtered.length} dari ${inventory.length} item`}
        action={
          <div style={{ display: "flex", gap: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: "6px 12px" }}>
              <Search size={13} color={C.textL} />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari model / cabang..." style={{ border: "none", background: "transparent", fontSize: 12, color: C.text, outline: "none", width: 150 }} />
            </div>
            <select value={filter} onChange={e => setFilter(e.target.value)} style={{ border: `1px solid ${C.border}`, borderRadius: 8, padding: "6px 10px", fontSize: 12, color: C.textMid, background: C.bg }}>
              {["Semua", "Tersedia", "Hampir Habis", "Stok Kritis", "Habis"].map(o => <option key={o}>{o}</option>)}
            </select>
            <Btn onClick={() => toast("Form tambah unit akan segera hadir", "info")}><Plus size={13} /> Tambah Unit</Btn>
          </div>
        }
      >
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
            <thead>
              <tr style={{ background: C.bg }}>
                {["ID", "Model", "Warna", "Thn", "Harga Jual", "Stok", "Cabang", "Status", ""].map(h => (
                  <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontWeight: 600, color: C.textMid, fontSize: 11, whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, i) => (
                <tr key={item.id} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? C.card : "#F8FAFC" }}>
                  <td style={{ padding: "11px 16px", fontFamily: "monospace", fontSize: 11, color: C.textL }}>{item.id}</td>
                  <td style={{ padding: "11px 16px", fontWeight: 600, color: C.text }}>{item.model}</td>
                  <td style={{ padding: "11px 16px", color: C.textMid }}>{item.warna}</td>
                  <td style={{ padding: "11px 16px", color: C.textMid }}>{item.tahun}</td>
                  <td style={{ padding: "11px 16px", fontWeight: 500, color: C.text }}>{fmt(item.harga)}</td>
                  <td style={{ padding: "11px 16px" }}>
                    <span style={{ fontWeight: 800, fontSize: 14, color: item.stok === 0 ? C.red : item.stok <= 2 ? C.orange : C.text }}>{item.stok}</span>
                  </td>
                  <td style={{ padding: "11px 16px", color: C.textMid }}>{item.cabang}</td>
                  <td style={{ padding: "11px 16px" }}><Badge label={item.status} /></td>
                  <td style={{ padding: "11px 16px" }}>
                    <button onClick={() => toast(`Edit stok ${item.model} – ${item.cabang}`, "info")} style={{ background: C.blueL, border: "none", borderRadius: 6, padding: "4px 10px", cursor: "pointer", color: C.blue, fontSize: 11, fontWeight: 600 }}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   MODULE: SALES & CRM
═══════════════════════════════════════════════════════════════════════ */
function Sales() {
  const [tab, setTab] = useState("kanban");

  const stages = ["Prospek", "Hot Lead", "Negosiasi", "Closing"];
  const stageStyle = {
    Prospek: { c: C.blue, bg: C.blueL, dot: "#BFDBFE" },
    "Hot Lead": { c: C.red, bg: C.redL, dot: "#FCA5A5" },
    Negosiasi: { c: C.orange, bg: C.orangeL, dot: "#FED7AA" },
    Closing: { c: C.green, bg: C.greenL, dot: "#BBF7D0" },
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
        <KPI icon={Users} label="Total Prospek Aktif" value="28 leads" color={C.blue} bg={C.blueL} />
        <KPI icon={DollarSign} label="Nilai Pipeline" value="Rp 892M" color={C.green} bg={C.greenL} />
        <KPI icon={Award} label="Closing Bulan Ini" value="12 deal" change={20} color={C.red} bg={C.redL} />
        <KPI icon={Target} label="Konversi Rate" value="42%" change={5} color={C.purple} bg={C.purpleL} />
      </div>

      {/* Tab toggle */}
      <div style={{ display: "flex", gap: 0, background: C.bg, padding: 4, borderRadius: 10, width: "fit-content", border: `1px solid ${C.border}` }}>
        {[["kanban", "🗂  Kanban Pipeline"], ["list", "📋  Daftar Pelanggan"]].map(([k, l]) => (
          <button key={k} onClick={() => setTab(k)} style={{ background: tab === k ? C.card : "transparent", border: "none", borderRadius: 8, padding: "7px 20px", fontSize: 12, fontWeight: tab === k ? 700 : 400, color: tab === k ? C.text : C.textMid, cursor: "pointer", boxShadow: tab === k ? "0 1px 3px rgba(0,0,0,0.08)" : "none", transition: "all 0.15s" }}>
            {l}
          </button>
        ))}
      </div>

      {tab === "kanban" ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
          {stages.map(stage => {
            const items = customers.filter(c => c.status === stage);
            const s = stageStyle[stage];
            return (
              <div key={stage} style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 12, padding: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: s.c }} />
                    <span style={{ fontWeight: 700, fontSize: 13, color: s.c }}>{stage}</span>
                  </div>
                  <span style={{ background: s.bg, color: s.c, borderRadius: 20, padding: "2px 9px", fontSize: 11, fontWeight: 700 }}>{items.length}</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {items.map(c => (
                    <div key={c.id} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "14px 14px", cursor: "pointer", transition: "box-shadow 0.15s" }}>
                      <div style={{ fontWeight: 600, fontSize: 13, color: C.text }}>{c.nama}</div>
                      <div style={{ fontSize: 11, color: C.textMid, marginTop: 4 }}>📍 {c.kota}</div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10, paddingTop: 10, borderTop: `1px solid ${C.border}` }}>
                        <span style={{ fontSize: 13, fontWeight: 800, color: C.text }}>{fmt(c.nilai)}</span>
                        <span style={{ fontSize: 10, background: C.bg, border: `1px solid ${C.border}`, color: C.textMid, padding: "2px 8px", borderRadius: 6 }}>{c.sales}</span>
                      </div>
                    </div>
                  ))}
                  <button style={{ background: "transparent", border: `1.5px dashed ${C.border}`, borderRadius: 10, padding: "9px 0", fontSize: 12, color: C.textL, cursor: "pointer", width: "100%", fontFamily: "inherit" }}>
                    + Tambah
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <SectionCard
          title="Daftar Prospek & Pelanggan"
          action={<Btn onClick={() => toast("Form tambah prospek akan segera hadir", "info")}><Plus size={13} /> Tambah Prospek</Btn>}
        >
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
            <thead>
              <tr style={{ background: C.bg }}>
                {["Nama", "No. HP", "Kota", "Nilai Motor", "Sales PIC", "Status", "Tgl Masuk", ""].map(h => (
                  <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontWeight: 600, color: C.textMid, fontSize: 11 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {customers.map((c, i) => (
                <tr key={c.id} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? C.card : "#F8FAFC" }}>
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ fontWeight: 600, color: C.text }}>{c.nama}</div>
                    <div style={{ fontSize: 10, color: C.textL }}>{c.id}</div>
                  </td>
                  <td style={{ padding: "12px 16px", color: C.textMid }}>{c.phone}</td>
                  <td style={{ padding: "12px 16px", color: C.textMid }}>{c.kota}</td>
                  <td style={{ padding: "12px 16px", fontWeight: 700, color: C.text }}>{fmt(c.nilai)}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <span style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 6, padding: "3px 9px", fontSize: 11, color: C.textMid }}>{c.sales}</span>
                  </td>
                  <td style={{ padding: "12px 16px" }}><Badge label={c.status} /></td>
                  <td style={{ padding: "12px 16px", color: C.textL, fontSize: 11 }}>{c.tanggal}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <button onClick={() => toast(`Detail: ${c.nama} – ${c.kota}`, "info")} style={{ background: C.blueL, border: "none", borderRadius: 6, padding: "4px 10px", cursor: "pointer", color: C.blue, fontSize: 11, fontWeight: 600 }}>Detail</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </SectionCard>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   MODULE: WORKSHOP
═══════════════════════════════════════════════════════════════════════ */
function Workshop() {
  const antri = serviceOrders.filter(s => s.status === "Antri").length;
  const dikerjakan = serviceOrders.filter(s => s.status === "Dikerjakan").length;
  const selesai = serviceOrders.filter(s => s.status === "Selesai").length;

  const techLoad = [
    { name: "Eko S.", total: 3, selesai: 1, aktif: 1 },
    { name: "Fajar R.", total: 2, selesai: 0, aktif: 2 },
    { name: "Budi T.", total: 2, selesai: 1, aktif: 0 },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
        <KPI icon={ClipboardList} label="Total Order Hari Ini" value={serviceOrders.length} color={C.blue} bg={C.blueL} />
        <KPI icon={Clock} label="Menunggu Antri" value={antri} color={C.orange} bg={C.orangeL} />
        <KPI icon={Wrench} label="Sedang Dikerjakan" value={dikerjakan} color={C.purple} bg={C.purpleL} />
        <KPI icon={CheckCircle} label="Selesai Hari Ini" value={selesai} color={C.green} bg={C.greenL} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 16 }}>
        <SectionCard
          title="Antrian Service — Kamis, 26 Maret 2026"
          subtitle="Semua cabang"
          action={<Btn onClick={() => toast("Form order service baru akan segera hadir", "info")}><Plus size={13} /> Order Baru</Btn>}
        >
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
              <thead>
                <tr style={{ background: C.bg }}>
                  {["No. Order", "Pelanggan", "Motor", "Plat", "Keluhan", "Teknisi", "Masuk", "Est.", "Cabang", "Status"].map(h => (
                    <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontWeight: 600, color: C.textMid, fontSize: 11, whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {serviceOrders.map((s, i) => (
                  <tr key={s.id} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? C.card : "#F8FAFC" }}>
                    <td style={{ padding: "11px 14px", fontFamily: "monospace", fontSize: 11, color: C.blue, fontWeight: 700 }}>{s.id}</td>
                    <td style={{ padding: "11px 14px", fontWeight: 600, color: C.text }}>{s.pelanggan}</td>
                    <td style={{ padding: "11px 14px", color: C.textMid, fontSize: 11 }}>{s.motor}</td>
                    <td style={{ padding: "11px 14px", fontFamily: "monospace", fontSize: 11, color: C.textMid }}>{s.plat}</td>
                    <td style={{ padding: "11px 14px", color: C.textMid, maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontSize: 11 }}>{s.keluhan}</td>
                    <td style={{ padding: "11px 14px" }}>
                      <span style={{ background: C.purpleL, color: C.purple, borderRadius: 6, padding: "3px 9px", fontSize: 11, fontWeight: 600 }}>{s.teknisi}</span>
                    </td>
                    <td style={{ padding: "11px 14px", color: C.textMid }}>{s.jam}</td>
                    <td style={{ padding: "11px 14px", color: C.textMid }}>{s.est}</td>
                    <td style={{ padding: "11px 14px", color: C.textL, fontSize: 11 }}>{s.cabang}</td>
                    <td style={{ padding: "11px 14px" }}><Badge label={s.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      </div>

      {/* Technician Workload */}
      <SectionCard title="Beban Kerja Teknisi" subtitle="Hari ini">
        <div style={{ padding: "16px 22px", display: "flex", gap: 16 }}>
          {techLoad.map(t => (
            <div key={t.name} style={{ flex: 1, background: C.bg, borderRadius: 10, padding: "16px 18px", border: `1px solid ${C.border}` }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: C.text, marginBottom: 12 }}>{t.name}</div>
              <div style={{ display: "flex", gap: 12, marginBottom: 10 }}>
                {[
                  { l: "Total", v: t.total, c: C.blue },
                  { l: "Aktif", v: t.aktif, c: C.orange },
                  { l: "Selesai", v: t.selesai, c: C.green },
                ].map(x => (
                  <div key={x.l} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 22, fontWeight: 800, color: x.c }}>{x.v}</div>
                    <div style={{ fontSize: 10, color: C.textL }}>{x.l}</div>
                  </div>
                ))}
              </div>
              <div style={{ height: 6, background: C.border, borderRadius: 3, overflow: "hidden" }}>
                <div style={{ width: `${(t.selesai / t.total) * 100}%`, height: "100%", background: C.green, borderRadius: 3 }} />
              </div>
              <div style={{ fontSize: 11, color: C.textMid, marginTop: 6 }}>{Math.round((t.selesai / t.total) * 100)}% selesai</div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   MODULE: KEUANGAN
═══════════════════════════════════════════════════════════════════════ */
function Finance() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
        <KPI icon={TrendingUp} label="Pendapatan Bulan Ini" value="Rp 4,8M" change={17} sub="Margin gross: 31%" color={C.green} bg={C.greenL} />
        <KPI icon={DollarSign} label="Gross Profit" value="Rp 1,5M" sub="vs Rp 1,3M bulan lalu" color={C.blue} bg={C.blueL} />
        <KPI icon={FileText} label="Total Beban Operasi" value="Rp 460Jt" sub="9,6% dari revenue" color={C.orange} bg={C.orangeL} />
        <KPI icon={Wallet} label="Net Profit Bersih" value="Rp 1,04M" change={21} sub="Margin: 21,7%" color={C.purple} bg={C.purpleL} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 16 }}>
        <SectionCard title="Laporan Laba Rugi" subtitle="Pendapatan, Gross & Net Profit (Rp Juta)">
          <div style={{ padding: "20px 22px" }}>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={financeMonthly} barSize={14} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                <XAxis dataKey="bulan" tick={{ fontSize: 11, fill: C.textL }} />
                <YAxis tick={{ fontSize: 11, fill: C.textL }} />
                <Tooltip formatter={(v) => [`Rp ${v}Jt`, ""]} contentStyle={{ borderRadius: 8, fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="rev" name="Pendapatan" fill={C.blue} radius={[4, 4, 0, 0]} />
                <Bar dataKey="gross" name="Gross Profit" fill={C.green} radius={[4, 4, 0, 0]} />
                <Bar dataKey="net" name="Net Profit" fill={C.red} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="Rincian Beban Operasi" subtitle="Maret 2026 — Total Rp 460Jt">
          <div style={{ padding: "16px 22px" }}>
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={expenses} cx="50%" cy="50%" outerRadius={68} paddingAngle={3} dataKey="value">
                  {expenses.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip formatter={(v) => [`Rp ${v}Jt`, ""]} contentStyle={{ borderRadius: 8, fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 10 }}>
              {expenses.map(e => (
                <div key={e.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    <div style={{ width: 8, height: 8, borderRadius: 2, background: e.color, flexShrink: 0 }} />
                    <span style={{ fontSize: 12, color: C.textMid }}>{e.name}</span>
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 700, color: C.text }}>Rp {e.value}Jt</span>
                </div>
              ))}
            </div>
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Ringkasan Bulanan" subtitle="6 Bulan Terakhir" action={<Btn variant="outline" onClick={() => toast("Data berhasil diekspor ke Excel!", "success")}><Download size={13} /> Export</Btn>}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead>
            <tr style={{ background: C.bg }}>
              {["Periode", "Pendapatan", "HPP", "Gross Profit", "Beban Operasi", "Net Profit", "Net Margin"].map(h => (
                <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontWeight: 600, color: C.textMid, fontSize: 11 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {financeMonthly.map((row, i) => (
              <tr key={row.bulan} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? C.card : "#F8FAFC" }}>
                <td style={{ padding: "12px 16px", fontWeight: 700, color: C.text }}>{row.bulan} {row.bulan === "Okt" || row.bulan === "Nov" || row.bulan === "Des" ? "2025" : "2026"}</td>
                <td style={{ padding: "12px 16px", color: C.text }}>Rp {row.rev}Jt</td>
                <td style={{ padding: "12px 16px", color: C.textMid }}>Rp {row.hpp}Jt</td>
                <td style={{ padding: "12px 16px", color: C.green, fontWeight: 600 }}>Rp {row.gross}Jt</td>
                <td style={{ padding: "12px 16px", color: C.orange }}>Rp {row.opex}Jt</td>
                <td style={{ padding: "12px 16px", color: C.blue, fontWeight: 800 }}>Rp {row.net}Jt</td>
                <td style={{ padding: "12px 16px" }}>
                  <span style={{ background: C.greenL, color: C.green, borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 700 }}>
                    {((row.net / row.rev) * 100).toFixed(1)}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </SectionCard>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   MODULE: HR
═══════════════════════════════════════════════════════════════════════ */
function HR() {
  const [search, setSearch] = useState("");
  const [dept, setDept] = useState("Semua");

  const depts = ["Semua", ...new Set(employees.map(e => e.dept))];
  const filtered = employees.filter(e => {
    const ms = e.nama.toLowerCase().includes(search.toLowerCase()) || e.jabatan.toLowerCase().includes(search.toLowerCase());
    const md = dept === "Semua" || e.dept === dept;
    return ms && md;
  });

  const totalGaji = employees.reduce((s, e) => s + e.gaji, 0);
  const aktif = employees.filter(e => e.status === "Aktif").length;

  const deptBreakdown = [...new Set(employees.map(e => e.dept))].map(d => ({
    dept: d,
    count: employees.filter(e => e.dept === d).length,
  }));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
        <KPI icon={Users} label="Total Karyawan" value={employees.length} color={C.blue} bg={C.blueL} />
        <KPI icon={UserCheck} label="Karyawan Aktif" value={aktif} color={C.green} bg={C.greenL} />
        <KPI icon={Wallet} label="Total Payroll/Bln" value={`Rp ${(totalGaji / 1e6).toFixed(1)}M`} color={C.purple} bg={C.purpleL} />
        <KPI icon={Building2} label="Departemen Aktif" value={new Set(employees.map(e => e.dept)).size} color={C.orange} bg={C.orangeL} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 16 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <SectionCard
            title="Direktori Karyawan"
            subtitle={`${filtered.length} dari ${employees.length} karyawan`}
            action={
              <div style={{ display: "flex", gap: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: "6px 12px" }}>
                  <Search size={13} color={C.textL} />
                  <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari karyawan..." style={{ border: "none", background: "transparent", fontSize: 12, color: C.text, outline: "none", width: 130 }} />
                </div>
                <select value={dept} onChange={e => setDept(e.target.value)} style={{ border: `1px solid ${C.border}`, borderRadius: 8, padding: "6px 10px", fontSize: 12, color: C.textMid, background: C.bg }}>
                  {depts.map(d => <option key={d}>{d}</option>)}
                </select>
                <Btn onClick={() => toast("Form tambah karyawan akan segera hadir", "info")}><Plus size={13} /> Tambah</Btn>
              </div>
            }
          >
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
              <thead>
                <tr style={{ background: C.bg }}>
                  {["Karyawan", "Jabatan", "Departemen", "Cabang", "Gaji Pokok", "Bergabung", "Status", ""].map(h => (
                    <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontWeight: 600, color: C.textMid, fontSize: 11 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((emp, i) => {
                  const ci = emp.id.charCodeAt(emp.id.length - 1) % avColors.length;
                  return (
                    <tr key={emp.id} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? C.card : "#F8FAFC" }}>
                      <td style={{ padding: "11px 16px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <div style={{ width: 32, height: 32, borderRadius: "50%", background: avColors[ci], display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: "#fff", flexShrink: 0 }}>{emp.av}</div>
                          <div>
                            <div style={{ fontWeight: 600, color: C.text }}>{emp.nama}</div>
                            <div style={{ fontSize: 10, color: C.textL }}>{emp.id}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: "11px 16px", color: C.textMid }}>{emp.jabatan}</td>
                      <td style={{ padding: "11px 16px" }}>
                        <span style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 6, padding: "3px 9px", fontSize: 11, color: C.textMid }}>{emp.dept}</span>
                      </td>
                      <td style={{ padding: "11px 16px", color: C.textMid, fontSize: 11 }}>{emp.cabang}</td>
                      <td style={{ padding: "11px 16px", fontWeight: 700, color: C.text }}>{fmt(emp.gaji)}</td>
                      <td style={{ padding: "11px 16px", color: C.textL, fontSize: 11 }}>{emp.join}</td>
                      <td style={{ padding: "11px 16px" }}><Badge label={emp.status} /></td>
                      <td style={{ padding: "11px 16px" }}>
                        <button onClick={() => toast(`Detail karyawan: ${emp.nama} – ${emp.jabatan}`, "info")} style={{ background: C.blueL, border: "none", borderRadius: 6, padding: "4px 10px", cursor: "pointer", color: C.blue, fontSize: 11, fontWeight: 600 }}>Detail</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </SectionCard>
        </div>
      </div>

      {/* Dept breakdown */}
      <SectionCard title="Sebaran per Departemen">
        <div style={{ padding: "16px 22px", display: "flex", gap: 12, flexWrap: "wrap" }}>
          {deptBreakdown.map((d, i) => (
            <div key={d.dept} style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 10, padding: "14px 20px", minWidth: 130, textAlign: "center" }}>
              <div style={{ fontSize: 24, fontWeight: 800, color: avColors[i % avColors.length] }}>{d.count}</div>
              <div style={{ fontSize: 12, color: C.textMid, marginTop: 4 }}>{d.dept}</div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   NAVIGATION CONFIG
═══════════════════════════════════════════════════════════════════════ */
const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, component: Dashboard },
  { id: "inventory", label: "Inventori", icon: Package, component: Inventory },
  { id: "sales", label: "Sales & CRM", icon: Users, component: Sales },
  { id: "workshop", label: "Workshop", icon: Wrench, component: Workshop },
  { id: "finance", label: "Keuangan", icon: DollarSign, component: Finance },
  { id: "hr", label: "SDM & HR", icon: UserCheck, component: HR },
];

const moduleTitle = {
  dashboard: "Dashboard Overview",
  inventory: "Inventori & Stok Motor",
  sales: "Sales & CRM",
  workshop: "Workshop AHASS",
  finance: "Keuangan & Laporan",
  hr: "Manajemen SDM & HR",
};

/* ═══════════════════════════════════════════════════════════════════════
   ROOT APP
═══════════════════════════════════════════════════════════════════════ */
export default function App() {
  const [active, setActive] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);

  const ActiveModule = navItems.find(n => n.id === active)?.component || Dashboard;

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "'DM Sans', sans-serif", background: C.bg, overflow: "hidden" }}>
      <FontLoader />
      <ToastContainer />

      {/* ── Sidebar ─────────────────────────────────────── */}
      <div style={{ width: collapsed ? 68 : 224, background: C.navy, flexShrink: 0, display: "flex", flexDirection: "column", transition: "width 0.2s ease", overflow: "hidden" }}>
        {/* Logo */}
        <div style={{ padding: "18px 14px", borderBottom: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", gap: 11, height: 64, boxSizing: "border-box" }}>
          <div style={{ width: 36, height: 36, borderRadius: 9, overflow: "hidden", flexShrink: 0, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img src="https://i.imgur.com/8fSvYUp.png" alt="Nagamas Logo" style={{ width: 36, height: 36, objectFit: "cover" }} onError={e => { e.target.style.display='none'; e.target.parentNode.style.background=C.red; }} />
          </div>
          {!collapsed && (
            <div>
              <div style={{ color: "#fff", fontWeight: 800, fontSize: 14, letterSpacing: "-0.3px", whiteSpace: "nowrap" }}>Naga Mas ERP</div>
              <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 10, fontWeight: 500, whiteSpace: "nowrap" }}>Honda Tegal & Brebes</div>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "10px 8px", display: "flex", flexDirection: "column", gap: 2, overflowY: "auto" }}>
          {navItems.map(({ id, label, icon: Icon }) => {
            const isActive = active === id;
            return (
              <button key={id} onClick={() => setActive(id)} style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: collapsed ? "10px 0" : "10px 12px",
                justifyContent: collapsed ? "center" : "flex-start",
                borderRadius: 9, border: "none", cursor: "pointer", width: "100%",
                background: isActive ? "rgba(220,38,38,0.2)" : "transparent",
                color: isActive ? "#fff" : "rgba(255,255,255,0.45)",
                transition: "all 0.12s",
              }}>
                <Icon size={17} color={isActive ? C.red : "rgba(255,255,255,0.35)"} style={{ flexShrink: 0 }} />
                {!collapsed && (
                  <>
                    <span style={{ fontSize: 13, fontWeight: isActive ? 700 : 400, whiteSpace: "nowrap" }}>{label}</span>
                    {isActive && <div style={{ width: 5, height: 5, borderRadius: "50%", background: C.red, marginLeft: "auto" }} />}
                  </>
                )}
              </button>
            );
          })}
        </nav>

        {/* User */}
        <div style={{ padding: "10px 8px", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 9 }}>
            <div style={{ width: 30, height: 30, borderRadius: "50%", background: C.red, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: "#fff", flexShrink: 0 }}>AD</div>
            {!collapsed && (
              <div>
                <div style={{ color: "#fff", fontSize: 12, fontWeight: 600 }}>Admin</div>
                <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 10 }}>Super Admin</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Main Area ───────────────────────────────────── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Topbar */}
        <div style={{ background: C.card, borderBottom: `1px solid ${C.border}`, padding: "0 22px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <button onClick={() => setCollapsed(!collapsed)} style={{ background: "transparent", border: "none", cursor: "pointer", padding: 6, borderRadius: 7, color: C.textMid, display: "flex" }}>
              <Menu size={19} />
            </button>
            <div>
              <div style={{ fontWeight: 800, fontSize: 15, color: C.text }}>{moduleTitle[active]}</div>
              <div style={{ fontSize: 11, color: C.textL, marginTop: 1 }}>Naga Mas Motor · 26 Maret 2026</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, background: C.bg, border: `1px solid ${C.border}`, borderRadius: 9, padding: "7px 13px", width: 200 }}>
              <Search size={13} color={C.textL} />
              <input placeholder="Cari di sistem..." style={{ border: "none", background: "transparent", fontSize: 12, color: C.text, outline: "none", width: "100%", fontFamily: "inherit" }} />
            </div>
            <div style={{ position: "relative" }}>
              <button style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 9, padding: "7px 9px", cursor: "pointer", display: "flex" }}>
                <Bell size={17} color={C.textMid} />
              </button>
              <div style={{ position: "absolute", top: 5, right: 5, width: 7, height: 7, background: C.red, borderRadius: "50%", border: "1.5px solid white" }} />
            </div>
            <div style={{ width: 34, height: 34, borderRadius: "50%", background: C.red, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: "#fff", cursor: "pointer" }}>AD</div>
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: 22 }}>
          <ActiveModule />
        </div>
      </div>
    </div>
  );
}
