import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { CiSearch, CiMail, CiDownload, CiUser } from "react-icons/ci";
import { MdEmail, MdPeople } from "react-icons/md";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-hot-toast";

export default function SubscribersManager() {
    const [subscribers, setSubscribers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [stats, setStats] = useState({ total: 0, active: 0, unsubscribed: 0 });
    const [showBulkEmail, setShowBulkEmail] = useState(false);
    const [bulkEmail, setBulkEmail] = useState({
        subject: "",
        htmlContent: "",
        sendTo: "active"
    });
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
            console.error('Failed to fetch subscribers:', error);
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
            const response = await axiosInstance.get('/messages/export-subscribers', {
                responseType: 'blob'
            });
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
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card className="bg-linear-to-r from-blue-50 to-blue-100 border-none">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-blue-600">Total Subscribers</p>
                                <p className="text-2xl font-bold text-blue-800">{stats.total}</p>
                            </div>
                            <MdPeople className="text-3xl text-blue-500" />
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-linear-to-r from-green-50 to-green-100 border-none">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
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
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-amber-600">Unsubscribed</p>
                                <p className="text-2xl font-bold text-amber-800">{stats.unsubscribed}</p>
                            </div>
                            <MdEmail className="text-3xl text-amber-500" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                    <CiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <Input
                        placeholder="Search subscribers..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-10 bg-white"
                    />
                </div>
                <div className="flex gap-3">
                    <Button
                        onClick={handleExportCSV}
                        variant="outline"
                        className="flex items-center gap-2"
                    >
                        <CiDownload className="text-xl" />
                        Export CSV
                    </Button>
                    <Button
                        onClick={() => setShowBulkEmail(true)}
                        className="bg-amber-600 hover:bg-amber-700 flex items-center gap-2"
                    >
                        <CiMail className="text-xl" />
                        Send Newsletter
                    </Button>
                </div>
            </div>

            {/* Subscribers Table */}
            <Card className="overflow-hidden border-0 shadow-lg">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr className="border-b border-gray-200">
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Email</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Name</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Subscribed Date</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">IP Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                                        Loading subscribers...
                                    </td>
                                </tr>
                            ) : filteredSubscribers.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                                        No subscribers found
                                    </td>
                                </tr>
                            ) : (
                                filteredSubscribers.map((subscriber) => (
                                    <motion.tr
                                        key={subscriber.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="px-6 py-4 font-medium">{subscriber.email}</td>
                                        <td className="px-6 py-4">{subscriber.name || "—"}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${subscriber.status === 'active' ? 'bg-green-100 text-green-700' : subscriber.status === 'unsubscribed' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}`}>
                                                {subscriber.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm">
                                            {new Date(subscriber.subscribedAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-sm">{subscriber.ipAddress || "—"}</td>
                                    </motion.tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Bulk Email Modal */}
            {showBulkEmail && (
                <Modal onClose={() => setShowBulkEmail(false)} title="Send Newsletter">
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-1 block">Send To</label>
                            <select
                                value={bulkEmail.sendTo}
                                onChange={(e) => setBulkEmail({ ...bulkEmail, sendTo: e.target.value })}
                                className="border w-full border-gray-300 rounded-lg px-3 py-2"
                            >
                                <option value="active">Active Subscribers Only</option>
                                <option value="all">All Subscribers (including unsubscribed)</option>
                            </select>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-1 block">Subject *</label>
                            <Input
                                placeholder="Newsletter subject"
                                value={bulkEmail.subject}
                                onChange={(e) => setBulkEmail({ ...bulkEmail, subject: e.target.value })}
                                className="border w-full border-gray-300 rounded-lg px-3 py-2"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-1 block">Email Content (HTML) *</label>
                            <Textarea
                                placeholder="Write your newsletter content here. You can use HTML tags. Use {{name}} for subscriber name, {{unsubscribe_link}} for unsubscribe link."
                                rows={10}
                                value={bulkEmail.htmlContent}
                                onChange={(e) => setBulkEmail({ ...bulkEmail, htmlContent: e.target.value })}
                                className="border w-full border-gray-300 rounded-lg px-3 py-2 font-mono text-sm"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Tip: Use {'{{name}}'} for subscriber name, {'{{unsubscribe_link}}'} for unsubscribe link
                            </p>
                        </div>

                        <div className="flex gap-3 pt-4">
                            <Button
                                onClick={handleSendTestEmail}
                                disabled={sending}
                                variant="outline"
                                className="flex-1"
                            >
                                {sending ? "Sending..." : "Send Test Email"}
                            </Button>
                            <Button
                                onClick={handleSendBulkEmail}
                                disabled={sending}
                                className="flex-1 bg-amber-600 hover:bg-amber-700"
                            >
                                {sending ? "Sending..." : `Send to ${stats.active} Subscribers`}
                            </Button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
}

// Modal component
function Modal({ children, onClose, title }) {
    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto relative shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="sticky top-0 bg-white z-10 flex items-center justify-between p-5 border-b border-gray-100">
                    <h3 className="text-xl font-bold text-gray-800">{title}</h3>
                    <button
                        className="w-8 h-8 text-2xl rounded-full text-red-600 bg-red-100 hover:bg-red-500 hover:text-white cursor-pointer flex items-center justify-center transition-colors"
                        onClick={onClose}
                    >
                        ×
                    </button>
                </div>
                <div className="p-6">
                    {children}
                </div>
            </motion.div>
        </div>
    );
}