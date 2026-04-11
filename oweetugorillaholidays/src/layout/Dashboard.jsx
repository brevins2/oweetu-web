import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";
import { CiMenuBurger, CiGlobe, CiLocationOn, CiViewList, CiTrash, CiCirclePlus, CiSearch, CiMail, CiUser } from "react-icons/ci";
import { FaSafari } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { MdPeople, MdEmail } from "react-icons/md";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../utils/axiosInstance";
import { toast, Toaster } from "react-hot-toast";
import { FaDownload } from "react-icons/fa6";
import RichTextEditor from "@/components/RichTextEditor";
import HTMLRenderer from "@/components/HTMLRenderer"
import { Link } from "react-router-dom";

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState("safaris");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { user, logout } = useAuth();

    const navItems = [
        { id: "safaris", label: "Safaris", icon: FaSafari },
        { id: "destinations", label: "Destinations", icon: CiLocationOn },
        { id: "subscribers", label: "Subscribers", icon: MdPeople },
    ];

    return (
        <div className="h-screen bg-linear-to-br from-gray-50 to-gray-100 flex">
            <Toaster position="top-right" />

            {sidebarOpen && (
                <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
            )}

            <aside className={`fixed md:relative z-50 w-72 h-screen bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
                <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Link to="/" className="w-10 h-10 bg-amber-600 rounded-xl flex items-center justify-center">
                                <CiGlobe className="text-white text-2xl" />
                            </Link>
                            <h1 className="text-xl font-bold bg-linear-to-r from-amber-700 to-amber-500 bg-clip-text text-transparent">
                                Oweetu Admin
                            </h1>
                        </div>
                        <button onClick={() => setSidebarOpen(false)} className="md:hidden text-gray-500 hover:text-gray-700">
                            <IoClose />
                        </button>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <button
                                key={item.id}
                                onClick={() => {
                                    setActiveTab(item.id);
                                    setSidebarOpen(false);
                                }}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${activeTab === item.id ? "bg-amber-600 text-white shadow-lg shadow-amber-200" : "text-gray-600 hover:bg-gray-100"}`}>
                                <Icon className={`text-xl ${activeTab === item.id ? "text-white" : "text-gray-500"}`} />
                                <span className="capitalize">{item.label}</span>
                                {activeTab === item.id && (
                                    <motion.div layoutId="activeTab" className="absolute left-0 w-1 h-8 bg-amber-400 rounded-r-full" transition={{ type: "spring", stiffness: 500, damping: 30 }} />
                                )}
                            </button>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <div className="bg-gray-50 rounded-xl p-4">
                        <p className="text-xs text-gray-500 text-center mb-2">
                            Logged in as<br /><span className="font-semibold">{user?.email}</span>
                        </p>
                        <Button onClick={logout} variant="outline" className="w-full text-red-600 hover:bg-red-50">
                            Logout
                        </Button>
                    </div>
                </div>
            </aside>

            <main className="flex-1 flex flex-col h-screen">
                <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-30">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2 hover:bg-gray-100 rounded-lg">
                                <CiMenuBurger className="text-2xl" />
                            </button>
                            <div>
                                <h2 className="text-2xl font-bold capitalize text-gray-800">
                                    {activeTab}
                                </h2>
                                <p className="text-sm text-gray-500 mt-0.5">
                                    Manage your {activeTab} collection
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-linear-to-r from-amber-500 to-amber-600 flex items-center justify-center text-white font-semibold">
                                {user?.name?.[0] || user?.email?.[0] || 'A'}
                            </div>
                        </div>
                    </div>
                </header>

                <div className="flex-1 p-6 md:p-8 overflow-y-scroll">
                    <AnimatePresence mode="wait">
                        <motion.div key={activeTab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.2 }} className="h-full">
                            {activeTab === "safaris" && <SafarisManager />}
                            {activeTab === "destinations" && <DestinationsManager />}
                            {activeTab === "subscribers" && <SubscribersManager />}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
}

