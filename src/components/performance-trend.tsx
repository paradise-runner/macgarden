"use client";

import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	type ChartData,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { parseJSON, getYear } from "date-fns";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useState } from "react";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
);

const options = {
	responsive: true,
	plugins: {
		legend: {
			position: "top" as const,
		},
		title: {
			display: true,
			text: "Mac Performance Trends", // Removed "Non-Pro" from title since it's now toggleable
		},
	},
	scales: {
		y: {
			beginAtZero: true,
			title: {
				display: true,
				text: "Score",
			},
		},
	},
};

type Device = {
	name: string;
	score: number;
	multicore_score: number;
	description: string;
};

export function getYearFromDescription(description: string): number | null {
	const match = description.match(/\b\d{4}\b/);
	if (match) {
		return Number.parseInt(match[0], 10);
	}
	return null;
}

export function PerformanceTrend({ devices }: { devices: Device[] }) {
	const [showPro, setShowPro] = useState(false);

	const yearlyAverages = devices.reduce(
		(acc, device) => {
			const year = getYearFromDescription(device.name);
			// Modified filter logic to use toggle state
			if (!showPro && device.name.includes("Pro")) {
				return acc;
			}

			// check if year is null
			if (year === null) {
				return acc;
			}

			if (year >= 2008) {
				if (!acc[year]) {
					acc[year] = { singleCore: [], multiCore: [] };
				}
				acc[year].singleCore.push(device.score);
				if (device.multicore_score) {
					acc[year].multiCore.push(device.multicore_score);
				}
			}
			return acc;
		},
		{} as Record<number, { singleCore: number[]; multiCore: number[] }>,
	);

	const years = Object.keys(yearlyAverages).sort();

	const singleCoreAverages = years.map((year) => {
		const scores = yearlyAverages[Number(year)].singleCore;
		return scores.reduce((a, b) => a + b, 0) / scores.length;
	});

	const multiCoreAverages = years.map((year) => {
		const scores = yearlyAverages[Number(year)].multiCore;
		return scores.reduce((a, b) => a + b, 0) / scores.length;
	});

	const data: ChartData<"line"> = {
		labels: years,
		datasets: [
			{
				label: "Average Single-Core Score",
				data: singleCoreAverages,
				borderColor: "rgb(75, 192, 192)",
				backgroundColor: "rgba(75, 192, 192, 0.5)",
			},
			{
				label: "Average Multi-Core Score",
				data: multiCoreAverages,
				borderColor: "rgb(153, 102, 255)",
				backgroundColor: "rgba(153, 102, 255, 0.5)",
			},
		],
	};

	return (
		<div className="w-full p-4 bg-white rounded-lg shadow">
			<div className="flex items-center space-x-2 mb-4">
				<Switch id="pro-mode" checked={showPro} onCheckedChange={setShowPro} />
				<Label htmlFor="pro-mode">Include Pro devices</Label>
			</div>
			<Line options={options} data={data} />
		</div>
	);
}
