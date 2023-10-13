import { maxFilenameLength } from "../../shared/validators/validators";

export const errorMessages = {
	directoryName: {
		required: "Please provide a directory name.",
		pattern: "The directory name contains invalid characters.",
		maxLength: `The directory name must be fewer than ${maxFilenameLength} characters.`,
		isNameAvailable: "The directory name is already in use. Choose another.",
	},
	selectedDirectory: {
		required: "Please select a directory path.",
		isPathAvailable: "The chosen directory path is already in use. Choose another.",
	},
};