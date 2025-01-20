"use client";

import { Button } from "@/components/ui/button";
import type { Device } from "@/lib/devices";
import { Download } from "lucide-react";

interface DownloadDataButtonProps {
	devices: Device[];
	comparisons: {
		device1: {
			singleCore: number;
			multiCore: number;
			singleCoreMultiplier: number;
			multiCoreMultiplier: number;
		};
		device2: {
			singleCore: number;
			multiCore: number;
			singleCoreMultiplier: number;
			multiCoreMultiplier: number;
		};
	};
}

export function DownloadDataButton({
	devices,
	comparisons,
}: DownloadDataButtonProps) {
	const handleDownload = () => {
		const [device1, device2] = devices;
		const content = `Comparison between ${device1.name} and ${device2.name}

${device1.name}:
Description: ${device1.description}
Single-Core Score: ${device1.score} (${comparisons.device1.singleCore >= 0 ? "+" : ""}${comparisons.device1.singleCore}% vs ${device2.name}${comparisons.device1.singleCoreMultiplier > 1 ? ` / ${comparisons.device1.singleCoreMultiplier}x` : ""})
Multi-Core Score: ${device1.multicore_score} (${comparisons.device1.multiCore >= 0 ? "+" : ""}${comparisons.device1.multiCore}% vs ${device2.name}${comparisons.device1.multiCoreMultiplier > 1 ? ` / ${comparisons.device1.multiCoreMultiplier}x` : ""})
Samples: ${device1.samples}

${device2.name}:
Description: ${device2.description}
Single-Core Score: ${device2.score} (${comparisons.device2.singleCore >= 0 ? "+" : ""}${comparisons.device2.singleCore}% vs ${device1.name}${comparisons.device2.singleCoreMultiplier > 1 ? ` / ${comparisons.device2.singleCoreMultiplier}x` : ""})
Multi-Core Score: ${device2.multicore_score} (${comparisons.device2.multiCore >= 0 ? "+" : ""}${comparisons.device2.multiCore}% vs ${device1.name}${comparisons.device2.multiCoreMultiplier > 1 ? ` / ${comparisons.device2.multiCoreMultiplier}x` : ""})
Samples: ${device2.samples}`;

		const blob = new Blob([content], { type: "text/plain" });
		const url = window.URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "device-comparison.txt";
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		window.URL.revokeObjectURL(url);
	};

	return (
		<Button onClick={handleDownload} variant="outline" size="sm">
			<Download className="mr-2 h-4 w-4" />
			Download Comparison
		</Button>
	);
}
