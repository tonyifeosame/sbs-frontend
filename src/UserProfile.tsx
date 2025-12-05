import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchUserProfile, fetchUserBetslips } from './userService';
import SlipCard from './SlipCard';
import Sparkline from './Sparkline';

// Define the shape of the user profile data
type UserProfileData = {
    id: number;
    username: string;
    full_name: string;
    avatar_url: string;
    bio: string;
    is_verified: boolean;
    wins: number;
    losses: number;
    win_rate: number;
    country?: string;
    join_date: string;
};

// (profile data is fetched via userService.fetchUserProfile)

const UserProfile = () => {
    const { username } = useParams<{ username: string }>();
    const [profile, setProfile] = useState<UserProfileData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'slips'|'wins'|'losses'|'stats'|'subscriptions'>('slips');
    const [slips, setSlips] = useState<any[]>([]);
    const [currentStreak, setCurrentStreak] = useState<number | null>(null);
    const [bestStreak, setBestStreak] = useState<number | null>(null);
    const [slipsLoading, setSlipsLoading] = useState(false);

    useEffect(() => {
        let isCancelled = false;

        const loadProfile = async () => {
            if (!username) {
                setIsLoading(false);
                return;
            }
            setIsLoading(true);
            setError(null);
            try {
                const fetchedProfile = await fetchUserProfile(username);
                if (!isCancelled) {
                    setProfile(fetchedProfile);
                }
            } catch (error: any) {
                if (!isCancelled) {
                    setError(error.message);
                }
            } finally {
                if (!isCancelled) {
                    setIsLoading(false);
                }
            }
        };

        loadProfile();

        return () => {
            isCancelled = true;
        };
    }, [username]);

    useEffect(() => {
        let canceled = false;
        const loadSlips = async () => {
            if (!username) return;
            setSlipsLoading(true);
            try {
                // pick status based on the active tab
                let status: string | undefined;
                if (activeTab === 'wins') status = 'won';
                if (activeTab === 'losses') status = 'lost';
                const data = await fetchUserBetslips(username, status);
                if (!canceled) setSlips(Array.isArray(data) ? data : []);
            } catch (err) {
                if (!canceled) setSlips([]);
            } finally {
                if (!canceled) setSlipsLoading(false);
            }
        };

        // Load slips when profile loads or when tab changes for filtered lists
        if (profile) loadSlips();

        return () => { canceled = true; };
    }, [username, profile, activeTab]);

    // compute streaks and other badge metrics when slips change
    useEffect(() => {
        if (!slips || slips.length === 0) {
            setCurrentStreak(null);
            setBestStreak(null);
            return;
        }

        // compute streaks from the most recent slips (ordered desc)
        let best = 0;
        let cur = 0;
        let running = 0;
        for (let i = 0; i < slips.length; i++) {
            const s = slips[i];
            if ((s.status || '').toLowerCase() === 'won') {
                running += 1;
                best = Math.max(best, running);
            } else {
                running = 0;
            }
        }

        // current streak: check starting from 0 up until non-win
        running = 0;
        for (let i = 0; i < slips.length; i++) {
            const s = slips[i];
            if ((s.status || '').toLowerCase() === 'won') {
                running += 1;
            } else {
                break;
            }
        }
        cur = running;
        setBestStreak(best);
        setCurrentStreak(cur);
    }, [slips]);

    if (isLoading) return <p className="p-4">Loading profile...</p>;
    if (error) return <p className="p-4 text-red-500">Error: {error}</p>;
    if (!profile) return (
        <div className="text-center p-4">
            <p className="mb-4">User not found.</p>
            <Link to="/register" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
                Register an Account
            </Link>
        </div>
    );

    return (
        <div className="p-4 md:p-8">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
                <div className="h-44 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-end p-6 text-white">
                    <div className="flex items-end space-x-4">
                        <img src={profile.avatar_url} alt="avatar" className="w-28 h-28 rounded-full border-4 border-white object-cover -mt-12" />
                        <div>
                            <h1 className="text-2xl font-bold">{profile.full_name || profile.username}</h1>
                            <div className="text-sm text-white/90">@{profile.username} {profile.is_verified && <span title="Verified Punter">✔️</span>}</div>
                            <p className="text-sm mt-2 max-w-xl">{profile.bio || 'No bio yet.'}</p>
                            <div className="mt-3 flex items-center space-x-3 text-xs text-white/90">
                                <div>Member since {new Date(profile.join_date).toLocaleString(undefined, { month: 'short', year: 'numeric' })}</div>
                                <div>•</div>
                                <div>{profile.country ?? 'Location'}</div>
                            </div>
                        </div>
                    </div>
                    <div className="ml-auto text-right space-x-2">
                        <button className="bg-white text-indigo-700 px-4 py-2 rounded-lg font-semibold">Follow</button>
                        <button className="hidden md:inline bg-indigo-600 text-white px-4 py-2 rounded-lg">Message</button>
                    </div>
                </div>
                <div className="p-4 border-t md:grid md:grid-cols-5 gap-4 items-center">
                    <div className="flex gap-4 overflow-x-auto md:overflow-visible md:block md:col-span-5 w-full scrollbar-hide">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{profile.win_rate.toFixed(0)}%</div>
                        <div className="text-xs text-gray-500">Win Rate</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold">{profile.wins + profile.losses}</div>
                        <div className="text-xs text-gray-500">Total Bets</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{profile.wins}</div>
                        <div className="text-xs text-gray-500">Wins</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-red-600">{profile.losses}</div>
                        <div className="text-xs text-gray-500">Losses</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold">W{currentStreak ?? 0}</div>
                        <div className="text-xs text-gray-500">Current Streak</div>
                    </div>
                </div>
            </div>
        </div>

            {/* Badges & mini charts */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-lg shadow-sm p-4 flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-700 font-bold">🎖</div>
                    <div>
                        <div className="text-sm text-gray-500">Badges</div>
                        <div className="mt-1 flex items-center space-x-2">
                            {profile.is_verified && <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">Verified</span>}
                            {profile.win_rate >= 70 && <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">High Win Rate</span>}
                            {bestStreak && bestStreak >= 8 && <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full">Top Streak</span>}
                            {currentStreak && currentStreak >= 4 && <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded-full">🔥 {currentStreak}W</span>}
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-4">
                    <div className="text-xs text-gray-500">Weekly performance (mock)</div>
                    <div className="mt-2 w-full"><Sparkline points={[2,3,4,6,5,8,7,8,9,8]} /></div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-4">
                    <div className="text-xs text-gray-500">Monthly performance (mock)</div>
                    <div className="mt-2 w-full"><Sparkline points={[1,2,3,4,5,6,5,6,7,9,8,10]} stroke="#10B981" /></div>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                <div className="overflow-x-auto -mx-4 px-4 md:px-0">
                    <div className="flex space-x-4 border-b border-gray-100 pb-3 w-max">
                    {['slips','wins','losses','stats','subscriptions'].map(tab => (
                        <button key={tab} onClick={() => setActiveTab(tab as any)} className={`py-2 px-3 -mb-px ${activeTab===tab ? 'border-b-2 border-indigo-600 font-semibold text-indigo-600' : 'text-gray-600'}`}>{tab.toUpperCase()}</button>
                    ))}
                    </div>
                </div>

                <div className="mt-4">
                    {activeTab === 'slips' && (
                        <div className="space-y-4">
                            {slipsLoading ? (
                                <div className="p-4">Loading slips…</div>
                            ) : slips.length === 0 ? (
                                <div className="p-6 text-center text-gray-500">No slips yet.</div>
                            ) : (
                                <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                                    {slips.map(s => <SlipCard key={s.id} slip={s} />)}
                                </div>
                            )}
                        </div>
                    )}

                    {['wins','losses'].includes(activeTab) && (
                        <div className="space-y-4">
                            {slipsLoading ? (
                                <div className="p-4">Loading {activeTab}…</div>
                            ) : slips.length === 0 ? (
                                <div className="p-6 text-center text-gray-500">No {activeTab} found.</div>
                            ) : (
                                <div className="grid gap-4">
                                    {slips.map(s => <SlipCard key={s.id} slip={s} />)}
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'stats' && (
                        <div className="p-4 md:p-6">
                            <h3 className="text-lg font-semibold mb-2">Detailed Stats</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-gray-50 rounded p-3">
                                    <div className="text-sm text-gray-500">Monthly win rate</div>
                                    <div className="text-2xl font-bold text-indigo-700 mt-2">{profile.win_rate.toFixed(0)}%</div>
                                </div>
                                <div className="bg-gray-50 rounded p-3">
                                    <div className="text-sm text-gray-500">Average Odds</div>
                                    <div className="text-2xl font-bold mt-2">2.41x</div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'subscriptions' && (
                        <div className="p-4">
                            <h3 className="text-lg font-semibold mb-4">Subscription Plans</h3>
                            <div className="grid md:grid-cols-3 gap-4">
                                {[
                                    { id: 'basic', name: 'Basic', price: '₦500/mo', perks: ['View premium slips', 'Comment'], btn: 'Subscribe' },
                                    { id: 'vip', name: 'VIP', price: '₦2,500/mo', perks: ['All Basic', 'Early access', 'Detailed analytics'], btn: 'Subscribe' },
                                    { id: 'platinum', name: 'Platinum', price: '₦7,500/mo', perks: ['Everything', 'Direct Q&A', 'Exclusive content'], btn: 'Subscribe' },
                                ].map(plan => (
                                    <div key={plan.id} className="bg-gray-50 rounded-lg border p-4 text-center">
                                        <div className="text-sm text-gray-500">{plan.name}</div>
                                        <div className="text-2xl font-bold mt-2">{plan.price}</div>
                                        <ul className="text-sm text-gray-600 mt-3 space-y-2 text-left">
                                            {plan.perks.map(p => <li key={p}>• {p}</li>)}
                                        </ul>
                                        <div className="mt-4">
                                            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md">{plan.btn}</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4 text-sm text-gray-500">Payments are mocked in this demo — integrate your gateway (Paystack/Flutterwave/Stripe) for production.</div>
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
};

export default UserProfile;