import { CompareForm } from "@/components/compare-form";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PerformanceTrend } from "@/components/performance-trend";
import data from "../../public/data.json";

export default function Home() {
	return (
		<div className="min-h-screen flex flex-col">
			<SiteHeader />
			<div className="flex-grow bg-gradient-to-b from-green-50 to-white">
				<div className="max-w-5xl mx-auto p-8">
					<CompareForm />
					<div className="mt-8">
						<PerformanceTrend devices={data.devices} />
					</div>
				</div>
			</div>
			<SiteFooter />
		</div>
	);
}
