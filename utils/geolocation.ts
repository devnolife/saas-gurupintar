// Define school location boundaries (these would be configured per school)
const SCHOOL_COORDINATES = {
  latitude: 3.139, // Example coordinates - replace with actual school coordinates
  longitude: 101.6869,
  radius: 500, // Radius in meters within which attendance is valid
}

export type GeolocationResult = {
  success: boolean
  message: string
  coordinates?: {
    latitude: number
    longitude: number
  }
  withinBoundary?: boolean
  distance?: number
}

/**
 * Get current geolocation and verify if it's within school boundaries
 */
export const verifyLocation = (): Promise<GeolocationResult> => {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve({
        success: false,
        message: "Geolocation is not supported by your browser",
      })
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        const distance = calculateDistance(
          latitude,
          longitude,
          SCHOOL_COORDINATES.latitude,
          SCHOOL_COORDINATES.longitude,
        )

        const withinBoundary = distance <= SCHOOL_COORDINATES.radius

        resolve({
          success: true,
          message: withinBoundary
            ? "You are within school premises"
            : `You are ${Math.round(distance)}m away from school premises`,
          coordinates: { latitude, longitude },
          withinBoundary,
          distance,
        })
      },
      (error) => {
        let message = "Unknown error occurred while getting location"

        switch (error.code) {
          case error.PERMISSION_DENIED:
            message = "Location permission denied"
            break
          case error.POSITION_UNAVAILABLE:
            message = "Location information is unavailable"
            break
          case error.TIMEOUT:
            message = "Location request timed out"
            break
        }

        resolve({
          success: false,
          message,
        })
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    )
  })
}

/**
 * Calculate distance between two coordinates using the Haversine formula
 * @returns Distance in meters
 */
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371e3 // Earth's radius in meters
  const φ1 = (lat1 * Math.PI) / 180
  const φ2 = (lat2 * Math.PI) / 180
  const Δφ = ((lat2 - lat1) * Math.PI) / 180
  const Δλ = ((lon2 - lon1) * Math.PI) / 180

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return R * c // Distance in meters
}

