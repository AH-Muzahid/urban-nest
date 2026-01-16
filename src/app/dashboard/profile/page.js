'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdPhotoCamera, MdPerson, MdVerified, MdShare, MdSecurity, MdAdd, MdClose, MdSave, MdEdit, MdLocationOn, MdEmail, MdPhone, MdArrowBack } from 'react-icons/md';

const ProfileView = ({ userData, specialties, onEdit }) => (
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
                {/* Avatar */}
                <div className="size-32 rounded-full bg-[#d4af37] border-4 border-white dark:border-gray-800 shadow-xl flex items-center justify-center text-4xl font-black text-[#1f2937]">
                    AT
                </div>

                <div className="flex-1">
                    <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-4">
                        <div>
                            <h2 className="text-3xl font-extrabold text-[#1f2937] dark:text-white">{userData.fullName}</h2>
                            <p className="text-[#d4af37] text-sm font-bold uppercase tracking-widest mt-1">{userData.role} • {userData.specialty}</p>
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-4 text-sm text-gray-500 dark:text-gray-400">
                                <span className="flex items-center gap-1"><MdLocationOn className="text-[#d4af37]" /> {userData.location}</span>
                                <span className="flex items-center gap-1"><MdVerified className="text-[#d4af37]" /> License: {userData.license}</span>
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
                            <h4 className="text-2xl font-black text-[#1f2937] dark:text-white">{userData.listingsActive}</h4>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Active Listings</p>
                        </div>
                        <div className="text-center md:text-left">
                            <h4 className="text-2xl font-black text-[#1f2937] dark:text-white">{userData.listingsSold}</h4>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Properties Sold</p>
                        </div>
                        <div className="text-center md:text-left">
                            <h4 className="text-2xl font-black text-[#1f2937] dark:text-white">{userData.totalSales}</h4>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Sales Volume</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Column: About & Contact */}
            <div className="md:col-span-2 space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
                    <h3 className="text-lg font-bold text-[#1f2937] dark:text-white mb-4">About Me</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                        {userData.bio}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-2">
                        {specialties.map((tag) => (
                            <span key={tag} className="bg-gray-50 dark:bg-gray-700 px-3 py-1.5 rounded-lg text-xs font-bold text-gray-600 dark:text-gray-300 border border-gray-100 dark:border-gray-600">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Column: Contact info */}
            <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
                    <h3 className="text-lg font-bold text-[#1f2937] dark:text-white mb-6">Contact Info</h3>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 text-sm font-medium text-gray-600 dark:text-gray-300">
                            <div className="size-8 rounded-full bg-[#fff8e1] flex items-center justify-center text-[#d4af37] shrink-0"><MdEmail /></div>
                            <span className="truncate">{userData.email}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm font-medium text-gray-600 dark:text-gray-300">
                            <div className="size-8 rounded-full bg-[#fff8e1] flex items-center justify-center text-[#d4af37] shrink-0"><MdPhone /></div>
                            <span>{userData.phone}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm font-medium text-gray-600 dark:text-gray-300">
                            <div className="size-8 rounded-full bg-[#fff8e1] flex items-center justify-center text-[#d4af37] shrink-0"><MdShare /></div>
                            <span className="truncate">{userData.linkedin}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm font-medium text-gray-600 dark:text-gray-300">
                            <div className="size-8 rounded-full bg-[#fff8e1] flex items-center justify-center text-[#d4af37] shrink-0"><MdShare /></div>
                            <span className="truncate">{userData.instagram}</span>
                        </div>
                    </div>
                </div>
            </div>
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
                <div className="size-24 rounded-full bg-[#d4af37] border-4 border-white dark:border-gray-800 shadow-md"></div>
                <button className="absolute bottom-0 right-0 p-2 bg-[#1f2937] text-white rounded-full hover:bg-black transition-colors shadow-sm">
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
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Phone Number</label>
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
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    // Simulated User Data (Shared between View and Edit)
    const [userData, setUserData] = useState({
        fullName: 'Alexander Thorne',
        role: 'Senior Partner',
        specialty: 'Luxury Real Estate',
        email: 'alex.thorne@urbannest.com',
        phone: '+1 (555) 928-4421',
        bio: 'Award-winning luxury real estate partner with over 12 years of experience in the Miami and Los Angeles markets. Specializing in high-end penthouses and waterfront estates. Known for discretion and record-breaking sales.',
        license: 'RE-992834-CA',
        experience: '12',
        linkedin: 'linkedin.com/in/alexthorne',
        instagram: '@alexthorne_luxury',
        location: 'Miami, FL',
        listingsActive: 12,
        listingsSold: 145,
        totalSales: '$285M'
    });

    // Edit Form State (Initialize with userData)
    const [formData, setFormData] = useState({ ...userData, currentPassword: '', newPassword: '' });
    const [specialties, setSpecialties] = useState(['Luxury', 'Residential', 'Waterfront']);
    const [newSpecialty, setNewSpecialty] = useState('');

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
        await new Promise(resolve => setTimeout(resolve, 1000));
        setUserData({ ...formData }); // Update 'View' data
        setIsSaving(false);
        setIsEditing(false); // Switch back to view
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
                        />
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ProfilePage;
