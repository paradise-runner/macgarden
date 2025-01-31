import type { Device } from "@/lib/devices";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DownloadDataButton } from "./download-data-button";

interface Props {
	device1: Device;
	device2: Device;
	onDevice1Change: (device: Device) => void;
	onDevice2Change: (device: Device) => void;
	availableDevices?: Device[];
}

export function DeviceComparison({
	device1,
	device2,
	onDevice1Change,
	onDevice2Change,
	availableDevices = [],
}: Props) {
	const getRelativePerformance = (value1: number, value2: number) => {
		return ((value1 / value2) * 100 - 100).toFixed(1);
	};

	const getComparisonText = (value: number) => {
		return `${value >= 0 ? "+" : ""}${value}%`;
	};

	const getComparisonColor = (value: number) => {
		return value >= 0 ? "text-green-600" : "text-red-600";
	};

	const device1Comparisons = {
		singleCore: Number(getRelativePerformance(device1.score, device2.score)),
		multiCore: Number(
			getRelativePerformance(device1.multicore_score, device2.multicore_score),
		),
		singleCoreMultiplier: Number((device1.score / device2.score).toFixed(1)),
		multiCoreMultiplier: Number(
			(device1.multicore_score / device2.multicore_score).toFixed(1),
		),
	};

	const device2Comparisons = {
		singleCore: Number(getRelativePerformance(device2.score, device1.score)),
		multiCore: Number(
			getRelativePerformance(device2.multicore_score, device1.multicore_score),
		),
		singleCoreMultiplier: Number((device2.score / device1.score).toFixed(1)),
		multiCoreMultiplier: Number(
			(device2.multicore_score / device1.multicore_score).toFixed(1),
		),
	};

	return (
		<div className="device-comparison space-y-8 mt-8">
			<div className="flex justify-end">
				<DownloadDataButton
					devices={[device1, device2]}
					comparisons={{
						device1: device1Comparisons,
						device2: device2Comparisons,
					}}
				/>
			</div>
			<div className="grid md:grid-cols-2 gap-8">
				{[device1, device2].map((device, index) => {
					const comparisons =
						index === 0 ? device1Comparisons : device2Comparisons;

					return (
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						<Card key={index}>
							<CardHeader>
								<CardTitle>{device.name}</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<p className="text-gray-600">{device.description}</p>
								<div className="space-y-2">
									<div className="flex justify-between items-center">
										<p>Single-Core Score: {device.score}</p>
										<div className="text-right">
											<span
												className={getComparisonColor(comparisons.singleCore)}
											>
												{getComparisonText(comparisons.singleCore)}
											</span>
											{comparisons.singleCoreMultiplier > 1 && (
												<span className="ml-2 text-sm text-gray-600">
													({comparisons.singleCoreMultiplier}x)
												</span>
											)}
										</div>
									</div>
									<div className="flex justify-between items-center">
										<p>Multi-Core Score: {device.multicore_score}</p>
										<div className="text-right">
											<span
												className={getComparisonColor(comparisons.multiCore)}
											>
												{getComparisonText(comparisons.multiCore)}
											</span>
											{comparisons.multiCoreMultiplier > 1 && (
												<span className="ml-2 text-sm text-gray-600">
													({comparisons.multiCoreMultiplier}x)
												</span>
											)}
										</div>
									</div>
									<p>Samples: {device.samples}</p>
								</div>
							</CardContent>
						</Card>
					);
				})}
			</div>
		</div>
	);
}