/* ---------------- SAFARIS MANAGER ---------------- */
//  < "view" | "create" | "edit" > 
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
        } catch (error) {
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
            country: "",
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
            image: item.image || null,
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
            let response;
            if (mode === "edit" && editingId) {
                response = await axiosInstance.put(`/safaris/${editingId}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                setData(data.map(item => item.id === editingId ? response.data.data : item));
                toast.success('Safari updated successfully');
            } else {
                response = await axiosInstance.post('/safaris', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                setData([response.data.data, ...data]);
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
                setData(data.filter(item => item.id !== id));
                toast.success('Safari deleted successfully');
            } catch (error) {
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
            <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                    <CiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <Input placeholder="Search safaris..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 bg-white" />
                </div>
                {mode === "view" && (
                    <Button onClick={() => { resetForm(); setMode("create"); }} className="bg-amber-600 hover:bg-amber-700 text-white flex items-center gap-2">
                        <CiCirclePlus className="text-xl" />
                        Add Safari
                    </Button>
                )}
            </div>

            {mode !== "view" ? (
                <Card className="p-6 border-0 shadow-lg">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold text-gray-800">{mode === "create" ? "Add New Safari" : "Edit Safari"}</h3>
                        <Button variant="ghost" onClick={handleCancel} className="text-red-500 hover:text-red-700">
                            <IoClose className="text-2xl" /> Cancel
                        </Button>
                    </div>
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="md:col-span-2">
                                <label className="text-sm font-medium text-gray-700 mb-1 block">Title *</label>
                                <Input placeholder="e.g., Serengeti Expedition" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-2 block">Countries *</label>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                    {["Uganda", "Kenya", "Tanzania", "Rwanda"].map((country) => (
                                        <label key={country} className="flex items-center gap-2 border rounded-lg px-3 py-2 cursor-pointer hover:bg-gray-50">
                                            <input
                                                type="checkbox"
                                                checked={form.country.includes(country)}
                                                value={country}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setForm({
                                                            ...form,
                                                            country: [...form.country, country]
                                                        });
                                                    } else {
                                                        setForm({
                                                            ...form,
                                                            country: form.country.filter(c => c !== country)
                                                        });
                                                    }
                                                }}
                                            />
                                            <span>{country}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-1 block">Image</label>
                            {form.existingImage && !form.image && (
                                <div className="mb-2">
                                    <img src={`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${form.existingImage}`} alt="Current" className="w-24 h-24 object-cover rounded-lg" />
                                    <p className="text-xs text-gray-500 mt-1">Current image (upload new to replace)</p>
                                </div>
                            )}
                            <Input type="file" onChange={e => setForm({ ...form, image: e.target.files[0], existingImage: null })} accept="image/*" />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-1 block">Description</label>
                            <Textarea rows={3} placeholder="Describe the safari experience..." value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-1 block">Itinerary</label>
                            <RichTextEditor value={form.itinerary} onChange={(e) => setForm({ ...form, itinerary: e.target.value })} placeholder="Day by day itinerary... Use the toolbar to format your text" rows={8} />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-1 block">Accommodation</label>
                                <Textarea rows={3} placeholder="Accommodation details..." value={form.accommodation} onChange={e => setForm({ ...form, accommodation: e.target.value })} />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-1 block">Best Time</label>
                                <Textarea rows={3} placeholder="e.g., June to October" value={form.best_time} onChange={e => setForm({ ...form, best_time: e.target.value })} />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-1 block">Duration</label>
                                <Input placeholder="e.g., 5 days" value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })} />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-1 block">Price *</label>
                                <Input placeholder="e.g., 1500" type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
                            </div>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-1 block">Activities</label>
                            <Textarea rows={2} placeholder="Separate with commas (e.g., Game Drive, Boat Safari)" value={form.activities} onChange={e => setForm({ ...form, activities: e.target.value })} />
                        </div>
                        <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white" onClick={handleSave}>
                            {mode === "create" ? "Create Safari" : "Update Safari"}
                        </Button>
                    </div>
                </Card>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <Card className="bg-linear-to-r from-blue-50 to-blue-100 border-none">
                            <CardContent className="p-4">
                                <p className="text-sm text-blue-600">Total Safaris</p>
                                <p className="text-2xl font-bold text-blue-800">{data.length}</p>
                            </CardContent>
                        </Card>
                        <Card className="bg-linear-to-r from-green-50 to-green-100 border-none">
                            <CardContent className="p-4">
                                <p className="text-sm text-green-600">Active</p>
                                <p className="text-2xl font-bold text-green-800">{data.filter(d => d.status === 'active').length}</p>
                            </CardContent>
                        </Card>
                        <Card className="bg-linear-to-r from-amber-50 to-amber-100 border-none">
                            <CardContent className="p-4">
                                <p className="text-sm text-amber-600">Avg Price</p>
                                <p className="text-2xl font-bold text-amber-800">
                                    ${data.length ? Math.round(data.reduce((a, b) => a + Number(b.price || 0), 0) / data.length) : 0}
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="overflow-hidden border-0 shadow-lg">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr className="border-b border-gray-200">
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Image</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Title</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Country</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Duration</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Price</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <tr><td colSpan={6} className="px-6 py-12 text-center text-gray-400">Loading safaris...</td></tr>
                                    ) : filteredData.length === 0 ? (
                                        <tr><td colSpan={6} className="px-6 py-12 text-center text-gray-400">No safaris yet. Click "Add Safari" to get started.</td></tr>
                                    ) : (
                                        filteredData.map((item) => (
                                            <motion.tr key={item.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="border-b border-gray-100 hover:bg-gray-50">
                                                <td className="px-6 py-4">
                                                    {item.image ? (
                                                        <img src={`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${item.image}`} alt={item.title} className="w-12 h-12 object-cover rounded-lg" />
                                                    ) : (
                                                        <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                                                            <FaSafari className="text-amber-600" />
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 font-medium line-clamp-1">{item.title}</td>
                                                <td className="px-6 py-4">{item.country}</td>
                                                <td className="px-6 py-4">{item.duration || "—"}</td>
                                                <td className="px-6 py-4 font-semibold text-amber-600">${item.price}</td>
                                                <td className="px-6 py-4">
                                                    <div className="flex gap-2">
                                                        <Button size="sm" variant="outline" onClick={() => setPreview(item)}><CiViewList className="mr-1" /> View</Button>
                                                        <Button size="sm" variant="outline" onClick={() => handleEdit(item)}><CiCirclePlus className="mr-1" /> Edit</Button>
                                                        <Button size="sm" variant="destructive" onClick={() => handleDelete(item.id)} className="text-red-600"><CiTrash className="mr-1" /> Delete</Button>
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </>
            )}

            <AnimatePresence>
                {preview && (
                    <Modal onClose={() => setPreview(null)} title={preview.title}>
                        <div className="space-y-4 max-h-[70vh] overflow-y-auto">
                            {preview.image && <img src={`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${preview.image}`} alt={preview.title} className="w-full h-48 object-cover rounded-lg" />}
                            <p>
                                <strong>Country:</strong> {preview.country}
                            </p>
                            <p>
                                <strong>Duration:</strong> {preview.duration}
                            </p>
                            <p>
                                <strong>Price:</strong> ${preview.price}
                            </p>
                            <div className="bg-amber-50 p-4 rounded-lg">
                                <strong>Description:</strong><br />{preview.description}
                            </div>
                            {preview.itinerary && <div>
                                <strong>Itinerary:</strong><br /><HTMLRenderer htmlContent={preview.itinerary} />
                            </div>}
                            {preview.accommodation && <div>
                                <strong>Accommodation:</strong><br />{preview.accommodation}
                            </div>}
                            {preview.best_time && <div>
                                <strong>Best Time:</strong><br />{preview.best_time}
                            </div>}
                            {preview.activities && <div>
                                <strong>Activities:</strong><br />{preview.activities}
                            </div>}
                        </div>
                    </Modal>
                )}
            </AnimatePresence>
        </div>
    );
}

/* ---------------- DESTINATIONS MANAGER ---------------- */
// < "view" | "create" | "edit" >
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
        } catch (error) {
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
            let response;
            if (mode === "edit" && editingId) {
                response = await axiosInstance.put(`/destinations/${editingId}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                setData(data.map(item => item.id === editingId ? response.data.data : item));
                toast.success('Destination updated successfully');
            } else {
                response = await axiosInstance.post('/destinations', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                setData([response.data.data, ...data]);
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
                setData(data.filter(item => item.id !== id));
                toast.success('Destination deleted successfully');
            } catch (error) {
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
                    <CiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <Input placeholder="Search destinations..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 bg-white" />
                </div>
                {mode === "view" && (
                    <Button onClick={() => { resetForm(); setMode("create"); }} className="bg-amber-600 hover:bg-amber-700 flex items-center gap-2 text-white">
                        <CiCirclePlus className="text-xl" /> Add Destination
                    </Button>
                )}
            </div>

            {mode !== "view" ? (
                <Card className="p-6 border-0 shadow-lg">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold text-gray-800">{mode === "create" ? "Add New Destination" : "Edit Destination"}</h3>
                        <Button variant="ghost" onClick={handleCancel} className="text-red-500 hover:text-red-700">
                            <IoClose className="text-2xl" /> Cancel
                        </Button>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-1 block">Country Name *</label>
                            <select value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="border w-full border-gray-300 rounded-lg px-3 py-2">
                                <option value="Uganda">Uganda</option>
                                <option value="Kenya">Kenya</option>
                                <option value="Tanzania">Tanzania</option>
                                <option value="Rwanda">Rwanda</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-1 block">Banner Image</label>
                            {form.existingBanner && !form.banner && (
                                <div className="mb-2">
                                    <img src={`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${form.existingBanner}`} alt="Current" className="w-32 h-24 object-cover rounded-lg" />
                                    <p className="text-xs text-gray-500 mt-1">Current banner (upload new to replace)</p>
                                </div>
                            )}
                            <Input type="file" onChange={e => setForm({ ...form, banner: e.target.files[0], existingBanner: null })} accept="image/*" />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-1 block">Description</label>
                            <Textarea rows={3} placeholder="Describe the destination..." value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-1 block">Tourism Information</label>
                            <Textarea rows={3} placeholder="Key tourism information..." value={form.tourism} onChange={e => setForm({ ...form, tourism: e.target.value })} />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-1 block">Highlights</label>
                            <Textarea rows={2} placeholder="Separate with commas (e.g., Mountain Gorillas, Nile River)" value={form.highlights} onChange={e => setForm({ ...form, highlights: e.target.value })} />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-1 block">Map Embed URL</label>
                            <Input placeholder="Google Maps embed URL" value={form.map} onChange={e => setForm({ ...form, map: e.target.value })} />
                        </div>
                        <Button className="w-full bg-amber-600 hover:bg-amber-700" onClick={handleSave}>
                            {mode === "create" ? "Create Destination" : "Update Destination"}
                        </Button>
                    </div>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {loading ? (
                        <div className="col-span-full text-center py-12 text-gray-400">Loading destinations...</div>
                    ) : filteredData.length === 0 ? (
                        <div className="col-span-full text-center py-12 text-gray-400 bg-white rounded-xl">No destinations yet. Click "Add Destination" to get started.</div>
                    ) : (
                        filteredData.map((item) => (
                            <motion.div key={item.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} whileHover={{ y: -4 }} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                                <div className="h-32 bg-linear-to-r from-amber-400 to-amber-600 relative">
                                    {item.banner && <img src={`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${item.banner}`} alt={item.name} className="w-full h-full object-cover" />}
                                    <div className={`absolute inset-0 ${!item.banner ? 'bg-linear-to-r from-amber-400 to-amber-600' : 'bg-black/30'} flex items-center justify-center`}>
                                        <CiLocationOn className="text-white text-5xl opacity-80" />
                                    </div>
                                </div>
                                <div className="p-5">
                                    <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
                                    <p className="text-gray-600 text-sm line-clamp-2 mb-4">{item.description || "No description"}</p>
                                    <div className="flex gap-2">
                                        <Button size="sm" variant="outline" onClick={() => setPreview(item)} className="flex-1">View Details</Button>
                                        <Button size="sm" variant="outline" onClick={() => handleEdit(item)} className="flex-1">Edit</Button>
                                        <Button size="sm" variant="destructive" onClick={() => handleDelete(item.id)} className="text-red-600"><CiTrash /> Delete</Button>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            )}

            <AnimatePresence>
                {preview && (
                    <Modal onClose={() => setPreview(null)} title={preview.name}>
                        <div className="space-y-4 max-h-[70vh] overflow-y-auto">
                            {preview.banner && <img src={`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${preview.banner}`} alt={preview.name} className="w-full h-48 object-cover rounded-lg" />}
                            <div>
                                <strong>Description:</strong><br />{preview.description || "No description"}
                            </div>
                            {preview.tourism && <div>
                                <strong>Tourism Info:</strong><br />{preview.tourism}
                            </div>}
                            {preview.highlights && <div>
                                <strong>Highlights:</strong><br />{preview.highlights}
                            </div>}
                            {preview.map && <iframe src={preview.map} className="w-full h-64 rounded-lg" title="Map" />}
                        </div>
                    </Modal>
                )}
            </AnimatePresence>
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
        } catch (error) {
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
        } catch (error) {
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
            link.setAttribute('download', 'subscribers.csv');
            document.body.appendChild(link);
            link.click();
            link.remove();
            toast.success('Subscribers exported successfully');
        } catch (error) {
            toast.error('Failed to export subscribers');
        }
    };

    const filteredSubscribers = subscribers.filter(sub =>
        sub.email.toLowerCase().includes(search.toLowerCase()) ||
        (sub.name && sub.name.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card className="bg-linear-to-r from-blue-50 to-blue-100 border-none">
                    <CardContent className="p-4">
                        <div className="flex justify-between">
                            <div>
                                <p className="text-sm text-blue-600">Total</p>
                                <p className="text-2xl font-bold text-blue-800">{stats.total}</p>
                            </div>
                            <MdPeople className="text-3xl text-blue-500" />
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-linear-to-r from-green-50 to-green-100 border-none">
                    <CardContent className="p-4">
                        <div className="flex justify-between">
                            <div>
                                <p className="text-sm text-green-600">Active</p>
                                <p className="text-2xl font-bold text-green-800">{stats.active}</p>
                            </div>
                            <CiUser className="text-3xl text-green-500" />
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-linear-to-r from-amber-50 to-amber-100 border-none">
                    <CardContent className="p-4">
                        <div className="flex justify-between">
                            <div>
                                <p className="text-sm text-amber-600">Unsubscribed</p>
                                <p className="text-2xl font-bold text-amber-800">{stats.unsubscribed}</p>
                            </div>
                            <MdEmail className="text-3xl text-amber-500" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                    <CiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <Input placeholder="Search subscribers..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 bg-white" />
                </div>
                <div className="flex gap-3">
                    <Button onClick={handleExportCSV} variant="outline" className="flex items-center gap-2">
                        <FaDownload className="text-xl" />
                        Export CSV
                    </Button>
                    <Button onClick={() => setShowBulkEmail(true)} className="bg-amber-600 hover:bg-amber-700 flex items-center gap-2">
                        <CiMail className="text-xl" />
                        Send Newsletter
                    </Button>
                </div>
            </div>

            <Card className="overflow-hidden border-0 shadow-lg">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50"><tr className="border-b"><th className="px-6 py-4 text-left">Email</th><th className="px-6 py-4 text-left">Name</th><th className="px-6 py-4 text-left">Status</th><th className="px-6 py-4 text-left">Subscribed Date</th> </tr></thead>
                        <tbody>
                            {loading ? <tr>
                                <td colSpan={4} className="px-6 py-12 text-center">Loading...</td>
                            </tr> : filteredSubscribers.length === 0 ? <tr>
                                <td colSpan={4} className="px-6 py-12 text-center">No subscribers found</td>
                            </tr> : filteredSubscribers.map((sub) => (<tr key={sub.id} className="border-b hover:bg-gray-50">
                                <td className="px-6 py-4">{sub.email}</td><td className="px-6 py-4">{sub.name || "—"}</td>
                                <td className="px-6 py-4"><span className={`px-2 py-1 rounded-full text-xs ${sub.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{sub.status}</span></td>
                                <td className="px-6 py-4">{new Date(sub.subscribedAt).toLocaleDateString()}</td>
                            </tr>))}
                        </tbody>
                    </table>
                </div>
            </Card>

            {showBulkEmail && (
                <Modal onClose={() => setShowBulkEmail(false)} title="Send Newsletter">
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-medium block mb-1">Send To</label>
                            <select value={bulkEmail.sendTo} onChange={(e) => setBulkEmail({ ...bulkEmail, sendTo: e.target.value })} className="border w-full rounded-lg px-3 py-2">
                                <option value="active">Active Subscribers Only</option>
                                <option value="all">All Subscribers</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-sm font-medium block mb-1">Subject *</label><Input placeholder="Newsletter subject" value={bulkEmail.subject} onChange={(e) => setBulkEmail({ ...bulkEmail, subject: e.target.value })} />
                        </div>
                        <div>
                            <label className="text-sm font-medium block mb-1">Email Content (HTML) *</label>
                            <Textarea placeholder="Write your newsletter. Use {{name}} for subscriber name, {{unsubscribe_link}} for unsubscribe link." rows={10} value={bulkEmail.htmlContent} onChange={(e) => setBulkEmail({ ...bulkEmail, htmlContent: e.target.value })} />
                            <p className="text-xs text-gray-500 mt-1">Tip: Use {'{{name}}'} for subscriber name, {'{{unsubscribe_link}}'} for unsubscribe link</p>
                        </div>
                        <div className="flex gap-3">
                            <Button onClick={handleSendTestEmail} disabled={sending} variant="outline" className="flex-1">{sending ? "Sending..." : "Send Test"}</Button>
                            <Button onClick={handleSendBulkEmail} disabled={sending} className="flex-1 bg-amber-600 hover:bg-amber-700 text-white">{sending ? "Sending..." : `Send to ${stats.active} Subscribers`}</Button>
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
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative shadow-2xl" onClick={(e) => e.stopPropagation()}>
                <div className="sticky top-0 bg-white z-10 flex items-center justify-between p-5 pb-0 border-b">
                    <h3 className="text-xl font-bold text-gray-800">{title}</h3>
                    <button className="w-8 h-8 text-2xl rounded-full text-red-600 bg-red-100 hover:bg-red-500 hover:text-white flex items-center justify-center" onClick={onClose}><IoClose /></button>
                </div>
                <div className="p-6">{children}</div>
            </motion.div>
        </div>
    );
}