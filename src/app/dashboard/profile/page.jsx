'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { MdPhotoCamera, MdPerson, MdVerified, MdShare, MdSecurity, MdAdd, MdClose, MdSave, MdEdit, MdLocationOn, MdEmail, MdPhone, MdArrowBack, MdLogout } from 'react-icons/md';
import { getMe, updateUserProfile, changePassword } from '@/services/authService';
import { toast } from 'react-hot-toast';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';

const ChangePasswordModal = ({ isOpen, onClose }) => {
    const [passData, setPassData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
    const [isLoading, setIsLoading] = useState(false);

    if (!isOpen) return null;

    const handleChange = (e) => setPassData({ ...passData, [e.target.name]: e.target.value });

    const handleSubmit = async () => {
        if (!passData.currentPassword || !passData.newPassword || !passData.confirmPassword) {
            toast.error("Please fill in all fields");
            return;
        }
        if (passData.newPassword !== passData.confirmPassword) {
            toast.error("New passwords don't match");
            return;
        }
        if (passData.newPassword.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }

        setIsLoading(true);
        try {
            await changePassword({
                currentPassword: passData.currentPassword,
                newPassword: passData.newPassword
            });
            toast.success("Password updated successfully");
            onClose();
            setPassData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed to change password");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white dark:bg-gray-800 rounded-3xl p-8 w-full max-w-md shadow-2xl border border-gray-100 dark:border-gray-700"
            >
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-[#1f2937] dark:text-white flex items-center gap-2">
                        <MdSecurity className="text-[#d4af37]" /> Change Password
                    </h3>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
                        <MdClose />
                    </button>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Current Password</label>
                        <input type="password" name="currentPassword" value={passData.currentPassword} onChange={handleChange} className="w-full bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm font-semibold text-[#1f2937] dark:text-white outline-none focus:border-[#d4af37] transition-all" />
                    </div>
                    <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">New Password</label>
                        <input type="password" name="newPassword" value={passData.newPassword} onChange={handleChange} className="w-full bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm font-semibold text-[#1f2937] dark:text-white outline-none focus:border-[#d4af37] transition-all" />
                    </div>
                    <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Confirm New Password</label>
                        <input type="password" name="confirmPassword" value={passData.confirmPassword} onChange={handleChange} className="w-full bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm font-semibold text-[#1f2937] dark:text-white outline-none focus:border-[#d4af37] transition-all" />
                    </div>
                </div>

                <div className="flex justify-end gap-3 mt-8">
                    <button onClick={onClose} className="px-5 py-2.5 rounded-full font-bold text-sm text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">Cancel</button>
                    <button onClick={handleSubmit} disabled={isLoading} className="px-6 py-2.5 rounded-full bg-[#1f2937] text-white font-bold text-sm hover:bg-black transition-all shadow-lg hover:shadow-xl flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
                        {isLoading ? 'Updating...' : 'Update Password'}
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

const ProfileView = ({ userData, specialties, onEdit, onLogout, onChangePassword }) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="max-w-4xl mx-auto space-y-6"
    >
        {/* Header / Cover Card */}
        <div className="bg-white dark:bg-gray-800 rounded-[32px] p-8 shadow-sm border border-gray-100 dark:border-gray-700 relative overflow-hidden">
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left relative z-10">
                <div className="size-32 rounded-full bg-[#d4af37] border-4 border-white dark:border-gray-800 shadow-xl flex items-center justify-center overflow-hidden relative">
                    {userData.avatar ? (
                        <Image src={userData.avatar} alt="Profile" fill className="object-cover" unoptimized />
                    ) : (
                        <span className="text-4xl font-black text-[#1f2937]">{userData.fullName ? userData.fullName.substring(0, 2).toUpperCase() : 'UN'}</span>
                    )}
                </div>

                <div className="flex-1">
                    <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-4">
                        <div>
                            <h2 className="text-3xl font-extrabold text-[#1f2937] dark:text-white">{userData.fullName}</h2>
                            <p className="text-[#d4af37] text-sm font-bold uppercase tracking-widest mt-1">{userData.role} {userData.specialty && `• ${userData.specialty}`}</p>
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-4 text-sm text-gray-500 dark:text-gray-400">
                                {userData.location && <span className="flex items-center gap-1"><MdLocationOn className="text-[#d4af37]" /> {userData.location}</span>}
                                {userData.license && <span className="flex items-center gap-1"><MdVerified className="text-[#d4af37]" /> License: {userData.license}</span>}
                            </div>
                        </div>
                        <button
                            onClick={onEdit}
                            className="px-6 py-2.5 rounded-full bg-[#1f2937] text-white font-bold text-sm hover:bg-black transition-all shadow-lg hover:shadow-xl flex items-center gap-2 group"
                        >
                            <MdEdit className="group-hover:scale-110 transition-transform" /> Edit Profile
                        </button>
                    </div>

                    {/* Stats Row */}
                    <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-gray-100 dark:border-gray-700">
                        <div className="text-center md:text-left">
                            <h4 className="text-2xl font-black text-[#1f2937] dark:text-white">{userData.listingsActive || 0}</h4>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Active Listings</p>
                        </div>
                        <div className="text-center md:text-left">
                            <h4 className="text-2xl font-black text-[#1f2937] dark:text-white">{userData.listingsSold || 0}</h4>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Properties Sold</p>
                        </div>
                        <div className="text-center md:text-left">
                            <h4 className="text-2xl font-black text-[#1f2937] dark:text-white">{userData.totalSales || '0'}</h4>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Sales Volume</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Column: About & Contact */}

            {/* Show About Me if bio or specialties exist */}
            {(userData.bio || (specialties && specialties.length > 0)) && (
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 h-full">
                        <h3 className="text-lg font-bold text-[#1f2937] dark:text-white mb-4">About Me</h3>
                        {userData.bio && (
                            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                                {userData.bio}
                            </p>
                        )}

                        {specialties && specialties.length > 0 && (
                            <div className="mt-6 flex flex-wrap gap-2">
                                {specialties.map((tag) => (
                                    <span key={tag} className="bg-gray-50 dark:bg-gray-700 px-3 py-1.5 rounded-lg text-xs font-bold text-gray-600 dark:text-gray-300 border border-gray-100 dark:border-gray-600">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Right Column: Contact info */}
            {/* Show Contact Info if any contact details exist */}
            {(userData.email || userData.phone || userData.linkedin || userData.instagram) && (
                <div className={`space-y-6 ${(userData.bio || (specialties && specialties.length > 0)) ? '' : 'md:col-span-3'}`}>
                    <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 h-full">
                        <h3 className="text-lg font-bold text-[#1f2937] dark:text-white mb-6">Contact Info</h3>
                        <div className="space-y-4">
                            {userData.email && (
                                <div className="flex items-center gap-3 text-sm font-medium text-gray-600 dark:text-gray-300">
                                    <div className="size-8 rounded-full bg-[#fff8e1] flex items-center justify-center text-[#d4af37] shrink-0"><MdEmail /></div>
                                    <span className="truncate">{userData.email}</span>
                                </div>
                            )}
                            {userData.phone && (
                                <div className="flex items-center gap-3 text-sm font-medium text-gray-600 dark:text-gray-300">
                                    <div className="size-8 rounded-full bg-[#fff8e1] flex items-center justify-center text-[#d4af37] shrink-0"><MdPhone /></div>
                                    <span>{userData.phone}</span>
                                </div>
                            )}
                            {userData.linkedin && (
                                <div className="flex items-center gap-3 text-sm font-medium text-gray-600 dark:text-gray-300">
                                    <div className="size-8 rounded-full bg-[#fff8e1] flex items-center justify-center text-[#d4af37] shrink-0"><MdShare /></div>
                                    <span className="truncate">{userData.linkedin}</span>
                                </div>
                            )}
                            {userData.instagram && (
                                <div className="flex items-center gap-3 text-sm font-medium text-gray-600 dark:text-gray-300">
                                    <div className="size-8 rounded-full bg-[#fff8e1] flex items-center justify-center text-[#d4af37] shrink-0"><MdShare /></div>
                                    <span className="truncate">{userData.instagram}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>

        {/* Sign Out Button at Bottom */}
        <div className="flex flex-col items-center gap-4 pt-8 border-t border-gray-200 dark:border-gray-700">
            <button
                onClick={onChangePassword}
                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 px-6 py-3 rounded-full font-bold text-sm transition-colors"
            >
                <MdSecurity className="text-lg" /> Change Password
            </button>
            <button
                onClick={onLogout}
                className="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 px-6 py-3 rounded-full font-bold text-sm transition-colors shadow-sm hover:shadow-md"
            >
                <MdLogout className="text-lg" /> Sign Out
            </button>
        </div>
    </motion.div>
);

const ProfileEdit = ({ userData, formData, handleChange, specialties, newSpecialty, setNewSpecialty, handleAddSpecialty, handleRemoveSpecialty, onCancel, onSave, isSaving }) => (
    <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="max-w-4xl mx-auto space-y-6"
    >
        {/* 1. Profile Photo Header */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
            <div className="relative group">
                <div className="size-24 rounded-full bg-[#d4af37] border-4 border-white dark:border-gray-800 shadow-md overflow-hidden flex items-center justify-center relative">
                    {formData.avatar ? (
                        <Image src={formData.avatar} alt="Preview" fill className="object-cover" unoptimized />
                    ) : (
                        <MdPerson className="text-4xl text-white" />
                    )}
                </div>
                <button
                    onClick={() => {
                        const url = prompt('Please enter the URL for your profile picture:');
                        if (url) {
                            handleChange({ target: { name: 'avatar', value: url } });
                        }
                    }}
                    className="absolute bottom-0 right-0 p-2 bg-[#1f2937] text-white rounded-full hover:bg-black transition-colors shadow-sm"
                >
                    <MdPhotoCamera className="text-xs" />
                </button>
            </div>
            <div>
                <h2 className="text-2xl font-bold text-[#1f2937] dark:text-white">{userData.fullName}</h2>
                <p className="text-[#d4af37] text-xs font-bold uppercase tracking-widest mt-1">{userData.role}</p>
                <p className="text-gray-400 text-xs mt-2">Update your photo and personal details.</p>
            </div>
        </div>

        {/* 2. Personal Information */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-6 text-[#d4af37]">
                <MdPerson className="text-xl" />
                <h3 className="text-base font-bold text-[#1f2937] dark:text-white">Personal Information</h3>
            </div>

            {/* Avatar URL Input (Explicit) */}
            <div className="mb-6">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">Profile Picture URL</label>
                <input
                    type="text"
                    name="avatar"
                    value={formData.avatar || ''}
                    onChange={handleChange}
                    placeholder="https://example.com/my-photo.jpg"
                    className="w-full bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm font-semibold text-[#1f2937] dark:text-white outline-none focus:border-[#d4af37] transition-all"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Full Name</label>
                    <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm font-semibold text-[#1f2937] dark:text-white outline-none focus:border-[#d4af37] transition-all" />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Email Address</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm font-semibold text-[#1f2937] dark:text-white outline-none focus:border-[#d4af37] transition-all" />
                </div>
                <div className="col-span-1 md:col-span-2 space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Phone Number</label> <br />
                    <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm font-semibold text-[#1f2937] dark:text-white outline-none focus:border-[#d4af37] transition-all md:w-1/2" />
                </div>
                <div className="col-span-1 md:col-span-2 space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Short Bio</label>
                    <textarea name="bio" rows="4" value={formData.bio} onChange={handleChange} className="w-full bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm font-medium text-gray-600 dark:text-gray-300 outline-none focus:border-[#d4af37] transition-all resize-none" />
                </div>
            </div>
        </div>

        {/* 3. Professional Details & Specialties */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-6 text-[#d4af37]">
                <MdVerified className="text-xl" />
                <h3 className="text-base font-bold text-[#1f2937] dark:text-white">Professional Details</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">License Number</label>
                    <input type="text" name="license" value={formData.license} onChange={handleChange} className="w-full bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm font-semibold text-[#1f2937] dark:text-white outline-none focus:border-[#d4af37] transition-all" />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Years of Experience</label>
                    <input type="number" name="experience" value={formData.experience} onChange={handleChange} className="w-full bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm font-semibold text-[#1f2937] dark:text-white outline-none focus:border-[#d4af37] transition-all" />
                </div>
                <div className="col-span-1 md:col-span-2 space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Specialties</label>
                    <div className="flex flex-wrap items-center gap-2">
                        {specialties.map((tag) => (
                            <div key={tag} className="bg-[#fff8e1] text-[#d4af37] px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                                {tag}
                                <button onClick={() => handleRemoveSpecialty(tag)} className="hover:text-red-500"><MdClose /></button>
                            </div>
                        ))}
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                value={newSpecialty}
                                onChange={(e) => setNewSpecialty(e.target.value)}
                                placeholder="Add new..."
                                className="bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1.5 text-xs outline-none focus:border-[#d4af37] w-24"
                            />
                            <button onClick={handleAddSpecialty} className="size-7 rounded-full bg-gray-100 hover:bg-[#d4af37] hover:text-white flex items-center justify-center transition-colors">
                                <MdAdd />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* 4. Social Presence */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-6 text-[#d4af37]">
                <MdShare className="text-xl" />
                <h3 className="text-base font-bold text-[#1f2937] dark:text-white">Social Presence</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">LinkedIn Profile</label>
                    <input
                        type="text"
                        name="linkedin"
                        value={formData.linkedin}
                        onChange={handleChange}
                        className="w-full bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm font-semibold text-[#1f2937] dark:text-white outline-none focus:border-[#d4af37] transition-all"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Instagram Handle</label>
                    <input
                        type="text"
                        name="instagram"
                        value={formData.instagram}
                        onChange={handleChange}
                        className="w-full bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm font-semibold text-[#1f2937] dark:text-white outline-none focus:border-[#d4af37] transition-all"
                    />
                </div>
            </div>
        </div>

        {/* Save Actions */}
        <div className="flex justify-end gap-3 pt-4">
            <button
                onClick={onCancel}
                className="px-6 py-2.5 rounded-full border border-gray-300 dark:border-gray-600 font-bold text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
                Cancel
            </button>
            <button
                onClick={onSave}
                disabled={isSaving}
                className="px-8 py-2.5 rounded-full bg-[#1f2937] text-white font-bold text-sm hover:bg-black transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
            >
                <MdSave className="text-lg" /> {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
        </div>
    </motion.div>
);

const ProfilePage = () => {
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

    // Initial User Data State
    const [userData, setUserData] = useState({
        fullName: '',
        role: 'User',
        specialty: '',
        email: '',
        phone: '',
        bio: '',
        license: '',
        experience: '',
        linkedin: '',
        instagram: '',
        location: '',
        listingsActive: 0,
        listingsSold: 0,
        totalSales: '0',
        avatar: ''
    });

    // Form State
    const [formData, setFormData] = useState({ ...userData });
    const [specialties, setSpecialties] = useState([]);
    const [newSpecialty, setNewSpecialty] = useState('');

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const data = await getMe();
            const mapping = {
                fullName: data.name || '',
                role: data.role || 'User',
                specialty: (data.specialties && data.specialties[0]) || '',
                email: data.email || '',
                phone: data.phone || '',
                bio: data.bio || '',
                license: data.license || '',
                experience: data.experience || '',
                linkedin: data.socials?.linkedin || '',
                instagram: data.socials?.instagram || '',
                location: data.location || '',
                listingsActive: 0,
                listingsSold: 0,
                totalSales: '0',
                avatar: data.avatar || ''
            };
            setUserData(mapping);
            setFormData(mapping);
            setSpecialties(data.specialties || []);
        } catch (error) {
            console.error('Failed to fetch user data', error);
        }
    };

    const performLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error('Logout failed', error);
        } finally {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            router.push('/login');
        }
    };

    const handleLogout = () => {
        toast((t) => (
            <div className="flex flex-col gap-3 min-w-[200px]">
                <p className="font-bold text-sm text-center text-gray-800">Sign out?</p>
                <div className="flex gap-2 justify-center">
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="px-4 py-1.5 text-xs font-bold bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            toast.dismiss(t.id);
                            performLogout();
                        }}
                        className="px-4 py-1.5 text-xs font-bold bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        ), {
            id: 'logout-confirmation',
            duration: 4000,
            position: 'top-center',
            style: {
                border: '1px solid #e5e7eb',
                padding: '16px',
                color: '#1f2937',
            },
        });
    };

    // --- Handlers ---
    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleAddSpecialty = () => {
        if (newSpecialty.trim() && !specialties.includes(newSpecialty.trim())) {
            setSpecialties([...specialties, newSpecialty.trim()]);
            setNewSpecialty('');
        }
    };

    const handleRemoveSpecialty = (tag) => setSpecialties(specialties.filter(t => t !== tag));

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const apiData = {
                name: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                avatar: formData.avatar,
                bio: formData.bio,
                license: formData.license,
                experience: Number(formData.experience),
                location: formData.location,
                specialties: specialties,
                socials: {
                    linkedin: formData.linkedin,
                    instagram: formData.instagram
                }
            };

            await updateUserProfile(apiData);

            // Refresh view data
            setUserData({ ...formData });
            setIsEditing(false);
            toast.success('Profile updated successfully!');
        } catch (error) {
            console.error('Failed to update profile', error);
            toast.error('Failed to update profile.');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#1a1a1a]">
            {/* Header Title */}
            <header className="sticky top-0 z-20 bg-gray-50/80 dark:bg-[#1a1a1a]/90 backdrop-blur-md px-6 py-4 border-b border-gray-100 dark:border-gray-800 shadow-sm md:shadow-none flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-extrabold text-[#1f2937] dark:text-white tracking-tight flex items-center gap-3">
                        {isEditing && (
                            <button onClick={() => setIsEditing(false)} className="hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-full transition-colors">
                                <MdArrowBack />
                            </button>
                        )}
                        {isEditing ? 'Edit Profile' : 'My Profile'}
                    </h1>
                    <p className="text-gray-500 text-xs mt-0.5 ml-1 md:ml-0">
                        {isEditing ? 'Update your personal and professional details' : 'Manage your public presence and account info'}
                    </p>
                </div>

            </header>

            <div className="p-6 md:p-8 pt-4">
                <ChangePasswordModal
                    isOpen={isPasswordModalOpen}
                    onClose={() => setIsPasswordModalOpen(false)}
                />

                <AnimatePresence mode="wait">
                    {isEditing ? (
                        <ProfileEdit
                            key="edit"
                            userData={userData}
                            formData={formData}
                            handleChange={handleChange}
                            specialties={specialties}
                            newSpecialty={newSpecialty}
                            setNewSpecialty={setNewSpecialty}
                            handleAddSpecialty={handleAddSpecialty}
                            handleRemoveSpecialty={handleRemoveSpecialty}
                            onCancel={() => setIsEditing(false)}
                            onSave={handleSave}
                            isSaving={isSaving}
                        />
                    ) : (
                        <ProfileView
                            key="view"
                            userData={userData}
                            specialties={specialties}
                            onEdit={() => setIsEditing(true)}
                            onLogout={handleLogout}
                            onChangePassword={() => setIsPasswordModalOpen(true)}
                        />
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ProfilePage;
