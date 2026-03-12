import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, MapPin, Package, LogOut, Plus, Trash2, Edit2, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useMyOrders, Order } from '@/hooks/useOrders';
import { toast } from 'sonner';
import { API_URL } from '@/lib/api';

const Profile = () => {
    const { user, login, logout } = useAuth();
    const { data: orders, isLoading: ordersLoading } = useMyOrders();
    const [activeTab, setActiveTab] = useState<'profile' | 'addresses' | 'orders'>('profile');

    // Profile Form State
    const [profileForm, setProfileForm] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        password: '',
        confirmPassword: '',
    });

    // Address Form State
    const [isAddingAddress, setIsAddingAddress] = useState(false);
    const [addressForm, setAddressForm] = useState({
        street: '',
        city: '',
        state: '',
        postalCode: '',
        country: 'India',
        isDefault: false,
    });

    const handleProfileUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (profileForm.password && profileForm.password !== profileForm.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        try {
            const response = await fetch(`${API_URL}/api/users/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user?.token}`,
                },
                body: JSON.stringify({
                    name: profileForm.name,
                    email: profileForm.email,
                    phone: profileForm.phone,
                    password: profileForm.password || undefined,
                }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Failed to update profile');

            login(data); // Update context with new user data including potential token refresh
            toast.success('Profile updated successfully');
            setProfileForm(prev => ({ ...prev, password: '', confirmPassword: '' }));
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    const handleAddAddress = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/api/users/address`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user?.token}`,
                },
                body: JSON.stringify(addressForm),
            });

            const addresses = await response.json();
            if (!response.ok) throw new Error('Failed to add address');

            // Update local user state specifically for addresses
            // We need to construct the full user object to update context
            if (user) {
                const updatedUser = { ...user, addresses };
                login(updatedUser);
            }

            toast.success('Address added successfully');
            setIsAddingAddress(false);
            setAddressForm({
                street: '',
                city: '',
                state: '',
                postalCode: '',
                country: 'India',
                isDefault: false,
            });
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    const handleDeleteAddress = async (addressId: string) => {
        if (!confirm('Are you sure you want to delete this address?')) return;
        try {
            const response = await fetch(`${API_URL}/api/users/address/${addressId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${user?.token}`,
                },
            });

            const addresses = await response.json();
            if (!response.ok) throw new Error('Failed to delete address');

            if (user) {
                const updatedUser = { ...user, addresses };
                login(updatedUser);
            }
            toast.success('Address deleted');
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    if (!user) return null;

    return (
        <div className="min-h-screen bg-background py-12">
            <div className="container-custom">
                <h1 className="font-heading text-3xl font-bold mb-8">My Account</h1>

                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Sidebar Navigation */}
                    <div className="lg:col-span-1">
                        <div className="bg-card border border-border rounded-xl p-4 space-y-2 sticky top-24">
                            <button
                                onClick={() => setActiveTab('profile')}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'profile'
                                    ? 'bg-primary text-primary-foreground'
                                    : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                                    }`}
                            >
                                <User className="w-4 h-4" />
                                Profile Information
                            </button>
                            <button
                                onClick={() => setActiveTab('addresses')}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'addresses'
                                    ? 'bg-primary text-primary-foreground'
                                    : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                                    }`}
                            >
                                <MapPin className="w-4 h-4" />
                                Manage Addresses
                            </button>
                            <button
                                onClick={() => setActiveTab('orders')}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'orders'
                                    ? 'bg-primary text-primary-foreground'
                                    : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                                    }`}
                            >
                                <Package className="w-4 h-4" />
                                My Orders
                            </button>

                            <div className="pt-4 mt-4 border-t border-border">
                                <button
                                    onClick={logout}
                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-card border border-border rounded-xl p-6 md:p-8"
                        >
                            {activeTab === 'profile' && (
                                <div className="max-w-xl">
                                    <h2 className="text-xl font-bold mb-6">Profile Information</h2>
                                    <form onSubmit={handleProfileUpdate} className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Full Name</label>
                                            <input
                                                type="text"
                                                value={profileForm.name}
                                                onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                                                className="input-styled w-full"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Email Address</label>
                                            <input
                                                type="email"
                                                value={profileForm.email}
                                                onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                                                className="input-styled w-full"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Phone Number</label>
                                            <input
                                                type="tel"
                                                value={profileForm.phone}
                                                onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                                                className="input-styled w-full"
                                                placeholder="+91"
                                            />
                                        </div>
                                        <div className="pt-4 border-t border-border mt-6">
                                            <h3 className="text-sm font-bold mb-4 text-muted-foreground uppercase tracking-wider">Change Password</h3>
                                            <div className="grid gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium mb-1">New Password</label>
                                                    <input
                                                        type="password"
                                                        value={profileForm.password}
                                                        onChange={(e) => setProfileForm({ ...profileForm, password: e.target.value })}
                                                        className="input-styled w-full"
                                                        placeholder="Leave blank to keep current"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium mb-1">Confirm New Password</label>
                                                    <input
                                                        type="password"
                                                        value={profileForm.confirmPassword}
                                                        onChange={(e) => setProfileForm({ ...profileForm, confirmPassword: e.target.value })}
                                                        className="input-styled w-full"
                                                        placeholder="Confirm new password"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="pt-4">
                                            <Button type="submit">
                                                <Save className="w-4 h-4 mr-2" />
                                                Save Changes
                                            </Button>
                                        </div>
                                    </form>
                                </div>
                            )}

                            {activeTab === 'addresses' && (
                                <div>
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-xl font-bold">My Addresses</h2>
                                        {!isAddingAddress && (
                                            <Button onClick={() => setIsAddingAddress(true)} size="sm">
                                                <Plus className="w-4 h-4 mr-2" />
                                                Add New Address
                                            </Button>
                                        )}
                                    </div>

                                    {isAddingAddress ? (
                                        <div className="bg-muted/50 rounded-lg p-6 mb-6">
                                            <div className="flex justify-between items-center mb-4">
                                                <h3 className="font-semibold">Add New Address</h3>
                                                <Button variant="ghost" size="sm" onClick={() => setIsAddingAddress(false)}><X className="w-4 h-4" /></Button>
                                            </div>
                                            <form onSubmit={handleAddAddress} className="space-y-4">
                                                <div className="grid sm:grid-cols-2 gap-4">
                                                    <input
                                                        placeholder="Street Address"
                                                        className="input-styled"
                                                        value={addressForm.street}
                                                        onChange={e => setAddressForm({ ...addressForm, street: e.target.value })}
                                                        required
                                                    />
                                                    <input
                                                        placeholder="City"
                                                        className="input-styled"
                                                        value={addressForm.city}
                                                        onChange={e => setAddressForm({ ...addressForm, city: e.target.value })}
                                                        required
                                                    />
                                                    <input
                                                        placeholder="State"
                                                        className="input-styled"
                                                        value={addressForm.state}
                                                        onChange={e => setAddressForm({ ...addressForm, state: e.target.value })}
                                                        required
                                                    />
                                                    <input
                                                        placeholder="Postal Code"
                                                        className="input-styled"
                                                        value={addressForm.postalCode}
                                                        onChange={e => setAddressForm({ ...addressForm, postalCode: e.target.value })}
                                                        required
                                                    />
                                                    <input
                                                        placeholder="Country"
                                                        className="input-styled"
                                                        value={addressForm.country}
                                                        onChange={e => setAddressForm({ ...addressForm, country: e.target.value })}
                                                        required
                                                    />
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <input
                                                        type="checkbox"
                                                        id="defaultAdd"
                                                        checked={addressForm.isDefault}
                                                        onChange={e => setAddressForm({ ...addressForm, isDefault: e.target.checked })}
                                                    />
                                                    <label htmlFor="defaultAdd" className="text-sm">Set as default address</label>
                                                </div>
                                                <div className="flex justify-end gap-2">
                                                    <Button type="button" variant="outline" onClick={() => setIsAddingAddress(false)}>Cancel</Button>
                                                    <Button type="submit">Save Address</Button>
                                                </div>
                                            </form>
                                        </div>
                                    ) : null}

                                    <div className="grid gap-4">
                                        {user?.addresses && user.addresses.length > 0 ? (
                                            user.addresses.map((addr: any, index: number) => (
                                                <div key={index} className="flex items-start justify-between p-4 border border-border rounded-lg bg-card hover:bg-accent/5 transition-colors">
                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            <p className="font-semibold">{addr.street}</p>
                                                            {addr.isDefault && <span className="bg-primary/10 text-primary text-[10px] px-2 py-0.5 rounded-full font-bold">DEFAULT</span>}
                                                        </div>
                                                        <p className="text-sm text-muted-foreground">{addr.city}, {addr.state} {addr.postalCode}</p>
                                                        <p className="text-sm text-muted-foreground">{addr.country}</p>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDeleteAddress(addr._id)}>
                                                            <Trash2 className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-center py-12 text-muted-foreground">
                                                <MapPin className="w-12 h-12 mx-auto mb-3 opacity-20" />
                                                <p>No addresses found. Add one to speed up checkout.</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'orders' && (
                                <div>
                                    <h2 className="text-xl font-bold mb-6">Order History</h2>
                                    {ordersLoading ? (
                                        <div className="text-center py-12">Loading orders...</div>
                                    ) : orders && orders.length > 0 ? (
                                        <div className="space-y-4">
                                            {orders.map((order: Order) => (
                                                <div key={order._id} className="border border-border rounded-lg overflow-hidden">
                                                    <div className="bg-muted/30 p-4 flex flex-wrap gap-4 justify-between items-center text-sm">
                                                        <div>
                                                            <p className="text-muted-foreground">Order Placed</p>
                                                            <p className="font-medium">{new Date(order.createdAt).toLocaleDateString()}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-muted-foreground">Total</p>
                                                            <p className="font-medium">₹{order.totalPrice}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-muted-foreground">Order ID</p>
                                                            <p className="font-mono text-xs">#{order._id.slice(-6).toUpperCase()}</p>
                                                        </div>
                                                    </div>
                                                    <div className="p-4">
                                                        <div className="space-y-3">
                                                            {order.orderItems.map((item, idx) => (
                                                                <div key={idx} className="flex items-center gap-4">
                                                                    <div className="h-12 w-12 bg-muted rounded overflow-hidden">
                                                                        {/* Just a placeholder or img if available */}
                                                                        {item.image ? <img src={item.image} alt={item.name} className="h-full w-full object-cover" /> : <Package className="h-full w-full p-2 text-muted-foreground" />}
                                                                    </div>
                                                                    <div className="flex-1">
                                                                        <p className="font-medium text-sm">{item.name}</p>
                                                                        <p className="text-xs text-muted-foreground">Qty: {item.qty} {item.weight && `• ${item.weight}`}</p>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-12 text-muted-foreground">
                                            <Package className="w-12 h-12 mx-auto mb-3 opacity-20" />
                                            <p>You haven't placed any orders yet.</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
