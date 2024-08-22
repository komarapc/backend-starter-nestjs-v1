import { HttpStatus } from '@nestjs/common'

interface ResponseData {
	statusCode: number
	statusMessage: string
	message?: any
	data?: any
	error?: any
}
interface ResponseProps {
	code: number
	message?: any
	data?: any
	error?: any
}

const HTTP_STATUS_MESSAGE = [
	{ code: 200, message: 'OK' },
	{ code: 201, message: 'Created' },
	{ code: 204, message: 'No Content' },
	{ code: 400, message: 'Bad Request' },
	{ code: 401, message: 'Unauthorized' },
	{ code: 403, message: 'Forbidden' },
	{ code: 404, message: 'Not Found' },
	{ code: 405, message: 'Method Not Allowed' },
	{ code: 409, message: 'Conflict' },
	{ code: 500, message: 'Internal Server Error' },
	{ code: 501, message: 'Not Implemented' },
	{ code: 502, message: 'Bad Gateway' },
	{ code: 503, message: 'Service Unavailable' },
	{ code: 504, message: 'Gateway Timeout' },
]

const responseData = (props: ResponseProps): ResponseData => {
	return {
		statusCode: props.code,
		statusMessage:
			HTTP_STATUS_MESSAGE.find((item) => item.code === props.code)?.message ||
			'',
		message: props.message,
		data: props.data,
		error: props.error,
	}
}

const responseError = (error: any) => {
	return responseData({
		code: error.getStatus(),
		message: error.message,
	})
}

const createResponse = (code: HttpStatus, message: string, data?: any) =>
	responseData({ code, message, data })

export { ResponseData, responseData, responseError, createResponse }
