import { NextResponse } from 'next/server'

/**
 * Standard API response utilities
 */

export function successResponse<T>(data: T, status: number = 200) {
  return NextResponse.json(
    {
      success: true,
      data,
    },
    { status }
  )
}

export function errorResponse(
  message: string,
  status: number = 400,
  details?: unknown
) {
  return NextResponse.json(
    {
      success: false,
      error: message,
      details,
    },
    { status }
  )
}

export function unauthorizedResponse(message: string = 'Unauthorized') {
  return errorResponse(message, 401)
}

export function forbiddenResponse(message: string = 'Forbidden') {
  return errorResponse(message, 403)
}

export function notFoundResponse(message: string = 'Not found') {
  return errorResponse(message, 404)
}

export function serverErrorResponse(
  message: string = 'Internal server error',
  error?: unknown
) {
  console.error('Server error:', error)
  return errorResponse(message, 500, process.env.NODE_ENV === 'development' ? error : undefined)
}

export function validationErrorResponse(message: string, errors?: unknown) {
  return errorResponse(message, 422, errors)
}
