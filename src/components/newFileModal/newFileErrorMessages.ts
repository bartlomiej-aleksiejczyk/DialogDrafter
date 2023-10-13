import { maxFilenameLength } from "../../shared/validators/validators";

export const newFileErrorMessages = () => {
	const errorMessages = {
		required: "Filename is required.",
		pattern:
			"Filename can only contain alphanumeric characters, hyphens, underscores, periods, and spaces.",
		maxLength: `Filename must be shorter than ${maxFilenameLength} characters.`,
		isFilenameAvailable: "Filename already exists. Choose a different name.",
	};
	return errorMessages;
};
