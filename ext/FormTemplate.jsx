import PropTypes from "prop-types";
import {EmbeddedForm, useFormData} from "@f-ui/core";
import Selector from './inputs/selector/Selector'

export default function FormTemplate(props) {
    const hook = useFormData(props.initial)

    return (<EmbeddedForm
        title={props.title}
        create={props.create}
        handleClose={props.handleClose}
        returnButton={props.handleClose !== undefined}
        sections={[{
            ...props.obj, inputs: props.obj.inputs.map(o => {
                console.log(o)
                if (o.query) return {
                    children: (<Selector
                        value={hook.data[o.key]}
                        handleChange={(obj) => {
                            hook.handleChange({
                                event: obj, key: o.key
                            })
                        }}

                        label={o.label}
                        required={o.required}
                        disabled={o.disabled}
                        placeholder={o.placeHolder}
                        keys={o.keys}
                        query={o.query}
                        width={o.width}
                        height={o.height}
                    />)
                }
                return o
            })
        }]}
        hook={hook}
        handleSubmit={props.submit}
    />)
}

FormTemplate.propTypes = {
    initial: PropTypes.object, obj: PropTypes.object, submit: PropTypes.field
}