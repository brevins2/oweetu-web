import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CiMenuBurger, CiGlobe, CiLocationOn, CiViewList, CiTrash, CiCirclePlus, CiSearch, CiMail, CiUser, CiDollar, CiCircleInfo } from "react-icons/ci";
import { FaSafari } from "react-icons/fa";
import { IoClose, IoLogOutOutline } from "react-icons/io5";
import { MdPeople, MdEmail } from "react-icons/md";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../utils/axiosInstance";
import { toast, Toaster } from "react-hot-toast";
import { FaDownload } from "react-icons/fa6";
import RichTextEditor from "@/components/RichTextEditor";
import HTMLRenderer from "@/components/HTMLRenderer";
import { Link } from "react-router-dom";

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState("safaris");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { user, logout } = useAuth();

    const navItems = [
        { id: "safaris", label: "Safaris", desc: "Manage safari packages & pricing", icon: FaSafari },
        { id: "destinations", label: "Destinations", desc: "Countries, guides & highlights", icon: CiLocationOn },
        { id: "subscribers", label: "Subscribers", desc: "Newsletter audience & campaigns", icon: MdPeople },
    ];

    const activeItem = navItems.find((item) => item.id === activeTab) || navItems[0];
    const initials = (user?.name || user?.email || "A").charAt(0).toUpperCase();

    return (
        <div className="min-h-screen bg-gray-50 flex" data-dashboard>
            <Toaster
                position="top-right"
                toastOptions={{
                    className: "font-medium",
                    style: {
                        borderRadius: "14px",
                        background: "#ffffff",
                        color: "#1f2937",
                        fontSize: "14px",
                        boxShadow: "0 10px 30px -8px rgba(0,0,0,0.18)",
                        border: "1px solid rgba(0,0,0,0.05)",
                    },
                    success: { iconTheme: { primary: "#C57712", secondary: "#ffffff" } },
                    error: { iconTheme: { primary: "#dc2626", secondary: "#ffffff" } },
                }}
            />

            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
            )}

            {/* Sidebar */}
            <aside className={`fixed md:relative z-50 w-72 shrink-0 h-screen bg-[#0a0f0a] text-white flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
                <div className="p-5 border-b border-white/10">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Link
                                to="/"
                                className="w-11 h-11 bg-linear-to-br from-[#C57712] to-[#e0962c] rounded-xl flex items-center justify-center shadow-lg shadow-[#C57712]/30 ring-1 ring-white/10"
                            >
                                <CiGlobe className="text-white text-2xl" />
                            </Link>
                            <div>
                                <h1 className="text-[15px] font-bold tracking-tight leading-tight">Oweetu Admin</h1>
                                <p className="text-xs text-white/40">Travel management</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="md:hidden text-white/50 hover:text-white transition-colors"
                        >
                            <IoClose size={24} />
                        </button>
                    </div>
                </div>

                <nav className="flex-1 p-4 overflow-y-auto">
                    <p className="px-4 mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/30">
                        Menu
                    </p>
                    <div className="space-y-1">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = activeTab === item.id;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => {
                                        setActiveTab(item.id);
                                        setSidebarOpen(false);
                                    }}
                                    className={`group w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${isActive
                                            ? "bg-linear-to-r from-[#C57712] to-[#e0962c] text-white shadow-lg shadow-[#C57712]/25"
                                            : "text-white/55 hover:text-white hover:bg-white/5"
                                        }`}
                                >
                                    <Icon className={`text-lg transition-colors ${isActive ? "text-white" : "text-white/40 group-hover:text-white/70"}`} />
                                    <span>{item.label}</span>
                                    {isActive && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-white/80" />}
                                </button>
                            );
                        })}
                    </div>
                </nav>

                <div className="p-4 border-t border-white/10">
                    <div className="rounded-xl bg-white/5 p-3 ring-1 ring-white/10">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 shrink-0 rounded-lg bg-linear-to-br from-[#C57712] to-[#e0962c] flex items-center justify-center text-xs font-bold text-white shadow-md shadow-black/20">
                                {initials}
                            </div>
                            <div className="min-w-0">
                                <p className="text-xs font-semibold text-white truncate">
                                    {user?.name || "Administrator"}
                                </p>
                                <p className="text-[11px] text-white/40 truncate">
                                    {user?.email}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={logout}
                            className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 py-2 text-xs font-semibold text-white/60 transition-colors hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400"
                        >
                            <IoLogOutOutline className="text-sm" />
                            Log out
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col max-h-screen min-w-0">
                <header className="bg-white/85 backdrop-blur-xl border-b border-gray-200/70 px-5 md:px-8 py-4 sticky top-0 z-30">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3 min-w-0">
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="md:hidden p-2.5 rounded-xl text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
                            >
                                <CiMenuBurger className="text-2xl" />
                            </button>
                            <div className="min-w-0">
                                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#C57712] truncate">
                                    {activeItem.desc}
                                </p>
                                <h2 className="text-xl md:text-2xl font-bold tracking-tight text-gray-900 capitalize">
                                    {activeTab}
                                </h2>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="hidden sm:block text-right max-w-[220px]">
                                <p className="text-sm font-semibold text-gray-800 leading-tight truncate">
                                    {user?.name || "Administrator"}
                                </p>
                                <p className="text-xs text-gray-400 truncate">
                                    {user?.email}
                                </p>
                            </div>
                            <div className="relative">
                                <div className="w-11 h-11 rounded-xl bg-linear-to-br from-[#C57712] to-[#e0962c] flex items-center justify-center text-white text-sm font-bold shadow-md shadow-[#C57712]/30 ring-1 ring-[#C57712]/20">
                                    {initials}
                                </div>
                                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white" />
                            </div>
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-auto">
                    <div
                        key={activeTab}
                        className="min-h-full p-5 md:p-8 bg-gray-50 [background-image:radial-gradient(900px_280px_at_8%_0%,rgba(197,119,18,0.07),transparent_60%)] animate-in fade-in-0 slide-in-from-bottom-2 duration-300"
                    >
                        {activeTab === "safaris" && <SafarisManager />}
                        {activeTab === "destinations" && <DestinationsManager />}
                        {activeTab === "subscribers" && <SubscribersManager />}
                    </div>
                </div>
            </main>
        </div>
    );
}

/* ---------------- SHARED UI HELPERS ---------------- */
const LABEL_CLS = "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500";
const FIELD_CLS = "h-10 rounded-xl border-gray-200 bg-white text-sm shadow-xs placeholder:text-gray-400 focus-visible:border-[#C57712] focus-visible:ring-[#C57712]/20";
const TEXTAREA_CLS = "rounded-xl border-gray-200 bg-white text-sm shadow-xs placeholder:text-gray-400 focus-visible:border-[#C57712] focus-visible:ring-[#C57712]/20";
const SELECT_CLS = "w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 shadow-xs outline-none transition-colors focus:border-[#C57712] focus:ring-2 focus:ring-[#C57712]/20";
const PRIMARY_BTN_CLS = "h-10 rounded-xl bg-linear-to-r from-[#C57712] to-[#e0962c] px-4 text-white shadow-md shadow-[#C57712]/25 transition-all hover:brightness-[1.06] hover:shadow-lg";
const OUTLINE_BTN_CLS = "h-10 rounded-xl border-gray-200 bg-white px-4 text-gray-700 shadow-xs hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900";
const SEARCH_INPUT_CLS = `${FIELD_CLS} pl-10`;
const PANEL_CLS = "overflow-hidden rounded-2xl bg-white shadow-xs ring-1 ring-gray-900/5";

const statTones = {
    brand: { tile: "from-[#C57712] to-[#e0962c]", shadow: "shadow-[#C57712]/25", glow: "bg-[#C57712]/10" },
    sky: { tile: "from-sky-500 to-cyan-400", shadow: "shadow-sky-500/25", glow: "bg-sky-500/10" },
    emerald: { tile: "from-emerald-500 to-teal-400", shadow: "shadow-emerald-500/25", glow: "bg-emerald-500/10" },
    rose: { tile: "from-rose-500 to-orange-400", shadow: "shadow-rose-500/25", glow: "bg-rose-500/10" },
    violet: { tile: "from-violet-500 to-indigo-400", shadow: "shadow-violet-500/25", glow: "bg-violet-500/10" },
};

function StatCard({ label, value, icon, tone = "brand", note }) {
    const Icon = icon;
    const t = statTones[tone] || statTones.brand;
    return (
        <div className="group relative overflow-hidden rounded-2xl bg-white p-5 shadow-xs ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:ring-[#C57712]/25">
            <div className={`pointer-events-none absolute -right-6 -top-8 h-24 w-24 rounded-full ${t.glow} blur-2xl`} />
            <div className="relative flex items-start justify-between gap-4">
                <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400">{label}</p>
                    <p className="mt-2 text-2xl font-bold tracking-tight text-gray-900 tabular-nums">{value}</p>
                    {note && <p className="mt-1 text-xs text-gray-400">{note}</p>}
                </div>
                <div className={`shrink-0 rounded-xl bg-linear-to-br ${t.tile} p-3 text-white shadow-md ${t.shadow} ring-1 ring-white/20 transition-transform duration-300 group-hover:-rotate-6`}>
                    <Icon className="text-xl" />
                </div>
            </div>
        </div>
    );
}

const statusPillStyles = {
    active: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
    unsubscribed: "bg-rose-50 text-rose-600 ring-rose-600/20",
    bounced: "bg-amber-50 text-amber-700 ring-amber-600/20",
    inactive: "bg-gray-100 text-gray-500 ring-gray-500/20",
    archived: "bg-gray-100 text-gray-500 ring-gray-500/20",
};

const statusDotStyles = {
    active: "bg-emerald-500",
    unsubscribed: "bg-rose-500",
    bounced: "bg-amber-500",
    inactive: "bg-gray-400",
    archived: "bg-gray-400",
};

function StatusBadge({ status }) {
    const key = status || "inactive";
    return (
        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize ring-1 ring-inset ${statusPillStyles[key] || statusPillStyles.inactive}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${statusDotStyles[key] || statusDotStyles.inactive}`} />
            {key}
        </span>
    );
}

