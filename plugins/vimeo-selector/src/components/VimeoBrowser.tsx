import {Button, Card, Grid, Spinner, Stack, Text, TextInput} from '@sanity/ui'
import axios from 'axios'
import {useEffect, useState} from 'react'
import {set} from 'sanity'

// Define the type for Vimeo Video
interface VimeoVideo {
  _type: 'vimeoVideo'
  _id: string
  uri: string
  name: string
  description: string
  thumbnail: string
}

const VimeoBrowser = ({
  value,
  onChange,
}: {
  value: VimeoVideo | undefined
  onChange: (value: any) => void
}) => {
  console.log('Coming Inside the Vimeo Browser')

  const [query, setQuery] = useState('')
  const [videos, setVideos] = useState<any[]>([]) // You can specify a more detailed type here
  const [isLoading, setIsLoading] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState<VimeoVideo | null>(value || null) // Initialize with _value

  useEffect(() => {
    if (value) {
      setSelectedVideo(value)
    }
  }, [value])

  const fetchVideos = async (searchQuery: string) => {
    setIsLoading(true)
    try {
      const response = await axios.get('https://api.vimeo.com/me/videos', {
        params: {query: searchQuery},
        headers: {
          Authorization: `Bearer 1277e061f2276dcdcff3c9a5bce1a1e6`, // Replace with your Vimeo API token
        },
      })
      setVideos(response.data.data)
    } catch (error) {
      console.error('Error fetching Vimeo videos:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = () => {
    fetchVideos(query)
  }

  const handleSelect = (video: any) => {
    // Replace `any` with a more specific type if possible
    console.log('Selected video:', video)

    if (!video || !video.uri) {
      console.error('Invalid video object:', video)
      return
    }

    const videoId = video.uri.split('/').pop()

    if (!videoId) {
      console.error('Invalid video URI:', video.uri)
      return
    }

    // Prepare the video object to be stored in Sanity
    const selectedVideo: VimeoVideo = {
      _type: 'vimeoVideo',
      _id: videoId,
      uri: video.uri,
      name: video.name,
      description: video.description || '',
      thumbnail: video.pictures?.sizes?.[2]?.link || '',
    }

    // Set selected video state
    setSelectedVideo(selectedVideo)

    console.log('Selected video object:', selectedVideo)

    // Notify Sanity of the selection
    if (typeof onChange === 'function') {
      console.log('Calling onChange with value:', selectedVideo)
      onChange(set(selectedVideo)) // Use `set()` to notify Sanity of the new value
      console.log('Calling onChange after')
    } else {
      console.error('onChange function is not defined')
    }
  }

  return (
    <Stack space={3}>
      <TextInput
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search Vimeo"
      />
      <Button onClick={handleSearch} text="Search" />
      {isLoading && <Spinner />}
      <Grid columns={[2, null, 3]} gap={3}>
        {videos.map((video) => {
          const thumbnailLink = video.pictures?.sizes?.[2]?.link

          return (
            <Card
              key={video.uri}
              padding={3}
              radius={2}
              shadow={1}
              style={{cursor: 'pointer'}}
              onClick={() => handleSelect(video)}
            >
              <Stack space={2}>
                <Text>{video.name}</Text>
                {thumbnailLink && (
                  <img src={thumbnailLink} alt={video.name} style={{width: '100%'}} />
                )}
              </Stack>
            </Card>
          )
        })}
      </Grid>
      {selectedVideo && (
        <Stack space={3} marginTop={4}>
          <Text>Selected Video:</Text>
          <Card padding={3} radius={2} shadow={1}>
            <Stack space={2}>
              <Text>{selectedVideo.name}</Text>
              <img src={selectedVideo.thumbnail} alt={selectedVideo.name} style={{width: '100%'}} />
              <Text>{selectedVideo.description}</Text>
            </Stack>
          </Card>
        </Stack>
      )}
    </Stack>
  )
}

export default VimeoBrowser
