import { defaultConfig } from "../config/defaultConfig";
import Ajv from "ajv";
import _ from "lodash";

export interface validateConfigProps {
	data: Record<string, unknown>;
}

export function validateConfig({ data }: validateConfigProps) {
	const validatedData: Record<string, unknown> = _.cloneDeep(data);
	const ajv = new Ajv({ useDefaults: true });
	const schema = {
		type: "object",
		properties: {
			workingFile: { type: "string", default: "" },
			directories: {
				type: "object",
				default: {},
				patternProperties: {
					"^[\\w-]+$": { type: "string" },
				},
				additionalProperties: false,
			},
			version: { type: "number", default: defaultConfig.CURRENT_VERSION },
		},
		required: ["workingFile", "directories", "version"],
		additionalProperties: true,
	};
	const validate = ajv.compile(schema);
	validate(validatedData);
	return { newData: validatedData, oldData: data };
}