function EmptyState({ icon, title, hint }) {
    const Icon = icon;
    return (
        <div className="col-span-full flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white/60 px-6 py-16 text-center">
            <div className="mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-linear-to-br from-[#C57712]/10 to-[#e0962c]/10 text-[#C57712] ring-1 ring-[#C57712]/15">
                <Icon className="text-3xl" />
            </div>
            <p className="text-sm font-semibold text-gray-700">{title}</p>
            {hint && <p className="mt-1 max-w-sm text-sm text-gray-400">{hint}</p>}
        </div>
    );
}

function Spinner({ label }) {
    return (
        <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <div className="w-8 h-8 border-2 border-gray-200 border-t-[#C57712] rounded-full animate-spin" />
            <p className="mt-3 text-sm">{label}</p>
        </div>
    );
}

/* ---------------- SAFARIS MANAGER ---------------- */
function SafarisManager() {
    const [data, setData] = useState([]);
    const [mode, setMode] = useState("view");
    const [preview, setPreview] = useState(null);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState({
        title: "",
        description: "",
        duration: "",
        price: "",
        country: [],
        activities: "",
        accommodation: "",
        best_time: "",
        itinerary: "",
        image: null,
        existingImage: null
    });

    useEffect(() => {
        fetchSafaris();
    }, []);

    const fetchSafaris = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get('/safaris');
            setData(response.data.data);
        } catch {
            toast.error('Failed to load safaris');
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setForm({
            title: "",
            description: "",
            duration: "",
            price: "",
            country: [],
            activities: "",
            accommodation: "",
            best_time: "",
            itinerary: "",
            image: null,
            existingImage: null
        });
        setEditingId(null);
    };

    const handleEdit = (item) => {
        setEditingId(item.id);
        setForm({
            title: item.title || "",
            description: item.description || "",
            duration: item.duration || "",
            price: item.price || "",
            country: item.country ? item.country.split(",").map(c => c.trim()) : [],
            activities: item.activities || "",
            accommodation: item.accommodation || "",
            best_time: item.best_time || "",
            itinerary: item.itinerary || "",
            image: null,
            existingImage: item.image || null
        });
        setMode("edit");
    };

    const handleSave = async () => {
        if (!form.title || !form.price) {
            toast.error('Title and price are required');
            return;
        }

        const formData = new FormData();
        formData.append('country', form.country.join(", "));

        Object.keys(form).forEach(key => {
            if (key === 'existingImage' || key === 'country') return;
            if (form[key] !== null && form[key] !== undefined && form[key] !== "") {
                if (key === 'image' && form[key] instanceof File) {
                    formData.append(key, form[key]);
                } else if (key !== 'image') {
                    formData.append(key, form[key]);
                }
            }
        });

        try {
            if (mode === "edit" && editingId) {
                await axiosInstance.put(`/safaris/${editingId}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                toast.success('Safari updated successfully');
            } else {
                await axiosInstance.post('/safaris', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                toast.success('Safari created successfully');
            }
            setMode("view");
            resetForm();
            fetchSafaris();
        } catch (error) {
            console.error('Save error:', error);
            toast.error(error.response?.data?.message || `Failed to ${mode === "edit" ? "update" : "create"} safari`);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this safari?')) {
            try {
                await axiosInstance.delete(`/safaris/${id}`);
                fetchSafaris();
                toast.success('Safari deleted successfully');
            } catch {
                toast.error('Failed to delete safari');
            }
        }
    };

    const handleCancel = () => {
        setMode("view");
        resetForm();
    };

    const filteredData = data.filter(item =>
        item.title?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                    <CiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                        placeholder="Search safaris..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className={SEARCH_INPUT_CLS}
                    />
                </div>
                {mode === "view" && (
                    <Button
                        onClick={() => { resetForm(); setMode("create"); }}
                        className={PRIMARY_BTN_CLS}
                    >
                        <CiCirclePlus className="mr-2 text-lg" />
                        Add Safari
                    </Button>
                )}
            </div>

            {/* Form Mode */}
            {mode !== "view" ? (
                <div className={PANEL_CLS}>
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 bg-linear-to-r from-[#C57712]/[0.07] to-transparent px-6 py-4">
                        <div>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#C57712]">
                                {mode === "create" ? "New entry" : "Editing"}
                            </p>
                            <h3 className="text-lg font-bold tracking-tight text-gray-900">
                                {mode === "create" ? "Add New Safari" : "Edit Safari"}
                            </h3>
                        </div>
                        <Button variant="ghost" onClick={handleCancel} className="rounded-xl text-gray-500 hover:text-red-600 hover:bg-red-50">
                            <IoClose className="mr-1" /> Cancel
                        </Button>
                    </div>

                    <div className="space-y-4 p-6">
                            {/* Title & Countries */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className={LABEL_CLS}>Title *</label>
                                    <Input
                                        placeholder="e.g., 5-Day Gorilla Trekking Safari"
                                        value={form.title}
                                        onChange={e => setForm({ ...form, title: e.target.value })}
                                        className={FIELD_CLS}
                                    />
                                </div>
                                <div>
                                    <label className={LABEL_CLS}>Countries *</label>
                                    <div className="flex flex-wrap gap-2">
                                        {["Uganda", "Kenya", "Tanzania", "Rwanda"].map((country) => (
                                            <label
                                                key={country}
                                                className="flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2 cursor-pointer text-sm text-gray-600 transition-all hover:border-gray-300 hover:bg-gray-50 has-[:checked]:border-[#C57712] has-[:checked]:bg-[#C57712]/10 has-[:checked]:font-semibold has-[:checked]:text-[#a5630e]"
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={form.country.includes(country)}
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            setForm({ ...form, country: [...form.country, country] });
                                                        } else {
                                                            setForm({ ...form, country: form.country.filter(c => c !== country) });
                                                        }
                                                    }}
                                                    className="text-[#C57712] focus:ring-[#C57712]"
                                                />
                                                <span className="text-sm">{country}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Image */}
                            <div>
                                <label className={LABEL_CLS}>Featured Image</label>
                                {form.existingImage && !form.image && (
                                    <div className="mb-2">
                                        <img
                                            src={`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${form.existingImage}`}
                                            alt="Current"
                                            className="w-24 h-24 object-cover rounded-xl border border-gray-200 ring-1 ring-black/5"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">Current image (upload new to replace)</p>
                                    </div>
                                )}
                                <Input
                                    type="file"
                                    onChange={e => setForm({ ...form, image: e.target.files[0], existingImage: null })}
                                    accept="image/*"
                                    className="h-10 rounded-xl border-gray-200 bg-white text-sm shadow-xs file:mr-3 file:rounded-lg file:border-0 file:bg-gray-100 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-gray-700 hover:file:bg-gray-200"
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className={LABEL_CLS}>Short Description</label>
                                <Textarea
                                    rows={3}
                                    placeholder="Brief description of the safari experience..."
                                    value={form.description}
                                    onChange={e => setForm({ ...form, description: e.target.value })}
                                    className={TEXTAREA_CLS}
                                />
                            </div>

                            {/* Itinerary */}
                            <div>
                                <label className={LABEL_CLS}>Itinerary</label>
                                <RichTextEditor
                                    value={form.itinerary}
                                    onChange={(e) => setForm({ ...form, itinerary: e.target.value })}
                                    placeholder="Day by day itinerary..."
                                />
                            </div>

                            {/* Accommodation & Best Time */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className={LABEL_CLS}>Accommodation</label>
                                    <Textarea
                                        rows={3}
                                        placeholder="Accommodation details..."
                                        value={form.accommodation}
                                        onChange={e => setForm({ ...form, accommodation: e.target.value })}
                                        className={TEXTAREA_CLS}
                                    />
                                </div>
                                <div>
                                    <label className={LABEL_CLS}>Best Time to Visit</label>
                                    <Textarea
                                        rows={3}
                                        placeholder="e.g., June to September, December to February"
                                        value={form.best_time}
                                        onChange={e => setForm({ ...form, best_time: e.target.value })}
                                        className={TEXTAREA_CLS}
                                    />
                                </div>
                            </div>

                            {/* Duration & Price */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className={LABEL_CLS}>Duration</label>
                                    <Input
                                        placeholder="e.g., 5 Days, 4 Nights"
                                        value={form.duration}
                                        onChange={e => setForm({ ...form, duration: e.target.value })}
                                        className={FIELD_CLS}
                                    />
                                </div>
                                <div>
                                    <label className={LABEL_CLS}>Price (USD) *</label>
                                    <Input
                                        type="number"
                                        placeholder="e.g., 1500"
                                        value={form.price}
                                        onChange={e => setForm({ ...form, price: e.target.value })}
                                        className={FIELD_CLS}
                                    />
                                </div>
                            </div>

                            {/* Activities */}
                            <div>
                                <label className={LABEL_CLS}>Activities</label>
                                <Textarea
                                    rows={2}
                                    placeholder="Separate with commas (e.g., Game Drive, Boat Safari, Gorilla Trekking)"
                                    value={form.activities}
                                    onChange={e => setForm({ ...form, activities: e.target.value })}
                                    className={TEXTAREA_CLS}
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end border-t border-gray-100 pt-4">
                                <Button
                                    className={PRIMARY_BTN_CLS}
                                    onClick={handleSave}
                                >
                                    {mode === "create" ? "Create Safari" : "Update Safari"}
                                </Button>
                            </div>
                        </div>
                </div>
            ) : (
                <>
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <StatCard
                            label="Total Safaris"
                            value={data.length}
                            icon={FaSafari}
                            tone="brand"
                            note="All safari packages"
                        />
                        <StatCard
                            label="Active Safaris"
                            value={data.filter(d => d.status === 'active').length}
                            icon={CiViewList}
                            tone="emerald"
                            note={data.length ? `${Math.round((data.filter(d => d.status === 'active').length / data.length) * 100)}% of all packages` : "No packages yet"}
                        />
                        <StatCard
                            label="Average Price"
                            value={`$${data.length ? Math.round(data.reduce((a, b) => a + Number(b.price || 0), 0) / data.length) : 0}`}
                            icon={CiDollar}
                            tone="sky"
                            note="Across all safaris"
                        />
                    </div>

                    {/* Safari Table */}
                    <div className={PANEL_CLS}>
                        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
                            <div>
                                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#C57712]">Inventory</p>
                                <h3 className="text-base font-bold tracking-tight text-gray-900">All Safaris</h3>
                            </div>
                            <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-500">
                                {filteredData.length} {filteredData.length === 1 ? "result" : "results"}
                            </span>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="border-b border-gray-200/70 bg-gray-50/70">
                                    <tr>
                                        <th className="px-6 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-400">Image</th>
                                        <th className="px-6 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-400">Title</th>
                                        <th className="px-6 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-400">Country</th>
                                        <th className="px-6 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-400">Duration</th>
                                        <th className="px-6 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-400">Price</th>
                                        <th className="px-6 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-400">Status</th>
                                        <th className="px-6 py-3.5 text-right text-[11px] font-semibold uppercase tracking-wider text-gray-400">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <tr>
                                            <td colSpan={7}>
                                                <Spinner label="Loading safaris..." />
                                            </td>
                                        </tr>
                                    ) : filteredData.length === 0 ? (
                                        <tr>
                                            <td colSpan={7} className="px-6 py-4">
                                                <EmptyState
                                                    icon={FaSafari}
                                                    title="No safaris found"
                                                    hint='Click "Add Safari" to create your first package.'
                                                />
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredData.map((item) => (
                                            <tr key={item.id} className="border-b border-gray-100 last:border-0 transition-colors hover:bg-[#C57712]/[0.03]">
                                                <td className="px-6 py-3.5">
                                                    {item.image ? (
                                                        <img
                                                            src={`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${item.image}`}
                                                            alt={item.title}
                                                            className="w-11 h-11 object-cover rounded-xl ring-1 ring-black/5 shadow-xs"
                                                        />
                                                    ) : (
                                                        <div className="w-11 h-11 bg-linear-to-br from-[#C57712]/10 to-[#e0962c]/10 rounded-xl flex items-center justify-center ring-1 ring-[#C57712]/15">
                                                            <FaSafari className="text-[#C57712]" />
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-6 py-3.5">
                                                    <div className="max-w-xs truncate text-sm font-semibold text-gray-800">{item.title}</div>
                                                </td>
                                                <td className="px-6 py-3.5 text-sm text-gray-600">{item.country || "—"}</td>
                                                <td className="px-6 py-3.5 text-sm text-gray-600">{item.duration || "—"}</td>
                                                <td className="px-6 py-3.5 text-sm font-bold tabular-nums text-[#C57712]">${item.price}</td>
                                                <td className="px-6 py-3.5"><StatusBadge status={item.status} /></td>
                                                <td className="px-6 py-3.5">
                                                    <div className="flex justify-end gap-2">
                                                        <Button size="sm" variant="outline" onClick={() => setPreview(item)} className="rounded-lg border-gray-200 text-gray-600 hover:border-[#C57712] hover:bg-[#C57712]/5 hover:text-[#a5630e]">
                                                            <CiViewList className="mr-1" /> View
                                                        </Button>
                                                        <Button size="sm" variant="outline" onClick={() => handleEdit(item)} className="rounded-lg border-gray-200 text-gray-600 hover:border-[#C57712] hover:bg-[#C57712]/5 hover:text-[#a5630e]">
                                                            Edit
                                                        </Button>
                                                        <Button size="sm" variant="destructive" onClick={() => handleDelete(item.id)} className="rounded-lg">
                                                            <CiTrash className="mr-1" /> Delete
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}

            {/* Preview Modal */}
            {preview && (
                <Modal onClose={() => setPreview(null)} title={preview.title}>
                    <div className="space-y-5 max-h-[70vh] overflow-y-auto">
                        {preview.image && (
                            <img
                                src={`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${preview.image}`}
                                alt={preview.title}
                                className="w-full h-64 object-cover rounded-2xl ring-1 ring-black/5"
                            />
                        )}
                        <div className="grid grid-cols-3 gap-3">
                            {[
                                { label: "Country", value: preview.country },
                                { label: "Duration", value: preview.duration },
                                { label: "Price", value: `$${preview.price}`, accent: true },
                            ].map((meta) => (
                                <div key={meta.label} className="rounded-xl bg-gray-50 p-3.5 ring-1 ring-gray-100">
                                    <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">{meta.label}</p>
                                    <p className={`mt-1 text-sm font-bold ${meta.accent ? "text-[#C57712]" : "text-gray-800"}`}>
                                        {meta.value || "—"}
                                    </p>
                                </div>
                            ))}
                        </div>
                        {preview.description && (
                            <div className="rounded-xl border-l-2 border-[#C57712] bg-[#C57712]/[0.06] p-4">
                                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#C57712] mb-1.5">Description</p>
                                <p className="text-sm leading-relaxed text-gray-700">{preview.description}</p>
                            </div>
                        )}
                        {preview.itinerary && (
                            <div>
                                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#C57712] mb-2">Itinerary</p>
                                <div className="rounded-xl border border-gray-100 bg-white p-4">
                                    <HTMLRenderer htmlContent={preview.itinerary} />
                                </div>
                            </div>
                        )}
                        {preview.accommodation && (
                            <div>
                                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#C57712] mb-1.5">Accommodation</p>
                                <p className="text-sm leading-relaxed text-gray-600">{preview.accommodation}</p>
                            </div>
                        )}
                        {preview.best_time && (
                            <div>
                                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#C57712] mb-1.5">Best Time</p>
                                <p className="text-sm leading-relaxed text-gray-600">{preview.best_time}</p>
                            </div>
                        )}
                        {preview.activities && (
                            <div>
                                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#C57712] mb-2">Activities</p>
                                <div className="flex flex-wrap gap-2">
                                    {preview.activities.split(',').map((activity, idx) => (
                                        <span key={idx} className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-200/70">
                                            {activity.trim()}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </Modal>
            )}
        </div>
    );
}

/* ---------------- DESTINATIONS MANAGER ---------------- */
function DestinationsManager() {
    const [data, setData] = useState([]);
    const [mode, setMode] = useState("view");
    const [preview, setPreview] = useState(null);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState({
        name: "",
        description: "",
        tourism: "",
        map: "",
        banner: null,
        existingBanner: null,
        highlights: ""
    });

    useEffect(() => {
        fetchDestinations();
    }, []);

    const fetchDestinations = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get('/destinations');
            setData(response.data.data);
        } catch {
            toast.error('Failed to load destinations');
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setForm({
            name: "",
            description: "",
            tourism: "",
            map: "",
            banner: null,
            existingBanner: null,
            highlights: ""
        });
        setEditingId(null);
    };

    const handleEdit = (item) => {
        setEditingId(item.id);
        setForm({
            name: item.name || "",
            description: item.description || "",
            tourism: item.tourism || "",
            map: item.map || "",
            banner: null,
            existingBanner: item.banner || null,
            highlights: item.highlights || ""
        });
        setMode("edit");
    };

    const handleSave = async () => {
        if (!form.name) {
            toast.error('Destination name is required');
            return;
        }

        const formData = new FormData();
        Object.keys(form).forEach(key => {
            if (key === 'existingBanner') return;
            if (form[key] !== null && form[key] !== undefined && form[key] !== "") {
                if (key === 'banner' && form[key] instanceof File) {
                    formData.append(key, form[key]);
                } else if (key !== 'banner') {
                    formData.append(key, form[key]);
                }
            }
        });

        try {
            if (mode === "edit" && editingId) {
                await axiosInstance.put(`/destinations/${editingId}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                toast.success('Destination updated successfully');
            } else {
                await axiosInstance.post('/destinations', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                toast.success('Destination created successfully');
            }
            setMode("view");
            resetForm();
            fetchDestinations();
        } catch (error) {
            toast.error(error.response?.data?.message || `Failed to ${mode === "edit" ? "update" : "create"} destination`);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this destination?')) {
            try {
                await axiosInstance.delete(`/destinations/${id}`);
                fetchDestinations();
                toast.success('Destination deleted successfully');
            } catch {
                toast.error('Failed to delete destination');
            }
        }
    };

    const handleCancel = () => {
        setMode("view");
        resetForm();
    };

    const filteredData = data.filter(item =>
        item.name?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                    <CiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                        placeholder="Search destinations..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className={SEARCH_INPUT_CLS}
                    />
                </div>
                {mode === "view" && (
                    <Button
                        onClick={() => { resetForm(); setMode("create"); }}
                        className={PRIMARY_BTN_CLS}
                    >
                        <CiCirclePlus className="mr-2 text-lg" />
                        Add Destination
                    </Button>
                )}
            </div>

            {/* Stats */}
            {mode === "view" && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <StatCard
                        label="Total Destinations"
                        value={data.length}
                        icon={CiLocationOn}
                        tone="brand"
                        note="Countries covered"
                    />
                    <StatCard
                        label="Active"
                        value={data.filter(d => d.status === 'active').length}
                        icon={CiViewList}
                        tone="emerald"
                        note="Live on the website"
                    />
                    <StatCard
                        label="Inactive"
                        value={data.filter(d => d.status !== 'active').length}
                        icon={CiCircleInfo}
                        tone="rose"
                        note="Hidden from visitors"
                    />
                </div>
            )}

            {mode !== "view" ? (
                <div className={PANEL_CLS}>
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 bg-linear-to-r from-[#C57712]/[0.07] to-transparent px-6 py-4">
                        <div>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#C57712]">
                                {mode === "create" ? "New entry" : "Editing"}
                            </p>
                            <h3 className="text-lg font-bold tracking-tight text-gray-900">
                                {mode === "create" ? "Add New Destination" : "Edit Destination"}
                            </h3>
                        </div>
                        <Button variant="ghost" onClick={handleCancel} className="rounded-xl text-gray-500 hover:text-red-600 hover:bg-red-50">
                            <IoClose className="mr-1" /> Cancel
                        </Button>
                    </div>
                    <div className="space-y-4 p-6">
                        <div>
                            <label className={LABEL_CLS}>Country Name *</label>
                            <select
                                value={form.name}
                                onChange={e => setForm({ ...form, name: e.target.value })}
                                className={SELECT_CLS}
                            >
                                <option value="">Select a country</option>
                                <option value="Uganda">Uganda</option>
                                <option value="Kenya">Kenya</option>
                                <option value="Tanzania">Tanzania</option>
                                <option value="Rwanda">Rwanda</option>
                            </select>
                        </div>
                        <div>
                            <label className={LABEL_CLS}>Banner Image</label>
                            {form.existingBanner && !form.banner && (
                                <div className="mb-2">
                                    <img
                                        src={`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${form.existingBanner}`}
                                        alt="Current"
                                        className="w-32 h-24 object-cover rounded-xl border border-gray-200 ring-1 ring-black/5"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Current banner (upload new to replace)</p>
                                </div>
                            )}
                            <Input
                                type="file"
                                onChange={e => setForm({ ...form, banner: e.target.files[0], existingBanner: null })}
                                accept="image/*"
                                className="h-10 rounded-xl border-gray-200 bg-white text-sm shadow-xs file:mr-3 file:rounded-lg file:border-0 file:bg-gray-100 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-gray-700 hover:file:bg-gray-200"
                            />
                        </div>
                        <div>
                            <label className={LABEL_CLS}>Description</label>
                            <Textarea
                                rows={3}
                                placeholder="Describe the destination..."
                                value={form.description}
                                onChange={e => setForm({ ...form, description: e.target.value })}
                                className={TEXTAREA_CLS}
                            />
                        </div>
                        <div>
                            <label className={LABEL_CLS}>Tourism Information</label>
                            <Textarea
                                rows={3}
                                placeholder="Key tourism information..."
                                value={form.tourism}
                                onChange={e => setForm({ ...form, tourism: e.target.value })}
                                className={TEXTAREA_CLS}
                            />
                        </div>
                        <div>
                            <label className={LABEL_CLS}>Highlights</label>
                            <Textarea
                                rows={2}
                                placeholder="Separate with commas (e.g., Mountain Gorillas, Nile River, Safari)"
                                value={form.highlights}
                                onChange={e => setForm({ ...form, highlights: e.target.value })}
                                className={TEXTAREA_CLS}
                            />
                        </div>
                        <div>
                            <label className={LABEL_CLS}>Map Embed URL</label>
                            <Input
                                placeholder="Google Maps embed URL"
                                value={form.map}
                                onChange={e => setForm({ ...form, map: e.target.value })}
                                className={FIELD_CLS}
                            />
                        </div>
                        <div className="flex justify-end border-t border-gray-100 pt-4">
                            <Button
                                className={PRIMARY_BTN_CLS}
                                onClick={handleSave}
                            >
                                {mode === "create" ? "Create Destination" : "Update Destination"}
                            </Button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {loading ? (
                        <div className="col-span-full"><Spinner label="Loading destinations..." /></div>
                    ) : filteredData.length === 0 ? (
                        <EmptyState
                            icon={CiLocationOn}
                            title="No destinations yet"
                            hint='Click "Add Destination" to add the first country.'
                        />
                    ) : (
                        filteredData.map((item) => (
                            <div
                                key={item.id}
                                className="group overflow-hidden rounded-2xl bg-white shadow-xs ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-[#C57712]/25"
                            >
                                <div className="relative h-44 overflow-hidden bg-linear-to-br from-[#C57712] to-[#e0962c]">
                                    {item.banner && (
                                        <img
                                            src={`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${item.banner}`}
                                            alt={item.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    )}
                                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-black/20" />
                                    {!item.banner && (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <CiLocationOn className="text-white/80 text-5xl" />
                                        </div>
                                    )}
                                    <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-gray-700 backdrop-blur-sm ring-1 ring-white/60">
                                        <CiLocationOn className="text-[#C57712]" />
                                        {item.name}
                                    </div>
                                    <div className="absolute right-4 top-4">
                                        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize ring-1 ring-inset backdrop-blur-sm ${item.status === 'active'
                                                ? 'bg-emerald-500/90 text-white ring-white/30'
                                                : 'bg-white/90 text-gray-600 ring-white/60'
                                            }`}>
                                            <span className={`h-1.5 w-1.5 rounded-full ${item.status === 'active' ? 'bg-white' : 'bg-gray-400'}`} />
                                            {item.status || "inactive"}
                                        </span>
                                    </div>
                                    <div className="absolute bottom-0 left-0 h-1 w-full bg-linear-to-r from-[#C57712] to-[#e0962c] scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                                </div>
                                <div className="p-5">
                                    <h3 className="text-lg font-bold tracking-tight text-gray-900">{item.name}</h3>
                                    <p className="mt-1.5 text-sm leading-relaxed text-gray-500 line-clamp-2">
                                        {item.description || "No description available"}
                                    </p>
                                    <div className="mt-4 flex gap-2 border-t border-gray-100 pt-4">
                                        <Button size="sm" variant="outline" onClick={() => setPreview(item)} className="flex-1 rounded-lg border-gray-200 text-gray-600 hover:border-[#C57712] hover:bg-[#C57712]/5 hover:text-[#a5630e]">
                                            View Details
                                        </Button>
                                        <Button size="sm" variant="outline" onClick={() => handleEdit(item)} className="flex-1 rounded-lg border-gray-200 text-gray-600 hover:border-[#C57712] hover:bg-[#C57712]/5 hover:text-[#a5630e]">
                                            Edit
                                        </Button>
                                        <Button size="sm" variant="destructive" onClick={() => handleDelete(item.id)} className="rounded-lg px-2.5">
                                            <CiTrash />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}

            {preview && (
                <Modal onClose={() => setPreview(null)} title={preview.name}>
                    <div className="space-y-5 max-h-[70vh] overflow-y-auto">
                        {preview.banner && (
                            <img
                                src={`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${preview.banner}`}
                                alt={preview.name}
                                className="w-full h-48 object-cover rounded-2xl ring-1 ring-black/5"
                            />
                        )}
                        {preview.description && (
                            <div className="rounded-xl border-l-2 border-[#C57712] bg-[#C57712]/[0.06] p-4">
                                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#C57712] mb-1.5">Description</p>
                                <p className="text-sm leading-relaxed text-gray-700">{preview.description}</p>
                            </div>
                        )}
                        {preview.tourism && (
                            <div>
                                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#C57712] mb-1.5">Tourism Information</p>
                                <p className="text-sm leading-relaxed text-gray-600">{preview.tourism}</p>
                            </div>
                        )}
                        {preview.highlights && (
                            <div>
                                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#C57712] mb-2">Highlights</p>
                                <div className="flex flex-wrap gap-2">
                                    {preview.highlights.split(',').map((highlight, idx) => (
                                        <span key={idx} className="rounded-full bg-[#C57712]/10 px-3 py-1 text-xs font-semibold text-[#a5630e] ring-1 ring-[#C57712]/20">
                                            {highlight.trim()}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                        {preview.map && (
                            <div>
                                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#C57712] mb-2">Location Map</p>
                                <iframe
                                    src={preview.map}
                                    className="w-full h-64 rounded-2xl border-0 ring-1 ring-gray-100"
                                    title={`Map of ${preview.name}`}
                                    loading="lazy"
                                />
                            </div>
                        )}
                    </div>
                </Modal>
            )}
        </div>
    );
}

/* ---------------- SUBSCRIBERS MANAGER ---------------- */
function SubscribersManager() {
    const [subscribers, setSubscribers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [stats, setStats] = useState({ total: 0, active: 0, unsubscribed: 0 });
    const [showBulkEmail, setShowBulkEmail] = useState(false);
    const [bulkEmail, setBulkEmail] = useState({ subject: "", htmlContent: "", sendTo: "active" });
    const [sending, setSending] = useState(false);

    useEffect(() => {
        fetchSubscribers();
    }, []);

    const fetchSubscribers = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get('/messages/subscribers');
            setSubscribers(response.data.data);
            setStats(response.data.stats);
        } catch {
            toast.error('Failed to load subscribers');
        } finally {
            setLoading(false);
        }
    };

    const handleSendBulkEmail = async () => {
        if (!bulkEmail.subject || !bulkEmail.htmlContent) {
            toast.error('Subject and email content are required');
            return;
        }
        setSending(true);
        try {
            const response = await axiosInstance.post('/messages/send-bulk-email', bulkEmail);
            toast.success(response.data.message);
            setShowBulkEmail(false);
            setBulkEmail({ subject: "", htmlContent: "", sendTo: "active" });
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to send emails');
        } finally {
            setSending(false);
        }
    };

    const handleSendTestEmail = async () => {
        if (!bulkEmail.subject || !bulkEmail.htmlContent) {
            toast.error('Subject and email content are required');
            return;
        }
        setSending(true);
        try {
            await axiosInstance.post('/messages/test-email', {
                email: 'development@oweetugorillaholidays.com',
                subject: bulkEmail.subject,
                htmlContent: bulkEmail.htmlContent
            });
            toast.success('Test email sent to admin');
        } catch {
            toast.error('Failed to send test email');
        } finally {
            setSending(false);
        }
    };

    const handleExportCSV = async () => {
        try {
            const response = await axiosInstance.get('/messages/export-subscribers', { responseType: 'blob' });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `subscribers_${new Date().toISOString().split('T')[0]}.csv`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            toast.success('Subscribers exported successfully');
        } catch {
            toast.error('Failed to export subscribers');
        }
    };

    const filteredSubscribers = subscribers.filter(sub =>
        sub.email.toLowerCase().includes(search.toLowerCase()) ||
        (sub.name && sub.name.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <StatCard
                    label="Total Subscribers"
                    value={stats.total}
                    icon={MdPeople}
                    tone="brand"
                    note="All time sign-ups"
                />
                <StatCard
                    label="Active"
                    value={stats.active}
                    icon={CiUser}
                    tone="emerald"
                    note={stats.total ? `${Math.round((stats.active / stats.total) * 100)}% of audience` : "No subscribers yet"}
                />
                <StatCard
                    label="Unsubscribed"
                    value={stats.unsubscribed}
                    icon={MdEmail}
                    tone="rose"
                    note="Opted out of emails"
                />
            </div>

            {/* Actions Bar */}
            <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                    <CiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                        placeholder="Search subscribers by email or name..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className={SEARCH_INPUT_CLS}
                    />
                </div>
                <div className="flex gap-3">
                    <Button onClick={handleExportCSV} variant="outline" className={OUTLINE_BTN_CLS}>
                        <FaDownload className="mr-2" />
                        Export CSV
                    </Button>
                    <Button onClick={() => setShowBulkEmail(true)} className={PRIMARY_BTN_CLS}>
                        <CiMail className="mr-2 text-lg" />
                        Send Newsletter
                    </Button>
                </div>
            </div>

            {/* Subscribers Table */}
            <div className={PANEL_CLS}>
                <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
                    <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#C57712]">Audience</p>
                        <h3 className="text-base font-bold tracking-tight text-gray-900">All Subscribers</h3>
                    </div>
                    <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-500">
                        {filteredSubscribers.length} {filteredSubscribers.length === 1 ? "result" : "results"}
                    </span>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="border-b border-gray-200/70 bg-gray-50/70">
                            <tr>
                                <th className="px-6 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-400">Email</th>
                                <th className="px-6 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-400">Name</th>
                                <th className="px-6 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-400">Status</th>
                                <th className="px-6 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-400">Subscribed Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={4}>
                                        <Spinner label="Loading subscribers..." />
                                    </td>
                                </tr>
                            ) : filteredSubscribers.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-4">
                                        <EmptyState
                                            icon={MdPeople}
                                            title="No subscribers found"
                                            hint="Try a different search, or share your signup form."
                                        />
                                    </td>
                                </tr>
                            ) : (
                                filteredSubscribers.map((sub) => (
                                    <tr key={sub.id} className="border-b border-gray-100 last:border-0 transition-colors hover:bg-[#C57712]/[0.03]">
                                        <td className="px-6 py-3.5">
                                            <a href={`mailto:${sub.email}`} className="text-sm font-medium text-[#C57712] hover:underline">
                                                {sub.email}
                                            </a>
                                        </td>
                                        <td className="px-6 py-3.5 text-sm text-gray-700">{sub.name || "—"}</td>
                                        <td className="px-6 py-3.5"><StatusBadge status={sub.status} /></td>
                                        <td className="px-6 py-3.5 text-sm text-gray-500">
                                            {new Date(sub.subscribedAt).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Bulk Email Modal */}
            {showBulkEmail && (
                <Modal onClose={() => setShowBulkEmail(false)} title="Send Newsletter">
                    <div className="space-y-4">
                        <div>
                            <label className={LABEL_CLS}>Send To</label>
                            <select
                                value={bulkEmail.sendTo}
                                onChange={(e) => setBulkEmail({ ...bulkEmail, sendTo: e.target.value })}
                                className={SELECT_CLS}
                            >
                                <option value="active">Active Subscribers Only ({stats.active})</option>
                                <option value="all">All Subscribers ({stats.total})</option>
                            </select>
                        </div>
                        <div>
                            <label className={LABEL_CLS}>Subject *</label>
                            <Input
                                placeholder="Newsletter subject"
                                value={bulkEmail.subject}
                                onChange={(e) => setBulkEmail({ ...bulkEmail, subject: e.target.value })}
                                className={FIELD_CLS}
                            />
                        </div>
                        <div>
                            <label className={LABEL_CLS}>Email Content (HTML) *</label>
                            <Textarea
                                rows={10}
                                placeholder="Write your newsletter. Use {{name}} for subscriber name, {{unsubscribe_link}} for unsubscribe link."
                                value={bulkEmail.htmlContent}
                                onChange={(e) => setBulkEmail({ ...bulkEmail, htmlContent: e.target.value })}
                                className={`${TEXTAREA_CLS} font-mono text-sm`}
                            />
                            <p className="mt-2 flex items-start gap-1.5 rounded-lg bg-[#C57712]/[0.06] px-3 py-2 text-xs text-[#8a5a12]">
                                <span aria-hidden="true">💡</span>
                                <span>
                                    Tip: Use {'{{name}}'} for subscriber name, {'{{unsubscribe_link}}'} for unsubscribe link
                                </span>
                            </p>
                        </div>
                        <div className="flex gap-3 border-t border-gray-100 pt-4">
                            <Button
                                onClick={handleSendTestEmail}
                                disabled={sending}
                                variant="outline"
                                className="flex-1 h-10 rounded-xl border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                            >
                                {sending ? "Sending..." : "Send Test Email"}
                            </Button>
                            <Button
                                onClick={handleSendBulkEmail}
                                disabled={sending}
                                className={`${PRIMARY_BTN_CLS} flex-1`}
                            >
                                {sending ? "Sending..." : `Send to ${bulkEmail.sendTo === 'active' ? stats.active : stats.total} Subscribers`}
                            </Button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
}

/* ---------------- MODAL ---------------- */
function Modal({ children, onClose, title }) {
    return (
        <div
            className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in-0 duration-200"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl ring-1 ring-gray-900/10 animate-in fade-in-0 zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="h-1 w-full bg-linear-to-r from-[#C57712] to-[#e0962c]" />
                <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <div className="min-w-0">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#C57712]">Oweetu Admin</p>
                        <h3 className="text-lg font-bold tracking-tight text-gray-900 truncate">{title}</h3>
                    </div>
                    <button
                        className="w-9 h-9 shrink-0 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors flex items-center justify-center"
                        onClick={onClose}
                    >
                        <IoClose size={20} />
                    </button>
                </div>
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-110px)]">
                    {children}
                </div>
            </div>
        </div>
    );
}