"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { type Device, getDevices, getModelTypes } from "@/lib/devices";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Sprout } from "lucide-react";

interface Props {
	initialDevices?: (Device | null)[];
}

export function CompareForm({ initialDevices = [null, null] }: Props) {
	const router = useRouter();
	const [devices, setDevices] = useState<Device[]>([]);
	const [selectedDevices, setSelectedDevices] =
		useState<(Device | null)[]>(initialDevices);
	const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
	const [selectedYear, setSelectedYear] = useState<string>("All");

	useEffect(() => {
		getDevices().then(setDevices);
	}, []);

	const modelTypes = getModelTypes(devices);
	const years = Array.from(
		new Set(
			devices.map((device) => device.name.match(/\d{4}/g) || []).map(Number),
		),
	)
		.filter(Boolean)
		.sort((a, b) => b - a);

	const handleCompare = () => {
		if (selectedDevices[0] && selectedDevices[1]) {
			const device1Param = encodeURIComponent(`${selectedDevices[0].id}`);
			const device2Param = encodeURIComponent(`${selectedDevices[1].id}`);
			router.push(`/compare?device1=${device1Param}&device2=${device2Param}`);
		}
	};

	return (
		<Card>
			<CardContent className="space-y-6 pt-6">
				<div className="flex items-center justify-center gap-4">
					<Select value={selectedYear} onValueChange={setSelectedYear}>
						<SelectTrigger className="w-[100px]">
							<SelectValue placeholder="Filter by Year" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="All">All Years</SelectItem>
							{years.map((year) => (
								<SelectItem key={year} value={year.toString()}>
									{year}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<ToggleGroup
						type="multiple"
						value={selectedTypes}
						onValueChange={setSelectedTypes}
					>
						{modelTypes.map((type) => (
							<ToggleGroupItem key={type} value={type} size="sm">
								{type}
							</ToggleGroupItem>
						))}
					</ToggleGroup>
				</div>

				<div className="grid md:grid-cols-2 gap-4">
					{[0, 1].map((index) => (
						<div key={index} className="space-y-4">
							<Select
								value={
									selectedDevices[index]
										? `${selectedDevices[index]?.name}:${selectedDevices[index]?.description}`
										: ""
								}
								onValueChange={(value) => {
									const [name, description] = value.split(":");
									const device = devices.find(
										(d) => d.name === name && d.description === description,
									);
									const newDevices = [...selectedDevices];
									newDevices[index] = device || null;
									setSelectedDevices(newDevices);
								}}
							>
								<SelectTrigger>
									<SelectValue placeholder="Select Model" />
								</SelectTrigger>
								<SelectContent>
									{devices
										.filter(
											(d) =>
												(selectedTypes.length === 0 ||
													selectedTypes.some((type) =>
														d.name.includes(type),
													)) &&
												(selectedYear === "All" ||
													d.name.match(/\d{4}/g)?.[0] === selectedYear),
										)
										.map((device) => (
											<SelectItem
												key={`${device.name}:${device.description}`}
												value={`${device.name}:${device.description}`}
											>
												{device.name} - {device.description}
											</SelectItem>
										))}
								</SelectContent>
							</Select>
						</div>
					))}
				</div>
				<div className="flex justify-center mt-2">
					<Button
						onClick={handleCompare}
						disabled={!selectedDevices[0] || !selectedDevices[1]}
						className="bg-gradient-to-r from-purple-100 via-pink-50 to-green-100 hover:from-purple-200 hover:via-pink-100 hover:to-green-200 text-gray-700 gap-2 border border-green-200"
					>
						<Sprout size={16} />
						Grow Garden
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
