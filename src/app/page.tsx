"use client"

import { Suspense, useEffect, useState } from "react"
import { useRouter, useSearchParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDown, ArrowUp, Minus, Sprout, Apple, Leaf, Github, Globe } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import Link from 'next/link'

interface Device {
  id: number
  name: string
  description: string
  score: number
  multicore_score: number
  family: string
  samples: number
}

function SearchParamsWrapper({ onParamsLoad }: { onParamsLoad: (device1Param: string | null, device2Param: string | null) => void }) {
  const searchParams = useSearchParams()
  
  useEffect(() => {
    onParamsLoad(searchParams.get('device1'), searchParams.get('device2'))
  }, [searchParams, onParamsLoad]) // Restore dependencies to react to URL changes
  
  return null
}

export default function Home() {
  const router = useRouter()
  const [devices, setDevices] = useState<Device[]>([])
  const [device1, setDevice1] = useState<Device | null>(null)
  const [device2, setDevice2] = useState<Device | null>(null)
  const [selectedModels, setSelectedModels] = useState<string[]>([])

  // Load devices
  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json() as Promise<{ devices: Device[] }>)
      .then(data => {
        setDevices(data.devices)
      })
  }, [])

  const handleParamsLoad = (device1Param: string | null, device2Param: string | null) => {
    if (!devices.length) return

    if (device1Param) {
      const [name, desc] = decodeURIComponent(device1Param).split(':')
      const device = devices.find(d => d.name === name && d.description === desc)
      if (device) setDevice1(device)
    }

    if (device2Param) {
      const [name, desc] = decodeURIComponent(device2Param).split(':')
      const device = devices.find(d => d.name === name && d.description === desc)
      if (device) setDevice2(device)
    }
  }

  // Update URL when selections change
  useEffect(() => {
    const params = new URLSearchParams()
    if (device1) {
      params.set('device1', encodeURIComponent(`${device1.name}:${device1.description}`))
    }
    if (device2) {
      params.set('device2', encodeURIComponent(`${device2.name}:${device2.description}`))
    }
    
    router.replace(`/?${params.toString()}`, { scroll: false })
  }, [device1, device2, router])

  const getDiffIndicator = (score1: number, score2: number) => {
    const diff = score1 - score2
    const percentage = ((diff / score2) * 100).toFixed(1)
    if (diff > 0) {
      return <div className="flex items-center text-green-500"><ArrowUp className="w-4 h-4 mr-1" />{percentage}%</div>
    } else if (diff < 0) {
      return <div className="flex items-center text-red-500"><ArrowDown className="w-4 h-4 mr-1" />{percentage}%</div>
    }
    return <div className="flex items-center text-gray-500"><Minus className="w-4 h-4 mr-1" />0%</div>
  }

  const getModelTypes = (devices: Device[]) => {
    const modelSet = new Set<string>()
    for (const device of devices) {
      const name = device.name.toLowerCase()
      if (name.includes('macbook pro')) modelSet.add('MacBook Pro')
      else if (name.includes('macbook air')) modelSet.add('MacBook Air')
      else if (name.includes('imac')) modelSet.add('iMac')
      else if (name.includes('mac mini')) modelSet.add('Mac Mini')
      else if (name.includes('mac pro')) modelSet.add('Mac Pro')
      else if (name.includes('mac studio')) modelSet.add('Mac Studio')
      else if (name.includes('macbook')) modelSet.add('MacBook')
    }
    return Array.from(modelSet).sort()
  }

  const deviceOptions = devices
    .sort((a, b) => a.id - b.id)
    .filter((device, index, self) => 
      index === self.findIndex(d => 
        d.name === device.name && d.description === device.description
      )
    )
    .filter(device => 
      selectedModels.length === 0 || 
      selectedModels.some(model => 
        device.name.toLowerCase().includes(model.toLowerCase())
      )
    )
    .map(device => ({
      value: `${device.name}:${device.description}`,
      label: device.name,
      description: device.description
    }))
    .reverse()

  const modelTypes = getModelTypes(devices)

  const handleReset = () => {
    setDevice1(null)
    setDevice2(null)
    setSelectedModels([])
    window.history.pushState({}, '', '/')
  }

  return (
    <div className="min-h-screen p-8 bg-gradient-to-b from-green-50 to-white flex flex-col">
      <Suspense fallback={null}>
      <SearchParamsWrapper onParamsLoad={handleParamsLoad} />
      </Suspense>
      <div className="max-w-5xl mx-auto space-y-8 flex-grow">
        <div className="text-center space-y-2">
          <Link 
            href="/" 
            onClick={handleReset}
            className="inline-flex items-center justify-center space-x-2 mb-2 hover:opacity-80 transition-opacity"
          >
            <Sprout className="w-8 h-8 text-green-600" />
            <h1 className="text-4xl font-bold text-gray-800">The Mac Garden</h1>
            <Apple className="w-8 h-8 text-gray-800" />
          </Link>
          <p className="text-gray-600 flex items-center justify-center">
            <Leaf className="w-4 h-4 mr-2 text-green-500" />
            An easy way to decide if it's time to prune your old Mac and plant a new one
          </p>
        </div>
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-green-100"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="bg-gradient-to-b from-green-50 to-white px-4">
              <ToggleGroup 
                type="multiple"
                value={selectedModels}
                onValueChange={setSelectedModels}
                className="inline-flex flex-wrap justify-center gap-2 p-2"
              >
                {modelTypes.map(model => (
                  <ToggleGroupItem
                    key={model}
                    value={model}
                    variant="outline"
                    className="px-4 py-2 rounded-full border-green-200 hover:bg-green-50 data-[state=on]:bg-green-100 data-[state=on]:text-green-800 data-[state=on]:border-green-300 whitespace-nowrap transition-all"
                  >
                    {model}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Select
            value={device1 ? `${device1.name}:${device1.description}` : ""}
            onValueChange={(value) => {
              const [name, desc] = value.split(":")
              setDevice1(devices.find(d => d.name === name && d.description === desc) || null)
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select first Mac" />
            </SelectTrigger>
            <SelectContent>
              {deviceOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label} - {option.description}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={device2 ? `${device2.name}:${device2.description}` : ""}
            onValueChange={(value) => {
              const [name, desc] = value.split(":")
              setDevice2(devices.find(d => d.name === name && d.description === desc) || null)
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select second Mac" />
            </SelectTrigger>
            <SelectContent>
              {deviceOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label} - {option.description}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {device1 && device2 && (
          <div className="grid grid-cols-2 gap-4">
            <Card className="border-green-100 shadow-lg hover:shadow-xl transition-shadow duration-200">
              <CardHeader className="border-b border-green-50">
                <CardTitle className="text-gray-800">{device1.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Description</p>
                    <p>{device1.description}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Single-Core Score</p>
                    <p className="text-2xl font-bold">{device1.score}</p>
                    {getDiffIndicator(device1.score, device2.score)}
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Multi-Core Score</p>
                    <p className="text-2xl font-bold">{device1.multicore_score}</p>
                    {getDiffIndicator(device1.multicore_score, device2.multicore_score)}
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Samples</p>
                    <p>{device1.samples}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-100 shadow-lg hover:shadow-xl transition-shadow duration-200">
              <CardHeader className="border-b border-green-50">
                <CardTitle className="text-gray-800">{device2.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Description</p>
                    <p>{device2.description}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Single-Core Score</p>
                    <p className="text-2xl font-bold">{device2.score}</p>
                    {getDiffIndicator(device2.score, device1.score)}
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Multi-Core Score</p>
                    <p className="text-2xl font-bold">{device2.multicore_score}</p>
                    {getDiffIndicator(device2.multicore_score, device1.multicore_score)}
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Samples</p>
                    <p>{device2.samples}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
      
      <footer className="mt-16 border-t border-green-100">
        <div className="max-w-5xl mx-auto py-8">
          <div className="flex justify-center items-center space-x-6">
            <a 
              href="https://github.com/paradise-runner/macgarden" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-4 py-2 rounded-full border border-green-100 hover:border-green-200 hover:bg-green-50 text-gray-600 hover:text-gray-800 transition-all duration-200"
            >
              <Github className="w-4 h-4 mr-2" />
              <span>View on GitHub</span>
            </a>
            <div className="h-4 w-px bg-green-100"></div>
            <a 
              href="https://hec.works" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-4 py-2 rounded-full border border-green-100 hover:border-green-200 hover:bg-green-50 text-gray-600 hover:text-gray-800 transition-all duration-200"
            >
              <Globe className="w-4 h-4 mr-2" />
              <span>Developer Site</span>
            </a>
          </div>
          <p className="text-center text-sm text-gray-400 mt-4">
            Built with 🌱 to help you grow your Mac collection
          </p>
        </div>
      </footer>
    </div>
  )
}
