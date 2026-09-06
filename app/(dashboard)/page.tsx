import { OverviewHeader } from "@/components/dashboard/Overview/OverviewHeader";
import { MetricCards } from "@/components/dashboard/Overview/MetricCards";
import { RevenueChart } from "@/components/dashboard/Overview/RevenueChart";
import { QuickActions } from "@/components/dashboard/Overview/QuickActions";
import { RecentRegistrations } from "@/components/dashboard/Overview/RecentRegistrations";
import { PlatformAlerts } from "@/components/dashboard/Overview/PlatformAlerts";

export default function OverviewPage() {
    return (
        <div className="p-6 md:p-8 space-y-6 max-w-[1600px] mx-auto min-h-screen">
            {/* Header Greeting */}
            <OverviewHeader />

            {/* Top 4 Metric Cards */}
            <MetricCards />

            {/* Middle Grid: Dual Line Revenue Chart (2/3 width) + Quick Actions (1/3 width) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <RevenueChart />
                </div>
                <div className="lg:col-span-1">
                    <QuickActions />
                </div>
            </div>

            {/* Bottom Grid: Recent Registrations (1/2 width) + Platform Alerts (1/2 width) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <RecentRegistrations />
                <PlatformAlerts />
            </div>
        </div>
    );
}
