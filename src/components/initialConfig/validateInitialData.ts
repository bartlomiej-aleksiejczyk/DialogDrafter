import Ajv from "ajv"
import {defaultConfig} from "../../shared/config/defaultConfig";
import _ from "lodash";
import {toast} from "react-hot-toast";
import {ErrorToast} from "../../shared/toasts/ErrorToast";

// TODO: Add migration mechanism
export function validateInitialData (initialData, setInitialData) {

    const validatedData = _.cloneDeep(initialData);
    const ajv = new Ajv({useDefaults: true})

    const schema = {
        "type": "object",
        "properties": {
            "workingFile": {"type": "string", "default": ""},
            "directories": {
                "type": "object",
                "default": {},
                "patternProperties": {
                    "^[\\w-]+$": {"type": "string"}
                },
                "additionalProperties": false
            },
            "version": {"type": "number", "default": defaultConfig.CURRENT_VERSION}
        },
        "required": ["workingFile", "directories", "version"],
        "additionalProperties": true
    };
    const validate = ajv.compile(schema)
    validate(validatedData)

    if (!_.isEqual(initialData, validatedData)) {
        console.error("Validation Errors:");
        toast.custom(ErrorToast("Your configuration file is has missing or invalid properties that were set to default values"));
        setInitialData(validatedData)
    }
}