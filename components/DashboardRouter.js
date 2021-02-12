import { useState } from 'react';
//components
import AlbumsDashboard from './album/AlbumsDashboard';
import BlogDashboard from './blog/BlogDashboard';

export default function DashboardRouter() {
    const [dashboardView, setDashboardView] = useState('albums')

    return (
        <div>
            <div className="text-center pt-24">
                <p className="text-xl underline">Manage sections</p>
                <div className="flex justify-center mt-2">
                    <button className={dashboardView == 'albums' ? "mr-4 p-2 text-4xl focus:outline-none rounded-2xl bg-blue-100" : "mr-4 p-2 text-gray-400 focus:outline-none text-4xl" }
                        onClick={() => setDashboardView('albums')} >Albums</button>
                    <button className={dashboardView == 'blog' ? "p-2 text-4xl focus:outline-none rounded-2xl bg-blue-100" : "p-2 text-gray-400 focus:outline-none text-4xl" }
                        onClick={() => setDashboardView('blog')} >Blog</button>
                </div>
            </div>
            {dashboardView == 'albums' &&
                <AlbumsDashboard />
            }
            {dashboardView == 'blog' &&
                <BlogDashboard />
            }
        </div>
    )
}