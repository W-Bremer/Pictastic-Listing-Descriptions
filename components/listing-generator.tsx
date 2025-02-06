"use client"

import { ChevronRight, ThumbsUp, ThumbsDown, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useState } from "react"
import { useCompletion } from 'ai/react'

export default function ListingGenerator() {
  const features = [
    "Lot Size",
    "Pool",
    "Waterfront",
    "Updated Kitchen",
    "Master Suite",
    "Home Office",
    "Garage",
    "Views",
    "Smart Home",
    "High Ceilings",
    "Hardwood Floors",
    "Fireplace",
    "Outdoor Space",
    "Energy Efficient",
    "Security System",
    "Central Location",
    "Schools Nearby",
    "Shopping/Dining",
    "Public Transit",
    "Recent Renovation",
  ]

  const styles = [
    { name: "Traditional", icon: "🏛️" },
    { name: "Modern", icon: "🏢" },
    { name: "Luxury", icon: "✨" },
    { name: "Coastal", icon: "🌊" },
    { name: "Urban", icon: "🌆" },
    { name: "Country", icon: "🏡" },
  ]

  const [formData, setFormData] = useState({
    address: '',
    listingType: 'For Sale',
    propertyType: '',
    selectedFeatures: [] as string[],
    additionalDetails: '',
    descriptionLength: 'medium',
    writingStyle: 'Traditional',
    language: 'en',
    creativityLevel: 7
  })

  const { complete, completion, isLoading, error: completionError } = useCompletion({
    api: '/api/generate-description',
    onError: (error) => {
      console.error('Completion error:', error);
      setError(error.message);
    },
    onFinish: () => {
      console.log('Generation completed. Final text:', completion);
    },
    onMessage: (message) => {
      console.log('Received message chunk:', message);
    }
  })

  const [error, setError] = useState<string | null>(null);
  const [showOutput, setShowOutput] = useState(false);
  const [copied, setCopied] = useState(false);
  const [rated, setRated] = useState<'up' | 'down' | null>(null);

  const handleSubmit = async () => {
    try {
      setError(null);
      setShowOutput(true);
      setRated(null);
      
      // Validate required fields
      if (!formData.address) {
        setError("Please enter a property address");
        return;
      }
      if (!formData.propertyType) {
        setError("Please select a property type");
        return;
      }
      if (formData.selectedFeatures.length === 0) {
        setError("Please select at least one feature");
        return;
      }

      console.log('Sending data:', formData);

      await complete(JSON.stringify(formData));

    } catch (err) {
      console.error('Submit error:', err);
      setError("An error occurred while generating the description. Please try again.");
    }
  }

  const toggleFeature = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      selectedFeatures: prev.selectedFeatures.includes(feature)
        ? prev.selectedFeatures.filter(f => f !== feature)
        : [...prev.selectedFeatures, feature]
    }))
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(completion || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="p-6 max-w-5xl mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <h1 className="text-2xl font-semibold">Listing Description Generator</h1>
        </div>

        <div className="space-y-8">
          {/* Step 1 */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600 text-sm font-medium">
                1
              </div>
              <h2 className="text-lg font-medium">Property Details</h2>
            </div>

            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Property Address</Label>
                  <Input
                    id="address"
                    placeholder="Enter the full property address"
                    value={formData.address}
                    onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Listing Type</Label>
                  <div className="flex gap-2">
                    <Button
                      variant={formData.listingType === 'For Sale' ? 'default' : 'outline'}
                      onClick={() => setFormData(prev => ({ ...prev, listingType: 'For Sale' }))}
                      className="flex-1"
                    >
                      For Sale
                    </Button>
                    <Button
                      variant={formData.listingType === 'For Rent' ? 'default' : 'outline'}
                      onClick={() => setFormData(prev => ({ ...prev, listingType: 'For Rent' }))}
                      className="flex-1"
                    >
                      For Rent
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Property Type</Label>
                  <Select
                    value={formData.propertyType}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, propertyType: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="condo">Condo</SelectItem>
                      <SelectItem value="land">Land</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="multi-family">Multi-Family</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Step 2 */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600 text-sm font-medium">
                2
              </div>
              <h2 className="text-lg font-medium">Features & Details</h2>
            </div>

            <Card>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-2">
                  <Label>Key Features</Label>
                  <div className="flex flex-wrap gap-2">
                    {features.map((feature) => (
                      <Badge
                        key={feature}
                        variant={formData.selectedFeatures.includes(feature) ? 'default' : 'outline'}
                        className="cursor-pointer hover:bg-green-50 hover:border-green-200"
                        onClick={() => toggleFeature(feature)}
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additional">Additional Details</Label>
                  <Textarea
                    id="additional"
                    placeholder="Enter any additional property details, special features, or selling points..."
                    className="h-32"
                    value={formData.additionalDetails}
                    onChange={(e) => setFormData(prev => ({ ...prev, additionalDetails: e.target.value }))}
                  />
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Step 3 */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600 text-sm font-medium">
                3
              </div>
              <h2 className="text-lg font-medium">Generation Settings</h2>
            </div>

            <Card>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-2">
                  <Label>Description Length</Label>
                  <RadioGroup
                    value={formData.descriptionLength}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, descriptionLength: value }))}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="short" id="short" />
                      <Label htmlFor="short">Short (150 words)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="medium" id="medium" />
                      <Label htmlFor="medium">Medium (300 words)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="long" id="long" />
                      <Label htmlFor="long">Long (500 words)</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Writing Style</Label>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                    {styles.map((style) => (
                      <Button
                        key={style.name}
                        variant={formData.writingStyle === style.name ? 'default' : 'outline'}
                        className="h-auto py-4 flex flex-col gap-1"
                        onClick={() => setFormData(prev => ({ ...prev, writingStyle: style.name }))}
                      >
                        <span className="text-xl">{style.icon}</span>
                        <span className="text-sm">{style.name}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Language</Label>
                  <Select
                    value={formData.language}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, language: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English (US)</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <Label>Creativity Level</Label>
                    <span className="text-sm text-gray-500">{formData.creativityLevel}</span>
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Slider
                          value={[formData.creativityLevel]}
                          onValueChange={([value]) => setFormData(prev => ({ ...prev, creativityLevel: value }))}
                          max={10}
                          step={1}
                          className="w-full"
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-sm">Higher values generate more creative descriptions</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </CardContent>
            </Card>
          </section>

          {showOutput && (
            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600 text-sm font-medium">
                  4
                </div>
                <h2 className="text-lg font-medium">Generated Description</h2>
              </div>

              <Card>
                <CardContent className="p-6 space-y-4">
                  {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-12">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mb-4"></div>
                      <div className="text-gray-500">Crafting your perfect property description...</div>
                    </div>
                  ) : completion ? (
                    <>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleCopy}
                            className="gap-2"
                          >
                            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            {copied ? 'Copied!' : 'Copy'}
                          </Button>
                          <div className="flex gap-1">
                            <Button
                              variant={rated === 'up' ? 'default' : 'outline'}
                              size="sm"
                              onClick={() => setRated('up')}
                              className={rated === 'up' ? 'bg-green-500 hover:bg-green-600' : ''}
                            >
                              <ThumbsUp className="w-4 h-4" />
                            </Button>
                            <Button
                              variant={rated === 'down' ? 'default' : 'outline'}
                              size="sm"
                              onClick={() => setRated('down')}
                              className={rated === 'down' ? 'bg-red-500 hover:bg-red-600' : ''}
                            >
                              <ThumbsDown className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <Badge variant="outline">
                          {formData.writingStyle} Style • {formData.descriptionLength} Length
                        </Badge>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-wrap">
                        {completion}
                      </div>
                    </>
                  ) : (
                    <div className="text-center text-gray-500 py-8">
                      No description generated yet
                    </div>
                  )}
                </CardContent>
              </Card>
            </section>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-md">
              {error}
            </div>
          )}

          <div className="flex justify-end pt-4">
            <Button
              className="bg-[#20C997] hover:bg-[#1ba883]"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? 'Generating...' : 'Generate Description'}
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

